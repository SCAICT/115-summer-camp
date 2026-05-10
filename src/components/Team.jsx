import SectionLabel from './SectionLabel';
import { homeMembers } from '../data/siteData';

export default function Team() {
  return (
    <section id="團隊" className="section-unified-bg  py-28 sm:py-40">
      <div className="section-shell">
        <SectionLabel no="07" en="TEAM · STAFF" zh="工 作 人 員" colorClass="text-mist-pink" />
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
        <div className="grid gap-5 lg:grid-cols-[1.5fr_1fr_1fr]">
          {homeMembers.map(([avatar, role, name, realName, en, word], index) => (
            <article key={avatar} className={`glass rounded-[22px] p-6 ${index === 0 ? 'lg:p-8' : ''}`}>
              <div className={`${index === 0 ? 'sm:flex sm:items-start sm:gap-6' : ''}`}>
                <div className={`${index === 0 ? 'h-36 w-36' : 'h-24 w-24'} mb-5 shrink-0 overflow-hidden rounded-full border-2 border-paper/20`}>
                  <img
                    src={`/avatars/${avatar}`}
                    alt={name}
                    width={index === 0 ? 144 : 96}
                    height={index === 0 ? 144 : 96}
                    loading="lazy"
                    decoding="async"
                    fetchPriority="low"
                    className="h-full w-full object-cover"
                  />
                </div>
                <div>
                  <div className="mb-1.5 font-mono text-[10px] tracking-[0.25em] text-sunset">// {index === 0 ? 'summer.lead()' : 'team.member()'}</div>
                  <div className="mb-1 font-serifjp text-sm tracking-[0.25em] text-amber">{role}</div>
                  <h3 className={`${index === 0 ? 'text-4xl' : 'text-3xl'} font-serifjp font-semibold tracking-widest whitespace-nowrap`}>{name}</h3>
                  {realName && <div className="mt-2 text-xl font-serifjp tracking-wider text-paper/80">{realName}</div>}
                  <div className="mt-1 text-[11px] tracking-wider text-paper/55">{en}</div>
                </div>
              </div>
              <p className="mt-6 border-l-2 border-sunset pl-4 font-serifjp text-[15px] leading-8 tracking-wide text-paper/80">「{word}」</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
