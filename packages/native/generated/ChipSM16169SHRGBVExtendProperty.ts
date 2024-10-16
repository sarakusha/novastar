import * as t from 'io-ts';
import * as common from '../lib/common';
import { ChipBaseExtendPropey } from './ChipBaseExtendPropey'; // import
import { ChipSM16169SHExtendProperty } from './ChipSM16169SHExtendProperty';
 // import
export const ChipSM16169SHRGBVExtendPropertyBase = t.intersection(
  [
    ChipBaseExtendPropey,
    t.partial({
      RProp: ChipSM16169SHExtendProperty, // #2762
      GProp: ChipSM16169SHExtendProperty, // #2764
      BProp: ChipSM16169SHExtendProperty, // #2766
      VProp: ChipSM16169SHExtendProperty, // #2768
      SpecialRegisterAddr: common.UInt32, // #2782
      IsUseNewModule: common.Bool, // #2784
      ChipLibVersion: common.UInt8, // #2786
      ScanType: common.UInt8, // #2788
      RefNumPerVs: common.UInt8, // #2800
      FrequencyDivisionFactor: common.UInt8, // #2812
      RowScanGrayScale: common.UInt16, // #2824
      RowScanGrayScaleReg: common.UInt8, // #2836
      DynamicEnergyConservation: common.Bool, // #2838
      TakePhotosOptimization: common.Bool, // #2850
      RemoveBadPoints: common.Bool, // #2862
      StandbyMode: common.Bool, // #2874
      CurrentCheckLevel: common.UInt8, // #2886
      IsAdvancedMode: common.Bool, // #2898
      SpecialDataLen: common.Int32, // #2910
    }),
  ],
  'ChipSM16169SHRGBVExtendPropertyBase'
);
/**
 * Codec for {@link ChipSM16169SHRGBVExtendProperty}
 * @category Codecs
 * @see Automatically generated from ../decompiled/Nova.LCT.GigabitSystem.ChipSM16169SH.decompiled.cs:2759
 */
export const ChipSM16169SHRGBVExtendProperty = t.intersection(
  [
    ChipSM16169SHRGBVExtendPropertyBase,
    t.partial({ '@_xsi:type': t.literal('ChipSM16169SHRGBVExtendProperty') }),
  ],
  'ChipSM16169SHRGBVExtendProperty'
);
export interface ChipSM16169SHRGBVExtendProperty
  extends t.TypeOf<typeof ChipSM16169SHRGBVExtendProperty> {
  RProp?: ChipSM16169SHExtendProperty;
  GProp?: ChipSM16169SHExtendProperty;
  BProp?: ChipSM16169SHExtendProperty;
  VProp?: ChipSM16169SHExtendProperty;
}
