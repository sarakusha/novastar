import * as t from 'io-ts';
import * as common from '../lib/common';
import { ChipBaseExtendPropey } from './ChipBaseExtendPropey';
 // import
export const ChipTBS2218ExtendPropertyBase = t.intersection(
  [
    ChipBaseExtendPropey,
    t.type({
      REGLENTH: common.Int32_49, // #3392
      REMOVEBADPOINTSREGLENGTH: common.Int32_6, // #3398
      RegValue: common.XMLArray(common.UInt16, 'ushort'), // #3400
      RemoveBadPointsRegValue: common.XMLArray(common.UInt16, 'ushort'),
    }),
    t.partial({
      IsUseNewModule: common.Bool, // #3396
      ChipLibVersion: common.UInt8, // #3403
      BlankingOneLevel: common.UInt8, // #3406
      BlankingTwoTime: common.UInt8, // #3418
      LowGrayCompensationOne: common.UInt8, // #3430
      LowGrayCompensationTwo: common.UInt8, // #3442
      LowGrayTransverseStriationImprove: common.UInt8, // #3454
      CouplingOptimizationOne: common.UInt8, // #3466
      CurrentGain: common.UInt8, // #3478
      LowgrayDeviationCompensation3: common.UInt8, // #3490
      LowgrayBrightCompensationTime: common.UInt8, // #3502
      LowgrayBrightCompensationTimeEn: common.Bool, // #3514
      LowgrayBrightCompensation1: common.UInt8, // #3526
      KneeVoltage: common.UInt8, // #3538
      CurrentGear: common.UInt8, // #3550
      CouplingOptimizationMode: common.UInt8, // #3562
      GradualTransitionOptimization2: common.UInt8, // #3574
      GradualTransitionOptimization3: common.UInt8, // #3586
      OpenDetectionVoltage: common.UInt8,
    }),
  ],
  'ChipTBS2218ExtendPropertyBase'
);
/**
 * Codec for {@link ChipTBS2218ExtendProperty}
 * @category Codecs
 * @see Automatically generated from ../decompiled/Nova.LCT.GigabitSystem.ChipTBS2218.decompiled.cs:3389
 */
export const ChipTBS2218ExtendProperty = t.intersection(
  [
    ChipTBS2218ExtendPropertyBase,
    t.partial({ '@_xsi:type': t.literal('ChipTBS2218ExtendProperty') }),
  ],
  'ChipTBS2218ExtendProperty'
);
export interface ChipTBS2218ExtendProperty extends t.TypeOf<typeof ChipTBS2218ExtendProperty> {}
