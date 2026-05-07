export const navItems = ['關於', '課程', '課表', '團隊', '成果'];

export const courseItems = [
  { tag: 'BASE', title: 'Go 基礎', desc: '快速上手 Go 的優雅語法，從 Hello World 到構築你的第一個服務。讓程式語言不再是障礙。', icon: '✦' },
  { tag: 'GIT', title: 'Git', desc: '掌握版本控制的魔法，學會與隊友無縫協作。每一次 commit 都是你進步的見證。', icon: '●' },
  { tag: 'BOT', title: 'Go Telegram', desc: '一起進入 Telegram Bot 的世界，用 Go 串接 API，讓你的想法活在訊息框裡。', icon: '◐' },
  { tag: 'HACK', title: '黑客松自己的酷酷 Telegram Bot', desc: '四天三夜，一個想法變成現實。組隊、碰撞、實作、發表，誕生屬於你們的傑作。', icon: '◈' },
];

export const scheduleDays = [
  {
    day: 'DAY 01',
    date: '07 / 02',
    week: '週四',
    items: [
      ['10:00', '學員報到及開訓典禮', 'open'],
      ['11:00', '破冰活動及午餐', 'soft'],
      ['13:00', 'Go 基礎課程', 'class'],
      ['17:30', '晚餐', 'soft'],
      ['18:30', '遊戲時間', 'fun'],
    ],
  },
  {
    day: 'DAY 02',
    date: '07 / 03',
    week: '週五',
    items: [
      ['09:00', 'Go 基礎課程', 'class'],
      ['12:00', '午餐', 'soft'],
      ['13:00', 'Git 課程', 'class'],
      ['15:00', 'Go Telegram 課程', 'class'],
      ['18:00', '晚餐', 'soft'],
      ['19:00', '晚會時間', 'fun'],
    ],
  },
  {
    day: 'DAY 03',
    date: '07 / 04',
    week: '週六',
    items: [
      ['09:00', '進階用 Go Telegram 寫出系統', 'class'],
      ['11:30', '午餐', 'soft'],
      ['14:30', '室內活動', 'fun'],
      ['16:00', '黑客松開幕·主題發佈', 'hack'],
    ],
  },
  {
    day: 'DAY 04',
    date: '07 / 05',
    week: '週日',
    items: [
      ['09:00', '黑客松衝刺', 'hack'],
      ['12:00', '午餐', 'soft'],
      ['13:30', '經驗分享', 'demo'],
      ['15:00', '成果發表', 'demo'],
      ['17:00', '頒獎暨閉幕', 'open'],
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
  ['itousouta15.png', '總召組', '伊藤蒼太', '郭家睿', 'Chief', '一個夏天能改變一個人，這是我兩年前在 SCAICT 學到的事。希望這個夏天，我們也能成為你故事的一部分。'],
  ['kaiyasi.png', '總召組', 'Kaiyasi', '曾慶語', 'Vice · Academic', '把難的東西教成你能聽懂的故事。'],
  ['yuchen_0103.png', '總召組', '空白', '黃鈺宸', 'Vice · Operations', '從報到到賦歸，每個細節都是溫度。'],
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

export const partnerClubs = [
  { name: '一中數創', href: 'https://www.instagram.com/tcfsh.ddc/', logo: '/club-logos/一中數創.webp' },
  { name: '一中電研', href: 'https://www.instagram.com/tcirc_43rd/', logo: '/club-logos/一中電研.webp' },
  { name: '中科大資工科學會', href: 'https://www.instagram.com/ntcust_csie/', logo: '/club-logos/中科大資工科學會.webp' },
  { name: '二中電研', href: 'https://www.instagram.com/tcssh_csc/', logo: '/club-logos/二中電研.webp' },
  { name: '嘉中資研', href: 'https://www.instagram.com/cysh_irc/', logo: '/club-logos/嘉中資研.webp' },
  { name: '嘉女程研', href: 'https://www.instagram.com/cygsh_irc_12/', logo: '/club-logos/嘉女程研.webp' },
  { name: '大里資訊', href: 'https://www.instagram.com/dlhit_/', logo: '/club-logos/大里資訊.webp' },
  { name: '彰中資研', href: 'https://www.instagram.com/chsh_citrc_27th/', logo: '/club-logos/彰中資研.webp' },
  { name: '彰女電研', href: 'https://www.instagram.com/chgsh_cgcip_28th/', logo: '/club-logos/彰女電研.webp' },
  { name: '數實資研', href: 'https://www.instagram.com/tscsc_3rd/', logo: '/club-logos/數實資研.webp' },
  { name: '正心資研', href: 'https://www.instagram.com/jhs_irc_2nd/', logo: '/club-logos/正心資研.webp' },
  { name: '清中科創', href: 'https://www.instagram.com/cshs_robotic_club/', logo: '/club-logos/清中科創.webp' },
  { name: '竹實資研', href: 'https://www.instagram.com/nehs_iced/', logo: '/club-logos/竹實資研.webp' },
];

export const footerMenus = [
  ['頁面', [['首頁', '#/'], ['關於課程', '#/home/關於'], ['課表', '#/home/課表'], ['團隊', '#/home/團隊']]],
  ['深入', [['課程內容', '#/course'], ['完整團隊', '#/team'], ['過往活動', '#/home/成果']]]
];
