import { Color } from "./color";
import { forRange, Range } from "./range";
import SerialPort from 'serialport';
/* @ts-ignore */
import Readline from '@serialport/parser-readline';

const port = new SerialPort("/dev/ttyACM0");
const parser = port.pipe(new Readline());
parser.on('data', (d: string) => {
  console.log(d);
})

export const ledsBuffer = new Uint8Array(900);

export const set = ({ loc, color }: { loc: number, color: Color }) => {
  let colorV = color(loc);
  ledsBuffer[loc * 3] = colorV.r;
  ledsBuffer[loc * 3 + 1] = colorV.g;
  ledsBuffer[loc * 3 + 2] = colorV.b;
}

export const send = () => {
  let sbuf = new Uint8Array(1);
  sbuf[0] = 255;
  port.write(Buffer.from(sbuf));

  port.write(Buffer.from(ledsBuffer));
}
