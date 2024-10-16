import * as t from 'io-ts';
import * as common from '../lib/common';
import { ChipBaseExtendPropey } from './ChipBaseExtendPropey';
 // import
export const ChipMT100RGBVExtendPropertyBase = t.intersection(
  [
    ChipBaseExtendPropey,
    t.type({
      RegValue: common.XMLArray(common.UInt16, 'ushort'),
    }),
    t.partial({
      VRedFirstReg3: common.UInt16, // #60
      IsUseNewModule: common.Bool, // #62
      ChipLibVersion: common.UInt8, // #64
      FirstDataLen: common.Int32, // #66
      FirstStartIndex: common.Int32, // #68
      FirstRegisterAddr: common.Int32, // #70
      ThirdDataLen: common.Int32, // #72
      ThirdDataStartIndex: common.Int32, // #74
      ThirdRegisterAddr: common.Int32, // #76
      IsAdvancedMode: common.Bool, // #78
      IsOpenChannelCheck: common.Bool, // #90
      T1H: common.UInt16, // #102
      T0H: common.UInt16, // #114
      OneCodeCycle: common.UInt16, // #126
      ZeroCodeCycle: common.UInt16, // #138
      RedGain: common.Int32, // #150
      GreenGain: common.Int32, // #162
      BlueGain: common.Int32, // #174
      VRedGain: common.Int32, // #186
      GainMappingScale: common.Int32,
    }),
  ],
  'ChipMT100RGBVExtendPropertyBase'
);
/**
 * Codec for {@link ChipMT100RGBVExtendProperty}
 * @category Codecs
 * @see Automatically generated from ../decompiled/Nova.LCT.GigabitSystem.Chip_MT100.decompiled.cs:42
 */
export const ChipMT100RGBVExtendProperty = t.intersection(
  [
    ChipMT100RGBVExtendPropertyBase,
    t.partial({ '@_xsi:type': t.literal('ChipMT100RGBVExtendProperty') }),
  ],
  'ChipMT100RGBVExtendProperty'
);
export interface ChipMT100RGBVExtendProperty extends t.TypeOf<typeof ChipMT100RGBVExtendProperty> {}
