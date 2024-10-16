import * as t from 'io-ts';
import * as common from '../lib/common';
import { ChipBaseExtendPropey } from './ChipBaseExtendPropey'; // import
import { ChipICND2270ExtendProperty } from './ChipICND2270ExtendProperty';
 // import
export const ChipICND2270RGBVExtendPropertyBase = t.intersection(
  [
    ChipBaseExtendPropey,
    t.type({
      REG_LENGTH: common.Int32_256,
    }),
    t.partial({
      ScanPropertyRegister: ChipICND2270ExtendProperty, // #4401
      IsUseNewModule: common.Bool, // #4403
      ChipLibVersion: common.UInt8, // #4405
      P: common.UInt8, // #4407
      M: common.UInt8, // #4419
      N: common.UInt8, // #4431
      SubFieldss: common.UInt8, // #4443
      SubField: common.UInt8, // #4445
      SubFields: common.UInt8, // #4447
      GclkNumberEn: common.Bool, // #4492
      Exp_timeR: common.UInt8, // #4504
      Exp_timeG: common.UInt8, // #4516
      Exp_timeB: common.UInt8, // #4528
      A: common.UInt8, // #4540
      OpenHighRef: common.UInt8, // #4552
      SubFieldsAuto: common.UInt8, // #4564
      IsOpenICCorrect: common.Bool, // #4576
      FirstDataLen: common.Int32, // #4578
      FirstStartIndex: common.Int32, // #4580
      FirstRegisterAddr: common.Int32, // #4582
      SpecialDataLen: common.Int32, // #4584
      SpecialRegisterAddr: common.UInt32,
    }),
  ],
  'ChipICND2270RGBVExtendPropertyBase'
);
/**
 * Codec for {@link ChipICND2270RGBVExtendProperty}
 * @category Codecs
 * @see Automatically generated from ../decompiled/Nova.LCT.GigabitSystem.ChipICN2270.decompiled.cs:4390
 */
export const ChipICND2270RGBVExtendProperty = t.intersection(
  [
    ChipICND2270RGBVExtendPropertyBase,
    t.partial({ '@_xsi:type': t.literal('ChipICND2270RGBVExtendProperty') }),
  ],
  'ChipICND2270RGBVExtendProperty'
);
export interface ChipICND2270RGBVExtendProperty
  extends t.TypeOf<typeof ChipICND2270RGBVExtendProperty> {
  ScanPropertyRegister?: ChipICND2270ExtendProperty;
}
