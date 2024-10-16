import * as t from 'io-ts';
import * as common from '../lib/common';
import { ChipSUM2033BaseExtendProperty } from './ChipSUM2033BaseExtendProperty'; // import
/**
 * Codec for interface {@link ChipSUM2033ExtendProperty}
 * @category Codecs
 * @see Automatically generated from ../decompiled/Nova.LCT.GigabitSystem.DataClass.decompiled.cs:64268
 */
export const ChipSUM2033ExtendProperty = t.intersection(
  [
    t.type({
      RedVanishingRating: common.UInt8_15, // #64332
      GreenVanishingRating: common.withDefault(common.UInt8, 13), // #64345
      BlueVanishingRating: common.UInt8_5, // #64358
      VRedVanishingRating: common.UInt8_15, // #64436
      RedRegValueConfigFourth: common.UInt16_7168, // #64449
      GreenRegValueConfigFourth: common.UInt16_7168, // #64462
      BlueRegValueConfigFourth: common.UInt16_7168, // #64475
      VRedRegValueConfigFourth: common.UInt16_7168,
    }),
    t.partial({
      RedProperty: ChipSUM2033BaseExtendProperty, // #64270
      GreenProperty: ChipSUM2033BaseExtendProperty, // #64272
      BlueProperty: ChipSUM2033BaseExtendProperty, // #64274
      VRedProperty: ChipSUM2033BaseExtendProperty, // #64276
      UsingBright: common.Bool, // #64308
      UsingSUM2033Gamma: common.Bool, // #64371
      IsDoubleRate: common.Bool, // #64384
      RedRegValueConfigThird: common.UInt16, // #64397
      GreenRegValueConfigThird: common.UInt16, // #64410
      BlueRegValueConfigThird: common.UInt16, // #64423
      VRedRegValueConfigThird: common.UInt16,
    }),
  ],
  'ChipSUM2033ExtendProperty'
);
export interface ChipSUM2033ExtendProperty extends t.TypeOf<typeof ChipSUM2033ExtendProperty> {
  RedProperty?: ChipSUM2033BaseExtendProperty;
  GreenProperty?: ChipSUM2033BaseExtendProperty;
  BlueProperty?: ChipSUM2033BaseExtendProperty;
  VRedProperty?: ChipSUM2033BaseExtendProperty;
}
