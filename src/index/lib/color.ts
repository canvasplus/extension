type RGBArray = [number, number, number];

const RECCOMENDED_READING_CONTRAST = 2;

const LIGHT_BACKGROUND_RGB: RGBArray = [255, 255, 255];
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

  if (maxL / minL > contrast) {
    return undefined;
  }

  let [r, g, b] = foreground;

  let offset = 0;

  if (bL > 127) {
    // light background
    offset = fL - bL / contrast;
    offset *= -1;
  } else {
    // dark background
    offset = contrast * bL - fL;
  }

  console.log("--------");
  console.log(foreground, offset, bL, fL);

  return [
    Math.round(Math.min(255, r + offset)),
    Math.round(Math.min(255, g + offset)),
    Math.round(Math.min(255, b + offset)),
  ];
}

export {
  RECCOMENDED_READING_CONTRAST,
  improveContrast,
  DARK_BACKGROUND_RGB,
  getLuminance,
  LIGHT_BACKGROUND_RGB,
};
