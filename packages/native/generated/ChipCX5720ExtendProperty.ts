import * as t from 'io-ts';
import * as common from '../lib/common';
import { ChipBaseExtendPropey } from './ChipBaseExtendPropey';
 // import
export const ChipCX5720ExtendPropertyBase = t.intersection(
  [
    ChipBaseExtendPropey,
    t.partial({
      FirstRegValue: common.UInt16, // #1523
      SecondRegValue: common.UInt16, // #1525
      ThirdRegValue: common.UInt16, // #1527
      GhostShadowEliminationLevel: common.UInt8, // #1529
      ShadowEhancedModeEn: common.Bool, // #1541
      CoupledEliminationLevel: common.UInt8, // #1553
      CoupledElimination: common.Bool, // #1565
      FirstLineDark: common.UInt8, // #1577
      LowAshCompensationOne: common.UInt8, // #1589
      LowAshCompensationTwo: common.UInt8, // #1601
      SlowMotionEffect: common.Bool, // #1613
      OpenCircuitDetectionResult: common.Bool, // #1625
      ShortCircuitDetectionResult: common.Bool, // #1637
      OpenCircuitDetectionLevel: common.Int32, // #1649
      ShortCircuitDetectionLevel: common.UInt8, // #1661
      ChipCurrentGain1: common.UInt8, // #1673
    }),
  ],
  'ChipCX5720ExtendPropertyBase'
);
/**
 * Codec for {@link ChipCX5720ExtendProperty}
 * @category Codecs
 * @see Automatically generated from ../decompiled/Nova.LCT.GigabitSystem.ChipCX5720.decompiled.cs:1520
 */
export const ChipCX5720ExtendProperty = t.intersection(
  [
    ChipCX5720ExtendPropertyBase,
    t.partial({ '@_xsi:type': t.literal('ChipCX5720ExtendProperty') }),
  ],
  'ChipCX5720ExtendProperty'
);
export interface ChipCX5720ExtendProperty extends t.TypeOf<typeof ChipCX5720ExtendProperty> {}
