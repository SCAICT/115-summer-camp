import SectionLabel from './SectionLabel';

const earlyBirdDeadline = new Date('2026-05-20T23:59:59+08:00');

const earlyBirdOffer = {
  title: '早鳥優惠',
  period: '即日起～5/20',
  price: '$4,300',
  unit: '元 / 人',
  note: '無論人數皆享此優惠',
};

const ticketPlans = [
  {
    title: '1人方案',
    subtitle: '一般個人票',
    price: '$4,500',
    unit: '元 / 人',
    note: '適合單人報名者。',
  },
  {
    title: '2人方案',
    subtitle: '雙人團票',
    price: '$4,300',
    unit: '元 / 人',
    note: '與朋友一起報名即可套用。',
  },
  {
    title: '3人方案',
    subtitle: '三人團票',
    price: '$4,100',
    unit: '元 / 人',
    note: '三人同行，價格再下修。',
  },
  {
    title: '4人及以上',
    subtitle: '多人團票',
    price: '$4,000',
    unit: '元 / 人',
    note: '團報最低門檻票價。',
  },
  {
    title: '合作社團限定票',
    subtitle: '需輸入專屬邀請碼',
    price: '$4,000',
    unit: '元 / 人',
    note: '邀請碼每組僅限使用一次（一人）。',
    highlight: true,
  },
];

const quickFacts = [
  '活動地點：國立中興大學',
  '費用皆包含：餐食、住宿等四天三夜團體費用',
];

const registrationNotes = [
  '報名不代表錄取，將採審核制',
  '6/11（日）將以 Email 寄發錄取結果與繳費資訊',
  '團報折扣以「實際通過錄取」的人數作為計價標準',
  '合作社團邀請碼每個僅限使用一次（一人）',
];

const reviewFlow = [
  ['STEP 01', '送出報名資料', '填寫資料並完成送出，不代表立即錄取。'],
  ['STEP 02', '審核與錄取通知', '6/11（日）以 Email 寄發錄取結果與繳費資訊。'],
  ['STEP 03', '依錄取人數計價', '團報優惠以實際通過錄取的人數為準。'],
];

function PlanRow({ plan }) {
  return (
    <div
      className={`grid grid-cols-[1.2fr_1.2fr_1fr_1.7fr] items-center gap-3 border-b px-5 py-4 text-sm last:border-b-0 ${
        plan.highlight ? 'border-amber/30 bg-amber/[0.07]' : 'border-paper/10'
      }`}
    >
      <div className="font-serifjp text-lg tracking-wide text-paper">{plan.title}</div>
      <div className="text-[12px] tracking-[0.14em] text-paper/62">{plan.subtitle}</div>
      <div className="flex items-end gap-1.5">
        <span className="font-serifjp text-2xl font-semibold text-sunset">{plan.price}</span>
        <span className="pb-0.5 text-xs text-paper/55">{plan.unit}</span>
      </div>
      <div className="text-paper/68">{plan.note}</div>
    </div>
  );
}

function MobilePlanCard({ plan }) {
  return (
    <article
      className={`rounded-2xl border p-5 ${
        plan.highlight ? 'border-amber/35 bg-amber/10' : 'border-paper/12 bg-night-deep/45'
      }`}
    >
      <div className="mb-2 font-serifjp text-xl tracking-wide text-paper">{plan.title}</div>
      <div className="mb-4 text-[12px] tracking-[0.15em] text-paper/58">{plan.subtitle}</div>
      <div className="mb-2 flex items-end gap-2">
        <span className="font-serifjp text-4xl font-semibold leading-none text-sunset">{plan.price}</span>
        <span className="pb-1 text-sm text-paper/62">{plan.unit}</span>
      </div>
      <p className="text-sm leading-7 text-paper/68">{plan.note}</p>
    </article>
  );
}

