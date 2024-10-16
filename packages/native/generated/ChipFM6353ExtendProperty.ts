import * as t from 'io-ts';
import * as common from '../lib/common';
import { ChipBaseExtendPropey } from './ChipBaseExtendPropey';
 // import
export const ChipFM6353ExtendPropertyBase = t.intersection(
  [
    ChipBaseExtendPropey,
    t.type({
      RegFirst: common.withDefault(common.UInt16, 7536), // #944
      RegSecond: common.withDefault(common.UInt16, 64853), // #957
      RegThird: common.withDefault(common.UInt16, 16391), // #970
      RegFourth: common.withDefault(common.UInt16, 64),
    }),
    t.partial({
      LowAshPitsImprove: common.UInt8, // #996
      IsElimateShadow: common.Bool, // #1009
      Gain: common.UInt16, // #1022
      LowGrayAdjustGrade: common.UInt8, // #1035
      IsLowGrayAdjust: common.Bool, // #1048
      IsLowGrayCompensate: common.Bool, // #1061
      LowGrayCompensateGrade: common.UInt8, // #1074
      IsFirstLineSlantsDark: common.Bool, // #1087
      FirstLineSlantsDarkOptimization: common.UInt8, // #1100
      IsUseNewModule: common.Bool,
    }),
  ],
  'ChipFM6353ExtendPropertyBase'
);
/**
 * Codec for {@link ChipFM6353ExtendProperty}
 * @category Codecs
 * @see Automatically generated from ../decompiled/Nova.LCT.GigabitSystem.ChipFM6353.decompiled.cs:933
 */
export const ChipFM6353ExtendProperty = t.intersection(
  [
    ChipFM6353ExtendPropertyBase,
    t.partial({ '@_xsi:type': t.literal('ChipFM6353ExtendProperty') }),
  ],
  'ChipFM6353ExtendProperty'
);
export interface ChipFM6353ExtendProperty extends t.TypeOf<typeof ChipFM6353ExtendProperty> {}
