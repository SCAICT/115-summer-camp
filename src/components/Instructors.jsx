import { useRef } from 'react';
import { speakers } from '../data/siteData';
import SectionLabel from './SectionLabel';

const assetPath = (path) => `${import.meta.env.BASE_URL}${path.replace(/^\/+/, '')}`;

function InstructorCard({ speaker }) {
  return (
    <article className="glass flex flex-col gap-4 rounded-[18px] p-5">
      <div className="flex items-center gap-4">
        <div className="h-16 w-16 shrink-0 overflow-hidden rounded-full border-2 border-paper/20">
          <img
            src={assetPath(speaker.avatar)}
            alt={speaker.name}
            width={64}
            height={64}
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover"
          />
        </div>
        <div className="min-w-0">
          <div className="mb-0.5 font-mono text-[10px] tracking-[0.2em] text-amber/70">
            {speaker.badge}
          </div>
          <div className="font-serifjp text-lg font-semibold leading-none tracking-wider">
            {speaker.name}
          </div>
          {speaker.fullName && (
            <div className="mt-1 font-serifjp text-xs tracking-wider text-paper/60">
              {speaker.fullName}
            </div>
          )}
          <div className="mt-0.5 font-mono text-[10px] tracking-[0.18em] text-sunset">
            {speaker.role}
          </div>
        </div>
      </div>

      <div className="flex flex-wrap gap-1.5">
        {speaker.courses.map((c) => (
          <span
            key={c}
            className="rounded-full bg-amber/10 px-2.5 py-0.5 font-mono text-[10px] tracking-[0.1em] text-amber/80"
          >
            {c}
          </span>
        ))}
      </div>

      <p className="border-l-2 border-sunset/50 pl-3 font-serifjp text-[13px] leading-7 text-paper/65">
        {speaker.bio}
      </p>
    </article>
  );
}

export default function Instructors() {
  const trackRef = useRef(null);
  const drag = useRef({ active: false, startX: 0, scrollLeft: 0 });

  const onMouseDown = (e) => {
    const el = trackRef.current;
    drag.current = { active: true, startX: e.pageX, scrollLeft: el.scrollLeft };
    el.style.userSelect = 'none';
  };

  const onMouseMove = (e) => {
    if (!drag.current.active) return;
    e.preventDefault();
    const dx = e.pageX - drag.current.startX;
    trackRef.current.scrollLeft = drag.current.scrollLeft - dx * 1.2;
  };

  const stopDrag = () => {
    drag.current.active = false;
    if (trackRef.current) trackRef.current.style.userSelect = '';
  };

  return (
    <section id="講師" className="py-14 sm:py-20">
      <div className="section-shell mb-8 sm:mb-10">
        <SectionLabel no="—" en="INSTRUCTORS" zh="課 程 講 師" colorClass="text-amber" />
        <h2 className="fluid-section-title font-serifjp font-medium leading-snug tracking-[0.06em] sm:tracking-[0.08em]">
          帶你走過
          <br />
          <span className="text-amber">這個夏天</span>的人。
        </h2>
      </div>

      {/* Mobile / tablet — horizontal scroll strip */}
      <div className="relative lg:hidden">
        <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-8 bg-gradient-to-r from-[#0d1428] to-transparent" />
        <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-16 bg-gradient-to-l from-[#0d1428] to-transparent" />

        <div
          ref={trackRef}
          className="flex gap-4 overflow-x-auto px-5 pb-5 sm:px-8"
          style={{ scrollbarWidth: 'none', WebkitOverflowScrolling: 'touch' }}
          onMouseDown={onMouseDown}
          onMouseMove={onMouseMove}
          onMouseUp={stopDrag}
          onMouseLeave={stopDrag}
        >
          {speakers.map((speaker) => (
            <div
              key={speaker.id}
              className="w-[268px] shrink-0 snap-start sm:w-[290px]"
            >
              <InstructorCard speaker={speaker} />
            </div>
          ))}
          <div className="w-3 shrink-0" aria-hidden="true" />
        </div>

        <p className="mt-3 text-center font-mono text-[10px] tracking-[0.22em] text-paper/30">
          ← 左右滑動瀏覽 →
        </p>
      </div>

      {/* Desktop — 4-column grid */}
      <div className="section-shell hidden lg:grid lg:grid-cols-4 lg:gap-5">
        {speakers.map((speaker) => (
          <InstructorCard key={speaker.id} speaker={speaker} />
        ))}
      </div>
    </section>
  );
}
