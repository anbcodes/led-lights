import { black, Color, fadeInOut, hsv, rainbow, rgb } from "./lib/color";
import { send, set } from "./lib/leds";
import { line } from "./lib/line";
import { bounce, constant, loop, variable } from "./lib/value";
import { ofSize, ranges, setRange, Range } from "./lib/range";
import { create } from "./lib/rule";

const createLines = (range: Range, color: Color, lineWidth: number, count: number) => {
  let rules = [
    setRange({
      range, color: black()
    }),
  ];

  for (let x = 0; x < count; x++) {
    rules.push(line({
      loc: loop({
        range: ranges.monitor,
        speed: constant(10),
      }),
      color: fadeInOut(color, constant(Math.random() * 70 + 30)),
      width: constant(2)
    }))
  }
}

export default function calm(color: Color, linesPerSection: number) {

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
        color: fadeInOut(color, constant(Math.random() * 70 + 30)),
        width: constant(2)
      }),

      line({
        loc: loop({
          range: ranges.monitor,
          speed: constant(20),
        }),
        color: fadeInOut(color, constant(Math.random() * 70 + 30)),
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
        color: fadeInOut(color, constant(Math.random() * 70 + 30)),
        width: constant(2),
      }),

      line({
        loc: bounce({
          range: ranges.backofdesk,
          speed: constant(15),
        }),
        color: fadeInOut(color, constant(Math.random() * 70 + 30)),
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
        color: fadeInOut(color, constant(Math.random() * 70 + 30)),
        width: constant(2),
      }),
      line({
        loc: bounce({
          range: ranges.underdesk,
          speed: constant(30),
        }),
        color: fadeInOut(color, constant(Math.random() * 70 + 30)),
        width: constant(2),
      }),
    ]
  });

}

