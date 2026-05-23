import { createPortal } from 'react-dom';
import { useEffect, useMemo, useRef, useState } from 'react';
import SectionLabel from './SectionLabel';
import { footerOrganizations } from '../data/siteData';

const hasUnitDetails = (unit) => Boolean(unit && (unit.desc || unit.href));

function LogoCard({ groupTitle, unit, onOpen }) {
  const isScintLogo = unit.logo?.includes('/img/LOGO/scint.webp');
  const commonClassName =
    'group relative flex w-full flex-col items-center justify-center overflow-hidden rounded-2xl bg-[linear-gradient(135deg,rgba(245,232,212,0.028),rgba(245,232,212,0.008))] px-4 py-5 text-center transition-all duration-300 hover:shadow-[0_10px_24px_rgba(0,0,0,0.16)]';

  const content = (
    <>
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(120%_65%_at_50%_0%,rgba(245,232,212,0.12),transparent_62%),radial-gradient(90%_90%_at_90%_88%,rgba(232,98,76,0.12),transparent_64%),linear-gradient(160deg,rgba(255,255,255,0.03),rgba(255,255,255,0))] opacity-55 transition-opacity duration-300 group-hover:opacity-80" />
      <div className="relative z-10 mb-3 flex min-h-[82px] w-full items-center justify-center px-3 py-2 sm:min-h-[98px]">
        {unit.logo ? (
          <div
            className={
              unit.logoBg
                ? 'flex items-center justify-center rounded-lg bg-[linear-gradient(135deg,rgba(255,255,255,0.96),rgba(241,245,255,0.94))] px-3 py-2 shadow-[0_2px_14px_rgba(0,0,0,0.18)]'
                : 'flex items-center justify-center'
            }
          >
            <img
              src={unit.logo}
              alt={unit.fullName}
              width="256"
              height="256"
              loading="lazy"
              decoding="async"
              fetchPriority="low"
              className={
                unit.logoBg
                  ? 'max-h-8 w-auto object-contain sm:max-h-10'
                  : isScintLogo
                    ? 'max-h-10 w-auto object-contain sm:max-h-15'
                    : 'max-h-12 w-auto object-contain sm:max-h-16'
              }
            />
          </div>
        ) : (
          <span className="font-mono text-sm tracking-[0.12em] text-paper/80">{unit.shortName}</span>
        )}
      </div>

      <h4 className="relative z-10 font-serifjp text-[15px] leading-snug tracking-[0.05em] text-paper sm:text-base">{unit.fullName}</h4>
    </>
  );

  return (
    <button
      type="button"
      onClick={() => onOpen(unit, groupTitle)}
      className={`${commonClassName} text-left transition-transform ${hasUnitDetails(unit) ? 'hover:-translate-y-0.5' : ''}`}
      style={hasUnitDetails(unit) ? { cursor: 'url("data:image/svg+xml;utf8,<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"%23f5e8d4\"><circle cx=\"12\" cy=\"12\" r=\"8\"></circle></svg>") 12 12, pointer' } : { cursor: 'auto' }}
      aria-label={`查看 ${groupTitle} ${unit.fullName} 詳細資訊`}
    >
      {content}
    </button>
  );
}

