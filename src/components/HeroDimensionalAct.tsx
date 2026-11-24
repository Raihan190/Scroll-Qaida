import React, { useState } from 'react';
import { Volume2, School, GraduationCap, ArrowRight, Sparkles, BookOpen, PenTool } from 'lucide-react';
import { ARABIC_LETTERS, Language } from '../data/qaidaData';

export interface HeroDimensionalActProps {
  lang: Language;
  onNavigateSection: (sectionId: string, portalTab?: 'teacher' | 'student') => void;
  onSpeakArabic: (text: string, label?: string) => void;
}

export const HeroDimensionalAct: React.FC<HeroDimensionalActProps> = ({
  lang,
  onNavigateSection,
  onSpeakArabic
}) => {
  const [featuredIdx, setFeaturedIdx] = useState(20); // Default 'ق' (Qaaf, index 20)
  const activeLetter = ARABIC_LETTERS[featuredIdx] || ARABIC_LETTERS[20];

  const heroLetters = [
    { idx: 0, char: 'ا' },
    { idx: 1, char: 'ب' },
    { idx: 4, char: 'ج' },
    { idx: 17, char: 'ع' },
    { idx: 20, char: 'ق' },
    { idx: 24, char: 'ن' }
  ];

  return (
    <section
      id="home"
      data-sc-act="pin"
      data-sc-span="1.8"
      data-sc-dwell="0.32"
      data-sc-spotlight
      className="relative min-h-[calc(100svh-4rem)] overflow-hidden bg-gradient-to-b from-[#071D15] via-[#0B2B1F] to-[#081F17] text-[#F3EFE4] flex items-center"
    >
      {/* =====================================================================
          PLANE 1 (FAR BACKGROUND, data-sc-parallax="-1.4"):
          Architectural Islamic Mashrabiya Lattice & Sanctuary Geometry
         ===================================================================== */}
      <div
        data-sc-parallax="-1.4"
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-25"
      >
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
          <defs>
            <pattern id="qaida-zellige" width="96" height="96" patternUnits="userSpaceOnUse">
              <path
                d="M48 0 L62 34 L96 48 L62 62 L48 96 L34 62 L0 48 L34 34 Z"
                fill="none"
                stroke="#D9A441"
                strokeWidth="0.75"
                strokeOpacity="0.45"
              />
              <circle cx="48" cy="48" r="16" fill="none" stroke="#34D399" strokeWidth="0.5" strokeOpacity="0.3" />
              <rect
                x="24"
                y="24"
                width="48"
                height="48"
                transform="rotate(45 48 48)"
                fill="none"
                stroke="#D9A441"
                strokeWidth="0.5"
                strokeOpacity="0.25"
              />
            </pattern>
            <radialGradient id="sanctuary-glow" cx="50%" cy="35%" r="65%">
              <stop offset="0%" stopColor="#D9A441" stopOpacity="0.22" />
              <stop offset="55%" stopColor="#10B981" stopOpacity="0.08" />
              <stop offset="100%" stopColor="#061510" stopOpacity="0" />
            </radialGradient>
          </defs>
          <rect width="100%" height="100%" fill="url(#qaida-zellige)" />
          <rect width="100%" height="100%" fill="url(#sanctuary-glow)" />
        </svg>
      </div>

      {/* =====================================================================
          PLANE 2 (MID-GROUND ARCH & CALLIGRAPHIC HALO, data-sc-parallax="-0.65"):
          Andalusian Sanctuary Archway & Floating Huruf Constellation
         ===================================================================== */}
      <div
        data-sc-parallax="-0.65"
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 flex items-center justify-center"
      >
        <svg
          viewBox="0 0 1440 900"
          className="w-full h-full object-cover opacity-35"
          preserveAspectRatio="xMidYMid slice"
        >
          <path
            d="M 220 900 L 220 380 C 220 160, 520 60, 720 40 C 920 60, 1220 160, 1220 380 L 1220 900"
            fill="none"
            stroke="#D9A441"
            strokeWidth="1.5"
            strokeDasharray="6 6"
          />
          <path
            d="M 280 900 L 280 400 C 280 200, 550 105, 720 85 C 890 105, 1160 200, 1160 400 L 1160 900"
            fill="none"
            stroke="#34D399"
            strokeWidth="1"
            strokeOpacity="0.4"
          />
        </svg>
      </div>

      {/* =====================================================================
          PLANE 3 (SUBJECT & COPY SPLIT STAGE):
          Left: Sacred Invocation & Primary Actions (1x rate)
          Right: 3D Tilted Interactive Smartboard Lectern (data-sc-parallax="-0.25")
         ===================================================================== */}
      <div className="relative z-20 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Lead Column: Exact Information from Digital Qaida Home */}
          <div className="lg:col-span-7 text-left space-y-6">
            {/* Bismillah Invocation Banner */}
            <div className="inline-flex flex-wrap items-center gap-3 px-4 py-2 rounded-xl bg-white/5 border border-[#D9A441]/30 backdrop-blur-sm">
              <p
                lang="ar"
                dir="rtl"
                className="arabic-font text-xl sm:text-2xl md:text-3xl text-[#E5B85C] tracking-wide leading-relaxed"
              >
                بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ
              </p>
              <button
                type="button"
                onClick={() => onSpeakArabic('بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ', 'Bismillah')}
                aria-label={lang === 'bn' ? 'বিসমিল্লাহ উচ্চারণ শুনুন' : 'Listen to Bismillah'}
                className="p-1.5 rounded-lg bg-[#D9A441]/20 hover:bg-[#D9A441]/35 text-[#E5B85C] transition-colors cursor-pointer"
                title={lang === 'bn' ? 'শুনুন' : 'Listen'}
              >
                <Volume2 className="w-4 h-4" />
              </button>
            </div>

            {/* Primary Display Heading & Subtitle */}
            <div className="space-y-3">
              <p className="text-xs sm:text-sm font-mono uppercase tracking-widest text-emerald-300/90">
                {lang === 'bn'
                  ? 'ডিজিটাল কায়দা শিক্ষা প্ল্যাটফর্ম · Digital Qaida Learning Platform'
                  : 'Digital Qaida Learning Platform · ডিজিটাল কায়দা শিক্ষা প্ল্যাটফর্ম'}
              </p>
              <h1
                className="font-extrabold tracking-tight text-white leading-[1.08]"
                style={{ fontSize: 'clamp(2.25rem, 4.5vw, 4.1rem)', textWrap: 'balance' }}
              >
                {lang === 'bn' ? 'ডিজিটাল কায়দা লার্নিং' : 'Digital Qaida Learning'}
              </h1>
              <p className="text-base sm:text-lg md:text-xl text-emerald-100/90 max-w-2xl leading-relaxed">
                {lang === 'bn'
                  ? 'সঠিক উচ্চারণে কুরআন শিখুন : ধাপে ধাপে, সহজে, যেকোনো ডিভাইসে'
                  : 'Learn the Quran with correct pronunciation : step by step, easily, on any device'}
              </p>
            </div>

            {/* Primary Portal CTAs & Guest Lesson Entry */}
            <div className="pt-2 flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-3.5">
              <button
                type="button"
                data-sc-magnet="0.18"
                onClick={() => onNavigateSection('portals', 'teacher')}
                className="min-h-[48px] px-6 py-3.5 rounded-xl bg-white text-[#071D15] hover:bg-emerald-50 font-bold text-base shadow-lg flex items-center justify-center gap-2.5 transition-all cursor-pointer whitespace-nowrap shrink-0"
              >
                <School className="w-5 h-5 text-[#14533C]" />
                <span>{lang === 'bn' ? 'শিক্ষক পোর্টাল' : 'Teacher portal'}</span>
                <span className="text-[11px] font-extrabold uppercase px-2 py-0.5 rounded bg-[#D9A441] text-[#071712]">
                  Pro
                </span>
              </button>

              <button
                type="button"
                data-sc-magnet="0.18"
                onClick={() => onNavigateSection('portals', 'student')}
                className="min-h-[48px] px-6 py-3.5 rounded-xl bg-[#D9A441] hover:bg-[#E5B85C] text-[#071712] font-bold text-base shadow-lg flex items-center justify-center gap-2.5 transition-all cursor-pointer whitespace-nowrap shrink-0"
              >
                <GraduationCap className="w-5 h-5" />
                <span>{lang === 'bn' ? 'ছাত্র পোর্টাল' : 'Student portal'}</span>
              </button>

              <button
                type="button"
                onClick={() => onNavigateSection('lessons')}
                className="min-h-[48px] px-5 py-3.5 rounded-xl bg-white/10 hover:bg-white/15 border border-white/30 text-white font-semibold text-sm sm:text-base flex items-center justify-center gap-2 transition-all cursor-pointer whitespace-nowrap shrink-0"
              >
                <span>{lang === 'bn' ? 'লগইন ছাড়া শিখুন' : 'Learn without logging in'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* Quiet Unboxed Metadata Strip (Zero-Pill Discipline) */}
            <div className="pt-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs sm:text-sm text-emerald-200/75">
              <span>{lang === 'bn' ? '৩০টি নূরানী কায়দা পাঠ' : '30 Noorani Qaida Lessons'}</span>
              <span aria-hidden="true">·</span>
              <span>{lang === 'bn' ? '২৯টি হরফের মাখরাজ ও অডিও' : '29 Huruf Makhraj & Audio'}</span>
              <span aria-hidden="true">·</span>
              <span>{lang === 'bn' ? 'আরবি রাইটিং স্মার্টবোর্ড Pro' : 'Arabic Writing Smartboard Pro'}</span>
            </div>
          </div>

          {/* Right Column: Dimensional Plane 3 Focal Subject (Interactive Smartboard Lectern) */}
          <div className="lg:col-span-5" data-sc-parallax="-0.25">
            <div
              data-sc-tilt="5"
              className="relative rounded-2xl bg-[#0D2E22]/90 border border-[#D9A441]/35 shadow-2xl p-5 sm:p-6 backdrop-blur-md"
            >
              {/* Top Lectern Header */}
              <div className="flex items-center justify-between pb-4 mb-4 border-b border-white/10">
                <div>
                  <p className="text-[11px] font-mono uppercase tracking-widest text-[#D9A441]">
                    {lang === 'bn' ? 'স্মার্টবোর্ড লাইভ প্রিভিউ' : 'SMARTBOARD LIVE PREVIEW'}
                  </p>
                  <h2 className="text-base font-bold text-white mt-0.5">
                    {lang === 'bn' ? 'প্রথম পাঠ : আরবি ২৯ হরফ' : 'Lesson 1 : 29 Arabic Letters'}
                  </h2>
                </div>
                <button
                  type="button"
                  onClick={() => onSpeakArabic(activeLetter.arabic, activeLetter.nameEn)}
                  className="px-3 py-1.5 rounded-lg bg-[#D9A441] text-[#071712] font-bold text-xs flex items-center gap-1.5 hover:bg-[#E5B85C] transition-colors cursor-pointer shrink-0"
                >
                  <Volume2 className="w-3.5 h-3.5" />
                  <span>{lang === 'bn' ? 'শুনুন' : 'Listen'}</span>
                </button>
              </div>

              {/* Center Interactive Calligraphic Stage */}
              <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-center bg-[#071912] rounded-xl p-4 border border-white/10">
                <div className="sm:col-span-5 flex flex-col items-center justify-center py-4 bg-gradient-to-b from-[#113829] to-[#092118] rounded-xl border border-[#D9A441]/25 relative">
                  <span className="absolute top-2 right-2.5 text-[11px] font-mono text-emerald-300/70 tabular-nums">
                    {activeLetter.id} / 29
                  </span>
                  <div
                    lang="ar"
                    dir="rtl"
                    className="arabic-font text-6xl sm:text-7xl text-[#E5B85C] leading-none select-none py-2"
                  >
                    {activeLetter.arabic}
                  </div>
                  <p className="text-base font-bold text-white mt-2">
                    {lang === 'bn' ? activeLetter.nameBn : activeLetter.nameEn}
                  </p>
                </div>

                <div className="sm:col-span-7 space-y-2.5 text-left">
                  <div>
                    <p className="text-[11px] font-mono uppercase tracking-wider text-[#D9A441]">
                      {lang === 'bn' ? 'মাখরাজ (উচ্চারণ স্থান)' : 'Makhraj (Articulation)'}
                    </p>
                    <p className="text-xs sm:text-sm text-emerald-50 font-medium leading-snug mt-0.5">
                      {lang === 'bn' ? activeLetter.makhrajBn : activeLetter.makhrajEn}
                    </p>
                  </div>
                  <div className="pt-2 border-t border-white/10">
                    <p className="text-[11px] font-mono uppercase tracking-wider text-emerald-300/80">
                      {lang === 'bn' ? 'উদাহরণ শব্দ' : 'Example Word'}
                    </p>
                    <div className="flex items-center justify-between mt-1">
                      <span lang="ar" dir="rtl" className="arabic-font text-2xl text-[#E5B85C]">
                        {activeLetter.exampleWord}
                      </span>
                      <span className="text-xs text-emerald-200/80">
                        {lang === 'bn' ? activeLetter.exampleMeaningBn : activeLetter.exampleMeaningEn}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Huruf Selector Strip */}
              <div className="mt-4">
                <div className="flex items-center justify-between text-xs text-emerald-200/75 mb-2">
                  <span>{lang === 'bn' ? 'একটি হরফে ক্লিক করে মাখরাজ দেখুন:' : 'Tap a letter to inspect Makhraj:'}</span>
                  <span lang="ar" className="font-mono text-[11px] text-[#D9A441]">
                    RTL ←
                  </span>
                </div>
                <div dir="rtl" className="grid grid-cols-6 gap-1.5">
                  {heroLetters.map((item) => {
                    const isSelected = featuredIdx === item.idx;
                    return (
                      <button
                        key={item.idx}
                        type="button"
                        onClick={() => {
                          setFeaturedIdx(item.idx);
                          onSpeakArabic(ARABIC_LETTERS[item.idx].arabic, ARABIC_LETTERS[item.idx].nameEn);
                        }}
                        className={`h-11 rounded-lg arabic-font text-xl flex items-center justify-center transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-[#D9A441] text-[#071712] font-bold shadow-md scale-105'
                            : 'bg-white/5 hover:bg-white/15 text-white border border-white/10'
                        }`}
                      >
                        {item.char}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Quick Jump Links inside Lectern */}
              <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between gap-2 text-xs">
                <button
                  type="button"
                  onClick={() => onNavigateSection('lessons')}
                  className="text-emerald-200 hover:text-white flex items-center gap-1.5 font-medium cursor-pointer"
                >
                  <BookOpen className="w-3.5 h-3.5 text-[#D9A441]" />
                  <span>{lang === 'bn' ? 'সব ২৯ হরফ খুলুন' : 'Open all 29 letters'}</span>
                </button>
                <button
                  type="button"
                  onClick={() => onNavigateSection('writing')}
                  className="text-[#E5B85C] hover:underline flex items-center gap-1.5 font-medium cursor-pointer"
                >
                  <PenTool className="w-3.5 h-3.5" />
                  <span>{lang === 'bn' ? 'রাইটিং বোর্ডে ট্রেস করুন →' : 'Trace on Writing Board →'}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* =====================================================================
          PLANE 4 (FOREGROUND ATMOSPHERE, data-sc-parallax="0.35"):
          Soft Golden Rim Light & Section Floor Blend
         ===================================================================== */}
      <div
        data-sc-parallax="0.35"
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[var(--sc-canvas)] to-transparent z-10"
      />
    </section>
  );
};
