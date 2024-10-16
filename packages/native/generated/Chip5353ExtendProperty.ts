import * as t from 'io-ts';
import * as common from '../lib/common';
import { ChipBaseExtendPropey } from './ChipBaseExtendPropey';
 // import
export const Chip5353ExtendPropertyBase = t.intersection(
  [
    ChipBaseExtendPropey,
    t.partial({
      DeGhostLevel: common.UInt8, // #55484
      FirstSweepEliminateFirst: common.UInt8, // #55497
      FirstSweepEliminateTwo: common.UInt8, // #55510
      LowAshImprovementFirst: common.UInt8, // #55523
      LowAshImprovementTwo: common.UInt8, // #55536
      LowAshImprovementThrid: common.Bool, // #55549
      EnhancedMode: common.Bool, // #55562
      LowAshdimLineConpensentionY: common.Bool, // #55575
      OpenDetectPower: common.UInt8, // #55588
    }),
  ],
  'Chip5353ExtendPropertyBase'
);
/**
 * Codec for {@link Chip5353ExtendProperty}
 * @category Codecs
 * @see Automatically generated from ../decompiled/Nova.LCT.GigabitSystem.DataClass.decompiled.cs:55464
 */
export const Chip5353ExtendProperty = t.intersection(
  [Chip5353ExtendPropertyBase, t.partial({ '@_xsi:type': t.literal('Chip5353ExtendProperty') })],
  'Chip5353ExtendProperty'
);
export interface Chip5353ExtendProperty extends t.TypeOf<typeof Chip5353ExtendProperty> {}
