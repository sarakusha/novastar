import * as t from 'io-ts';
import * as common from '../lib/common';
import { ChipBaseExtendPropey } from './ChipBaseExtendPropey';
 // import
export const ChipTBS5266BExtendPropertyBase = t.intersection(
  [
    ChipBaseExtendPropey,
    t.type({
      REGLENTH: common.Int32_47, // #3502
      REMOVEBADPOINTSREGLENGTH: common.Int32_6, // #3508
      RegValue: common.XMLArray(common.UInt16, 'ushort'), // #3510
      RemoveBadPointsRegValue: common.XMLArray(common.UInt16, 'ushort'),
    }),
    t.partial({
      IsUseNewModule: common.Bool, // #3506
      ChipLibVersion: common.UInt8, // #3513
      ShadowEliminationElectric: common.UInt8, // #3516
      BlankTime: common.UInt8, // #3528
      GhostEliminationGearSetting: common.UInt8, // #3540
      IsShadowingEnhancement: common.Bool, // #3552
      LowGrayCompsentionOne: common.UInt8, // #3564
      LowGrayCompsentionTwo: common.UInt8, // #3576
      LowAshColorCastCompensation3: common.UInt8, // #3588
      LowgrayBrightCompensationTime: common.UInt8, // #3600
      LowgrayBrightCompensationTimeEn: common.Bool, // #3612
      LowGrayBrightComps1: common.UInt8, // #3624
      CouplingOptimization1: common.UInt8, // #3637
      EnableCouplingToAdjust2: common.UInt8, // #3649
      EnableCouplingToAdjust3: common.UInt8, // #3661
      EnableCouplingToAdjust4: common.Bool, // #3673
      CouplingOptimization5: common.Bool, // #3685
      KneeVoltage: common.UInt8, // #3697
      CouplingOptimizationEnModel: common.UInt8, // #3709
      GradualTransitionOptimization2: common.UInt8, // #3721
      GradualTransitionOptimization3: common.UInt8, // #3734
      OpenDetectionVoltage: common.UInt8, // #3746
      ShortDetectionVoltage: common.UInt8, // #3758
      CurrentGain: common.UInt8,
    }),
  ],
  'ChipTBS5266BExtendPropertyBase'
);
/**
 * Codec for {@link ChipTBS5266BExtendProperty}
 * @category Codecs
 * @see Automatically generated from ../decompiled/Nova.LCT.GigabitSystem.ChipTBS5266B.decompiled.cs:3499
 */
export const ChipTBS5266BExtendProperty = t.intersection(
  [
    ChipTBS5266BExtendPropertyBase,
    t.partial({ '@_xsi:type': t.literal('ChipTBS5266BExtendProperty') }),
  ],
  'ChipTBS5266BExtendProperty'
);
export interface ChipTBS5266BExtendProperty extends t.TypeOf<typeof ChipTBS5266BExtendProperty> {}
