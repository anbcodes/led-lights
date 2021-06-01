import { Color } from "./color";
import { set } from "./leds";
import { Rule } from "./rule";
import { constant, Value } from "./value";

interface RangeV {
  start: Value,
  end: Value,
}

export type Range = (i?: number) => RangeV;

export const ranges: { [name: string]: Range } = {
  monitor: () => ({ start: constant(186), end: constant(300) }),
  backofdesk: () => ({ start: constant(96), end: constant(180) }),
  underdesk: () => ({ start: constant(0), end: constant(65) }),
  all: () => ({ start: constant(0), end: constant(300) }),
}

export const forRange = ({ range, run }: { range: Range, run: (i: number, relI: number) => void }) => {
  let r = range();
  for (let i = r.start(); i <= r.end(); i++) {
    run(i, i - r.start());
  }
}

export const setRange = ({ range, color }: { range: Range, color: Color }): Rule => (i) => {
  forRange({
    range,
    run: (i) => set({
      loc: i,
      color
    })
  });
  return i;
}

export const ofSize = (v: Value): Range => i => ({
  start: constant(0),
  end: v,
})
