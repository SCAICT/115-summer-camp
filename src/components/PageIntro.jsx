
export default function PageIntro({ label, title, children }) {
  const handleBackHome = (e) => {
    e.preventDefault();
    if (window.history.length > 1) {
      history.back();
    } else {
      window.location.hash = '#/';
    }
  };

  return (
    <header className="section-unified-bg relative overflow-hidden pb-16 pt-36 sm:pt-44">
      <div className="subpage-hero-bg pointer-events-none absolute inset-0" />
      <div className="section-shell">
        <a href="#/" onClick={handleBackHome} className="btn-tertiary mb-8 inline-flex rounded-full border border-paper/20 px-4 py-2 font-mono text-[11px] tracking-[0.2em] text-paper/60 transition hover:border-amber/60 hover:text-amber">
          ← BACK HOME
        </a>
        <div className="mb-5 font-mono text-[11px] tracking-[0.28em] text-amber">// {label}</div>
        <h1 className="fluid-page-title max-w-3xl font-serifjp font-medium leading-tight tracking-[0.06em] sm:tracking-[0.08em]">{title}</h1>
        {children && <p className="mt-7 max-w-2xl text-[15px] leading-8 tracking-wide text-paper/68">{children}</p>}
      </div>
    </header>
  );
}
