/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useCallback } from 'react';
import { Language, ArabicLetterItem, ARABIC_LETTERS } from './data/qaidaData';
import { useScrollCraft } from './engine/useScrollCraft';
import { Navbar } from './components/Navbar';
import { HeroDimensionalAct } from './components/HeroDimensionalAct';
import { MakhrajLessonAct } from './components/MakhrajLessonAct';
import { FeaturesPanAct } from './components/FeaturesPanAct';
import { WritingBoardPeakAct } from './components/WritingBoardPeakAct';
import { PortalsAndPlansAct } from './components/PortalsAndPlansAct';
import { DialogsAndTraceRail, ModalKind } from './components/DialogsAndTraceRail';
import { Volume2 } from 'lucide-react';

export default function App() {
  const [lang, setLang] = useState<Language>('bn');
  const [darkMode, setDarkMode] = useState<boolean>(true);
  const [activeSection, setActiveSection] = useState<string>('home');
  const [selectedLetterId, setSelectedLetterId] = useState<number>(1);
  const [traceText, setTraceText] = useState<string>('بِسْمِ');
  const [activePortalTab, setActivePortalTab] = useState<'teacher' | 'student'>('teacher');
  const [activeModal, setActiveModal] = useState<ModalKind>(null);
  const [isSignedIn, setIsSignedIn] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const { pageProgress } = useScrollCraft();

  // Sync dark mode class on <html>
  useEffect(() => {
    const root = document.documentElement;
    if (darkMode) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [darkMode]);

  // Show temporary notification banner
  const handleNotify = useCallback((msg: string) => {
    setToastMessage(msg);
  }, []);

  useEffect(() => {
    if (!toastMessage) return;
    const t = setTimeout(() => setToastMessage(null), 3200);
    return () => clearTimeout(t);
  }, [toastMessage]);

  // Speak Arabic letter/word using Web Speech API with Web Audio API resonant chime fallback
  const handleSpeakArabic = useCallback(
    (arabicText: string, label?: string) => {
      const displayLabel = label ? ` (${label})` : '';
      handleNotify(
        lang === 'bn'
          ? `🔊 উচ্চারণ চলছে: ${arabicText}${displayLabel}`
          : `🔊 Pronouncing: ${arabicText}${displayLabel}`
      );

      try {
        if ('speechSynthesis' in window) {
          window.speechSynthesis.cancel();
          const utterance = new SpeechSynthesisUtterance(arabicText);
          utterance.lang = 'ar-SA';
          utterance.rate = 0.85;
          window.speechSynthesis.speak(utterance);
        }
      } catch {
        // Ignore speech synthesis errors in headless environments
      }

      try {
        const AudioCtx =
          window.AudioContext ||
          (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        if (AudioCtx) {
          const ctx = new AudioCtx();
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(528, ctx.currentTime);
          osc.frequency.exponentialRampToValueAtTime(660, ctx.currentTime + 0.18);
          gain.gain.setValueAtTime(0.08, ctx.currentTime);
          gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.25);
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start();
          osc.stop(ctx.currentTime + 0.26);
        }
      } catch {
        // Ignore audio context restrictions
      }
    },
    [lang, handleNotify]
  );

  // Navigate smoothly to any section on the page
  const handleNavigateSection = useCallback(
    (sectionId: string, portalTab?: 'teacher' | 'student') => {
      if (portalTab) {
        setActivePortalTab(portalTab);
      }
      setActiveSection(sectionId);
      const el = document.getElementById(sectionId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    },
    []
  );

  // Track active section on scroll
  useEffect(() => {
    const onScroll = () => {
      const sectionIds = ['home', 'lessons', 'features', 'writing', 'portals', 'plans'];
      const viewportMid = window.innerHeight * 0.38;
      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const el = document.getElementById(sectionIds[i]);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= viewportMid) {
            setActiveSection(sectionIds[i]);
            break;
          }
        }
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleSelectLetter = useCallback((letter: ArabicLetterItem) => {
    setSelectedLetterId(letter.id);
  }, []);

  return (
    <div className="min-h-screen selection:bg-amber-400 selection:text-emerald-950 overflow-x-clip">
      <div className="sc-grain" aria-hidden="true" />
      {/* Sticky Full-Feature Navbar */}
      <Navbar
        lang={lang}
        onToggleLang={() => setLang((prev) => (prev === 'bn' ? 'en' : 'bn'))}
        darkMode={darkMode}
        onToggleDark={() => setDarkMode((prev) => !prev)}
        activeSection={activeSection}
        onNavigateSection={handleNavigateSection}
        onOpenModal={(modal) => setActiveModal(modal)}
        isSignedIn={isSignedIn}
        onSignOut={() => {
          setIsSignedIn(false);
          handleNotify(lang === 'bn' ? 'লগআউট সম্পন্ন হয়েছে' : 'Signed out successfully');
        }}
      />

      {/* Non-intrusive Audio / Action Toast */}
      {toastMessage && (
        <div
          role="status"
          aria-live="polite"
          className="fixed top-20 right-4 z-50 px-4 py-2.5 rounded-2xl bg-emerald-950/95 dark:bg-amber-400/95 text-amber-200 dark:text-emerald-950 text-xs font-bold shadow-xl border border-amber-400/30 flex items-center gap-2 transition-all"
        >
          <Volume2 className="w-4 h-4 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Main Scroll-Craft Multi-Act Journey */}
      <main>
        {/* ACT 1: Dimensional Parallax Hero Sanctuary */}
        <HeroDimensionalAct
          lang={lang}
          onNavigateSection={handleNavigateSection}
          onSpeakArabic={handleSpeakArabic}
        />

        {/* ACT 2: Interactive 29-Huruf Noorani Qaida & Makhraj Studio */}
        <MakhrajLessonAct
          lang={lang}
          selectedLetterId={selectedLetterId}
          onSelectLetter={handleSelectLetter}
          onSpeakArabic={handleSpeakArabic}
          onOpenTraceForLetter={(arabicChar) => {
            setTraceText(arabicChar);
            handleNavigateSection('writing');
          }}
        />

        {/* ACT 3: 6 Core Platform Features Showcase */}
        <FeaturesPanAct
          lang={lang}
          onNavigateSection={handleNavigateSection}
          onSpeakArabic={handleSpeakArabic}
        />

        {/* ACT 4: THE ENGINEERED PEAK - Interactive Arabic Writing Board Pro */}
        <WritingBoardPeakAct
          lang={lang}
          traceText={traceText}
          onChangeTraceText={setTraceText}
          onNavigatePlans={() => handleNavigateSection('plans')}
        />

        {/* ACT 5: Teacher Portal Pro, Student Portal & Transparent Pricing Plans */}
        <PortalsAndPlansAct
          lang={lang}
          activePortalTab={activePortalTab}
          onChangePortalTab={setActivePortalTab}
          onOpenLogin={() => setActiveModal('login')}
          onNavigateLessons={() => handleNavigateSection('lessons')}
          onNavigateWriting={(word) => {
            if (word) setTraceText(word);
            handleNavigateSection('writing');
          }}
        />
      </main>

      {/* ACT 6: Resolved Sanctuary Footer, Modals (Login, 14-item Settings, Complaint) & RTL Scroll Trace Rail */}
      <DialogsAndTraceRail
        lang={lang}
        darkMode={darkMode}
        onToggleLang={() => setLang((prev) => (prev === 'bn' ? 'en' : 'bn'))}
        onToggleTheme={() => setDarkMode((prev) => !prev)}
        onNavigateSection={handleNavigateSection}
        pageProgress={pageProgress}
        selectedLetterId={selectedLetterId}
        onSelectLetter={(letter) => {
          setSelectedLetterId(letter.id);
          const found = ARABIC_LETTERS.find((l) => l.id === letter.id);
          if (found) setTraceText(found.arabic);
        }}
        activeModal={activeModal}
        onCloseModal={() => setActiveModal(null)}
        onOpenModal={(modal) => setActiveModal(modal)}
        onSignInSuccess={(role) => {
          setIsSignedIn(true);
          setActivePortalTab(role);
        }}
        onSpeakArabic={handleSpeakArabic}
        onNotify={handleNotify}
      />
    </div>
  );
}
