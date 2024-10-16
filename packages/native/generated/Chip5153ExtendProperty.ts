import * as t from 'io-ts';
import * as common from '../lib/common';
/**
 * Codec for interface {@link Chip5153ExtendProperty}
 * @category Codecs
 * @see Automatically generated from ../decompiled/Nova.LCT.GigabitSystem.DataClass.decompiled.cs:45923
 */
export const Chip5153ExtendProperty = t.partial(
  {
    EliminateAfterLow: common.UInt8, // #45957
    FirstSweepEliminationMaster: common.UInt8, // #45970
    FirstSweepEliminationMedium: common.Bool, // #45983
    FirstSweepEliminationSecond: common.UInt8, // #45996
    LowAshColorCompensationOne: common.UInt8, // #46009
    LowAshColorCompensationTwo: common.UInt8, // #46022
    LowAshEnhanceUniformity: common.Bool, // #46035
    GrayHorizontalStripesEliminate: common.Bool, // #46048
    EnhancedModeOne: common.Bool, // #46061
    SlowOpen: common.Bool, // #46074
    SwapErrorPoint: common.UInt8, // #46087
    EnhancedModeTwo: common.Bool, // #46100
    RedRegValueConfigThird: common.UInt16, // #46113
    GreenRegValueConfigThird: common.UInt16, // #46126
    BlueRegValueConfigThird: common.UInt16, // #46139
    VRedRegValueConfigThird: common.UInt16, // #46152
  },
  'Chip5153ExtendProperty'
);
export interface Chip5153ExtendProperty extends t.TypeOf<typeof Chip5153ExtendProperty> {}
