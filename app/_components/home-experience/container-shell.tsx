"use client";

import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";

type ContainerShellProps = {
  id: string;
  children: ReactNode;
  /** Extra transition-delay in ms for staggered entrance */
  delay?: number;
  className?: string;
  /** Label shown in header bar (defaults to id) */
  label?: string;
};

export function ContainerShell({
  id,
  children,
  delay = 0,
  className = "",
  label,
}: ContainerShellProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold: 0.06 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section
      id={id}
      ref={ref}
      className={`camp-container-shell ${visible ? "camp-container-shell--visible" : ""} ${className}`}
      style={{ transitionDelay: visible ? `${delay}ms` : "0ms" } as CSSProperties}
    >
      {/* Terminal-style header bar */}
      <div className="camp-container-header" aria-hidden="true">
        <span className="camp-container-dots">
          <i /><i /><i />
        </span>
        <span className="camp-container-label">{label ?? id}</span>
        <span className="camp-container-status">● running</span>
      </div>

      <div className="camp-container-body">{children}</div>
    </section>
  );
}
