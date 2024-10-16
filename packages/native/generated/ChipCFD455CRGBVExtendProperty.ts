import * as t from 'io-ts';
import * as common from '../lib/common';
import { ChipBaseExtendPropey } from './ChipBaseExtendPropey'; // import
import { ChipCFD455CExtendProperty } from './ChipCFD455CExtendProperty'; // import
import { DecodeType, DecodeTypeEnum } from './DecodeType';
 // import
export const ChipCFD455CRGBVExtendPropertyBase = t.intersection(
  [
    ChipBaseExtendPropey,
    t.partial({
      RedProperty: ChipCFD455CExtendProperty, // #4163
      GreenProperty: ChipCFD455CExtendProperty, // #4165
      BlueProperty: ChipCFD455CExtendProperty, // #4167
      VRedProperty: ChipCFD455CExtendProperty, // #4169
      ChipMemberIndex: common.Int32, // #4179
      CurrentDecode: DecodeType, // #4181
      SoftReset: common.Bool, // #4183
      LineBlankingBeginTime: common.UInt8, // #4195
      IsUseNewModule: common.Bool, // #4224
      DoubleFreq: common.Bool, // #4226
      MixFreq: common.Bool, // #4240
      SubField: common.UInt8, // #4254
      GrayDepth: common.UInt8, // #4284
      IsAdvancedMode: common.Bool, // #4298
      FirstDataLen: common.Int32, // #4310
      FirstStartIndex: common.Int32, // #4312
      FirstRegisterAddr: common.Int32, // #4314
      SecondDataLen: common.Int32, // #4316
      SecondStartIndex: common.Int32, // #4318
      SecondRegisterAddr: common.Int32, // #4320
      ThirdDataLen: common.Int32, // #4322
      ThirdDataStartIndex: common.Int32, // #4324
      ThirdRegisterAddr: common.Int32, // #4326
      FourthDataLen: common.Int32, // #4328
      FourthStartIndex: common.Int32, // #4330
      FourthRegisterAddr: common.Int32, // #4332
      FifthDataLen: common.Int32, // #4334
      FifthStartIndex: common.Int32, // #4336
      FifthRegisterAddr: common.Int32, // #4338
    }),
  ],
  'ChipCFD455CRGBVExtendPropertyBase'
);
/**
 * Codec for {@link ChipCFD455CRGBVExtendProperty}
 * @category Codecs
 * @see Automatically generated from ../decompiled/Nova.LCT.GigabitSystem.ChipCFD455C.decompiled.cs:4156
 */
export const ChipCFD455CRGBVExtendProperty = t.intersection(
  [
    ChipCFD455CRGBVExtendPropertyBase,
    t.partial({ '@_xsi:type': t.literal('ChipCFD455CRGBVExtendProperty') }),
  ],
  'ChipCFD455CRGBVExtendProperty'
);
export interface ChipCFD455CRGBVExtendProperty
  extends t.TypeOf<typeof ChipCFD455CRGBVExtendProperty> {
  RedProperty?: ChipCFD455CExtendProperty;
  GreenProperty?: ChipCFD455CExtendProperty;
  BlueProperty?: ChipCFD455CExtendProperty;
  VRedProperty?: ChipCFD455CExtendProperty;
  CurrentDecode?: DecodeTypeEnum;
}
