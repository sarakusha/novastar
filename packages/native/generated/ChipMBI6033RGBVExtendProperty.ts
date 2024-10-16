import * as t from 'io-ts';
import * as common from '../lib/common';
import { ChipBaseExtendPropey } from './ChipBaseExtendPropey'; // import
import { ChipMBI6033ExtendProperty } from './ChipMBI6033ExtendProperty';
 // import
export const ChipMBI6033RGBVExtendPropertyBase = t.intersection(
  [
    ChipBaseExtendPropey,
    t.partial({
      RedProperty: ChipMBI6033ExtendProperty, // #91
      GreenProperty: ChipMBI6033ExtendProperty, // #93
      BlueProperty: ChipMBI6033ExtendProperty, // #95
      IsUseNewModule: common.Bool, // #97
      ChipLibVersion: common.UInt8, // #99
      ICNumber: common.UInt16, // #101
      GclkUnitCycle: common.UInt8, // #114
      FirstDataLen: common.Int32, // #126
      FirstStartIndex: common.Int32, // #128
      FirstRegisterAddr: common.Int32, // #130
      SecondDataLen: common.Int32, // #132
      SecondStartIndex: common.Int32, // #134
      SecondRegisterAddr: common.Int32, // #136
      ThirdDataLen: common.Int32, // #138
      ThirdDataStartIndex: common.Int32, // #140
      ThirdRegisterAddr: common.Int32, // #142
    }),
  ],
  'ChipMBI6033RGBVExtendPropertyBase'
);
/**
 * Codec for {@link ChipMBI6033RGBVExtendProperty}
 * @category Codecs
 * @see Automatically generated from ../decompiled/Nova.LCT.GigabitSystem.ChipMBI6033.decompiled.cs:84
 */
export const ChipMBI6033RGBVExtendProperty = t.intersection(
  [
    ChipMBI6033RGBVExtendPropertyBase,
    t.partial({ '@_xsi:type': t.literal('ChipMBI6033RGBVExtendProperty') }),
  ],
  'ChipMBI6033RGBVExtendProperty'
);
export interface ChipMBI6033RGBVExtendProperty
  extends t.TypeOf<typeof ChipMBI6033RGBVExtendProperty> {
  RedProperty?: ChipMBI6033ExtendProperty;
  GreenProperty?: ChipMBI6033ExtendProperty;
  BlueProperty?: ChipMBI6033ExtendProperty;
}
