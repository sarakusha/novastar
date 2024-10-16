import * as t from 'io-ts';
import * as common from '../lib/common';
import { ChipBaseExtendPropey } from './ChipBaseExtendPropey';
 // import
export const ChipTBS5266AExtendPropertyBase = t.intersection(
  [
    ChipBaseExtendPropey,
    t.type({
      REGLENTH: common.Int32_47, // #3586
      REMOVEBADPOINTSREGLENGTH: common.Int32_6, // #3592
      RegValue: common.XMLArray(common.UInt16, 'ushort'), // #3594
      RemoveBadPointsRegValue: common.XMLArray(common.UInt16, 'ushort'),
    }),
    t.partial({
      IsUseNewModule: common.Bool, // #3590
      ChipLibVersion: common.UInt8, // #3597
      ShadowEliminationElectric: common.UInt8, // #3600
      BlankTime: common.UInt8, // #3612
      OcclusionOptimizationOne: common.UInt8, // #3624
      OcclusionOptimizationTwo: common.Bool, // #3636
      LowGrayCompsentionOne: common.UInt8, // #3648
      LowGrayCompsentionTwo: common.UInt8, // #3660
      LowAshColorCastCompensation3: common.UInt8, // #3672
      LowgrayBrightCompensationTime: common.UInt8, // #3684
      LowGrayBrightComps1: common.UInt8, // #3696
      CouplingOptimization1: common.UInt8, // #3709
      EnableCouplingToAdjust2: common.UInt8, // #3721
      EnableCouplingToAdjust3: common.UInt8, // #3733
      KneeVoltage: common.UInt8, // #3745
      CouplingOptimizationEnModel: common.UInt8, // #3757
      GradualTransitionOptimization2: common.UInt8, // #3769
      GradualTransitionOptimization3: common.UInt8, // #3782
      OpenDetectionVoltage: common.UInt8, // #3794
      ShortDetectionVoltage: common.UInt8, // #3806
      CurrentGain: common.UInt8,
    }),
  ],
  'ChipTBS5266AExtendPropertyBase'
);
/**
 * Codec for {@link ChipTBS5266AExtendProperty}
 * @category Codecs
 * @see Automatically generated from ../decompiled/Nova.LCT.GigabitSystem.ChipTBS5266A.decompiled.cs:3583
 */
export const ChipTBS5266AExtendProperty = t.intersection(
  [
    ChipTBS5266AExtendPropertyBase,
    t.partial({ '@_xsi:type': t.literal('ChipTBS5266AExtendProperty') }),
  ],
  'ChipTBS5266AExtendProperty'
);
export interface ChipTBS5266AExtendProperty extends t.TypeOf<typeof ChipTBS5266AExtendProperty> {}
