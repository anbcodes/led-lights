export type Rule = (i: number) => number;

interface RuleV {
  interval: NodeJS.Timeout,
  speed: number,
  rules: Rule[],
}

export const create = ({ speed, rules }: { speed: number, rules: Rule[] }): RuleV => {
  const run = (v: number) => {
    for (let x = 0; x < rules.length - 1; x++) {
      rules[x](v)
    }
    return rules[rules.length - 1](v);
  }

  let i = run(0);

  let interval = setInterval(() => {
    i = run(i);
  }, 1000 / speed);

  return {
    interval,
    speed,
    rules,
  }
}
