import * as t from 'io-ts';
import * as common from '../lib/common';
import { ChipBaseExtendPropey } from './ChipBaseExtendPropey'; // import
import { ChipMBI5850BCustomExtendProperty } from './ChipMBI5850BCustomExtendProperty'; // import
import { ChipMBI5850BExtendProperty } from './ChipMBI5850BExtendProperty';
 // import
export const ChipMBI5850BRGBVExtendPropertyBase = t.intersection(
  [
    ChipBaseExtendPropey,
    t.type({
      REG_LENGTH: common.Int32_6, // #2648
      IsAdvancedMode: common.Bool_true,
    }),
    t.partial({
      RedProperty: ChipMBI5850BExtendProperty, // #2630
      GreenProperty: ChipMBI5850BExtendProperty, // #2632
      BlueProperty: ChipMBI5850BExtendProperty, // #2634
      VRedProperty: ChipMBI5850BExtendProperty, // #2636
      ChipMBI5850BCustomExtendProperty, // #2638
      IsUseNewModule: common.Bool, // #2646
      ChipLibVersion: common.UInt8, // #2650
      GradualTransitionOptimizationTime: common.UInt8, // #2662
      LineBlanking: common.UInt8, // #2683
      LineOccation: common.UInt8, // #2704
      GrayDepth: common.UInt8, // #2716
      M: common.UInt8, // #2737
      N: common.UInt8, // #2758
      Div: common.UInt8, // #2779
      nDiv: common.UInt8, // #2792
      EnDoubleRefresh: common.Bool, // #2813
      GrayBetter: common.Bool, // #2829
      ScanType: common.UInt8, // #2845
      EnableToRemoveBadPoints: common.Bool, // #2857
      GhostEliminationLevelR: common.UInt8, // #2873
      GhostEliminationLevelG: common.UInt8, // #2885
      GhostEliminationLevelB: common.UInt8, // #2897
      GradualTransitionOptimizationLevelR: common.UInt8, // #2909
      GradualTransitionOptimizationLevelG: common.UInt8, // #2921
      GradualTransitionOptimizationLevelB: common.UInt8, // #2933
      NoGhostElimination1R: common.UInt8, // #2945
      NoGhostElimination1G: common.UInt8, // #2957
      NoGhostElimination1B: common.UInt8, // #2969
      NoGhostElimination2R: common.UInt8, // #2981
      NoGhostElimination2G: common.UInt8, // #2993
      NoGhostElimination2B: common.UInt8, // #3005
      NoGhostElimination3R: common.UInt8, // #3017
      NoGhostElimination3G: common.UInt8, // #3029
      NoGhostElimination3B: common.UInt8, // #3041
      LowAshCompensationR: common.UInt8, // #3053
      LowAshCompensationG: common.UInt8, // #3065
      LowAshCompensationB: common.UInt8, // #3077
      SwapErrorPointR: common.UInt8, // #3089
      SwapErrorPointG: common.UInt8, // #3101
      SwapErrorPointB: common.UInt8, // #3113
      HighContrastInterferenceR: common.Int32, // #3125
      HighContrastInterferenceG: common.Int32, // #3137
      HighContrastInterferenceB: common.Int32, // #3149
      SpecialDataLen: common.Int32, // #3161
      SpecialRegisterAddr: common.UInt32,
    }),
  ],
  'ChipMBI5850BRGBVExtendPropertyBase'
);
/**
 * Codec for {@link ChipMBI5850BRGBVExtendProperty}
 * @category Codecs
 * @see Automatically generated from ../decompiled/Nova.LCT.GigabitSystem.ChipMBI5850B.decompiled.cs:2625
 */
export const ChipMBI5850BRGBVExtendProperty = t.intersection(
  [
    ChipMBI5850BRGBVExtendPropertyBase,
    t.partial({ '@_xsi:type': t.literal('ChipMBI5850BRGBVExtendProperty') }),
  ],
  'ChipMBI5850BRGBVExtendProperty'
);
export interface ChipMBI5850BRGBVExtendProperty
  extends t.TypeOf<typeof ChipMBI5850BRGBVExtendProperty> {
  RedProperty?: ChipMBI5850BExtendProperty;
  GreenProperty?: ChipMBI5850BExtendProperty;
  BlueProperty?: ChipMBI5850BExtendProperty;
  VRedProperty?: ChipMBI5850BExtendProperty;
  ChipMBI5850BCustomExtendProperty?: ChipMBI5850BCustomExtendProperty;
}
