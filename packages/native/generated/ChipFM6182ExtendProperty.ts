import * as t from 'io-ts';
import * as common from '../lib/common';
import { ChipBaseExtendPropey } from './ChipBaseExtendPropey';
 // import
export const ChipFM6182ExtendPropertyBase = t.intersection(
  [
    ChipBaseExtendPropey,
    t.type({
      RegValueConfigFirst: common.UInt16_63, // #57455
      RegValueConfigSecond: common.UInt16_63,
    }),
    t.partial({
      CurrentLowCompsention: common.Int32, // #57481
      LowCompsention: common.Int32, // #57494
      FirstCompsentionOne: common.Int32, // #57507
      ErrorDetection: common.Int32, // #57520
      GhostElimination: common.Int32, // #57533
      DetectionEable: common.Int32, // #57546
      FirstCompsentionTwo: common.Int32, // #57559
      CurrentPoint: common.Int32, // #57572
      OpenUpTime: common.Int32, // #57585
      PDMOpenTime: common.Int32, // #57598
      ParityTimeSet: common.Int32,
    }),
  ],
  'ChipFM6182ExtendPropertyBase'
);
/**
 * Codec for {@link ChipFM6182ExtendProperty}
 * @category Codecs
 * @see Automatically generated from ../decompiled/Nova.LCT.GigabitSystem.DataClass.decompiled.cs:57427
 */
export const ChipFM6182ExtendProperty = t.intersection(
  [
    ChipFM6182ExtendPropertyBase,
    t.partial({ '@_xsi:type': t.literal('ChipFM6182ExtendProperty') }),
  ],
  'ChipFM6182ExtendProperty'
);
export interface ChipFM6182ExtendProperty extends t.TypeOf<typeof ChipFM6182ExtendProperty> {}
