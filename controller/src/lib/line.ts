import { Color } from "./color";
import { set } from "./leds";
import { constant, Value } from "./value";
import { Rule } from "./rule";

export const line = ({ loc, color, width = constant(1) }: { loc: Value, color: Color, width?: Value }): Rule => (i) => {
  let ni = loc();

  for (let j = 0; j < width(); j++) {
    set({
      loc: ni + j,
      color
    });
  }


  return ni;
}
