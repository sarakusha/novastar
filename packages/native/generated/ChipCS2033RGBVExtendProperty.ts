import * as t from 'io-ts';
import * as common from '../lib/common';
import { ChipBaseExtendPropey } from './ChipBaseExtendPropey'; // import
import { ChipCS2033ExtendProperty } from './ChipCS2033ExtendProperty';
 // import
export const ChipCS2033RGBVExtendPropertyBase = t.intersection(
  [
    ChipBaseExtendPropey,
    t.partial({
      RedProperty: ChipCS2033ExtendProperty, // #3351
      GreenProperty: ChipCS2033ExtendProperty, // #3353
      BlueProperty: ChipCS2033ExtendProperty, // #3355
      VRedProperty: ChipCS2033ExtendProperty, // #3357
      EnGCLKMutiRate: common.Bool, // #3382
      SubField: common.UInt8, // #3396
      GrayDepth: common.UInt8, // #3417
      IsAdvancedMode: common.Bool, // #3441
      IsUseNewModule: common.Bool, // #3453
      FirstDataLen: common.Int32, // #3455
      FirstStartIndex: common.Int32, // #3457
      FirstRegisterAddr: common.Int32, // #3459
      SecondDataLen: common.Int32, // #3461
      SecondStartIndex: common.Int32, // #3463
      SecondRegisterAddr: common.Int32, // #3465
      ThirdDataLen: common.Int32, // #3467
      ThirdDataStartIndex: common.Int32, // #3469
      ThirdRegisterAddr: common.Int32, // #3471
      FourthDataLen: common.Int32, // #3473
      FourthStartIndex: common.Int32, // #3475
      FourthRegisterAddr: common.Int32, // #3477
    }),
  ],
  'ChipCS2033RGBVExtendPropertyBase'
);
/**
 * Codec for {@link ChipCS2033RGBVExtendProperty}
 * @category Codecs
 * @see Automatically generated from ../decompiled/Nova.LCT.GigabitSystem.ChipCS2033.decompiled.cs:3344
 */
export const ChipCS2033RGBVExtendProperty = t.intersection(
  [
    ChipCS2033RGBVExtendPropertyBase,
    t.partial({ '@_xsi:type': t.literal('ChipCS2033RGBVExtendProperty') }),
  ],
  'ChipCS2033RGBVExtendProperty'
);
export interface ChipCS2033RGBVExtendProperty
  extends t.TypeOf<typeof ChipCS2033RGBVExtendProperty> {
  RedProperty?: ChipCS2033ExtendProperty;
  GreenProperty?: ChipCS2033ExtendProperty;
  BlueProperty?: ChipCS2033ExtendProperty;
  VRedProperty?: ChipCS2033ExtendProperty;
}
