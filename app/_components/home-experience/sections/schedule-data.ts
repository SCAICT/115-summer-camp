export type Tag = "keynote" | "workshop" | "lab" | "break" | "social";

export type ScheduleRow = {
  time: string;
  name: string;
  desc?: string;
  tag: Tag;
};

export type ScheduleDay = {
  badge: string;
  title: string;
  topics: string[];   // teaser keywords for homepage
  rows: ScheduleRow[];
};

export const TAG_LABELS: Record<Tag, string> = {
  keynote:  "主題演講",
  workshop: "工作坊",
  lab:      "實作課",
  break:    "休息",
  social:   "活動",
};

export const DAYS: ScheduleDay[] = [
  {
    badge: "Day 1",
    title: "Docker 基礎",
    topics: ["Dockerfile", "Multi-stage Build", "Docker Compose", "Container Network"],
    rows: [
      { time: "09:00–09:30", name: "報到 & 開幕式",               tag: "social"   },
      { time: "09:30–10:30", name: "為什麼需要容器化？",           desc: "從「它在我電腦上可以跑」到可重現的部署環境", tag: "keynote"  },
      { time: "10:45–12:15", name: "Docker 映像與容器實作",        desc: "Dockerfile 撰寫、layers、build cache 最佳化", tag: "workshop" },
      { time: "12:15–13:30", name: "午餐",                         tag: "break"    },
      { time: "13:30–15:00", name: "Docker Compose 實戰",          desc: "多服務編排、volume 掛載、container network", tag: "workshop" },
      { time: "15:15–17:00", name: "實作一：容器化你的第一個程式",  desc: "動手把 Python script 容器化並對外提供服務", tag: "lab"      },
      { time: "17:00–18:00", name: "晚餐",                         tag: "break"    },
      { time: "18:00–20:00", name: "隊伍組建 & 發想討論",           tag: "social"   },
    ],
  },
  {
    badge: "Day 2",
    title: "AI API 開發",
    topics: ["FastAPI", "PyTorch 推論", "CI/CD 自動化", "GitHub Actions"],
    rows: [
      { time: "09:00–10:30", name: "FastAPI 快速上手",              desc: "路由設計、Pydantic 驗證、非同步 I/O 處理", tag: "workshop" },
      { time: "10:45–12:00", name: "AI 模型服務化",                 desc: "模型載入策略、推論最佳化、版本管理", tag: "keynote"  },
      { time: "12:00–13:30", name: "午餐",                          tag: "break"    },
      { time: "13:30–15:30", name: "實作二：封裝你的 AI 模型",       desc: "PyTorch / Transformers → REST API → Docker image", tag: "lab"      },
      { time: "15:45–17:00", name: "CI/CD 自動化建置",              desc: "GitHub Actions 自動 build & push Docker image", tag: "workshop" },
      { time: "17:00–18:00", name: "晚餐",                          tag: "break"    },
      { time: "18:00–21:00", name: "隊伍 Hackathon 時間",            tag: "lab"      },
    ],
  },
  {
    badge: "Day 3",
    title: "部署 & 成果展示",
    topics: ["Cloud Run", "Railway / Fly.io", "API Demo 發表", "頒獎典禮"],
    rows: [
      { time: "09:00–10:30", name: "雲端容器部署",                  desc: "Cloud Run / Railway / Fly.io 實機部署演示", tag: "keynote"  },
      { time: "10:30–12:00", name: "實作三：把 API 推上雲端",        desc: "從本機到公開 URL，讓所有人都能呼叫你的 AI", tag: "lab"      },
      { time: "12:00–13:30", name: "午餐 & 最後衝刺",                tag: "break"    },
      { time: "13:30–16:30", name: "AI API 成果發表",                desc: "各組輪流展示，現場可即時試玩 API", tag: "social"   },
      { time: "16:30–17:00", name: "頒獎 & 閉幕典禮",                tag: "keynote"  },
      { time: "17:00–",      name: "賦歸",                           tag: "break"    },
    ],
  },
];
