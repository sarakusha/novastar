import * as t from 'io-ts';
import * as common from '../lib/common';
import { ChipBaseExtendPropey } from './ChipBaseExtendPropey';
 // import
export const ChipTLC6983ExtendPropertyBase = t.intersection(
  [
    ChipBaseExtendPropey,
    t.partial({
      RegisterArray: new common.BufferFromBase64(
        'RegisterArray',
        96 /* NumericLiteralExpression */
      ), // #2709
      RegArrayUI: new common.BufferFromBase64('RegArrayUI', 96 /* NumericLiteralExpression */), // #2711
      IsUseNewModule: common.Bool, // #2713
      ChipLibVersion: common.UInt8, // #2715
      IsPowerSavingMode1: common.Bool, // #2717
      PowerSavingMode2: common.UInt8, // #2729
      IsBadPoints: common.Bool, // #2741
      RLowGrayGradientAdj: common.UInt8, // #2753
      GLowGrayGradientAdj: common.UInt8, // #2765
      BLowGrayGradientAdj: common.UInt8, // #2778
      RLowGrayBrightCompensation: common.UInt8, // #2791
      GLowGrayBrightCompensation: common.UInt8, // #2803
      BLowGrayBrightCompensation: common.UInt8, // #2816
      BlackFieldRegulation: common.UInt8, // #2828
      RCouplingParameterAdj1: common.UInt8, // #2840
      GCouplingParameterAdj1: common.UInt8, // #2852
      BCouplingParameterAdj1: common.UInt8, // #2864
      RCouplingParameterAdj2: common.UInt8, // #2876
      GCouplingParameterAdj2: common.UInt8, // #2888
      BCouplingParameterAdj2: common.UInt8, // #2900
      IsRCouplingParameterAdj2: common.Bool, // #2912
      IsGCouplingParameterAdj2: common.Bool, // #2924
      IsBCouplingParameterAdj2: common.Bool, // #2936
      RLowAshColorCastCompensation: common.UInt8, // #2948
      GLowAshColorCastCompensation: common.UInt8, // #2960
      BLowAshColorCastCompensation: common.UInt8, // #2972
      Is256FrameRateMode: common.Bool, // #2984
      RGain: common.UInt8, // #2996
      GGain: common.UInt8, // #3008
      BGain: common.UInt8, // #3020
      GlobalGain: common.UInt8, // #3032
      ShortDetectionLevel: common.UInt8, // #3044
      MaxCurrentValue: common.UInt8, // #3056
      RSlowlyOpen: common.UInt8, // #3068
      GSlowlyOpen: common.UInt8, // #3080
      BSlowlyOpen: common.UInt8, // #3092
      RQuickTurnOff: common.UInt8, // #3104
      GQuickTurnOff: common.UInt8, // #3116
      BQuickTurnOff: common.UInt8, // #3128
      FirstLineDarkAdj: common.UInt8, // #3140
      IsCouplingParameterAdj3: common.Bool, // #3152
      CouplingParameterAdj4: common.UInt8, // #3164
      IsCouplingParameterAdj4: common.Bool, // #3176
    }),
  ],
  'ChipTLC6983ExtendPropertyBase'
);
/**
 * Codec for {@link ChipTLC6983ExtendProperty}
 * @category Codecs
 * @see Automatically generated from ../decompiled/Nova.LCT.GigabitSystem.ChipTLC6983.decompiled.cs:2706
 */
export const ChipTLC6983ExtendProperty = t.intersection(
  [
    ChipTLC6983ExtendPropertyBase,
    t.partial({ '@_xsi:type': t.literal('ChipTLC6983ExtendProperty') }),
  ],
  'ChipTLC6983ExtendProperty'
);
export interface ChipTLC6983ExtendProperty extends t.TypeOf<typeof ChipTLC6983ExtendProperty> {}
