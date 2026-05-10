import SectionLabel from './SectionLabel';
import { courseItems, speakers } from '../data/siteData';

export default function Course() {
  return (
    <section id="課程" className="section-unified-bg relative py-28 sm:py-40">
      <div className="absolute -top-48 left-[40%] h-[500px] w-[700px] bg-[radial-gradient(ellipse,rgba(244,162,97,0.10),transparent_70%)] blur-[80px]" />
      <div className="section-shell">
        <SectionLabel no="04" en="ABOUT THE COURSE" zh="關 於 課 程" colorClass="text-amber" />
          <div className="mb-16 grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
            <h2 className="fluid-section-title font-serifjp font-medium leading-tight tracking-[0.06em] sm:tracking-[0.08em]">
              四 天 ，
              <br />
              從第一行 <span className="text-sunset">Go</span>
              <br />
              到你的第一個 Bot。
            </h2>
            <div className="space-y-4 text-[18px] leading-9 text-paper/70 sm:text-[19px]">
              <p>我們把課程拆成你能一口一口吃下去的大小。從 Go 語法到 Telegram API，從個人練習到團隊黑客松——四天後，你會帶著一個能動的作品回家。</p>
              <p className="text-paper/60">不需要背景，只需要一顆好奇心。</p>
            </div>
          </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {courseItems.map((item, index) => (
            <article key={item.tag} className="glass relative min-h-52 overflow-hidden rounded-2xl bg-night-deep/50 p-6">
              <div className="absolute -right-5 -top-6 font-serifjp text-7xl text-sunset/20">{item.icon}</div>
              <div className="mb-4 font-mono text-[12px] tracking-[0.25em] text-amber">// {String(index + 1).padStart(2, '0')} · {item.tag}</div>
              <h3 className="mb-3 font-serifjp text-[26px] font-semibold tracking-widest">{item.title}</h3>
              <p className="text-[16px] leading-7 text-paper/65">{item.desc}</p>
            </article>
          ))}
        </div>

        <div className="mt-14">
          <div className="mb-6 flex items-center gap-4">
            <p className="font-mono text-[10px] tracking-[0.25em] text-amber">// INSTRUCTORS</p>
            <div className="h-px flex-1 bg-paper/10" />
          </div>
          <div className="grid gap-5 md:grid-cols-2">
            {speakers.map((speaker) => (
              <article key={speaker.id} className="glass overflow-hidden rounded-2xl bg-night-deep/45 p-6">
                <div className="mb-4 flex items-start gap-4">
                  <img
                    src={speaker.avatar}
                    alt={speaker.name}
                    width="64"
                    height="64"
                    loading="lazy"
                    decoding="async"
                    fetchPriority="low"
                    className="h-16 w-16 rounded-2xl border border-paper/20 object-cover"
                    onError={(event) => {
                      event.currentTarget.style.display = 'none';
                    }}
                  />
                  <div>
                    <h3 className="font-serifjp text-2xl font-semibold tracking-wide text-paper">{speaker.name}</h3>
                    <p className="mt-1 font-mono text-[11px] tracking-[0.16em] text-sunset/85">{speaker.role}</p>
                  </div>
                </div>

                <p className="text-[15px] leading-7 text-paper/70">{speaker.bio}</p>

                <div className="mt-4 flex flex-wrap gap-2">
                  {speaker.courses.map((course) => (
                    <span
                      key={`${speaker.id}-${course}`}
                      className="rounded-full border border-amber/35 bg-amber/10 px-2.5 py-0.5 text-xs tracking-wide text-amber"
                    >
                      {course}
                    </span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>

        <div className="mt-10 flex justify-end">
          <a
            href="#/course"
            className="group relative w-fit overflow-hidden rounded-full border border-amber/60 bg-gradient-to-r from-amber/15 to-amber/5 px-6 py-3 font-mono text-[11px] font-semibold tracking-[0.2em] text-amber transition-all duration-300 hover:border-amber/80 hover:bg-amber/20 hover:shadow-lg hover:shadow-amber/25 active:scale-95"
          >
            <span className="relative inline-flex items-center gap-2">
              課程介紹與講師
              <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">→</span>
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}