export default function Organizations() {
  const groups = useMemo(() => footerOrganizations, []);
  const [selectedUnit, setSelectedUnit] = useState(null);
  const [selectedGroup, setSelectedGroup] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showScrollHint, setShowScrollHint] = useState(false);
  const [scrollHintOpacity, setScrollHintOpacity] = useState(1);
  const modalRef = useRef(null);

  const openModal = (unit, groupTitle) => {
    setSelectedUnit(unit);
    setSelectedGroup(groupTitle);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    window.setTimeout(() => {
      setSelectedUnit(null);
    }, 260);
  };

  useEffect(() => {
    if (!selectedUnit) return;
    setIsModalOpen(true);

    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        closeModal();
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [selectedUnit]);

  useEffect(() => {
    if (!selectedUnit) return undefined;

    const isMobile = typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(max-width: 640px)').matches;
    if (isMobile) {
      const previousBodyOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';

      return () => {
        document.body.style.overflow = previousBodyOverflow;
      };
    }

    const root = document.documentElement;
    const lenis = typeof window !== 'undefined' ? window.__lenis : null;
    const lenisScroll = lenis && typeof lenis.scroll === 'number' ? lenis.scroll : undefined;
    const scrollY = lenisScroll !== undefined ? lenisScroll : window.scrollY || root.scrollTop || 0;

    const previousBodyOverflow = document.body.style.overflow;
    const previousBodyPaddingRight = document.body.style.paddingRight;
    const previousRootOverflow = root.style.overflow;
    const scrollBarWidth = window.innerWidth - document.documentElement.clientWidth;

    document.body.style.overflow = 'hidden';
    if (scrollBarWidth > 0) {
      document.body.style.paddingRight = `${scrollBarWidth}px`;
    }
    root.style.overflow = 'hidden';

    if (lenis && typeof lenis.stop === 'function') {
      lenis.stop();
    }

    return () => {
      document.body.style.overflow = previousBodyOverflow;
      document.body.style.paddingRight = previousBodyPaddingRight;
      root.style.overflow = previousRootOverflow;

      if (lenis && typeof lenis.start === 'function') {
        lenis.start();
      }

      if (lenis && typeof lenis.scrollTo === 'function') {
        lenis.scrollTo(scrollY, { immediate: true });
      } else {
        window.scrollTo(0, scrollY);
      }
    };
  }, [selectedUnit]);

  useEffect(() => {
    if (!selectedUnit) return;
    const modalEl = modalRef.current;
    if (!modalEl) return;

    const updateHint = () => {
      const overflow = modalEl.scrollHeight - modalEl.clientHeight;
      const canScroll = overflow > 64;
      const atTop = modalEl.scrollTop <= 2;
      setShowScrollHint(canScroll);
      setScrollHintOpacity(canScroll && atTop ? 1 : 0);
    };

    let rafOne = 0;
    let rafTwo = 0;
    rafOne = requestAnimationFrame(() => {
      updateHint();
      rafTwo = requestAnimationFrame(updateHint);
    });

    const onScroll = () => {
      const overflow = modalEl.scrollHeight - modalEl.clientHeight;
      if (overflow <= 64) {
        setShowScrollHint(false);
        setScrollHintOpacity(0);
        return;
      }

      const nextOpacity = Math.max(0, Math.min(1, 1 - modalEl.scrollTop / 120));
      setScrollHintOpacity(nextOpacity);
    };

    modalEl.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', updateHint);

    return () => {
      modalEl.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', updateHint);
      if (rafOne) cancelAnimationFrame(rafOne);
      if (rafTwo) cancelAnimationFrame(rafTwo);
    };
  }, [selectedUnit, isModalOpen]);

  return (
    <section id="主協辦" className="section-unified-bg relative py-14 sm:py-40">
      <div className="absolute -top-32 right-[8%] h-[360px] w-[460px] bg-[radial-gradient(ellipse,rgba(244,162,97,0.14),transparent_72%)] blur-[80px]" />
      <div className="absolute -bottom-40 left-[10%] h-[320px] w-[460px] bg-[radial-gradient(ellipse,rgba(217,122,154,0.16),transparent_70%)] blur-[90px]" />

      <div className="section-shell">
        <SectionLabel no="10" en="ORGANIZERS & SUPPORTERS" zh="主 辦 ・ 協 辦" colorClass="text-solar" />

        <div className="mb-8 max-w-3xl space-y-5 sm:mb-14">
          <span className="inline-flex rounded-full border border-paper/18 bg-paper/[0.03] px-3 py-1 font-mono text-[10px] tracking-[0.22em] text-paper/65">
            PARTNERS
          </span>
          <h2 className="fluid-section-title font-serifjp font-medium leading-snug tracking-[0.06em] sm:tracking-[0.08em]">
            把每一份支持，
            <br />
            都放進這個夏夜裡。
          </h2>
        </div>

        <div className="flex flex-col gap-5">
          {groups.map((group, index) => (
            <article key={group.title} className="glass relative overflow-hidden rounded-3xl p-5 sm:p-6">
              <div className="pointer-events-none absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-paper/[0.07] to-transparent" />
              <div className="pointer-events-none absolute -right-20 -top-24 h-56 w-56 rounded-full bg-sunset/15 blur-3xl" />

              <div className="relative mb-4 flex items-center gap-4">
                <div>
                  <p className="mb-1 font-mono text-[10px] tracking-[0.24em] text-paper/45">
                    // {String(index + 1).padStart(2, '0')}
                  </p>
                  <h3 className="font-serifjp text-xl tracking-[0.1em] text-paper sm:text-2xl">{group.title}</h3>
                </div>
                <div className="h-px flex-1 bg-paper/10" />
              </div>

              <div className={`relative grid gap-4 ${group.units.length <= 2 ? 'grid-cols-2' : 'grid-cols-2 sm:grid-cols-4'}`}>
                {group.units.map((unit) => (
                  <LogoCard key={unit.shortName} groupTitle={group.title} unit={unit} onOpen={openModal} />
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>

      {selectedUnit && typeof document !== 'undefined'
        ? createPortal(
            <div
              aria-modal="true"
              role="dialog"
              className="fixed inset-0 z-[120] flex items-center justify-center p-4"
              onClick={closeModal}
            >
              <div
                className={`absolute inset-0 bg-ink/80 backdrop-blur-[3px] transition-opacity duration-300 ${
                  isModalOpen ? 'opacity-100' : 'opacity-0'
                }`}
              />

              <div
                className={`relative z-10 w-full max-w-[760px] overflow-hidden rounded-[28px] border border-paper/20 bg-gradient-to-br from-ink to-night-deep shadow-[0_30px_80px_rgba(0,0,0,0.5)] transition-all duration-300 ${
                  isModalOpen ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
                }`}
                onClick={(event) => event.stopPropagation()}
              >
                <div
                  ref={modalRef}
                  className="modal-scroll max-h-[82vh] overflow-y-auto px-6 py-7 sm:px-9 sm:py-9"
                >
                  <div className="mb-7 flex items-start justify-between gap-6">
                    <div>
                      <div className="mb-3 inline-flex rounded-full border border-paper/20 bg-paper/[0.06] px-3 py-1 text-[11px] uppercase tracking-[0.22em] text-paper/65">
                        {selectedGroup}
                      </div>
                      <h3 className="font-serifjp text-3xl font-semibold leading-tight tracking-wide text-paper sm:text-4xl">
                        {selectedUnit.fullName}
                      </h3>
                      <div className="mt-4 flex flex-wrap items-center gap-2 text-sm text-paper/65">
                        <span>{selectedUnit.shortName}</span>
                        {selectedUnit.href ? <span className="text-paper/40">•</span> : null}
                        {selectedUnit.href ? <span>官方網站</span> : null}
                      </div>
                    </div>

                    <button
                      type="button"
                      aria-label="Close"
                      className="rounded-full border border-paper/20 p-2 text-paper/60 transition hover:text-paper"
                      onClick={closeModal}
                    >
                      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                        <path
                          fillRule="evenodd"
                          d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </button>
                  </div>

                  {selectedUnit.logo ? (
                    <div className="mb-7 flex items-center justify-center rounded-3xl bg-paper/[0.04] p-5">
                      <img
                        src={selectedUnit.logo}
                        alt={selectedUnit.fullName}
                        className="max-h-28 w-auto object-contain"
                      />
                    </div>
                  ) : null}

                  {selectedUnit.desc ? (
                    <div className="mb-7 border-t border-paper/15 pt-7">
                      <h4 className="mb-3 font-mono text-xs tracking-[0.2em] text-amber">DETAILS</h4>
                      <p className="leading-8 text-paper/80">{selectedUnit.desc}</p>
                    </div>
                  ) : null}

                  {selectedUnit.href ? (
                    <a
                      href={selectedUnit.href}
                      target="_blank"
                      rel="noreferrer"
                      className="mb-7 inline-flex items-center gap-2 rounded-full border border-sunset/45 bg-sunset/15 px-4 py-2 text-sm text-sunset transition hover:bg-sunset/25"
                    >
                      前往官方網站
                    </a>
                  ) : null}
                </div>

                {showScrollHint ? (
                  <div className="pointer-events-none absolute bottom-5 right-5" style={{ opacity: scrollHintOpacity }}>
                    <div className="rounded-full border border-paper/30 bg-ink/80 px-3 py-1.5 font-mono text-[10px] tracking-[0.16em] text-paper/70">
                      向下滑動看更多
                    </div>
                  </div>
                ) : null}
              </div>
            </div>,
            document.body,
          )
        : null}
    </section>
  );
}

