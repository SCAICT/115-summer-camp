import { useEffect, useMemo, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

const DEFAULT_SCHEDULE = {
  startTime: '08:00',
  endTime: '20:00',
  pxPerMin: 1,
  days: [],
};

const EVENT_STYLES = [
  {
    match: /課程|講座|分享|說明|實作|部署|RAG|AI|Bot|Python|Discord|LLM/,
    cardClass: 'border-amber/45 bg-amber/15 text-paper',
    badgeClass: 'border-amber/45 bg-amber/20 text-amber',
  },
  {
    match: /早餐|午餐|晚餐/,
    cardClass: 'border-paper/25 bg-paper/8 text-paper/90',
    badgeClass: 'border-paper/25 bg-paper/10 text-paper/75',
  },
  {
    match: /破冰|遊戲|晚會|攤位|活動|開訓|賦歸/,
    cardClass: 'border-mist-pink/45 bg-mist-pink/16 text-paper',
    badgeClass: 'border-mist-pink/45 bg-mist-pink/22 text-mist-pink',
  },
  {
    match: /黑客松|成果|頒獎|閉幕|衝刺/,
    cardClass: 'border-sunset/50 bg-sunset/15 text-paper',
    badgeClass: 'border-sunset/50 bg-sunset/20 text-sunset',
  },
];

const toMinutes = (timeString) => {
  const [hour, minute] = timeString.split(':').map(Number);
  return hour * 60 + minute;
};

const formatHour = (totalMinutes) => {
  const hour = Math.floor(totalMinutes / 60);
  return `${String(hour).padStart(2, '0')}:00`;
};

const getEventStyle = (title = '') => EVENT_STYLES.find((item) => item.match.test(title)) ?? EVENT_STYLES[0];

const getDayMeta = (label = '') => {
  const match = label.match(/(\d+)/);
  return {
    number: match ? match[1] : null,
    label,
  };
};

const hasEventDetails = (event) =>
  Boolean(event && (event.description || event.speaker || event.link || event.speakerBio || event.speakerAvatar || event.location));

export default function ScheduleGrid() {
  const [schedule, setSchedule] = useState(DEFAULT_SCHEDULE);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showScrollHint, setShowScrollHint] = useState(false);
  const [scrollHintOpacity, setScrollHintOpacity] = useState(1);
  const [avatarBroken, setAvatarBroken] = useState(false);
  const modalRef = useRef(null);

  const closeModal = () => {
    setIsModalOpen(false);
    window.setTimeout(() => {
      setSelectedEvent(null);
      setAvatarBroken(false);
    }, 260);
  };

  useEffect(() => {
    fetch('/data/schedule.json')
      .then((res) => res.json())
      .then((data) => setSchedule({ ...DEFAULT_SCHEDULE, ...data }))
      .catch(() => setSchedule(DEFAULT_SCHEDULE));
  }, []);

  useEffect(() => {
    if (!selectedEvent) return;
    setIsModalOpen(true);
    setAvatarBroken(false);

    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        closeModal();
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [selectedEvent]);

  useEffect(() => {
    if (!selectedEvent) return undefined;

    const root = document.documentElement;
    const lenis = typeof window !== 'undefined' ? window.__lenis : null;
    const lenisScroll = lenis && typeof lenis.scroll === 'number' ? lenis.scroll : undefined;
    const scrollY = lenisScroll !== undefined ? lenisScroll : window.scrollY || root.scrollTop || 0;

    const previousBodyOverflow = document.body.style.overflow;
    const previousRootOverflow = root.style.overflow;

    document.body.style.overflow = 'hidden';
    root.style.overflow = 'hidden';

    if (lenis && typeof lenis.stop === 'function') {
      lenis.stop();
    }

    return () => {
      document.body.style.overflow = previousBodyOverflow;
      root.style.overflow = previousRootOverflow;

      if (lenis && typeof lenis.start === 'function') {
        lenis.start();
      }

      if (lenis && typeof lenis.scrollTo === 'function') {
        lenis.scrollTo(scrollY, { immediate: true });
      } else {
        window.scrollTo(0, scrollY);
      }
    };
  }, [selectedEvent]);

  useEffect(() => {
    if (!selectedEvent) return;
    const modalEl = modalRef.current;
    if (!modalEl) return;

    const updateHint = () => {
      const overflow = modalEl.scrollHeight - modalEl.clientHeight;
      const canScroll = overflow > 64;
      const atTop = modalEl.scrollTop <= 2;
      setShowScrollHint(canScroll);
      setScrollHintOpacity(canScroll && atTop ? 1 : 0);
    };

    let rafOne = 0;
    let rafTwo = 0;

    rafOne = requestAnimationFrame(() => {
      updateHint();
      rafTwo = requestAnimationFrame(updateHint);
    });

    const onScroll = () => {
      const overflow = modalEl.scrollHeight - modalEl.clientHeight;
      if (overflow <= 64) {
        setShowScrollHint(false);
        setScrollHintOpacity(0);
        return;
      }

      const nextOpacity = Math.max(0, Math.min(1, 1 - modalEl.scrollTop / 120));
      setScrollHintOpacity(nextOpacity);
    };

    modalEl.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', updateHint);

    return () => {
      modalEl.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', updateHint);
      if (rafOne) cancelAnimationFrame(rafOne);
      if (rafTwo) cancelAnimationFrame(rafTwo);
    };
  }, [selectedEvent, isModalOpen]);

  const { startMinutes, endMinutes, pxPerMin, hourSlots, columnHeight, hourSlotHeight } = useMemo(() => {
    const startMinutesValue = toMinutes(schedule.startTime);
    const endMinutesValue = toMinutes(schedule.endTime);
    const pixelPerMinute = Number(schedule.pxPerMin) || 1;

    const slots = [];
    for (let minute = startMinutesValue; minute <= endMinutesValue; minute += 60) {
      slots.push(minute);
    }

    return {
      startMinutes: startMinutesValue,
      endMinutes: endMinutesValue,
      pxPerMin: pixelPerMinute,
      hourSlots: slots,
      columnHeight: (endMinutesValue - startMinutesValue) * pixelPerMinute,
      hourSlotHeight: 60 * pixelPerMinute,
    };
  }, [schedule.endTime, schedule.pxPerMin, schedule.startTime]);

  if (!schedule.days.length) {
    return null;
  }

  return (
    <>
      <div className="overflow-hidden rounded-[24px] border border-paper/15 bg-night-deep/60 shadow-[0_20px_45px_rgba(0,0,0,0.35)] backdrop-blur-frost">
        <div className="flex gap-0">
          <div className="flex shrink-0 flex-col border-r border-paper/15">
            <div className="flex items-center justify-center border-b border-paper/15 bg-ink/65 font-mono text-[12px] tracking-[0.22em] text-paper/55" style={{ height: '96px', width: '82px' }}>
              TIME
            </div>
            {hourSlots.map((slot) => (
              <div
                key={slot}
                className="flex shrink-0 items-center justify-end border-b border-paper/10 bg-ink/65 pr-2.5 font-mono text-[11px] text-paper/55"
                style={{ height: `${hourSlotHeight}px`, width: '82px' }}
              >
                {formatHour(slot)}
              </div>
            ))}
          </div>

          <div className="flex-1 overflow-x-auto">
            <div style={{ minWidth: `${Math.max(860, schedule.days.length * 170)}px` }}>
              <div
                className="grid border-paper/15"
                style={{ gridTemplateColumns: `repeat(${schedule.days.length}, minmax(0, 1fr))` }}
              >
                {schedule.days.map((day) => {
                  const meta = getDayMeta(day.day);
                  return (
                    <div
                      key={`${day.day}-head`}
                      className="flex min-h-[96px] flex-col items-center justify-center border-b border-r border-paper/15 bg-gradient-to-b from-paper/6 via-paper/4 to-transparent px-2 text-center"
                    >
                      {meta.number ? (
                        <>
                          <div className="font-mono text-[12px] tracking-[0.2em] text-paper/45">DAY</div>
                          <div className="font-serifjp text-4xl font-semibold tracking-widest text-paper">{meta.number}</div>
                        </>
                      ) : (
                        <div className="font-serifjp text-2xl font-semibold tracking-wide text-paper">{meta.label}</div>
                      )}
                      {day.date ? <div className="mt-0.5 text-sm text-paper/55">{day.date}</div> : null}
                    </div>
                  );
                })}

                {schedule.days.map((day) => (
                  <div
                    key={day.day}
                    className="relative border-r border-paper/15"
                    style={{
                      height: `${columnHeight}px`,
                      backgroundColor: 'rgba(10, 14, 30, 0.66)',
                      backgroundImage: `linear-gradient(to bottom, transparent ${hourSlotHeight - 1}px, rgba(245,232,212,0.12) ${hourSlotHeight}px)`,
                      backgroundSize: `100% ${hourSlotHeight}px`,
                    }}
                  >
                    {day.events.map((event) => {
                      const start = toMinutes(event.start);
                      const end = toMinutes(event.end);
                      const top = (start - startMinutes) * pxPerMin;
                      const height = (end - start) * pxPerMin;
                      const gap = 10;
                      const adjustedHeight = Math.max(height - gap, 26);
                      const adjustedTop = top + gap / 2;
                      const style = getEventStyle(event.title);
                      const isClickable = hasEventDetails(event);

                      return (
                        <div
                          key={`${day.day}-${event.start}-${event.title}`}
                          role={isClickable ? 'button' : 'presentation'}
                          tabIndex={isClickable ? 0 : -1}
                          onClick={() => isClickable && setSelectedEvent({ ...event, day: day.day })}
                          onKeyDown={(eventKey) => {
                            if (isClickable && (eventKey.key === 'Enter' || eventKey.key === ' ')) {
                              eventKey.preventDefault();
                              setSelectedEvent({ ...event, day: day.day });
                            }
                          }}
                          className={`absolute left-1.5 right-1.5 rounded-xl border px-2 py-2 shadow-sm backdrop-blur-sm transition duration-200 ${style.cardClass} ${
                            isClickable ? 'cursor-pointer hover:scale-[1.01] hover:opacity-90 hover:shadow-lg' : 'cursor-default opacity-90'
                          }`}
                          style={{ top: `${adjustedTop}px`, height: `${adjustedHeight}px` }}
                        >
                          <div className="relative flex h-full flex-col items-center justify-center overflow-hidden text-center">
                            <span className={`font-semibold leading-tight tracking-wide ${adjustedHeight < 44 ? 'truncate text-[12px] w-full' : 'text-[15px] sm:text-base'}`}>{event.title}</span>
                            {isClickable && adjustedHeight >= 44 ? (
                              <span className={`absolute bottom-0.5 right-0.5 rounded-full border px-1.5 py-0.5 font-mono text-[9.5px] tracking-[0.12em] ${style.badgeClass}`}>
                                INFO
                              </span>
                            ) : null}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {selectedEvent && typeof document !== 'undefined'
        ? createPortal(
            <div
              aria-modal="true"
              role="dialog"
              className="fixed inset-0 z-[120] flex items-center justify-center p-4"
              onClick={closeModal}
            >
              <div
                className={`absolute inset-0 bg-ink/80 backdrop-blur-[3px] transition-opacity duration-300 ${
                  isModalOpen ? 'opacity-100' : 'opacity-0'
                }`}
              />

              <div
                className={`relative z-10 w-full max-w-[880px] rounded-[28px] border border-paper/20 bg-gradient-to-br from-ink to-night-deep shadow-[0_30px_80px_rgba(0,0,0,0.5)] transition-all duration-300 ${
                  isModalOpen ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
                }`}
                onClick={(event) => event.stopPropagation()}
              >
                <div
                  ref={modalRef}
                  className="modal-scroll max-h-[82vh] overflow-y-auto px-6 py-7 sm:px-9 sm:py-9"
                  style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                >
                  <div className="mb-7 flex items-start justify-between gap-6">
                    <div>
                      <h3 className="font-serifjp text-3xl font-semibold leading-tight tracking-wide text-paper sm:text-4xl">{selectedEvent.title}</h3>
                      <div className="mt-4 flex flex-wrap items-center gap-2 text-sm text-paper/65">
                        <span>{selectedEvent.day}</span>
                        {selectedEvent.start && selectedEvent.end ? <span className="text-paper/40">•</span> : null}
                        {selectedEvent.start && selectedEvent.end ? <span>{`${selectedEvent.start} - ${selectedEvent.end}`}</span> : null}
                      </div>
                      {selectedEvent.location ? <div className="mt-1 text-sm text-paper/50">{selectedEvent.location}</div> : null}
                    </div>

                    <button
                      type="button"
                      aria-label="Close"
                      className="rounded-full border border-paper/20 p-2 text-paper/60 transition hover:text-paper"
                      onClick={closeModal}
                    >
                      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                        <path
                          fillRule="evenodd"
                          d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </button>
                  </div>

                  {selectedEvent.description ? (
                    <div className="mb-7 border-t border-paper/15 pt-7">
                      <h4 className="mb-3 font-mono text-xs tracking-[0.2em] text-amber">COURSE BRIEF</h4>
                      <p className="leading-8 text-paper/80">{selectedEvent.description}</p>
                    </div>
                  ) : null}

                  {selectedEvent.link ? (
                    <a
                      href={selectedEvent.link}
                      target="_blank"
                      rel="noreferrer"
                      className="mb-7 inline-flex items-center gap-2 rounded-full border border-sunset/45 bg-sunset/15 px-4 py-2 text-sm text-sunset transition hover:bg-sunset/25"
                    >
                      查看課程資料
                    </a>
                  ) : null}

                  {selectedEvent.speaker || selectedEvent.speakerBio || selectedEvent.speakerAvatar ? (
                    <div className="border-t border-paper/15 pt-7">
                      <h4 className="mb-4 font-mono text-xs tracking-[0.2em] text-amber">SPEAKER</h4>
                      <div className="flex flex-col gap-5 sm:flex-row sm:items-start">
                        {!avatarBroken && selectedEvent.speakerAvatar ? (
                          <img
                            src={selectedEvent.speakerAvatar}
                            alt={selectedEvent.speaker || '講者'}
                            className="h-24 w-24 rounded-2xl border border-paper/20 object-cover"
                            onError={() => setAvatarBroken(true)}
                          />
                        ) : null}
                        <div>
                          {selectedEvent.speaker ? <p className="mb-1 text-lg text-paper">{selectedEvent.speaker}</p> : null}
                          <p className="leading-8 text-paper/75">{selectedEvent.speakerBio || '講者資訊暫無。'}</p>
                        </div>
                      </div>
                    </div>
                  ) : null}
                </div>

                {showScrollHint ? (
                  <div className="pointer-events-none absolute bottom-5 right-5" style={{ opacity: scrollHintOpacity }}>
                    <div className="rounded-full border border-paper/30 bg-ink/80 px-3 py-1.5 font-mono text-[10px] tracking-[0.16em] text-paper/70">
                      向下滑動看更多
                    </div>
                  </div>
                ) : null}
              </div>
            </div>,
            document.body
          )
        : null}
    </>
  );
}
