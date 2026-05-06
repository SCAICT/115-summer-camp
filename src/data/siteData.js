export const navItems = ['關於', '課程', '課表', '團隊', '成果'];

export const courseItems = [
  { tag: 'PROMPT', title: 'Prompt 工程', desc: '從基礎句法到進階思考流程，建立你的第一套對話模板。', icon: '✦' },
  { tag: 'AGENT', title: 'AI Agent 實作', desc: '理解 agent 架構，動手讓模型擁有明確的任務行動力。', icon: '◉' },
  { tag: 'TOOLS', title: '工具整合', desc: '串接 API、檢索增強與外部記憶，讓 agent 真的能做事。', icon: '◐' },
  { tag: 'HACK', title: '黑客松實戰', desc: '組隊、發想、實作、Demo，一個夜晚誕生你的作品。', icon: '◈' },
];

export const scheduleDays = [
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

export const tagStyles = {
  class: ['課程', 'bg-amber/15 text-amber'],
  hack: ['黑客松', 'bg-sunset/15 text-sunset'],
  fun: ['活動', 'bg-mist-pink/15 text-mist-pink'],
  open: ['儀式', 'bg-solar/15 text-solar'],
  soft: ['休息', 'bg-paper/10 text-paper/50'],
  demo: ['Demo', 'bg-amber/15 text-amber'],
};

export const homeMembers = [
  ['itousouta15.png', '總召組', '伊藤蒼太', 'Chief', '一個夏天能改變一個人，這是我四年前在 SCAICT 學到的事。希望這個夏天，我們也能成為你故事的一部分。'],
  ['kaiyasi.png', '總召組', 'Kaiyasi', 'Vice · Academic', '把難的東西教成你能聽懂的故事。'],
  ['yuchen_0103.png', '總召組', '空白', 'Vice · Operations', '從報到到賦歸，每個細節都是溫度。'],
];

export const fullTeamMembers = [
  // 總召組
  ['itousouta15.png', '總召組', '伊藤蒼太', 'Chief Organizer', '營隊方向、流程節奏與最後成果發表。'],
  ['kaiyasi.png', '總召組', 'Kaiyasi', 'Academic Lead', '課程設計、講師協調與技術內容品質。'],
  ['yuchen_0103.png', '總召組', '空白', 'Operations Lead', '報到、住宿、場務、動線與學員照顧。'],
  // 行政組
  ['casperlin0430.png', '行政組', '凡凡', 'Operations', '報到、住宿、場務、動線與學員照顧。'],
  ['moyun_0610.png', '行政組', '陌云', 'Operations', '報到、住宿、場務、動線與學員照顧。'],
  // 活動組
  ['ytseiung_12.png', '活動組', 'ytseiung 秉', 'Program', '夏夜活動、破冰與團隊合作。'],
  ['sanxian1011.png', '活動組', '三線', 'Program', '夏夜活動、破冰與團隊合作。'],
  ['yeee3642.png', '活動組', '燒餅', 'Program', '夏夜活動、破冰與團隊合作。'],
  ['frktw.png', '活動組', 'Frank', 'Program', '夏夜活動、破冰與團隊合作。'],
  ['jlin0110.png', '活動組', 'LDN', 'Program', '夏夜活動、破冰與團隊合作。'],
  ['todhujxbizlmss.png', '活動組', 'Tony', 'Program', '夏夜活動、破冰與團隊合作。'],
  ['hua_wuxuan.png', '活動組', '花無', 'Program', '夏夜活動、破冰與團隊合作。'],
  // 紀錄組
  ['kangjwme.png', '紀錄組', '康喔', 'Documentation', '活動紀錄與影像保存。'],
  ['zhuyuan0907.png', '紀錄組', '竺原', 'Documentation', '活動紀錄與影像保存。'],
  ['on_cloud.png', '紀錄組', 'OnCloud', 'Documentation', '活動紀錄與影像保存。'],
  // 資訊組
  ['justin_0711.png', '資訊組', 'Justin', 'Technology', '網站開發與技術支援。'],
  // 設計組
  ['duvet2966.png', '設計組', '阿丁', 'Design', '視覺、文案與現場識別系統。'],
  // 隊輔組
  ['melonchen218.png', '隊輔組', 'melon', 'Counselor', '學員照顧與小組引導。'],
  ['tzyu.png', '隊輔組', 'zouff', 'Counselor', '學員照顧與小組引導。'],
  ['xinyi08550.png', '隊輔組', '小C', 'Counselor', '學員照顧與小組引導。'],
  ['jiang_sprite.png', '隊輔組', 'Jiang', 'Counselor', '學員照顧與小組引導。'],
  ['coshj_.png', '隊輔組', 'CC', 'Counselor', '學員照顧與小組引導。'],
  ['aca_3544.png', '隊輔組', '小魚乾', 'Counselor', '學員照顧與小組引導。'],
  ['yaya_12.png', '隊輔組', '鴨鴨', 'Counselor', '學員照顧與小組引導。'],
  ['yxss14.png', '隊輔組', 'fallingcat', 'Counselor', '學員照顧與小組引導。'],
  ['alaner652.png', '隊輔組', 'small R', 'Counselor', '學員照顧與小組引導。'],
  ['mi__my.png', '隊輔組', '235', 'Counselor', '學員照顧與小組引導。'],
  ['bibidibabidiboowa.png', '隊輔組', 'Leo', 'Counselor', '學員照顧與小組引導。'],
  ['pikachu5764.png', '隊輔組', 'pika', 'Counselor', '學員照顧與小組引導。'],
  ['1lias_.png', '隊輔組', '暮墓', 'Counselor', '學員照顧與小組引導。'],
  ['ziyangziyang.png', '隊輔組', 'Ziyang.', 'Counselor', '學員照顧與小組引導。'],
  ['q_nnn412.png', '隊輔組', '水餃', 'Counselor', '學員照顧與小組引導。'],
  ['jiaheii.png', '隊輔組', '小黑', 'Counselor', '學員照顧與小組引導。'],
  ['yu033385.png', '隊輔組', 'Lisa', 'Counselor', '學員照顧與小組引導。'],
  ['wu_66666.png', '隊輔組', '吳子鈞', 'Counselor', '學員照顧與小組引導。'],
];

export const footerMenus = [
  ['頁面', [['首頁', '#/'], ['關於課程', '#/home/關於'], ['課表', '#/home/課表'], ['團隊', '#/home/團隊']]],
  ['深入', [['課程內容', '#/course'], ['完整團隊', '#/team'], ['過往活動', '#/home/成果']]],
  ['聯絡', [['KKTIX 報名', '#/home/報名'], ['scaict@email', 'mailto:'], ['Instagram', '#'], ['Facebook', '#']]],
];
