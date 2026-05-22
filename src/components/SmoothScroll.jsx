import { useEffect, useMemo, useState } from 'react';
import 'lenis/dist/lenis.css';

const DISABLE_LENIS_HASH_PATHS = ['/clubs'];

const easing = (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t));
const WHEEL_DAMPING_LERP = 0.065;

const getHashPath = () => {
  if (typeof window === 'undefined') return '/';

  const rawHash = window.location.hash.slice(1) || '/';
  try {
    return decodeURIComponent(rawHash);
  } catch {
    return rawHash;
  }
};

const shouldDisableForPath = (path) =>
  DISABLE_LENIS_HASH_PATHS.some((basePath) => path === basePath || path.startsWith(`${basePath}/`));

const isMobileUserAgent = () =>
  typeof navigator !== 'undefined' &&
  /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

export default function SmoothScroll({ children }) {
  const [hashPath, setHashPath] = useState(getHashPath);

  const shouldDisableLenis = useMemo(() => shouldDisableForPath(hashPath), [hashPath]);

  useEffect(() => {
    if (typeof window === 'undefined') return undefined;

    const handleHashChange = () => setHashPath(getHashPath());
    window.addEventListener('hashchange', handleHashChange);

    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return undefined;
    }

    const root = document.documentElement;
    const previousBehavior = root.style.scrollBehavior;
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const disableLenis = shouldDisableLenis || reduceMotion || isMobileUserAgent();

    if (disableLenis) {
      // Keep native behavior predictable on mobile and reduced-motion devices.
      root.style.scrollBehavior = 'auto';
      return () => {
        root.style.scrollBehavior = previousBehavior;
      };
    }

    root.style.scrollBehavior = 'auto';

    let lenis = null;
    let rafId = 0;
    let initTimeoutId = 0;
    let cancelled = false;

    initTimeoutId = window.setTimeout(() => {
      import('lenis')
        .then(({ default: Lenis }) => {
          if (cancelled) return;

          lenis = new Lenis({
            duration: 1.35,
            easing,
            lerp: WHEEL_DAMPING_LERP,
            smoothWheel: true,
            syncTouch: false,
            touchMultiplier: 1.2,
            wheelMultiplier: 1,
            autoResize: true,
            stopInertiaOnNavigate: true,
          });

          window.__lenis = lenis;

          const raf = (time) => {
            if (!lenis) return;
            lenis.raf(time);
            rafId = window.requestAnimationFrame(raf);
          };

          rafId = window.requestAnimationFrame(raf);
        })
        .catch(() => {
          // Keep native scroll behavior if Lenis fails to load.
        });
    }, 100);

    return () => {
      cancelled = true;

      if (initTimeoutId) {
        window.clearTimeout(initTimeoutId);
      }

      if (rafId) {
        window.cancelAnimationFrame(rafId);
      }

      if (lenis) {
        lenis.destroy();
      }

      if (window.__lenis === lenis && lenis) {
        delete window.__lenis;
      }

      root.style.scrollBehavior = previousBehavior;
    };
  }, [shouldDisableLenis]);

  return (
    <div
      id="__lenis-root"
      style={{ width: '100%', minHeight: '100%', display: 'flex', flexDirection: 'column', overflowX: 'hidden' }}
    >
      {children}
    </div>
  );
}
