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
  progressHideProgress: number;
  logoRevealProgress: number;
};

const PROGRESS_HIDE_MS = 450;
const clamp01 = (value: number) => Math.min(Math.max(value, 0), 1);
const easeOutCubic = (value: number) => 1 - Math.pow(1 - value, 3);

export function useHomeLoadingAnimation(): HomeLoadingAnimationState {
  const [currentPhase, setCurrentPhase] = useState<AnimationPhase>("loading");
  const [loadingBarProgress, setLoadingBarProgress] = useState(0);
  const [progressHideProgress, setProgressHideProgress] = useState(0);
  const [logoRevealProgress, setLogoRevealProgress] = useState(0);

  useEffect(() => {
    let animationFrame = 0;
    let hideAnimationFrame = 0;
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

    const hideProgressTimer = window.setTimeout(() => {
      let hideStartTime: number | null = null;

      const animateHide = (timestamp: number) => {
        if (hideStartTime === null) {
          hideStartTime = timestamp;
        }

        const elapsed = timestamp - hideStartTime;
        const progress = easeOutCubic(clamp01(elapsed / PROGRESS_HIDE_MS));
        setProgressHideProgress(progress);

        if (elapsed < PROGRESS_HIDE_MS) {
          hideAnimationFrame = window.requestAnimationFrame(animateHide);
        } else {
          setProgressHideProgress(1);
        }
      };

      hideAnimationFrame = window.requestAnimationFrame(animateHide);
    }, LOADING_ANIMATION_MS);

    const startMainTransitionTimer = window.setTimeout(() => {
      setCurrentPhase("transitioning");
    }, LOADING_ANIMATION_MS + PAUSE_BEFORE_TRANSITION_MS);

    const finishTransitionTimer = window.setTimeout(() => {
      setCurrentPhase("ready");
    }, LOADING_ANIMATION_MS + PAUSE_BEFORE_TRANSITION_MS + MAIN_SCREEN_TRANSITION_MS);

    return () => {
      window.cancelAnimationFrame(animationFrame);
      window.cancelAnimationFrame(hideAnimationFrame);
      window.clearTimeout(hideProgressTimer);
      window.clearTimeout(startMainTransitionTimer);
      window.clearTimeout(finishTransitionTimer);
    };
  }, []);

  return { currentPhase, loadingBarProgress, progressHideProgress, logoRevealProgress };
}
