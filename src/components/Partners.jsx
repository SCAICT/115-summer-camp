import SectionLabel from './SectionLabel';
import StarDust from './StarDust';
import { partnerClubs } from '../data/siteData';

export default function Partners() {
  const marqueeClubs = [...partnerClubs, ...partnerClubs];

  return (
    <section id="成果" className="relative overflow-hidden py-28 sm:py-40">
      <StarDust />
      <div className="absolute -top-40 left-[12%] h-[420px] w-[520px] bg-[radial-gradient(ellipse,rgba(244,162,97,0.12),transparent_70%)] blur-[80px]" />
      <div className="absolute -bottom-44 right-[8%] h-[380px] w-[500px] bg-[radial-gradient(ellipse,rgba(217,122,154,0.14),transparent_72%)] blur-[90px]" />

      <div className="section-shell">
        <SectionLabel no="06" en="PARTNER CLUBS" zh="合作社團" colorClass="text-amber" />

        <div className="mb-10 max-w-2xl">
          <h2 className="fluid-section-title font-serifjp font-medium leading-tight tracking-[0.06em] sm:tracking-[0.08em]">
            與社團一起
            <br />
            <span className="text-amber">共創暑訓體驗</span>
          </h2>
        </div>

        <div className="relative overflow-hidden rounded-2xl border border-paper/10 bg-night-deep/35">
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-14 bg-gradient-to-r from-[#0b1121] to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-14 bg-gradient-to-l from-[#0b1121] to-transparent" />

          <div className="partners-marquee flex w-max gap-4 py-5 pr-4">
            {marqueeClubs.map((club, index) => (
              <a
                key={`${club.name}-${index}`}
                href={club.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`前往 ${club.name}`}
                className="group relative flex h-36 w-36 shrink-0 flex-col overflow-hidden rounded-2xl border border-paper/15 bg-paper/[0.04] p-3 transition-all hover:-translate-y-1 hover:border-amber/45 hover:bg-paper/[0.09] lg:h-40 lg:w-40"
              >
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_35%_22%,rgba(244,162,97,0.24),transparent_56%),radial-gradient(circle_at_70%_88%,rgba(217,122,154,0.20),transparent_58%)] opacity-60 transition-opacity duration-300 group-hover:opacity-95" />
                <img
                  src={club.logo}
                  alt={club.name}
                  loading="lazy"
                  className="absolute inset-0 h-full w-full object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <div className="bg-gradient-to-t from-ink/95 via-ink/75 to-transparent pt-8 px-3 py-2">
                    <h4 className="font-serifjp text-base leading-6 tracking-wide text-paper">{club.name}</h4>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
