import { black, rainbow } from "../lib/color";
import { send } from "../lib/leds";
import { line } from "../lib/line";
import { bounce, constant, loop } from "../lib/value";
import { ranges, setRange } from "../lib/range";
import { create } from "../lib/rule";

setInterval(() => {
  send();
}, 1000 / 60);


setRange({
  range: ranges.all,
  color: black(),
})(0);


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
      color: rainbow(0.2, 1, 1),
      width: constant(4)
    }),

    line({
      loc: loop({
        range: ranges.monitor,
        speed: constant(120),
      }),
      color: rainbow(0.5, 1, 1),
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
      color: rainbow(0.4, 1, 1),
      width: constant(10),
    }),

    line({
      loc: bounce({
        range: ranges.backofdesk,
        speed: constant(70),
      }),
      color: rainbow(0.9, 1, 1),
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
      color: rainbow(0.16, 1, 1),
      width: constant(2),
    }),
    line({
      loc: bounce({
        range: ranges.underdesk,
        speed: constant(170),
      }),
      color: rainbow(0.8, 1, 1),
      width: constant(4),
    }),
  ]
});
