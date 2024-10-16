import * as t from 'io-ts';
import * as common from '../lib/common';
import { Chip9348ExtendProperty } from './Chip9348ExtendProperty'; // import
/**
 * Codec for interface {@link Chip9348RGBVExtendPropey}
 * @category Codecs
 * @see Automatically generated from ../decompiled/Nova.LCT.GigabitSystem.DataClass.decompiled.cs:54635
 */
export const Chip9348RGBVExtendPropey = t.intersection(
  [
    t.type({
      GrayscaleSelect: common.UInt8_2, // #54697
      LastGhostAbatement2: common.UInt8_2,
    }),
    t.partial({
      RedProperty: Chip9348ExtendProperty, // #54637
      GreenProperty: Chip9348ExtendProperty, // #54639
      BlueProperty: Chip9348ExtendProperty, // #54641
      VRedProperty: Chip9348ExtendProperty, // #54671
      DummyGclkEn: common.Bool, // #54684
      LastGhostAbatement1: common.UInt8, // #54710
      FailureLEDElimination: common.Bool, // #54723
      RedGain: common.Int32, // #54736
      BlueGain: common.Int32, // #54748
      GreenGain: common.Int32, // #54760
      RedRegValueConfigThird: common.UInt16, // #54772
      GreenRegValueConfigThird: common.UInt16, // #54785
      BlueRegValueConfigThird: common.UInt16, // #54798
      VRedRegValueConfigThird: common.UInt16, // #54811
      RedRegValueConfigSpecial: common.UInt16, // #54824
      GreenRegValueConfigSpecial: common.UInt16, // #54837
      BlueRegValueConfigSpecial: common.UInt16, // #54850
      VRedRegValueConfigSpecial: common.UInt16,
    }),
  ],
  'Chip9348RGBVExtendPropey'
);
export interface Chip9348RGBVExtendPropey extends t.TypeOf<typeof Chip9348RGBVExtendPropey> {
  RedProperty?: Chip9348ExtendProperty;
  GreenProperty?: Chip9348ExtendProperty;
  BlueProperty?: Chip9348ExtendProperty;
  VRedProperty?: Chip9348ExtendProperty;
}
