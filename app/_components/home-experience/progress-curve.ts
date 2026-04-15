const clamp01 = (value: number) => Math.min(Math.max(value, 0), 1);

const easeInOutCubic = (value: number) => {
  if (value < 0.5) {
    return 4 * value * value * value;
  }

  return 1 - Math.pow(-2 * value + 2, 3) / 2;
};

const easeOutQuart = (value: number) => 1 - Math.pow(1 - value, 4);
const easeOutCubic = (value: number) => 1 - Math.pow(1 - value, 3);

export const getLoadingBarProgress = (linearProgress: number) => {
  const progress = clamp01(linearProgress);

  if (progress <= 0.32) {
    const sectionProgress = progress / 0.32;
    return sectionProgress * 0.46;
  }

  if (progress <= 0.82) {
    const sectionProgress = (progress - 0.32) / 0.5;
    return 0.46 + easeInOutCubic(sectionProgress) * 0.39;
  }

  const sectionProgress = (progress - 0.82) / 0.18;
  return 0.85 + easeOutQuart(sectionProgress) * 0.15;
};

export const getLogoRevealProgress = (loadingBarProgress: number) => {
  const progress = clamp01(loadingBarProgress);
  const startDelayCompensation = clamp01((progress - 0.08) / 0.92);
  const dynamicLag = 0.18 * (1 - easeOutCubic(progress));
  return clamp01(startDelayCompensation - dynamicLag);
};
