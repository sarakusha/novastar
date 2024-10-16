import * as t from 'io-ts';
import * as common from '../lib/common';
/**
 * Codec for interface {@link Chip2053ExtendPropety}
 * @category Codecs
 * @see Automatically generated from ../decompiled/Nova.LCT.GigabitSystem.DataClass.decompiled.cs:53733
 */
export const Chip2053ExtendPropety = t.intersection(
  [
    t.type({
      EnhancedModeSwitch: common.Bool_true, // #53875
      RLowAshPitsImprove: common.UInt8_1, // #53888
      GLowAshPitsImprove: common.UInt8_1, // #53901
      BLowAshPitsImprove: common.UInt8_1, // #53927
      RColorAdjust: common.UInt8_15, // #53940
      GColorAdjust: common.UInt8_15, // #53953
      BColorAdjust: common.UInt8_15, // #53966
      RVanishingStrength: common.UInt8_31, // #53979
      GVanishingStrength: common.withDefault(common.UInt8, 25), // #53992
      BVanishingStrength: common.UInt8_23, // #54005
      RdeGhost: common.Bool_true, // #54018
      GdeGhost: common.Bool_true, // #54031
      BdeGhost: common.Bool_true, // #54083
      RBlackingEnhance: common.Bool_true, // #54096
      GBlackingEnhance: common.Bool_true, // #54108
      BBlackingEnhance: common.Bool_true, // #54120
      RHeadDarkLineOpt: common.UInt8_1, // #54132
      GHeadDarkLineOpt: common.UInt8_1, // #54144
      BHeadDarkLineOpt: common.UInt8_1, // #54156
      RFirstLineSlantsDarkOptimization: common.UInt8_1, // #54168
      GFirstLineSlantsDarkOptimization: common.UInt8_1, // #54181
      BFirstLineSlantsDarkOptimization: common.UInt8_1, // #54311
      RRemoveBadPointGain: common.UInt16_1, // #54323
      GRemoveBadPointGain: common.UInt16_1, // #54335
      BRemoveBadPointGain: common.UInt16_1,
    }),
    t.partial({
      EnhancedMode: common.UInt8, // #53837
      RAberrationOptimize: common.Bool, // #53849
      GAberrationOptimize: common.Bool, // #53862
      BAberrationOptimize: common.Bool, // #53914
      FailureLEDElimination: common.Bool, // #54044
      RColorAdjustEn: common.Bool, // #54057
      GColorAdjustEn: common.Bool, // #54070
      BColorAdjustEn: common.Bool, // #54194
      RedRegValueConfigThird: common.UInt16, // #54207
      GreenRegValueConfigThird: common.UInt16, // #54220
      BlueRegValueConfigThird: common.UInt16, // #54233
      VRedRegValueConfigThird: common.UInt16, // #54246
      RedRegValueConfigSpecial: common.UInt16, // #54259
      GreenRegValueConfigSpecial: common.UInt16, // #54272
      BlueRegValueConfigSpecial: common.UInt16, // #54285
      VRedRegValueConfigSpecial: common.UInt16, // #54298
      IsCustomMode: common.Bool, // #54347
      RedRegValueConfigFifth: common.UInt16, // #54359
      GreenRegValueConfigFifth: common.UInt16, // #54372
      BlueRegValueConfigFifth: common.UInt16,
    }),
  ],
  'Chip2053ExtendPropety'
);
export interface Chip2053ExtendPropety extends t.TypeOf<typeof Chip2053ExtendPropety> {}
