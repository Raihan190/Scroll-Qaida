import React, { useRef, useState, useEffect, useCallback } from 'react';
import {
  PenTool,
  Eraser,
  RotateCcw,
  RotateCw,
  Trash2,
  Download,
  Play,
  Maximize2,
  Minimize2,
  Plus,
  Copy,
  FileText,
  Sparkles,
  ArrowLeft,
  ArrowRight,
  Printer,
  Save
} from 'lucide-react';
import { ARABIC_LETTERS, Language } from '../data/qaidaData';

export interface WritingBoardPeakActProps {
  lang: Language;
  traceText: string;
  onChangeTraceText: (text: string) => void;
  onNavigatePlans: () => void;
}

interface StrokePoint {
  x: number;
  y: number;
}

interface StrokeRecord {
  tool: 'pen' | 'marker' | 'highlighter' | 'eraser' | 'laser';
  color: string;
  size: number;
  opacity: number;
  nibStyle: 'simple' | 'speed' | 'thin' | 'broad';
  nibAngle: number;
  points: StrokePoint[];
}

const INK_SWATCHES = [
  { hex: '#173d30', labelBn: 'গাঢ় সবুজ কালি', labelEn: 'Forest green ink' },
  { hex: '#18212b', labelBn: 'কালো কালি', labelEn: 'Black ink' },
  { hex: '#2563b9', labelBn: 'নীল কালি', labelEn: 'Blue ink' },
  { hex: '#c44444', labelBn: 'লাল কালি', labelEn: 'Red ink' },
  { hex: '#9460b4', labelBn: 'বেগুনি কালি', labelEn: 'Purple ink' },
  { hex: '#e5af33', labelBn: 'সোনালি কালি', labelEn: 'Gold ink' }
];

