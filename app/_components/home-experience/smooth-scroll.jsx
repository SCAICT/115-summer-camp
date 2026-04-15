"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import Lenis from "@studio-freight/lenis";

const DISABLE_LENIS_PATHS = ["/gallery"];

export default function SmoothScroll({ children }) {
  const pathname = usePathname();
  const shouldDisableLenis = DISABLE_LENIS_PATHS.some((path) =>
    pathname?.startsWith(path)
  );

  useEffect(() => {
    if (shouldDisableLenis) {
      return;
    }

    const isTouchDevice =
      typeof navigator !== "undefined" &&
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      );

    if (isTouchDevice) {
      if (document.documentElement.style.scrollBehavior !== "smooth") {
        document.documentElement.style.scrollBehavior = "smooth";
      }
      return;
    }

    let lenisInstance;
    let rafId = 0;
    let isDestroyed = false;
    const previousScrollBehavior = document.documentElement.style.scrollBehavior;

    const initTimeout = window.setTimeout(() => {
      if (isDestroyed) {
        return;
      }

      const rootElement =
        document.getElementById("__lenis-root") || document.documentElement;
      document.documentElement.style.scrollBehavior = "auto";

      const isMac =
        typeof navigator !== "undefined" &&
        /Mac|iPhone|iPad/.test(navigator.platform);

      lenisInstance = new Lenis({
        el: rootElement,
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smooth: true,
        direction: "vertical",
        gestureDirection: "vertical",
        smoothTouch: true,
        touchMultiplier: isMac ? 1.1 : 1.6,
        lerp: 0.1,
      });

      try {
        window.__lenis = lenisInstance;
      } catch {
        // ignore if window is not writable
      }

      const raf = (time) => {
        lenisInstance?.raf(time);
        rafId = requestAnimationFrame(raf);
      };

      rafId = requestAnimationFrame(raf);
    }, 100);

    return () => {
      isDestroyed = true;
      window.clearTimeout(initTimeout);

      if (rafId) {
        cancelAnimationFrame(rafId);
      }

      try {
        lenisInstance?.destroy();
      } catch {
        // ignore destroy errors
      }

      document.documentElement.style.scrollBehavior = previousScrollBehavior || "";

      try {
        if (window.__lenis === lenisInstance) {
          delete window.__lenis;
        }
      } catch {
        // ignore delete errors
      }
    };
  }, [shouldDisableLenis]);

  return (
    <div
      id="__lenis-root"
      style={{
        width: "100%",
        minHeight: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {children}
    </div>
  );
}
