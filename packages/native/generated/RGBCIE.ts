import * as t from 'io-ts';
import { CIEValue } from './CIEValue'; // import
/**
 * Codec for interface {@link RGBCIE}
 * @category Codecs
 * @see Automatically generated from ../decompiled/Nova.LCT.GigabitSystem.DataClass.decompiled.cs:72098
 */
export const RGBCIE = t.partial(
  {
    BLed: CIEValue, // #72109
    GLed: CIEValue, // #72122
    RLed: CIEValue, // #72135
    WLed: CIEValue, // #72148
  },
  'RGBCIE'
);
export interface RGBCIE extends t.TypeOf<typeof RGBCIE> {
  BLed?: CIEValue;
  GLed?: CIEValue;
  RLed?: CIEValue;
  WLed?: CIEValue;
}
