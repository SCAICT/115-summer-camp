import SectionLabel from './SectionLabel';
import { homeMembers } from '../data/siteData';

const assetPath = (path) => `${import.meta.env.BASE_URL}${path.replace(/^\/+/, '')}`;

export default function Team() {
  return (
    <section id="團隊" className="section-unified-bg py-14 sm:py-40">
      <div className="section-shell">
        <SectionLabel no="05" en="TEAM · STAFF" zh="工 作 人 員" colorClass="text-mist-pink" />
        <div className="mb-14 flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
          <h2 className="fluid-section-title font-serifjp font-medium leading-snug tracking-[0.06em] sm:tracking-[0.08em]">
            把這個夏天，
            <br />
            <span className="text-mist-pink">交給他們。</span>
          </h2>
          <a href="#/team" className="group relative w-fit overflow-hidden rounded-full border border-mist-pink/60 bg-gradient-to-r from-mist-pink/15 to-mist-pink/5 px-6 py-3 font-mono text-[11px] font-semibold tracking-[0.2em] text-mist-pink transition-all duration-300 hover:border-mist-pink/80 hover:bg-mist-pink/20 hover:shadow-lg hover:shadow-mist-pink/30 active:scale-95">
            <span className="relative inline-flex items-center gap-2">
              查看全部成員
              <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">→</span>
            </span>
          </a>
        </div>
        <div className="grid grid-cols-2 gap-5 lg:grid-cols-[1.5fr_1fr_1fr]">
          {homeMembers.map(([avatar, role, name, realName, en, word], index) => (
            <article key={avatar} className={`glass rounded-[22px] p-4 sm:p-5 ${index === 0 ? 'col-span-2 lg:col-span-1 lg:p-6' : 'hidden sm:block'}`}>
              <div className={`${index === 0 ? 'sm:flex sm:items-start sm:gap-5' : ''}`}>
                <div className={`${index === 0 ? 'h-24 w-24' : 'h-16 w-16'} mb-4 shrink-0 overflow-hidden rounded-full border-2 border-paper/20`}>
                  <img
                    src={assetPath(`/avatars/${avatar}`)}
                    alt={name}
                    width={index === 0 ? 96 : 64}
                    height={index === 0 ? 96 : 64}
                    loading="lazy"
                    decoding="async"
                    fetchPriority="low"
                    className="h-full w-full object-cover"
                  />
                </div>
                <div>
                  <div className="mb-1 font-mono text-[10px] tracking-[0.25em] text-sunset">// {index === 0 ? 'summer.lead()' : 'team.member()'}</div>
                  <div className="mb-0.5 font-serifjp text-xs tracking-[0.22em] text-amber">{role}</div>
                  <h3 className={`${index === 0 ? 'text-3xl' : 'text-xl'} font-serifjp font-semibold tracking-widest whitespace-nowrap`}>{name}</h3>
                  {realName && <div className="mt-1 text-base font-serifjp tracking-wider text-paper/80">{realName}</div>}
                  <div className="mt-0.5 text-[10px] tracking-wider text-paper/55">{en}</div>
                </div>
              </div>
              <p className="mt-4 border-l-2 border-sunset pl-3 font-serifjp text-[13px] leading-7 tracking-wide text-paper/80">「{word}」</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
