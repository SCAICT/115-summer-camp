export default function Showcase() {
  return (
    <section id="成果" className="relative py-28 sm:py-40">
      <div className="section-shell">
        <div className="mb-14 grid items-center gap-10 lg:grid-cols-[1fr_1.5fr]">
          <div className="mb-4 font-mono text-[11px] tracking-[0.25em] text-amber">// 06 · STUDENT WORKS</div>
          <h2 className="fluid-section-title font-serifjp font-medium leading-snug tracking-[0.06em] sm:tracking-[0.08em]">
            尚未誕生的
            <br />
            <span className="text-amber">夏 之 作 品。</span>
          </h2>
          <p className="text-[14.5px] leading-8 tracking-wide text-paper/70">
            這個區塊保留給尚未到來的學員。
            <br />
            他們的 prompt、agent、夏夜熬出來的 demo，會在 7 月之後，在這裡綻放。
            <br />
            <span className="text-xs text-paper/45">// 敬請期待 · coming summer 2026</span>
          </p>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {[1, 2, 3].map((number) => (
            <div key={number} className="relative grid aspect-[4/3] place-items-center overflow-hidden rounded-2xl border border-dashed border-paper/20 bg-paper/[0.03] font-mono text-[11px] tracking-[0.2em] text-paper/35">
              <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(245,232,212,0.15)_1px,transparent_1.5px)] opacity-50 [background-size:14px_14px]" />
              <div className="relative text-center">
                <div className="mb-2 text-2xl text-sunset/50">◯</div>
                <div>WORK · 0{number}</div>
                <div className="mt-1 text-[9px] opacity-60">// 待解鎖</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
