import SectionLabel from './SectionLabel';

export default function AboutSCAICT() {
  return (
    <section id="關於" className="relative overflow-hidden py-28 sm:py-40 lg:py-48">
      <div className="section-shell">
        <SectionLabel no="03" en="ABOUT SCAICT" zh="關 於 中 電" />
        <div className="grid gap-14 lg:grid-cols-[1fr_1.3fr] lg:gap-20">
          <div>
            <h2 className="fluid-section-title font-serifjp font-medium leading-snug tracking-wide">
              <span className="text-sunset">S</span>tudent's
              <br />
              <span className="text-sunset">C</span>lubs
              <br />
              <span className="text-sunset">A</span>lliance of
              <br />
              <span className="whitespace-nowrap"><span className="text-sunset">I</span>nformation in</span>
              <br />
              <span className="text-sunset">C</span>entral
              <br />
              <span className="text-sunset">T</span>aiwan
            </h2>
            
          </div>
          <div>
            <p className="font-serifjp text-[18px] leading-[1.9] tracking-wide sm:text-[22px]">
              由學生自主營運的資訊社群
              <br />
              致力於整合中部電資資源並打破地域限制
              <br />
              透過<span className="text-amber">實作</span>與<span className="text-amber">開源</span>精神
              <br />
              讓每一位對技術有熱忱的學子都能找到學習的起點
            </p>
            <p className="mt-7 text-sm leading-7 tracking-wide text-paper/65">
              SCAICT 中部高中電資社團聯合會議 自 2021 年發起、2022 年正式成立，目標是將中部所有資訊社團連結成為一個「大組織」。我們不只舉辦課程，更關注資訊教育的扎根，透過與北、南學生社群協辦的大型營隊，建構跨校、跨領域的學習生態圈 。
            </p>
            <div className="mt-10 flex flex-wrap gap-8">
              {[
                ['5+', 'YEARS', '深根中部教育'],
                ['23+', 'CLUBS', '聯合參與社團'], 
                ['200+', 'MEMBERS', '熱愛資訊的夥伴'],
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
