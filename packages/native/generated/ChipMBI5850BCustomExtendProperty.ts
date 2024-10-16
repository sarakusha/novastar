import * as t from 'io-ts';
import * as common from '../lib/common';
/**
 * Codec for interface {@link ChipMBI5850BCustomExtendProperty}
 * @category Codecs
 * @see Automatically generated from ../decompiled/Nova.LCT.GigabitSystem.ChipMBI5850B.decompiled.cs:3581
 */
export const ChipMBI5850BCustomExtendProperty = t.intersection(
  [
    t.type({
      CVLED_CHANNEL_NUMBER: common.Int32_4, // #3584
      MBI5759ICVLED: common.XMLArray(common.UInt32, 'uint'),
    }),
    t.partial({
      ICVLEDNumber: common.Int32,
    }),
  ],
  'ChipMBI5850BCustomExtendProperty'
);
export interface ChipMBI5850BCustomExtendProperty
  extends t.TypeOf<typeof ChipMBI5850BCustomExtendProperty> {}
