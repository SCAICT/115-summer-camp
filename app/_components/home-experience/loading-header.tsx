import Image from "next/image";
import type { AnimationPhase } from "./animation-phase";

type LoadingHeaderProps = {
  currentPhase: AnimationPhase;
  loadingBarProgress: number;
  logoRevealProgress: number;
};

export function LoadingHeader({
  currentPhase,
  loadingBarProgress,
  logoRevealProgress,
}: LoadingHeaderProps) {
  const displayedLoadingBarProgress =
    currentPhase === "loading" ? loadingBarProgress : 1;
  const logoHiddenRight =
    currentPhase === "loading" ? `${100 - logoRevealProgress * 100}%` : "0%";

  return (
    <header className="camp-brand-anchor">
      <div className="camp-logo-stack">
        <div className="camp-logo-reveal" style={{ clipPath: `inset(0 ${logoHiddenRight} 0 0)` }}>
          <Image
            src="/LOGO/SCAICT.svg"
            alt="SCAICT logo"
            fill
            priority
            sizes="(max-width: 768px) 62vw, 420px"
            className="camp-logo-image"
          />
        </div>
      </div>

      <div className="camp-progress" aria-hidden="true">
        <span
          className="camp-progress-fill"
          style={{ transform: `scaleX(${displayedLoadingBarProgress})` }}
        />
      </div>
    </header>
  );
}
