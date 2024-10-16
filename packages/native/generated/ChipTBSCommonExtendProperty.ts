import * as t from 'io-ts';
import * as common from '../lib/common';
import { ChipBaseExtendPropey } from './ChipBaseExtendPropey';
 // import
export const ChipTBSCommonExtendPropertyBase = t.intersection(
  [
    ChipBaseExtendPropey,
    t.type({
      REGLENTH: common.Int32_128, // #3641
      REMOVEBADPOINTSREGLENGTH: common.Int32_6, // #3647
      RegValue: common.XMLArray(common.UInt16, 'ushort'), // #3649
      RemoveBadPointsRegValue: common.XMLArray(common.UInt16, 'ushort'),
    }),
    t.partial({
      IsUseNewModule: common.Bool, // #3645
      ChipLibVersion: common.UInt8, // #3652
      ShadowEliminationElectric: common.UInt8, // #3655
      BlankTime: common.UInt8, // #3667
      GhostEliminationGearSetting: common.UInt8, // #3679
      IsShadowingEnhancement: common.Bool, // #3691
      LowGrayCompsentionOne: common.UInt8, // #3703
      LowGrayCompsentionTwo: common.UInt8, // #3715
      LowAshColorCastCompensation3: common.UInt8, // #3727
      LowgrayBrightCompensationTime: common.UInt8, // #3739
      LowgrayBrightCompensationTimeEn: common.Bool, // #3751
      LowGrayBrightComps1: common.UInt8, // #3763
      CouplingOptimization1: common.UInt8, // #3776
      EnableCouplingToAdjust2: common.UInt8, // #3788
      EnableCouplingToAdjust3: common.UInt8, // #3800
      EnableCouplingToAdjust4: common.Bool, // #3812
      CouplingOptimization5: common.Bool, // #3824
      KneeVoltage: common.UInt8, // #3836
      CouplingOptimizationEnModel: common.UInt8, // #3848
      GradualTransitionOptimization2: common.UInt8, // #3860
      GradualTransitionOptimization3: common.UInt8, // #3873
      OpenDetectionVoltage: common.UInt8, // #3885
      ShortDetectionVoltage: common.UInt8, // #3897
      CurrentGain: common.UInt8,
    }),
  ],
  'ChipTBSCommonExtendPropertyBase'
);
/**
 * Codec for {@link ChipTBSCommonExtendProperty}
 * @category Codecs
 * @see Automatically generated from ../decompiled/Nova.LCT.GigabitSystem.ChipTBS5266Common.decompiled.cs:3638
 */
export const ChipTBSCommonExtendProperty = t.intersection(
  [
    ChipTBSCommonExtendPropertyBase,
    t.partial({ '@_xsi:type': t.literal('ChipTBSCommonExtendProperty') }),
  ],
  'ChipTBSCommonExtendProperty'
);
export interface ChipTBSCommonExtendProperty extends t.TypeOf<typeof ChipTBSCommonExtendProperty> {}
