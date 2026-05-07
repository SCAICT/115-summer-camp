import { footerMenus } from '../data/siteData';

export default function Footer() {
  return (
    <footer id="報名" className="relative w-full overflow-hidden border-t border-paper/10 bg-[#070b16] pb-8 pt-20 sm:pt-24">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-paper/[0.035] to-transparent" />
      <div className="absolute -bottom-72 left-1/2 h-[600px] w-[600px] -translate-x-1/2 rounded-full bg-sunset/25 blur-[80px]" />
      <div className="section-shell">
        <div className="mb-9 grid gap-8 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1fr]">
          <div>
            <div className="mb-2 font-serifjp text-2xl font-semibold tracking-[0.1em] sm:text-3xl sm:tracking-[0.15em]">
              資<span className="text-sunset">暑</span>與你
            </div>
            <div className="mb-5 font-mono text-[11px] tracking-[0.2em] text-paper/50">SCAICT × NCHU · SUMMER 2026</div>
            <p className="max-w-xs text-sm leading-7 text-paper/60">夏夜，星光，與你的第一個 AI Agent。</p>
          </div>
          {footerMenus.map(([title, links]) => (
            <div key={title}>
              <div className="mb-4 font-mono text-[10px] tracking-[0.25em] text-amber">// {title}</div>
              <div className="flex flex-col gap-2.5">
                {links.map(([label, href]) => (
                  <a key={label} href={href} className="font-serifjp text-sm tracking-wide text-paper/75 transition hover:text-amber">
                    {label}
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className="flex flex-col justify-between gap-3 border-t border-paper/10 pt-5 font-mono text-[10.5px] tracking-wider text-paper/40 sm:flex-row">
          <span>© 2026 SCAICT 中部高中電資社團聯合會議</span>
          <span>{'> '}built with prompts &amp; sunsets</span>
        </div>
      </div>
    </footer>
  );
}
