import SectionLabel from './SectionLabel';
import { courseItems } from '../data/siteData';

export default function Course() {
  return (
    <section id="課程" className="relative py-28 sm:py-40">
      <div className="absolute -top-48 left-[40%] h-[500px] w-[700px] bg-[radial-gradient(ellipse,rgba(244,162,97,0.10),transparent_70%)] blur-[80px]" />
      <div className="section-shell">
        <SectionLabel no="03" en="ABOUT THE COURSE" zh="關 於 課 程" colorClass="text-amber" />
        <div className="mb-16 grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <h2 className="fluid-section-title font-serifjp font-medium leading-tight tracking-[0.06em] sm:tracking-[0.08em]">
            四 天 ，
            <br />
            與 <span className="text-sunset">Agent</span>
            <br />
            一起寫一個夏天。
          </h2>
          <div className="space-y-4 text-[15px] leading-8 text-paper/70">
            <p>我們把 AI Agent 這個快速演化的領域，拆成了你能消化的尺寸。從一個 prompt 開始，到能自主完成任務的 agent，再到一個能 demo 的小作品。</p>
            <p className="text-paper/60">不需要背景。只需要一台筆電、好奇心，和一個夏天。</p>
          </div>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {courseItems.map((item, index) => (
            <article key={item.tag} className="glass relative min-h-52 overflow-hidden rounded-2xl bg-night-deep/50 p-6">
              <div className="absolute -right-5 -top-6 font-serifjp text-7xl text-sunset/20">{item.icon}</div>
              <div className="mb-4 font-mono text-[10px] tracking-[0.25em] text-amber">// {String(index + 1).padStart(2, '0')} · {item.tag}</div>
              <h3 className="mb-3 font-serifjp text-[22px] font-semibold tracking-widest">{item.title}</h3>
              <p className="text-[13px] leading-6 text-paper/65">{item.desc}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
