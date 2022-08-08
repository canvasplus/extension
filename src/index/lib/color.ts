import luminance from "relative-luminance";
import { simplify, evaluate } from "mathjs";

type RGBArray = [number, number, number];

const RECCOMENDED_READING_CONTRAST = 3.5;

const LIGHT_BACKGROUND_RGB: RGBArray = [255, 255, 255];
const DARK_BACKGROUND_RGB: RGBArray = [49, 50, 54];

const WEIGHT_RED = 0.299;
const WEIGHT_GREEN = 0.587;
const WEIGHT_BLUE = 0.114;

function RGBtoHSP(rgb: RGBArray): RGBArray {
  const [r, g, b] = rgb;

  let h, s;

  const p = Math.sqrt(
    r * r * WEIGHT_RED + g * g * WEIGHT_GREEN + b * b * WEIGHT_BLUE
  );

  if (r === g && r === b) {
    // all equal
    h = 0;
    s = 0;
    return [h, s, p];
  }
  if (r >= g && r >= b) {
    // r is the largest
    if (b >= g) {
      h = 6 / 6 - ((1 / 6) * (b - g)) / (r - g);
      s = 1 - g / r;
    } else {
      h = 0 / 6 + ((1 / 6) * (g - b)) / (r - b);
      s = 1 - b / r;
    }
  } else if (g >= r && g >= b) {
    // g is the largest
    if (r >= b) {
      h = 2 / 6 - ((1 / 6) * (r - b)) / (g - b);
      s = 1 - b / g;
    } else {
      h = 2 / 6 + ((1 / 6) * (b - r)) / (g - r);
      s = 1 - r / g;
    }
  } else {
    // b is the largest
    if (g >= r) {
      h = 4 / 6 - ((1 / 6) * (g - r)) / (b - r);
      s = 1 - r / b;
    } else {
      h = 4 / 6 + ((1 / 6) * (r - g)) / (b - g);
      s = 1 - g / b;
    }
  }
  return [h, s, p];
}

