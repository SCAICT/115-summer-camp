"use client";

import { useEffect, useRef } from "react";

export function HeroSection() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    function update() {
      const threshold = Math.min(window.innerHeight * 0.65, 520);
      const raw = Math.min(Math.max(window.scrollY / threshold, 0), 1);
      // Smoothstep easing so the card "snaps" in satisfyingly
      const hp = raw * raw * (3 - 2 * raw);
      el!.style.setProperty("--hp", hp.toFixed(4));
    }

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update, { passive: true });
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <section
      id="hero-section"
      ref={ref}
      className="camp-hero"
      style={{ scrollMarginTop: "calc(var(--navbar-height) + 22px)" }}
    >
      {/* ── Main content area ──────────────────────────────── */}
      <div className="camp-hero-body">
        <p className="camp-section-overline">SCAICT · 2026 聯合暑訓</p>

        <h1 className="camp-hero-display">
          Docker&nbsp;×<br />
          AI&nbsp;API<br />
          <span className="camp-hero-display-dim">部署實戰</span>
        </h1>

        <p className="camp-hero-tagline">
          帶你從零打造可部署的 AI 服務 ──
          三天密集工作坊，從 Dockerfile 寫到雲端上線。
        </p>

        <div className="camp-hero-info-row">
          <span>日期 TBD</span>
          <span className="camp-hero-info-sep" aria-hidden="true" />
          <span>地點 TBD</span>
          <span className="camp-hero-info-sep" aria-hidden="true" />
          <span>3 天</span>
        </div>

        <div className="camp-hero-actions">
          <a href="#" className="camp-btn-primary">立即報名 →</a>
          <a href="#about-section" className="camp-btn-secondary">活動說明</a>
        </div>
      </div>

    </section>
  );
}
