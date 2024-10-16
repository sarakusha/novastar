import * as t from 'io-ts';
import * as common from '../lib/common';
import { ChipBaseExtendPropey } from './ChipBaseExtendPropey'; // import
import { ChipICN2260ExtendProperty } from './ChipICN2260ExtendProperty';
 // import
export const ChipICN2260RGBVExtendPropertyBase = t.intersection(
  [
    ChipBaseExtendPropey,
    t.type({
      REG_LENGTH: common.Int32_238, // #4607
      PhaseTwo: common.Int32_3, // #4609
      DclkUnitCycle: common.Int32_2,
    }),
    t.partial({
      ScanPropertyRegister: ChipICN2260ExtendProperty, // #4603
      IsUseNewModule: common.Bool, // #4605
      PhaseOne: common.Int32, // #4612
      IsOpenICCorrect: common.Bool, // #4615
      ChipLibVersion: common.UInt8, // #4617
      P: common.UInt8, // #4619
      M: common.UInt8, // #4631
      N: common.UInt8, // #4643
      SubFieldss: common.UInt8, // #4655
      SubFields: common.UInt8, // #4657
      GclkNumberEn: common.Bool, // #4702
      ChannelChoice: common.UInt8, // #4714
      Exp_timeR: common.UInt8, // #4726
      Exp_timeG: common.UInt8, // #4738
      Exp_timeB: common.UInt8, // #4750
      SubFieldsAuto: common.UInt8, // #4762
      FirstDataLen: common.Int32, // #4774
      FirstStartIndex: common.Int32, // #4776
      FirstRegisterAddr: common.Int32, // #4778
      SpecialDataLen: common.Int32, // #4780
      SpecialRegisterAddr: common.UInt32,
    }),
  ],
  'ChipICN2260RGBVExtendPropertyBase'
);
/**
 * Codec for {@link ChipICN2260RGBVExtendProperty}
 * @category Codecs
 * @see Automatically generated from ../decompiled/Nova.LCT.GigabitSystem.ChipICN2260.decompiled.cs:4594
 */
export const ChipICN2260RGBVExtendProperty = t.intersection(
  [
    ChipICN2260RGBVExtendPropertyBase,
    t.partial({ '@_xsi:type': t.literal('ChipICN2260RGBVExtendProperty') }),
  ],
  'ChipICN2260RGBVExtendProperty'
);
export interface ChipICN2260RGBVExtendProperty
  extends t.TypeOf<typeof ChipICN2260RGBVExtendProperty> {
  ScanPropertyRegister?: ChipICN2260ExtendProperty;
}
