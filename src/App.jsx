import React, { useEffect, useMemo, useState } from 'react';

const navItems = ['關於', '課程', '課表', '團隊', '成果'];

const courseItems = [
  { tag: 'PROMPT', title: 'Prompt 工程', desc: '從基礎句法到進階思考流程，建立你的第一套對話模板。', icon: '✦' },
  { tag: 'AGENT', title: 'AI Agent 實作', desc: '理解 agent 架構，動手讓模型擁有明確的任務行動力。', icon: '◉' },
  { tag: 'TOOLS', title: '工具整合', desc: '串接 API、檢索增強與外部記憶，讓 agent 真的能做事。', icon: '◐' },
  { tag: 'HACK', title: '黑客松實戰', desc: '組隊、發想、實作、Demo，一個夜晚誕生你的作品。', icon: '◈' },
];

const scheduleDays = [
  {
    day: 'DAY 01',
    date: '07 / 02',
    week: '週四',
    items: [
      ['09:00', '報到 · 開幕式', 'open'],
      ['10:00', 'AI 與 Prompt 啟蒙', 'class'],
      ['14:00', 'Prompt 基礎工作坊', 'class'],
      ['16:00', '小組破冰', 'soft'],
      ['19:30', '夜間遊戲時間', 'fun'],
    ],
  },
  {
    day: 'DAY 02',
    date: '07 / 03',
    week: '週五',
    items: [
      ['09:00', 'Agent 架構導論', 'class'],
      ['14:00', 'Tool Use 工作坊', 'class'],
      ['16:00', '進階 Prompt Pattern', 'class'],
      ['19:00', '營隊晚會 · 大地遊戲', 'fun'],
    ],
  },
  {
    day: 'DAY 03',
    date: '07 / 04',
    week: '週六',
    items: [
      ['09:00', '黑客松開幕 · 主題發佈', 'hack'],
      ['10:00', '組隊發想', 'hack'],
      ['14:00', 'Hacking · 全日', 'hack'],
      ['22:00', '通宵開發（自由）', 'hack'],
    ],
  },
  {
    day: 'DAY 04',
    date: '07 / 05',
    week: '週日',
    items: [
      ['09:00', 'Hacking 收尾', 'hack'],
      ['13:00', '成果發表', 'demo'],
      ['15:30', '頒獎 · 結業式', 'open'],
      ['17:00', '賦歸', 'soft'],
    ],
  },
];

const tagStyles = {
  class: ['課程', 'bg-amber/15 text-amber'],
  hack: ['黑客松', 'bg-sunset/15 text-sunset'],
  fun: ['活動', 'bg-mist-pink/15 text-mist-pink'],
  open: ['儀式', 'bg-solar/15 text-solar'],
  soft: ['休息', 'bg-paper/10 text-paper/50'],
  demo: ['Demo', 'bg-amber/15 text-amber'],
};

function getRouteFromHash() {
  const hash = decodeURIComponent(window.location.hash.slice(1));

  if (hash === '/course') return { page: 'course' };
  if (hash === '/team') return { page: 'team' };
  if (hash.startsWith('/home/')) return { page: 'home', section: hash.replace('/home/', '') };
  if (hash && !hash.startsWith('/')) return { page: 'home', section: hash };

  return { page: 'home' };
}

