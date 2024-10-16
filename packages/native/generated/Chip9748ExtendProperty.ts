import * as t from 'io-ts';
import * as common from '../lib/common';
import { ChipBaseExtendPropey } from './ChipBaseExtendPropey';
 // import
export const Chip9748ExtendPropertyBase = t.intersection(
  [
    ChipBaseExtendPropey,
    t.type({
      LastGhostAbatement2: common.UInt8_2,
    }),
    t.partial({
      CurrentSet1: common.UInt8, // #54986
      CurrentSet2: common.UInt8, // #54999
      CurrentSet3: common.UInt8, // #55012
      CurrentGain: common.UInt8, // #55025
      LowGrayscaleCompensation: common.UInt8, // #55038
      FirstScanCompensation: common.UInt8, // #55051
      CompensationMode: common.UInt8, // #55064
      NextGhostAbatement: common.UInt8, // #55077
      Adjustment: common.UInt8, // #55090
      LastGhostAbatement1: common.UInt8, // #55116
      FailureLEDElimination: common.UInt8,
    }),
  ],
  'Chip9748ExtendPropertyBase'
);
/**
 * Codec for {@link Chip9748ExtendProperty}
 * @category Codecs
 * @see Automatically generated from ../decompiled/Nova.LCT.GigabitSystem.DataClass.decompiled.cs:54960
 */
export const Chip9748ExtendProperty = t.intersection(
  [Chip9748ExtendPropertyBase, t.partial({ '@_xsi:type': t.literal('Chip9748ExtendProperty') })],
  'Chip9748ExtendProperty'
);
export interface Chip9748ExtendProperty extends t.TypeOf<typeof Chip9748ExtendProperty> {}
