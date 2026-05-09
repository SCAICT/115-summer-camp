import { useMemo } from 'react';
import SectionLabel from './SectionLabel';
import { footerOrganizations } from '../data/siteData';

function LogoCard({ groupTitle, unit }) {
  const isScintLogo = unit.logo?.includes('/org-logos/scint.webp');
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
              loading="lazy"
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

  if (!unit.href) {
    return <div className={commonClassName}>{content}</div>;
  }

  return (
    <a
      href={unit.href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${groupTitle} ${unit.fullName} 官網`}
      className={commonClassName}
    >
      {content}
    </a>
  );
}

export default function Organizations() {
  const groups = useMemo(() => footerOrganizations, []);

  return (
    <section id="主協辦" className="section-unified-bg relative py-28 sm:py-40">
      <div className="absolute -top-32 right-[8%] h-[360px] w-[460px] bg-[radial-gradient(ellipse,rgba(244,162,97,0.14),transparent_72%)] blur-[80px]" />
      <div className="absolute -bottom-40 left-[10%] h-[320px] w-[460px] bg-[radial-gradient(ellipse,rgba(217,122,154,0.16),transparent_70%)] blur-[90px]" />

      <div className="section-shell">
        <SectionLabel no="07" en="ORGANIZERS & SUPPORTERS" zh="主 辦 ・ 協 辦" colorClass="text-solar" />

        <div className="mb-14 max-w-3xl space-y-5">
          <span className="inline-flex rounded-full border border-paper/18 bg-paper/[0.03] px-3 py-1 font-mono text-[10px] tracking-[0.22em] text-paper/65">
            PARTNERS
          </span>
          <h2 className="fluid-section-title font-serifjp font-medium leading-snug tracking-[0.06em] sm:tracking-[0.08em]">
            把每一份支持，
            <br />
            都放進這個夏夜裡。
          </h2>
        </div>

        <div className="top-tier-grid grid gap-5 lg:grid-cols-2">
          {groups.map((group, index) => (
            <article key={group.title} className="glass relative overflow-hidden rounded-3xl p-5 sm:p-6">
              <div className="pointer-events-none absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-paper/[0.07] to-transparent" />
              <div className="pointer-events-none absolute -right-20 -top-24 h-56 w-56 rounded-full bg-sunset/15 blur-3xl" />

              <div className="relative mb-5 flex items-start justify-between gap-4">
                <div>
                  <p className="mb-2 font-mono text-[10px] tracking-[0.24em] text-paper/45">
                    // {String(index + 1).padStart(2, '0')}
                  </p>
                  <h3 className="font-serifjp text-xl tracking-[0.1em] text-paper sm:text-2xl">{group.title}</h3>
                </div>
              </div>

              <div className="relative grid grid-cols-1 gap-4">
                {group.units.map((unit) => (
                  <LogoCard key={unit.shortName} groupTitle={group.title} unit={unit} />
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
