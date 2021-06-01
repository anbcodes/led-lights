import calm from "./calm";
import { black } from "./lib/color";
import { send } from "./lib/leds";
import { ranges, setRange } from "./lib/range";

setRange({
  range: ranges.all,
  color: black(),
})(0);

setInterval(() => {
  send();
}, 1000 / 30);

let modes = {
  "calm": calm,
}

let mode = process.argv[2];

