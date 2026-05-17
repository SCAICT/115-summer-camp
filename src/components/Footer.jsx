import { footerMenus } from '../data/siteData';

const socialLinks = [
  {
    label: 'Email',
    href: 'mailto:contact@scaict.org',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
        <rect x="2" y="4" width="20" height="16" rx="2" ry="2" />
        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
      </svg>
    ),
  },
  {
    label: 'Instagram',
    href: 'https://www.instagram.com/scaict.tw/',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <circle cx="12" cy="12" r="3.5" />
        <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    label: 'GitHub',
    href: 'https://github.com/scaict',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
        <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
      </svg>
    ),
  },
];

export default function Footer() {
  const allLinks = footerMenus.flatMap(([, links]) => links);

  return (
    <footer id="頁尾" className="section-unified-bg relative w-full overflow-hidden border-t border-paper/10 pb-8 pt-16 sm:pt-20">
      <div className="pointer-events-none absolute -bottom-40 left-1/2 h-[480px] w-[480px] -translate-x-1/2 rounded-full bg-sunset/20 blur-[100px]" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-paper/20 to-transparent" />

      <div className="section-shell">
        <div className="mb-12 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="mb-2 font-serifjp text-3xl font-semibold tracking-[0.12em] sm:text-4xl">
              資<span className="text-sunset">暑</span>與你
            </div>
            <div className="mb-3 font-mono text-[10.5px] tracking-[0.22em] text-paper/45">
              SCAICT × NCHU · SUMMER CAMP 2026
            </div>
            <p className="text-sm leading-7 text-paper/55">夏夜，星光，與你的第一個 Bot。</p>
          </div>
          <a
            href="https://scaict.kktix.cc/events/sc2026"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex shrink-0 items-center gap-2.5 rounded-full bg-sunset px-7 py-3.5 font-sansjp text-sm font-semibold tracking-[0.08em] text-ink shadow-sunset transition hover:bg-amber"
          >
            現在報名
            <span aria-hidden="true">→</span>
          </a>
        </div>

        <div className="mb-8 h-px bg-gradient-to-r from-paper/20 via-paper/10 to-transparent" />

        <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <nav className="flex flex-wrap gap-x-6 gap-y-2.5">
            {allLinks.map(([label, href]) => (
              <a key={label} href={href} className="font-sansjp text-sm tracking-wide text-paper/60 transition hover:text-amber">
                {label}
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-2.5">
            {socialLinks.map(({ label, href, icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="flex h-8 w-8 items-center justify-center rounded-full border border-paper/15 text-paper/50 transition hover:border-amber/40 hover:text-amber"
              >
                {icon}
              </a>
            ))}
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-2 border-t border-paper/10 pt-5 font-mono text-[10.5px] tracking-wider text-paper/35 sm:flex-row sm:justify-between">
          <span>© 2026 SCAICT 中部高中電資社團聯合會議</span>
          <span>{'> '}built with love &amp; sunsets</span>
        </div>
      </div>
    </footer>
  );
}
