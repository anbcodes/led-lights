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

let monitorSpeed = variable(120);

create({
  speed: 60,
  rules: [
    setRange({
      range: ranges.monitor, color: black()
    }),
    line({
      loc: loop({
        range: ranges.monitor,
        speed: constant(50),
      }),
      color,
      width: constant(4)
    }),

    line({
      loc: loop({
        range: ranges.monitor,
        speed: constant(120),
      }),
      color,
      width: constant(4)
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
        speed: constant(150),
      }),
      color,
      width: constant(10),
    }),

    line({
      loc: bounce({
        range: ranges.backofdesk,
        speed: constant(70),
      }),
      color,
      width: constant(10),
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
        speed: constant(60),
      }),
      color,
      width: constant(2),
    }),
    line({
      loc: bounce({
        range: ranges.underdesk,
        speed: constant(170),
      }),
      color,
      width: constant(4),
    }),
  ]
});
