export default function SectionLabel({ no, en, zh, colorClass = 'text-sunset' }) {
  return (
    <div className="mb-7 grid grid-cols-[auto_1fr] items-baseline gap-x-3 gap-y-2 font-mono sm:flex sm:flex-wrap sm:gap-x-4">
      <span className={`text-[11px] tracking-[0.2em] ${colorClass}`}>// {no}</span>
      <span className="min-w-0 break-words text-[11px] tracking-[0.18em] text-paper/55 sm:tracking-[0.25em]">{en}</span>
      <span className="col-span-2 font-serifjp text-[13px] tracking-[0.18em] text-paper/70 sm:col-span-1 sm:tracking-[0.3em]">{zh}</span>
    </div>
  );
}
