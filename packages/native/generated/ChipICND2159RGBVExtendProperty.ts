import * as t from 'io-ts';
import * as common from '../lib/common';
import { ChipBaseExtendPropey } from './ChipBaseExtendPropey'; // import
import { ChipICND2159ExtendProperty } from './ChipICND2159ExtendProperty';
 // import
export const ChipICND2159RGBVExtendPropertyBase = t.intersection(
  [
    ChipBaseExtendPropey,
    t.partial({
      RedProperty: ChipICND2159ExtendProperty, // #3290
      GreenProperty: ChipICND2159ExtendProperty, // #3292
      BlueProperty: ChipICND2159ExtendProperty, // #3294
      VRedProperty: ChipICND2159ExtendProperty, // #3296
      IsUseNewModule: common.Bool, // #3304
      PartNumRef: common.UInt8, // #3323
      IsAdvancedMode: common.Bool, // #3345
      IsRemoveBad: common.Bool, // #3357
      IsRemoveBadEnhancedMode: common.Bool, // #3371
      EnhancedModeGrade: common.UInt8, // #3383
      FirstDataLen: common.Int32, // #3395
      FirstStartIndex: common.Int32, // #3397
      FirstRegisterAddr: common.Int32, // #3399
      SecondDataLen: common.Int32, // #3401
      SecondStartIndex: common.Int32, // #3403
      SecondRegisterAddr: common.Int32, // #3405
      ThirdDataLen: common.Int32, // #3407
      ThirdDataStartIndex: common.Int32, // #3409
      ThirdRegisterAddr: common.Int32, // #3411
      FourthDataLen: common.Int32, // #3413
      FourthStartIndex: common.Int32, // #3415
      FourthRegisterAddr: common.Int32, // #3417
    }),
  ],
  'ChipICND2159RGBVExtendPropertyBase'
);
/**
 * Codec for {@link ChipICND2159RGBVExtendProperty}
 * @category Codecs
 * @see Automatically generated from ../decompiled/Nova.LCT.GigabitSystem.ChipICND2159.decompiled.cs:3285
 */
export const ChipICND2159RGBVExtendProperty = t.intersection(
  [
    ChipICND2159RGBVExtendPropertyBase,
    t.partial({ '@_xsi:type': t.literal('ChipICND2159RGBVExtendProperty') }),
  ],
  'ChipICND2159RGBVExtendProperty'
);
export interface ChipICND2159RGBVExtendProperty
  extends t.TypeOf<typeof ChipICND2159RGBVExtendProperty> {
  RedProperty?: ChipICND2159ExtendProperty;
  GreenProperty?: ChipICND2159ExtendProperty;
  BlueProperty?: ChipICND2159ExtendProperty;
  VRedProperty?: ChipICND2159ExtendProperty;
}
