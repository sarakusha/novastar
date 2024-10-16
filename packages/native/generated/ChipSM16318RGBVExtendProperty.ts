import * as t from 'io-ts';
import * as common from '../lib/common';
import { ChipBaseExtendPropey } from './ChipBaseExtendPropey'; // import
import { ChipSM16318ExtendProperty } from './ChipSM16318ExtendProperty';
 // import
export const ChipSM16318RGBVExtendPropertyBase = t.intersection(
  [
    ChipBaseExtendPropey,
    t.type({
      REG_LENGTH: common.Int32_7, // #2004
      SMICNumber: common.UInt8_0,
    }),
    t.partial({
      RedProperty: ChipSM16318ExtendProperty, // #1986
      GreenProperty: ChipSM16318ExtendProperty, // #1988
      BlueProperty: ChipSM16318ExtendProperty, // #1990
      VRedProperty: ChipSM16318ExtendProperty, // #1992
      IsUseNewModule: common.Bool, // #2000
      ChipLibVersion: common.UInt8, // #2002
      IsAdvancedMode: common.Bool, // #2016
      GainStep: common.UInt8, // #2028
      SpecialDataLen: common.Int32, // #2041
      SpecialRegisterAddr: common.UInt32, // #2043
      ScanType: common.UInt8, // #2045
      GrayDepthEn: common.Bool, // #2057
      SubFields: common.UInt8, // #2069
      ShadowEliminationLevelR: common.UInt8, // #2082
      ShadowEliminationLevelG: common.UInt8, // #2094
      ShadowEliminationLevelB: common.UInt8, // #2106
      ShadowEhancedModeEnR: common.Bool, // #2118
      ShadowEhancedModeEnG: common.Bool, // #2130
      ShadowEhancedModeEnB: common.Bool, // #2142
      FirstLineDarkCompensationLevelR: common.UInt8, // #2154
      FirstLineDarkCompensationLevelG: common.UInt8, // #2166
      FirstLineDarkCompensationLevelB: common.UInt8, // #2178
      LowGrayscaleCompensationR: common.UInt8, // #2190
      LowGrayscaleCompensationG: common.UInt8, // #2202
      LowGrayscaleCompensationB: common.UInt8, // #2214
      GrayHomogeneity: common.UInt8, // #2226
      EliminateOpenCrossGradeR: common.UInt8, // #2238
      EliminateOpenCrossGradeG: common.UInt8, // #2250
      EliminateOpenCrossGradeB: common.UInt8, // #2262
      SetBadPointEn: common.Bool, // #2274
      EnergySaving: common.Bool,
    }),
  ],
  'ChipSM16318RGBVExtendPropertyBase'
);
/**
 * Codec for {@link ChipSM16318RGBVExtendProperty}
 * @category Codecs
 * @see Automatically generated from ../decompiled/Nova.LCT.GigabitSystem.ChipSM16318.decompiled.cs:1981
 */
export const ChipSM16318RGBVExtendProperty = t.intersection(
  [
    ChipSM16318RGBVExtendPropertyBase,
    t.partial({ '@_xsi:type': t.literal('ChipSM16318RGBVExtendProperty') }),
  ],
  'ChipSM16318RGBVExtendProperty'
);
export interface ChipSM16318RGBVExtendProperty
  extends t.TypeOf<typeof ChipSM16318RGBVExtendProperty> {
  RedProperty?: ChipSM16318ExtendProperty;
  GreenProperty?: ChipSM16318ExtendProperty;
  BlueProperty?: ChipSM16318ExtendProperty;
  VRedProperty?: ChipSM16318ExtendProperty;
}
