import * as t from 'io-ts';
import * as common from '../lib/common';
import { ChipBaseExtendPropey } from './ChipBaseExtendPropey'; // import
import { ChipMBI5261ExtendProperty } from './ChipMBI5261ExtendProperty';
 // import
export const ChipMBI5261RGBVExtendPropertyBase = t.intersection(
  [
    ChipBaseExtendPropey,
    t.type({
      REG_LENGTH: common.Int32_7, // #3020
      HGradientTransitionOptimization: common.UInt8_64, // #3022
      LGradientTransitionOptimization: common.UInt8_64, // #3034
      HBlankingSetting: common.UInt8_64,
    }),
    t.partial({
      RedProperty: ChipMBI5261ExtendProperty, // #2996
      GreenProperty: ChipMBI5261ExtendProperty, // #2998
      BlueProperty: ChipMBI5261ExtendProperty, // #3000
      VRedProperty: ChipMBI5261ExtendProperty, // #3010
      SpecialRegisterAddr: common.UInt32, // #3016
      IsUseNewModule: common.Bool, // #3018
      ChipLibVersion: common.UInt8, // #3046
      RemoveBadPointEnable: common.Bool, // #3058
      SubField: common.UInt8, // #3088
      DoubleFreq: common.Bool, // #3102
      GrayDepth: common.UInt8, // #3116
      IsAdvancedMode: common.Bool, // #3130
      SpecialDataLen: common.Int32, // #3142
      SepcialRegisterAddr: common.UInt32,
    }),
  ],
  'ChipMBI5261RGBVExtendPropertyBase'
);
/**
 * Codec for {@link ChipMBI5261RGBVExtendProperty}
 * @category Codecs
 * @see Automatically generated from ../decompiled/Nova.LCT.GigabitSystem.ChipMBI5261.decompiled.cs:2993
 */
export const ChipMBI5261RGBVExtendProperty = t.intersection(
  [
    ChipMBI5261RGBVExtendPropertyBase,
    t.partial({ '@_xsi:type': t.literal('ChipMBI5261RGBVExtendProperty') }),
  ],
  'ChipMBI5261RGBVExtendProperty'
);
export interface ChipMBI5261RGBVExtendProperty
  extends t.TypeOf<typeof ChipMBI5261RGBVExtendProperty> {
  RedProperty?: ChipMBI5261ExtendProperty;
  GreenProperty?: ChipMBI5261ExtendProperty;
  BlueProperty?: ChipMBI5261ExtendProperty;
  VRedProperty?: ChipMBI5261ExtendProperty;
}
