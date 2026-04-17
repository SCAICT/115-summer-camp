"use client";

import type { CSSProperties } from "react";
import { MAIN_SCREEN_TRANSITION_MS } from "./home-experience/animation-durations";
import { LoadingHeader } from "./home-experience/loading-header";
import { MainContent } from "./home-experience/main-content";
import ScrollToTop from "./home-experience/scroll-to-top";
import SmoothScroll from "./home-experience/smooth-scroll";
import { useHomeLoadingAnimation } from "./home-experience/use-home-loading-animation";

export default function HomeExperience() {
  const { currentPhase, loadingBarProgress, progressHideProgress, logoRevealProgress } =
    useHomeLoadingAnimation();

  const animationVars = {
    "--transition-duration": `${MAIN_SCREEN_TRANSITION_MS}ms`,
  } as CSSProperties;

  return (
    <SmoothScroll>
      <div className={`camp-shell camp-shell--${currentPhase}`} style={animationVars}>
        <div className="camp-loading-surface" aria-hidden="true" />
        <LoadingHeader
          currentPhase={currentPhase}
          loadingBarProgress={loadingBarProgress}
          progressHideProgress={progressHideProgress}
          logoRevealProgress={logoRevealProgress}
        />
        <MainContent currentPhase={currentPhase} />
        <ScrollToTop />
      </div>
    </SmoothScroll>
  );
}
