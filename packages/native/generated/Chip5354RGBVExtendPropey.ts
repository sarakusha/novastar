import * as t from 'io-ts';
import * as common from '../lib/common';
import { Chip5354ExtendProperty } from './Chip5354ExtendProperty'; // import
/**
 * Codec for interface {@link Chip5354RGBVExtendPropey}
 * @category Codecs
 * @see Automatically generated from ../decompiled/Nova.LCT.GigabitSystem.DataClass.decompiled.cs:56221
 */
export const Chip5354RGBVExtendPropey = t.intersection(
  [
    t.type({
      GlobalCurrentGainAdjust: common.UInt8_5,
    }),
    t.partial({
      RedProperty: Chip5354ExtendProperty, // #56223
      GreenProperty: Chip5354ExtendProperty, // #56225
      BlueProperty: Chip5354ExtendProperty, // #56227
      VRedProperty: Chip5354ExtendProperty, // #56229
      GlobalCurrentGainConst: common.UInt8, // #56278
      FailureLEDElimination: common.Bool, // #56291
      EnableLowImprovement: common.Bool, // #56304
      LowImprovementFirst: common.UInt8, // #56317
      LowImprovementTwo: common.UInt8, // #56330
      EnableLowAshUniformity: common.Bool, // #56343
      EnableEnergyConserve: common.Bool, // #56356
      EnableGCLKMutiplier: common.Bool, // #56369
      RedRegValueConfigThird: common.UInt16, // #56382
      GreenRegValueConfigThird: common.UInt16, // #56395
      BlueRegValueConfigThird: common.UInt16, // #56408
      VRedRegValueConfigThird: common.UInt16, // #56421
      RedRegValueConfigSpecial: common.UInt16, // #56434
      GreenRegValueConfigSpecial: common.UInt16, // #56447
      BlueRegValueConfigSpecial: common.UInt16, // #56460
      VRedRegValueConfigSpecial: common.UInt16,
    }),
  ],
  'Chip5354RGBVExtendPropey'
);
export interface Chip5354RGBVExtendPropey extends t.TypeOf<typeof Chip5354RGBVExtendPropey> {
  RedProperty?: Chip5354ExtendProperty;
  GreenProperty?: Chip5354ExtendProperty;
  BlueProperty?: Chip5354ExtendProperty;
  VRedProperty?: Chip5354ExtendProperty;
}
