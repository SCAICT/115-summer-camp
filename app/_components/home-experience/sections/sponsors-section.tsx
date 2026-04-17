const TIERS = [
  {
    tier: "gold" as const,
    label: "Gold Sponsors",
    count: 2,
  },
  {
    tier: "silver" as const,
    label: "Silver Sponsors",
    count: 3,
  },
  {
    tier: "bronze" as const,
    label: "Bronze Sponsors",
    count: 4,
  },
];

export function SponsorsSection() {
  return (
    <>
      <p className="camp-section-overline">Sponsors</p>
      <h2 className="camp-section-title">贊助夥伴</h2>
      <p className="camp-section-lead">
        感謝所有支持學生技術教育的夥伴。贊助商資訊確認後陸續更新。
      </p>

      <div className="camp-sponsors-tiers">
        {TIERS.map(({ tier, label, count }) => (
          <div key={tier}>
            <p className="camp-sponsors-tier-label">{label}</p>
            <div className="camp-sponsors-row">
              {Array.from({ length: count }).map((_, i) => (
                <div
                  key={i}
                  className={`camp-sponsor-card camp-sponsor-card--${tier}`}
                >
                  logo TBD
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
