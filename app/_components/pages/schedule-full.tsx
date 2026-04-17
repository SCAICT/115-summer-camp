"use client";

import { useState } from "react";
import { DAYS, TAG_LABELS, type Tag } from "../home-experience/sections/schedule-data";

type DetailLevel = "brief" | "full";

export function ScheduleFull() {
  const [detail, setDetail] = useState<DetailLevel>("full");

  return (
    <>
      <div className="camp-section-header">
        <div>
          <p className="camp-section-overline">Schedule</p>
          <h1 className="camp-section-title">活動議程</h1>
        </div>
        <div className="camp-schedule-toggle" role="group" aria-label="顯示模式">
          <button
            className={`camp-toggle-btn ${detail === "brief" ? "camp-toggle-btn--active" : ""}`}
            onClick={() => setDetail("brief")}
          >
            簡略
          </button>
          <button
            className={`camp-toggle-btn ${detail === "full" ? "camp-toggle-btn--active" : ""}`}
            onClick={() => setDetail("full")}
          >
            詳細
          </button>
        </div>
      </div>

      <div className="camp-schedule-list">
        {DAYS.map((day) => (
          <div key={day.badge} className="camp-schedule-day-block">
            <div className="camp-schedule-day-header">
              <span className="camp-schedule-day-badge">{day.badge}</span>
              <span className="camp-schedule-day-title">{day.title}</span>
            </div>

            {day.rows.map((row, i) => (
              <div key={i} className="camp-schedule-row">
                <span className="camp-schedule-time">{row.time}</span>
                <div className="camp-schedule-info">
                  <p className="camp-schedule-name">{row.name}</p>
                  {detail === "full" && row.desc && (
                    <p className="camp-schedule-desc">{row.desc}</p>
                  )}
                  {detail === "full" && (
                    <span className={`camp-schedule-tag camp-tag--${row.tag as Tag}`}>
                      {TAG_LABELS[row.tag as Tag]}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </>
  );
}
