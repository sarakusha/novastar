import * as t from 'io-ts';
import * as common from '../lib/common';
/**
 * Codec for interface {@link ChipMBI5850CustomExtendProperty}
 * @category Codecs
 * @see Automatically generated from ../decompiled/Nova.LCT.GigabitSystem.ChipMBI5850.decompiled.cs:535
 */
export const ChipMBI5850CustomExtendProperty = t.intersection(
  [
    t.type({
      CVLED_CHANNEL_NUMBER: common.Int32_4, // #538
      MBI5759ICVLED: common.XMLArray(common.UInt32, 'uint'),
    }),
    t.partial({
      ICVLEDNumber: common.Int32,
    }),
  ],
  'ChipMBI5850CustomExtendProperty'
);
export interface ChipMBI5850CustomExtendProperty
  extends t.TypeOf<typeof ChipMBI5850CustomExtendProperty> {}
