import PageIntro from './PageIntro';
import { courseItems, scheduleDays } from '../data/siteData';

export default function CourseDetailPage() {
  return (
    <main className="subpage-shell relative overflow-hidden">
      <PageIntro label="COURSE DETAIL" title="課程內容頁">
        從 prompt 的語意設計，到 agent 的任務拆解、工具調用與 demo 打磨。這裡整理更完整的課程輪廓，讓你在報名前先知道四天會如何推進。
      </PageIntro>
      <section className="section-unified-bg relative pb-28">
        <div className="subpage-body-glow pointer-events-none absolute inset-0" />
        <div className="section-shell">
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
          <div className="mt-12 grid gap-4 lg:grid-cols-4">
            {scheduleDays.map((day) => (
              <article key={day.day} className="rounded-[16px] border border-paper/10 bg-paper/[0.035] p-5">
                <div className="font-mono text-[11px] tracking-[0.2em] text-sunset">{day.day}</div>
                <div className="mb-4 mt-1 font-serifjp text-3xl font-semibold">{day.date}</div>
                <div className="space-y-3">
                  {day.items.map(([time, title]) => (
                    <div key={`${day.day}-${time}-${title}`} className="border-t border-paper/10 pt-3">
                      <div className="mb-1 font-mono text-[11px] text-paper/45">{time}</div>
                      <div className="text-sm leading-6 text-paper/75">{title}</div>
                    </div>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
