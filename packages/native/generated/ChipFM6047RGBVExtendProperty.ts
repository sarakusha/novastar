import * as t from 'io-ts';
import * as common from '../lib/common';
import { ChipBaseExtendPropey } from './ChipBaseExtendPropey'; // import
import { ChipFM6047ExtendProperty } from './ChipFM6047ExtendProperty';
 // import
export const ChipFM6047RGBVExtendPropertyBase = t.intersection(
  [
    ChipBaseExtendPropey,
    t.type({
      OpenTestModel: common.UInt8_0,
    }),
    t.partial({
      RedProperty: ChipFM6047ExtendProperty, // #3070
      GreenProperty: ChipFM6047ExtendProperty, // #3072
      BlueProperty: ChipFM6047ExtendProperty, // #3074
      VRedProperty: ChipFM6047ExtendProperty, // #3076
      IsUseNewModule: common.Bool, // #3086
      IsAdvancedMode: common.Bool, // #3105
      EnGCLKMutiRate: common.Bool, // #3117
      OpenTestEnable: common.Bool, // #3143
      FirstDataLen: common.Int32, // #3157
      FirstStartIndex: common.Int32, // #3159
      FirstRegisterAddr: common.Int32, // #3161
      SecondDataLen: common.Int32, // #3163
      SecondStartIndex: common.Int32, // #3165
      SecondRegisterAddr: common.Int32, // #3167
      ThirdDataLen: common.Int32, // #3169
      ThirdDataStartIndex: common.Int32, // #3171
      ThirdRegisterAddr: common.Int32, // #3173
      FourthDataLen: common.Int32, // #3175
      FourthStartIndex: common.Int32, // #3177
      FourthRegisterAddr: common.Int32,
    }),
  ],
  'ChipFM6047RGBVExtendPropertyBase'
);
/**
 * Codec for {@link ChipFM6047RGBVExtendProperty}
 * @category Codecs
 * @see Automatically generated from ../decompiled/Nova.LCT.GigabitSystem.ChipFM6047.decompiled.cs:3065
 */
export const ChipFM6047RGBVExtendProperty = t.intersection(
  [
    ChipFM6047RGBVExtendPropertyBase,
    t.partial({ '@_xsi:type': t.literal('ChipFM6047RGBVExtendProperty') }),
  ],
  'ChipFM6047RGBVExtendProperty'
);
export interface ChipFM6047RGBVExtendProperty
  extends t.TypeOf<typeof ChipFM6047RGBVExtendProperty> {
  RedProperty?: ChipFM6047ExtendProperty;
  GreenProperty?: ChipFM6047ExtendProperty;
  BlueProperty?: ChipFM6047ExtendProperty;
  VRedProperty?: ChipFM6047ExtendProperty;
}
