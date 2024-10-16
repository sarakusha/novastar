import * as t from 'io-ts';
import * as common from '../lib/common';
import { ChipBaseExtendPropey } from './ChipBaseExtendPropey'; // import
import { ChipICN2260miniExtendProperty } from './ChipICN2260miniExtendProperty';
 // import
export const ChipICN2260miniRGBVExtendPropertyBase = t.intersection(
  [
    ChipBaseExtendPropey,
    t.type({
      REG_LENGTH: common.Int32_238, // #4314
      PhaseTwo: common.Int32_3, // #4319
      DclkUnitCycle: common.Int32_2,
    }),
    t.partial({
      ScanPropertyRegister: ChipICN2260miniExtendProperty, // #4310
      IsUseNewModule: common.Bool, // #4312
      PhaseOne: common.Int32, // #4316
      ShiftNum: common.Int32, // #4321
      IsOpenICCorrect: common.Bool, // #4324
      ChipLibVersion: common.UInt8, // #4326
      P: common.UInt8, // #4328
      M: common.UInt8, // #4340
      N: common.UInt8, // #4352
      SubFieldss: common.UInt8, // #4364
      SubFields: common.UInt8, // #4366
      GclkNumberEn: common.Bool, // #4407
      Exp_timeR: common.UInt8, // #4419
      Exp_timeG: common.UInt8, // #4431
      Exp_timeB: common.UInt8, // #4443
      SubFieldsAuto: common.UInt8, // #4455
      FirstDataLen: common.Int32, // #4467
      FirstStartIndex: common.Int32, // #4469
      FirstRegisterAddr: common.Int32, // #4471
      SpecialDataLen: common.Int32, // #4473
      SpecialRegisterAddr: common.UInt32,
    }),
  ],
  'ChipICN2260miniRGBVExtendPropertyBase'
);
/**
 * Codec for {@link ChipICN2260miniRGBVExtendProperty}
 * @category Codecs
 * @see Automatically generated from ../decompiled/Nova.LCT.GigabitSystem.ChipICDD2260mini.decompiled.cs:4301
 */
export const ChipICN2260miniRGBVExtendProperty = t.intersection(
  [
    ChipICN2260miniRGBVExtendPropertyBase,
    t.partial({ '@_xsi:type': t.literal('ChipICN2260miniRGBVExtendProperty') }),
  ],
  'ChipICN2260miniRGBVExtendProperty'
);
export interface ChipICN2260miniRGBVExtendProperty
  extends t.TypeOf<typeof ChipICN2260miniRGBVExtendProperty> {
  ScanPropertyRegister?: ChipICN2260miniExtendProperty;
}
