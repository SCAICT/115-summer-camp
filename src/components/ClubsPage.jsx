import PageIntro from './PageIntro';
import { partnerClubs } from '../data/siteData';

export default function ClubsPage() {
  return (
    <main className="subpage-shell relative overflow-hidden">
      <PageIntro label="PARTNER CLUBS" title="合作社團">
        與來自各校的資訊研究社、電子研究社、數位創意社等優秀社團合作，共同打造這個暑期最精彩的程式設計營隊體驗。
      </PageIntro>
      <section className="section-unified-bg ">
        <div className="subpage-body-glow pointer-events-none absolute inset-0" />
        <div className="section-shell">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {partnerClubs.map((club) => (
              <a
                key={club.name}
                href={club.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`前往 ${club.name}`}
                className="group relative overflow-hidden rounded-2xl border border-paper/10 transition-all hover:border-amber/45 hover:shadow-lg hover:shadow-amber/20"
              >
                <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-night-deep/60 to-night-deep/20">
                  <img
                    src={club.logo}
                    alt={club.name}
                    width="320"
                    height="320"
                    loading="lazy"
                    decoding="async"
                    fetchPriority="low"
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_35%_22%,rgba(244,162,97,0.24),transparent_56%),radial-gradient(circle_at_70%_88%,rgba(217,122,154,0.20),transparent_58%)] opacity-60 transition-opacity duration-300 group-hover:opacity-95" />
                </div>
                <div className="bg-gradient-to-t from-ink to-ink/75 px-5 py-4">
                  <h3 className="font-serifjp text-lg font-semibold tracking-wide text-paper transition-colors duration-300 group-hover:text-amber">
                    {club.name}
                  </h3>
                  <p className="mt-1 text-xs tracking-[0.15em] text-paper/50 group-hover:text-amber/60">
                    INSTAGRAM PROFILE →
                  </p>
                </div>
              </a>
            ))}
          </div>

          <div className="mt-16 rounded-2xl border border-paper/10 bg-gradient-to-br from-night-deep/35 to-night-deep/20 p-8 text-center">
            <h2 className="font-serifjp text-2xl font-semibold tracking-wide text-paper">
              你的社團也想加入嗎？
            </h2>
            <p className="mt-4 text-sm leading-7 text-paper/65">
              我們持續尋找志同道合的合作夥伴。如果你的社團對這次營隊感興趣，歡迎與我們聯繫！
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