export const WritingBoardPeakAct: React.FC<WritingBoardPeakActProps> = ({
  lang,
  traceText,
  onChangeTraceText,
  onNavigatePlans
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [mode, setMode] = useState<'trace' | 'free'>('trace');
  const [tool, setTool] = useState<'pen' | 'marker' | 'highlighter' | 'eraser' | 'laser'>('pen');
  const [nibStyle, setNibStyle] = useState<'simple' | 'speed' | 'thin' | 'broad'>('broad');
  const [nibAngle, setNibAngle] = useState<number>(45);
  const [penSize, setPenSize] = useState<number>(10);
  const [opacity, setOpacity] = useState<number>(100);
  const [smoothing, setSmoothing] = useState<number>(60);
  const [inkColor, setInkColor] = useState<string>('#173d30');
  const [boardGuide, setBoardGuide] = useState<'ruled' | 'blank' | 'grid' | 'dots'>('ruled');
  const [paperTheme, setPaperTheme] = useState<'cream' | 'paper' | 'chalk'>('cream');
  const [paperTexture, setPaperTexture] = useState<'smooth' | 'paper' | 'canvas'>('paper');

  const [traceSize, setTraceSize] = useState<number>(210);
  const [traceOpacity, setTraceOpacity] = useState<number>(22);
  const [practiceLetterIdx, setPracticeLetterIdx] = useState<number>(1); // 'ب' default (2 / 29)
  const [penOnly, setPenOnly] = useState<boolean>(false);
  const [penPressure, setPenPressure] = useState<boolean>(true);
  const [focusMode, setFocusMode] = useState<boolean>(false);

  // Multi-page state (up to 100 pages)
  const [pages, setPages] = useState<StrokeRecord[][]>([[]]);
  const [currentPageIdx, setCurrentPageIdx] = useState<number>(0);
  const [redoStack, setRedoStack] = useState<StrokeRecord[]>([]);
  const [removedPageBackup, setRemovedPageBackup] = useState<StrokeRecord[] | null>(null);

  const [isDrawing, setIsDrawing] = useState<boolean>(false);
  const currentStrokeRef = useRef<StrokeRecord | null>(null);
  const [isReplaying, setIsReplaying] = useState<boolean>(false);
  const [statusMessage, setStatusMessage] = useState<string>('');
  const [exportDialogOpen, setExportDialogOpen] = useState<boolean>(false);
  const [exportFormat, setExportFormat] = useState<string>('pdf');
  const [exportScope, setExportScope] = useState<string>('all');

  const currentStrokes = pages[currentPageIdx] || [];
  const currentPracticeLetter = ARABIC_LETTERS[practiceLetterIdx] || ARABIC_LETTERS[1];

  const drawSingleStroke = useCallback((ctx: CanvasRenderingContext2D, stroke: StrokeRecord, limitPoints?: number) => {
    const pts = limitPoints ? stroke.points.slice(0, limitPoints) : stroke.points;
    if (pts.length === 0) return;

    ctx.save();
    if (stroke.tool === 'eraser') {
      ctx.globalCompositeOperation = 'destination-out';
      ctx.lineWidth = stroke.size * 1.8;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
    } else {
      ctx.globalCompositeOperation = 'source-over';
      ctx.strokeStyle = stroke.tool === 'laser' ? '#ef4444' : stroke.color;
      ctx.fillStyle = stroke.tool === 'laser' ? '#ef4444' : stroke.color;
      ctx.globalAlpha =
        stroke.tool === 'highlighter' ? 0.35 : Math.max(0.1, Math.min(1, stroke.opacity / 100));
    }

    if (pts.length === 1) {
      // Single tap makes an Arabic Nuqta (diamond calligraphy dot)
      ctx.translate(pts[0].x, pts[0].y);
      ctx.rotate((stroke.nibAngle * Math.PI) / 180);
      const d = Math.max(stroke.size, 6);
      ctx.fillRect(-d / 2, -d / 2, d, d);
      ctx.restore();
      return;
    }

    if (stroke.nibStyle === 'broad' || stroke.nibStyle === 'thin') {
      // Calligraphic angled nib rendering
      const rad = (stroke.nibAngle * Math.PI) / 180;
      const nibWidth = stroke.nibStyle === 'broad' ? stroke.size * 1.35 : stroke.size * 0.85;
      const dx = Math.cos(rad) * (nibWidth / 2);
      const dy = Math.sin(rad) * (nibWidth / 2);

      for (let i = 1; i < pts.length; i++) {
        const p0 = pts[i - 1];
        const p1 = pts[i];
        ctx.beginPath();
        ctx.moveTo(p0.x - dx, p0.y - dy);
        ctx.lineTo(p0.x + dx, p0.y + dy);
        ctx.lineTo(p1.x + dx, p1.y + dy);
        ctx.lineTo(p1.x - dx, p1.y - dy);
        ctx.closePath();
        ctx.fill();
      }
    } else {
      ctx.lineWidth = stroke.tool === 'marker' ? stroke.size * 1.5 : stroke.size;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.beginPath();
      ctx.moveTo(pts[0].x, pts[0].y);
      for (let i = 1; i < pts.length; i++) {
        const midX = (pts[i - 1].x + pts[i].x) / 2;
        const midY = (pts[i - 1].y + pts[i].y) / 2;
        ctx.quadraticCurveTo(pts[i - 1].x, pts[i - 1].y, midX, midY);
      }
      ctx.lineTo(pts[pts.length - 1].x, pts[pts.length - 1].y);
      ctx.stroke();
    }
    ctx.restore();
  }, []);

  const renderCanvas = useCallback(
    (activeStroke?: StrokeRecord | null) => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      const w = canvas.width;
      const h = canvas.height;
      ctx.clearRect(0, 0, w, h);

      // 1. Paper Background
      const bgFill =
        paperTheme === 'chalk' ? '#10281F' : paperTheme === 'cream' ? '#FAF4E4' : '#FFFFFF';
      ctx.fillStyle = bgFill;
      ctx.fillRect(0, 0, w, h);

      // 2. Guide Lines (Ruled, Grid, Dots)
      const guideColor =
        paperTheme === 'chalk' ? 'rgba(255,255,255,0.12)' : 'rgba(20,83,60,0.13)';
      ctx.strokeStyle = guideColor;
      ctx.fillStyle = guideColor;
      ctx.lineWidth = 1;

      if (boardGuide === 'ruled') {
        for (let y = 90; y < h; y += 85) {
          ctx.beginPath();
          ctx.moveTo(40, y);
          ctx.lineTo(w - 40, y);
          ctx.stroke();
        }
        // Baseline highlight
        ctx.strokeStyle =
          paperTheme === 'chalk' ? 'rgba(217,164,65,0.35)' : 'rgba(201,147,44,0.38)';
        ctx.beginPath();
        ctx.moveTo(40, h / 2 + 45);
        ctx.lineTo(w - 40, h / 2 + 45);
        ctx.stroke();
      } else if (boardGuide === 'grid') {
        for (let x = 50; x < w; x += 50) {
          ctx.beginPath();
          ctx.moveTo(x, 0);
          ctx.lineTo(x, h);
          ctx.stroke();
        }
        for (let y = 50; y < h; y += 50) {
          ctx.beginPath();
          ctx.moveTo(0, y);
          ctx.lineTo(w, y);
          ctx.stroke();
        }
      } else if (boardGuide === 'dots') {
        for (let x = 45; x < w; x += 45) {
          for (let y = 45; y < h; y += 45) {
            ctx.beginPath();
            ctx.arc(x, y, 1.5, 0, Math.PI * 2);
            ctx.fill();
          }
        }
      }

      // 3. RTL Tracing Model Underlay (drawn only when exporting or as subtle baseline)
      // On-screen tracing guide is rendered via razor-sharp vector DOM typography overlay
      if (false && mode === 'trace' && traceText.trim()) {
        ctx.save();
        ctx.restore();
      }

      // 4. Saved Strokes
      for (const s of currentStrokes) {
        drawSingleStroke(ctx, s);
      }

      // 5. Active in-progress stroke
      if (activeStroke) {
        drawSingleStroke(ctx, activeStroke);
      }
    },
    [boardGuide, currentStrokes, drawSingleStroke, mode, paperTheme, traceOpacity, traceSize, traceText]
  );

  useEffect(() => {
    renderCanvas();
  }, [renderCanvas]);

  const getCanvasCoords = (e: React.PointerEvent<HTMLCanvasElement>): StrokePoint => {
    const canvas = canvasRef.current!;
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    return {
      x: (e.clientX - rect.left) * scaleX,
      y: (e.clientY - rect.top) * scaleY
    };
  };

  const handlePointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (isReplaying) return;
    if (penOnly && e.pointerType === 'touch') return;
    const pt = getCanvasCoords(e);
    const activeColor = paperTheme === 'chalk' && inkColor === '#173d30' ? '#E5B85C' : inkColor;
    const newStroke: StrokeRecord = {
      tool,
      color: activeColor,
      size: penSize,
      opacity,
      nibStyle,
      nibAngle,
      points: [pt]
    };
    currentStrokeRef.current = newStroke;
    setIsDrawing(true);
    renderCanvas(newStroke);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!isDrawing || !currentStrokeRef.current) return;
    const pt = getCanvasCoords(e);
    currentStrokeRef.current.points.push(pt);
    renderCanvas(currentStrokeRef.current);
  };

  const handlePointerUp = () => {
    if (!isDrawing || !currentStrokeRef.current) return;
    const finished = currentStrokeRef.current;
    currentStrokeRef.current = null;
    setIsDrawing(false);

    if (finished.tool === 'laser') {
      // Laser pointer is temporary and never saved
      setTimeout(() => renderCanvas(null), 350);
      return;
    }

    setPages((prev) => {
      const next = [...prev];
      next[currentPageIdx] = [...(next[currentPageIdx] || []), finished];
      return next;
    });
    setRedoStack([]);
  };

  const handleUndo = () => {
    if (currentStrokes.length === 0) return;
    const last = currentStrokes[currentStrokes.length - 1];
    setRedoStack((r) => [...r, last]);
    setPages((prev) => {
      const next = [...prev];
      next[currentPageIdx] = next[currentPageIdx].slice(0, -1);
      return next;
    });
  };

  const handleRedo = () => {
    if (redoStack.length === 0) return;
    const restored = redoStack[redoStack.length - 1];
    setRedoStack((r) => r.slice(0, -1));
    setPages((prev) => {
      const next = [...prev];
      next[currentPageIdx] = [...(next[currentPageIdx] || []), restored];
      return next;
    });
  };

  const handleClear = () => {
    if (currentStrokes.length === 0) return;
    setPages((prev) => {
      const next = [...prev];
      next[currentPageIdx] = [];
      return next;
    });
    setStatusMessage(lang === 'bn' ? 'পেজ খালি করা হয়েছে' : 'Page cleared');
  };

  // Bespoke Signature Move Part 2: Live Calligraphy Stroke Replay
  const handleReplayStrokes = () => {
    if (currentStrokes.length === 0 || isReplaying) {
      setStatusMessage(
        lang === 'bn'
          ? 'রিপ্লে করার জন্য আগে বোর্ডে কিছু লিখুন!'
          : 'Draw a few Arabic strokes on the board first to replay!'
      );
      return;
    }
    setIsReplaying(true);
    setStatusMessage(lang === 'bn' ? 'আপনার লেখা রিপ্লে হচ্ছে...' : 'Replaying your calligraphy...');

    const canvas = canvasRef.current;
    if (!canvas) {
      setIsReplaying(false);
      return;
    }
    const ctx = canvas.getContext('2d');
    if (!ctx) {
      setIsReplaying(false);
      return;
    }

    let sIdx = 0;
    let pIdx = 1;

    const step = () => {
      // Draw background + finished strokes up to sIdx
      const w = canvas.width;
      const h = canvas.height;
      ctx.clearRect(0, 0, w, h);
      ctx.fillStyle =
        paperTheme === 'chalk' ? '#10281F' : paperTheme === 'cream' ? '#FAF4E4' : '#FFFFFF';
      ctx.fillRect(0, 0, w, h);

      if (mode === 'trace' && traceText.trim()) {
        ctx.save();
        ctx.font = `700 ${traceSize}px "Amiri", serif`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        const alpha = Math.max(0.05, Math.min(0.55, traceOpacity / 100));
        ctx.fillStyle =
          paperTheme === 'chalk'
            ? `rgba(229, 184, 92, ${alpha})`
            : `rgba(20, 83, 60, ${alpha})`;
        ctx.fillText(traceText, w / 2, h / 2 + 10);
        ctx.restore();
      }

      for (let i = 0; i < sIdx; i++) {
        drawSingleStroke(ctx, currentStrokes[i]);
      }
      if (sIdx < currentStrokes.length) {
        drawSingleStroke(ctx, currentStrokes[sIdx], pIdx);
        pIdx += 2;
        if (pIdx > currentStrokes[sIdx].points.length) {
          sIdx++;
          pIdx = 1;
        }
        requestAnimationFrame(step);
      } else {
        setIsReplaying(false);
        setStatusMessage(lang === 'bn' ? 'রিপ্লে সম্পন্ন হয়েছে' : 'Replay complete');
        renderCanvas();
      }
    };

    requestAnimationFrame(step);
  };

  const handleSaveImage = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const link = document.createElement('a');
    link.download = `digital-qaida-page-${currentPageIdx + 1}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
    setStatusMessage(lang === 'bn' ? 'ছবি ডাউনলোড হয়েছে' : 'Image saved to device');
  };

  return (
    <section
      id="writing"
      data-sc-act="pin"
      data-sc-span="2.6"
      className="scroll-mt-20 py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto"
    >
      {/* Authored Silence / Pre-Peak Calligraphic Breath */}
      <div className="text-center max-w-2xl mx-auto mb-12" data-sc-in>
        <p lang="ar" dir="rtl" className="arabic-font text-3xl sm:text-4xl text-[#14533C] dark:text-[#E5B85C] mb-2">
          ن وَالْقَلَمِ وَمَا يَسْطُرُونَ
        </p>
        <p className="text-sm sm:text-base italic text-[var(--sc-ink-soft)]">
          {lang === 'bn'
            ? '“অল্প অনুশীলন। সুন্দর শুরু।” · শ্রেণিকক্ষের লেখার বোর্ড · স্মার্টবোর্ডের জন্য প্রস্তুত'
            : '“A little practice. A beautiful beginning.” · Classroom Workspace · Smartboard Ready'}
        </p>
      </div>

      {/* Pro Access Notice Banner (from actual website) */}
      <div className="mb-6 p-4 rounded-2xl bg-[#0A261C] text-[#F3EFE4] border border-[#D9A441]/40 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono uppercase tracking-wider px-2 py-0.5 rounded bg-[#D9A441] text-[#071712] font-bold">
              আরবি Writing board · Pro
            </span>
            <span className="text-xs text-emerald-300 font-medium">
              {lang === 'bn' ? 'ইন্টারেক্টিভ লাইভ প্রিভিউ সক্রিয়' : 'Interactive Live Preview Active'}
            </span>
          </div>
          <p className="text-xs sm:text-sm text-emerald-100/85">
            {lang === 'bn'
              ? 'এই বোর্ডের জন্য সক্রিয় Pro subscription অথবা অনুমোদিত class access প্রয়োজন। আপনার সেভ করা লেখা অক্ষত আছে।'
              : 'Full multi-page export requires an active Pro subscription or approved class access. Try drawing below right now!'}
          </p>
        </div>
        <button
          type="button"
          onClick={onNavigatePlans}
          className="px-4 py-2 rounded-xl bg-[#D9A441] hover:bg-[#E5B85C] text-[#071712] font-bold text-xs sm:text-sm whitespace-nowrap shrink-0 cursor-pointer transition-colors"
        >
          {lang === 'bn' ? 'প্ল্যান দেখুন' : 'View plans'}
        </button>
      </div>

      {/* Main Writing Board Shell */}
      <div
        className={`rounded-2xl bg-[var(--sc-surface-elevated)] border-2 border-[#14533C]/25 dark:border-[#D9A441]/35 shadow-2xl overflow-hidden transition-all ${
          focusMode ? 'fixed inset-3 z-50 overflow-y-auto' : ''
        }`}
      >
        {/* Top Header Bar */}
        <header className="p-4 sm:px-6 bg-[var(--sc-surface)] border-b border-[var(--sc-hairline)] flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <p className="text-[11px] font-mono uppercase tracking-widest text-[#14533C] dark:text-[#D9A441]">
              {lang === 'bn'
                ? 'শ্রেণিকক্ষের লেখার বোর্ড · স্মার্টবোর্ডের জন্য প্রস্তুত'
                : 'CLASSROOM WORKSPACE · SMARTBOARD READY'}
            </p>
            <h2 className="text-xl sm:text-2xl font-bold text-[var(--sc-ink)] mt-0.5">
              {lang === 'bn' ? 'আরবি রাইটিং বোর্ড (Arabic Writing Board)' : 'Arabic Writing Board (আরবি রাইটিং বোর্ড)'}
            </h2>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => setFocusMode((f) => !f)}
              className="min-h-[38px] px-3.5 py-1.5 rounded-xl bg-[var(--sc-surface-elevated)] border border-[var(--sc-hairline-strong)] text-xs sm:text-sm font-medium flex items-center gap-1.5 hover:opacity-90 cursor-pointer"
            >
              {focusMode ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
              <span>{lang === 'bn' ? (focusMode ? 'ফোকাস বন্ধ করুন' : 'ফোকাস মোড') : focusMode ? 'Exit focus' : 'Focus mode'}</span>
            </button>

            <button
              type="button"
              onClick={handleSaveImage}
              className="min-h-[38px] px-3.5 py-1.5 rounded-xl bg-[var(--sc-surface-elevated)] border border-[var(--sc-hairline-strong)] text-xs sm:text-sm font-medium flex items-center gap-1.5 hover:opacity-90 cursor-pointer"
            >
              <Download className="w-4 h-4" />
              <span>{lang === 'bn' ? 'ছবি সেভ করুন' : 'Save image'}</span>
            </button>

            <button
              type="button"
              onClick={() => setExportDialogOpen(true)}
              className="min-h-[38px] px-3.5 py-1.5 rounded-xl bg-[var(--sc-surface-elevated)] border border-[var(--sc-hairline-strong)] text-xs sm:text-sm font-medium flex items-center gap-1.5 hover:opacity-90 cursor-pointer"
            >
              <FileText className="w-4 h-4" />
              <span>{lang === 'bn' ? 'ফরম্যাট বেছে সেভ করুন' : 'Export as'}</span>
            </button>

            <button
              type="button"
              onClick={() => setExportDialogOpen(true)}
              className="min-h-[38px] px-4 py-1.5 rounded-xl bg-[#14533C] dark:bg-[#D9A441] text-white dark:text-[#071712] text-xs sm:text-sm font-bold flex items-center gap-1.5 hover:opacity-95 cursor-pointer"
            >
              <FileText className="w-4 h-4" />
              <span>{lang === 'bn' ? 'সব পেজ PDF সেভ করুন' : 'Save all as PDF'}</span>
            </button>
          </div>
        </header>

        {/* Mode Switcher Bar (মুক্ত লেখা vs ট্রেস ও অনুশীলন) */}
        <div className="px-4 sm:px-6 py-3 bg-[var(--sc-surface)]/60 border-b border-[var(--sc-hairline)] flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setMode('free')}
              aria-pressed={mode === 'free'}
              className={`px-4 py-1.5 rounded-lg text-xs sm:text-sm font-semibold transition-colors cursor-pointer ${
                mode === 'free'
                  ? 'bg-[#14533C] text-white dark:bg-[#D9A441] dark:text-[#071712]'
                  : 'bg-black/5 dark:bg-white/5 text-[var(--sc-ink-soft)]'
              }`}
            >
              {lang === 'bn' ? 'মুক্ত লেখা (Free writing)' : 'Free writing'}
            </button>
            <button
              type="button"
              onClick={() => setMode('trace')}
              aria-pressed={mode === 'trace'}
              className={`px-4 py-1.5 rounded-lg text-xs sm:text-sm font-semibold transition-colors cursor-pointer ${
                mode === 'trace'
                  ? 'bg-[#14533C] text-white dark:bg-[#D9A441] dark:text-[#071712]'
                  : 'bg-black/5 dark:bg-white/5 text-[var(--sc-ink-soft)]'
              }`}
            >
              {lang === 'bn' ? 'ট্রেস ও অনুশীলন (Trace & practice)' : 'Trace & practice'}
            </button>
          </div>

          <span className="text-xs font-mono text-[var(--sc-ink-soft)]">
            {statusMessage || (lang === 'bn' ? 'লেখার জন্য প্রস্তুত · ডান থেকে বামে লিখুন ←' : 'Ready to write · Write right to left ←')}
          </span>
        </div>

        {/* Main Workspace Grid: Canvas & Controls (Left 8 cols) + Arabic Practice Sidebar (Right 4 cols) */}
        <div className="grid grid-cols-1 lg:grid-cols-12">
          {/* Left 8 Columns: Toolbar + Interactive HTML5 Calligraphy Canvas */}
          <div className="lg:col-span-8 p-4 sm:p-6 border-b lg:border-b-0 lg:border-r border-[var(--sc-hairline)] space-y-4">
            {/* Drawing Tools & History Row */}
            <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-[var(--sc-hairline)]">
              <div className="flex flex-wrap items-center gap-1.5" role="toolbar" aria-label="Drawing tools">
                {(
                  [
                    { id: 'pen', bn: 'কলম', en: 'Pen' },
                    { id: 'marker', bn: 'মার্কার', en: 'Marker' },
                    { id: 'highlighter', bn: 'হাইলাইট', en: 'Highlight' },
                    { id: 'eraser', bn: 'ইরেজার', en: 'Eraser' },
                    { id: 'laser', bn: 'লেজার', en: 'Laser' }
                  ] as const
                ).map((t) => (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => setTool(t.id)}
                    aria-pressed={tool === t.id}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                      tool === t.id
                        ? 'bg-[#0A261C] text-[#E5B85C] shadow-xs'
                        : 'bg-[var(--sc-surface)] text-[var(--sc-ink)] hover:opacity-80'
                    }`}
                  >
                    {lang === 'bn' ? t.bn : t.en}
                  </button>
                ))}
              </div>

              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={handleUndo}
                  title={lang === 'bn' ? 'পূর্বাবস্থায় ফেরান' : 'Undo'}
                  className="px-2.5 py-1.5 rounded-lg bg-[var(--sc-surface)] text-xs font-medium flex items-center gap-1 hover:opacity-80 cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>{lang === 'bn' ? 'পূর্বাবস্থায় ফেরান' : 'Undo'}</span>
                </button>
                <button
                  type="button"
                  onClick={handleRedo}
                  title={lang === 'bn' ? 'আবার করুন' : 'Redo'}
                  className="px-2.5 py-1.5 rounded-lg bg-[var(--sc-surface)] text-xs font-medium flex items-center gap-1 hover:opacity-80 cursor-pointer"
                >
                  <RotateCw className="w-3.5 h-3.5" />
                  <span>{lang === 'bn' ? 'আবার করুন' : 'Redo'}</span>
                </button>
                <button
                  type="button"
                  onClick={handleClear}
                  className="px-2.5 py-1.5 rounded-lg bg-rose-500/10 text-rose-600 dark:text-rose-300 text-xs font-medium flex items-center gap-1 hover:bg-rose-500/20 cursor-pointer"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>{lang === 'bn' ? 'পেজ খালি করুন' : 'Clear page'}</span>
                </button>
              </div>
            </div>

            {/* Calligraphy Nib Style, Angle, Pen Size, Smoothing & Ink Swatches */}
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3 text-xs bg-[var(--sc-surface)] p-3.5 rounded-xl border border-[var(--sc-hairline)]">
              <div>
                <label htmlFor="nibStyleSelect" className="block font-semibold mb-1 text-[var(--sc-ink)]">
                  {lang === 'bn' ? 'ক্যালিগ্রাফির ধরন' : 'Calligraphy style'}
                </label>
                <select
                  id="nibStyleSelect"
                  value={nibStyle}
                  onChange={(e) => setNibStyle(e.target.value as 'simple' | 'speed' | 'thin' | 'broad')}
                  className="w-full px-2.5 py-1.5 rounded-lg bg-[var(--sc-surface-elevated)] border border-[var(--sc-hairline-strong)]"
                >
                  <option value="broad">{lang === 'bn' ? 'চওড়া নিব (45°)' : 'Broad nib (45°)'}</option>
                  <option value="thin">{lang === 'bn' ? 'সরু নিব' : 'Thin nib'}</option>
                  <option value="simple">{lang === 'bn' ? 'সাধারণ কলম' : 'Simple pen'}</option>
                  <option value="speed">{lang === 'bn' ? 'গতিনির্ভর কলম' : 'Speed pen'}</option>
                </select>
              </div>

              <div>
                <label htmlFor="penSizeSlider" className="flex justify-between font-semibold mb-1 text-[var(--sc-ink)]">
                  <span>{lang === 'bn' ? 'কলমের সাইজ' : 'Pen size'}</span>
                  <span className="font-mono tabular-nums">{penSize} px</span>
                </label>
                <input
                  id="penSizeSlider"
                  type="range"
                  min={2}
                  max={48}
                  value={penSize}
                  onChange={(e) => setPenSize(Number(e.target.value))}
                  className="w-full accent-[#14533C] dark:accent-[#D9A441]"
                />
              </div>

              <div>
                <label htmlFor="nibAngleSlider" className="flex justify-between font-semibold mb-1 text-[var(--sc-ink)]">
                  <span>{lang === 'bn' ? 'নিবের কোণ · মসৃণতা' : 'Nib angle · Smoothing'}</span>
                  <span className="font-mono tabular-nums">{nibAngle}° · {smoothing}%</span>
                </label>
                <input
                  id="nibAngleSlider"
                  type="range"
                  min={15}
                  max={75}
                  value={nibAngle}
                  onChange={(e) => setNibAngle(Number(e.target.value))}
                  className="w-full accent-[#14533C] dark:accent-[#D9A441]"
                />
              </div>

              <div>
                <span className="block font-semibold mb-1.5 text-[var(--sc-ink)]">
                  {lang === 'bn' ? 'কালির রঙ (Ink color)' : 'Ink color'}
                </span>
                <div className="flex items-center gap-1.5">
                  {INK_SWATCHES.map((sw) => (
                    <button
                      key={sw.hex}
                      type="button"
                      onClick={() => setInkColor(sw.hex)}
                      aria-label={lang === 'bn' ? sw.labelBn : sw.labelEn}
                      className={`w-6 h-6 rounded-full border-2 transition-transform cursor-pointer ${
                        inkColor === sw.hex ? 'scale-115 border-[#D9A441]' : 'border-transparent'
                      }`}
                      style={{ backgroundColor: sw.hex }}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Board Guides, Paper & Texture Row */}
            <div className="flex flex-wrap items-center gap-3 text-xs">
              <div className="flex items-center gap-2">
                <label htmlFor="boardGuideSelect" className="font-medium text-[var(--sc-ink-soft)]">
                  {lang === 'bn' ? 'বোর্ডের সহায়ক রেখা:' : 'Board guides:'}
                </label>
                <select
                  id="boardGuideSelect"
                  value={boardGuide}
                  onChange={(e) => setBoardGuide(e.target.value as 'ruled' | 'blank' | 'grid' | 'dots')}
                  className="px-2.5 py-1 rounded-lg bg-[var(--sc-surface)] border border-[var(--sc-hairline-strong)]"
                >
                  <option value="ruled">{lang === 'bn' ? 'লেখার লাইন' : 'Writing lines'}</option>
                  <option value="blank">{lang === 'bn' ? 'খালি বোর্ড' : 'Blank board'}</option>
                  <option value="grid">{lang === 'bn' ? 'বর্গের ছক' : 'Square grid'}</option>
                  <option value="dots">{lang === 'bn' ? 'বিন্দুর ছক' : 'Dot grid'}</option>
                </select>
              </div>

              <div className="flex items-center gap-2">
                <label htmlFor="paperThemeSelect" className="font-medium text-[var(--sc-ink-soft)]">
                  {lang === 'bn' ? 'কাগজ:' : 'Paper:'}
                </label>
                <select
                  id="paperThemeSelect"
                  value={paperTheme}
                  onChange={(e) => setPaperTheme(e.target.value as 'cream' | 'paper' | 'chalk')}
                  className="px-2.5 py-1 rounded-lg bg-[var(--sc-surface)] border border-[var(--sc-hairline-strong)]"
                >
                  <option value="cream">{lang === 'bn' ? 'ক্রিম (Warm cream)' : 'Warm cream'}</option>
                  <option value="paper">{lang === 'bn' ? 'সাদা (White)' : 'White'}</option>
                  <option value="chalk">{lang === 'bn' ? 'চকবোর্ড (Chalkboard)' : 'Chalkboard'}</option>
                </select>
              </div>

              <div className="flex items-center gap-2">
                <label htmlFor="paperTextureSelect" className="font-medium text-[var(--sc-ink-soft)]">
                  {lang === 'bn' ? 'টেক্সচার:' : 'Texture:'}
                </label>
                <select
                  id="paperTextureSelect"
                  value={paperTexture}
                  onChange={(e) => setPaperTexture(e.target.value as 'smooth' | 'paper' | 'canvas')}
                  className="px-2.5 py-1 rounded-lg bg-[var(--sc-surface)] border border-[var(--sc-hairline-strong)]"
                >
                  <option value="paper">{lang === 'bn' ? 'কাগজের দানা' : 'Paper grain'}</option>
                  <option value="smooth">{lang === 'bn' ? 'মসৃণ' : 'Smooth'}</option>
                  <option value="canvas">{lang === 'bn' ? 'ক্যানভাসের বুনন' : 'Canvas weave'}</option>
                </select>
              </div>
            </div>

            {/* THE INTERACTIVE CALLIGRAPHY CANVAS */}
            <div className="relative rounded-2xl overflow-hidden border-2 border-[#14533C]/30 dark:border-[#D9A441]/30 shadow-inner">
              <canvas
                ref={canvasRef}
                width={960}
                height={480}
                data-testid="arabic-writing-canvas"
                aria-label="Arabic handwriting canvas. Draw with a mouse, finger, or pen."
                onPointerDown={handlePointerDown}
                onPointerMove={handlePointerMove}
                onPointerUp={handlePointerUp}
                onPointerLeave={handlePointerUp}
                className="w-full h-[300px] sm:h-[380px] touch-none cursor-crosshair block"
              />
              {mode === 'trace' && traceText.trim() && (
                <div
                  dir="rtl"
                  lang="ar"
                  aria-hidden="true"
                  className="arabic-font pointer-events-none select-none absolute inset-0 flex items-center justify-center font-bold leading-none"
                  style={{
                    fontSize: `${Math.round(traceSize * 0.85)}px`,
                    opacity: Math.max(0.08, Math.min(0.65, traceOpacity / 100)),
                    color: paperTheme === 'chalk' ? '#E5B85C' : '#14533C',
                  }}
                >
                  {traceText}
                </div>
              )}
            </div>

            {/* Canvas Status & Multi-Page Controls (পেজসমূহ · পেজ ১ / ১ · সর্বোচ্চ ১০০টি পেজ) */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-2 text-xs text-[var(--sc-ink-soft)]">
              <div className="flex items-center gap-3 font-mono tabular-nums">
                <span>
                  {lang === 'bn' ? `কলম · ${penSize} পিক্সেল` : `Pen · ${penSize} px`}
                </span>
                <span>·</span>
                <span>
                  {lang === 'bn'
                    ? `${currentStrokes.length}টি দাগ`
                    : `${currentStrokes.length} strokes`}
                </span>
                <span>·</span>
                <span className="font-semibold text-[#14533C] dark:text-[#D9A441]">
                  {lang === 'bn' ? 'ডান থেকে বামে লিখুন ←' : 'Write right to left ←'}
                </span>
              </div>

              {/* Pages Management */}
              <div className="flex flex-wrap items-center gap-2">
                <span className="font-mono font-semibold text-[var(--sc-ink)] tabular-nums">
                  {lang === 'bn'
                    ? `পেজ ${currentPageIdx + 1} / ${pages.length}`
                    : `Page ${currentPageIdx + 1} of ${pages.length}`}
                </span>
                <button
                  type="button"
                  onClick={() => {
                    if (pages.length < 100) {
                      setPages((p) => [...p, []]);
                      setCurrentPageIdx(pages.length);
                    }
                  }}
                  aria-label={lang === 'bn' ? 'নতুন পেজ যোগ করুন' : 'Add practice page'}
                  className="px-2.5 py-1 rounded-lg bg-[var(--sc-surface)] border border-[var(--sc-hairline-strong)] text-[var(--sc-ink)] font-medium flex items-center gap-1 cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>{lang === 'bn' ? 'নতুন পেজ' : 'New page'}</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setPages((p) => [...p, [...currentStrokes]]);
                    setCurrentPageIdx(pages.length);
                  }}
                  className="px-2.5 py-1 rounded-lg bg-[var(--sc-surface)] border border-[var(--sc-hairline-strong)] text-[var(--sc-ink)] font-medium flex items-center gap-1 cursor-pointer"
                >
                  <Copy className="w-3.5 h-3.5" />
                  <span>{lang === 'bn' ? 'কপি করুন' : 'Duplicate'}</span>
                </button>
                {removedPageBackup && (
                  <button
                    type="button"
                    onClick={() => {
                      setPages((p) => [...p, removedPageBackup]);
                      setRemovedPageBackup(null);
                    }}
                    className="px-2.5 py-1 rounded-lg bg-amber-500/20 text-amber-700 dark:text-amber-300 font-medium cursor-pointer"
                  >
                    {lang === 'bn' ? 'পেজ ফেরান' : 'Restore page'}
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Right 4 Columns: Practice Letter Selector, RTL Tracing Guide & Smartboard Controls */}
          <aside className="lg:col-span-4 p-4 sm:p-6 bg-[var(--sc-surface)]/50 space-y-5">
            {/* 1. অনুশীলনের হরফ (Practice Letter Card) */}
            <div className="p-4 rounded-xl bg-[var(--sc-surface-elevated)] border border-[var(--sc-hairline-strong)] space-y-3">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="uppercase tracking-wider text-[#14533C] dark:text-[#D9A441] font-bold">
                  {lang === 'bn' ? 'অনুশীলনের হরফ' : 'PRACTICE LETTER'}
                </span>
                <span className="tabular-nums">
                  {currentPracticeLetter.id} / 29
                </span>
              </div>

              <div className="text-center py-3 rounded-xl bg-[#0A261C] text-[#E5B85C]">
                <div lang="ar" dir="rtl" className="arabic-font text-6xl leading-none select-none">
                  {currentPracticeLetter.arabic}
                </div>
                <p className="text-sm font-bold text-white mt-2">
                  {lang === 'bn' ? currentPracticeLetter.nameBn : currentPracticeLetter.nameEn}
                </p>
                <p className="text-[11px] text-emerald-200/75 mt-0.5">
                  {lang === 'bn' ? 'দেখুন। ট্রেস করুন। লিখুন।' : 'Look. Trace. Write.'}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => {
                    const nextIdx = practiceLetterIdx > 0 ? practiceLetterIdx - 1 : ARABIC_LETTERS.length - 1;
                    setPracticeLetterIdx(nextIdx);
                    onChangeTraceText(ARABIC_LETTERS[nextIdx].arabic);
                    setMode('trace');
                  }}
                  className="min-h-[38px] px-3 py-1.5 rounded-lg border border-[var(--sc-hairline-strong)] text-xs font-semibold flex items-center justify-center gap-1 hover:bg-black/5 dark:hover:bg-white/5 cursor-pointer"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>{lang === 'bn' ? '← আগের' : '← Previous'}</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    const nextIdx = practiceLetterIdx < ARABIC_LETTERS.length - 1 ? practiceLetterIdx + 1 : 0;
                    setPracticeLetterIdx(nextIdx);
                    onChangeTraceText(ARABIC_LETTERS[nextIdx].arabic);
                    setMode('trace');
                  }}
                  className="min-h-[38px] px-3 py-1.5 rounded-lg bg-[#14533C] dark:bg-[#D9A441] text-white dark:text-[#071712] text-xs font-bold flex items-center justify-center gap-1 cursor-pointer"
                >
                  <span>{lang === 'bn' ? 'পরের →' : 'Next →'}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* 2. ট্রেসিং নির্দেশিকা ডান থেকে বাম (Tracing Guide RTL) */}
            <div className="p-4 rounded-xl bg-[var(--sc-surface-elevated)] border border-[var(--sc-hairline-strong)] space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-[var(--sc-ink)]">
                  {lang === 'bn' ? 'ট্রেসিং নির্দেশিকা' : 'Tracing guide'}
                </h3>
                <span className="text-[11px] font-mono text-[#14533C] dark:text-[#D9A441] font-semibold">
                  {lang === 'bn' ? 'ডান থেকে বাম · RTL' : 'RTL'}
                </span>
              </div>

              <div>
                <label htmlFor="traceWordInput" className="block text-xs text-[var(--sc-ink-soft)] mb-1">
                  {lang === 'bn' ? 'আরবি হরফ বা শব্দ:' : 'Letter or Arabic word:'}
                </label>
                <input
                  id="traceWordInput"
                  dir="rtl"
                  lang="ar"
                  type="text"
                  maxLength={40}
                  value={traceText}
                  onChange={(e) => {
                    onChangeTraceText(e.target.value);
                    setMode('trace');
                  }}
                  placeholder="اكتب كلمة"
                  className="w-full px-3 py-2 rounded-lg bg-[var(--sc-surface)] border border-[var(--sc-hairline-strong)] arabic-font text-xl text-right"
                />
              </div>

              {/* Sample Arabic Words from Website (بِسْمِ , قَلَمٌ , كِتَابٌ) */}
              <div className="grid grid-cols-3 gap-2" dir="rtl">
                {['بِسْمِ', 'قَلَمٌ', 'كِتَابٌ'].map((word) => (
                  <button
                    key={word}
                    type="button"
                    onClick={() => {
                      onChangeTraceText(word);
                      setMode('trace');
                    }}
                    className={`py-2 rounded-lg arabic-font text-xl border transition-colors cursor-pointer ${
                      traceText === word
                        ? 'bg-[#0A261C] text-[#E5B85C] border-[#D9A441]'
                        : 'bg-[var(--sc-surface)] text-[var(--sc-ink)] border-[var(--sc-hairline)]'
                    }`}
                  >
                    {word}
                  </button>
                ))}
              </div>

              <div className="grid grid-cols-2 gap-3 pt-1 text-xs">
                <div>
                  <label htmlFor="traceSizeInput" className="block text-[var(--sc-ink-soft)] mb-1">
                    {lang === 'bn' ? 'নমুনার সাইজ' : 'Model size'}
                  </label>
                  <input
                    id="traceSizeInput"
                    type="range"
                    min={90}
                    max={300}
                    value={traceSize}
                    onChange={(e) => setTraceSize(Number(e.target.value))}
                    className="w-full accent-[#14533C] dark:accent-[#D9A441]"
                  />
                </div>
                <div>
                  <label htmlFor="traceOpacityInput" className="block text-[var(--sc-ink-soft)] mb-1">
                    {lang === 'bn' ? 'দৃশ্যমানতা' : 'Visibility'}
                  </label>
                  <input
                    id="traceOpacityInput"
                    type="range"
                    min={8}
                    max={55}
                    value={traceOpacity}
                    onChange={(e) => setTraceOpacity(Number(e.target.value))}
                    className="w-full accent-[#14533C] dark:accent-[#D9A441]"
                  />
                </div>
              </div>
            </div>

            {/* 3. স্মার্টবোর্ড নিয়ন্ত্রণ (Smartboard Controls & Stroke Replay) */}
            <div className="p-4 rounded-xl bg-[var(--sc-surface-elevated)] border border-[var(--sc-hairline-strong)] space-y-3">
              <h3 className="text-sm font-bold text-[var(--sc-ink)]">
                {lang === 'bn' ? 'স্মার্টবোর্ড নিয়ন্ত্রণ' : 'Smartboard controls'}
              </h3>

              <label className="flex items-center justify-between text-xs cursor-pointer">
                <span>
                  <strong className="block text-[var(--sc-ink)]">{lang === 'bn' ? 'শুধু কলম' : 'Pen only'}</strong>
                  <span className="text-[var(--sc-ink-soft)]">
                    {lang === 'bn' ? 'আঙুলের স্পর্শে লেখা বন্ধ' : 'Ignore finger touches'}
                  </span>
                </span>
                <input
                  type="checkbox"
                  checked={penOnly}
                  onChange={(e) => setPenOnly(e.target.checked)}
                  className="w-4 h-4 accent-[#14533C] dark:accent-[#D9A441]"
                />
              </label>

              <label className="flex items-center justify-between text-xs cursor-pointer">
                <span>
                  <strong className="block text-[var(--sc-ink)]">{lang === 'bn' ? 'কলমের চাপ' : 'Pen pressure'}</strong>
                  <span className="text-[var(--sc-ink-soft)]">
                    {lang === 'bn' ? 'সমর্থিত ডিজিটাল কলমের জন্য' : 'For compatible styluses'}
                  </span>
                </span>
                <input
                  type="checkbox"
                  checked={penPressure}
                  onChange={(e) => setPenPressure(e.target.checked)}
                  className="w-4 h-4 accent-[#14533C] dark:accent-[#D9A441]"
                />
              </label>

              <button
                type="button"
                onClick={handleReplayStrokes}
                disabled={isReplaying}
                className="w-full min-h-[42px] py-2.5 px-4 rounded-xl bg-[#D9A441] hover:bg-[#E5B85C] text-[#071712] font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                <Play className="w-4 h-4 fill-current" />
                <span>{lang === 'bn' ? 'নিজের লেখা আবার দেখুন (Replay)' : 'Replay my writing'}</span>
              </button>
            </div>
          </aside>
        </div>

        {/* Board Footer & Shortcuts (from actual website) */}
        <footer className="px-4 sm:px-6 py-3.5 bg-[var(--sc-surface)] border-t border-[var(--sc-hairline)] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-[var(--sc-ink-soft)]">
          <p>
            {lang === 'bn'
              ? 'টিপস: মোটা দাগের জন্য সাইজ বাড়ান। একবার ট্যাপ করলে আরবি বিন্দু (নুকতা) হবে। সর্বোচ্চ ১০০টি পেজ।'
              : 'Tip: use the size slider for larger strokes. A single tap makes an Arabic dot. Up to 100 pages.'}
          </p>
          <div className="flex flex-wrap items-center gap-3 font-mono text-[11px]">
            <span>P {lang === 'bn' ? 'কলম' : 'pen'}</span>
            <span>·</span>
            <span>E {lang === 'bn' ? 'ইরেজার' : 'eraser'}</span>
            <span>·</span>
            <span>L {lang === 'bn' ? 'লেজার' : 'laser'}</span>
            <span>·</span>
            <span>F {lang === 'bn' ? 'ফোকাস' : 'focus'}</span>
          </div>
        </footer>
      </div>

      {/* Export Dialog Modal */}
      {exportDialogOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="exportDialogTitle"
          className="fixed inset-0 z-50 bg-black/65 backdrop-blur-xs flex items-center justify-center p-4"
        >
          <div className="w-full max-w-md rounded-2xl bg-[var(--sc-surface-elevated)] border border-[var(--sc-hairline-strong)] p-6 space-y-4 shadow-2xl">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-[11px] font-mono uppercase tracking-wider text-[#14533C] dark:text-[#D9A441]">
                  {lang === 'bn' ? 'কম্পিউটারে সেভ করুন' : 'SAVE TO YOUR COMPUTER'}
                </p>
                <h3 id="exportDialogTitle" className="text-lg font-bold text-[var(--sc-ink)]">
                  {lang === 'bn' ? 'আপনার লেখা এক্সপোর্ট করুন' : 'Export your writing'}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setExportDialogOpen(false)}
                className="text-sm px-2.5 py-1 rounded-lg bg-[var(--sc-surface)] cursor-pointer"
              >
                ✕
              </button>
            </div>

            <p className="text-xs text-[var(--sc-ink-soft)]">
              {lang === 'bn'
                ? 'সব পেজ একসঙ্গে PDF হিসেবে সেভ করুন, অথবা অন্য ফরম্যাট বেছে নিন।'
                : 'Save all pages together as a PDF, or choose another format.'}
            </p>

            <div className="space-y-3 text-xs">
              <div>
                <label htmlFor="exportFormatSelect" className="block font-semibold mb-1">
                  {lang === 'bn' ? 'ফাইলের ফরম্যাট' : 'File format'}
                </label>
                <select
                  id="exportFormatSelect"
                  value={exportFormat}
                  onChange={(e) => setExportFormat(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-[var(--sc-surface)] border border-[var(--sc-hairline-strong)]"
                >
                  <option value="pdf">{lang === 'bn' ? 'PDF ডকুমেন্ট (.pdf)' : 'PDF document (.pdf)'}</option>
                  <option value="png">{lang === 'bn' ? 'PNG ছবি (.png)' : 'PNG image (.png)'}</option>
                  <option value="jpeg">{lang === 'bn' ? 'JPEG ছবি (.jpg)' : 'JPEG image (.jpg)'}</option>
                  <option value="webp">{lang === 'bn' ? 'WebP ছবি (.webp)' : 'WebP image (.webp)'}</option>
                  <option value="svg">{lang === 'bn' ? 'SVG ছবি (.svg)' : 'SVG image (.svg)'}</option>
                  <option value="json">{lang === 'bn' ? 'সম্পাদনাযোগ্য সেশন (.json)' : 'Editable session (.json)'}</option>
                </select>
              </div>

              <div>
                <label htmlFor="exportScopeSelect" className="block font-semibold mb-1">
                  {lang === 'bn' ? 'এক্সপোর্ট করার পেজ' : 'Pages to export'}
                </label>
                <select
                  id="exportScopeSelect"
                  value={exportScope}
                  onChange={(e) => setExportScope(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-[var(--sc-surface)] border border-[var(--sc-hairline-strong)]"
                >
                  <option value="all">{lang === 'bn' ? 'সব পেজ' : 'All pages'}</option>
                  <option value="current">{lang === 'bn' ? 'বর্তমান পেজ' : 'Current page'}</option>
                </select>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-3 border-t border-[var(--sc-hairline)]">
              <button
                type="button"
                onClick={() => setExportDialogOpen(false)}
                className="px-4 py-2 rounded-xl border border-[var(--sc-hairline-strong)] text-xs font-medium cursor-pointer"
              >
                {lang === 'bn' ? 'বাতিল' : 'Cancel'}
              </button>
              <button
                type="button"
                onClick={() => {
                  handleSaveImage();
                  setExportDialogOpen(false);
                }}
                className="px-4 py-2 rounded-xl bg-[#14533C] dark:bg-[#D9A441] text-white dark:text-[#071712] text-xs font-bold cursor-pointer"
              >
                {lang === 'bn' ? 'ফাইল এক্সপোর্ট করুন' : 'Export file'}
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
