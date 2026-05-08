import { useEffect, useMemo, useState } from 'react';
import SectionLabel from './SectionLabel';
import { footerOrganizations } from '../data/siteData';

function LogoButton({ groupTitle, unit, onOpen }) {
  return (
    <button
      type="button"
      onClick={() => onOpen(groupTitle, unit)}
      aria-label={`${groupTitle} ${unit.fullName}`}
      className="group relative flex aspect-[4/3] w-full items-center justify-center overflow-hidden rounded-2xl border border-paper/12 bg-paper/[0.04] p-4 transition-all duration-300 hover:-translate-y-1 hover:border-amber/50 hover:bg-paper/[0.1]"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_20%,rgba(244,162,97,0.15),transparent_54%),radial-gradient(circle_at_80%_82%,rgba(217,122,154,0.14),transparent_56%)] opacity-45 transition-opacity duration-300 group-hover:opacity-90" />
      {unit.logo ? (
        <img
          src={unit.logo}
          alt={unit.fullName}
          loading="lazy"
          className="relative z-10 max-h-16 w-auto object-contain sm:max-h-20"
        />
      ) : (
        <div className="relative z-10 rounded-xl border border-paper/15 bg-night-deep/55 px-4 py-3 font-mono text-sm tracking-[0.16em] text-paper/80 sm:text-base">
          {unit.shortName}
        </div>
      )}
      <span className="absolute bottom-3 left-3 rounded-full border border-paper/15 bg-ink/55 px-2.5 py-1 font-mono text-[10px] tracking-[0.16em] text-paper/70">
        {unit.shortName}
      </span>
    </button>
  );
}

function SponsorDialog({ selected, onClose }) {
  useEffect(() => {
    if (!selected) return undefined;

    const handleKeydown = (event) => {
      if (event.key === 'Escape') onClose();
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeydown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeydown);
    };
  }, [selected, onClose]);

  if (!selected) return null;

  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 sm:p-8">
      <button
        type="button"
        aria-label="關閉視窗"
        onClick={onClose}
        className="absolute inset-0 bg-ink/80 backdrop-blur-[2px]"
      />
      <article
        role="dialog"
        aria-modal="true"
        aria-label={`${selected.type} ${selected.unit.fullName}`}
        className="relative w-full max-w-2xl overflow-hidden rounded-3xl border border-paper/15 bg-[linear-gradient(165deg,rgba(20,25,45,0.96),rgba(10,14,30,0.96))] p-6 shadow-2xl sm:p-8"
      >
        <div className="pointer-events-none absolute -right-16 -top-16 h-52 w-52 rounded-full bg-sunset/25 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-20 -left-12 h-52 w-52 rounded-full bg-mist-pink/25 blur-3xl" />

        <div className="relative mb-5 flex items-start justify-between gap-4">
          <span className="inline-flex rounded-full border border-amber/45 bg-amber/10 px-3 py-1 font-mono text-[10px] tracking-[0.2em] text-amber">
            {selected.type}
          </span>
          <button
            type="button"
            onClick={onClose}
            aria-label="關閉"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-paper/20 bg-paper/[0.05] text-paper/70 transition hover:border-paper/35 hover:text-paper"
          >
            ×
          </button>
        </div>

        <div className="relative mb-6 flex min-h-28 items-center justify-center rounded-2xl border border-paper/12 bg-paper/[0.04] p-5">
          {selected.unit.logo ? (
            <img src={selected.unit.logo} alt={selected.unit.fullName} className="max-h-20 w-auto object-contain" />
          ) : (
            <div className="rounded-xl border border-paper/15 bg-night-deep/55 px-5 py-3 font-mono tracking-[0.18em] text-paper/85">
              {selected.unit.shortName}
            </div>
          )}
        </div>

        <h3 className="relative font-serifjp text-2xl leading-snug tracking-[0.08em] text-paper sm:text-3xl">
          {selected.unit.fullName}
        </h3>
        <p className="relative mt-4 text-sm leading-8 text-paper/75 sm:text-[15px]">
          {selected.unit.desc || '更多合作介紹即將公開，敬請期待。'}
        </p>

        {selected.unit.href && (
          <a
            href={selected.unit.href}
            target="_blank"
            rel="noopener noreferrer"
            className="relative mt-6 inline-flex items-center gap-2 rounded-full border border-amber/55 bg-amber/10 px-5 py-2.5 font-mono text-[11px] tracking-[0.2em] text-amber transition hover:bg-amber/18"
          >
            前往官網
            <span>→</span>
          </a>
        )}
      </article>
    </div>
  );
}

export default function Organizations() {
  const [selected, setSelected] = useState(null);

  const groups = useMemo(() => footerOrganizations, []);

  const openDialog = (type, unit) => {
    setSelected({ type, unit });
  };

  const closeDialog = () => setSelected(null);

  return (
    <>
      <section id="主協辦" className="section-unified-bg relative py-28 sm:py-40">
        <div className="absolute -top-32 right-[8%] h-[360px] w-[460px] bg-[radial-gradient(ellipse,rgba(244,162,97,0.14),transparent_72%)] blur-[80px]" />
        <div className="absolute -bottom-40 left-[10%] h-[320px] w-[460px] bg-[radial-gradient(ellipse,rgba(217,122,154,0.16),transparent_70%)] blur-[90px]" />

        <div className="section-shell">
          <SectionLabel no="07" en="ORGANIZERS & SUPPORTERS" zh="主 辦 ・ 協 辦" colorClass="text-solar" />

          <div className="mb-14 max-w-3xl space-y-4">
            <h2 className="fluid-section-title font-serifjp font-medium leading-snug tracking-[0.06em] sm:tracking-[0.08em]">
              與夥伴一起，
              <br />
              成就這場夏日營隊。
            </h2>
            <p className="text-[15px] leading-8 text-paper/65">
              參考 sponsor 區塊的資訊呈現方式，保留目前站點的配色、字體與玻璃感；點擊單位即可查看詳細介紹。
            </p>
          </div>

          <div className="top-tier-grid grid gap-6 lg:grid-cols-2">
            {groups.map((group, index) => (
              <article key={group.title} className="glass rounded-3xl p-6 sm:p-7">
                <div className="mb-5 flex items-center justify-between">
                  <h3 className="font-serifjp text-2xl tracking-[0.1em] text-paper">{group.title}</h3>
                  <span className="font-mono text-[10px] tracking-[0.24em] text-paper/50">
                    // {String(index + 1).padStart(2, '0')}
                  </span>
                </div>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  {group.units.map((unit) => (
                    <LogoButton key={unit.shortName} groupTitle={group.title} unit={unit} onOpen={openDialog} />
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <SponsorDialog selected={selected} onClose={closeDialog} />
    </>
  );
}