export default function Registration() {
  const isEarlyBirdActive = Date.now() <= earlyBirdDeadline.getTime();

  return (
    <section id="報名" className="section-unified-bg relative py-14 sm:py-40">
      <div className="pointer-events-none absolute -top-44 right-[8%] h-[440px] w-[640px] bg-[radial-gradient(ellipse,rgba(240,200,90,0.16),transparent_70%)] blur-[95px]" />
      <div className="pointer-events-none absolute -bottom-48 left-[10%] h-[420px] w-[580px] bg-[radial-gradient(ellipse,rgba(232,98,76,0.15),transparent_70%)] blur-[90px]" />

      <div className="section-shell">
        <SectionLabel no="08" en="REGISTRATION" zh="報 名 專 區" colorClass="text-solar" />

        <div className="mb-8 grid gap-5 xl:grid-cols-[1.35fr_1fr]">
          <article className="glass rounded-[24px] border border-paper/12 bg-night-deep/45 p-6 sm:p-8">
            <div className="mb-4 inline-flex rounded-full border border-paper/20 bg-paper/5 px-3 py-1 font-mono text-[10px] tracking-[0.2em] text-paper/62">
              CAMP 2026 REGISTRATION
            </div>
            <h2 className="fluid-section-title font-serifjp font-medium leading-snug tracking-[0.06em] sm:tracking-[0.08em]">
              報名資訊
              <br />
              <span className="text-sunset">一次看懂。</span>
            </h2>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              <div className="rounded-xl border border-paper/12 bg-paper/[0.03] px-4 py-3">
                <p className="font-mono text-[10px] tracking-[0.2em] text-paper/50">活動時間</p>
                <p className="mt-2 text-sm leading-7 text-paper/80">2026 / 7 / 2 (四) – 7 / 5 (日)</p>
              </div>
              <div className="rounded-xl border border-paper/12 bg-paper/[0.03] px-4 py-3">
                <p className="font-mono text-[10px] tracking-[0.2em] text-paper/50">活動地點</p>
                <p className="mt-2 text-sm leading-7 text-paper/80">國立中興大學</p>
              </div>
            </div>
          </article>

          <article className="glass rounded-[24px] border border-amber/32 bg-[linear-gradient(160deg,rgba(232,98,76,0.18),rgba(13,20,40,0.58))] p-6 sm:p-8">
            <div className="mb-2 font-mono text-[11px] tracking-[0.2em] text-amber">// EARLY BIRD</div>
            <h3 className="font-serifjp text-2xl font-semibold tracking-wide text-paper">
              {earlyBirdOffer.title}（{earlyBirdOffer.period}）
            </h3>
            <div className="mt-3 flex items-end gap-2">
              <span className="font-serifjp text-5xl font-semibold leading-none text-amber">{earlyBirdOffer.price}</span>
              <span className="pb-1 text-sm text-paper/72">{earlyBirdOffer.unit}</span>
            </div>
            <p className="mt-3 text-sm leading-7 text-paper/72">{earlyBirdOffer.note}</p>
            <span
              className={`mt-4 inline-flex rounded-full border px-3 py-1 font-mono text-[10px] tracking-[0.16em] ${
                isEarlyBirdActive
                  ? 'border-solar/45 bg-solar/18 text-solar'
                  : 'border-paper/22 bg-paper/8 text-paper/58'
              }`}
            >
              {isEarlyBirdActive ? 'EARLY BIRD OPEN' : 'EARLY BIRD CLOSED'}
            </span>
          </article>
        </div>

        <div className="glass mb-8 overflow-hidden rounded-[24px] border border-paper/12 bg-night-deep/45">
          <div className="mb-6 flex items-center gap-4">
            <p className="px-6 pt-6 font-mono text-[10px] tracking-[0.25em] text-amber sm:px-7">// 一般與團報方案</p>
            <div className="h-px flex-1 bg-paper/10" />
          </div>

          <div className="hidden md:block">
            <div className="grid grid-cols-[1.2fr_1.2fr_1fr_1.7fr] gap-3 border-b border-paper/10 px-5 pb-3 text-[11px] tracking-[0.18em] text-paper/45 sm:px-7">
              <span>方案</span>
              <span>票種</span>
              <span>價格</span>
              <span>說明</span>
            </div>
            {ticketPlans.map((plan) => (
              <PlanRow key={plan.title} plan={plan} />
            ))}
          </div>

          <div className="grid gap-4 px-5 pb-6 md:hidden">
            {ticketPlans.map((plan) => (
              <MobilePlanCard key={plan.title} plan={plan} />
            ))}
          </div>
        </div>

        <div className="grid gap-5 lg:grid-cols-[1.1fr_1fr]">
          <div className="glass rounded-[24px] border border-paper/12 bg-night-deep/45 p-6 sm:p-7">
            <div className="mb-4 font-mono text-[10px] tracking-[0.25em] text-sunset">// 資訊補充</div>
            <div className="space-y-3">
              {quickFacts.map((fact) => (
                <p key={fact} className="rounded-xl border border-paper/10 bg-paper/[0.02] px-4 py-3 text-sm leading-7 text-paper/72">
                  {fact}
                </p>
              ))}
              {registrationNotes.map((note) => (
                <p key={note} className="rounded-xl border border-paper/10 bg-paper/[0.02] px-4 py-3 text-sm leading-7 text-paper/72">
                  {note}
                </p>
              ))}
            </div>
            <div className="mt-7">
              <a
                href="https://scaict.kktix.cc/events/sc2026/"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary inline-flex rounded-full bg-sunset px-6 py-3 text-sm font-semibold tracking-[0.14em] text-ink shadow-sunset transition hover:bg-amber"
              >
                立即前往報名 →
              </a>
            </div>
          </div>

          <div className="glass rounded-[24px] border border-paper/12 bg-night-deep/45 p-6 sm:p-7">
            <div className="mb-4 font-mono text-[10px] tracking-[0.25em] text-amber">// 審核流程</div>
            <div className="space-y-3">
              {reviewFlow.map(([step, title, desc]) => (
                <article key={step} className="rounded-xl border border-paper/10 bg-paper/[0.02] px-4 py-3.5">
                  <p className="font-mono text-[10px] tracking-[0.2em] text-sunset">{step}</p>
                  <h4 className="mt-1.5 font-serifjp text-lg tracking-wide text-paper">{title}</h4>
                  <p className="mt-1.5 text-sm leading-7 text-paper/70">{desc}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
