import * as t from 'io-ts';
import * as common from '../lib/common';
import { ChipBaseExtendPropey } from './ChipBaseExtendPropey';
 // import
export const Chip5354ExtendPropertyBase = t.intersection(
  [
    ChipBaseExtendPropey,
    t.partial({
      DeGhostLevel: common.UInt8, // #56071
      FirstSweepEliminateFirst: common.UInt8, // #56084
      FirstSweepEliminateTwo: common.UInt8, // #56097
      LowAshImprovementFirst: common.UInt8, // #56110
      LowAshImprovementTwo: common.UInt8, // #56123
      LowAshImprovementThrid: common.Bool, // #56136
      EnhancedMode: common.Bool, // #56149
      LowAshdimLineConpensentionY: common.Bool, // #56162
      OpenDetectPower: common.UInt8, // #56175
    }),
  ],
  'Chip5354ExtendPropertyBase'
);
/**
 * Codec for {@link Chip5354ExtendProperty}
 * @category Codecs
 * @see Automatically generated from ../decompiled/Nova.LCT.GigabitSystem.DataClass.decompiled.cs:56051
 */
export const Chip5354ExtendProperty = t.intersection(
  [Chip5354ExtendPropertyBase, t.partial({ '@_xsi:type': t.literal('Chip5354ExtendProperty') })],
  'Chip5354ExtendProperty'
);
export interface Chip5354ExtendProperty extends t.TypeOf<typeof Chip5354ExtendProperty> {}
