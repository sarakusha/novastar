import * as t from 'io-ts';
import * as common from '../lib/common';
import { ChipBaseExtendPropey } from './ChipBaseExtendPropey';
 // import
export const ChipMBI5754BExtendPropertyBase = t.intersection(
  [
    ChipBaseExtendPropey,
    t.type({
      REG_LENGTH: common.Int32_16, // #3581
      RegisterArray: common.XMLArray(common.UInt16, 'ushort'),
    }),
    t.partial({
      ScanType: common.Int32, // #3586
      GclkMode: common.Bool, // #3599
      GclkNumberAdd: common.Int32, // #3616
      M: common.UInt8, // #3628
      G: common.UInt8, // #3649
      LineBlankingTime: common.Int32, // #3662
      GradualTransitionOptimizationTime: common.Int32, // #3674
      RefrashDouble: common.UInt8, // #3686
      GclkDouble: common.Bool, // #3698
      GrayDepth: common.UInt8, // #3710
      TableLab: common.UInt8, // #3726
      GrayEhanced: common.Bool, // #3738
      DarkBlockCompensationOne: common.UInt8, // #3750
      DarkBlockCompensationTwo: common.UInt8, // #3762
      DarkBlockCompensationThree: common.UInt8, // #3774
      FirstSweepElimination: common.UInt8, // #3786
      UnderEliminateGhost: common.UInt8, // #3798
      GrayHorizontalStripesEliminateEn: common.Bool, // #3810
      LowAshColorCastCompensation: common.UInt8, // #3822
      LowAshColorCastCompensationDll: common.UInt8, // #3834
      AdvancedRLowAshColorCastCompensation1: common.UInt8, // #3846
      AdvancedRLowAshColorCastCompensation2: common.UInt8, // #3858
      AdvancedRLowAshColorCastCompensation3: common.UInt8, // #3870
      GradientCompensation: common.UInt8, // #3882
      GradientCompensation1: common.UInt8, // #3894
      FailureLEDElimination: common.Bool, // #3906
      DislodgeBadPointsGrade: common.UInt8, // #3918
      CurrentGain: common.UInt8,
    }),
  ],
  'ChipMBI5754BExtendPropertyBase'
);
/**
 * Codec for {@link ChipMBI5754BExtendProperty}
 * @category Codecs
 * @see Automatically generated from ../decompiled/Nova.LCT.GigabitSystem.ChipMBI5754B.decompiled.cs:3578
 */
export const ChipMBI5754BExtendProperty = t.intersection(
  [
    ChipMBI5754BExtendPropertyBase,
    t.partial({ '@_xsi:type': t.literal('ChipMBI5754BExtendProperty') }),
  ],
  'ChipMBI5754BExtendProperty'
);
export interface ChipMBI5754BExtendProperty extends t.TypeOf<typeof ChipMBI5754BExtendProperty> {}
