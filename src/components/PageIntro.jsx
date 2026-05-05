import StarDust from './StarDust';

export default function PageIntro({ label, title, children }) {
  return (
    <header className="relative overflow-hidden pb-16 pt-36 sm:pt-44">
      <StarDust />
      <div className="subpage-hero-bg pointer-events-none absolute inset-0" />
      <div className="section-shell">
        <a href="#/" className="btn-tertiary mb-8 inline-flex rounded-full border border-paper/20 px-4 py-2 font-mono text-[11px] tracking-[0.2em] text-paper/60 transition hover:border-amber/60 hover:text-amber">
          ← BACK HOME
        </a>
        <div className="mb-5 font-mono text-[11px] tracking-[0.28em] text-amber">// {label}</div>
        <h1 className="fluid-page-title max-w-3xl font-serifjp font-medium leading-tight tracking-[0.06em] sm:tracking-[0.08em]">{title}</h1>
        <p className="mt-7 max-w-2xl text-[15px] leading-8 tracking-wide text-paper/68">{children}</p>
      </div>
    </header>
  );
}