function useHashRoute() {
  const [route, setRoute] = useState(getRouteFromHash);

  useEffect(() => {
    const handleHashChange = () => setRoute(getRouteFromHash());
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  return route;
}

function StarDust() {
  return <div className="star-dust pointer-events-none absolute inset-0 opacity-60" />;
}

function SectionLabel({ no, en, zh, colorClass = 'text-sunset' }) {
  return (
    <div className="mb-7 flex flex-wrap items-baseline gap-3 font-mono sm:gap-4">
      <span className={`text-[11px] tracking-[0.2em] ${colorClass}`}>// {no}</span>
      <span className="text-[11px] tracking-[0.25em] text-paper/55">{en}</span>
      <span className="h-px flex-1 bg-gradient-to-r from-paper/20 to-transparent" />
      <span className="font-serifjp text-[13px] tracking-[0.18em] text-paper/70 sm:tracking-[0.3em]">{zh}</span>
    </div>
  );
}

function TopNav() {
  return (
    <nav className="mobile-compact-nav fixed left-1/2 top-4 z-50 flex -translate-x-1/2 items-center gap-3 whitespace-nowrap rounded-full border border-paper/15 bg-ink/60 px-3 py-2.5 font-sansjp text-[11px] tracking-[0.08em] text-paper/90 shadow-2xl backdrop-blur-xl sm:top-6 sm:gap-5 sm:px-6 sm:text-xs sm:tracking-[0.12em]">
      <a href="#/" className="font-serifjp text-sm font-bold tracking-widest text-sunset">
        SCAICT
      </a>
      <span className="hidden h-3.5 w-px bg-paper/20 sm:block" />
      <div className="hidden gap-5 sm:flex">
        {navItems.map((item) => (
          <a key={item} href={`#/home/${item}`} className="transition hover:text-amber">
            {item}
          </a>
        ))}
      </div>
      <a href="#/home/報名" className="rounded-full bg-sunset px-3 py-1.5 font-semibold text-ink transition hover:bg-amber sm:px-3.5">
        立即報名
      </a>
    </nav>
  );
}

function LoadingScreen({ onDone }) {
  const [phase, setPhase] = useState(0);
  const [typed, setTyped] = useState('');
  const text = useMemo(
    () => ['> initializing scaict.agent', '> loading prompt.engine...', '> connecting to summer 2026', '✓ ready'].join('\n'),
    [],
  );

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
  }, [onDone, phase, loadingText]);

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

function Hero() {
  return (
    <section className="relative min-h-[720px] overflow-hidden text-paper lg:h-screen">
      <div className="hero-glow pointer-events-none absolute -inset-x-10 -top-10 -bottom-56" />
      <StarDust />
      <div className="responsive-orb absolute -left-48 -top-32 h-[360px] w-[360px] rounded-full bg-[radial-gradient(circle_at_60%_40%,#f4a261_0%,#e8624c_45%,#b8472f_70%,transparent_100%)] sm:-left-64 sm:-top-40 sm:h-[460px] sm:w-[460px]" />
      <div className="responsive-orb pointer-events-none absolute bottom-[-12rem] right-[-24vw] h-[560px] w-[560px] rounded-full bg-[radial-gradient(circle,#d97a9a_0%,#8b6f9e_42%,transparent_76%)] opacity-22 blur-[95px] sm:bottom-[-15rem] sm:right-[-8vw] sm:h-[680px] sm:w-[min(680px,85vw)] sm:opacity-26 sm:blur-[105px]" />
      <div className="pointer-events-none absolute bottom-24 left-8 hidden font-mono text-[12px] leading-7 tracking-[0.22em] text-paper/25 md:block lg:left-14">
        <div>0 0 1</div>
        <div>1 1 0 1</div>
        <div>0 1 0</div>
        <div>1 0 0 1 0</div>
        <div>0 1 1</div>
      </div>
      <div className="pointer-events-none absolute bottom-16 left-40 hidden font-mono text-2xl text-paper/30 md:block lg:left-44">{'{ }'}</div>
      <div className="section-shell flex min-h-[720px] -translate-y-2 items-center pb-24 pt-32 sm:min-h-[760px] sm:-translate-y-4 lg:min-h-screen lg:-translate-y-8 lg:pb-20 lg:pt-28">
        <div className="relative z-10 max-w-[780px]">
          <p className="fluid-wide-tracking mb-5 font-sansjp text-[11px] font-light text-mist-pink sm:mb-6 sm:text-xs">
            SCAICT × 中興大學 · 2026 SUMMER
          </p>
          <h1 className="fluid-display whitespace-nowrap font-serifjp font-medium leading-none tracking-[0.03em] text-paper drop-shadow-[0_2px_40px_rgba(232,98,76,0.3)]">
            資<span className="text-sunset">暑</span>與你
          </h1>
          <p className="fluid-wide-tracking mt-5 whitespace-nowrap font-serifjp text-lg text-paper/70 sm:text-xl">聯 合 暑 訓</p>
          <p className="mt-9 max-w-lg text-[15px] leading-8 tracking-wide text-paper/70">
            <span className="inline-block">一場關於 <span className="text-amber">AI Agent</span> 與 <span className="text-amber">prompt</span> 的夏夜對話。</span>
            <br />
            <span className="inline-block">從零開始，學會與你的 agent 一起寫詩、寫程式、寫一個夏天。</span>
          </p>
          <div className="mt-10 flex flex-wrap gap-3 sm:mt-11 sm:gap-3.5">
            <a href="#/home/報名" className="rounded-full bg-sunset px-6 py-3.5 text-sm font-semibold tracking-[0.12em] text-ink shadow-sunset transition hover:bg-amber sm:px-8 sm:py-4 sm:tracking-[0.15em]">
              立即報名 →
            </a>
            <a href="#/course" className="rounded-full border border-paper/30 bg-paper/5 px-6 py-3.5 text-sm tracking-[0.12em] text-paper backdrop-blur transition hover:border-amber/70 sm:px-7 sm:py-4 sm:tracking-[0.15em]">
              了解課程
            </a>
          </div>
        </div>
      </div>

      <div className="absolute bottom-7 left-1/2 flex -translate-x-1/2 flex-col items-center gap-1.5 font-mono text-[10px] tracking-[0.25em] text-paper/50">
        <span>SCROLL</span>
        <span className="h-6 w-px bg-paper/40" />
      </div>
    </section>
  );
}

function AboutSCAICT() {
  return (
    <section id="關於" className="relative overflow-hidden py-28 sm:py-40 lg:py-48">
      <StarDust />
      <div className="section-shell">
        <SectionLabel no="02" en="ABOUT SCAICT" zh="關 於 中 電" />
        <div className="grid gap-14 lg:grid-cols-[1fr_1.3fr] lg:gap-20">
          <div>
            <h2 className="fluid-section-title font-serifjp font-medium leading-snug tracking-wide">
              <span className="text-sunset">S</span>tudent's
              <br />
              <span className="text-sunset">C</span>lubs
              <br />
              <span className="text-sunset">A</span>lliance of
              <br />
              <span className="text-sunset">I</span>nformation in
              <br />
              <span className="text-sunset">C</span>entral
              <br />
              <span className="text-sunset">T</span>aiwan
            </h2>
            <p className="mt-6 font-mono text-[11px] tracking-[0.2em] text-paper/45">// 中部高中電資社團聯合會議</p>
          </div>
          <div>
            <p className="font-serifjp text-[18px] leading-[1.9] tracking-wide sm:text-[22px]">
              我們是一群熱愛資訊科技的學生，
              <br />
              透過工作坊、講座與營隊，
              <br />
              把<span className="text-amber">程式</span>與<span className="text-amber">創造</span>的火種，
              <br />
              傳遞到每一個渴望學習的角落。
            </p>
            <p className="mt-7 text-sm leading-7 tracking-wide text-paper/65">
              SCAICT 中部高中電資社團聯合會議自創立以來，致力於連結中部對資訊有熱情的高中生。從過去的程式競賽、技術工作坊，到今年的暑期營隊，我們相信好的學習從一個夏天的相遇開始。
            </p>
            <div className="mt-10 flex flex-wrap gap-8">
              {[
                ['20+', 'YEARS', '深耕資訊教育'],
                ['500+', 'ALUMNI', '校友遍佈業界'],
                ['60', 'SUMMER 2026', '今夏與你相遇'],
              ].map(([number, label, zh]) => (
                <div key={label} className="border-l-2 border-sunset pl-4">
                  <div className="font-serifjp text-4xl font-semibold">{number}</div>
                  <div className="mt-1 font-mono text-[10px] tracking-[0.2em] text-amber">{label}</div>
                  <div className="mt-0.5 text-xs text-paper/60">{zh}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Course() {
  return (
    <section id="課程" className="relative py-28 sm:py-40">
      <div className="absolute -top-48 left-[40%] h-[500px] w-[700px] bg-[radial-gradient(ellipse,rgba(244,162,97,0.10),transparent_70%)] blur-[80px]" />
      <div className="section-shell">
        <SectionLabel no="03" en="ABOUT THE COURSE" zh="關 於 課 程" colorClass="text-amber" />
        <div className="mb-16 grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <h2 className="fluid-section-title font-serifjp font-medium leading-tight tracking-[0.06em] sm:tracking-[0.08em]">
            四 天 ，
            <br />
            與 <span className="text-sunset">Agent</span>
            <br />
            一起寫一個夏天。
          </h2>
          <div className="space-y-4 text-[15px] leading-8 text-paper/70">
            <p>我們把 AI Agent 這個快速演化的領域，拆成了你能消化的尺寸。從一個 prompt 開始，到能自主完成任務的 agent，再到一個能 demo 的小作品。</p>
            <p className="text-paper/60">不需要背景。只需要一台筆電、好奇心，和一個夏天。</p>
          </div>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {courseItems.map((item, index) => (
            <article key={item.tag} className="glass relative min-h-52 overflow-hidden rounded-2xl bg-night-deep/50 p-6">
              <div className="absolute -right-5 -top-6 font-serifjp text-7xl text-sunset/20">{item.icon}</div>
              <div className="mb-4 font-mono text-[10px] tracking-[0.25em] text-amber">// {String(index + 1).padStart(2, '0')} · {item.tag}</div>
              <h3 className="mb-3 font-serifjp text-[22px] font-semibold tracking-widest">{item.title}</h3>
              <p className="text-[13px] leading-6 text-paper/65">{item.desc}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Schedule() {
  return (
    <section id="課表" className="relative py-28 sm:py-40">
      <div className="absolute -top-40 right-[15%] h-[400px] w-[600px] bg-[radial-gradient(ellipse,rgba(232,98,76,0.12),transparent_70%)] blur-[90px]" />
      <div className="section-shell">
        <SectionLabel no="04" en="SCHEDULE" zh="課 表" />
        <div className="mb-12 flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <h2 className="fluid-section-title font-serifjp font-medium leading-snug tracking-[0.06em] sm:tracking-[0.08em]">
            四 天 三 夜 ，
            <br />
            <span className="text-3xl text-amber">從 prompt 到 hackathon。</span>
          </h2>
          <div className="flex flex-wrap gap-4 font-mono text-[11px] text-paper/60">
            {Object.entries(tagStyles).map(([key, [label, className]]) => (
              <span key={key} className="flex items-center gap-1.5">
                <span className={`h-2 w-2 rounded-full ${className.split(' ')[0]}`} />
                {label}
              </span>
            ))}
          </div>
        </div>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {scheduleDays.map((day) => (
            <article key={day.day} className="glass rounded-[18px] p-5">
              <div className="mb-1 flex items-baseline justify-between">
                <span className="font-mono text-[11px] tracking-[0.2em] text-sunset">{day.day}</span>
                <span className="font-serifjp text-xs text-paper/55">{day.week}</span>
              </div>
              <div className="mb-5 font-serifjp text-3xl font-semibold tracking-widest">{day.date}</div>
              <div className="flex flex-col gap-3.5">
                {day.items.map(([time, title, tag], index) => (
                  <div key={`${time}-${title}`} className={index === 0 ? '' : 'border-t border-paper/10 pt-3'}>
                    <div className="mb-1 flex items-center justify-between">
                      <span className="font-mono text-[11px] text-paper/60">{time}</span>
                      <span className={`rounded-full px-2 py-0.5 font-mono text-[9px] tracking-wider ${tagStyles[tag][1]}`}>{tagStyles[tag][0]}</span>
                    </div>
                    <div className="font-serifjp text-[14.5px] leading-6 tracking-wide">{title}</div>
                  </div>
                ))}
              </div>
            </article>
          ))}
        </div>
        <p className="mt-8 text-center font-mono text-[11px] text-paper/50">
          ※ 詳細課表與講師資訊，請見 <a className="text-amber underline" href="#/course">課程內容頁</a>
        </p>
      </div>
    </section>
  );
}

function Team() {
  const members = [
    ['A.K.', '總 召', '○○○', 'Chief', '一個夏天能改變一個人，這是我四年前在 SCAICT 學到的事。希望這個夏天，我們也能成為你故事的一部分。'],
    ['M.S.', '副召 · 學術', '○○○', 'Vice · Academic', '把難的東西教成你能聽懂的故事。'],
    ['Y.L.', '副召 · 行政', '○○○', 'Vice · Operations', '從報到到賦歸，每個細節都是溫度。'],
  ];

  return (
    <section id="團隊" className="relative py-28 sm:py-40">
      <StarDust />
      <div className="section-shell">
        <SectionLabel no="05" en="TEAM · CORE" zh="總 召 組" colorClass="text-mist-pink" />
        <div className="mb-14 flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
          <h2 className="fluid-section-title font-serifjp font-medium leading-snug tracking-[0.06em] sm:tracking-[0.08em]">
            把這個夏天，
            <br />
            <span className="text-mist-pink">交給三個人。</span>
          </h2>
          <a href="#/team" className="w-fit rounded-full border border-amber/40 px-5 py-2.5 font-mono text-[11px] tracking-[0.2em] text-amber">
            view full team →
          </a>
        </div>
        <div className="grid gap-5 lg:grid-cols-[1.5fr_1fr_1fr]">
          {members.map(([tag, role, name, en, word], index) => (
            <article key={tag} className={`glass rounded-[22px] p-6 ${index === 0 ? 'lg:p-8' : ''}`}>
              <div className={`${index === 0 ? 'sm:flex sm:items-start sm:gap-6' : ''}`}>
                <div className={`${index === 0 ? 'h-36 w-36' : 'h-24 w-24'} mb-5 shrink-0 overflow-hidden rounded-full border-2 border-paper/20 bg-[radial-gradient(circle_at_60%_40%,#f4a261_0%,#e8624c_50%,#b8472f_80%,#2a1f3e_100%)]`}>
                  <div className="flex h-full items-end justify-center bg-[repeating-linear-gradient(180deg,transparent_0,transparent_18px,rgba(13,20,40,0.5)_18px,rgba(13,20,40,0.5)_20px)] pb-2 font-mono text-[9px] tracking-[0.2em]">
                    {tag}
                  </div>
                </div>
                <div>
                  <div className="mb-1.5 font-mono text-[10px] tracking-[0.25em] text-sunset">// {index === 0 ? 'summer.lead()' : 'team.member()'}</div>
                  <div className="mb-1 font-serifjp text-sm tracking-[0.25em] text-amber">{role}</div>
                  <h3 className={`${index === 0 ? 'text-4xl' : 'text-3xl'} font-serifjp font-semibold tracking-widest`}>{name}</h3>
                  <div className="mt-1 text-[11px] tracking-wider text-paper/55">{en}</div>
                </div>
              </div>
              <p className="mt-6 border-l-2 border-sunset pl-4 font-serifjp text-[15px] leading-8 tracking-wide text-paper/80">「{word}」</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Showcase() {
  return (
    <section id="成果" className="relative py-28 sm:py-40">
      <div className="section-shell">
        <SectionLabel no="06" en="STUDENT WORKS" zh="學 員 作 品" colorClass="text-amber" />
        <div className="mb-14 grid items-center gap-10 lg:grid-cols-[1fr_1.5fr]">
          <h2 className="fluid-section-title font-serifjp font-medium leading-snug tracking-[0.06em] sm:tracking-[0.08em]">
            尚未誕生的
            <br />
            <span className="text-amber">夏 之 作 品。</span>
          </h2>
          <p className="text-[14.5px] leading-8 tracking-wide text-paper/70">
            這個區塊保留給尚未到來的學員。
            <br />
            他們的 prompt、agent、夏夜熬出來的 demo，會在 7 月之後，在這裡綻放。
            <br />
            <span className="text-xs text-paper/45">// 敬請期待 · coming summer 2026</span>
          </p>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {[1, 2, 3].map((number) => (
            <div key={number} className="relative grid aspect-[4/3] place-items-center overflow-hidden rounded-2xl border border-dashed border-paper/20 bg-paper/[0.03] font-mono text-[11px] tracking-[0.2em] text-paper/35">
              <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(245,232,212,0.15)_1px,transparent_1.5px)] opacity-50 [background-size:14px_14px]" />
              <div className="relative text-center">
                <div className="mb-2 text-2xl text-sunset/50">◯</div>
                <div>WORK · 0{number}</div>
                <div className="mt-1 text-[9px] opacity-60">// 待解鎖</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function PageIntro({ label, title, children }) {
  return (
    <header className="relative overflow-hidden pb-16 pt-36 sm:pt-44">
      <StarDust />
      <div className="subpage-hero-bg pointer-events-none absolute inset-0" />
      <div className="section-shell">
        <a href="#/" className="mb-8 inline-flex rounded-full border border-paper/20 px-4 py-2 font-mono text-[11px] tracking-[0.2em] text-paper/60 transition hover:border-amber/60 hover:text-amber">
          ← BACK HOME
        </a>
        <div className="mb-5 font-mono text-[11px] tracking-[0.28em] text-amber">// {label}</div>
        <h1 className="fluid-page-title max-w-3xl font-serifjp font-medium leading-tight tracking-[0.06em] sm:tracking-[0.08em]">{title}</h1>
        <p className="mt-7 max-w-2xl text-[15px] leading-8 tracking-wide text-paper/68">{children}</p>
      </div>
    </header>
  );
}

function CourseDetailPage() {
  return (
    <main className="subpage-shell relative overflow-hidden">
      <PageIntro label="COURSE DETAIL" title="課程內容頁">
        從 prompt 的語意設計，到 agent 的任務拆解、工具調用與 demo 打磨。這裡整理更完整的課程輪廓，讓你在報名前先知道四天會如何推進。
      </PageIntro>
      <section className="relative pb-28">
        <div className="subpage-body-glow pointer-events-none absolute inset-0" />
        <div className="section-shell">
          <div className="grid gap-5 md:grid-cols-2">
            {courseItems.map((item, index) => (
              <article key={item.tag} className="glass rounded-[18px] bg-night-deep/45 p-6">
                <div className="mb-4 font-mono text-[10px] tracking-[0.25em] text-amber">// MODULE {String(index + 1).padStart(2, '0')}</div>
                <div className="mb-2 text-sm font-semibold tracking-[0.2em] text-sunset">{item.tag}</div>
                <h2 className="mb-4 font-serifjp text-[22px] font-semibold tracking-wide sm:tracking-widest">{item.title}</h2>
                <p className="text-sm leading-7 text-paper/65">{item.desc}</p>
              </article>
            ))}
          </div>
          <div className="mt-12 grid gap-4 lg:grid-cols-4">
            {scheduleDays.map((day) => (
              <article key={day.day} className="rounded-[16px] border border-paper/10 bg-paper/[0.035] p-5">
                <div className="font-mono text-[11px] tracking-[0.2em] text-sunset">{day.day}</div>
                <div className="mb-4 mt-1 font-serifjp text-3xl font-semibold">{day.date}</div>
                <div className="space-y-3">
                  {day.items.map(([time, title]) => (
                    <div key={`${day.day}-${time}-${title}`} className="border-t border-paper/10 pt-3">
                      <div className="mb-1 font-mono text-[11px] text-paper/45">{time}</div>
                      <div className="text-sm leading-6 text-paper/75">{title}</div>
                    </div>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

function TeamDetailPage() {
  const members = [
    ['A.K.', '總召', '○○○', 'Chief Organizer', '營隊方向、流程節奏與最後成果發表。'],
    ['M.S.', '副召 · 學術', '○○○', 'Academic Lead', '課程設計、講師協調與技術內容品質。'],
    ['Y.L.', '副召 · 行政', '○○○', 'Operations Lead', '報到、住宿、場務、動線與學員照顧。'],
    ['T.C.', '課程組', '○○○', 'Curriculum', '把 AI Agent 拆成可以實作的課程任務。'],
    ['H.W.', '活動組', '○○○', 'Program', '夏夜活動、破冰與團隊合作。'],
    ['P.R.', '設計組', '○○○', 'Design', '視覺、文案與現場識別系統。'],
  ];

  return (
    <main className="subpage-shell relative overflow-hidden">
      <PageIntro label="FULL TEAM" title="完整團隊">
        一個營隊不是只有課表。真正讓四天三夜順利運作的，是課程、行政、活動、設計與現場支援一起把細節接起來。
      </PageIntro>
      <section className="relative pb-28">
        <div className="subpage-body-glow pointer-events-none absolute inset-0" />
        <div className="section-shell grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {members.map(([tag, role, name, en, desc]) => (
            <article key={`${tag}-${role}`} className="glass rounded-[18px] bg-night-deep/45 p-6">
              <div className="mb-5 flex h-24 w-24 items-end justify-center rounded-full border border-paper/20 bg-[radial-gradient(circle_at_60%_40%,#f4a261_0%,#e8624c_48%,#2a1f3e_100%)] pb-2 font-mono text-[9px] tracking-[0.2em]">
                {tag}
              </div>
              <div className="mb-1 font-serifjp text-sm tracking-[0.25em] text-amber">{role}</div>
              <h2 className="font-serifjp text-2xl font-semibold tracking-wide sm:text-3xl sm:tracking-widest">{name}</h2>
              <div className="mt-1 font-mono text-[10px] tracking-[0.18em] text-paper/45">{en}</div>
              <p className="mt-5 border-l-2 border-sunset pl-4 text-sm leading-7 text-paper/68">{desc}</p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}

function Footer() {
  return (
    <footer id="報名" className="relative w-full overflow-hidden border-t border-paper/10 bg-[#070b16] pb-8 pt-20 sm:pt-24">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-paper/[0.035] to-transparent" />
      <div className="absolute -bottom-72 left-1/2 h-[600px] w-[600px] -translate-x-1/2 rounded-full bg-sunset/25 blur-[80px]" />
      <div className="section-shell">
        <div className="mb-9 grid gap-8 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1fr]">
          <div>
            <div className="mb-2 font-serifjp text-2xl font-semibold tracking-[0.1em] sm:text-3xl sm:tracking-[0.15em]">
              資<span className="text-sunset">暑</span>與你
            </div>
            <div className="mb-5 font-mono text-[11px] tracking-[0.2em] text-paper/50">SCAICT × NCHU · SUMMER 2026</div>
            <p className="max-w-xs text-sm leading-7 text-paper/60">夏夜，星光，與你的第一個 AI Agent。</p>
          </div>
          {[
            ['頁面', [['首頁', '#/'], ['關於課程', '#/home/關於'], ['課表', '#/home/課表'], ['團隊', '#/home/團隊']]],
            ['深入', [['課程內容', '#/course'], ['完整團隊', '#/team'], ['過往活動', '#/home/成果']]],
            ['聯絡', [['KKTIX 報名', '#/home/報名'], ['scaict@email', 'mailto:'], ['Instagram', '#'], ['Facebook', '#']]],
          ].map(([title, links]) => (
            <div key={title}>
              <div className="mb-4 font-mono text-[10px] tracking-[0.25em] text-amber">// {title}</div>
              <div className="flex flex-col gap-2.5">
                {links.map(([label, href]) => (
                  <a key={label} href={href} className="font-serifjp text-sm tracking-wide text-paper/75 transition hover:text-amber">
                    {label}
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className="flex flex-col justify-between gap-3 border-t border-paper/10 pt-5 font-mono text-[10.5px] tracking-wider text-paper/40 sm:flex-row">
          <span>© 2026 SCAICT 中華民國全國大專電子計算機研習會</span>
          <span>{'> '}built with prompts &amp; sunsets</span>
        </div>
      </div>
    </footer>
  );
}

export default function App() {
  const [loaded, setLoaded] = useState(false);
  const route = useHashRoute();

  useEffect(() => {
    if (route.page !== 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    window.setTimeout(() => {
      if (!route.section) {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }

      document.getElementById(route.section)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 40);
  }, [route.page, route.section]);

  return (
    <>
      {!loaded && <LoadingScreen onDone={() => setLoaded(true)} />}
      <TopNav />
      {route.page === 'course' ? (
        <CourseDetailPage />
      ) : route.page === 'team' ? (
        <TeamDetailPage />
      ) : (
        <>
          <Hero />
          <AboutSCAICT />
          <Course />
          <Schedule />
          <Team />
          <Showcase />
        </>
      )}
      <Footer />
    </>
  );
}
