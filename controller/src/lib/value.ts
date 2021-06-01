import { Range } from './range';

export type Value = (i?: number) => number;

export const constant = (v: number): Value => (i) => v;

export const variable = (initial: number): { value: Value, set: (newValue: number) => void } => {
  let i = initial;
  return { value: () => i, set: (newValue: number) => i = newValue };
}

export const add = (v1: Value, v2: Value): Value => (i) => v1(i) + v2(i);

export const bounce = ({ range, speed, amount = constant(1) }: { range: Range, speed: Value, amount?: Value }): Value => {
  let goingUp = true;
  let i = range().start();
  let update = () => {
    let rangeV = range();
    let ni = i;

    if (goingUp) {
      ni = i + amount();
    } else {
      ni = i - amount();
    }

    if (i >= rangeV.end()) {
      ni = rangeV.end() - amount();
      goingUp = false;
    }
    if (i <= rangeV.start()) {
      ni = rangeV.start() + amount();
      goingUp = true;
    }

    i = ni;
    setTimeout(update, 1000 / speed());
  }

  setTimeout(update, 1000 / speed());

  return () => i;
}
export const loop = ({ range, speed, amount = constant(1) }: { range: Range, speed: Value, amount?: Value }): Value => {
  let i = range().start();
  let update = () => {
    let rangeV = range();
    let ni = i + amount();
    let start = rangeV.start();
    let end = rangeV.end();

    if (i > end) {
      ni = start + amount();
    }

    if (i < start) {
      ni = end - amount();
    }

    i = ni;
    setTimeout(update, 1000 / speed());
  }

  setTimeout(update, 1000 / speed());

  return () => i;
}
