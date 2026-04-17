export type StaffMember = {
  name: string;
  role: string;
};

export type StaffGroup = {
  title: string;
  desc: string;
  members: StaffMember[];
};

export const STAFF_GROUPS: StaffGroup[] = [
  {
    title: "總召組",
    desc: "統籌協調暑訓整體進度，主導核心討論與決策",
    members: [
      { name: "TBD", role: "副召" },
      { name: "TBD", role: "總召" },
      { name: "TBD", role: "副召" },
    ],
  },
  {
    title: "行政組",
    desc: "負責維運暑訓常規行政事務、財務與場地協調",
    members: [
      { name: "TBD", role: "組長" },
      { name: "TBD", role: "組員" },
    ],
  },
  {
    title: "課程組",
    desc: "負責課程安排與規劃",
    members: [
      { name: "TBD", role: "組長" },
      { name: "TBD", role: "組員" },
    ],
  },
  {
    title: "活動組",
    desc: "負責暑訓各天的活動流程、場佈與整體設計",
    members: [
      { name: "TBD", role: "組長" },
      { name: "TBD", role: "組員" },
    ],
  },
  {
    title: "資訊組",
    desc: "負責官網開發、系統維護與技術支援",
    members: [
      { name: "TBD", role: "組長" },
      { name: "TBD", role: "組員" },
    ],
  },
  {
    title: "隊輔",
    desc: "引導學員融入活動，協助課程進行與心態調適",
    members: [
      { name: "TBD", role: "隊輔" },
      { name: "TBD", role: "隊輔" },
      { name: "TBD", role: "隊輔" },
      { name: "TBD", role: "隊輔" },
    ],
  },
];
