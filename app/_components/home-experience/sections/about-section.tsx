const STATS = [
  { value: "50+", label: "報名學員" },
  { value: "3",   label: "活動天數" },
  { value: "8+",  label: "參賽隊伍" },
  { value: "10+", label: "課程講師" },
];

export function AboutSection() {
  return (
    <>
      <p className="camp-section-overline">About</p>
      <h2 className="camp-section-title">活動說明</h2>
      <p className="camp-section-lead">
        SCAICT 聯合暑訓由多所高中資訊社群聯合舉辦，面向全臺對資訊技術有興趣的高中生。
        2026 年以「Docker 部署 AI API」為主軸，帶領學員從容器化基礎到生產環境部署，
        走完完整的 MLOps 實作流程。
      </p>
      <p className="camp-section-lead" style={{ marginTop: "0.6rem" }}>
        三天課程涵蓋：Docker 原理與實作、FastAPI 服務開發、AI 模型整合、雲端部署，
        並以各隊 API 成果發表作為壓軸。不只學技術，更學會把技術「交付出去」。
      </p>

      <div className="camp-stats-grid">
        {STATS.map(({ value, label }) => (
          <div key={label} className="camp-stat-card">
            <span className="camp-stat-value">{value}</span>
            <span className="camp-stat-label">{label}</span>
          </div>
        ))}
      </div>
    </>
  );
}
