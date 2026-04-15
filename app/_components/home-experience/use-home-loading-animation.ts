import { useEffect, useState } from "react";
import {
  LOADING_ANIMATION_MS,
  MAIN_SCREEN_TRANSITION_MS,
  PAUSE_BEFORE_TRANSITION_MS,
} from "./animation-durations";
import type { AnimationPhase } from "./animation-phase";
import { getLoadingBarProgress, getLogoRevealProgress } from "./progress-curve";

type HomeLoadingAnimationState = {
  currentPhase: AnimationPhase;
  loadingBarProgress: number;
  logoRevealProgress: number;
};

export function useHomeLoadingAnimation(): HomeLoadingAnimationState {
  const [currentPhase, setCurrentPhase] = useState<AnimationPhase>("loading");
  const [loadingBarProgress, setLoadingBarProgress] = useState(0);
  const [logoRevealProgress, setLogoRevealProgress] = useState(0);

  useEffect(() => {
    let animationFrame = 0;
    let startTime: number | null = null;

    const animate = (timestamp: number) => {
      if (startTime === null) {
        startTime = timestamp;
      }

      const elapsed = timestamp - startTime;
      const linearProgress = elapsed / LOADING_ANIMATION_MS;
      const nextLoadingBarProgress = getLoadingBarProgress(linearProgress);
      const nextLogoRevealProgress = getLogoRevealProgress(nextLoadingBarProgress);

      setLoadingBarProgress(nextLoadingBarProgress);
      setLogoRevealProgress(nextLogoRevealProgress);

      if (linearProgress < 1) {
        animationFrame = window.requestAnimationFrame(animate);
      } else {
        setLoadingBarProgress(1);
        setLogoRevealProgress(1);
      }
    };

    animationFrame = window.requestAnimationFrame(animate);

    const startMainTransitionTimer = window.setTimeout(() => {
      setCurrentPhase("transitioning");
    }, LOADING_ANIMATION_MS + PAUSE_BEFORE_TRANSITION_MS);

    const finishTransitionTimer = window.setTimeout(() => {
      setCurrentPhase("ready");
    }, LOADING_ANIMATION_MS + PAUSE_BEFORE_TRANSITION_MS + MAIN_SCREEN_TRANSITION_MS);

    return () => {
      window.cancelAnimationFrame(animationFrame);
      window.clearTimeout(startMainTransitionTimer);
      window.clearTimeout(finishTransitionTimer);
    };
  }, []);

  return { currentPhase, loadingBarProgress, logoRevealProgress };
}
