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

let color = rgb(+process.argv[3], +process.argv[4], +process.argv[5]);

let colored = new Set();

const add = () => {
  let value: number = null as unknown as number;
  while (colored.has(value)) {
    value = Math.round(Math.random() * 300);
  }

  colored.add(value);

  set({
    loc: value!,
    color,
  })
}

for (let i = 0; i < +process.argv[2]; i++) {
  add();
}
