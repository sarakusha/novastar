import * as t from 'io-ts';
import * as common from '../lib/common';
import { ChipBaseExtendPropey } from './ChipBaseExtendPropey';
 // import
export const ChipFM6356ExtendPropertyBase = t.intersection(
  [
    ChipBaseExtendPropey,
    t.partial({
      RegFirst: common.UInt16, // #92
      RegSecond: common.UInt16, // #94
      RegThird: common.UInt16, // #96
      RegFourth: common.UInt16, // #98
      RegFifth: common.UInt16, // #100
      IsElimateShadow: common.Bool, // #102
      Gain: common.UInt16, // #114
      LowGrayAdjustGrade: common.UInt8, // #128
      IsLowGrayAdjust: common.Bool, // #140
      IsLowGrayCompensate: common.Bool, // #152
      LowGrayCompensateGrade: common.UInt8, // #164
      IsFirstLineSlantsDark: common.Bool, // #176
      FirstLineSlantsDarkOptimization: common.UInt8, // #188
      IsUseNewModule: common.Bool, // #200
      ChipLibVersion: common.UInt8, // #202
    }),
  ],
  'ChipFM6356ExtendPropertyBase'
);
/**
 * Codec for {@link ChipFM6356ExtendProperty}
 * @category Codecs
 * @see Automatically generated from ../decompiled/Nova.LCT.GigabitSystem.ChipFM6356.decompiled.cs:89
 */
export const ChipFM6356ExtendProperty = t.intersection(
  [
    ChipFM6356ExtendPropertyBase,
    t.partial({ '@_xsi:type': t.literal('ChipFM6356ExtendProperty') }),
  ],
  'ChipFM6356ExtendProperty'
);
export interface ChipFM6356ExtendProperty extends t.TypeOf<typeof ChipFM6356ExtendProperty> {}
