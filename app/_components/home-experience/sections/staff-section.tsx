import Link from "next/link";
import { STAFF_GROUPS } from "./staff-data";

function PersonIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="8" r="4" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M4 20c0-4 3.6-7 8-7s8 3 8 7"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

// 首頁預覽：只顯示總召組
const PREVIEW_GROUPS = STAFF_GROUPS.filter((g) => g.title === "總召組");

export function StaffSection() {
  return (
    <>
      <p className="camp-section-overline">Staff</p>
      <h2 className="camp-section-title">籌備組</h2>
      <p className="camp-section-lead">
        由 SCAICT 成員組成的籌備團隊，人員名單確認後陸續公布。
      </p>

      {PREVIEW_GROUPS.map(({ title, desc, members }) => (
        <div key={title} className="camp-staff-group">
          <h3 className="camp-staff-group-heading">{title}</h3>
          {desc && <p className="camp-staff-group-desc">{desc}</p>}
          <div className="camp-staff-cards">
            {members.map((person, i) => (
              <div
                key={i}
                className={`camp-staff-card${person.role === "總召" ? " camp-staff-card--lead" : ""}`}
              >
                <div className="camp-staff-avatar">
                  <PersonIcon />
                </div>
                <p className="camp-staff-name">{person.name}</p>
                <span className="camp-staff-role">{person.role}</span>
              </div>
            ))}
          </div>
        </div>
      ))}

      <Link href="/staff" className="camp-section-more" style={{ marginTop: "2rem" }}>
        認識所有工作人員
        <span aria-hidden="true"> →</span>
      </Link>
    </>
  );
}
