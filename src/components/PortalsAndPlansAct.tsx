import React, { useState } from 'react';
import {
  School,
  GraduationCap,
  Plus,
  CheckCircle2,
  ArrowRight,
  Lock,
  Sparkles,
  Tag,
  LogIn
} from 'lucide-react';
import {
  PRICING_PLANS,
  ACCESS_RULES_BN,
  ACCESS_RULES_EN,
  calculateCouponPreview,
  Language
} from '../data/qaidaData';

export interface PortalsAndPlansActProps {
  lang: Language;
  activePortalTab: 'teacher' | 'student';
  onChangePortalTab: (tab: 'teacher' | 'student') => void;
  onOpenLogin: () => void;
  onNavigateLessons: () => void;
  onNavigateWriting: (traceWord?: string) => void;
}

interface TeacherBatch {
  nameBn: string;
  nameEn: string;
  startBn: string;
  startEn: string;
  code: string;
  studentsCount: number;
  currentLessonBn: string;
  currentLessonEn: string;
  progressPct: number;
}

export const PortalsAndPlansAct: React.FC<PortalsAndPlansActProps> = ({
  lang,
  activePortalTab,
  onChangePortalTab,
  onOpenLogin,
  onNavigateLessons,
  onNavigateWriting
}) => {
  // Teacher Portal State (from actual website)
  const [batches, setBatches] = useState<TeacherBatch[]>([
    {
      nameBn: 'নূরানী কায়দা : ব্যাচ A',
      nameEn: 'Noorani Qaida : Batch A',
      startBn: 'শুরু: ১ অক্টোবর, ২০২৫',
      startEn: 'Started: Oct 1, 2025',
      code: 'Q7KM',
      studentsCount: 15,
      currentLessonBn: 'পাঠ ৫ চলছে',
      currentLessonEn: 'Lesson 5 active',
      progressPct: 60
    },
    {
      nameBn: 'নূরানী কায়দা : ব্যাচ B',
      nameEn: 'Noorani Qaida : Batch B',
      startBn: 'শুরু: ১৫ অক্টোবর, ২০২৫',
      startEn: 'Started: Oct 15, 2025',
      code: 'R3NP',
      studentsCount: 20,
      currentLessonBn: 'পাঠ ২ চলছে',
      currentLessonEn: 'Lesson 2 active',
      progressPct: 25
    },
    {
      nameBn: 'আমপারা কোর্স',
      nameEn: 'Ampara Course',
      startBn: 'শুরু: ১ সেপ্টেম্বর, ২০২৫',
      startEn: 'Started: Sep 1, 2025',
      code: 'X5BT',
      studentsCount: 10,
      currentLessonBn: 'সূরা ফাতিহা',
      currentLessonEn: 'Surah Al-Fatihah',
      progressPct: 40
    }
  ]);

  const [newBatchName, setNewBatchName] = useState('');
  const [showCreateBatch, setShowCreateBatch] = useState(false);

  // Student Portal State (from actual website)
  const [joinCodeInput, setJoinCodeInput] = useState('');
  const [joinedClasses, setJoinedClasses] = useState<Array<{ code: string; titleBn: string; titleEn: string; teacherBn: string; teacherEn: string }>>([
    {
      code: 'Q7KM',
      titleBn: 'নূরানী কায়দা : ব্যাচ A',
      titleEn: 'Noorani Qaida : Batch A',
      teacherBn: 'উস্তাদ আব্দুল্লাহ',
      teacherEn: 'Ustad Abdullah'
    }
  ]);
  const [joinFeedback, setJoinFeedback] = useState('');

  const [studentTasks, setStudentTasks] = useState([
    {
      id: 't1',
      titleBn: 'পাঠ ৪-এর কুইজ দিন',
      titleEn: 'Take Lesson 4 Quiz',
      dueBn: 'শেষ তারিখ: আজ রাত ১০টা',
      dueEn: 'Due: Tonight 10:00 PM',
      done: false
    },
    {
      id: 't2',
      titleBn: 'পাঠ ৩ রিভিউ করুন',
      titleEn: 'Review Lesson 3',
      dueBn: 'সম্পন্ন',
      dueEn: 'Completed',
      done: true
    },
    {
      id: 't3',
      titleBn: 'রাইটিং বোর্ডে "ج ح خ" লিখুন',
      titleEn: 'Write "ج ح خ" on the Writing Board',
      dueBn: 'শেষ তারিখ: আগামীকাল',
      dueEn: 'Due: Tomorrow',
      done: false
    }
  ]);

  // Pricing & Coupon Preview State
  const [selectedPlanId, setSelectedPlanId] = useState<'free' | 'student_pro' | 'teacher_pro'>('student_pro');
  const [couponInput, setCouponInput] = useState('');
  const [couponResult, setCouponResult] = useState<ReturnType<typeof calculateCouponPreview> | null>(null);

  const handleCreateBatch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newBatchName.trim()) return;
    const generatedCode = Math.random().toString(36).substring(2, 6).toUpperCase();
    setBatches((prev) => [
      ...prev,
      {
        nameBn: newBatchName.trim(),
        nameEn: newBatchName.trim(),
        startBn: 'শুরু: আজ',
        startEn: 'Started: Today',
        code: generatedCode,
        studentsCount: 1,
        currentLessonBn: 'পাঠ ১ চলছে',
        currentLessonEn: 'Lesson 1 active',
        progressPct: 5
      }
    ]);
    setNewBatchName('');
    setShowCreateBatch(false);
  };

  const handleJoinClass = (e: React.FormEvent) => {
    e.preventDefault();
    const cleaned = joinCodeInput.trim().toUpperCase();
    if (!cleaned || cleaned.length < 3) {
      setJoinFeedback(
        lang === 'bn'
          ? 'অনুগ্রহ করে ৪ অক্ষরের সঠিক ক্লাস কোড লিখুন (যেমন: R3NP বা X5BT)।'
          : 'Please enter a valid 4-character class code (e.g., R3NP or X5BT).'
      );
      return;
    }
    const matched = batches.find((b) => b.code === cleaned);
    const titleBn = matched ? matched.nameBn : `নূরানী কায়দা ক্লাস (${cleaned})`;
    const titleEn = matched ? matched.nameEn : `Noorani Qaida Class (${cleaned})`;

    if (!joinedClasses.some((c) => c.code === cleaned)) {
      setJoinedClasses((prev) => [
        ...prev,
        {
          code: cleaned,
          titleBn,
          titleEn,
          teacherBn: 'উস্তাদ আব্দুল্লাহ',
          teacherEn: 'Ustad Abdullah'
        }
      ]);
    }
    setJoinCodeInput('');
    setJoinFeedback(
      lang === 'bn'
        ? `আলহামদুলিল্লাহ! কোড ${cleaned} দিয়ে ক্লাসে যুক্ত হয়েছেন।`
        : `Successfully joined class with code ${cleaned}!`
    );
  };

  return (
    <div className="space-y-24 py-16 sm:py-24">
      {/* =====================================================================
          PART A: TEACHER PORTAL PRO & STUDENT PORTAL WORKSPACE (#portals)
         ===================================================================== */}
      <section id="portals" className="scroll-mt-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" data-sc-in>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
          <div>
            <p className="text-xs font-mono uppercase tracking-widest text-[#14533C] dark:text-[#D9A441] mb-2">
              {lang === 'bn' ? 'পোর্টাল · ক্লাসরুম ও শেখার একাউন্ট' : 'PORTALS · CLASSROOM & LEARNING ACCOUNT'}
            </p>
            <h2
              className="font-bold tracking-tight text-[var(--sc-ink)]"
              style={{ fontSize: 'clamp(1.75rem, 3vw, 2.6rem)', textWrap: 'balance' }}
            >
              {lang === 'bn'
                ? 'শিক্ষক পোর্টাল Pro এবং ছাত্র পোর্টাল'
                : 'Teacher Portal Pro & Student Portal'}
            </h2>
            <p className="text-sm sm:text-base text-[var(--sc-ink-soft)] mt-1">
              {lang === 'bn'
                ? 'আপনার ক্লাস ও অগ্রগতি দেখতে নিচের পোর্টাল দুটি ঘুরে দেখুন অথবা লগইন করুন।'
                : 'Explore both live portal workspaces below or sign in to sync your classes and progress.'}
            </p>
          </div>

          {/* Interactive Split-Stage Portal Switcher */}
          <div className="flex items-center gap-1.5 p-1.5 rounded-xl bg-[var(--sc-surface)] border border-[var(--sc-hairline-strong)] self-start">
            <button
              type="button"
              onClick={() => onChangePortalTab('teacher')}
              className={`min-h-[42px] px-4 py-2 rounded-lg text-xs sm:text-sm font-bold flex items-center gap-2 transition-colors cursor-pointer ${
                activePortalTab === 'teacher'
                  ? 'bg-[#0A261C] text-[#E5B85C] shadow-sm'
                  : 'text-[var(--sc-ink-soft)] hover:text-[var(--sc-ink)]'
              }`}
            >
              <School className="w-4 h-4" />
              <span>{lang === 'bn' ? '🏫 শিক্ষক পোর্টাল' : '🏫 Teacher Portal'}</span>
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-[#D9A441] text-[#071712] font-extrabold">
                Pro
              </span>
            </button>

            <button
              type="button"
              onClick={() => onChangePortalTab('student')}
              className={`min-h-[42px] px-4 py-2 rounded-lg text-xs sm:text-sm font-bold flex items-center gap-2 transition-colors cursor-pointer ${
                activePortalTab === 'student'
                  ? 'bg-[#0A261C] text-[#E5B85C] shadow-sm'
                  : 'text-[var(--sc-ink-soft)] hover:text-[var(--sc-ink)]'
              }`}
            >
              <GraduationCap className="w-4 h-4" />
              <span>{lang === 'bn' ? '🎓 ছাত্র পোর্টাল' : '🎓 Student Portal'}</span>
            </button>
          </div>
        </div>

        {/* TEACHER PORTAL VIEW */}
        {activePortalTab === 'teacher' ? (
          <div className="rounded-2xl bg-[var(--sc-surface-elevated)] border border-[var(--sc-hairline-strong)] shadow-xl overflow-hidden grid grid-cols-1 lg:grid-cols-12">
            {/* Teacher Sidebar */}
            <div className="lg:col-span-3 p-5 bg-[var(--sc-surface)] border-b lg:border-b-0 lg:border-r border-[var(--sc-hairline)] space-y-2">
              <p className="text-xs font-mono uppercase tracking-wider text-[var(--sc-ink-soft)] px-2 mb-3">
                {lang === 'bn' ? 'শিক্ষক পোর্টাল · Pro' : 'Teacher Portal · Pro'}
              </p>
              {[
                { bn: '🏠 ড্যাশবোর্ড', en: '🏠 Dashboard', active: true },
                { bn: '📚 আমার ক্লাস', en: '📚 My classes', active: false },
                { bn: '📖 পাঠ্যসূচি', en: '📖 Curriculum', active: false },
                { bn: '📝 হোমওয়ার্ক', en: '📝 Homework', active: false },
                { bn: '📊 রিপোর্ট', en: '📊 Reports', active: false },
                { bn: '⚙️ সেটিংস', en: '⚙️ Settings', active: false }
              ].map((nav, i) => (
                <div
                  key={i}
                  className={`px-3.5 py-2.5 rounded-xl text-sm font-medium ${
                    nav.active
                      ? 'bg-[#14533C] text-white dark:bg-[#D9A441] dark:text-[#071712] font-bold'
                      : 'text-[var(--sc-ink-soft)]'
                  }`}
                >
                  {lang === 'bn' ? nav.bn : nav.en}
                </div>
              ))}
            </div>

            {/* Teacher Main Workspace */}
            <div className="lg:col-span-9 p-5 sm:p-8 space-y-8">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-[var(--sc-hairline)]">
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold text-[var(--sc-ink)]">
                    {lang === 'bn'
                      ? 'আসসালামু আলাইকুম, উস্তাদ আব্দুল্লাহ'
                      : 'Assalamu Alaikum, Ustad Abdullah'}
                  </h3>
                  <p className="text-xs sm:text-sm text-[var(--sc-ink-soft)] mt-1">
                    {lang === 'bn'
                      ? 'আজকের তারিখ: ১৫ শাওয়াল, ১৪৪৭ হিজরী · ২৪ অক্টোবর, ২০২৫'
                      : 'Date: 15 Shawwal, 1447 AH · Classroom Management Dashboard'}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={onOpenLogin}
                  className="px-4 py-2 rounded-xl bg-[var(--sc-surface)] border border-[var(--sc-hairline-strong)] text-xs font-semibold flex items-center gap-2 self-start cursor-pointer"
                >
                  <LogIn className="w-3.5 h-3.5" />
                  <span>{lang === 'bn' ? 'আপনার শেখার একাউন্টে লগইন' : 'Sign in to your account'}</span>
                </button>
              </div>

              {/* 4 Teacher Summary Metrics (Tabular Numerals, No Thick Left Borders) */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sc-nums">
                <div className="p-4 rounded-xl bg-[var(--sc-surface)] border border-[var(--sc-hairline)]">
                  <p className="text-xs text-[var(--sc-ink-soft)]">
                    {lang === 'bn' ? 'মোট ক্লাস' : 'Total classes'}
                  </p>
                  <p className="text-2xl sm:text-3xl font-extrabold text-[var(--sc-ink)] mt-1 tabular-nums">
                    {batches.length}
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-[var(--sc-surface)] border border-[var(--sc-hairline)]">
                  <p className="text-xs text-[var(--sc-ink-soft)]">
                    {lang === 'bn' ? 'মোট ছাত্র' : 'Total students'}
                  </p>
                  <p className="text-2xl sm:text-3xl font-extrabold text-[#C9932C] mt-1 tabular-nums">
                    {lang === 'bn' ? '৪৫' : '45'}
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-[var(--sc-surface)] border border-[var(--sc-hairline)]">
                  <p className="text-xs text-[var(--sc-ink-soft)]">
                    {lang === 'bn' ? 'আজকের পাঠ' : "Today's lesson"}
                  </p>
                  <p className="text-2xl sm:text-3xl font-extrabold text-[var(--sc-ink)] mt-1">
                    {lang === 'bn' ? 'পাঠ ৫' : 'Lesson 5'}
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-[var(--sc-surface)] border border-[var(--sc-hairline)]">
                  <p className="text-xs text-[var(--sc-ink-soft)]">
                    {lang === 'bn' ? 'পেন্ডিং হোমওয়ার্ক' : 'Pending homework'}
                  </p>
                  <p className="text-2xl sm:text-3xl font-extrabold text-[var(--sc-ink)] mt-1 tabular-nums">
                    {lang === 'bn' ? '১২' : '12'}
                  </p>
                </div>
              </div>

              {/* My Classes Section (আমার ক্লাসসমূহ) */}
              <div className="space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <h4 className="text-lg font-bold text-[var(--sc-ink)]">
                    {lang === 'bn' ? 'আমার ক্লাসসমূহ' : 'My classes'}
                  </h4>
                  <button
                    type="button"
                    onClick={() => setShowCreateBatch((v) => !v)}
                    className="px-4 py-2 rounded-xl bg-[#14533C] dark:bg-[#D9A441] text-white dark:text-[#071712] text-xs sm:text-sm font-bold flex items-center gap-1.5 cursor-pointer"
                  >
                    <Plus className="w-4 h-4" />
                    <span>{lang === 'bn' ? '+ নতুন ক্লাস তৈরি করুন' : '+ Create new class'}</span>
                  </button>
                </div>

                {showCreateBatch && (
                  <form
                    onSubmit={handleCreateBatch}
                    className="p-4 rounded-xl bg-[var(--sc-surface)] border border-[var(--sc-hairline-strong)] flex flex-col sm:flex-row gap-3"
                  >
                    <input
                      type="text"
                      value={newBatchName}
                      onChange={(e) => setNewBatchName(e.target.value)}
                      placeholder={
                        lang === 'bn'
                          ? 'ক্লাসের নাম লিখুন (যেমন: তাজবীদ ব্যাচ C)'
                          : 'Enter class name (e.g., Tajweed Batch C)'
                      }
                      className="flex-1 px-3.5 py-2 rounded-lg bg-[var(--sc-surface-elevated)] border border-[var(--sc-hairline-strong)] text-sm"
                    />
                    <button
                      type="submit"
                      className="px-5 py-2 rounded-lg bg-[#0A261C] text-[#E5B85C] font-bold text-sm cursor-pointer"
                    >
                      {lang === 'bn' ? 'তৈরি করুন' : 'Create'}
                    </button>
                  </form>
                )}

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {batches.map((b) => (
                    <div
                      key={b.code}
                      className="p-5 rounded-xl bg-[var(--sc-surface)] border border-[var(--sc-hairline-strong)] flex flex-col justify-between space-y-4"
                    >
                      <div>
                        <div className="flex items-start justify-between gap-2 mb-2">
                          <div>
                            <h5 className="font-bold text-base text-[var(--sc-ink)]">
                              {lang === 'bn' ? b.nameBn : b.nameEn}
                            </h5>
                            <p className="text-xs text-[var(--sc-ink-soft)] mt-0.5">
                              {lang === 'bn' ? b.startBn : b.startEn}
                            </p>
                          </div>
                          <span className="font-mono text-xs font-bold px-2.5 py-1 rounded bg-[#0A261C] text-[#E5B85C]">
                            {b.code}
                          </span>
                        </div>

                        <div className="flex items-center gap-3 text-xs text-[var(--sc-ink-soft)] my-3">
                          <span>👤 {b.studentsCount} {lang === 'bn' ? 'ছাত্র' : 'students'}</span>
                          <span>·</span>
                          <span>📖 {lang === 'bn' ? b.currentLessonBn : b.currentLessonEn}</span>
                        </div>

                        <div>
                          <div className="flex justify-between text-xs mb-1">
                            <span>{lang === 'bn' ? 'অগ্রগতি' : 'Progress'}</span>
                            <span className="font-mono font-bold tabular-nums">{b.progressPct}%</span>
                          </div>
                          <div className="h-2 rounded-full bg-black/10 dark:bg-white/10 overflow-hidden">
                            <div
                              className="h-full bg-[#14533C] dark:bg-[#D9A441]"
                              style={{ width: `${b.progressPct}%` }}
                            />
                          </div>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={onNavigateLessons}
                        className="w-full py-2 px-3 rounded-lg bg-[var(--sc-surface-elevated)] hover:bg-[#14533C] hover:text-white dark:hover:bg-[#D9A441] dark:hover:text-[#071712] border border-[var(--sc-hairline-strong)] text-xs font-bold transition-colors cursor-pointer"
                      >
                        {lang === 'bn' ? 'ক্লাসে যান →' : 'Open class →'}
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recent Activity (সাম্প্রতিক কার্যক্রম) */}
              <div className="space-y-3">
                <h4 className="text-base font-bold text-[var(--sc-ink)]">
                  {lang === 'bn' ? 'সাম্প্রতিক কার্যক্রম' : 'Recent activity'}
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs sm:text-sm">
                  <div className="p-3.5 rounded-xl bg-[var(--sc-surface)] border border-[var(--sc-hairline)]">
                    <p className="font-medium text-[var(--sc-ink)]">
                      {lang === 'bn'
                        ? 'আহমদ পাঠ ৪-এর কুইজ জমা দিয়েছে'
                        : 'Ahmad submitted Lesson 4 Quiz'}
                    </p>
                    <p className="text-xs text-[var(--sc-ink-soft)] mt-1">
                      {lang === 'bn' ? 'স্কোর: ৮/১০ · ২ ঘণ্টা আগে' : 'Score: 8/10 · 2 hours ago'}
                    </p>
                  </div>
                  <div className="p-3.5 rounded-xl bg-[var(--sc-surface)] border border-[var(--sc-hairline)]">
                    <p className="font-medium text-[var(--sc-ink)]">
                      {lang === 'bn'
                        ? 'ফাতিমা ব্যাচ A-তে যোগ দিয়েছে'
                        : 'Fatima joined Batch A (Q7KM)'}
                    </p>
                    <p className="text-xs text-[var(--sc-ink-soft)] mt-1">
                      {lang === 'bn' ? '৫ ঘণ্টা আগে' : '5 hours ago'}
                    </p>
                  </div>
                  <div className="p-3.5 rounded-xl bg-[var(--sc-surface)] border border-[var(--sc-hairline)]">
                    <p className="font-medium text-[var(--sc-ink)]">
                      {lang === 'bn'
                        ? 'ইব্রাহীম পাঠ ৫ সম্পন্ন করেছে'
                        : 'Ibrahim completed Lesson 5'}
                    </p>
                    <p className="text-xs text-[var(--sc-ink-soft)] mt-1">
                      {lang === 'bn' ? 'গতকাল' : 'Yesterday'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* STUDENT PORTAL VIEW (ছাত্র পোর্টাল) */
          <div className="rounded-2xl bg-[var(--sc-surface-elevated)] border border-[var(--sc-hairline-strong)] shadow-xl p-5 sm:p-8 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-[var(--sc-hairline)]">
              <div>
                <h3 className="text-xl sm:text-2xl font-bold text-[var(--sc-ink)]">
                  {lang === 'bn' ? 'আসসালামু আলাইকুম, আহমদ 👋' : 'Assalamu Alaikum, Ahmad 👋'}
                </h3>
                <p className="text-xs sm:text-sm text-[var(--sc-ink-soft)] mt-1">
                  {lang === 'bn'
                    ? 'আপনার শেখার একাউন্ট · আজকের তারিখ: ২৪ অক্টোবর, ২০২৫'
                    : 'Your learning account · Continue where you left off'}
                </p>
              </div>

              <div className="flex items-center gap-4 sc-nums">
                <div className="text-center px-3 py-1.5 rounded-xl bg-[var(--sc-surface)] border border-[var(--sc-hairline)]">
                  <p className="text-lg font-extrabold text-[var(--sc-ink)]">{lang === 'bn' ? '৪' : '4'}</p>
                  <p className="text-[11px] text-[var(--sc-ink-soft)]">{lang === 'bn' ? 'সম্পন্ন পাঠ' : 'Completed'}</p>
                </div>
                <div className="text-center px-3 py-1.5 rounded-xl bg-[var(--sc-surface)] border border-[var(--sc-hairline)]">
                  <p className="text-lg font-extrabold text-[#C9932C]">{lang === 'bn' ? '৮৫%' : '85%'}</p>
                  <p className="text-[11px] text-[var(--sc-ink-soft)]">{lang === 'bn' ? 'গড় স্কোর' : 'Avg score'}</p>
                </div>
                <div className="text-center px-3 py-1.5 rounded-xl bg-[var(--sc-surface)] border border-[var(--sc-hairline)]">
                  <p className="text-lg font-extrabold text-[var(--sc-ink)]">{lang === 'bn' ? '🔥 ৭' : '🔥 7'}</p>
                  <p className="text-[11px] text-[var(--sc-ink-soft)]">{lang === 'bn' ? 'দিনের স্ট্রিক' : 'Day streak'}</p>
                </div>
              </div>
            </div>

            {/* Continue Where You Left Off Card */}
            <div className="p-5 sm:p-6 rounded-2xl bg-gradient-to-r from-[#0A261C] to-[#123B2B] text-white flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="space-y-2 flex-1">
                <p className="text-xs font-mono uppercase tracking-wider text-[#E5B85C]">
                  {lang === 'bn' ? 'শেষবার যেখানে ছিলেন' : 'Continue where you left off'}
                </p>
                <h4 className="text-lg sm:text-xl font-bold">
                  {lang === 'bn'
                    ? '📖 পাঠ ৪ : যুক্ত হরফ (জোড়া অক্ষর)'
                    : '📖 Lesson 4 : Connected Letters (Murakkabat)'}
                </h4>
                <div className="max-w-md pt-1">
                  <div className="flex justify-between text-xs text-emerald-200 mb-1">
                    <span>{lang === 'bn' ? 'অগ্রগতি' : 'Progress'}</span>
                    <span className="font-mono font-bold">70%</span>
                  </div>
                  <div className="h-2 rounded-full bg-white/15 overflow-hidden">
                    <div className="h-full bg-[#D9A441]" style={{ width: '70%' }} />
                  </div>
                </div>
              </div>
              <button
                type="button"
                onClick={onNavigateLessons}
                className="min-h-[44px] px-6 py-3 rounded-xl bg-[#D9A441] hover:bg-[#E5B85C] text-[#071712] font-bold text-sm flex items-center justify-center gap-2 shrink-0 cursor-pointer"
              >
                <span>{lang === 'bn' ? 'শেখা চালিয়ে যান →' : 'Continue learning →'}</span>
              </button>
            </div>

            {/* Join a Class + My Classes Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <form
                onSubmit={handleJoinClass}
                className="p-5 rounded-xl bg-[var(--sc-surface)] border border-[var(--sc-hairline-strong)] space-y-3"
              >
                <h4 className="font-bold text-base text-[var(--sc-ink)]">
                  {lang === 'bn' ? '🔗 ক্লাসে যোগ দিন' : '🔗 Join a class'}
                </h4>
                <p className="text-xs text-[var(--sc-ink-soft)]">
                  {lang === 'bn'
                    ? 'শিক্ষকের দেওয়া কোড লিখুন (যেমন: Q7KM, R3NP, X5BT):'
                    : 'Enter the code from your teacher (e.g., Q7KM, R3NP, X5BT):'}
                </p>
                <div className="flex gap-2">
                  <input
                    type="text"
                    maxLength={8}
                    value={joinCodeInput}
                    onChange={(e) => setJoinCodeInput(e.target.value)}
                    placeholder={lang === 'bn' ? 'ক্লাস কোড (যেমন: Q7KM)' : 'Class code (e.g. Q7KM)'}
                    className="flex-1 px-3.5 py-2 rounded-lg bg-[var(--sc-surface-elevated)] border border-[var(--sc-hairline-strong)] font-mono uppercase tracking-widest text-center text-sm"
                  />
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-lg bg-[#14533C] dark:bg-[#D9A441] text-white dark:text-[#071712] font-bold text-sm cursor-pointer whitespace-nowrap"
                  >
                    {lang === 'bn' ? 'যোগ দিন' : 'Join'}
                  </button>
                </div>
                {joinFeedback && (
                  <p className="text-xs font-medium text-[#14533C] dark:text-[#E5B85C]" role="status">
                    {joinFeedback}
                  </p>
                )}
              </form>

              <div className="p-5 rounded-xl bg-[var(--sc-surface)] border border-[var(--sc-hairline-strong)] space-y-3">
                <h4 className="font-bold text-base text-[var(--sc-ink)]">
                  {lang === 'bn' ? '📚 আমার ক্লাস' : '📚 My classes'}
                </h4>
                <div className="space-y-2">
                  {joinedClasses.map((c) => (
                    <div
                      key={c.code}
                      className="p-3 rounded-lg bg-[var(--sc-surface-elevated)] border border-[var(--sc-hairline)] flex items-center justify-between gap-3"
                    >
                      <div className="flex items-center gap-3">
                        <span className="w-9 h-9 rounded-lg bg-[#0A261C] text-[#E5B85C] font-mono font-bold text-xs flex items-center justify-center">
                          {c.code}
                        </span>
                        <div>
                          <p className="text-sm font-bold text-[var(--sc-ink)]">
                            {lang === 'bn' ? c.titleBn : c.titleEn}
                          </p>
                          <p className="text-xs text-[var(--sc-ink-soft)]">
                            {lang === 'bn' ? c.teacherBn : c.teacherEn}
                          </p>
                        </div>
                      </div>
                      <span className="text-xs font-semibold text-[#14533C] dark:text-[#D9A441]">
                        {lang === 'bn' ? 'পাঠ ৫' : 'Lesson 5'}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Today's Tasks (📋 আজকের কাজ) */}
            <div className="p-5 rounded-xl bg-[var(--sc-surface)] border border-[var(--sc-hairline-strong)] space-y-3">
              <h4 className="font-bold text-base text-[var(--sc-ink)]">
                {lang === 'bn' ? '📋 আজকের কাজ' : "📋 Today's tasks"}
              </h4>
              <div className="space-y-2">
                {studentTasks.map((task) => (
                  <div
                    key={task.id}
                    className="p-3 rounded-lg bg-[var(--sc-surface-elevated)] border border-[var(--sc-hairline)] flex items-center justify-between gap-3"
                  >
                    <label className="flex items-center gap-3 cursor-pointer flex-1">
                      <input
                        type="checkbox"
                        checked={task.done}
                        onChange={() =>
                          setStudentTasks((prev) =>
                            prev.map((t) => (t.id === task.id ? { ...t, done: !t.done } : t))
                          )
                        }
                        className="w-4 h-4 accent-[#14533C] dark:accent-[#D9A441]"
                      />
                      <div>
                        <p
                          className={`text-sm font-medium ${
                            task.done ? 'line-through opacity-60' : 'text-[var(--sc-ink)]'
                          }`}
                        >
                          {lang === 'bn' ? task.titleBn : task.titleEn}
                        </p>
                        <p className="text-xs text-[var(--sc-ink-soft)]">
                          {lang === 'bn' ? task.dueBn : task.dueEn}
                        </p>
                      </div>
                    </label>
                    {task.id === 't3' && (
                      <button
                        type="button"
                        onClick={() => onNavigateWriting('ج ح خ')}
                        className="px-3 py-1.5 rounded-lg bg-[#0A261C] text-[#E5B85C] text-xs font-bold cursor-pointer"
                      >
                        {lang === 'bn' ? 'লিখুন' : 'Write'}
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </section>

      {/* =====================================================================
          PART B: LEARNING PLANS & ACCESS RULES (#plans)
         ===================================================================== */}
      <section id="plans" className="scroll-mt-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" data-sc-in>
        <div className="mb-10">
          <p className="text-xs font-mono uppercase tracking-widest text-[#14533C] dark:text-[#D9A441] mb-2">
            {lang === 'bn' ? 'ডিজিটাল কায়দা · আপনার শেখার প্ল্যান' : 'DIGITAL QAIDA · YOUR LEARNING PLANS'}
          </p>
          <h2
            className="font-bold tracking-tight text-[var(--sc-ink)]"
            style={{ fontSize: 'clamp(1.75rem, 3vw, 2.6rem)', textWrap: 'balance' }}
          >
            {lang === 'bn' ? 'আপনার শেখার প্ল্যান' : 'Your Learning Plans'}
          </h2>
          <p className="text-sm sm:text-base text-[var(--sc-ink-soft)] mt-1">
            {lang === 'bn'
              ? 'Free দিয়ে শুরু করুন। নিজের শেখার জন্য Student Pro, class পরিচালনার জন্য Teacher Pro।'
              : 'Start with Free. Choose Student Pro for complete self-paced learning, or Teacher Pro for classroom management.'}
          </p>
        </div>

        {/* 3 Pricing Cards: Free (0 BDT), Student Pro (500 BDT), Teacher Pro (1000 BDT) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10 sc-nums">
          {PRICING_PLANS.map((plan) => {
            const isSelected = selectedPlanId === plan.id;
            return (
              <div
                key={plan.id}
                onClick={() => setSelectedPlanId(plan.id)}
                className={`rounded-2xl p-6 sm:p-7 flex flex-col justify-between transition-all cursor-pointer border ${
                  isSelected
                    ? 'bg-[#0A261C] text-[#F3EFE4] border-[#D9A441] shadow-2xl scale-[1.01]'
                    : 'bg-[var(--sc-surface-elevated)] text-[var(--sc-ink)] border-[var(--sc-hairline-strong)]'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <h3 className="text-xl font-bold">{lang === 'bn' ? plan.nameBn : plan.nameEn}</h3>
                    {plan.badge && (
                      <span className="text-xs font-extrabold uppercase px-2.5 py-0.5 rounded bg-[#D9A441] text-[#071712]">
                        {plan.badge}
                      </span>
                    )}
                  </div>

                  <div className="mb-6">
                    <span className="text-4xl font-extrabold tabular-nums">
                      {lang === 'bn' ? plan.priceBn : plan.priceEn}
                    </span>
                    <span
                      className={`block text-xs mt-1 ${
                        isSelected ? 'text-emerald-200/80' : 'text-[var(--sc-ink-soft)]'
                      }`}
                    >
                      {lang === 'bn' ? plan.durationBn : plan.durationEn}
                    </span>
                  </div>

                  <ul className="space-y-2.5 text-sm mb-6">
                    {(lang === 'bn' ? plan.featuresBn : plan.featuresEn).map((feat, i) => (
                      <li key={i} className="flex items-start gap-2.5">
                        <CheckCircle2
                          className={`w-4 h-4 shrink-0 mt-1 ${
                            isSelected ? 'text-[#D9A441]' : 'text-[#14533C] dark:text-[#D9A441]'
                          }`}
                        />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-4 border-t border-current/10 space-y-4">
                  <p className={`text-xs ${isSelected ? 'text-emerald-200/75' : 'text-[var(--sc-ink-soft)]'}`}>
                    {lang === 'bn' ? plan.noteBn : plan.noteEn}
                  </p>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedPlanId(plan.id);
                      if (plan.id === 'free') {
                        onNavigateLessons();
                      }
                    }}
                    className={`w-full min-h-[44px] py-2.5 px-4 rounded-xl font-bold text-sm transition-colors cursor-pointer ${
                      isSelected
                        ? 'bg-[#D9A441] text-[#071712] hover:bg-[#E5B85C]'
                        : 'bg-[var(--sc-surface)] hover:bg-[#14533C] hover:text-white text-[var(--sc-ink)] border border-[var(--sc-hairline-strong)]'
                    }`}
                  >
                    {lang === 'bn' ? plan.ctaBn : plan.ctaEn}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Discount Coupon Preview + Access Rules Split Grid (from actual website) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left 5 Cols: Discount Coupon Preview & Payment Notice */}
          <div className="lg:col-span-5 p-6 rounded-2xl bg-[var(--sc-surface-elevated)] border border-[var(--sc-hairline-strong)] space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-[var(--sc-ink)]">
                {selectedPlanId === 'teacher_pro' ? 'Teacher Pro' : 'Student Pro'} · Discount coupon preview
              </h3>
              <Tag className="w-4 h-4 text-[#14533C] dark:text-[#D9A441]" />
            </div>

            <p className="text-xs sm:text-sm text-[var(--sc-ink-soft)] leading-relaxed">
              {lang === 'bn'
                ? 'Purchase করার আগে account-এ login করতে হবে। Payment চালু হলে সফল server verification-এর পরেই paid সুবিধা পাওয়া যাবে।'
                : 'Sign in to your account before purchasing. Paid features activate immediately upon server verification.'}
            </p>

            <div className="flex gap-2">
              <input
                type="text"
                value={couponInput}
                onChange={(e) => setCouponInput(e.target.value)}
                placeholder={lang === 'bn' ? 'কুপন কোড (যেমন: UMMAH20)' : 'Coupon code (e.g. UMMAH20)'}
                className="flex-1 px-3.5 py-2 rounded-xl bg-[var(--sc-surface)] border border-[var(--sc-hairline-strong)] text-sm font-mono uppercase"
              />
              <button
                type="button"
                onClick={() => setCouponResult(calculateCouponPreview(selectedPlanId, couponInput))}
                className="px-4 py-2 rounded-xl bg-[#14533C] dark:bg-[#D9A441] text-white dark:text-[#071712] font-bold text-xs sm:text-sm whitespace-nowrap cursor-pointer"
              >
                {lang === 'bn' ? 'মূল্য যাচাই করুন' : 'Verify price'}
              </button>
            </div>

            {couponResult && (
              <div
                role="status"
                className={`p-3 rounded-xl text-xs font-medium ${
                  couponResult.valid
                    ? 'bg-emerald-500/15 text-emerald-800 dark:text-emerald-200 border border-emerald-500/30'
                    : 'bg-amber-500/15 text-amber-800 dark:text-amber-200 border border-amber-500/30'
                }`}
              >
                {lang === 'bn' ? couponResult.labelBn : couponResult.labelEn}
              </div>
            )}

            <p className="text-xs text-[var(--sc-ink-soft)]">
              {lang === 'bn'
                ? 'এটি শুধু price preview। Coupon preview payment নয় এবং paid access চালু করে না। Payment আপাতত বন্ধ আছে। Uddoktapay পরে যুক্ত করা হবে। এখন কোনো টাকা নেওয়া হচ্ছে না।'
                : 'This is a price preview only. Payment is currently paused while Uddoktapay integration is finalized; no charges are collected right now.'}
            </p>

            <button
              type="button"
              onClick={onOpenLogin}
              className="w-full min-h-[42px] py-2.5 px-4 rounded-xl bg-[#0A261C] text-[#E5B85C] font-bold text-xs sm:text-sm cursor-pointer"
            >
              {lang === 'bn' ? 'Account-এ login করুন' : 'Log in to Account'}
            </button>
          </div>

          {/* Right 7 Cols: Access কীভাবে কাজ করে (How Access Works — all 6 official points) */}
          <div className="lg:col-span-7 p-6 rounded-2xl bg-[var(--sc-surface)] border border-[var(--sc-hairline-strong)] space-y-4">
            <h3 className="text-lg font-bold text-[var(--sc-ink)]">
              {lang === 'bn' ? 'Access কীভাবে কাজ করে' : 'How Access Works'}
            </h3>
            <ul className="space-y-2.5 text-xs sm:text-sm text-[var(--sc-ink)]">
              {(lang === 'bn' ? ACCESS_RULES_BN : ACCESS_RULES_EN).map((rule, idx) => (
                <li key={idx} className="flex items-start gap-2.5 leading-relaxed">
                  <span className="font-mono text-xs font-bold text-[#14533C] dark:text-[#D9A441] mt-0.5 tabular-nums">
                    0{idx + 1}.
                  </span>
                  <span>{rule}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
};
