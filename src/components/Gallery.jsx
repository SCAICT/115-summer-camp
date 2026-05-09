import SectionLabel from './SectionLabel';
import { galleryPhotos } from '../data/siteData';

function NoiseDefs() {
  return (
    <svg width="0" height="0" className="absolute">
      <defs>
        <filter id="gallery-noise">
          <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
          <feColorMatrix type="saturate" values="0" />
          <feBlend in="SourceGraphic" mode="overlay" result="blend" />
          <feComposite in="blend" in2="SourceGraphic" operator="in" />
        </filter>
      </defs>
    </svg>
  );
}

function Placeholder({ gradient }) {
  return (
    <div className={`absolute inset-0 bg-gradient-to-br ${gradient} overflow-hidden`}>
      <div
        className="absolute inset-0 opacity-[0.18]"
        style={{ filter: 'url(#gallery-noise)', backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\'/%3E%3C/svg%3E")', backgroundSize: 'cover' }}
      />
      <div className="absolute inset-0 animate-[gallery-shimmer_2.4s_ease-in-out_infinite] bg-gradient-to-r from-transparent via-paper/[0.04] to-transparent" />
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="flex flex-col items-center gap-2 opacity-20">
          <div className="h-8 w-8 rounded-full border border-paper/40 flex items-center justify-center">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M2 10.5L5 7.5L7.5 10L10 6L12 9.5" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="text-paper" />
              <circle cx="4" cy="4.5" r="1.2" stroke="currentColor" strokeWidth="1" className="text-paper" />
            </svg>
          </div>
          <span className="font-mono text-[9px] tracking-[0.2em] text-paper/50">PHOTO</span>
        </div>
      </div>
    </div>
  );
}

function GalleryCell({ photo }) {
  const imageSrc = photo.src ? encodeURI(photo.src) : '';

  return (
    <div className={`relative overflow-hidden rounded-2xl ${photo.gridClass} group cursor-pointer`} style={{ minHeight: photo.id === 'hero' ? '220px' : '160px' }}>
      {photo.src ? (
        <img
          src={imageSrc}
          alt={photo.caption}
          loading="lazy"
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
      ) : (
        <Placeholder gradient={photo.gradient} />
      )}

      <div className="absolute inset-0 bg-gradient-to-t from-ink/95 via-ink/70 to-ink/30 opacity-75 transition-opacity duration-400 group-hover:opacity-100" />

      <div className="absolute inset-x-0 bottom-0 translate-y-2 p-4 opacity-0 transition-all duration-400 group-hover:translate-y-0 group-hover:opacity-100">
        <div className="mb-2 h-[2px] w-8 rounded-full bg-amber" />
        <p className="font-serifjp text-sm tracking-[0.1em] text-paper">{photo.caption}</p>
        <p className="mt-1 font-mono text-[10px] tracking-[0.08em] text-paper/65 leading-relaxed">{photo.desc}</p>
      </div>

      <div className="absolute inset-0 rounded-2xl border border-paper/0 transition-all duration-400 group-hover:border-paper/15" />
    </div>
  );
}

export default function Gallery() {
  return (
    <section id="成果" className="section-unified-bg relative py-28 sm:py-40">
      <NoiseDefs />

      <div className="pointer-events-none absolute -top-40 left-[15%] h-[400px] w-[500px] bg-[radial-gradient(ellipse,rgba(232,98,76,0.10),transparent_70%)] blur-[100px]" />
      <div className="pointer-events-none absolute -bottom-32 right-[10%] h-[360px] w-[460px] bg-[radial-gradient(ellipse,rgba(217,122,154,0.12),transparent_68%)] blur-[90px]" />
      <div className="pointer-events-none absolute top-[40%] right-[30%] h-[280px] w-[380px] bg-[radial-gradient(ellipse,rgba(244,162,97,0.08),transparent_72%)] blur-[80px]" />

      <div className="section-shell">
        <SectionLabel no="05" en="GALLERY" zh="活 動 花 絮" colorClass="text-mist-pink" />

        <div className="mb-14 flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
          <div className="max-w-3xl space-y-5">
            <span className="inline-flex rounded-full border border-paper/18 bg-paper/[0.03] px-3 py-1 font-mono text-[10px] tracking-[0.22em] text-paper/65">
              MOMENTS
            </span>
            <h2 className="fluid-section-title font-serifjp font-medium leading-snug tracking-[0.06em] sm:tracking-[0.08em]">
              每一張快門，
              <br />
              都是這個<span className="text-sunset">夏天的記憶。</span>
            </h2>
          </div>
          <a
            href="#/photos"
            className="btn-secondary w-fit rounded-full border border-paper/25 bg-paper/[0.03] px-5 py-2.5 font-mono text-[11px] tracking-[0.18em] text-paper/75 transition hover:border-amber/55 hover:text-amber"
          >
            查看歷年照片頁 →
          </a>
        </div>

        <div
          className="grid grid-cols-2 gap-3 md:grid-cols-5 md:gap-4"
          style={{ gridTemplateRows: 'repeat(3, 220px)' }}
        >
          {galleryPhotos.map((photo) => (
            <GalleryCell key={photo.id} photo={photo} />
          ))}
        </div>

        <p className="mt-6 text-center font-mono text-[10px] tracking-[0.25em] text-paper/30">// WINTER CAMP ARCHIVES</p>
      </div>

      <style>{`
        @keyframes gallery-shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(200%); }
        }
      `}</style>
    </section>
  );
}
