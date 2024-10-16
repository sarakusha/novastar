import * as t from 'io-ts';
import * as common from '../lib/common';
/**
 * Codec for interface {@link Chip2163ExtendPropety}
 * @category Codecs
 * @see Automatically generated from ../decompiled/Nova.LCT.GigabitSystem.DataClass.decompiled.cs:65383
 */
export const Chip2163ExtendPropety = t.intersection(
  [
    t.type({
      EnhancedModeSwitch: common.Bool_true, // #65517
      RLowAshPitsImprove: common.UInt8_1, // #65530
      GLowAshPitsImprove: common.UInt8_1, // #65543
      BLowAshPitsImprove: common.UInt8_1, // #65608
      RVanishingStrength: common.UInt8_31, // #65621
      GVanishingStrength: common.UInt8_28, // #65634
      BVanishingStrength: common.UInt8_23, // #65647
      RedDN: common.Bool_true, // #65660
      GreenDN: common.Bool_true, // #65673
      BlueDN: common.Bool_true, // #65686
      RdeGhost: common.Bool_true, // #65699
      GdeGhost: common.Bool_true, // #65712
      BdeGhost: common.Bool_true, // #65801
      RHeadDarkLineOpt: common.UInt8_1, // #65813
      GHeadDarkLineOpt: common.UInt8_1, // #65825
      BHeadDarkLineOpt: common.UInt8_1, // #65837
      RFirstLineSlantsDarkOptimization: common.UInt8_1, // #65849
      GFirstLineSlantsDarkOptimization: common.UInt8_1, // #65862
      BFirstLineSlantsDarkOptimization: common.UInt8_1,
    }),
    t.partial({
      EnhancedMode: common.UInt8, // #65479
      RAberrationOptimize: common.Bool, // #65491
      GAberrationOptimize: common.Bool, // #65504
      BAberrationOptimize: common.Bool, // #65556
      FailureLEDElimination: common.Bool, // #65569
      RColorAdjust: common.UInt8, // #65582
      GColorAdjust: common.UInt8, // #65595
      BColorAdjust: common.UInt8, // #65725
      RColorAdjustEn: common.Bool, // #65738
      GColorAdjustEn: common.Bool, // #65751
      BColorAdjustEn: common.Bool, // #65764
      RBlackingEnhance: common.Bool, // #65777
      GBlackingEnhance: common.Bool, // #65789
      BBlackingEnhance: common.Bool, // #65875
      RedRegValueConfigThird: common.UInt16, // #65888
      GreenRegValueConfigThird: common.UInt16, // #65901
      BlueRegValueConfigThird: common.UInt16, // #65914
      VRedRegValueConfigThird: common.UInt16, // #65927
      RedRegValueConfigSpecial: common.UInt16, // #65940
      GreenRegValueConfigSpecial: common.UInt16, // #65953
      BlueRegValueConfigSpecial: common.UInt16, // #65966
      VRedRegValueConfigSpecial: common.UInt16,
    }),
  ],
  'Chip2163ExtendPropety'
);
export interface Chip2163ExtendPropety extends t.TypeOf<typeof Chip2163ExtendPropety> {}
