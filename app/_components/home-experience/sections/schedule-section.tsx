import Link from "next/link";
import { DAYS } from "./schedule-data";

export function ScheduleSection() {
  return (
    <>
      <p className="camp-section-overline">Schedule</p>
      <h2 className="camp-section-title">活動議程</h2>
      <p className="camp-section-lead">
        三天密集工作坊，從容器化基礎到雲端上線一氣呵成。
      </p>

      <div className="camp-schedule-brief">
        {DAYS.map((day) => (
          <div key={day.badge} className="camp-schedule-brief-card">
            <div className="camp-schedule-brief-head">
              <span className="camp-schedule-day-badge">{day.badge}</span>
              <span className="camp-schedule-brief-title">{day.title}</span>
            </div>
            <div className="camp-schedule-brief-topics">
              {day.topics.map((t) => (
                <span key={t} className="camp-schedule-brief-topic">{t}</span>
              ))}
            </div>
          </div>
        ))}
      </div>

      <Link href="/schedule" className="camp-section-more">
        查看完整議程
        <span aria-hidden="true"> →</span>
      </Link>
    </>
  );
}
