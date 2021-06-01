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

let color = hsv(+process.argv[2], +process.argv[3], +process.argv[4]);

create({
  speed: 60,
  rules: [
    setRange({
      range: ranges.monitor, color: black()
    }),
    line({
      loc: loop({
        range: ranges.monitor,
        speed: constant(10),
      }),
      color,
      width: constant(2)
    }),

    line({
      loc: loop({
        range: ranges.monitor,
        speed: constant(20),
      }),
      color,
      width: constant(2)
    }),
  ]
});

create({
  speed: 30,
  rules: [
    setRange({
      range: ranges.backofdesk, color: black()
    }),
    line({
      loc: bounce({
        range: ranges.backofdesk,
        speed: constant(30),
      }),
      color,
      width: constant(2),
    }),

    line({
      loc: bounce({
        range: ranges.backofdesk,
        speed: constant(15),
      }),
      color,
      width: constant(2),
    }),
  ]
});

create({
  speed: 30,
  rules: [
    setRange({
      range: ranges.underdesk, color: black()
    }),
    line({
      loc: bounce({
        range: ranges.underdesk,
        speed: constant(20),
      }),
      color,
      width: constant(2),
    }),
    line({
      loc: bounce({
        range: ranges.underdesk,
        speed: constant(30),
      }),
      color,
      width: constant(2),
    }),
  ]
});
