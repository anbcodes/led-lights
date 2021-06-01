import { bounce, constant, Value } from "./value";

interface ColorV { r: number, g: number, b: number }
export type Color = (i?: number) => ColorV

export const rgb = (r: number, g: number, b: number): Color => (): ColorV => {
  return { r, g, b }
}

export const fadeInOut = (color: Color, speed: Value): Color => {
  return dim(color, bounce({
    range: () => ({
      start: constant(0),
      end: constant(100),
    }),
    speed,
  }))

}

export const black = () => rgb(0, 0, 0);

export const hsv = (h: number, s: number, v: number): Color => {
  let { r, g, b } = HSVtoRGB(h, s, v);
  return rgb(r, g, b);
}

export const dim = (color: Color, amount: Value): Color => (i) => {
  let { h, s, v } = RGBtoHSV(color(i).r, color(i).g, color(i).b);
  v = v * (amount() / 100);
  return HSVtoRGB(h, s, v);
}

export const rainbow = (speed: number, s: number, v: number): Color => {
  let h = 0;
  setInterval(() => h = (h + 1) % Math.round(100 / speed), 10);
  return () => hsv(h / Math.round(100 / speed), s, v)();
}

function HSVtoRGB(h: number, s: number, v: number): ColorV {
  if (h > 1 || s > 1 || v > 1 || h < 0 || s < 0 || v < 0) {
    throw RangeError(`Invaild hsv value: ${h}, ${s}, ${v}`);
  }
  let r: number, g: number, b: number, i: number, f: number, p: number, q: number, t: number;
  i = Math.floor(h * 6);
  f = h * 6 - i;
  p = v * (1 - s);
  q = v * (1 - f * s);
  t = v * (1 - (1 - f) * s);
  switch (i % 6) {
    case 0: r = v, g = t, b = p; break;
    case 1: r = q, g = v, b = p; break;
    case 2: r = p, g = v, b = t; break;
    case 3: r = p, g = q, b = v; break;
    case 4: r = t, g = p, b = v; break;
    case 5: r = v, g = p, b = q; break;
  }
  return {
    r: Math.round(r! * 255),
    g: Math.round(g! * 255),
    b: Math.round(b! * 255)
  };
}

function RGBtoHSV(r: number, g: number, b: number) {
  let max = Math.max(r, g, b), min = Math.min(r, g, b),
    d = max - min,
    h: number,
    s: number = (max === 0 ? 0 : d / max),
    v: number = max / 255;

  switch (max) {
    case min: h = 0; break;
    case r: h = (g - b) + d * (g < b ? 6 : 0); h /= 6 * d; break;
    case g: h = (b - r) + d * 2; h /= 6 * d; break;
    case b: h = (r - g) + d * 4; h /= 6 * d; break;
  }

  return {
    h: h!,
    s: s!,
    v: v!
  };
}
