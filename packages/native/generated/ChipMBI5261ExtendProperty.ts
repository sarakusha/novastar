import * as t from 'io-ts';
import * as common from '../lib/common';
import { ChipBaseExtendPropey } from './ChipBaseExtendPropey';
 // import
export const ChipMBI5261ExtendPropertyBase = t.intersection(
  [
    ChipBaseExtendPropey,
    t.type({
      REGLENTH: common.Int32_7, // #2766
      RegValue: common.XMLArray(common.UInt16, 'ushort'),
    }),
    t.partial({
      IsUseNewModule: common.Bool, // #2770
      ChipLibVersion: common.UInt8, // #2772
      LowGrayCrossGrainElimination: common.Bool, // #2774
      CurrentGain: common.UInt8, // #2786
      LowGrayAdvanceCompensationTwo: common.UInt8, // #2798
      LowGrayCompensation: common.UInt8, // #2810
      DataReset: common.Bool, // #2822
      DarkBlockCompensationOne: common.UInt8, // #2834
      DarkBlockCompensationTwo: common.UInt8, // #2846
      DarkBlockCompensationThree: common.UInt8, // #2858
      TheFirstScanDarkCompensation: common.UInt8, // #2870
      LowGrayAdvanceCompensationOne: common.UInt8, // #2882
      LowGrayAdvanceCompensationThree: common.UInt8, // #2894
      DynamicPlusAutoSavePower: common.Bool, // #2906
      DynamicAutoSavePower: common.Bool, // #2918
      OpenCircuitCheckVoltageLevel: common.UInt8, // #2930
      GhostShadowReomveLevel: common.UInt8,
    }),
  ],
  'ChipMBI5261ExtendPropertyBase'
);
/**
 * Codec for {@link ChipMBI5261ExtendProperty}
 * @category Codecs
 * @see Automatically generated from ../decompiled/Nova.LCT.GigabitSystem.ChipMBI5261.decompiled.cs:2763
 */
export const ChipMBI5261ExtendProperty = t.intersection(
  [
    ChipMBI5261ExtendPropertyBase,
    t.partial({ '@_xsi:type': t.literal('ChipMBI5261ExtendProperty') }),
  ],
  'ChipMBI5261ExtendProperty'
);
export interface ChipMBI5261ExtendProperty extends t.TypeOf<typeof ChipMBI5261ExtendProperty> {}
