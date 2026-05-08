import PageIntro from './PageIntro';
import { fullTeamMembers } from '../data/siteData';

export default function TeamDetailPage() {
  return (
    <main className="subpage-shell relative overflow-hidden">
      <PageIntro label="FULL TEAM" title="完整團隊">
        一個營隊不是只有課表。真正讓四天三夜順利運作的，是課程、行政、活動、設計與現場支援一起把細節接起來。
      </PageIntro>
      <section className="section-unified-bg relative pb-28">
        <div className="subpage-body-glow pointer-events-none absolute inset-0" />
        <div className="section-shell grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {fullTeamMembers.map(([avatar, role, name, en, desc]) => (
            <article key={`${avatar}-${name}`} className="glass rounded-[18px] bg-night-deep/45 p-6">
              <div className="mb-5 flex h-24 w-24 items-center justify-center overflow-hidden rounded-full border border-paper/20">
                <img src={`/avatars/${avatar}`} alt={name} className="h-full w-full object-cover" />
              </div>
              <div className="mb-1 font-serifjp text-sm tracking-[0.25em] text-amber">{role}</div>
              <h2 className="font-serifjp text-2xl font-semibold tracking-wide sm:text-3xl sm:tracking-widest">{name}</h2>
              <div className="mt-1 font-mono text-[10px] tracking-[0.18em] text-paper/45">{en}</div>
              <p className="mt-5 border-l-2 border-sunset pl-4 text-sm leading-7 text-paper/68">{desc}</p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
