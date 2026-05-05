import { useEffect, useMemo, useState } from 'react';
import StarDust from './StarDust';

export default function LoadingScreen({ onDone }) {
  const [phase, setPhase] = useState(0);
  const [typed, setTyped] = useState('');

  const loadingText = useMemo(
    () =>
      [
        '> boot scaict.summer_camp --year 2026',
        '> scan /central-taiwan/student-clubs',
        '> load module: prompt.engine',
        '> load module: agent.workflow',
        '> mount venue: NCHU',
        '> sync schedule: 07.02 - 07.05',
        '> generate mission brief...',
        '> status: ready',
      ].join('\n'),
    [],
  );

  useEffect(() => {
    let typeTimer;
    let phaseTimer;

    if (phase === 0) {
      let i = 0;
      typeTimer = window.setInterval(() => {
        i += 2;
        setTyped(loadingText.slice(0, i));
        if (i >= loadingText.length) {
          window.clearInterval(typeTimer);
          phaseTimer = window.setTimeout(() => setPhase(1), 500);
        }
      }, 18);
    }

    if (phase === 1) phaseTimer = window.setTimeout(() => setPhase(2), 1200);
    if (phase === 2) phaseTimer = window.setTimeout(onDone, 1100);

    return () => {
      window.clearInterval(typeTimer);
      window.clearTimeout(phaseTimer);
    };
  }, [loadingText, onDone, phase]);

  return (
    <div className={`fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden bg-[#0d1428] font-mono text-paper transition-opacity duration-[900ms] ${phase === 2 ? 'opacity-0' : 'opacity-100'}`}>
      <StarDust />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_105%,rgba(244,162,97,0.30),transparent_48%),radial-gradient(ellipse_at_70%_25%,rgba(58,42,78,0.38),transparent_56%)]" />
      <div className={`absolute -bottom-40 left-1/2 h-56 w-56 -translate-x-1/2 rounded-full bg-[radial-gradient(circle,#fff7d4_0%,#f4a261_36%,#e8624c_60%,rgba(232,98,76,0.12)_78%,transparent_100%)] shadow-[0_0_180px_rgba(244,162,97,0.34)] transition-all duration-[1200ms] ease-out sm:h-72 sm:w-72 ${phase >= 1 ? '-translate-y-8 opacity-80' : 'translate-y-10 opacity-0'}`} />
      <div className={`relative z-10 max-h-[68vh] w-[min(90vw,520px)] overflow-hidden border border-paper/15 bg-night-deep/55 p-4 shadow-2xl backdrop-blur-md transition-all duration-[850ms] sm:max-h-none sm:p-5 ${phase >= 1 ? '-translate-y-3 opacity-0' : 'translate-y-0 opacity-100'}`}>
        <div className="mb-4 flex items-center justify-between border-b border-paper/10 pb-3">
          <div className="flex gap-1.5">
            <span className="h-2 w-2 rounded-full bg-sunset" />
            <span className="h-2 w-2 rounded-full bg-solar" />
            <span className="h-2 w-2 rounded-full bg-[#7eb8a0]" />
          </div>
          <span className="text-[10px] tracking-[0.22em] text-paper/45">BOOT SEQUENCE</span>
        </div>
        <pre className="min-h-[11rem] whitespace-pre-wrap text-[11.5px] leading-6 text-paper/80 sm:min-h-[16rem] sm:text-[13px] sm:leading-7">
          {typed}
          <span className="ml-1 inline-block h-3 w-2 animate-[blink-load_0.9s_infinite] bg-sunset align-middle" />
        </pre>
      </div>
      <div className={`loading-title absolute bottom-10 left-1/2 z-10 -translate-x-1/2 font-serifjp text-xl tracking-[0.35em] text-transparent transition-all duration-[900ms] sm:bottom-14 ${phase >= 1 ? 'translate-y-0 opacity-100' : 'translate-y-3 opacity-0'}`}>
        資暑與你
      </div>
    </div>
  );
}
