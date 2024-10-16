import * as t from 'io-ts';
import * as common from '../lib/common';
import { ChipBaseExtendPropey } from './ChipBaseExtendPropey';
 // import
export const Chip5359ExtendPropertyBase = t.intersection(
  [
    ChipBaseExtendPropey,
    t.partial({
      OpenDetectionVoltage: common.UInt8, // #48200
      CloseDetectionVoltage: common.UInt8, // #48213
      CoarseGrade: common.UInt16, // #48226
      AdvancedLowGayCompensation: common.UInt16, // #48239
      LowGayCompensation: common.UInt16, // #48252
    }),
  ],
  'Chip5359ExtendPropertyBase'
);
/**
 * Codec for {@link Chip5359ExtendProperty}
 * @category Codecs
 * @see Automatically generated from ../decompiled/Nova.LCT.GigabitSystem.DataClass.decompiled.cs:48188
 */
export const Chip5359ExtendProperty = t.intersection(
  [Chip5359ExtendPropertyBase, t.partial({ '@_xsi:type': t.literal('Chip5359ExtendProperty') })],
  'Chip5359ExtendProperty'
);
export interface Chip5359ExtendProperty extends t.TypeOf<typeof Chip5359ExtendProperty> {}
