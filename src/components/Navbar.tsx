import React, { useState, useRef, useEffect } from 'react';
import {
  ChevronDown,
  Moon,
  Sun,
  Menu,
  X,
  GraduationCap,
  School,
  LogIn,
  Settings,
  AlertCircle,
  LogOut,
  CheckCircle2
} from 'lucide-react';
import { Language } from '../data/qaidaData';

export interface NavbarProps {
  lang: Language;
  onToggleLang: () => void;
  darkMode: boolean;
  onToggleDark: () => void;
  activeSection: string;
  onNavigateSection: (sectionId: string, portalTab?: 'teacher' | 'student') => void;
  onOpenModal: (modal: 'login' | 'settings' | 'complaint') => void;
  isSignedIn: boolean;
  onSignOut: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  lang,
  onToggleLang,
  darkMode,
  onToggleDark,
  activeSection,
  onNavigateSection,
  onOpenModal,
  isSignedIn,
  onSignOut
}) => {
  const [portalOpen, setPortalOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const portalRef = useRef<HTMLDivElement>(null);
  const accountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleOutside = (e: MouseEvent) => {
      if (portalRef.current && !portalRef.current.contains(e.target as Node)) {
        setPortalOpen(false);
      }
      if (accountRef.current && !accountRef.current.contains(e.target as Node)) {
        setAccountOpen(false);
      }
    };
    document.addEventListener('mousedown', handleOutside);
    return () => document.removeEventListener('mousedown', handleOutside);
  }, []);

  const handleNav = (sectionId: string, portalTab?: 'teacher' | 'student') => {
    setPortalOpen(false);
    setAccountOpen(false);
    setMobileMenuOpen(false);
    onNavigateSection(sectionId, portalTab);
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-[#0A261C]/95 dark:bg-[#05120D]/95 backdrop-blur-md border-b border-[#D9A441]/20 text-[#F3EFE4] transition-colors">
      <nav
        aria-label={lang === 'bn' ? 'প্রধান নেভিগেশন' : 'Main Navigation'}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4"
      >
        {/* Zone 1: Brand Wordmark with Arabic Qaf emblem */}
        <button
          type="button"
          onClick={() => handleNav('home')}
          className="flex items-center gap-2.5 text-left group cursor-pointer whitespace-nowrap shrink-0 focus:outline-none"
          aria-label={lang === 'bn' ? 'হোমপেজ - ডিজিটাল কায়দা' : 'Homepage - Digital Qaida'}
        >
          <span
            lang="ar"
            className="arabic-font w-9 h-9 rounded-lg bg-[#D9A441] text-[#071712] font-bold text-xl flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform"
          >
            ق
          </span>
          <span className="font-bold text-base sm:text-lg tracking-tight text-white">
            {lang === 'bn' ? 'ডিজিটাল কায়দা' : 'Digital Qaida'}
          </span>
        </button>

        {/* Zone 2: Complete Navbar Pages (হোম, পাঠ, রাইটিং Pro, প্ল্যান, পোর্টাল, একাউন্ট) */}
        <div className="hidden lg:flex items-center gap-1 xl:gap-2">
          <button
            type="button"
            onClick={() => handleNav('home')}
            className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
              activeSection === 'home'
                ? 'bg-white/15 text-white border border-white/20'
                : 'text-emerald-100/80 hover:text-white hover:bg-white/10'
            }`}
          >
            {lang === 'bn' ? 'হোম' : 'Home'}
          </button>

          <button
            type="button"
            onClick={() => handleNav('lessons')}
            className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
              activeSection === 'lessons'
                ? 'bg-white/15 text-white border border-white/20'
                : 'text-emerald-100/80 hover:text-white hover:bg-white/10'
            }`}
          >
            {lang === 'bn' ? 'পাঠ' : 'Lessons'}
          </button>

          <button
            type="button"
            onClick={() => handleNav('writing')}
            className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 cursor-pointer ${
              activeSection === 'writing'
                ? 'bg-white/15 text-white border border-white/20'
                : 'text-emerald-100/80 hover:text-white hover:bg-white/10'
            }`}
          >
            <span>{lang === 'bn' ? 'রাইটিং' : 'Writing'}</span>
            <span className="text-[11px] font-semibold uppercase tracking-wider px-1.5 py-0.5 rounded bg-[#D9A441] text-[#071712]">
              Pro
            </span>
          </button>

          <button
            type="button"
            onClick={() => handleNav('plans')}
            className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
              activeSection === 'plans'
                ? 'bg-white/15 text-white border border-white/20'
                : 'text-emerald-100/80 hover:text-white hover:bg-white/10'
            }`}
          >
            {lang === 'bn' ? 'প্ল্যান' : 'Plans'}
          </button>

          {/* পোর্টাল / Portals Dropdown */}
          <div className="relative" ref={portalRef}>
            <button
              type="button"
              onClick={() => {
                setPortalOpen((v) => !v);
                setAccountOpen(false);
              }}
              aria-expanded={portalOpen}
              className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 cursor-pointer ${
                activeSection === 'portals' || portalOpen
                  ? 'bg-white/15 text-white border border-white/20'
                  : 'text-emerald-100/80 hover:text-white hover:bg-white/10'
              }`}
            >
              <span>{lang === 'bn' ? 'পোর্টাল' : 'Portals'}</span>
              <ChevronDown className={`w-4 h-4 transition-transform ${portalOpen ? 'rotate-180' : ''}`} />
            </button>

            {portalOpen && (
              <div className="absolute left-0 mt-2 w-60 rounded-xl bg-[#0D2E22] border border-[#D9A441]/30 shadow-2xl py-2 z-50">
                <div className="px-3.5 py-1.5 text-[11px] font-mono uppercase tracking-wider text-emerald-300/70">
                  {lang === 'bn' ? 'পোর্টাল নির্বাচন করুন' : 'Select Portal'}
                </div>
                <button
                  type="button"
                  onClick={() => handleNav('portals', 'teacher')}
                  className="w-full px-3.5 py-2.5 text-left text-sm text-emerald-50 hover:bg-white/10 flex items-center justify-between transition-colors cursor-pointer"
                >
                  <span className="flex items-center gap-2">
                    <School className="w-4 h-4 text-[#D9A441]" />
                    <span>{lang === 'bn' ? 'শিক্ষক পোর্টাল' : 'Teacher portal'}</span>
                  </span>
                  <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-[#D9A441] text-[#071712]">
                    Pro
                  </span>
                </button>
                <button
                  type="button"
                  onClick={() => handleNav('portals', 'student')}
                  className="w-full px-3.5 py-2.5 text-left text-sm text-emerald-50 hover:bg-white/10 flex items-center gap-2 transition-colors cursor-pointer"
                >
                  <GraduationCap className="w-4 h-4 text-emerald-300" />
                  <span>{lang === 'bn' ? 'শিক্ষার্থী পোর্টাল' : 'Student portal'}</span>
                </button>
              </div>
            )}
          </div>

          {/* একাউন্ট / Account Dropdown */}
          <div className="relative" ref={accountRef}>
            <button
              type="button"
              onClick={() => {
                setAccountOpen((v) => !v);
                setPortalOpen(false);
              }}
              aria-expanded={accountOpen}
              className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 cursor-pointer ${
                accountOpen
                  ? 'bg-white/15 text-white border border-white/20'
                  : 'text-emerald-100/80 hover:text-white hover:bg-white/10'
              }`}
            >
              <span>{lang === 'bn' ? 'একাউন্ট' : 'Account'}</span>
              <ChevronDown className={`w-4 h-4 transition-transform ${accountOpen ? 'rotate-180' : ''}`} />
            </button>

            {accountOpen && (
              <div className="absolute right-0 mt-2 w-60 rounded-xl bg-[#0D2E22] border border-[#D9A441]/30 shadow-2xl py-2 z-50">
                <div className="px-3.5 py-2 border-b border-white/10 flex items-center justify-between text-xs text-emerald-200/80">
                  <span>{isSignedIn ? (lang === 'bn' ? 'লগইন করা আছে' : 'Signed in') : (lang === 'bn' ? 'অতিথি মোড' : 'Guest mode')}</span>
                  <span className="font-mono text-[11px] text-[#D9A441]">Free Plan</span>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setAccountOpen(false);
                    onOpenModal('login');
                  }}
                  className="w-full px-3.5 py-2.5 text-left text-sm text-emerald-50 hover:bg-white/10 flex items-center gap-2.5 transition-colors cursor-pointer"
                >
                  <LogIn className="w-4 h-4 text-[#D9A441]" />
                  <span>{lang === 'bn' ? 'লগইন' : 'Log in'}</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setAccountOpen(false);
                    onOpenModal('settings');
                  }}
                  className="w-full px-3.5 py-2.5 text-left text-sm text-emerald-50 hover:bg-white/10 flex items-center gap-2.5 transition-colors cursor-pointer"
                >
                  <Settings className="w-4 h-4 text-emerald-300" />
                  <span>{lang === 'bn' ? 'সেটিংস' : 'Settings'}</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setAccountOpen(false);
                    onOpenModal('complaint');
                  }}
                  className="w-full px-3.5 py-2.5 text-left text-sm text-emerald-50 hover:bg-white/10 flex items-center gap-2.5 transition-colors cursor-pointer"
                >
                  <AlertCircle className="w-4 h-4 text-amber-300" />
                  <span>{lang === 'bn' ? 'অভিযোগ জানান' : 'Report an issue'}</span>
                </button>
                {isSignedIn && (
                  <button
                    type="button"
                    onClick={() => {
                      setAccountOpen(false);
                      onSignOut();
                    }}
                    className="w-full px-3.5 py-2.5 text-left text-sm text-rose-300 hover:bg-white/10 flex items-center gap-2.5 border-t border-white/10 mt-1 transition-colors cursor-pointer"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>{lang === 'bn' ? 'লগআউট' : 'Log out'}</span>
                  </button>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Zone 3: Language Toggle, Theme Toggle, and Mobile Hamburger */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={onToggleLang}
            aria-label={lang === 'bn' ? 'ইংরেজিতে পরিবর্তন করুন' : 'Switch to Bengali'}
            className="px-3 py-2 rounded-lg text-xs sm:text-sm font-medium bg-white/10 hover:bg-white/20 border border-white/20 text-white transition-colors whitespace-nowrap shrink-0 cursor-pointer min-h-[40px]"
          >
            বাংলা / English
          </button>

          <button
            type="button"
            onClick={onToggleDark}
            aria-label={darkMode ? 'Switch to light theme' : 'Switch to dark theme'}
            className="w-10 h-10 rounded-lg bg-white/10 hover:bg-white/20 border border-white/20 flex items-center justify-center text-[#D9A441] transition-colors shrink-0 cursor-pointer"
          >
            {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>

          <button
            type="button"
            onClick={() => setMobileMenuOpen((v) => !v)}
            aria-label={lang === 'bn' ? 'নেভিগেশন মেনু খুলুন' : 'Toggle navigation menu'}
            aria-expanded={mobileMenuOpen}
            className="lg:hidden w-10 h-10 rounded-lg bg-white/10 hover:bg-white/20 border border-white/20 flex items-center justify-center text-white transition-colors shrink-0 cursor-pointer"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile Navigation Drawer: Includes EVERY page and dropdown item with >=44px touch targets */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#081F17] border-t border-white/15 px-4 pt-3 pb-6 space-y-3 max-h-[82vh] overflow-y-auto">
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => handleNav('home')}
              className="min-h-[44px] px-3.5 py-2.5 rounded-lg text-left text-sm font-medium bg-white/10 text-white flex items-center justify-between"
            >
              <span>{lang === 'bn' ? 'হোম' : 'Home'}</span>
              {activeSection === 'home' && <CheckCircle2 className="w-4 h-4 text-[#D9A441]" />}
            </button>
            <button
              type="button"
              onClick={() => handleNav('lessons')}
              className="min-h-[44px] px-3.5 py-2.5 rounded-lg text-left text-sm font-medium bg-white/10 text-white flex items-center justify-between"
            >
              <span>{lang === 'bn' ? 'পাঠ' : 'Lessons'}</span>
              {activeSection === 'lessons' && <CheckCircle2 className="w-4 h-4 text-[#D9A441]" />}
            </button>
            <button
              type="button"
              onClick={() => handleNav('writing')}
              className="min-h-[44px] px-3.5 py-2.5 rounded-lg text-left text-sm font-medium bg-white/10 text-white flex items-center justify-between"
            >
              <span>{lang === 'bn' ? 'রাইটিং' : 'Writing'}</span>
              <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-[#D9A441] text-[#071712]">Pro</span>
            </button>
            <button
              type="button"
              onClick={() => handleNav('plans')}
              className="min-h-[44px] px-3.5 py-2.5 rounded-lg text-left text-sm font-medium bg-white/10 text-white flex items-center justify-between"
            >
              <span>{lang === 'bn' ? 'প্ল্যান' : 'Plans'}</span>
              {activeSection === 'plans' && <CheckCircle2 className="w-4 h-4 text-[#D9A441]" />}
            </button>
          </div>

          <div className="pt-2 border-t border-white/10">
            <p className="text-xs font-mono uppercase tracking-wider text-emerald-300/70 mb-2 px-1">
              {lang === 'bn' ? 'পোর্টালসমূহ' : 'Portals'}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => handleNav('portals', 'teacher')}
                className="min-h-[44px] px-3.5 py-2.5 rounded-lg text-left text-sm font-medium bg-white/5 hover:bg-white/10 text-emerald-50 flex items-center justify-between border border-white/10"
              >
                <span className="flex items-center gap-2">
                  <School className="w-4 h-4 text-[#D9A441]" />
                  <span>{lang === 'bn' ? 'শিক্ষক পোর্টাল' : 'Teacher portal'}</span>
                </span>
                <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-[#D9A441] text-[#071712]">Pro</span>
              </button>
              <button
                type="button"
                onClick={() => handleNav('portals', 'student')}
                className="min-h-[44px] px-3.5 py-2.5 rounded-lg text-left text-sm font-medium bg-white/5 hover:bg-white/10 text-emerald-50 flex items-center gap-2 border border-white/10"
              >
                <GraduationCap className="w-4 h-4 text-emerald-300" />
                <span>{lang === 'bn' ? 'শিক্ষার্থী পোর্টাল' : 'Student portal'}</span>
              </button>
            </div>
          </div>

          <div className="pt-2 border-t border-white/10">
            <p className="text-xs font-mono uppercase tracking-wider text-emerald-300/70 mb-2 px-1">
              {lang === 'bn' ? 'একাউন্ট ও সেটিংস' : 'Account & Settings'}
            </p>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenModal('login');
                }}
                className="min-h-[44px] px-3 py-2 rounded-lg text-xs sm:text-sm font-medium bg-[#D9A441] text-[#071712] font-semibold flex items-center justify-center gap-1.5"
              >
                <LogIn className="w-4 h-4" />
                <span>{lang === 'bn' ? 'লগইন' : 'Log in'}</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenModal('settings');
                }}
                className="min-h-[44px] px-3 py-2 rounded-lg text-xs sm:text-sm font-medium bg-white/10 text-white flex items-center justify-center gap-1.5"
              >
                <Settings className="w-4 h-4" />
                <span>{lang === 'bn' ? 'সেটিংস' : 'Settings'}</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenModal('complaint');
                }}
                className="min-h-[44px] px-3 py-2 rounded-lg text-xs sm:text-sm font-medium bg-white/10 text-white flex items-center justify-center gap-1.5"
              >
                <AlertCircle className="w-4 h-4 text-amber-300" />
                <span>{lang === 'bn' ? 'অভিযোগ' : 'Report'}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
