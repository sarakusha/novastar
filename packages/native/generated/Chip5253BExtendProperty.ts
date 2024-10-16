import * as t from 'io-ts';
import * as common from '../lib/common';
import { ChipBaseExtendPropey } from './ChipBaseExtendPropey';
 // import
export const Chip5253BExtendPropertyBase = t.intersection(
  [
    ChipBaseExtendPropey,
    t.type({
      FirstSweepElimination: common.UInt8_31, // #47218
      UnderEliminateGhost: common.UInt8_31, // #47231
      UnderEliminateGhostingEnhancedMode: common.Bool_true, // #47244
      LowAshEnhanceUniformity: common.Bool_true, // #47283
      AdvancedRLowAshColorCastCompensation1: common.UInt8_31, // #47309
      AdvancedRLowAshColorCastCompensation3: common.UInt8_31, // #47322
      DislodgeBadPointsGrade: common.UInt8_1, // #47335
      TextGhostElimination: common.UInt8_31, // #47348
      CrossCouplingOptimization: common.UInt8_31, // #47361
      BrightBlockCouplingOptimization: common.UInt8_31, // #47374
      FirstSweepBiasElimination: common.UInt8_31,
    }),
    t.partial({
      GrayHorizontalStripesEliminateLow: common.Bool, // #47270
      LowAshColorCastCompensation: common.UInt8, // #47296
      AdvancedRLowAshColorCastCompensation2: common.UInt8, // #47387
      GradientCompensation: common.UInt8, // #47400
      GradientCompensationOne: common.UInt8,
    }),
  ],
  'Chip5253BExtendPropertyBase'
);
/**
 * Codec for {@link Chip5253BExtendProperty}
 * @category Codecs
 * @see Automatically generated from ../decompiled/Nova.LCT.GigabitSystem.DataClass.decompiled.cs:47184
 */
export const Chip5253BExtendProperty = t.intersection(
  [Chip5253BExtendPropertyBase, t.partial({ '@_xsi:type': t.literal('Chip5253BExtendProperty') })],
  'Chip5253BExtendProperty'
);
export interface Chip5253BExtendProperty extends t.TypeOf<typeof Chip5253BExtendProperty> {}
