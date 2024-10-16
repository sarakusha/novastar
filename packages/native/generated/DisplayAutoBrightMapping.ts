import * as t from 'io-ts';
import * as common from '../lib/common';
/**
 * Codec for interface {@link DisplayAutoBrightMapping}
 * @category Codecs
 * @see Automatically generated from ../decompiled/Nova.LCT.GigabitSystem.DataClass.decompiled.cs:73511
 */
export const DisplayAutoBrightMapping = t.partial(
  {
    EnvironmentBright: common.Int32, // #73518
    DisplayBright: common.Int32, // #73531
  },
  'DisplayAutoBrightMapping'
);
export interface DisplayAutoBrightMapping extends t.TypeOf<typeof DisplayAutoBrightMapping> {}
