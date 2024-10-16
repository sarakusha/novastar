import * as t from 'io-ts';
import * as common from '../lib/common';
/**
 * Codec for interface {@link PumpGroupsLine}
 * @category Codecs
 * @see Automatically generated from ../decompiled/Nova.LCT.GigabitSystem.DataClass.decompiled.cs:29095
 */
export const PumpGroupsLine = t.partial(
  {
    Group: common.Int32, // #29098
    Connect: common.Int32, // #29100
    Line: common.Int32, // #29102
  },
  'PumpGroupsLine'
);
export interface PumpGroupsLine extends t.TypeOf<typeof PumpGroupsLine> {}
