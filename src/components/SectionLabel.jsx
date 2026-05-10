export default function SectionLabel({ no, en, zh, colorClass = 'text-sunset' }) {
  return (
    <div className="mb-7 flex flex-wrap items-baseline gap-x-3 gap-y-2 font-mono sm:gap-x-4">
      <span className={`text-[11px] tracking-[0.2em] ${colorClass}`}>// {no}</span>
      <span className="text-[11px] tracking-[0.25em] text-paper/55">{en}</span>
      <span className="h-px flex-1 bg-gradient-to-r from-paper/20 to-transparent" />
      <span className="font-serifjp text-[13px] tracking-[0.18em] text-paper/70 sm:tracking-[0.3em]">{zh}</span>
    </div>
  );
}
