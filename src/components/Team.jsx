import SectionLabel from './SectionLabel';
import StarDust from './StarDust';
import { homeMembers } from '../data/siteData';

export default function Team() {
  return (
    <section id="團隊" className="relative py-28 sm:py-40">
      <StarDust />
      <div className="section-shell">
        <SectionLabel no="05" en="TEAM · CORE" zh="總 召 組" colorClass="text-mist-pink" />
        <div className="mb-14 flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
          <h2 className="fluid-section-title font-serifjp font-medium leading-snug tracking-[0.06em] sm:tracking-[0.08em]">
            把這個夏天，
            <br />
            <span className="text-mist-pink">交給三個人。</span>
          </h2>
          <a href="#/team" className="w-fit rounded-full border border-amber/40 px-5 py-2.5 font-mono text-[11px] tracking-[0.2em] text-amber">
            view full team →
          </a>
        </div>
        <div className="grid gap-5 lg:grid-cols-[1.5fr_1fr_1fr]">
          {homeMembers.map(([tag, role, name, en, word], index) => (
            <article key={tag} className={`glass rounded-[22px] p-6 ${index === 0 ? 'lg:p-8' : ''}`}>
              <div className={`${index === 0 ? 'sm:flex sm:items-start sm:gap-6' : ''}`}>
                <div className={`${index === 0 ? 'h-36 w-36' : 'h-24 w-24'} mb-5 shrink-0 overflow-hidden rounded-full border-2 border-paper/20 bg-[radial-gradient(circle_at_60%_40%,#f4a261_0%,#e8624c_50%,#b8472f_80%,#2a1f3e_100%)]`}>
                  <div className="flex h-full items-end justify-center bg-[repeating-linear-gradient(180deg,transparent_0,transparent_18px,rgba(13,20,40,0.5)_18px,rgba(13,20,40,0.5)_20px)] pb-2 font-mono text-[9px] tracking-[0.2em]">
                    {tag}
                  </div>
                </div>
                <div>
                  <div className="mb-1.5 font-mono text-[10px] tracking-[0.25em] text-sunset">// {index === 0 ? 'summer.lead()' : 'team.member()'}</div>
                  <div className="mb-1 font-serifjp text-sm tracking-[0.25em] text-amber">{role}</div>
                  <h3 className={`${index === 0 ? 'text-4xl' : 'text-3xl'} font-serifjp font-semibold tracking-widest`}>{name}</h3>
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
