import SectionLabel from './SectionLabel';
import { scheduleDays, tagStyles } from '../data/siteData';

export default function Schedule() {
  return (
    <section id="課表" className="relative py-28 sm:py-40">
      <div className="absolute -top-40 right-[15%] h-[400px] w-[600px] bg-[radial-gradient(ellipse,rgba(232,98,76,0.12),transparent_70%)] blur-[90px]" />
      <div className="section-shell">
        <SectionLabel no="04" en="SCHEDULE" zh="課 表" />
        <div className="mb-12 flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <h2 className="fluid-section-title font-serifjp font-medium leading-snug tracking-[0.06em] sm:tracking-[0.08em]">
            四 天 三 夜 ，
            <br />
            <span className="text-3xl text-amber">從 GO 到 hackathon。</span>
          </h2>
          <div className="flex flex-wrap gap-4 font-mono text-[11px] text-paper/60">
            {Object.entries(tagStyles).map(([key, [label, className]]) => (
              <span key={key} className="flex items-center gap-1.5">
                <span className={`h-2 w-2 rounded-full ${className.split(' ')[0]}`} />
                {label}
              </span>
            ))}
          </div>
        </div>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {scheduleDays.map((day) => (
            <article key={day.day} className="glass rounded-[18px] p-5">
              <div className="mb-1 flex items-baseline justify-between">
                <span className="font-mono text-[11px] tracking-[0.2em] text-sunset">{day.day}</span>
                <span className="font-serifjp text-xs text-paper/55">{day.week}</span>
              </div>
              <div className="mb-5 font-serifjp text-3xl font-semibold tracking-widest">{day.date}</div>
              <div className="flex flex-col gap-3.5">
                {day.items.map(([time, title, tag], index) => (
                  <div key={`${time}-${title}`} className={index === 0 ? '' : 'border-t border-paper/10 pt-3'}>
                    <div className="mb-1 flex items-center justify-between">
                      <span className="font-mono text-[11px] text-paper/60">{time}</span>
                      <span className={`rounded-full px-2 py-0.5 font-mono text-[9px] tracking-wider ${tagStyles[tag][1]}`}>{tagStyles[tag][0]}</span>
                    </div>
                    <div className="font-serifjp text-[14.5px] leading-6 tracking-wide">{title}</div>
                  </div>
                ))}
              </div>
            </article>
          ))}
        </div>
        <p className="mt-8 text-center font-mono text-[11px] text-paper/50">
          ※ 詳細課表與講師資訊，請見 <a className="text-amber underline" href="#/course">課程內容頁</a>
        </p>
      </div>
    </section>
  );
}
