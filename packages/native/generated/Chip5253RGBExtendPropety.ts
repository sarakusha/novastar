import * as t from 'io-ts';
import * as common from '../lib/common';
import { Chip5253ExtendProperty } from './Chip5253ExtendProperty'; // import
/**
 * Codec for interface {@link Chip5253RGBExtendPropety}
 * @category Codecs
 * @see Automatically generated from ../decompiled/Nova.LCT.GigabitSystem.DataClass.decompiled.cs:46205
 */
export const Chip5253RGBExtendPropety = t.partial(
  {
    RedProperty: Chip5253ExtendProperty, // #46207
    GreenProperty: Chip5253ExtendProperty, // #46209
    BlueProperty: Chip5253ExtendProperty, // #46211
    VRedProperty: Chip5253ExtendProperty, // #46213
    EnableLowImprovement: common.Bool, // #46265
    EnShadeTransitOptimize: common.Bool, // #46278
    EnDoubleRefresh: common.Bool, // #46290
    EnGCLKMutiRate: common.Bool, // #46303
    FailureLEDElimination: common.Bool, // #46316
    RedRegValueConfigThird: common.UInt16, // #46329
    GreenRegValueConfigThird: common.UInt16, // #46342
    BlueRegValueConfigThird: common.UInt16, // #46355
    VRedRegValueConfigThird: common.UInt16, // #46368
    RedRegValueConfigFour: common.UInt16, // #46381
    GreenRegValueConfigFour: common.UInt16, // #46394
    BlueRegValueConfigFour: common.UInt16, // #46407
    VRedRegValueConfigFour: common.UInt16, // #46420
    RedRegValueConfigFive: common.UInt16, // #46433
    GreenRegValueConfigFive: common.UInt16, // #46446
    BlueRegValueConfigFive: common.UInt16, // #46459
    VRedRegValueConfigFive: common.UInt16, // #46472
    RedRegValueConfigSix: common.UInt16, // #46485
    GreenRegValueConfigSix: common.UInt16, // #46498
    BlueRegValueConfigSix: common.UInt16, // #46511
    VRedRegValueConfigSix: common.UInt16, // #46524
    RedRegValueConfigSpecial: common.UInt16, // #46537
    GreenRegValueConfigSpecial: common.UInt16, // #46550
    BlueRegValueConfigSpecial: common.UInt16, // #46563
    VRedRegValueConfigSpecial: common.UInt16, // #46576
  },
  'Chip5253RGBExtendPropety'
);
export interface Chip5253RGBExtendPropety extends t.TypeOf<typeof Chip5253RGBExtendPropety> {
  RedProperty?: Chip5253ExtendProperty;
  GreenProperty?: Chip5253ExtendProperty;
  BlueProperty?: Chip5253ExtendProperty;
  VRedProperty?: Chip5253ExtendProperty;
}
