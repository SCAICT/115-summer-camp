import { DetailNavbar } from "../_components/detail-navbar";
import { ScheduleFull } from "../_components/pages/schedule-full";

export const metadata = {
  title: "課程議程 — SCAICT 115 聯合暑訓",
};

export default function SchedulePage() {
  return (
    <div className="camp-detail-shell">
      <DetailNavbar />
      <main className="camp-detail-main">
        <div className="camp-detail-page">
          <ScheduleFull />
        </div>
      </main>
    </div>
  );
}
