import * as t from 'io-ts';
import * as common from '../lib/common';
import { ChipBaseExtendPropey } from './ChipBaseExtendPropey'; // import
import { ChipCFD335AExtendProperty } from './ChipCFD335AExtendProperty';
 // import
export const ChipCFD335ARGBVExtendPropertyBase = t.intersection(
  [
    ChipBaseExtendPropey,
    t.partial({
      RedProperty: ChipCFD335AExtendProperty, // #3319
      GreenProperty: ChipCFD335AExtendProperty, // #3321
      BlueProperty: ChipCFD335AExtendProperty, // #3323
      VRedProperty: ChipCFD335AExtendProperty, // #3325
      EnGCLKMutiRate: common.Bool, // #3350
      SubField: common.UInt8, // #3364
      GrayDepth: common.UInt8, // #3385
      IsAdvancedMode: common.Bool, // #3409
      IsUseNewModule: common.Bool, // #3421
      FirstDataLen: common.Int32, // #3423
      FirstStartIndex: common.Int32, // #3425
      FirstRegisterAddr: common.Int32, // #3427
      SecondDataLen: common.Int32, // #3429
      SecondStartIndex: common.Int32, // #3431
      SecondRegisterAddr: common.Int32, // #3433
      ThirdDataLen: common.Int32, // #3435
      ThirdDataStartIndex: common.Int32, // #3437
      ThirdRegisterAddr: common.Int32, // #3439
      FourthDataLen: common.Int32, // #3441
      FourthStartIndex: common.Int32, // #3443
      FourthRegisterAddr: common.Int32, // #3445
    }),
  ],
  'ChipCFD335ARGBVExtendPropertyBase'
);
/**
 * Codec for {@link ChipCFD335ARGBVExtendProperty}
 * @category Codecs
 * @see Automatically generated from ../decompiled/Nova.LCT.GigabitSystem.ChipCFD335A.decompiled.cs:3312
 */
export const ChipCFD335ARGBVExtendProperty = t.intersection(
  [
    ChipCFD335ARGBVExtendPropertyBase,
    t.partial({ '@_xsi:type': t.literal('ChipCFD335ARGBVExtendProperty') }),
  ],
  'ChipCFD335ARGBVExtendProperty'
);
export interface ChipCFD335ARGBVExtendProperty
  extends t.TypeOf<typeof ChipCFD335ARGBVExtendProperty> {
  RedProperty?: ChipCFD335AExtendProperty;
  GreenProperty?: ChipCFD335AExtendProperty;
  BlueProperty?: ChipCFD335AExtendProperty;
  VRedProperty?: ChipCFD335AExtendProperty;
}
