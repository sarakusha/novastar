import * as t from 'io-ts';
import * as common from '../lib/common';
import { Chip5353ExtendProperty } from './Chip5353ExtendProperty'; // import
/**
 * Codec for interface {@link Chip5353RGBVExtendPropey}
 * @category Codecs
 * @see Automatically generated from ../decompiled/Nova.LCT.GigabitSystem.DataClass.decompiled.cs:55741
 */
export const Chip5353RGBVExtendPropey = t.intersection(
  [
    t.type({
      GlobalCurrentGainAdjust: common.UInt8_5,
    }),
    t.partial({
      RedProperty: Chip5353ExtendProperty, // #55743
      GreenProperty: Chip5353ExtendProperty, // #55745
      BlueProperty: Chip5353ExtendProperty, // #55747
      VRedProperty: Chip5353ExtendProperty, // #55749
      GlobalCurrentGainConst: common.UInt8, // #55798
      FailureLEDElimination: common.Bool, // #55811
      EnableLowImprovement: common.Bool, // #55824
      LowImprovementFirst: common.UInt8, // #55837
      LowImprovementTwo: common.UInt8, // #55850
      EnableLowAshUniformity: common.Bool, // #55863
      EnableEnergyConserve: common.Bool, // #55876
      EnableGCLKMutiplier: common.Bool, // #55889
      RedRegValueConfigThird: common.UInt16, // #55902
      GreenRegValueConfigThird: common.UInt16, // #55915
      BlueRegValueConfigThird: common.UInt16, // #55928
      VRedRegValueConfigThird: common.UInt16, // #55941
      RedRegValueConfigSpecial: common.UInt16, // #55954
      GreenRegValueConfigSpecial: common.UInt16, // #55967
      BlueRegValueConfigSpecial: common.UInt16, // #55980
      VRedRegValueConfigSpecial: common.UInt16,
    }),
  ],
  'Chip5353RGBVExtendPropey'
);
export interface Chip5353RGBVExtendPropey extends t.TypeOf<typeof Chip5353RGBVExtendPropey> {
  RedProperty?: Chip5353ExtendProperty;
  GreenProperty?: Chip5353ExtendProperty;
  BlueProperty?: Chip5353ExtendProperty;
  VRedProperty?: Chip5353ExtendProperty;
}
