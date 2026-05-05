import { navItems } from '../data/siteData';

export default function TopNav() {
  return (
    <nav className="mobile-compact-nav fixed left-1/2 top-4 z-50 flex -translate-x-1/2 items-center gap-3.5 whitespace-nowrap rounded-full border border-paper/15 bg-ink/60 px-4 py-3 font-sansjp text-xs tracking-[0.09em] text-paper/90 shadow-2xl backdrop-blur-xl sm:top-6 sm:gap-6 sm:px-7 sm:py-3.5 sm:text-[13px] sm:tracking-[0.12em]">
      <a href="#/" className="font-serifjp text-base font-bold tracking-widest text-sunset">
        SCAICT
      </a>
      <span className="hidden h-3.5 w-px bg-paper/20 sm:block" />
      <div className="hidden gap-5 sm:flex">
        {navItems.map((item) => (
          <a key={item} href={`#/home/${item}`} className="transition hover:text-amber">
            {item}
          </a>
        ))}
      </div>
      <a href="#/home/報名" className="rounded-full bg-sunset px-3.5 py-2 font-semibold text-ink transition hover:bg-amber sm:px-4">
        立即報名
      </a>
    </nav>
  );
}
