import { black, hsv, rainbow, rgb } from "../lib/color";
import { send, set } from "../lib/leds";
import { line } from "../lib/line";
import { bounce, constant, loop, variable } from "../lib/value";
import { ofSize, ranges, setRange } from "../lib/range";
import { create } from "../lib/rule";

setInterval(() => {
  send();
}, 1000 / 30);


setRange({
  range: ranges.all,
  color: black(),
})(0);

let color = rgb(+process.argv[2], +process.argv[3], +process.argv[4]);

for (let i = 0; i < 300; i++) {
  if (Math.random() > 0.97) {
    set({
      loc: i,
      color
    })
  }
}
