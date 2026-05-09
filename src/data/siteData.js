export const navItems = ['關於', '課程', '課表', '照片', '團隊'];

export const courseItems = [
  { tag: 'BASE', title: 'Go 基礎', desc: '快速上手 Go 的優雅語法，從 Hello World 到構築你的第一個服務。讓程式語言不再是障礙。', icon: '✦' },
  { tag: 'GIT', title: 'Git', desc: '掌握版本控制的魔法，學會與隊友無縫協作。每一次 commit 都是你進步的見證。', icon: '●' },
  { tag: 'BOT', title: 'Telegram', desc: '一起進入 Telegram Bot 的世界，用 Go 串接 API，讓你的想法活在訊息框裡。', icon: '◐' },
  { tag: 'HACK', title: '黑客松', desc: '四天三夜，一個想法變成現實。組隊、碰撞、實作、發表，誕生屬於你們的傑作。', icon: '◈' },
];

export const scheduleDays = [
  {
    day: 'DAY 01',
    date: '07 / 02',
    week: '週四',
    items: [
      ['10:00', '報到・開訓典禮', 'open'],
      ['11:00', '破冰及午餐', 'fun'],
      ['13:00', 'Go 基礎語法', 'class'],
      ['16:30', '遊戲', 'fun'],
      ['18:00', '晚餐', 'soft'],
      ['19:00', 'Git / GitHub', 'class'],
    ],
  },
  {
    day: 'DAY 02',
    date: '07 / 03',
    week: '週五',
    items: [
      ['09:00', 'Go 進階語法', 'class'],
      ['11:00', '網路基礎概論', 'class'],
      ['12:30', '午餐', 'soft'],
      ['14:00', 'TG Bot 基礎實作', 'class'],
      ['16:30', 'OpenView 講座', 'class'],
      ['18:00', '晚餐・晚會', 'fun'],
    ],
  },
  {
    day: 'DAY 03',
    date: '07 / 04',
    week: '週六',
    items: [
      ['09:00', 'TG Bot 進階實作', 'class'],
      ['12:00', '午餐', 'soft'],
      ['13:00', 'AIS3 講座', 'class'],
      ['15:00', 'TG Bot 部署與處理', 'class'],
      ['17:00', '晚餐', 'soft'],
      ['18:00', '黑客松', 'hack'],
    ],
  },
  {
    day: 'DAY 04',
    date: '07 / 05',
    week: '週日',
    items: [
      ['09:00', '黑客松衝刺', 'hack'],
      ['12:30', '午餐', 'soft'],
      ['13:30', '成果發表', 'demo'],
      ['15:00', 'AI 講座', 'class'],
      ['16:00', '閉幕', 'open'],
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
  ['itousouta15.webp', '總召組', '伊藤蒼太', '郭家睿', 'Chief', '一個夏天能改變一個人，這是我兩年前在 SCAICT 學到的事。希望這個夏天，我們也能成為你故事的一部分。'],
  ['kaiyasi.webp', '總召組', 'Kaiyasi', '曾慶語', 'Vice · Academic', '把難的東西教成你能聽懂的故事。'],
  ['yuchen_0103.webp', '總召組', '空白', '黃鈺宸', 'Vice · Operations', '從報到到賦歸，每個細節都是溫度。'],
];

export const fullTeamMembers = [
  // 總召組
  ['itousouta15.webp', '總召組', '伊藤蒼太', 'Chief Organizer', '營隊方向、流程節奏與最後成果發表。'],
  ['kaiyasi.webp', '總召組', 'Kaiyasi', 'Academic Lead', '課程設計、講師協調與技術內容品質。'],
  ['yuchen_0103.webp', '總召組', '空白', 'Operations Lead', '報到、住宿、場務、動線與學員照顧。'],
  // 行政組
  ['casperlin0430.webp', '行政組', '凡凡', 'Operations', '報到、住宿、場務、動線與學員照顧。'],
  ['moyun_0610.webp', '行政組', '陌云', 'Operations', '報到、住宿、場務、動線與學員照顧。'],
  // 課程組
  ['yorukot.webp', '課程組', 'Yorukot', 'Academic', '課程設計、講師協調與技術內容品質。'],
  ['frktw.webp', '課程組', 'Frank', 'Academic', '課程設計、講師協調與技術內容品質。'],
  ['yuan_net.webp', '課程組', 'Yuan', 'Academic', '課程設計、講師協調與技術內容品質。'],
  // 活動組
  ['ytseiung_12.webp', '活動組', 'ytseiung 秉', 'Program', '夏夜活動、破冰與團隊合作。'],
  ['sanxian1011.webp', '活動組', '三線', 'Program', '夏夜活動、破冰與團隊合作。'],
  ['yeee3642.webp', '活動組', '燒餅', 'Program', '夏夜活動、破冰與團隊合作。'],
  ['frktw.webp', '活動組', 'Frank', 'Program', '夏夜活動、破冰與團隊合作。'],
  ['jlin0110.webp', '活動組', 'LDN', 'Program', '夏夜活動、破冰與團隊合作。'],
  ['todhujxbizlmss.webp', '活動組', 'Tony', 'Program', '夏夜活動、破冰與團隊合作。'],
  ['hua_wuxuan.webp', '活動組', '花無', 'Program', '夏夜活動、破冰與團隊合作。'],
  // 紀錄組
  ['kangjwme.webp', '紀錄組', '康喔', 'Documentation', '活動紀錄與影像保存。'],
  ['zhuyuan0907.webp', '紀錄組', '竺原', 'Documentation', '活動紀錄與影像保存。'],
  ['on_cloud.webp', '紀錄組', 'OnCloud', 'Documentation', '活動紀錄與影像保存。'],
  // 資訊組
  ['justin_0711.webp', '資訊組', 'Justin', 'Technology', '網站開發與技術支援。'],
  // 設計組
  ['duvet2966.webp', '設計組', '阿丁', 'Design', '視覺、文案與現場識別系統。'],
  // 隊輔組
  ['melonchen218.webp', '隊輔組', 'melon', 'Counselor', '學員照顧與小組引導。'],
  ['tzyu.webp', '隊輔組', 'zouff', 'Counselor', '學員照顧與小組引導。'],
  ['xinyi08550.webp', '隊輔組', '小C', 'Counselor', '學員照顧與小組引導。'],
  ['jiang_sprite.webp', '隊輔組', 'Jiang', 'Counselor', '學員照顧與小組引導。'],
  ['coshj_.webp', '隊輔組', 'CC', 'Counselor', '學員照顧與小組引導。'],
  ['aca_3544.webp', '隊輔組', '小魚乾', 'Counselor', '學員照顧與小組引導。'],
  ['yaya_12.webp', '隊輔組', '鴨鴨', 'Counselor', '學員照顧與小組引導。'],
  ['yxss14.webp', '隊輔組', 'fallingcat', 'Counselor', '學員照顧與小組引導。'],
  ['alaner652.webp', '隊輔組', 'small R', 'Counselor', '學員照顧與小組引導。'],
  ['mi__my.webp', '隊輔組', '235', 'Counselor', '學員照顧與小組引導。'],
  ['bibidibabidiboowa.webp', '隊輔組', 'Leo', 'Counselor', '學員照顧與小組引導。'],
  ['pikachu5764.webp', '隊輔組', 'pika', 'Counselor', '學員照顧與小組引導。'],
  ['1lias_.webp', '隊輔組', '暮墓', 'Counselor', '學員照顧與小組引導。'],
  ['ziyangziyang.webp', '隊輔組', 'Ziyang.', 'Counselor', '學員照顧與小組引導。'],
  ['q_nnn412.webp', '隊輔組', '水餃', 'Counselor', '學員照顧與小組引導。'],
  ['jiaheii.webp', '隊輔組', '小黑', 'Counselor', '學員照顧與小組引導。'],
  ['yu033385.webp', '隊輔組', 'Lisa', 'Counselor', '學員照顧與小組引導。'],
  ['wu_66666.webp', '隊輔組', '吳子鈞', 'Counselor', '學員照顧與小組引導。'],
];

export const speakers = [
  {
    id: 'kaiyasi',
    name: 'Kaiyasi',
    fullName: '曾慶語',
    avatar: '/avatars/kaiyasi.webp',
    role: 'Academic Lead',
    courses: ['Go 基礎語法', 'Git / GitHub'],
    bio: '營隊學術負責人，課程設計與教學品質的守門人。擅長將複雜概念化為直覺易懂的敘述，帶領初學者穩穩踏入 Go 的世界。',
  },
  {
    id: 'yorukot',
    name: 'Yorukot',
    avatar: '/avatars/yorukot.webp',
    role: 'Instructor',
    courses: ['Go 進階語法', 'TG Bot 基礎實作', 'TG Bot 進階實作', '開源技術分享'],
    bio: '活躍於多個開源社群的技術愛好者，從進階語法到 Telegram Bot 完整開發流程，一手包辦最硬核的技術課程。',
  },
  {
    id: 'frank',
    name: 'Frank',
    avatar: '/avatars/frktw.webp',
    role: 'Instructor',
    courses: ['網路基礎概論'],
    bio: '熟悉網路架構與系統設計，用清晰的脈絡帶領學員建立紮實的網路基礎，讓後續實作不再有盲點。',
  },
  {
    id: 'yuan',
    name: 'yuan',
    avatar: '/avatars/yuan_net.webp',
    role: 'Instructor',
    courses: ['TG Bot 部署與處理'],
    bio: '專注後端服務與部署流程，協助學員將手中的 Bot 從本機順利推上雲端，讓作品真正活起來。',
  },
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

export const galleryPhotos = [
  {
    id: 'hero',
    src: '/gallery-optimized/hero.webp',
    caption: '開幕典禮',
    desc: '全體學員與導師齊聚，正式揭開夏令營序幕',
    gradient: 'from-[#0a0f20] via-[#1a0d2e] to-[#e8624c]/30',
    gridClass: 'col-span-2 row-span-2 md:col-start-1 md:col-end-4 md:row-start-1 md:row-end-3',
  },
  {
    id: 'topRight',
    src: '/gallery-optimized/top-right.webp',
    caption: '技術講座',
    desc: '業界工程師親授前沿技術，開拓學員視野',
    gradient: 'from-[#f4a261]/25 via-[#0a0f20] to-[#080d1a]',
    gridClass: 'col-span-2 md:col-start-4 md:col-end-6 md:row-start-1 md:row-end-2',
  },
  {
    id: 'midRight1',
    src: '/gallery-optimized/mid-right-1.webp',
    caption: '歡樂晚會',
    desc: '營隊不只有程式，還有歡笑與友誼的夜晚',
    gradient: 'from-[#080d1a] via-[#d97a9a]/20 to-[#0a0f20]',
    gridClass: 'col-span-1 md:col-start-4 md:col-end-5 md:row-start-2 md:row-end-3',
  },
  {
    id: 'midRight2',
    src: '/gallery-optimized/mid-right-2.webp',
    caption: '深夜除錯',
    desc: '凌晨的螢幕光，映照最專注的眼神',
    gradient: 'from-[#e8624c]/20 via-[#080d1a] to-[#0a0f20]',
    gridClass: 'col-span-1 md:col-start-5 md:col-end-6 md:row-start-2 md:row-end-3',
  },
  {
    id: 'botLeft',
    src: '/gallery-optimized/bot-left.webp',
    caption: '成果發表',
    desc: '四十八小時的心血，化為台上自信的簡報',
    gradient: 'from-[#0a0f20] via-[#f4a261]/15 to-[#d97a9a]/20',
    gridClass: 'col-span-2 md:col-start-1 md:col-end-3 md:row-start-3 md:row-end-4',
  },
  {
    id: 'botMid',
    src: '/gallery-optimized/bot-mid.webp',
    caption: '頒獎時刻',
    desc: '最佳專案獎得主，用程式碼詮釋創意',
    gradient: 'from-[#e8624c]/30 via-[#1a0820] to-[#080d1a]',
    gridClass: 'col-span-2 md:col-start-3 md:col-end-4 md:row-start-3 md:row-end-4',
  },
  {
    id: 'botRight',
    src: '/gallery-optimized/bot-right.webp',
    caption: '閉幕合影',
    desc: '這個夏天，我們一起寫下難忘的程式人生',
    gradient: 'from-[#0a0f20] via-[#d97a9a]/25 to-[#080d1a]',
    gridClass: 'col-span-2 md:col-start-4 md:col-end-6 md:row-start-3 md:row-end-4',
  },
];

const buildArchivePhotos = (year, count) =>
  Array.from({ length: count }, (_, index) => `/photos-optimized/${year}/${String(index + 1).padStart(2, '0')}.webp`);

export const photoArchives = [
  {
    year: '111',
    title: '111 聯合寒訓',
    subtitle: '起點與相遇的一年，第一次把熱愛程式的人聚在一起。',
    photos: buildArchivePhotos('111', 7),
  },
  {
    year: '112',
    title: '112 聯合寒訓',
    subtitle: '課程更扎實、活動更完整，團隊默契也更進一步。',
    photos: buildArchivePhotos('112', 8),
  },
  {
    year: '114',
    title: '114 聯合寒訓',
    subtitle: '跨校交流的能量全面展開，留下最多元也最密集的精彩畫面。',
    photos: buildArchivePhotos('114', 18),
  },
];

export const footerMenus = [
  ['頁面', [['首頁', '#/'], ['關於課程', '#/home/關於'], ['課表', '#/home/課表'], ['團隊', '#/home/團隊']]],
  ['深入', [['課程內容', '#/course'], ['完整團隊', '#/team'], ['合作社團', '#/clubs'], ['歷年照片', '#/photos']]]
];

export const footerOrganizations = [
  {
    title: '主辦單位',
    units: [
      {
        shortName: 'SCAICT',
        fullName: '中部高中電資社團聯合會議',
        href: 'https://scaict.org/',
        logo: '/LOGO/SCAICT.webp',
        desc: '由中部高中資訊與電資社團共同串聯的學生組織，致力於連結社群、推動技術交流與資訊教育扎根。',
      },
      {
        shortName: 'NCHU',
        fullName: '國立中興大學數據與人工智慧學院',
        href: 'https://sites.google.com/email.nchu.edu.tw/ai-school/%E6%9C%80%E6%96%B0%E6%B6%88%E6%81%AF-news?authuser=0',
        logo: '/org-logos/nchu.webp',
        desc: '提供營隊辦理所需的行政與校園資源，支持學生在實作與跨校交流中成長。',
      },
    ],
  },
  {
    title: '協辦單位',
    units: [
      {
        shortName: 'SCINT',
        fullName: '北臺灣學生資訊社群',
        href: 'https://scint.org/',
        logo: '/org-logos/scint.webp',
        desc: '匯聚北台灣各高中資訊社群，串連人才、共享資源，與 SCAICT 攜手推動學生技術交流。',
      },
      {
        shortName: 'SCIST',
        fullName: '南臺灣學生資訊社群',
        href: 'https://scist.org/',
        logo: '/org-logos/scist.webp',
        desc: '深耕南台灣資訊教育，涵蓋演算法、資安與程式競賽，與 SCAICT 共同縮短南北技術資源差距。',
      },
      {
        shortName: 'NCSE',
        fullName: 'NCSE Network',
        href: 'https://ncse.tw/',
        logo: 'https://cdn-file.ncse.tw/image/Logo_NCSE_Network_Banner.svg',
        desc: '提供網路與技術支援，協助推動本營隊的數位化運作。',
      },
      {
        shortName: 'OCF',
        fullName: '開放文化基金會',
        href: 'https://ocf.tw/',
        logo: '/org-logos/ocf.webp',
        desc: '推動開放文化與開源精神，支持本營隊的開源教育理念。',
      },
    ],
  },
];
