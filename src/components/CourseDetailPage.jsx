import PageIntro from './PageIntro';
import { courseItems, speakers } from '../data/siteData';

function SpeakerCard({ speaker }) {
  return (
    <article className="glass group relative overflow-hidden rounded-2xl p-6 transition-all duration-300 hover:shadow-[0_12px_32px_rgba(0,0,0,0.22)]">
      <div className="pointer-events-none absolute -right-12 -top-12 h-40 w-40 rounded-full bg-amber/10 blur-3xl transition-opacity duration-300 group-hover:opacity-70" />
      <div className="relative flex flex-col items-center gap-5 sm:flex-row sm:items-start">
        <div className="relative shrink-0">
          <img
            src={speaker.avatar}
            alt={speaker.name}
            loading="lazy"
            className="h-20 w-20 rounded-2xl border border-paper/15 object-cover"
            onError={(e) => { e.currentTarget.style.display = 'none'; }}
          />
          <div className="absolute -bottom-1 -right-1 rounded-full border border-amber/50 bg-amber/20 px-1.5 py-0.5 font-mono text-[8px] tracking-[0.12em] text-amber">
            {speaker.role.split(' ')[0].toUpperCase()}
          </div>
        </div>
        <div className="flex-1 text-center sm:text-left">
          <div className="mb-0.5 font-mono text-[10px] tracking-[0.22em] text-paper/40">// INSTRUCTOR</div>
          <h3 className="font-serifjp text-xl tracking-wide text-paper">{speaker.name}</h3>
          {speaker.fullName && (
            <p className="mb-3 font-mono text-[11px] tracking-[0.14em] text-paper/50">{speaker.fullName}</p>
          )}
          <div className="mb-3 flex flex-wrap justify-center gap-1.5 sm:justify-start">
            {speaker.courses.map((course) => (
              <span
                key={course}
                className="rounded-full border border-sunset/35 bg-sunset/10 px-2.5 py-0.5 font-mono text-[10px] tracking-[0.1em] text-sunset"
              >
                {course}
              </span>
            ))}
          </div>
          <p className="text-sm leading-7 text-paper/65">{speaker.bio}</p>
        </div>
      </div>
    </article>
  );
}

export default function CourseDetailPage() {
  return (
    <main className="subpage-shell relative overflow-hidden">
      <PageIntro label="COURSE DETAIL" title="課程內容">
      </PageIntro>

      <section className="section-unified-bg pb-28">
        <div className="subpage-body-glow pointer-events-none absolute inset-0" />
        <div className="section-shell space-y-16">

          {/* Course modules */}
          <div>
            <div className="mb-8 flex items-center gap-4">
              <p className="font-mono text-[10px] tracking-[0.25em] text-amber">// MODULES</p>
              <div className="h-px flex-1 bg-paper/10" />
            </div>
            <div className="grid gap-5 md:grid-cols-2">
              {courseItems.map((item, index) => (
                <article key={item.tag} className="glass rounded-[18px] bg-night-deep/45 p-6">
                  <div className="mb-4 font-mono text-[10px] tracking-[0.25em] text-amber">// MODULE {String(index + 1).padStart(2, '0')}</div>
                  <div className="mb-2 text-sm font-semibold tracking-[0.2em] text-sunset">{item.tag}</div>
                  <h2 className="mb-4 font-serifjp text-[22px] font-semibold tracking-wide sm:tracking-widest">{item.title}</h2>
                  <p className="text-sm leading-7 text-paper/65">{item.desc}</p>
                </article>
              ))}
            </div>
          </div>

          {/* Speakers */}
          <div>
            <div className="mb-8 flex items-center gap-4">
              <p className="font-mono text-[10px] tracking-[0.25em] text-amber">// INSTRUCTORS</p>
              <div className="h-px flex-1 bg-paper/10" />
            </div>
            <div className="grid gap-5 lg:grid-cols-2">
              {speakers.map((speaker) => (
                <SpeakerCard key={speaker.id} speaker={speaker} />
              ))}
            </div>
          </div>

        </div>
      </section>
    </main>
  );
}
