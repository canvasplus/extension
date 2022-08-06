type RGBArray = [number, number, number];

const RECCOMENDED_READING_CONTRAST = 2.4;

const DARK_BACKGROUND_RGB: RGBArray = [49, 50, 54];

function getLuminance(rgb: RGBArray) {
  const WEIGHT_RED = 299;
  const WEIGHT_GREEN = 587;
  const WEIGHT_BLUE = 114;

  const [r, g, b] = rgb;
  return (WEIGHT_RED * r + WEIGHT_GREEN * g + WEIGHT_BLUE * b) / 1000;
}

function improveContrast(
  foreground: RGBArray,
  background: RGBArray,
  contrast: number
): RGBArray | undefined {
  const fL = getLuminance(foreground);
  const bL = getLuminance(background);

  const maxL = Math.max(fL, bL);
  const minL = Math.min(fL, bL);

  if (maxL / minL > contrast && minL !== 0) {
    return undefined;
  }

  let [r, g, b] = foreground;

  const sum = contrast * bL - fL;

  return [
    Math.round(Math.min(255, r + sum)),
    Math.round(Math.min(255, g + sum)),
    Math.round(Math.min(255, b + sum)),
  ];
}

export {
  RECCOMENDED_READING_CONTRAST,
  improveContrast,
  DARK_BACKGROUND_RGB,
  getLuminance,
};
