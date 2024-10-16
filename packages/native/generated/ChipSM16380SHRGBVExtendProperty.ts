import * as t from 'io-ts';
import * as common from '../lib/common';
import { ChipBaseExtendPropey } from './ChipBaseExtendPropey'; // import
import { ChipSM16380SHExtendProperty } from './ChipSM16380SHExtendProperty';
 // import
export const ChipSM16380SHRGBVExtendPropertyBase = t.intersection(
  [
    ChipBaseExtendPropey,
    t.partial({
      RProp: ChipSM16380SHExtendProperty, // #2991
      GProp: ChipSM16380SHExtendProperty, // #2994
      BProp: ChipSM16380SHExtendProperty, // #2997
      VProp: ChipSM16380SHExtendProperty, // #3000
      SpecialRegisterAddr: common.UInt32, // #3003
      IsUseNewModule: common.Bool, // #3005
      ChipLibVersion: common.UInt8, // #3007
      ScanType: common.UInt8, // #3009
      RefNumPerVs: common.UInt8, // #3021
      FrequencyDivisionFactor: common.UInt8, // #3033
      RowScanGrayScale: common.UInt16, // #3045
      RowScanGrayScaleReg: common.UInt8, // #3057
      DynamicEnergyConservation: common.Bool, // #3059
      TakePhotosOptimization: common.Bool, // #3071
      RemoveBadPoints: common.Bool, // #3083
      StandbyMode: common.Bool, // #3095
      CurrentCheckLevel: common.UInt8, // #3107
      IsAdvancedMode: common.Bool, // #3119
      SpecialDataLen: common.Int32, // #3131
    }),
  ],
  'ChipSM16380SHRGBVExtendPropertyBase'
);
/**
 * Codec for {@link ChipSM16380SHRGBVExtendProperty}
 * @category Codecs
 * @see Automatically generated from ../decompiled/Nova.LCT.GigabitSystem.ChipSM16380SH.decompiled.cs:2979
 */
export const ChipSM16380SHRGBVExtendProperty = t.intersection(
  [
    ChipSM16380SHRGBVExtendPropertyBase,
    t.partial({ '@_xsi:type': t.literal('ChipSM16380SHRGBVExtendProperty') }),
  ],
  'ChipSM16380SHRGBVExtendProperty'
);
export interface ChipSM16380SHRGBVExtendProperty
  extends t.TypeOf<typeof ChipSM16380SHRGBVExtendProperty> {
  RProp?: ChipSM16380SHExtendProperty;
  GProp?: ChipSM16380SHExtendProperty;
  BProp?: ChipSM16380SHExtendProperty;
  VProp?: ChipSM16380SHExtendProperty;
}
