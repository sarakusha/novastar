import * as t from 'io-ts';
import * as common from '../lib/common';
import { ChipBaseExtendPropey } from './ChipBaseExtendPropey';
 // import
export const ChipSUM2117ExtendPropertyBase = t.intersection(
  [
    ChipBaseExtendPropey,
    t.type({
      SetDataInput: common.Int32_1,
    }),
    t.partial({
      IsAdvancedMode: common.Bool, // #64823
      RSetVanishingCompensation: common.UInt8, // #64836
      GSetVanishingCompensation: common.UInt8, // #64849
      BSetVanishingCompensation: common.UInt8, // #64862
      RSetVanishing: common.UInt8, // #64875
      GSetVanishing: common.UInt8, // #64888
      BSetVanishing: common.UInt8, // #64901
      InflectionCurrent: common.Int32, // #64914
      SetCurrentPosition: common.Int32, // #64940
      RedRegValueConfigFirst: common.UInt16, // #64953
      GreenRegValueConfigFirst: common.UInt16, // #64966
      BlueRegValueConfigFirst: common.UInt16, // #64979
      VRedRegValueConfigFirst: common.UInt16,
    }),
  ],
  'ChipSUM2117ExtendPropertyBase'
);
/**
 * Codec for {@link ChipSUM2117ExtendProperty}
 * @category Codecs
 * @see Automatically generated from ../decompiled/Nova.LCT.GigabitSystem.DataClass.decompiled.cs:64793
 */
export const ChipSUM2117ExtendProperty = t.intersection(
  [
    ChipSUM2117ExtendPropertyBase,
    t.partial({ '@_xsi:type': t.literal('ChipSUM2117ExtendProperty') }),
  ],
  'ChipSUM2117ExtendProperty'
);
export interface ChipSUM2117ExtendProperty extends t.TypeOf<typeof ChipSUM2117ExtendProperty> {}
