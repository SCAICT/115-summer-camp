import { DetailNavbar } from "../_components/detail-navbar";
import { StaffFull } from "../_components/pages/staff-full";

export const metadata = {
  title: "籌備組 — SCAICT 115 聯合暑訓",
};

export default function StaffPage() {
  return (
    <div className="camp-detail-shell">
      <DetailNavbar />
      <main className="camp-detail-main">
        <div className="camp-detail-page">
          <StaffFull />
        </div>
      </main>
    </div>
  );
}
