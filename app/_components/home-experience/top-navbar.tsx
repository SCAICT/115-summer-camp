"use client";

import { ArrowRight, Menu, X } from "lucide-react";
import { useState } from "react";
import type { AnimationPhase } from "./animation-phase";

type TopNavbarProps = {
  currentPhase: AnimationPhase;
};

const NAV_LINKS = [
  { label: "About", href: "#about-section" },
  { label: "Schedule", href: "#schedule-section" },
  { label: "Staff", href: "#staff-section" },
  { label: "AI Demo", href: "#ai-demo-section" },
  { label: "Sponsors", href: "#sponsors-section" },
  { label: "FAQ", href: "#faq-section" },
];

export function TopNavbar({ currentPhase }: TopNavbarProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const isVisible = currentPhase === "transitioning" || currentPhase === "ready";

  const close = () => setMenuOpen(false);

  return (
    <nav
      className={`camp-top-navbar ${isVisible ? "camp-top-navbar--visible" : ""}`}
      aria-label="主選單"
    >
      <div className="camp-top-navbar-inner">
        <span className="camp-navbar-spacer" aria-hidden="true" />
        <span className="camp-navbar-divider" aria-hidden="true" />

        <div className="camp-navbar-links" role="list">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="camp-top-navbar-link"
              role="listitem"
            >
              {link.label}
            </a>
          ))}
        </div>

        <span className="camp-navbar-divider" aria-hidden="true" />

        <a href="#hero-section" className="camp-top-navbar-cta">
          立即報名
          <ArrowRight size={11} strokeWidth={2.2} aria-hidden="true" />
        </a>
      </div>

      <div className="camp-top-navbar-mobile-bar">
        <span style={{ flex: "0 0 var(--navbar-left-reserved, 160px)" }} aria-hidden="true" />

        <a href="#hero-section" className="camp-top-navbar-mobile-title" onClick={close}>
          SCAICT 115 暑訓
        </a>

        <button
          className={`camp-top-navbar-toggle ${menuOpen ? "is-open" : ""}`}
          aria-label={menuOpen ? "關閉選單" : "開啟選單"}
          aria-expanded={menuOpen}
          aria-haspopup="true"
          onClick={() => setMenuOpen((v) => !v)}
        >
          {menuOpen ? (
            <X size={16} strokeWidth={2} aria-hidden="true" />
          ) : (
            <Menu size={16} strokeWidth={2} aria-hidden="true" />
          )}
        </button>
      </div>

      <div
        className={`camp-top-navbar-mobile-menu ${menuOpen ? "camp-top-navbar-mobile-menu--open" : ""}`}
        role="menu"
        aria-hidden={!menuOpen}
      >
        {NAV_LINKS.map((link) => (
          <a
            key={link.href}
            href={link.href}
            className="camp-top-navbar-mobile-link"
            role="menuitem"
            onClick={close}
          >
            {link.label}
          </a>
        ))}
        <a
          href="#hero-section"
          className="camp-top-navbar-mobile-cta"
          role="menuitem"
          onClick={close}
        >
          立即報名
        </a>
      </div>
    </nav>
  );
}
