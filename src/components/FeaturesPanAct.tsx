import React, { useState } from 'react';
import { ArrowRight, BookOpen, PenTool, Volume2, ClipboardCheck, School, BarChart3 } from 'lucide-react';
import { CORE_FEATURES, Language } from '../data/qaidaData';

export interface FeaturesPanActProps {
  lang: Language;
  onNavigateSection: (sectionId: string, portalTab?: 'teacher' | 'student') => void;
  onSpeakArabic: (text: string, label?: string) => void;
}

export const FeaturesPanAct: React.FC<FeaturesPanActProps> = ({
  lang,
  onNavigateSection,
  onSpeakArabic
}) => {
  const [activeFeatureId, setActiveFeatureId] = useState<string>(CORE_FEATURES[0].id);

  const getIcon = (id: string) => {
    switch (id) {
      case 'step-by-step':
        return <BookOpen className="w-6 h-6" />;
      case 'writing-board':
        return <PenTool className="w-6 h-6" />;
      case 'audio-pronunciation':
        return <Volume2 className="w-6 h-6" />;
      case 'quizzes-tests':
        return <ClipboardCheck className="w-6 h-6" />;
      case 'classroom-system':
        return <School className="w-6 h-6" />;
      default:
        return <BarChart3 className="w-6 h-6" />;
    }
  };

  return (
    <section
      id="features"
      data-sc-act="pan"
      data-sc-span="2.2"
      className="scroll-mt-20 py-16 sm:py-24 bg-[#0B241B] text-[#F3EFE4] border-y border-[#D9A441]/20 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading (আমাদের ফিচারসমূহ · আধুনিক প্রযুক্তিতে ঐতিহ্যবাহী শিক্ষা) */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12" data-sc-in>
          <div>
            <h2
              className="font-bold tracking-tight text-white"
              style={{ fontSize: 'clamp(1.75rem, 3.2vw, 2.75rem)', textWrap: 'balance' }}
            >
              {lang === 'bn' ? 'আমাদের ফিচারসমূহ' : 'Our features'}
            </h2>
            <p className="text-base sm:text-lg text-emerald-200/80 mt-2">
              {lang === 'bn'
                ? 'আধুনিক প্রযুক্তিতে ঐতিহ্যবাহী শিক্ষা'
                : 'Traditional learning with modern technology'}
            </p>
          </div>
          <p className="text-xs sm:text-sm font-mono text-[#D9A441]">
            {lang === 'bn'
              ? '৬টি সমন্বিত শিক্ষা মডিউল · যেকোনো কার্ডে ক্লিক করে সরাসরি অনুশীলন করুন'
              : '6 Integrated Learning Modules · Select any module to jump directly'}
          </p>
        </div>

        {/* Asymmetric Scroll-Craft Bento & Lateral Architecture */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-5" data-sc-in data-sc-stagger="65">
          {CORE_FEATURES.map((feat, index) => {
            // Asymmetric spans per frontend-design & scroll-craft taste rules (never 3 equal generic cards)
            const spanClass =
              index === 0 || index === 1
                ? 'lg:col-span-6'
                : index === 2 || index === 5
                ? 'lg:col-span-5'
                : 'lg:col-span-7';

            const isHighlighted = activeFeatureId === feat.id;

            return (
              <article
                key={feat.id}
                onMouseEnter={() => setActiveFeatureId(feat.id)}
                className={`${spanClass} group relative rounded-2xl p-6 sm:p-7 transition-all border flex flex-col justify-between ${
                  isHighlighted
                    ? 'bg-[#12382A] border-[#D9A441]/60 shadow-xl'
                    : 'bg-white/[0.04] hover:bg-white/[0.07] border-white/10'
                }`}
              >
                <div>
                  {/* Top Header Row: Editorial Index + Arabic Calligraphic Motif */}
                  <div className="flex items-center justify-between gap-4 mb-5">
                    <div className="flex items-center gap-3">
                      <span className="w-11 h-11 rounded-xl bg-[#D9A441]/15 border border-[#D9A441]/30 text-[#E5B85C] flex items-center justify-center">
                        {getIcon(feat.id)}
                      </span>
                      <span className="font-mono text-xs text-emerald-300/70 tabular-nums">
                        0{index + 1}
                      </span>
                    </div>
                    <span
                      lang="ar"
                      dir="rtl"
                      className="arabic-font text-2xl sm:text-3xl text-[#D9A441]/75 group-hover:text-[#E5B85C] transition-colors select-none"
                    >
                      {feat.arabicGlyph}
                    </span>
                  </div>

                  {/* Title & Exact Description from Digital Qaida */}
                  <h3 className="text-xl sm:text-2xl font-bold text-white mb-2.5">
                    {lang === 'bn' ? feat.titleBn : feat.titleEn}
                  </h3>
                  <p className="text-sm sm:text-base text-emerald-100/85 leading-relaxed mb-3">
                    {lang === 'bn' ? feat.descBn : feat.descEn}
                  </p>
                  <p className="text-xs sm:text-sm text-emerald-300/70 leading-relaxed">
                    {lang === 'bn' ? feat.detailBn : feat.detailEn}
                  </p>
                </div>

                {/* Action Footer */}
                <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => {
                      if (feat.id === 'audio-pronunciation') {
                        onSpeakArabic('بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ', 'Audio Pronunciation Demo');
                      }
                      onNavigateSection(
                        feat.targetSection,
                        feat.id === 'classroom-system' ? 'teacher' : feat.id === 'quizzes-tests' ? 'student' : undefined
                      );
                    }}
                    className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-[#E5B85C] hover:text-white transition-colors cursor-pointer"
                  >
                    <span>{lang === 'bn' ? feat.actionLabelBn : feat.actionLabelEn}</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};
