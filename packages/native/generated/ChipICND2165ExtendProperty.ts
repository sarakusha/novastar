import * as t from 'io-ts';
import * as common from '../lib/common';
import { ChipBaseExtendPropey } from './ChipBaseExtendPropey'; // import
import { DecodeType, DecodeTypeEnum } from './DecodeType'; // import
import { ScanType, ScanTypeEnum } from './ScanType';
 // import
export const ChipICND2165ExtendPropertyBase = t.intersection(
  [
    ChipBaseExtendPropey,
    t.type({
      RegLength: common.Int32_48, // #4667
      RegValue: common.XMLArray(common.UInt16, 'ushort'),
    }),
    t.partial({
      TheFirstLineDarkCompensationStep: common.UInt8, // #4671
      SlowSpeedOpen: common.UInt8, // #4683
      LowGrayColorCompensation: common.UInt8, // #4695
      ShadowEliminationLevel: common.UInt8, // #4707
      ShadowEliminationTime: common.UInt8, // #4719
      TheFirstSweepDarkCompensation: common.UInt8, // #4731
      TheFirstLine: common.Bool, // #4744
      TheFirstLineSlantsDarkCompensationTuning: common.UInt8, // #4760
      TheFirstLineSlantsDarkCompensationTime: common.UInt8, // #4772
      LowAshColorCompensation: common.UInt8, // #4784
      LowAshColor: common.Bool, // #4796
      CouplingToAdjust: common.UInt8, // #4812
      EnableCouplingToAdjust: common.Bool, // #4824
      EnableCoupling: common.Bool, // #4836
      Gradientoptimization: common.Bool, // #4852
      GradientoptimizationPro: common.Bool, // #4868
      CouplingEnhancedMode: common.Bool, // #4884
      SlowOpen: common.UInt8, // #4896
      CrossCouplingToAdjust: common.UInt8, // #4947
      KneeVoltage: common.UInt8, // #4959
      Gain: common.UInt16, // #4971
      ScanType, // #4983
      LowAshUniformity: common.UInt8, // #5007
      RefreshTheNumberOfClusters: common.UInt16, // #5031
      SubFields: common.UInt8, // #5043
      GclkNumber: common.Int32, // #5055
      DisplayMode: common.UInt8, // #5067
      EnergySavingMode: common.UInt8, // #5079
      EnableToRemoveBadPoints: common.Bool, // #5105
      GclkFreqP: common.UInt8, // #5121
      GclkFreqM: common.UInt8, // #5133
      GclkFreqN: common.UInt8, // #5146
      TestGainEn: common.Bool, // #5158
      ChipMemberIndex: common.Int32, // #5173
      CurrentDecode: DecodeType,
    }),
  ],
  'ChipICND2165ExtendPropertyBase'
);
/**
 * Codec for {@link ChipICND2165ExtendProperty}
 * @category Codecs
 * @see Automatically generated from ../decompiled/Nova.LCT.GigabitSystem.ChipICND2165.decompiled.cs:4662
 */
export const ChipICND2165ExtendProperty = t.intersection(
  [
    ChipICND2165ExtendPropertyBase,
    t.partial({ '@_xsi:type': t.literal('ChipICND2165ExtendProperty') }),
  ],
  'ChipICND2165ExtendProperty'
);
export interface ChipICND2165ExtendProperty extends t.TypeOf<typeof ChipICND2165ExtendProperty> {
  ScanType?: ScanTypeEnum;
  CurrentDecode?: DecodeTypeEnum;
}
