import React, { useState } from 'react';
import {
  X,
  LogIn,
  Settings,
  AlertTriangle,
  Volume2,
  CheckCircle2,
  Download,
  RotateCcw,
  Globe,
  Sun,
  Moon,
  Feather,
  GraduationCap,
  School,
} from 'lucide-react';
import {
  Language,
  ARABIC_LETTERS,
  ArabicLetterItem,
  validateComplaintForm,
  ComplaintInput,
} from '../data/qaidaData';

export type ModalKind = 'login' | 'settings' | 'complaint' | null;

interface DialogsAndTraceRailProps {
  lang: Language;
  darkMode: boolean;
  onToggleLang: () => void;
  onToggleTheme: () => void;
  onNavigateSection: (sectionId: string, portalTab?: 'teacher' | 'student') => void;
  pageProgress: number;
  selectedLetterId: number;
  onSelectLetter: (letter: ArabicLetterItem) => void;
  activeModal: ModalKind;
  onCloseModal: () => void;
  onOpenModal: (modal: 'login' | 'settings' | 'complaint') => void;
  onSignInSuccess: (role: 'teacher' | 'student') => void;
  onSpeakArabic: (text: string, label?: string) => void;
  onNotify: (msg: string) => void;
}

export const DialogsAndTraceRail: React.FC<DialogsAndTraceRailProps> = ({
  lang,
  darkMode,
  onToggleLang,
  onToggleTheme,
  onNavigateSection,
  pageProgress,
  selectedLetterId,
  onSelectLetter,
  activeModal,
  onCloseModal,
  onOpenModal,
  onSignInSuccess,
  onSpeakArabic,
  onNotify,
}) => {
  // Login modal state
  const [loginRole, setLoginRole] = useState<'teacher' | 'student'>('teacher');
  const [loginMode, setLoginMode] = useState<'login' | 'register' | 'mobile'>('login');
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginName, setLoginName] = useState('');
  const [loginMobile, setLoginMobile] = useState('');

  // Settings state (all 14 items from the scanned site)
  const [textSize, setTextSize] = useState<'normal' | 'large' | 'xlarge'>('normal');
  const [highContrast, setHighContrast] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [defaultPaper, setDefaultPaper] = useState('warm');
  const [defaultGuide, setDefaultGuide] = useState('ruled');
  const [defaultPenSize, setDefaultPenSize] = useState(14);
  const [palmRejection, setPalmRejection] = useState(true);
  const [traceOpacity, setTraceOpacity] = useState(30);
  const [audioVolume, setAudioVolume] = useState(90);
  const [audioSpeed, setAudioSpeed] = useState<'slow' | 'normal' | 'fast'>('normal');
  const [audioRepeat, setAudioRepeat] = useState(1);
  const [autosaveEnabled, setAutosaveEnabled] = useState(true);
  const [exportFormat, setExportFormat] = useState<'png' | 'pdf'>('pdf');

  // Complaint modal state
  const [complaintInput, setComplaintInput] = useState<ComplaintInput>({
    issueType: '',
    location: '',
    details: '',
    contactEmail: '',
  });
  const [complaintError, setComplaintError] = useState<string | null>(null);
  const [complaintPreviewReady, setComplaintPreviewReady] = useState(false);

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSignInSuccess(loginRole);
    onNavigateSection('portals', loginRole);
    onCloseModal();
    onNotify(
      lang === 'bn'
        ? `${loginRole === 'teacher' ? 'শিক্ষক' : 'শিক্ষার্থী'} পোর্টালে স্বাগতম!`
        : `Welcome to the ${loginRole === 'teacher' ? 'Teacher' : 'Student'} Portal!`
    );
  };

  const handleComplaintSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const res = validateComplaintForm(complaintInput, lang);
    if (!res.valid) {
      setComplaintError(res.error || '');
      setComplaintPreviewReady(false);
      return;
    }
    setComplaintError(null);
    setComplaintPreviewReady(true);
  };

  const handleResetSettings = () => {
    setTextSize('normal');
    setHighContrast(false);
    setReducedMotion(false);
    setDefaultPaper('warm');
    setDefaultGuide('ruled');
    setDefaultPenSize(14);
    setPalmRejection(true);
    setTraceOpacity(30);
    setAudioVolume(90);
    setAudioSpeed('normal');
    setAudioRepeat(1);
    setAutosaveEnabled(true);
    setExportFormat('pdf');
    onNotify(lang === 'bn' ? 'সকল সেটিংস ডিফল্ট অবস্থায় রিসেট করা হয়েছে' : 'All settings reset to default');
  };

  // Calculate active letter index along the 29-Huruf RTL Scroll Trace Rail
  const activeTraceCount = Math.max(1, Math.min(29, Math.ceil(pageProgress * 29)));

  return (
    <>
      {/* RESOLVED CLOSING ACT & SANCTUARY FOOTER */}
      <footer className="relative pt-20 pb-24 border-t border-emerald-950/15 dark:border-amber-200/10 bg-[#EFE6D4]/90 dark:bg-[#04120E]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Resolved Sanctuary CTA Banner */}
          <div
            data-sc-in
            className="rounded-3xl p-8 sm:p-12 mb-14 border border-amber-500/30 bg-gradient-to-br from-emerald-950 via-[#07221B] to-[#041510] text-[#F6F1E5] shadow-2xl relative overflow-hidden"
          >
            <div className="absolute -right-10 -bottom-14 arabic-font text-[180px] leading-none text-amber-400/10 select-none pointer-events-none">
              اقْرَأْ
            </div>
            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-8 space-y-3">
                <p className="arabic-font text-2xl sm:text-3xl text-amber-300">
                  بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ
                </p>
                <h2 className="text-2xl sm:text-4xl font-bold tracking-tight">
                  {lang === 'bn'
                    ? 'আজই শুরু করুন আপনার বিশুদ্ধ কুরআন শিক্ষার যাত্রা'
                    : 'Begin Your Authentic Quranic Learning Journey Today'}
                </h2>
                <p className="text-sm sm:text-base text-emerald-100/80 max-w-2xl leading-relaxed">
                  {lang === 'bn'
                    ? 'লগইন ছাড়াই নূরানী কায়দার ২৯টি হরফ, মাখরাজ ও রাইটিং বোর্ড অনুশীলন করুন অথবা শিক্ষক ও ছাত্র পোর্টালে যুক্ত হোন।'
                    : 'Practice all 29 Noorani Qaida letters, Makhraj articulation, and the Writing Board without login, or join the Teacher and Student portals.'}
                </p>
              </div>
              <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3">
                <button
                  type="button"
                  onClick={() => onNavigateSection('lessons')}
                  className="px-6 py-3.5 rounded-xl font-bold text-sm bg-gradient-to-r from-amber-500 to-amber-400 text-emerald-950 shadow-lg hover:brightness-105 transition flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>{lang === 'bn' ? 'লগইন ছাড়া শিখুন →' : 'Learn without login →'}</span>
                </button>
                <div className="grid grid-cols-2 gap-2.5">
                  <button
                    type="button"
                    onClick={() => onNavigateSection('portals', 'teacher')}
                    className="px-4 py-2.5 rounded-xl text-xs font-bold bg-emerald-900/70 hover:bg-emerald-800/80 text-amber-200 border border-amber-400/25 transition cursor-pointer"
                  >
                    {lang === 'bn' ? '🏫 শিক্ষক পোর্টাল Pro' : '🏫 Teacher Portal Pro'}
                  </button>
                  <button
                    type="button"
                    onClick={() => onNavigateSection('portals', 'student')}
                    className="px-4 py-2.5 rounded-xl text-xs font-bold bg-emerald-900/70 hover:bg-emerald-800/80 text-emerald-100 border border-emerald-400/25 transition cursor-pointer"
                  >
                    {lang === 'bn' ? '🎓 ছাত্র পোর্টাল' : '🎓 Student Portal'}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Complete Sitemap Links ensuring zero missed navbar pages */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-10 border-b border-emerald-950/10 dark:border-amber-200/10">
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl flex items-center justify-center bg-gradient-to-br from-emerald-800 to-emerald-950 text-amber-300 border border-amber-400/30">
                  <span className="arabic-font text-xl font-bold leading-none">ق</span>
                </div>
                <div>
                  <span className="font-bold text-base block text-emerald-950 dark:text-[#F6F1E5]">
                    {lang === 'bn' ? 'ডিজিটাল কায়দা' : 'Digital Qaida'}
                  </span>
                  <span className="text-xs text-emerald-900/60 dark:text-emerald-200/60">
                    {lang === 'bn' ? 'ডিজিটাল কায়দা শিক্ষা প্ল্যাটফর্ম' : 'Digital Qaida Learning Platform'}
                  </span>
                </div>
              </div>
              <p className="text-xs text-emerald-900/75 dark:text-emerald-200/70 leading-relaxed">
                {lang === 'bn'
                  ? 'সঠিক উচ্চারণে কুরআন শিখুন : ধাপে ধাপে, সহজে, যেকোনো ডিভাইসে'
                  : 'Learn the Quran with accurate pronunciation : step by step, with ease, on any device'}
              </p>
            </div>

            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-amber-800 dark:text-amber-300 mb-3">
                {lang === 'bn' ? 'প্রধান পাতা' : 'Main Pages'}
              </h3>
              <ul className="space-y-2 text-xs font-medium text-emerald-950/80 dark:text-emerald-100/75">
                <li>
                  <button type="button" onClick={() => onNavigateSection('home')} className="hover:text-amber-600 dark:hover:text-amber-300 cursor-pointer">
                    {lang === 'bn' ? 'হোম' : 'Home'}
                  </button>
                </li>
                <li>
                  <button type="button" onClick={() => onNavigateSection('lessons')} className="hover:text-amber-600 dark:hover:text-amber-300 cursor-pointer">
                    {lang === 'bn' ? 'পাঠ (পাঠ ১ / ৩০)' : 'Lessons (Lesson 1 / 30)'}
                  </button>
                </li>
                <li>
                  <button type="button" onClick={() => onNavigateSection('writing')} className="hover:text-amber-600 dark:hover:text-amber-300 cursor-pointer">
                    {lang === 'bn' ? 'রাইটিং Pro' : 'Writing Pro'}
                  </button>
                </li>
                <li>
                  <button type="button" onClick={() => onNavigateSection('plans')} className="hover:text-amber-600 dark:hover:text-amber-300 cursor-pointer">
                    {lang === 'bn' ? 'প্ল্যান' : 'Plans'}
                  </button>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-amber-800 dark:text-amber-300 mb-3">
                {lang === 'bn' ? 'পোর্টাল' : 'Portals'}
              </h3>
              <ul className="space-y-2 text-xs font-medium text-emerald-950/80 dark:text-emerald-100/75">
                <li>
                  <button
                    type="button"
                    onClick={() => onNavigateSection('portals', 'teacher')}
                    className="hover:text-amber-600 dark:hover:text-amber-300 cursor-pointer"
                  >
                    {lang === 'bn' ? '🏫 শিক্ষক পোর্টাল Pro' : '🏫 Teacher Portal Pro'}
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => onNavigateSection('portals', 'student')}
                    className="hover:text-amber-600 dark:hover:text-amber-300 cursor-pointer"
                  >
                    {lang === 'bn' ? '🎓 শিক্ষার্থী পোর্টাল' : '🎓 Student Portal'}
                  </button>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-amber-800 dark:text-amber-300 mb-3">
                {lang === 'bn' ? 'একাউন্ট' : 'Account'}
              </h3>
              <ul className="space-y-2 text-xs font-medium text-emerald-950/80 dark:text-emerald-100/75">
                <li>
                  <button type="button" onClick={() => onOpenModal('login')} className="hover:text-amber-600 dark:hover:text-amber-300 cursor-pointer">
                    {lang === 'bn' ? 'লগইন' : 'Login'}
                  </button>
                </li>
                <li>
                  <button type="button" onClick={() => onOpenModal('settings')} className="hover:text-amber-600 dark:hover:text-amber-300 cursor-pointer">
                    {lang === 'bn' ? 'সেটিংস' : 'Settings'}
                  </button>
                </li>
                <li>
                  <button type="button" onClick={() => onOpenModal('complaint')} className="hover:text-amber-600 dark:hover:text-amber-300 cursor-pointer">
                    {lang === 'bn' ? 'অভিযোগ জানান' : 'Report an issue'}
                  </button>
                </li>
              </ul>
            </div>
          </div>

          <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-emerald-900/70 dark:text-emerald-200/60">
            <p>
              {lang === 'bn'
                ? '© ২০২৫ ডিজিটাল কায়দা লার্নিং · সকল স্বত্ব সংরক্ষিত'
                : '© 2025 Digital Qaida Learning · All rights reserved'}
            </p>
            <p className="font-semibold text-amber-800 dark:text-amber-300/90">
              {lang === 'bn' ? 'উম্মাহর জন্য ❤️ দিয়ে তৈরি' : 'Designed with ❤️ for the Ummah'}
            </p>
          </div>
        </div>
      </footer>

      {/* BESPOKE SIGNATURE MOVE: Fixed Bottom RTL 29-Huruf & Qalam Scroll Trace Rail (height 40px) */}
      <div
        aria-label={lang === 'bn' ? '২৯ হরফ স্ক্রল ট্রেস রেল' : '29 Huruf Scroll Trace Rail'}
        className="fixed bottom-0 inset-x-0 z-40 h-10 bg-[#FAF5E8]/95 dark:bg-[#051812]/95 backdrop-blur-md border-t border-emerald-950/15 dark:border-amber-300/15 px-3 flex items-center justify-between gap-3"
      >
        {/* Left: Current Act Quick Indicator */}
        <div className="flex items-center gap-2 shrink-0">
          <Feather className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
          <span className="text-[11px] font-mono font-bold text-emerald-950 dark:text-amber-200 hidden sm:inline">
            {lang === 'bn' ? 'কলম স্ক্রল রেল' : 'Qalam Trace Rail'}
          </span>
          <span className="text-[11px] font-mono px-1.5 py-0.5 rounded bg-amber-500/15 text-amber-800 dark:text-amber-300">
            {activeTraceCount}/29
          </span>
        </div>

        {/* Center: RTL 29-Huruf interactive ribbon */}
        <div
          dir="rtl"
          className="flex-1 flex items-center justify-start sm:justify-center gap-1 overflow-x-auto no-scrollbar py-0.5"
        >
          {ARABIC_LETTERS.map((item, idx) => {
            const isLit = idx < activeTraceCount;
            const isSelected = item.id === selectedLetterId;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => {
                  onSelectLetter(item);
                  onSpeakArabic(item.arabic, lang === 'bn' ? item.nameBn : item.nameEn);
                }}
                title={`${lang === 'bn' ? item.nameBn : item.nameEn} (${item.makhrajBn})`}
                className={`w-6 h-6 shrink-0 rounded-md arabic-font text-sm leading-none flex items-center justify-center transition cursor-pointer ${
                  isSelected
                    ? 'bg-amber-400 text-emerald-950 font-bold scale-110 shadow-sm'
                    : isLit
                    ? 'bg-emerald-900/15 dark:bg-amber-400/15 text-emerald-950 dark:text-amber-300 font-semibold'
                    : 'text-emerald-900/35 dark:text-emerald-200/30 hover:text-emerald-950 dark:hover:text-amber-200'
                }`}
              >
                {item.arabic}
              </button>
            );
          })}
        </div>

        {/* Right: RTL Progress Bar */}
        <div className="hidden md:flex items-center gap-2 shrink-0 w-28">
          <div className="w-full h-1.5 rounded-full bg-emerald-950/10 dark:bg-white/10 overflow-hidden" dir="rtl">
            <div
              className="h-full bg-gradient-to-l from-amber-500 to-emerald-500 transition-all duration-150"
              style={{ width: `${Math.round(pageProgress * 100)}%` }}
            />
          </div>
        </div>
      </div>

      {/* ================================================================= */}
      {/* DIALOG 1: LOGIN / REGISTER MODAL (লগইন)                         */}
      {/* ================================================================= */}
      {activeModal === 'login' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-3xl p-6 sm:p-7 bg-[#FAF5E8] dark:bg-[#09231B] border border-emerald-950/15 dark:border-amber-300/25 shadow-2xl text-emerald-950 dark:text-[#F6F1E5] max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-4 border-b border-emerald-950/10 dark:border-white/10">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-amber-500/20 text-amber-700 dark:text-amber-300 flex items-center justify-center">
                  <LogIn className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold">
                    {lang === 'bn' ? 'ডিজিটাল কায়দা' : 'Digital Qaida'}
                  </h3>
                  <p className="text-xs text-emerald-900/65 dark:text-emerald-200/65">
                    {lang === 'bn' ? 'আপনার একাউন্টে প্রবেশ করুন' : 'Sign in to your account'}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={onCloseModal}
                className="p-2 rounded-lg hover:bg-emerald-950/10 dark:hover:bg-white/10 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Role Selector: Teacher / Student */}
            <div className="grid grid-cols-2 gap-2 my-4 p-1 rounded-xl bg-emerald-950/5 dark:bg-[#051611]">
              <button
                type="button"
                onClick={() => setLoginRole('teacher')}
                className={`py-2.5 rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 transition cursor-pointer ${
                  loginRole === 'teacher'
                    ? 'bg-emerald-900 text-amber-300 shadow'
                    : 'text-emerald-900/70 dark:text-emerald-100/70'
                }`}
              >
                <School className="w-4 h-4" />
                <span>{lang === 'bn' ? '🏫 শিক্ষক' : '🏫 Teacher'}</span>
              </button>
              <button
                type="button"
                onClick={() => setLoginRole('student')}
                className={`py-2.5 rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 transition cursor-pointer ${
                  loginRole === 'student'
                    ? 'bg-emerald-900 text-amber-300 shadow'
                    : 'text-emerald-900/70 dark:text-emerald-100/70'
                }`}
              >
                <GraduationCap className="w-4 h-4" />
                <span>{lang === 'bn' ? '🎓 ছাত্র' : '🎓 Student'}</span>
              </button>
            </div>

            {/* Mode tabs: Login / Register / Mobile */}
            <div className="flex items-center gap-2 mb-4 text-xs font-semibold">
              <button
                type="button"
                onClick={() => setLoginMode('login')}
                className={`px-3 py-1.5 rounded-lg cursor-pointer ${
                  loginMode === 'login'
                    ? 'bg-amber-500/20 text-amber-900 dark:text-amber-300 font-bold'
                    : 'text-emerald-900/60 dark:text-emerald-200/60'
                }`}
              >
                {lang === 'bn' ? 'লগইন করুন' : 'Login'}
              </button>
              <button
                type="button"
                onClick={() => setLoginMode('register')}
                className={`px-3 py-1.5 rounded-lg cursor-pointer ${
                  loginMode === 'register'
                    ? 'bg-amber-500/20 text-amber-900 dark:text-amber-300 font-bold'
                    : 'text-emerald-900/60 dark:text-emerald-200/60'
                }`}
              >
                {lang === 'bn' ? 'রেজিস্টার করুন' : 'Register'}
              </button>
              <button
                type="button"
                onClick={() => setLoginMode('mobile')}
                className={`px-3 py-1.5 rounded-lg cursor-pointer ${
                  loginMode === 'mobile'
                    ? 'bg-amber-500/20 text-amber-900 dark:text-amber-300 font-bold'
                    : 'text-emerald-900/60 dark:text-emerald-200/60'
                }`}
              >
                {lang === 'bn' ? '📱 মোবাইল নম্বর' : '📱 Mobile Number'}
              </button>
            </div>

            <form onSubmit={handleLoginSubmit} className="space-y-3.5">
              {loginMode === 'register' && (
                <div>
                  <label className="text-xs font-semibold block mb-1">
                    {lang === 'bn' ? 'পূর্ণ নাম' : 'Full Name'}
                  </label>
                  <input
                    type="text"
                    required
                    value={loginName}
                    onChange={(e) => setLoginName(e.target.value)}
                    placeholder={lang === 'bn' ? 'আপনার নাম লিখুন' : 'Enter your name'}
                    className="w-full px-3.5 py-2.5 rounded-xl text-sm bg-white dark:bg-[#051611] border border-emerald-950/15 dark:border-white/15"
                  />
                </div>
              )}

              {loginMode === 'mobile' ? (
                <div>
                  <label className="text-xs font-semibold block mb-1">
                    {lang === 'bn' ? 'মোবাইল নম্বর দিয়ে লগইন' : 'Login with Mobile Number'}
                  </label>
                  <input
                    type="tel"
                    required
                    value={loginMobile}
                    onChange={(e) => setLoginMobile(e.target.value)}
                    placeholder="01XXXXXXXXX"
                    className="w-full px-3.5 py-2.5 rounded-xl text-sm bg-white dark:bg-[#051611] border border-emerald-950/15 dark:border-white/15"
                  />
                </div>
              ) : (
                <>
                  <div>
                    <label className="text-xs font-semibold block mb-1">
                      {lang === 'bn' ? 'ইমেইল' : 'Email'}
                    </label>
                    <input
                      type="email"
                      required
                      value={loginEmail}
                      onChange={(e) => setLoginEmail(e.target.value)}
                      placeholder="name@example.com"
                      className="w-full px-3.5 py-2.5 rounded-xl text-sm bg-white dark:bg-[#051611] border border-emerald-950/15 dark:border-white/15"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold block mb-1">
                      {lang === 'bn' ? 'পাসওয়ার্ড' : 'Password'}
                    </label>
                    <input
                      type="password"
                      required
                      value={loginPassword}
                      onChange={(e) => setLoginPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full px-3.5 py-2.5 rounded-xl text-sm bg-white dark:bg-[#051611] border border-emerald-950/15 dark:border-white/15"
                    />
                  </div>
                </>
              )}

              <button
                type="submit"
                className="w-full py-3 rounded-xl font-bold text-sm bg-gradient-to-r from-amber-500 to-amber-400 text-emerald-950 shadow-md hover:brightness-105 transition cursor-pointer"
              >
                {loginMode === 'register'
                  ? lang === 'bn'
                    ? 'একাউন্ট তৈরি করুন'
                    : 'Create Account'
                  : lang === 'bn'
                  ? 'লগইন করুন'
                  : 'Sign In'}
              </button>
            </form>

            <div className="my-4 flex items-center gap-3 text-xs text-emerald-900/50 dark:text-emerald-200/50">
              <div className="h-px flex-1 bg-emerald-950/10 dark:bg-white/10" />
              <span>{lang === 'bn' ? 'অথবা' : 'OR'}</span>
              <div className="h-px flex-1 bg-emerald-950/10 dark:bg-white/10" />
            </div>

            <div className="space-y-2.5">
              <button
                type="button"
                onClick={() => {
                  onSignInSuccess(loginRole);
                  onNavigateSection('portals', loginRole);
                  onCloseModal();
                  onNotify(lang === 'bn' ? 'Google একাউন্টের মাধ্যমে প্রবেশ করা হয়েছে' : 'Signed in with Google');
                }}
                className="w-full py-2.5 rounded-xl text-xs font-bold bg-white dark:bg-[#051611] border border-emerald-950/15 dark:border-white/15 hover:border-amber-400 transition cursor-pointer"
              >
                🌐 {lang === 'bn' ? 'Google দিয়ে লগইন করুন' : 'Continue with Google'}
              </button>
              <button
                type="button"
                onClick={() => {
                  onNavigateSection('lessons');
                  onCloseModal();
                }}
                className="w-full py-2.5 rounded-xl text-xs font-bold text-emerald-900 dark:text-amber-300 hover:underline flex items-center justify-center gap-1 cursor-pointer"
              >
                <span>{lang === 'bn' ? 'একাউন্ট ছাড়া শিখুন →' : 'Learn without account →'}</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ================================================================= */}
      {/* DIALOG 2: 14-SECTION SETTINGS MODAL (সেটিংস)                     */}
      {/* ================================================================= */}
      {activeModal === 'settings' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="w-full max-w-2xl rounded-3xl p-6 sm:p-8 bg-[#FAF5E8] dark:bg-[#09231B] border border-emerald-950/15 dark:border-amber-300/25 shadow-2xl text-emerald-950 dark:text-[#F6F1E5] max-h-[88vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-4 border-b border-emerald-950/10 dark:border-white/10 sticky top-0 bg-[#FAF5E8] dark:bg-[#09231B] z-10">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-amber-500/20 text-amber-700 dark:text-amber-300 flex items-center justify-center">
                  <Settings className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold">
                    {lang === 'bn' ? 'সেটিংস ও পছন্দসমূহ (১৪টি বিভাগ)' : 'Settings & Preferences (14 Sections)'}
                  </h3>
                  <p className="text-xs text-emerald-900/65 dark:text-emerald-200/65">
                    {lang === 'bn'
                      ? 'ভাষা, থিম, অডিও, রাইটিং বোর্ড এবং অ্যাক্সেসিবিলিটি নিয়ন্ত্রণ করুন'
                      : 'Configure language, theme, audio, writing board, and accessibility'}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={onCloseModal}
                className="p-2 rounded-lg hover:bg-emerald-950/10 dark:hover:bg-white/10 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-5">
              {/* 1. Language */}
              <div className="p-4 rounded-2xl bg-white/80 dark:bg-[#051611]/90 border border-emerald-950/10 dark:border-white/10">
                <p className="text-xs font-bold text-amber-800 dark:text-amber-300 mb-2">
                  1. {lang === 'bn' ? 'ভাষা (Language)' : 'Language'}
                </p>
                <button
                  type="button"
                  onClick={onToggleLang}
                  className="w-full py-2 px-3 rounded-xl text-xs font-bold bg-emerald-900 text-amber-300 flex items-center justify-between cursor-pointer"
                >
                  <span>{lang === 'bn' ? 'বাংলা (Bangla)' : 'English'}</span>
                  <Globe className="w-4 h-4" />
                </button>
              </div>

              {/* 2. Theme */}
              <div className="p-4 rounded-2xl bg-white/80 dark:bg-[#051611]/90 border border-emerald-950/10 dark:border-white/10">
                <p className="text-xs font-bold text-amber-800 dark:text-amber-300 mb-2">
                  2. {lang === 'bn' ? 'থিম ও স্ক্রিন মোড (Theme)' : 'Theme & Appearance'}
                </p>
                <button
                  type="button"
                  onClick={onToggleTheme}
                  className="w-full py-2 px-3 rounded-xl text-xs font-bold bg-emerald-900 text-amber-300 flex items-center justify-between cursor-pointer"
                >
                  <span>
                    {darkMode
                      ? lang === 'bn'
                        ? 'ডার্ক স্যাংকচুয়ারি'
                        : 'Dark Sanctuary'
                      : lang === 'bn'
                      ? 'লাইট পার্চমেন্ট'
                      : 'Light Parchment'}
                  </span>
                  {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                </button>
              </div>

              {/* 3. Text & Control Size */}
              <div className="p-4 rounded-2xl bg-white/80 dark:bg-[#051611]/90 border border-emerald-950/10 dark:border-white/10">
                <p className="text-xs font-bold text-amber-800 dark:text-amber-300 mb-2">
                  3. {lang === 'bn' ? 'টেক্সট ও কন্ট্রোল সাইজ' : 'Text & Control Size'}
                </p>
                <div className="flex gap-1.5">
                  {(['normal', 'large', 'xlarge'] as const).map((sz) => (
                    <button
                      key={sz}
                      type="button"
                      onClick={() => setTextSize(sz)}
                      className={`flex-1 py-1.5 rounded-lg text-xs font-bold cursor-pointer ${
                        textSize === sz ? 'bg-amber-400 text-emerald-950' : 'bg-emerald-950/5 dark:bg-white/5'
                      }`}
                    >
                      {sz.toUpperCase()}
                    </button>
                  ))}
                </div>
              </div>

              {/* 4. Accessibility */}
              <div className="p-4 rounded-2xl bg-white/80 dark:bg-[#051611]/90 border border-emerald-950/10 dark:border-white/10">
                <p className="text-xs font-bold text-amber-800 dark:text-amber-300 mb-2">
                  4. {lang === 'bn' ? 'অ্যাক্সেসিবিলিটি (Accessibility)' : 'Accessibility'}
                </p>
                <div className="flex items-center justify-between text-xs mb-1.5">
                  <span>{lang === 'bn' ? 'হাই কনট্রাস্ট' : 'High Contrast'}</span>
                  <input type="checkbox" checked={highContrast} onChange={(e) => setHighContrast(e.target.checked)} />
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span>{lang === 'bn' ? 'অ্যানিমেশন কমান' : 'Reduced Motion'}</span>
                  <input type="checkbox" checked={reducedMotion} onChange={(e) => setReducedMotion(e.target.checked)} />
                </div>
              </div>

              {/* 5. Board Appearance */}
              <div className="p-4 rounded-2xl bg-white/80 dark:bg-[#051611]/90 border border-emerald-950/10 dark:border-white/10">
                <p className="text-xs font-bold text-amber-800 dark:text-amber-300 mb-2">
                  5. {lang === 'bn' ? 'বোর্ড পেপার ও গাইড' : 'Board Appearance'}
                </p>
                <div className="flex gap-2 text-xs">
                  <select
                    value={defaultPaper}
                    onChange={(e) => setDefaultPaper(e.target.value)}
                    className="flex-1 px-2 py-1.5 rounded-lg bg-emerald-950/5 dark:bg-white/10"
                  >
                    <option value="warm">Warm Paper</option>
                    <option value="white">White</option>
                    <option value="night">Night</option>
                  </select>
                  <select
                    value={defaultGuide}
                    onChange={(e) => setDefaultGuide(e.target.value)}
                    className="flex-1 px-2 py-1.5 rounded-lg bg-emerald-950/5 dark:bg-white/10"
                  >
                    <option value="ruled">Ruled</option>
                    <option value="grid">Grid</option>
                    <option value="blank">Blank</option>
                  </select>
                </div>
              </div>

              {/* 6. Pen Defaults */}
              <div className="p-4 rounded-2xl bg-white/80 dark:bg-[#051611]/90 border border-emerald-950/10 dark:border-white/10">
                <p className="text-xs font-bold text-amber-800 dark:text-amber-300 mb-2">
                  6. {lang === 'bn' ? 'কলমের ডিফল্ট সাইজ' : 'Pen Defaults'} ({defaultPenSize}px)
                </p>
                <input
                  type="range"
                  min={4}
                  max={28}
                  value={defaultPenSize}
                  onChange={(e) => setDefaultPenSize(Number(e.target.value))}
                  className="w-full accent-amber-500"
                />
              </div>

              {/* 7. Touch & Stylus */}
              <div className="p-4 rounded-2xl bg-white/80 dark:bg-[#051611]/90 border border-emerald-950/10 dark:border-white/10">
                <p className="text-xs font-bold text-amber-800 dark:text-amber-300 mb-2">
                  7. {lang === 'bn' ? 'টাচ ও স্টাইলাস (Palm Rejection)' : 'Touch & Stylus'}
                </p>
                <label className="flex items-center justify-between text-xs cursor-pointer">
                  <span>{lang === 'bn' ? 'পাম রিজেকশন সক্রিয়' : 'Enable Palm Rejection'}</span>
                  <input type="checkbox" checked={palmRejection} onChange={(e) => setPalmRejection(e.target.checked)} />
                </label>
              </div>

              {/* 8. Tracing Preferences */}
              <div className="p-4 rounded-2xl bg-white/80 dark:bg-[#051611]/90 border border-emerald-950/10 dark:border-white/10">
                <p className="text-xs font-bold text-amber-800 dark:text-amber-300 mb-2">
                  8. {lang === 'bn' ? 'ট্রেসিং গাইড অপাসিটি' : 'Tracing Opacity'} ({traceOpacity}%)
                </p>
                <input
                  type="range"
                  min={10}
                  max={70}
                  value={traceOpacity}
                  onChange={(e) => setTraceOpacity(Number(e.target.value))}
                  className="w-full accent-amber-500"
                />
              </div>

              {/* 9. Audio Volume, Speed, Repeat & Test */}
              <div className="p-4 rounded-2xl bg-white/80 dark:bg-[#051611]/90 border border-emerald-950/10 dark:border-white/10 sm:col-span-2">
                <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                  <p className="text-xs font-bold text-amber-800 dark:text-amber-300">
                    9. {lang === 'bn' ? 'অডিও ভলিউম, গতি ও পুনরাবৃত্তি' : 'Audio Volume, Speed & Repeat'}
                  </p>
                  <button
                    type="button"
                    onClick={() => onSpeakArabic('بِسْمِ اللَّهِ', lang === 'bn' ? 'অডিও টেস্ট' : 'Audio Test')}
                    className="px-3 py-1 rounded-lg text-xs font-bold bg-amber-400 text-emerald-950 flex items-center gap-1 cursor-pointer"
                  >
                    <Volume2 className="w-3.5 h-3.5" />
                    <span>{lang === 'bn' ? 'অডিও টেস্ট' : 'Test Audio'}</span>
                  </button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                  <div>
                    <span>Volume: {audioVolume}%</span>
                    <input
                      type="range"
                      min={0}
                      max={100}
                      value={audioVolume}
                      onChange={(e) => setAudioVolume(Number(e.target.value))}
                      className="w-full accent-amber-500"
                    />
                  </div>
                  <div>
                    <span className="block mb-1">Speed:</span>
                    <select
                      value={audioSpeed}
                      onChange={(e) => setAudioSpeed(e.target.value as 'slow' | 'normal' | 'fast')}
                      className="w-full px-2 py-1 rounded bg-emerald-950/5 dark:bg-white/10"
                    >
                      <option value="slow">0.75x (Slow)</option>
                      <option value="normal">1.0x (Normal)</option>
                      <option value="fast">1.25x (Fast)</option>
                    </select>
                  </div>
                  <div>
                    <span className="block mb-1">Repeat ({audioRepeat}x):</span>
                    <input
                      type="number"
                      min={1}
                      max={5}
                      value={audioRepeat}
                      onChange={(e) => setAudioRepeat(Number(e.target.value))}
                      className="w-full px-2 py-1 rounded bg-emerald-950/5 dark:bg-white/10"
                    />
                  </div>
                </div>
              </div>

              {/* 10. Autosave & Backup */}
              <div className="p-4 rounded-2xl bg-white/80 dark:bg-[#051611]/90 border border-emerald-950/10 dark:border-white/10">
                <p className="text-xs font-bold text-amber-800 dark:text-amber-300 mb-2">
                  10. {lang === 'bn' ? 'অটোসেভ ও ব্যাকআপ' : 'Autosave & Backup'}
                </p>
                <label className="flex items-center justify-between text-xs cursor-pointer">
                  <span>{lang === 'bn' ? 'স্বয়ংক্রিয় সংরক্ষণ' : 'Auto-save board strokes'}</span>
                  <input type="checkbox" checked={autosaveEnabled} onChange={(e) => setAutosaveEnabled(e.target.checked)} />
                </label>
              </div>

              {/* 11. Export Preferences */}
              <div className="p-4 rounded-2xl bg-white/80 dark:bg-[#051611]/90 border border-emerald-950/10 dark:border-white/10">
                <p className="text-xs font-bold text-amber-800 dark:text-amber-300 mb-2">
                  11. {lang === 'bn' ? 'এক্সপোর্ট ফরম্যাট' : 'Export Preferences'}
                </p>
                <div className="flex gap-2">
                  {(['pdf', 'png'] as const).map((fmt) => (
                    <button
                      key={fmt}
                      type="button"
                      onClick={() => setExportFormat(fmt)}
                      className={`flex-1 py-1.5 rounded-lg text-xs font-bold uppercase cursor-pointer ${
                        exportFormat === fmt ? 'bg-amber-400 text-emerald-950' : 'bg-emerald-950/5 dark:bg-white/5'
                      }`}
                    >
                      {fmt}
                    </button>
                  ))}
                </div>
              </div>

              {/* 12. Privacy & Local Data */}
              <div className="p-4 rounded-2xl bg-white/80 dark:bg-[#051611]/90 border border-emerald-950/10 dark:border-white/10">
                <p className="text-xs font-bold text-amber-800 dark:text-amber-300 mb-2">
                  12. {lang === 'bn' ? 'প্রাইভেসি ও লোকাল ডেটা' : 'Privacy & Local Data'}
                </p>
                <p className="text-[11px] text-emerald-900/70 dark:text-emerald-200/70">
                  {lang === 'bn'
                    ? 'আপনার অনুশীলনের তথ্য ব্রাউজারে নিরাপদে সংরক্ষিত থাকে।'
                    : 'Your practice progress is stored safely on your device.'}
                </p>
              </div>

              {/* 13. Help & Shortcuts */}
              <div className="p-4 rounded-2xl bg-white/80 dark:bg-[#051611]/90 border border-emerald-950/10 dark:border-white/10">
                <p className="text-xs font-bold text-amber-800 dark:text-amber-300 mb-2">
                  13. {lang === 'bn' ? 'কীবোর্ড শর্টকাট' : 'Keyboard Shortcuts'}
                </p>
                <p className="text-[11px] font-mono text-emerald-900/80 dark:text-emerald-200/80">
                  P: Pen · E: Eraser · M: Mode · L: Line · F: Fullscreen
                </p>
              </div>
            </div>

            {/* 14. Reset Settings & Save */}
            <div className="pt-4 border-t border-emerald-950/10 dark:border-white/10 flex flex-wrap items-center justify-between gap-3">
              <button
                type="button"
                onClick={handleResetSettings}
                className="px-4 py-2 rounded-xl text-xs font-bold text-rose-700 dark:text-rose-300 bg-rose-500/10 hover:bg-rose-500/20 flex items-center gap-1.5 cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>14. {lang === 'bn' ? 'ডিফল্ট রিসেট করুন' : 'Reset All Settings'}</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  onCloseModal();
                  onNotify(lang === 'bn' ? 'সেটিংস সফলভাবে সংরক্ষিত হয়েছে' : 'Settings saved successfully');
                }}
                className="px-6 py-2.5 rounded-xl text-xs font-bold bg-gradient-to-r from-amber-500 to-amber-400 text-emerald-950 shadow cursor-pointer"
              >
                {lang === 'bn' ? 'সংরক্ষণ ও বন্ধ করুন' : 'Save & Close'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ================================================================= */}
      {/* DIALOG 3: REPORT AN ISSUE MODAL (অভিযোগ জানান)                   */}
      {/* ================================================================= */}
      {activeModal === 'complaint' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="w-full max-w-lg rounded-3xl p-6 sm:p-7 bg-[#FAF5E8] dark:bg-[#09231B] border border-emerald-950/15 dark:border-amber-300/25 shadow-2xl text-emerald-950 dark:text-[#F6F1E5] max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-4 border-b border-emerald-950/10 dark:border-white/10">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-amber-500/20 text-amber-700 dark:text-amber-300 flex items-center justify-center">
                  <AlertTriangle className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold">
                    {lang === 'bn' ? 'অভিযোগ বা সমস্যা জানান' : 'Report an Issue'}
                  </h3>
                  <p className="text-xs text-emerald-900/65 dark:text-emerald-200/65">
                    {lang === 'bn'
                      ? 'কোনো বাগ, অডিও সমস্যা বা পরামর্শ আমাদের জানান'
                      : 'Let us know about any bug, audio issue, or suggestion'}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={onCloseModal}
                className="p-2 rounded-lg hover:bg-emerald-950/10 dark:hover:bg-white/10 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {!complaintPreviewReady ? (
              <form onSubmit={handleComplaintSubmit} className="space-y-4 mt-4">
                {complaintError && (
                  <div className="p-3 rounded-xl bg-rose-500/15 border border-rose-500/30 text-xs font-semibold text-rose-700 dark:text-rose-300">
                    {complaintError}
                  </div>
                )}

                <div>
                  <label className="text-xs font-bold block mb-1">
                    {lang === 'bn' ? 'সমস্যার ধরন নির্বাচন করুন *' : 'Select Issue Type *'}
                  </label>
                  <select
                    value={complaintInput.issueType}
                    onChange={(e) => setComplaintInput({ ...complaintInput, issueType: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl text-sm bg-white dark:bg-[#051611] border border-emerald-950/15 dark:border-white/15"
                  >
                    <option value="">{lang === 'bn' ? '-- নির্বাচন করুন --' : '-- Select --'}</option>
                    <option value="audio">{lang === 'bn' ? 'অডিও বা উচ্চারণ সমস্যা' : 'Audio / Pronunciation Issue'}</option>
                    <option value="board">{lang === 'bn' ? 'রাইটিং বোর্ড বা কলম সমস্যা' : 'Writing Board / Pen Issue'}</option>
                    <option value="portal">{lang === 'bn' ? 'শিক্ষক / ছাত্র পোর্টাল সমস্যা' : 'Teacher / Student Portal Issue'}</option>
                    <option value="other">{lang === 'bn' ? 'অন্যান্য পরামর্শ' : 'Other Suggestion'}</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-bold block mb-1">
                    {lang === 'bn' ? 'সমস্যার স্থান নির্বাচন করুন' : 'Where did it happen?'}
                  </label>
                  <select
                    value={complaintInput.location}
                    onChange={(e) => setComplaintInput({ ...complaintInput, location: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl text-sm bg-white dark:bg-[#051611] border border-emerald-950/15 dark:border-white/15"
                  >
                    <option value="">{lang === 'bn' ? '-- স্থান নির্বাচন করুন --' : '-- Select Area --'}</option>
                    <option value="home">{lang === 'bn' ? 'হোম' : 'Home'}</option>
                    <option value="lessons">{lang === 'bn' ? 'পাঠ' : 'Lessons'}</option>
                    <option value="writing">{lang === 'bn' ? 'রাইটিং Pro' : 'Writing Pro'}</option>
                    <option value="portals">{lang === 'bn' ? 'পোর্টাল' : 'Portals'}</option>
                    <option value="plans">{lang === 'bn' ? 'প্ল্যান' : 'Plans'}</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-bold block mb-1">
                    {lang === 'bn' ? 'বিস্তারিত বিবরণ (কমপক্ষে ১২ অক্ষর) *' : 'Detailed Description (min 12 chars) *'}
                  </label>
                  <textarea
                    rows={3}
                    value={complaintInput.details}
                    onChange={(e) => setComplaintInput({ ...complaintInput, details: e.target.value })}
                    placeholder={
                      lang === 'bn'
                        ? 'সমস্যাটি কীভাবে ঘটেছে তা সংক্ষেপে লিখুন...'
                        : 'Describe what happened in detail...'
                    }
                    className="w-full px-3.5 py-2.5 rounded-xl text-sm bg-white dark:bg-[#051611] border border-emerald-950/15 dark:border-white/15"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold block mb-1">
                    {lang === 'bn' ? 'যোগাযোগের ইমেইল (ঐচ্ছিক)' : 'Contact Email (Optional)'}
                  </label>
                  <input
                    type="email"
                    value={complaintInput.contactEmail}
                    onChange={(e) => setComplaintInput({ ...complaintInput, contactEmail: e.target.value })}
                    placeholder="you@example.com"
                    className="w-full px-3.5 py-2.5 rounded-xl text-sm bg-white dark:bg-[#051611] border border-emerald-950/15 dark:border-white/15"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-xl font-bold text-sm bg-gradient-to-r from-amber-500 to-amber-400 text-emerald-950 shadow-md hover:brightness-105 transition cursor-pointer"
                >
                  {lang === 'bn' ? 'প্রিভিউ তৈরি করুন' : 'Generate Preview'}
                </button>
              </form>
            ) : (
              <div className="mt-4 space-y-4">
                <div className="p-4 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 flex items-center gap-2.5 text-emerald-900 dark:text-emerald-200">
                  <CheckCircle2 className="w-5 h-5 shrink-0 text-emerald-600 dark:text-emerald-400" />
                  <span className="text-xs font-bold">
                    {lang === 'bn'
                      ? 'আপনার অভিযোগের প্রিভিউ তৈরি হয়েছে'
                      : 'Your complaint preview is ready'}
                  </span>
                </div>

                <div className="p-4 rounded-2xl bg-white/80 dark:bg-[#051611] border border-emerald-950/10 dark:border-white/10 text-xs space-y-2">
                  <p>
                    <strong>{lang === 'bn' ? 'ধরন:' : 'Type:'}</strong> {complaintInput.issueType}
                  </p>
                  {complaintInput.location && (
                    <p>
                      <strong>{lang === 'bn' ? 'স্থান:' : 'Area:'}</strong> {complaintInput.location}
                    </p>
                  )}
                  <p>
                    <strong>{lang === 'bn' ? 'বিবরণ:' : 'Details:'}</strong> {complaintInput.details}
                  </p>
                  {complaintInput.contactEmail && (
                    <p>
                      <strong>{lang === 'bn' ? 'ইমেইল:' : 'Email:'}</strong> {complaintInput.contactEmail}
                    </p>
                  )}
                </div>

                <div className="flex flex-wrap gap-2.5">
                  <button
                    type="button"
                    onClick={() => setComplaintPreviewReady(false)}
                    className="flex-1 py-2.5 rounded-xl text-xs font-bold bg-emerald-950/10 dark:bg-white/10 cursor-pointer"
                  >
                    {lang === 'bn' ? 'সম্পাদনা করুন' : 'Edit'}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      onNotify(
                        lang === 'bn'
                          ? 'অভিযোগের কপি সংরক্ষিত হয়েছে'
                          : 'Complaint copy saved locally'
                      );
                    }}
                    className="flex-1 py-2.5 rounded-xl text-xs font-bold bg-emerald-900/20 text-emerald-950 dark:text-amber-300 border border-amber-400/30 flex items-center justify-center gap-1 cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>{lang === 'bn' ? 'কপি সংরক্ষণ' : 'Save a copy'}</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setComplaintPreviewReady(false);
                      setComplaintInput({ issueType: '', location: '', details: '', contactEmail: '' });
                      onCloseModal();
                      onNotify(
                        lang === 'bn'
                          ? 'আপনার অভিযোগ সফলভাবে পাঠানো হয়েছে। জাযাকাল্লাহু খাইরান!'
                          : 'Your report has been submitted. JazakAllahu Khairan!'
                      );
                    }}
                    className="flex-1 py-2.5 rounded-xl text-xs font-bold bg-gradient-to-r from-amber-500 to-amber-400 text-emerald-950 shadow cursor-pointer"
                  >
                    {lang === 'bn' ? 'পাঠিয়ে দিন' : 'Send Report'}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};