function HSPtoRGB(hsp: RGBArray): RGBArray {
  let [h, s, p] = hsp;

  let [r, g, b] = [0, 0, 0];

  let part;
  const minOverMax = 1 - s;

  if (minOverMax > 0) {
    if (h < 1 / 6) {
      // R>G>B
      h = 6 * (h - 0 / 6);
      part = 1 + h * (1 / minOverMax - 1);

      b =
        p /
        Math.sqrt(
          WEIGHT_RED / minOverMax / minOverMax +
            WEIGHT_GREEN * part * part +
            WEIGHT_BLUE
        );
      r = b / minOverMax;
      g = b + h * (r - b);
    } else if (h < 2 / 6) {
      // G>R>B
      h = 6 * (-h + 2 / 6);
      part = 1 + h * (1 / minOverMax - 1);

      b =
        p /
        Math.sqrt(
          WEIGHT_GREEN / minOverMax / minOverMax +
            WEIGHT_RED * part * part +
            WEIGHT_BLUE
        );
      r = b / minOverMax;
      g = b + h * (r - b);
    } else if (h < 3 / 6) {
      // G>B>R
      h = 6 * (h - 2 / 6);
      part = 1 + h * (1 / minOverMax - 1);

      r =
        p /
        Math.sqrt(
          WEIGHT_GREEN / minOverMax / minOverMax +
            WEIGHT_BLUE * part * part +
            WEIGHT_RED
        );
      r = b / minOverMax;
      g = b + h * (r - b);
    } else if (h < 4 / 6) {
      // B>G>R
      h = 6 * (-h + 4 / 6);
      part = 1 + h * (1 / minOverMax - 1);

      r =
        p /
        Math.sqrt(
          WEIGHT_BLUE / minOverMax / minOverMax +
            WEIGHT_GREEN * part * part +
            WEIGHT_RED
        );
      r = b / minOverMax;
      g = b + h * (r - b);
    } else if (h < 5 / 6) {
      // B>R>G
      h = 6 * (h - 4 / 6);
      part = 1 + h * (1 / minOverMax - 1);

      g =
        p /
        Math.sqrt(
          WEIGHT_BLUE / minOverMax / minOverMax +
            WEIGHT_RED * part * part +
            WEIGHT_GREEN
        );
      r = b / minOverMax;
      g = b + h * (r - b);
    } else {
      // R>B>G
      h = 6 * (-h + 6 / 6);
      part = 1 + h * (1 / minOverMax - 1);

      g =
        p /
        Math.sqrt(
          WEIGHT_RED / minOverMax / minOverMax +
            WEIGHT_BLUE * part * part +
            WEIGHT_GREEN
        );
      r = b / minOverMax;
      g = b + h * (r - b);
    }
  } else {
    if (h < 1 / 6) {
      //  R>G>B
      h = 6 * (h - 0 / 6);
      r = Math.sqrt((p * p) / (WEIGHT_RED + WEIGHT_GREEN * h * h));
      g = r * h;
      b = 0;
    } else if (h < 2 / 6) {
      //  G>R>B
      h = 6 * (-h + 2 / 6);
      g = Math.sqrt((p * p) / (WEIGHT_GREEN + WEIGHT_RED * h * h));
      r = g * h;
      b = 0;
    } else if (h < 3 / 6) {
      //  G>B>R
      h = 6 * (h - 2 / 6);
      g = Math.sqrt((p * p) / (WEIGHT_GREEN + WEIGHT_BLUE * h * h));
      b = g * h;
      r = 0;
    } else if (h < 4 / 6) {
      //  B>G>R
      h = 6 * (-h + 4 / 6);
      b = Math.sqrt((p * p) / (WEIGHT_BLUE + WEIGHT_GREEN * h * h));
      g = b * h;
      r = 0;
    } else if (h < 5 / 6) {
      //  B>R>G
      h = 6 * (h - 4 / 6);
      b = Math.sqrt((p * p) / (WEIGHT_BLUE + WEIGHT_RED * h * h));
      r = b * h;
      g = 0;
    } else {
      //  R>B>G
      h = 6 * (-h + 6 / 6);
      r = Math.sqrt((p * p) / (WEIGHT_RED + WEIGHT_BLUE * h * h));
      b = r * h;
      g = 0;
    }
  }

  return [r, g, b];
}

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
  const fL = luminance(foreground);
  const bL = luminance(background);

  const maxL = Math.max(fL, bL);
  const minL = Math.min(fL, bL);

  const diff = (maxL + 0.05) / (minL + 0.05);

  if (diff > contrast) {
    return undefined;
  }

  let darken = bL > fL;

  let dL =
    (darken ? bL : fL + 0.05) * (darken ? 1 / contrast : contrast / diff) -
    0.05;
  // const dL = (fL + 0.05) * (contrast / diff) - 0.05;

  if (dL < 0) {
    // foreground is darker than background, but you cant darken any further
    dL = contrast * (bL + 0.05) - 0.05;
    darken = false;
  } else if (dL > 1) {
    // foreground is lighter than background, but you cant lighten any further
    dL = (bL + 0.05) / contrast - 0.05;
    darken = true;
  }

  const step =
    Math.pow(fL + (darken ? -dL : dL), darken ? 12 / 5 : 5 / 12) *
    (darken ? -255 : 255);

  return [
    Math.round(Math.min(255, foreground[0] + step)),
    Math.round(Math.min(255, foreground[1] + step)),
    Math.round(Math.min(255, foreground[2] + step)),
  ];
}
export {
  RECCOMENDED_READING_CONTRAST,
  improveContrast,
  DARK_BACKGROUND_RGB,
  getLuminance,
  LIGHT_BACKGROUND_RGB,
  HSPtoRGB,
  RGBtoHSP,
};
