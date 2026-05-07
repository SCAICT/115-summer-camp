import { useEffect, useState } from 'react';

export default function Hero() {
  const [hideScrollHint, setHideScrollHint] = useState(false);

  useEffect(() => {
    const handleScroll = () => setHideScrollHint(window.scrollY > 24);

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section className="relative min-h-[720px] overflow-x-clip overflow-y-visible text-paper lg:h-screen">
      <div className="hero-glow pointer-events-none absolute -inset-x-10 -top-10 -bottom-56" />
      <div className="responsive-orb absolute -left-48 -top-32 h-[360px] w-[360px] rounded-full bg-[radial-gradient(circle_at_60%_40%,#f4a261_0%,#e8624c_45%,#b8472f_70%,transparent_100%)] sm:-left-64 sm:-top-40 sm:h-[460px] sm:w-[460px]" />
      <div className="responsive-orb pointer-events-none absolute bottom-[-14rem] right-[-24vw] h-[560px] w-[560px] rounded-full bg-[radial-gradient(circle,#d97a9a_0%,#8b6f9e_42%,transparent_76%)] opacity-16 blur-[95px] sm:bottom-[-17rem] sm:right-[-8vw] sm:h-[680px] sm:w-[min(680px,85vw)] sm:opacity-18 sm:blur-[105px]" />
      {/* 左側裝飾 */}
      <div className="pointer-events-none absolute bottom-24 left-8 hidden font-mono text-[12px] leading-7 tracking-[0.22em] text-paper/25 md:block lg:left-14">
        <div>0 0 1</div>
        <div>1 1 0 1</div>
        <div>0 1 0</div>
        <div>1 0 0 1 0</div>
        <div>0 1 1</div>
      </div>
      <div className="pointer-events-none absolute bottom-16 left-40 hidden font-mono text-2xl text-paper/30 md:block lg:left-44">{'{'}</div>
      <div className="pointer-events-none absolute left-20 top-64 hidden h-32 w-px bg-gradient-to-b from-transparent via-amber/30 to-transparent md:block" />
      <div className="pointer-events-none absolute left-16 top-72 hidden h-2 w-2 rounded-full border border-amber/40 md:block" />

      {/* 右側裝飾 */}
      <div className="pointer-events-none absolute right-8 top-6 hidden text-right font-mono text-[11px] leading-7 tracking-[0.24em] text-paper/20 md:block lg:right-16">
        <div>1 0 1 1</div>
        <div>0 0 1</div>
        <div>1 0 0 1</div>
        <div>0 1 1 0</div>
      </div>
      <div className="pointer-events-none absolute right-28 top-72 hidden font-mono text-xl text-paper/24 md:block lg:right-36">{'</>'}</div>
      <div className="pointer-events-none absolute right-12 top-48 hidden h-48 w-px bg-gradient-to-b from-mist-pink/20 via-mist-pink/10 to-transparent md:block" />
      <div className="pointer-events-none absolute right-20 top-56 hidden h-3 w-3 rounded-full border border-mist-pink/30 md:block" />
      <div className="pointer-events-none absolute right-32 bottom-40 hidden h-2 w-2 rounded-full bg-amber/20 md:block" />

      {/* 浮動裝飾元素 */}
      <div className="pointer-events-none absolute left-1/4 top-20 hidden animate-float-slow h-2 w-2 rounded-full bg-sunset/20 md:block" />
      <div className="pointer-events-none absolute right-1/3 top-1/3 hidden animate-float-slower h-1.5 w-1.5 rounded-full bg-amber/15 md:block" />
      <div className="pointer-events-none absolute left-1/3 bottom-32 hidden animate-float-medium h-1 w-1 rounded-full bg-mist-pink/25 md:block" />
      <div className="section-shell flex min-h-[720px] -translate-y-2 items-end justify-between pb-24 pt-32 sm:min-h-[760px] sm:-translate-y-4 sm:items-center lg:min-h-screen lg:-translate-y-8 lg:pb-20 lg:pt-28">
        <div className="relative z-10 max-w-[780px] self-end sm:self-center mt-20 sm:mt-0">
          <p className="fluid-wide-tracking mb-5 font-sansjp text-[15px] font-light text-mist-pink sm:mb-6 sm:text-sm">
            SCAICT  · 2026 SUMMER
          </p>
          <h1 className="fluid-display -ml-2 whitespace-nowrap font-serifjp font-medium leading-none tracking-[0.03em] text-paper drop-shadow-[0_2px_40px_rgba(232,98,76,0.3)]">
            資<span className="text-sunset">暑</span>與你
          </h1>
          <p className="mt-9 fluid-wide-tracking whitespace-nowrap font-serifjp text-lg text-paper/70 sm:text-xl">聯 合 暑 訓</p>
          <p className="mt-9 max-w-lg text-[15px] leading-8 tracking-wide text-paper/70">
            <span className="inline-block">一場關於 <span className="text-amber">Go</span> 與 <span className="text-amber">Telegram Bot</span> 的夏夜冒險。</span>
            <br />
            <span className="inline-block">從零開始，學會用 Go 寫出自己的酷酷 Bot，寫詩、寫程式、寫一個夏天。</span>
          </p>
          <div className="mt-10 flex flex-wrap gap-3 sm:mt-11 sm:gap-3.5">
            <a href="#/home/報名" className="btn-primary rounded-full bg-sunset px-6 py-3.5 text-sm font-semibold tracking-[0.12em] text-ink shadow-sunset transition hover:bg-amber sm:px-8 sm:py-4 sm:tracking-[0.15em]">
              立即報名 →
            </a>
            <a href="#/course" className="btn-secondary rounded-full border border-paper/30 bg-paper/5 px-6 py-3.5 text-sm tracking-[0.12em] text-paper backdrop-blur transition hover:border-amber/70 sm:px-7 sm:py-4 sm:tracking-[0.15em]">
              了解課程
            </a>
          </div>
        </div>
      </div>

      <div className={`absolute bottom-7 left-1/2 -translate-x-1/2 transition-all duration-500 hidden sm:block ${hideScrollHint ? 'pointer-events-none translate-y-3 opacity-0' : 'translate-y-0 opacity-100'}`}>
        <div className="scroll-hint flex flex-col items-center gap-1.5 font-mono text-[10px] tracking-[0.25em] text-paper/50">
          <span>SCROLL</span>
          <span className="h-6 w-px bg-paper/40" />
        </div>
      </div>
    </section>
  );
}
