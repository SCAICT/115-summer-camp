"use client";

import { useState } from "react";

type DemoTeam = {
  id: string;
  team: string;
  name: string;
  desc: string;
  tags: string[];
  status: "running" | "stopped";
  demoUrl: string;
  curlCmd: string;
};

const TEAMS: DemoTeam[] = [
  {
    id: "a1b2c3d4",
    team: "Team Alpha",
    name: "SentimentAPI",
    desc: "即時中文情感分析 API，輸入一段文字回傳正負面分數與關鍵詞。",
    tags: ["Python", "FastAPI", "BERT", "Docker"],
    status: "running",
    demoUrl: "#",
    curlCmd: `curl -X POST https://alpha.demo/sentiment \\\n  -H "Content-Type: application/json" \\\n  -d '{"text":"這個活動超棒！"}'`,
  },
  {
    id: "e5f6g7h8",
    team: "Team Beta",
    name: "ImageCaptionBot",
    desc: "上傳圖片自動生成繁體中文描述，支援 JPEG / PNG，回應 < 2s。",
    tags: ["Python", "FastAPI", "CLIP", "Docker"],
    status: "running",
    demoUrl: "#",
    curlCmd: `curl -X POST https://beta.demo/caption \\\n  -F "image=@photo.jpg"`,
  },
  {
    id: "i9j0k1l2",
    team: "Team Gamma",
    name: "CodeReviewAI",
    desc: "貼上程式碼片段，AI 回傳 review 建議與潛在 bug 列表。",
    tags: ["Python", "FastAPI", "LLM", "Docker"],
    status: "running",
    demoUrl: "#",
    curlCmd: `curl -X POST https://gamma.demo/review \\\n  -H "Content-Type: application/json" \\\n  -d '{"code":"def foo(x):\\n  return x+1"}'`,
  },
  {
    id: "m3n4o5p6",
    team: "Team Delta",
    name: "TranslateX",
    desc: "多語言即時翻譯，支援中/英/日/韓，模型輕量化部署於容器。",
    tags: ["Python", "FastAPI", "Helsinki-NLP", "Docker"],
    status: "running",
    demoUrl: "#",
    curlCmd: `curl -X POST https://delta.demo/translate \\\n  -H "Content-Type: application/json" \\\n  -d '{"text":"hello","from":"en","to":"zh"}'`,
  },
  {
    id: "q7r8s9t0",
    team: "Team Epsilon",
    name: "VoiceTagAPI",
    desc: "語音片段自動標記說話者情緒與主題標籤，回傳結構化 JSON。",
    tags: ["Python", "FastAPI", "Whisper", "Docker"],
    status: "stopped",
    demoUrl: "#",
    curlCmd: `curl -X POST https://epsilon.demo/tag \\\n  -F "audio=@clip.wav"`,
  },
  {
    id: "u1v2w3x4",
    team: "Team Zeta",
    name: "ResumeParser",
    desc: "上傳履歷 PDF，自動萃取技能、學歷、工作經歷成結構化資料。",
    tags: ["Python", "FastAPI", "LlamaIndex", "Docker"],
    status: "stopped",
    demoUrl: "#",
    curlCmd: `curl -X POST https://zeta.demo/parse \\\n  -F "resume=@cv.pdf"`,
  },
];

function CopyButton({ cmd }: { cmd: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(cmd);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard not available */
    }
  };

  return (
    <button
      className={`camp-demo-btn camp-demo-btn--curl ${copied ? "camp-demo-btn--copied" : ""}`}
      onClick={handleCopy}
      aria-label="複製 curl 指令"
    >
      {copied ? "✓ Copied" : "curl →"}
    </button>
  );
}

export function AiDemoSection() {
  return (
    <>
      <p className="camp-section-overline">AI Demo</p>
      <h2 className="camp-section-title">各隊 AI API 展示</h2>

      {/* docker ps prompt line */}
      <div className="camp-demo-prompt-line">
        <span className="camp-demo-prompt-char">$</span>
        <span className="camp-demo-prompt-cmd">docker ps</span>
        <span className="camp-demo-prompt-flag">--format</span>
        <span className="camp-demo-prompt-cmd">&quot;table {"{{"}.Names{"}}"}&quot;</span>
      </div>

      <div className="camp-demo-grid">
        {TEAMS.map((team) => (
          <div key={team.id} className="camp-demo-card">
            {/* Card header */}
            <div className="camp-demo-card-header">
              <span
                className={`camp-demo-card-dot ${
                  team.status === "running"
                    ? "camp-demo-card-dot--running"
                    : "camp-demo-card-dot--stopped"
                }`}
              />
              <span className="camp-demo-card-id">{team.id}</span>
            </div>

            {/* Card body */}
            <div className="camp-demo-card-body">
              <p className="camp-demo-team">{team.team}</p>
              <p className="camp-demo-name">{team.name}</p>
              <p className="camp-demo-desc">{team.desc}</p>

              <div className="camp-demo-tags">
                {team.tags.map((tag) => (
                  <span key={tag} className="camp-demo-badge">{tag}</span>
                ))}
              </div>

              <span
                className={`camp-demo-status ${
                  team.status === "running"
                    ? "camp-demo-status--running"
                    : "camp-demo-status--stopped"
                }`}
              >
                {team.status === "running" ? "● RUNNING" : "○ STOPPED"}
              </span>
            </div>

            {/* Card footer */}
            <div className="camp-demo-card-footer">
              <CopyButton cmd={team.curlCmd} />
              {team.status === "running" ? (
                <a
                  href={team.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="camp-demo-btn camp-demo-btn--try"
                >
                  Try it →
                </a>
              ) : (
                <span
                  className="camp-demo-btn"
                  style={{
                    background: "transparent",
                    color: "rgba(248,250,252,0.25)",
                    border: "1px solid rgba(255,255,255,0.07)",
                    cursor: "not-allowed",
                  }}
                >
                  Offline
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
