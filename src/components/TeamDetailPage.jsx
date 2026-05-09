import PageIntro from './PageIntro';
import { fullTeamMembers } from '../data/siteData';

export default function TeamDetailPage() {
  // Group members by their role (組別)
  const groupedMembers = fullTeamMembers.reduce((acc, member) => {
    const [, role] = member;
    if (!acc[role]) {
      acc[role] = [];
    }
    acc[role].push(member);
    return acc;
  }, {});

  // Define group order and display names
  const groupOrder = ['總召組', '行政組', '課程組', '活動組', '紀錄組', '資訊組', '設計組'];

  return (
    <main className="subpage-shell  overflow-hidden">
      <PageIntro label="FULL TEAM" title="完整團隊">
        一個營隊不是只有課表。真正讓四天三夜順利運作的，是課程、行政、活動、設計與現場支援一起把細節接起來。
      </PageIntro>
      {groupOrder.map((groupName) => {
        const members = groupedMembers[groupName];
        if (!members) return null;

        return (
          <section key={groupName} className=" pb-28">
            <div className="section-shell ">
              <h2 className="mb-10 font-serifjp text-3xl font-semibold tracking-wider text-amber">{groupName}</h2>

              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {members.map(([avatar, role, name, en, desc]) => (
                  <article key={`${avatar}-${name}`} className="glass rounded-[18px] bg-night-deep/45 p-6">
                    <div className="mb-5 flex h-24 w-24 items-center justify-center overflow-hidden rounded-full border border-paper/20">
                      <img src={`/avatars/${avatar}`} alt={name} className="h-full w-full object-cover" />
                    </div>
                    <div className="mb-1 font-serifjp text-sm tracking-[0.25em] text-amber">{role}</div>
                    <h3 className="font-serifjp text-2xl font-semibold tracking-wide sm:text-3xl sm:tracking-widest">{name}</h3>
                    <div className="mt-1 font-mono text-[10px] tracking-[0.18em] text-paper/45">{en}</div>
                    <p className="mt-5 border-l-2 border-sunset pl-4 text-xs leading-7 text-paper/68">{desc}</p>
                  </article>
                ))}
              </div>
            </div>
          </section>
        );
      })}
    </main>
  );
}
