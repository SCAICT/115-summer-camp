import SectionLabel from './SectionLabel';

const testimonials = [
  {
    quote: '在這個營隊中我有學到知識又有認識到新朋友，還認識這專業方面的講師，甚至了解到了特殊選材，真的很充足。我如果第三天沒有不舒服的話，我應該是可以學到更多的知識……最後的那個提問真的很棒，我真的得到很多我想知道的資訊',
    name: '林宇軒',
    camp: '2026 寒訓',
  },
  {
    quote: '第一天看著身邊的人好像都很厲害，我完全不敢開口。但花了一個晚上把課程重新走過一遍，隔天竟然就跟上了七八成。後來才發現，其實很多人也都是第一次接觸，只是大家都不說。',
    name: '盧芊聿',
    camp: '2026 寒訓',
  },
  {
    quote: '帶我看見了世界，給我勇氣去研究一些酷東西，我下次會再來的',
    name: '高子程',
    camp: '2026 寒訓',
  },
];

export default function Testimonials() {
  return (
    <section id="學員回饋" className="relative overflow-x-hidden py-14 sm:py-20">
      <div className="pointer-events-none absolute left-0 h-[480px] w-[520px] -translate-y-24 bg-[radial-gradient(ellipse,rgba(217,122,154,0.10),transparent_70%)] blur-[90px]" />

      <div className="section-shell">
        <SectionLabel no="06" en="TESTIMONIALS" zh="學 員 回 饋" colorClass="text-mist-pink" />

        <div className="mb-10 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
          <h2 className="fluid-section-title font-serifjp font-medium leading-snug tracking-[0.06em] sm:tracking-[0.08em]">
            他們說的，
            <br />
            <span className="text-mist-pink">比我們說的更真。</span>
          </h2>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((t, i) => (
            <article
              key={t.name}
              className={`glass relative flex flex-col justify-between overflow-hidden rounded-[22px] p-6 sm:p-7 ${
                i === 0 ? 'sm:col-span-2 lg:col-span-1' : ''
              }`}
            >
              {/* Decorative quote mark — anchored to bottom-right, behind text */}
              <div
                className="pointer-events-none absolute bottom-14 right-5 z-0 select-none font-serifjp text-[96px] leading-none text-mist-pink/10"
                aria-hidden="true"
              >
                "
              </div>

              <p className="relative z-10 font-serifjp text-[15px] leading-[1.95] tracking-wide text-paper/80 sm:text-base">
                {t.quote}
              </p>

              <div className="mt-6 flex items-center gap-3 border-t border-paper/10 pt-5">
                <div className="h-px flex-1 bg-gradient-to-r from-mist-pink/30 to-transparent invisible" />
                <div className="text-right">
                  <div className="font-serifjp text-sm tracking-wider text-paper/90">
                    {t.name}
                  </div>
                  <div className="mt-0.5 font-mono text-[10px] tracking-[0.2em] text-paper/40">
                    {t.camp} 學員
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

