"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const DETAIL_LINKS = [
  { label: "課程議程", href: "/schedule" },
  { label: "課程講師", href: "/staff"    },
];

export function DetailNavbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const close = () => setMenuOpen(false);

  return (
    <nav className="camp-detail-navbar" aria-label="子頁面導覽">
      {/* ── Desktop ─────────────────────────────────── */}
      <div className="camp-detail-navbar-inner">
        {/* Logo → home */}
        <Link href="/" className="camp-detail-navbar-logo" aria-label="返回首頁">
          <Image
            src="/LOGO/SCAICT.svg"
            alt="SCAICT"
            width={88}
            height={25}
            priority
          />
        </Link>

        <span className="camp-navbar-divider" aria-hidden="true" />

        {/* Nav links */}
        <div className="camp-detail-navbar-links">
          {DETAIL_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`camp-detail-navbar-link ${
                pathname === link.href ? "camp-detail-navbar-link--active" : ""
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <span className="camp-navbar-divider" aria-hidden="true" />

        {/* Back to home CTA */}
        <Link href="/" className="camp-detail-navbar-back">
          ← 返回首頁
        </Link>
      </div>

      {/* ── Mobile bar ──────────────────────────────── */}
      <div className="camp-top-navbar-mobile-bar">
        <Link href="/" className="camp-detail-navbar-logo" aria-label="返回首頁" onClick={close}>
          <Image src="/LOGO/SCAICT.svg" alt="SCAICT" width={72} height={20} />
        </Link>

        <button
          className={`camp-top-navbar-toggle ${menuOpen ? "is-open" : ""}`}
          aria-label={menuOpen ? "關閉選單" : "開啟選單"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((v) => !v)}
        >
          {menuOpen
            ? <X size={16} strokeWidth={2} aria-hidden="true" />
            : <Menu size={16} strokeWidth={2} aria-hidden="true" />
          }
        </button>
      </div>

      {/* ── Mobile dropdown ─────────────────────────── */}
      <div
        className={`camp-top-navbar-mobile-menu ${menuOpen ? "camp-top-navbar-mobile-menu--open" : ""}`}
        role="menu"
        aria-hidden={!menuOpen}
      >
        {DETAIL_LINKS.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="camp-top-navbar-mobile-link"
            role="menuitem"
            onClick={close}
          >
            {link.label}
          </Link>
        ))}
        <Link href="/" className="camp-top-navbar-mobile-cta" role="menuitem" onClick={close}>
          ← 返回首頁
        </Link>
      </div>
    </nav>
  );
}
