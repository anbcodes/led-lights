import { black, hsv, rgb } from "./lib/color";
import { send, set } from "./lib/leds";
import { line } from "./lib/line";
import { ranges, setRange } from "./lib/range";
import { create } from "./lib/rule";

const lights = [
  0, 0, 0, 0, 0, 1, 1, 2,
  2, 3, 4, 5, 6, 7, 8, 9,
  11, 12, 13, 15, 17, 18, 20, 22,
  24, 26, 28, 30, 32, 35, 37, 39,
  42, 44, 47, 49, 52, 55, 58, 60,
  63, 66, 69, 72, 75, 78, 81, 85,
  88, 91, 94, 97, 101, 104, 107, 111,
  114, 117, 121, 124, 127, 131, 134, 137,
  141, 144, 147, 150, 154, 157, 160, 163,
  167, 170, 173, 176, 179, 182, 185, 188,
  191, 194, 197, 200, 202, 205, 208, 210,
  213, 215, 217, 220, 222, 224, 226, 229,
  231, 232, 234, 236, 238, 239, 241, 242,
  244, 245, 246, 248, 249, 250, 251, 251,
  252, 253, 253, 254, 254, 255, 255, 255,
  255, 255, 255, 255, 254, 254, 253, 253,
  252, 251, 251, 250, 249, 248, 246, 245,
  244, 242, 241, 239, 238, 236, 234, 232,
  231, 229, 226, 224, 222, 220, 217, 215,
  213, 210, 208, 205, 202, 200, 197, 194,
  191, 188, 185, 182, 179, 176, 173, 170,
  167, 163, 160, 157, 154, 150, 147, 144,
  141, 137, 134, 131, 127, 124, 121, 117,
  114, 111, 107, 104, 101, 97, 94, 91,
  88, 85, 81, 78, 75, 72, 69, 66,
  63, 60, 58, 55, 52, 49, 47, 44,
  42, 39, 37, 35, 32, 30, 28, 26,
  24, 22, 20, 18, 17, 15, 13, 12,
  11, 9, 8, 7, 6, 5, 4, 3,
  2, 2, 1, 1, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0];

setRange({
  range: ranges.all,
  color: black(),
})(0);

setInterval(() => {
  send();
}, 1000 / 60);


let DEG_TO_RAD = (Math.PI / 180)
let sin255 = (v: number) => Math.floor((Math.sin(v * DEG_TO_RAD) + 1) / 2 * 255);

let i = 0;
setInterval(() => {
  let a = i * 36;
  // console.log(a);
  let c = rgb(lights[(a + 120) % 360] * 0.5, lights[a % 360] * 0.5, lights[(a + 240) % 360] * 0.5);
  console.log(c().r + c().g + c().b);
  let i2 = 0;
  let int = setInterval(() => {
    if (i2 % 1 === 0) {
      set({
        loc: i2 % 300,
        color: c,
      })
    }

    i2++;
    if (i2 === 300) {
      clearInterval(int);
    }
  }, 1000 / 300);
  console.log(c());

  i++;
}, 1000 / 2)
