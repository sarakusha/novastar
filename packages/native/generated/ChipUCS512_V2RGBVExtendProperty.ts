import * as t from 'io-ts';
import * as common from '../lib/common';
import { ChipBaseExtendPropey } from './ChipBaseExtendPropey';
 // import
export const ChipUCS512_V2RGBVExtendPropertyBase = t.intersection(
  [
    ChipBaseExtendPropey,
    t.partial({
      RedFirstReg1: common.UInt16, // #47
      GreenFirstReg1: common.UInt16, // #49
      BlueFirstReg1: common.UInt16, // #51
      VRedFirstReg1: common.UInt16, // #53
      RedFirstReg2: common.UInt16, // #55
      GreenFirstReg2: common.UInt16, // #57
      BlueFirstReg2: common.UInt16, // #59
      VRedFirstReg2: common.UInt16, // #61
      RedFirstReg4: common.UInt16, // #63
      IsUseNewModule: common.Bool, // #65
      ChipLibVersion: common.UInt8, // #67
      FirstDataLen: common.Int32, // #69
      FirstStartIndex: common.Int32, // #71
      FirstRegisterAddr: common.Int32, // #73
      SecondDataLen: common.Int32, // #75
      SecondStartIndex: common.Int32, // #77
      SecondRegisterAddr: common.Int32, // #79
      FourthDataLen: common.Int32, // #81
      FourthStartIndex: common.Int32, // #83
      FourthRegisterAddr: common.Int32, // #85
      PowerOnLEDR: common.UInt16, // #87
      PowerOnLEDG: common.UInt16, // #99
      PowerOnLEDB: common.UInt16, // #111
      PowerOnLEDV: common.UInt16, // #123
      RedGian: common.UInt16, // #135
      GreenGian: common.UInt16, // #147
      BlueGian: common.UInt16, // #159
      VRedGian: common.UInt16, // #171
      NewDclk: common.UInt8, // #183
    }),
  ],
  'ChipUCS512_V2RGBVExtendPropertyBase'
);
/**
 * Codec for {@link ChipUCS512_V2RGBVExtendProperty}
 * @category Codecs
 * @see Automatically generated from ../decompiled/Nova.LCT.GigabitSystem.ChipUCS512V2.decompiled.cs:40
 */
export const ChipUCS512_V2RGBVExtendProperty = t.intersection(
  [
    ChipUCS512_V2RGBVExtendPropertyBase,
    t.partial({ '@_xsi:type': t.literal('ChipUCS512_V2RGBVExtendProperty') }),
  ],
  'ChipUCS512_V2RGBVExtendProperty'
);
export interface ChipUCS512_V2RGBVExtendProperty
  extends t.TypeOf<typeof ChipUCS512_V2RGBVExtendProperty> {}
