import * as t from 'io-ts';
import * as common from '../lib/common';
import { ChipBaseExtendPropey } from './ChipBaseExtendPropey';
 // import
export const ChipSM16369ExtendPropertyBase = t.intersection(
  [
    ChipBaseExtendPropey,
    t.type({
      RegisterArray: common.XMLArray(common.UInt16, 'ushort'),
    }),
    t.partial({
      ShadowEliminationLevel_1: common.UInt8, // #961
      ShadowEliminationTime_1: common.UInt8, // #973
      ShadowEliminationEnable_2: common.Bool, // #985
      ShadowEliminationLevel_2: common.UInt8, // #997
      ShadowEliminationEnable_3: common.Bool, // #1009
      ShadowEliminationLevel_3: common.UInt8, // #1021
      FirstLineDarkCompensationLevel: common.UInt8, // #1033
      FirstLineDarkCompensationTime: common.UInt8, // #1045
      LowGrayCompsention1: common.UInt8, // #1057
      LowGrayCompsention2: common.UInt8, // #1069
      LowGrayHorizontalStripesImproved: common.UInt8, // #1081
      CoupledEnhancementModeEn: common.Bool, // #1093
      CouplingOptimization_1: common.UInt8, // #1105
      CouplingOptimization_2: common.UInt16, // #1117
      EnergySavingMode: common.UInt8, // #1129
      GrayScaleUniformity: common.UInt8, // #1141
      CrossEliminationLevel: common.UInt8,
    }),
  ],
  'ChipSM16369ExtendPropertyBase'
);
/**
 * Codec for {@link ChipSM16369ExtendProperty}
 * @category Codecs
 * @see Automatically generated from ../decompiled/Nova.LCT.GigabitSystem.ChipSM16369.decompiled.cs:954
 */
export const ChipSM16369ExtendProperty = t.intersection(
  [
    ChipSM16369ExtendPropertyBase,
    t.partial({ '@_xsi:type': t.literal('ChipSM16369ExtendProperty') }),
  ],
  'ChipSM16369ExtendProperty'
);
export interface ChipSM16369ExtendProperty extends t.TypeOf<typeof ChipSM16369ExtendProperty> {}
