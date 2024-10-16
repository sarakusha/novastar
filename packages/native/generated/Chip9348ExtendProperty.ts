import * as t from 'io-ts';
import * as common from '../lib/common';
import { ChipBaseExtendPropey } from './ChipBaseExtendPropey';
 // import
export const Chip9348ExtendPropertyBase = t.intersection(
  [
    ChipBaseExtendPropey,
    t.partial({
      CurrentSet1: common.UInt8, // #54485
      CurrentSet2: common.UInt8, // #54498
      CurrentGain: common.UInt8, // #54511
      LowGrayscaleCompensation: common.UInt8, // #54524
      FirstScanCompensation: common.UInt8, // #54537
      CompensationMode: common.UInt8, // #54550
      CurrentSet3: common.UInt8, // #54563
      NextGhostAbatement: common.UInt8, // #54576
      Adjustment: common.UInt8, // #54589
    }),
  ],
  'Chip9348ExtendPropertyBase'
);
/**
 * Codec for {@link Chip9348ExtendProperty}
 * @category Codecs
 * @see Automatically generated from ../decompiled/Nova.LCT.GigabitSystem.DataClass.decompiled.cs:54465
 */
export const Chip9348ExtendProperty = t.intersection(
  [Chip9348ExtendPropertyBase, t.partial({ '@_xsi:type': t.literal('Chip9348ExtendProperty') })],
  'Chip9348ExtendProperty'
);
export interface Chip9348ExtendProperty extends t.TypeOf<typeof Chip9348ExtendProperty> {}
