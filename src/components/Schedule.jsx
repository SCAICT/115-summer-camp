import { lazy, Suspense } from 'react';
import SectionLabel from './SectionLabel';

const ScheduleGrid = lazy(() => import('./ScheduleGrid'));

function ScheduleGridFallback() {
  return (
    <div className="overflow-hidden rounded-[24px] border border-paper/15 bg-night-deep/45 p-8 shadow-[0_20px_45px_rgba(0,0,0,0.35)]">
      <div className="h-[540px] rounded-xl border border-paper/10 bg-paper/[0.02]" />
    </div>
  );
}

export default function Schedule() {
  return (
    <section id="課表" className="section-unified-bg relative py-28 sm:py-40">
      <div className="absolute -top-40 right-[12%] h-[420px] w-[620px] bg-[radial-gradient(ellipse,rgba(232,98,76,0.14),transparent_70%)] blur-[95px]" />
      <div className="section-shell">
        <SectionLabel no="05" en="SCHEDULE" zh="課程活動" />

        <div className="mb-12 flex flex-col gap-7 lg:flex-row lg:items-end lg:justify-between">
          <h2 className="fluid-section-title font-serifjp font-medium leading-snug tracking-[0.06em] sm:tracking-[0.08em]">
            四天沉浸式課程
            <br />
            <span className="text-amber">從基礎到黑客松發表</span>
          </h2>
          <p className="max-w-[460px] text-[14px] leading-7 text-paper/68 sm:text-[15px]">
          </p>
        </div>

        <Suspense fallback={<ScheduleGridFallback />}>
          <ScheduleGrid />
        </Suspense>

        <p className="mt-7 text-center font-mono text-[11px] tracking-[0.16em] text-paper/50">
          點擊帶有 INFO 標記的課程可查看完整內容
        </p>
      </div>
    </section>
  );
}
