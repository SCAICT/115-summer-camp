const FAQS = [
  {
    q: "這次暑訓的對象是誰？",
    a: "面向高中生及大學生，有基本 Python 程式基礎即可報名。不需要有 Docker 或 AI 相關經驗，課程從零開始帶你上手。",
  },
  {
    q: "需要自備電腦嗎？",
    a: "是的，請攜帶自己的筆電（Windows / macOS / Linux 皆可）。建議至少 8GB RAM，活動前我們會提供環境安裝指引。",
  },
  {
    q: "活動前需要先安裝 Docker 嗎？",
    a: "不需要，報名成功後我們會寄送「事前準備清單」，引導你完成 Docker Desktop 安裝與基本設定，活動第一天再一起確認環境。",
  },
  {
    q: "三天是住宿活動嗎？",
    a: "視場地確認結果決定，目前規劃為集訓形式。住宿細節與費用將於報名截止後公告。",
  },
  {
    q: "AI Demo 區塊的 API 要怎麼提交？",
    a: "完成課程後，各隊須將自己的 AI API 部署到可公開存取的 URL，並填寫提交表單。籌備組審核後會更新至網站 AI Demo 區塊。",
  },
  {
    q: "可以一個人報名還是要組隊？",
    a: "個人報名即可，活動第一天現場自由組隊（每隊 2–4 人）。若已有隊友也歡迎一起報名並在表單備註。",
  },
  {
    q: "活動費用是多少？",
    a: "費用詳情待場地確認後公告。我們致力讓費用維持在合理範圍，並提供部分需要協助的學員補助名額。",
  },
  {
    q: "如何取得最新消息？",
    a: "請追蹤 SCAICT 各社群帳號，或加入我們的 Discord 伺服器，所有最新公告都會第一時間在那裡發布。",
  },
];

export function FaqSection() {
  return (
    <>
      <p className="camp-section-overline">FAQ</p>
      <h2 className="camp-section-title">常見問題</h2>

      <div className="camp-faq-list">
        {FAQS.map(({ q, a }) => (
          <details key={q} className="camp-faq-item">
            <summary>
              {q}
              <span className="camp-faq-chevron" aria-hidden="true" />
            </summary>
            <div className="camp-faq-body">{a}</div>
          </details>
        ))}
      </div>
    </>
  );
}
