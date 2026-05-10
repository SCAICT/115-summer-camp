import PageIntro from './PageIntro';
import { photoArchives } from '../data/siteData';

function YearSection({ archive }) {
  return (
    <section className="space-y-5">
      <div className="mb-2 flex items-end justify-between gap-4">
        <div>
          <div className="font-mono text-[10px] tracking-[0.24em] text-amber">// {archive.year} WINTER CAMP</div>
          <h2 className="mt-2 font-serifjp text-3xl font-semibold tracking-wide text-paper sm:text-4xl">{archive.title}</h2>
          <p className="mt-3 max-w-3xl text-sm leading-7 text-paper/65">{archive.subtitle}</p>
        </div>
        <div className="rounded-full border border-paper/15 bg-paper/[0.04] px-3 py-1 font-mono text-[10px] tracking-[0.16em] text-paper/60">
          {archive.photos.length} PHOTOS
        </div>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {archive.photos.map((src, index) => (
          <figure
            key={`${archive.year}-${String(index + 1).padStart(2, '0')}`}
            className="group relative overflow-hidden rounded-2xl border border-paper/10 bg-night-deep/40"
          >
            <img
              src={src}
              alt={`${archive.title} 照片 ${index + 1}`}
              width="1200"
              height="900"
              loading="lazy"
              decoding="async"
              fetchPriority="low"
              className="aspect-[4/3] h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/15 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            <figcaption className="pointer-events-none absolute bottom-2 right-2 rounded-full border border-paper/20 bg-ink/70 px-2.5 py-1 font-mono text-[10px] tracking-[0.14em] text-paper/75">
              {String(index + 1).padStart(2, '0')}
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}

export default function PhotosPage() {
  return (
    <main className="subpage-shell relative overflow-hidden">
      <PageIntro label="PHOTO ARCHIVE" title="歷年照片">
        依年份整理歷屆寒訓的活動紀錄，從第一天的相遇到最後一天的發表，所有回憶都在這裡。
      </PageIntro>

      <section className="section-unified-bg ">
        <div className="subpage-body-glow pointer-events-none absolute inset-0" />
        <div className="section-shell space-y-16">
          {photoArchives.map((archive) => (
            <YearSection key={archive.year} archive={archive} />
          ))}
        </div>
      </section>
    </main>
  );
}
