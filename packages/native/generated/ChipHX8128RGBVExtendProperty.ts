import * as t from 'io-ts';
import * as common from '../lib/common';
import { ChipBaseExtendPropey } from './ChipBaseExtendPropey'; // import
import { ChipHX8128ExtendProperty } from './ChipHX8128ExtendProperty';
 // import
export const ChipHX8128RGBVExtendPropertyBase = t.intersection(
  [
    ChipBaseExtendPropey,
    t.type({
      REG_LENGTH: common.Int32_13,
    }),
    t.partial({
      RedProperty: ChipHX8128ExtendProperty, // #3113
      GreenProperty: ChipHX8128ExtendProperty, // #3115
      BlueProperty: ChipHX8128ExtendProperty, // #3117
      VRedProperty: ChipHX8128ExtendProperty, // #3119
      IsAdvancedMode: common.Bool, // #3142
      IsAdvancedFre: common.Bool, // #3154
      SubField: common.UInt8, // #3166
      GrayDepth: common.UInt8, // #3178
      IsUseNewModule: common.Bool, // #3190
      SpecialDataLen: common.Int32, // #3192
      SpecialRegisterAddr: common.UInt32, // #3194
      OpenDetection: common.Bool, // #3196
      RemoveBadPoint: common.Bool, // #3211
      M: common.UInt8, // #3226
      N: common.UInt8, // #3243
      P: common.UInt8, // #3260
      FirstDataLen: common.Int32, // #3353
      FirstStartIndex: common.Int32, // #3355
      FirstRegisterAddr: common.Int32, // #3357
      ErrRedGain: common.Int32, // #3359
      ErrGreenGain: common.Int32, // #3371
      ErrBlueGain: common.Int32,
    }),
  ],
  'ChipHX8128RGBVExtendPropertyBase'
);
/**
 * Codec for {@link ChipHX8128RGBVExtendProperty}
 * @category Codecs
 * @see Automatically generated from ../decompiled/Nova.LCT.GigabitSystem.ChipHX8128.decompiled.cs:3106
 */
export const ChipHX8128RGBVExtendProperty = t.intersection(
  [
    ChipHX8128RGBVExtendPropertyBase,
    t.partial({ '@_xsi:type': t.literal('ChipHX8128RGBVExtendProperty') }),
  ],
  'ChipHX8128RGBVExtendProperty'
);
export interface ChipHX8128RGBVExtendProperty
  extends t.TypeOf<typeof ChipHX8128RGBVExtendProperty> {
  RedProperty?: ChipHX8128ExtendProperty;
  GreenProperty?: ChipHX8128ExtendProperty;
  BlueProperty?: ChipHX8128ExtendProperty;
  VRedProperty?: ChipHX8128ExtendProperty;
}
