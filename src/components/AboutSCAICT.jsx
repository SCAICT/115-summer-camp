import SectionLabel from './SectionLabel';
import StarDust from './StarDust';

export default function AboutSCAICT() {
  return (
    <section id="關於" className="relative overflow-hidden py-28 sm:py-40 lg:py-48">
      <StarDust />
      <div className="section-shell">
        <SectionLabel no="02" en="ABOUT SCAICT" zh="關 於 中 電" />
        <div className="grid gap-14 lg:grid-cols-[1fr_1.3fr] lg:gap-20">
          <div>
            <h2 className="fluid-section-title font-serifjp font-medium leading-snug tracking-wide">
              <span className="text-sunset">S</span>tudent's
              <br />
              <span className="text-sunset">C</span>lubs
              <br />
              <span className="text-sunset">A</span>lliance of
              <br />
              <span className="text-sunset">I</span>nformation in
              <br />
              <span className="text-sunset">C</span>entral
              <br />
              <span className="text-sunset">T</span>aiwan
            </h2>
            <p className="mt-6 font-mono text-[11px] tracking-[0.2em] text-paper/45">// 中部高中電資社團聯合會議</p>
          </div>
          <div>
            <p className="font-serifjp text-[18px] leading-[1.9] tracking-wide sm:text-[22px]">
              我們是一群熱愛資訊科技的學生，
              <br />
              透過工作坊、講座與營隊，
              <br />
              把<span className="text-amber">程式</span>與<span className="text-amber">創造</span>的火種，
              <br />
              傳遞到每一個渴望學習的角落。
            </p>
            <p className="mt-7 text-sm leading-7 tracking-wide text-paper/65">
              SCAICT 中部高中電資社團聯合會議自創立以來，致力於連結中部對資訊有熱情的高中生。從過去的程式競賽、技術工作坊，到今年的暑期營隊，我們相信好的學習從一個夏天的相遇開始。
            </p>
            <div className="mt-10 flex flex-wrap gap-8">
              {[
                ['20+', 'YEARS', '深耕資訊教育'],
                ['500+', 'ALUMNI', '校友遍佈業界'],
                ['60', 'SUMMER 2026', '今夏與你相遇'],
              ].map(([number, label, zh]) => (
                <div key={label} className="border-l-2 border-sunset pl-4">
                  <div className="font-serifjp text-4xl font-semibold">{number}</div>
                  <div className="mt-1 font-mono text-[10px] tracking-[0.2em] text-amber">{label}</div>
                  <div className="mt-0.5 text-xs text-paper/60">{zh}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
