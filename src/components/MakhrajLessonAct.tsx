import React, { useState } from 'react';
import { Volume2, RotateCcw, ArrowLeft, ArrowRight, Sparkles, Maximize2, CheckCircle2 } from 'lucide-react';
import { ARABIC_LETTERS, ArabicLetterItem, filterLettersByRegion, Language } from '../data/qaidaData';

export interface MakhrajLessonActProps {
  lang: Language;
  selectedLetterId: number;
  onSelectLetter: (letter: ArabicLetterItem) => void;
  onSpeakArabic: (text: string, label?: string) => void;
  onOpenTraceForLetter: (arabicChar: string) => void;
}

export const MakhrajLessonAct: React.FC<MakhrajLessonActProps> = ({
  lang,
  selectedLetterId,
  onSelectLetter,
  onSpeakArabic,
  onOpenTraceForLetter
}) => {
  const [teachingMode, setTeachingMode] = useState(false);
  const [regionFilter, setRegionFilter] = useState<'all' | 'throat' | 'tongue' | 'lips' | 'nasal' | 'empty'>('all');
  const [lessonPage, setLessonPage] = useState(1);

  const visibleLetters = filterLettersByRegion(regionFilter);
  const activeLetter = ARABIC_LETTERS.find((l) => l.id === selectedLetterId) || ARABIC_LETTERS[0];

  const lessonTitlesBn: Record<number, { title: string; subtitle: string; pct: number }> = {
    1: { title: 'প্রথম পাঠ : আরবি ২৯ হরফ (মুফরাদাত)', subtitle: 'নূরানী কায়দা · পাতা ১', pct: 3 },
    2: { title: 'দ্বিতীয় পাঠ : মুরাক্কাবাত (যুক্ত হরফ)', subtitle: 'নূরানী কায়দা · পাতা ২', pct: 7 },
    3: { title: 'তৃতীয় পাঠ : হরকত (যবর, যের, পেশ)', subtitle: 'নূরানী কায়দা · পাতা ৩', pct: 10 }
  };

  const lessonTitlesEn: Record<number, { title: string; subtitle: string; pct: number }> = {
    1: { title: 'Lesson 1 : 29 Arabic Letters (Mufradat)', subtitle: 'Noorani Qaida · Page 1', pct: 3 },
    2: { title: 'Lesson 2 : Connected Letters (Murakkabat)', subtitle: 'Noorani Qaida · Page 2', pct: 7 },
    3: { title: 'Lesson 3 : Short Vowels (Fatha, Kasra, Damma)', subtitle: 'Noorani Qaida · Page 3', pct: 10 }
  };

  const currentLessonMeta = lang === 'bn' ? lessonTitlesBn[lessonPage] : lessonTitlesEn[lessonPage];

  return (
    <section
      id="lessons"
      data-sc-act="pin"
      data-sc-span="2.1"
      className="scroll-mt-20 py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto"
    >
      {/* Lesson Progress Bar Strip (from actual website) */}
      <div className="mb-8 p-3.5 sm:px-5 rounded-xl bg-[#0D2E22]/10 dark:bg-white/5 border border-[var(--sc-hairline)] flex items-center gap-4">
        <span className="text-xs sm:text-sm font-semibold whitespace-nowrap tabular-nums">
          {lang === 'bn' ? `পাঠ ${lessonPage} / ৩০` : `Lesson ${lessonPage} / 30`}
        </span>
        <div className="flex-1 h-2.5 rounded-full bg-black/10 dark:bg-white/10 overflow-hidden">
          <div
            className="h-full bg-[#14533C] dark:bg-[#D9A441] transition-all duration-300"
            style={{ width: `${currentLessonMeta.pct}%` }}
          />
        </div>
        <span className="text-xs sm:text-sm font-mono font-semibold tabular-nums">
          {lang === 'bn' ? `${currentLessonMeta.pct}%` : `${currentLessonMeta.pct}%`}
        </span>
      </div>

      {/* Section Header & Teaching Mode Smartboard Controls */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
        <div>
          <p className="text-xs font-mono uppercase tracking-widest text-[#14533C] dark:text-[#D9A441] mb-2">
            {lang === 'bn' ? 'পাঠসমূহ · মাখরাজ ও উচ্চারণ স্টুডিও' : 'LESSONS · MAKHRAJ & PRONUNCIATION STUDIO'}
          </p>
          <h2
            className="font-bold tracking-tight text-[var(--sc-ink)]"
            style={{ fontSize: 'clamp(1.65rem, 3vw, 2.5rem)', textWrap: 'balance' }}
          >
            {currentLessonMeta.title}
          </h2>
          <p className="text-sm sm:text-base text-[var(--sc-ink-soft)] mt-1">{currentLessonMeta.subtitle}</p>
        </div>

        {/* Teaching Mode Toggle & Listen Button */}
        <div className="flex flex-wrap items-center gap-3">
          <label
            htmlFor="teachingModeSwitch"
            className="min-h-[42px] px-4 py-2 rounded-xl bg-[var(--sc-surface)] border border-[var(--sc-hairline-strong)] flex items-center gap-2.5 cursor-pointer select-none text-sm font-medium"
          >
            <input
              id="teachingModeSwitch"
              type="checkbox"
              checked={teachingMode}
              onChange={(e) => setTeachingMode(e.target.checked)}
              className="w-4 h-4 accent-[#14533C] dark:accent-[#D9A441] rounded cursor-pointer"
            />
            <span>{lang === 'bn' ? 'টিচিং মোড' : 'Teaching mode'}</span>
            <span className="text-[10px] font-bold uppercase px-1.5 py-0.5 rounded bg-[#D9A441] text-[#071712]">
              Pro
            </span>
          </label>

          <button
            type="button"
            onClick={() => onSpeakArabic(activeLetter.arabic, activeLetter.nameEn)}
            className="min-h-[42px] px-5 py-2 rounded-xl bg-[#14533C] dark:bg-[#D9A441] text-white dark:text-[#071712] font-bold text-sm flex items-center gap-2 shadow-sm hover:opacity-95 transition-opacity cursor-pointer whitespace-nowrap shrink-0"
          >
            <Volume2 className="w-4 h-4" />
            <span>{lang === 'bn' ? '🔊 শুনুন' : '🔊 Listen'}</span>
          </button>
        </div>
      </div>

      {/* Interactive Anatomical Makhraj Filter Bar */}
      <div className="mb-6 flex flex-wrap items-center gap-1.5 p-1.5 rounded-xl bg-[var(--sc-surface)] border border-[var(--sc-hairline)] w-fit">
        {(
          [
            { key: 'all', bn: 'সব হরফ (২৯)', en: 'All Letters (29)' },
            { key: 'throat', bn: 'হালক · গলা (৬)', en: 'Throat · Halq (6)' },
            { key: 'tongue', bn: 'লিসান · জিহ্বা (১৮)', en: 'Tongue · Lisan (18)' },
            { key: 'lips', bn: 'শাফাতাইন · ঠোঁট (৪)', en: 'Lips · Shafatayn (4)' },
            { key: 'nasal', bn: 'খাইশুম · নাসিকা (১)', en: 'Nasal · Khayshoom (1)' }
          ] as const
        ).map((tab) => (
          <button
            key={tab.key}
            type="button"
            onClick={() => setRegionFilter(tab.key)}
            className={`px-3 py-1.5 rounded-lg text-xs sm:text-sm font-medium transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
              regionFilter === tab.key
                ? 'bg-[#14533C] text-white dark:bg-[#D9A441] dark:text-[#071712] shadow-xs font-semibold'
                : 'text-[var(--sc-ink-soft)] hover:text-[var(--sc-ink)]'
            }`}
          >
            {lang === 'bn' ? tab.bn : tab.en}
          </button>
        ))}
      </div>

      {/* Main Split Stage: 29 Arabic Letters Board (Left) + Makhraj Anatomy Inspector (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left 8 Columns: RTL 29-Huruf Interactive Smartboard Grid */}
        <div
          className={`${
            teachingMode ? 'lg:col-span-12' : 'lg:col-span-8'
          } rounded-2xl bg-[var(--sc-surface)] border border-[var(--sc-hairline-strong)] p-4 sm:p-6 transition-all`}
        >
          <div className="flex items-center justify-between mb-4 text-xs text-[var(--sc-ink-soft)]">
            <span>
              {lang === 'bn'
                ? '👆 যেকোনো হরফে ক্লিক করে উচ্চারণ ও মাখরাজ দেখুন'
                : '👆 Click any letter to hear pronunciation and inspect its Makhraj'}
            </span>
            <span className="font-mono">RTL · ডান থেকে বাম ←</span>
          </div>

          <div
            dir="rtl"
            className={`grid ${
              teachingMode
                ? 'grid-cols-3 sm:grid-cols-5 md:grid-cols-6 gap-3.5'
                : 'grid-cols-4 sm:grid-cols-6 md:grid-cols-7 gap-2.5'
            }`}
          >
            {visibleLetters.map((item) => {
              const isSelected = item.id === activeLetter.id;
              const displayArabic =
                lessonPage === 2
                  ? `${item.arabic}ـ`
                  : lessonPage === 3
                  ? `${item.arabic}َ`
                  : item.arabic;

              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => {
                    onSelectLetter(item);
                    onSpeakArabic(item.arabic, item.nameEn);
                  }}
                  aria-pressed={isSelected}
                  className={`group relative rounded-xl p-3 flex flex-col items-center justify-center transition-all cursor-pointer border ${
                    teachingMode ? 'min-h-[110px]' : 'min-h-[82px]'
                  } ${
                    isSelected
                      ? 'bg-[#0A261C] text-[#E5B85C] border-[#D9A441] shadow-lg scale-[1.03]'
                      : 'bg-[var(--sc-surface-elevated)] hover:bg-[#14533C]/10 dark:hover:bg-white/10 text-[var(--sc-ink)] border-[var(--sc-hairline)]'
                  }`}
                >
                  <span className="absolute top-1.5 right-2 text-[10px] font-mono opacity-55 tabular-nums">
                    {item.id}
                  </span>
                  <span
                    lang="ar"
                    className={`arabic-font leading-none select-none ${
                      teachingMode ? 'text-5xl sm:text-6xl' : 'text-3xl sm:text-4xl'
                    }`}
                  >
                    {displayArabic}
                  </span>
                  <span
                    className={`mt-2 text-xs font-medium truncate max-w-full ${
                      isSelected ? 'text-white' : 'text-[var(--sc-ink-soft)]'
                    }`}
                  >
                    {lang === 'bn' ? item.nameBn : item.nameEn}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Bottom Lesson Navigation Controls (exact match to website) */}
          <div className="mt-6 pt-4 border-t border-[var(--sc-hairline)] flex flex-wrap items-center justify-between gap-3">
            <button
              type="button"
              onClick={() => setLessonPage((p) => (p > 1 ? p - 1 : 3))}
              className="min-h-[42px] px-4 py-2 rounded-xl border border-[var(--sc-hairline-strong)] hover:bg-black/5 dark:hover:bg-white/5 text-sm font-medium flex items-center gap-2 transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>{lang === 'bn' ? '← আগের পাঠ' : '← Previous lesson'}</span>
            </button>

            <button
              type="button"
              onClick={() => onSpeakArabic(activeLetter.arabic, activeLetter.nameEn)}
              className="min-h-[42px] px-5 py-2 rounded-xl bg-[#D9A441] text-[#071712] font-bold text-sm flex items-center gap-2 hover:bg-[#E5B85C] transition-colors cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
              <span>{lang === 'bn' ? '🔊 আবার শুনুন' : '🔊 Listen again'}</span>
            </button>

            <button
              type="button"
              onClick={() => setLessonPage((p) => (p < 3 ? p + 1 : 1))}
              className="min-h-[42px] px-4 py-2 rounded-xl bg-[#14533C] dark:bg-white/15 text-white text-sm font-medium flex items-center gap-2 hover:opacity-90 transition-opacity cursor-pointer"
            >
              <span>{lang === 'bn' ? 'পরের পাঠ →' : 'Next lesson →'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Right 4 Columns: Live Makhraj Detail Panel (📍 মাখরাজ, 🗣️ বাংলায় উচ্চারণ, 📝 উচ্চারণের ধাপ) */}
        <div
          className={`${
            teachingMode ? 'lg:col-span-12' : 'lg:col-span-4'
          } rounded-2xl bg-[var(--sc-surface-elevated)] border border-[var(--sc-hairline-strong)] p-5 sm:p-6 shadow-md space-y-5`}
        >
          <div className="flex items-center justify-between pb-4 border-b border-[var(--sc-hairline)]">
            <div>
              <span className="text-xs font-mono uppercase tracking-wider text-[#14533C] dark:text-[#D9A441]">
                {lang === 'bn' ? activeLetter.regionLabelBn : activeLetter.regionLabelEn}
              </span>
              <h3 className="text-xl font-bold text-[var(--sc-ink)] mt-0.5">
                {lang === 'bn'
                  ? `${activeLetter.nameBn} (${activeLetter.nameEn})`
                  : `${activeLetter.nameEn} (${activeLetter.nameBn})`}
              </h3>
            </div>
            <div
              lang="ar"
              dir="rtl"
              className="arabic-font w-16 h-16 rounded-2xl bg-[#0A261C] text-[#E5B85C] text-5xl flex items-center justify-center shadow-inner"
            >
              {activeLetter.arabic}
            </div>
          </div>

          {/* 1. 📍 মাখরাজ */}
          <div className="p-4 rounded-xl bg-[var(--sc-surface)] border border-[var(--sc-hairline)] space-y-1.5">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#14533C] dark:text-[#D9A441]">
              {lang === 'bn' ? '📍 মাখরাজ (উচ্চারণ স্থান)' : '📍 Articulation point (Makhraj)'}
            </h4>
            <p className="text-sm text-[var(--sc-ink)] leading-relaxed">
              {lang === 'bn' ? activeLetter.makhrajBn : activeLetter.makhrajEn}
            </p>
          </div>

          {/* 2. 🗣️ বাংলায় উচ্চারণ */}
          <div className="p-4 rounded-xl bg-[var(--sc-surface)] border border-[var(--sc-hairline)] flex items-center justify-between">
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#14533C] dark:text-[#D9A441]">
                {lang === 'bn' ? '🗣️ বাংলায় উচ্চারণ' : '🗣️ Bengali & Phonetic Pronunciation'}
              </h4>
              <p className="text-base font-bold text-[var(--sc-ink)] mt-1">
                {activeLetter.nameBn} · <span className="font-mono text-sm">/{activeLetter.translit}/</span>
              </p>
            </div>
            <div className="text-right">
              <span lang="ar" dir="rtl" className="arabic-font text-2xl text-[#14533C] dark:text-[#E5B85C]">
                {activeLetter.exampleWord}
              </span>
              <p className="text-xs text-[var(--sc-ink-soft)]">
                {lang === 'bn' ? activeLetter.exampleMeaningBn : activeLetter.exampleMeaningEn}
              </p>
            </div>
          </div>

          {/* 3. 📝 উচ্চারণের ধাপ */}
          <div className="p-4 rounded-xl bg-[var(--sc-surface)] border border-[var(--sc-hairline)] space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#14533C] dark:text-[#D9A441]">
              {lang === 'bn' ? '📝 উচ্চারণের ধাপ' : '📝 Pronunciation steps'}
            </h4>
            <ul className="space-y-1.5 text-sm text-[var(--sc-ink)]">
              {(lang === 'bn' ? activeLetter.stepsBn : activeLetter.stepsEn).map((step, i) => (
                <li key={i} className="leading-relaxed">
                  {step}
                </li>
              ))}
            </ul>
          </div>

          {/* Direct Action to Trace this Letter in the Arabic Writing Board */}
          <button
            type="button"
            onClick={() => onOpenTraceForLetter(activeLetter.arabic)}
            className="w-full min-h-[44px] py-2.5 px-4 rounded-xl bg-[#0A261C] hover:bg-[#113829] text-[#E5B85C] font-semibold text-sm flex items-center justify-center gap-2 transition-colors cursor-pointer"
          >
            <span>
              {lang === 'bn'
                ? `রাইটিং বোর্ডে "${activeLetter.arabic}" লিখুন ও ট্রেস করুন →`
                : `Trace & Practice "${activeLetter.arabic}" on Writing Board →`}
            </span>
          </button>
        </div>
      </div>
    </section>
  );
};
