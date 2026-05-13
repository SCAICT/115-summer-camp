import { useEffect, useMemo, useState } from 'react';
import PageIntro from './PageIntro';

const groupOrder = ['總召組', '行政組', '課程組', '活動組', '紀錄組', '資訊組', '設計組', '隊輔組'];
const assetPath = (path) => `${import.meta.env.BASE_URL}${path.replace(/^\/+/, '')}`;

function TeamCardSkeleton() {
  return (
    <article className="glass animate-pulse rounded-[18px] bg-night-deep/45 p-6">
      <div className="mb-5 h-24 w-24 rounded-full bg-paper/10" />
      <div className="mb-2 h-4 w-20 rounded bg-paper/10" />
      <div className="mb-2 h-8 w-32 rounded bg-paper/10" />
      <div className="h-3 w-24 rounded bg-paper/10" />
      <div className="mt-5 h-16 w-full rounded bg-paper/10" />
    </article>
  );
}

export default function TeamDetailPage() {
  const [members, setMembers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    const loadMembers = async () => {
      try {
        const response = await fetch(assetPath('/team-members.json'), { cache: 'no-cache' });
        if (!response.ok) {
          throw new Error('Failed to load team members');
        }

        const data = await response.json();
        if (!cancelled) {
          setMembers(Array.isArray(data) ? data : []);
        }
      } catch {
        if (!cancelled) {
          setMembers([]);
        }
      } finally {
        if (!cancelled) {
          setIsLoading(false);
        }
      }
    };

    loadMembers();
    return () => {
      cancelled = true;
    };
  }, []);

  const groupedMembers = useMemo(() => {
    const groups = {};
    for (const member of members) {
      const role = member?.role;
      if (!role) continue;
      if (!groups[role]) {
        groups[role] = [];
      }
      groups[role].push(member);
    }
    return groups;
  }, [members]);

  return (
    <main className="subpage-shell  overflow-hidden">
      <PageIntro label="FULL TEAM" title="完整團隊">
        一個營隊不是只有課表。真正讓四天三夜順利運作的，是課程、行政、活動、設計與現場支援一起把細節接起來。
      </PageIntro>
      <section className="section-unified-bg pb-10">
        <div className="section-shell">
          <p className="font-mono text-[11px] tracking-[0.22em] text-paper/45">
            {isLoading ? '// LOADING TEAM MEMBERS' : `// ${members.length} MEMBERS`}
          </p>
        </div>
      </section>

      {isLoading ? (
        <section className="pb-28">
          <div className="section-shell">
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: 6 }, (_, index) => (
                <TeamCardSkeleton key={`skeleton-${index}`} />
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {groupOrder.map((groupName) => {
        const groupMembers = groupedMembers[groupName];
        if (!groupMembers || !groupMembers.length) return null;

        return (
          <section key={groupName} className=" pb-28">
            <div className="section-shell ">
              <h2 className="mb-10 font-serifjp text-3xl font-semibold tracking-wider text-amber">{groupName}</h2>

              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {groupMembers.map((member) => (
                  <article key={`${member.avatar}-${member.name}`} className="glass rounded-[18px] bg-night-deep/45 p-6">
                    <div className="mb-5 flex h-24 w-24 items-center justify-center overflow-hidden rounded-full border border-paper/20">
                      <img
                        src={assetPath(`/img/LOGO/avatars/${member.avatar}`)}
                        alt={member.name}
                        width="96"
                        height="96"
                        loading="lazy"
                        decoding="async"
                        fetchPriority="low"
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="mb-1 font-serifjp text-sm tracking-[0.25em] text-amber">{member.role}</div>
                    <h3 className="font-serifjp text-2xl font-semibold tracking-wide sm:text-3xl sm:tracking-widest">{member.name}</h3>
                    <div className="mt-1 font-mono text-[10px] tracking-[0.18em] text-paper/45">{member.nameEn}</div>
                    <p className="mt-5 border-l-2 border-sunset pl-4 text-xs leading-7 text-paper/68">{member.description}</p>
                  </article>
                ))}
              </div>
            </div>
          </section>
        );
      })}

      {!isLoading && !members.length ? (
        <section className="pb-28">
          <div className="section-shell">
            <div className="glass rounded-2xl p-8 text-center text-paper/70">
              團隊資料暫時無法載入，請稍後再試一次。
            </div>
          </div>
        </section>
      ) : null}
    </main>
  );
}
