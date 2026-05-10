import { useEffect, useState } from 'react';
import { navItems } from '../data/siteData';

export default function TopNav() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeHash, setActiveHash] = useState(() => (typeof window === 'undefined' ? '#/' : window.location.hash || '#/'));
  const [logoPulse, setLogoPulse] = useState(false);

  const normalizeHash = (hash) => {
    try {
      return decodeURIComponent(hash || '#/');
    } catch {
      return hash || '#/';
    }
  };

  const isHashActive = (hash) => normalizeHash(activeHash) === normalizeHash(hash);
  const getItemHash = (item) => {
    if (item === '照片') return '#/home/成果';
    return `#/home/${item}`;
  };

  const handleLogoClick = () => {
    setLogoPulse(true);
    setMenuOpen(false);
  };

  useEffect(() => {
    if (!menuOpen) return;

    const previousOverflow = document.body.style.overflow;
    const handleKeydown = (event) => {
      if (event.key === 'Escape') setMenuOpen(false);
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeydown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeydown);
    };
  }, [menuOpen]);

  useEffect(() => {
    if (!logoPulse) return;

    const timer = window.setTimeout(() => setLogoPulse(false), 420);
    return () => window.clearTimeout(timer);
  }, [logoPulse]);

  useEffect(() => {
    const handleHashChange = () => {
      setActiveHash(typeof window === 'undefined' ? '#/' : window.location.hash || '#/');
      setMenuOpen(false);
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  return (
    <>
      <div
        className="fixed left-1/2 top-4 z-50 flex -translate-x-1/2 gap-3 transition-all duration-300 sm:gap-0"
      >
        <nav className="mobile-compact-nav flex items-center gap-3.5 whitespace-nowrap rounded-full border border-paper/15 bg-ink/60 px-4 py-3 font-sansjp text-xs tracking-[0.09em] text-paper/90 shadow-2xl backdrop-blur-xl transition-all duration-300 sm:top-6 sm:gap-6 sm:px-7 sm:py-3.5 sm:text-[15px] sm:tracking-[0.12em]">
          <a
            href="#/"
            onClick={handleLogoClick}
            className={` shrink rounded-full transition-transform duration-300 ${logoPulse ? 'scale-95' : 'hover:scale-[1.03]'}`}
          >
            <img
              src="/LOGO/white_logo_nobg.webp"
              alt="SCAICT"
              width="125"
              height="35"
              loading="eager"
              decoding="async"
              fetchPriority="high"
              className="h-6 w-auto max-w-[100px] transition-all duration-300 sm:h-7 sm:max-w-none"
            />
          </a>
          <span className="hidden h-3.5 w-px bg-paper/20 sm:block" />
          <div className="hidden gap-5 sm:flex">
            {navItems.map((item) => {
              const itemHash = getItemHash(item);
              const active = isHashActive(itemHash);

              return (
                <a key={item} href={itemHash} className={`transition ${active ? 'text-amber' : 'hover:text-amber'}`}>
                  {item}
                </a>
              );
            })}
          </div>
          <a href="#/home/報名" className="hidden rounded-full bg-sunset px-3.5 py-2 font-semibold text-ink transition hover:bg-amber sm:block sm:px-4">
            現在報名
          </a>
        </nav>

        <button
          onClick={() => setMenuOpen((open) => !open)}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu-drawer"
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          className={`sm:hidden flex h-12 w-12 items-center justify-center rounded-full border border-paper/15 shadow-2xl backdrop-blur-xl transition-all duration-300 ${menuOpen ? 'border-sunset/40 bg-sunset/20' : 'bg-ink/60 hover:bg-ink/80'}`}
        >
          <div className="flex flex-col gap-1.5">
            <span className={`block h-0.5 w-5 bg-paper/90 transition-all duration-300 ${menuOpen ? 'translate-y-2 rotate-45' : ''}`} />
            <span className={`block h-0.5 w-5 bg-paper/90 transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
            <span className={`block h-0.5 w-5 bg-paper/90 transition-all duration-300 ${menuOpen ? '-translate-y-2 -rotate-45' : ''}`} />
          </div>
        </button>
      </div>

      <div className={`fixed inset-0 z-40 sm:hidden ${menuOpen ? 'pointer-events-auto' : 'pointer-events-none'}`}>
        <button
          type="button"
          aria-label="Close menu overlay"
          onClick={() => setMenuOpen(false)}
          className={`absolute inset-0 bg-ink/70 backdrop-blur-[2px] transition-opacity duration-300 ${menuOpen ? 'opacity-100' : 'opacity-0'}`}
        />

        <aside
          id="mobile-menu-drawer"
          className={`absolute right-0 top-0 flex h-full w-[min(86vw,320px)] flex-col border-l border-paper/15 bg-[linear-gradient(165deg,rgba(20,25,45,0.97),rgba(10,14,30,0.95))] px-5 pb-8 pt-24 shadow-[0_20px_45px_rgba(0,0,0,0.45)] backdrop-blur-xl transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${menuOpen ? 'translate-x-0' : 'translate-x-full'}`}
        >
          <div className="pointer-events-none absolute -left-14 top-28 h-32 w-32 rounded-full bg-sunset/20 blur-2xl" />
          <div className="pointer-events-none absolute bottom-20 right-6 h-28 w-28 rounded-full bg-mist-pink/20 blur-2xl" />

          <div className=" flex flex-col gap-2">
            {navItems.map((item, index) => {
              const itemHash = getItemHash(item);
              const active = isHashActive(itemHash);

              return (
                <a
                  key={item}
                  href={itemHash}
                  className={`group flex items-center justify-between rounded-xl border px-4 py-3 font-sansjp text-sm tracking-[0.08em] transition-all duration-500 ${active ? 'border-paper/20 bg-paper/10 text-amber' : 'border-paper/0 text-paper/90 hover:border-paper/10 hover:bg-paper/10 hover:text-amber'} ${menuOpen ? 'translate-x-0 opacity-100' : 'translate-x-4 opacity-0'}`}
                  style={{ transitionDelay: menuOpen ? `${90 + index * 50}ms` : '0ms' }}
                  onClick={() => setMenuOpen(false)}
                >
                  <span>{item}</span>
                  <span className={`h-px bg-amber transition-all duration-300 ${active ? 'w-7' : 'w-0 group-hover:w-7'}`} />
                </a>
              );
            })}
          </div>

          <div className={`mt-6 h-px bg-gradient-to-r from-transparent via-paper/20 to-transparent transition-opacity duration-500 ${menuOpen ? 'opacity-100' : 'opacity-0'}`} />

          <a
            href="#/home/報名"
            className={`mt-6 rounded-xl bg-sunset px-4 py-3 text-center text-sm font-semibold tracking-[0.08em] text-ink shadow-sunset transition-all duration-500 hover:bg-amber ${menuOpen ? 'translate-x-0 opacity-100' : 'translate-x-4 opacity-0'}`}
            style={{ transitionDelay: menuOpen ? `${120 + navItems.length * 50}ms` : '0ms' }}
            onClick={() => setMenuOpen(false)}
          >
            現在報名
          </a>

          <div className={`mt-auto pt-10 text-center font-mono text-[10px] tracking-[0.24em] text-paper/40 transition-opacity duration-500 ${menuOpen ? 'opacity-100' : 'opacity-0'}`}>
            SCAICT 2026 SUMMER
          </div>
        </aside>
      </div>
    </>
  );
}
