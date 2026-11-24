import { useEffect, useState } from 'react';
import { clamp, clamp01, dwellEase } from '../data/qaidaData';

export interface ScrollCraftState {
  pageProgress: number;
  activeActIndex: number;
  scrollVelocity: number;
}

export function useScrollCraft(): ScrollCraftState {
  const [state, setState] = useState<ScrollCraftState>({
    pageProgress: 0,
    activeActIndex: 0,
    scrollVelocity: 0
  });

  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

    let rafId = 0;
    let pointerRafId = 0;
    let lastScrollY = window.scrollY;
    let velocity = 0;

    // 1. Flow reveal IntersectionObserver ([data-sc-in])
    let io: IntersectionObserver | null = null;
    if ('IntersectionObserver' in window) {
      io = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            const el = entry.target as HTMLElement;
            el.classList.add('sc-in');
            const stagger = parseFloat(el.getAttribute('data-sc-stagger') || '');
            if (!isNaN(stagger)) {
              Array.from(el.children).forEach((child, idx) => {
                (child as HTMLElement).style.transitionDelay = `${idx * stagger}ms`;
                child.classList.add('sc-in');
              });
            }
            io?.unobserve(el);
          });
        },
        { rootMargin: '0px 0px -10% 0px', threshold: 0.05 }
      );
      document.querySelectorAll('[data-sc-in]').forEach((el) => io?.observe(el));
    } else {
      document.querySelectorAll('[data-sc-in]').forEach((el) => el.classList.add('sc-in'));
    }

    // 2. Scroll Progress & Act Reader
    const readScroll = () => {
      const y = window.scrollY || window.pageYOffset;
      const vh = window.innerHeight || 1;
      const maxScroll = Math.max(document.documentElement.scrollHeight - vh, 1);
      const pageProgress = clamp01(y / maxScroll);

      const dy = Math.abs(y - lastScrollY);
      velocity = velocity * 0.8 + dy * 0.2;
      lastScrollY = y;

      document.documentElement.style.setProperty('--sc-page-p', pageProgress.toFixed(4));

      const actElements = Array.from(document.querySelectorAll<HTMLElement>('[data-sc-act]'));
      let currentActIdx = 0;

      actElements.forEach((el, idx) => {
        const rect = el.getBoundingClientRect();
        const top = rect.top + y;
        const height = Math.max(rect.height, 1);
        const raw = clamp01((y + vh * 0.45 - top) / height);
        const dwell = parseFloat(el.getAttribute('data-sc-dwell') || '0');
        const p = dwell ? dwellEase(raw, dwell) : raw;

        el.style.setProperty('--sc-p', p.toFixed(4));

        if (rect.top <= vh * 0.5 && rect.bottom >= vh * 0.25) {
          currentActIdx = idx;
        }

        // Drive parallax children inside this act
        if (!reduceMotion) {
          const parallaxNodes = el.querySelectorAll<HTMLElement>('[data-sc-parallax]');
          parallaxNodes.forEach((node) => {
            const rate = parseFloat(node.getAttribute('data-sc-parallax') || '0');
            const offsetPx = rate * (p - 0.5) * 100;
            node.style.transform = `translate3d(0, ${offsetPx.toFixed(2)}px, 0)`;
          });
        }
      });

      setState({
        pageProgress,
        activeActIndex: currentActIdx,
        scrollVelocity: Math.min(velocity, 60)
      });
    };

    // 3. Pointer Tilt, Magnet & Spotlight
    const tilts: Array<{ el: HTMLElement; max: number; x: number; y: number; tx: number; ty: number }> = [];
    const magnets: Array<{ el: HTMLElement; k: number; x: number; y: number; tx: number; ty: number }> = [];
    const spots: HTMLElement[] = [];

    if (!reduceMotion && finePointer) {
      document.querySelectorAll<HTMLElement>('[data-sc-tilt]').forEach((el) => {
        tilts.push({ el, max: parseFloat(el.getAttribute('data-sc-tilt') || '5'), x: 0, y: 0, tx: 0, ty: 0 });
      });
      document.querySelectorAll<HTMLElement>('[data-sc-magnet]').forEach((el) => {
        magnets.push({ el, k: parseFloat(el.getAttribute('data-sc-magnet') || '0.24'), x: 0, y: 0, tx: 0, ty: 0 });
      });
      document.querySelectorAll<HTMLElement>('[data-sc-spotlight]').forEach((el) => {
        spots.push(el);
      });
    }

    const onPointerMove = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse') return;
      const vh = window.innerHeight;
      tilts.forEach((T) => {
        const r = T.el.getBoundingClientRect();
        if (r.bottom < -100 || r.top > vh + 100) {
          T.tx = 0;
          T.ty = 0;
          return;
        }
        const nx = (e.clientX - (r.left + r.width / 2)) / Math.max(r.width / 2, 1);
        const ny = (e.clientY - (r.top + r.height / 2)) / Math.max(r.height / 2, 1);
        const inside = Math.abs(nx) < 1.3 && Math.abs(ny) < 1.3;
        T.tx = inside ? clamp(ny, -1, 1) * -T.max : 0;
        T.ty = inside ? clamp(nx, -1, 1) * T.max : 0;
      });

      magnets.forEach((M) => {
        const r = M.el.getBoundingClientRect();
        const dx = e.clientX - (r.left + r.width / 2);
        const dy = e.clientY - (r.top + r.height / 2);
        const near = Math.abs(dx) < r.width * 0.9 && Math.abs(dy) < r.height * 2;
        M.tx = near ? dx * M.k : 0;
        M.ty = near ? dy * M.k : 0;
      });

      spots.forEach((S) => {
        const r = S.getBoundingClientRect();
        if (r.width > 0 && r.height > 0) {
          S.style.setProperty('--sc-mx', clamp01((e.clientX - r.left) / r.width).toFixed(3));
          S.style.setProperty('--sc-my', clamp01((e.clientY - r.top) / r.height).toFixed(3));
        }
      });
    };

    const pointerLoop = () => {
      tilts.forEach((T) => {
        T.x += (T.tx - T.x) * 0.1;
        T.y += (T.ty - T.y) * 0.1;
        if (Math.abs(T.x) > 0.01 || Math.abs(T.y) > 0.01) {
          T.el.style.transform = `perspective(1100px) rotateX(${T.x.toFixed(2)}deg) rotateY(${T.y.toFixed(2)}deg)`;
        } else {
          T.el.style.transform = '';
        }
      });
      magnets.forEach((M) => {
        M.x += (M.tx - M.x) * 0.14;
        M.y += (M.ty - M.y) * 0.14;
        if (Math.abs(M.x) > 0.1 || Math.abs(M.y) > 0.1) {
          M.el.style.transform = `translate3d(${M.x.toFixed(1)}px, ${M.y.toFixed(1)}px, 0)`;
        } else {
          M.el.style.transform = '';
        }
      });
      pointerRafId = requestAnimationFrame(pointerLoop);
    };

    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        rafId = requestAnimationFrame(() => {
          readScroll();
          ticking = false;
        });
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    if (!reduceMotion && finePointer) {
      window.addEventListener('pointermove', onPointerMove, { passive: true });
      pointerRafId = requestAnimationFrame(pointerLoop);
    }

    readScroll();

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      window.removeEventListener('pointermove', onPointerMove);
      if (rafId) cancelAnimationFrame(rafId);
      if (pointerRafId) cancelAnimationFrame(pointerRafId);
      io?.disconnect();
    };
  }, []);

  return state;
}
