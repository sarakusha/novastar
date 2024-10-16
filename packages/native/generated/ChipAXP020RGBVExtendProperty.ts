import * as t from 'io-ts';
import * as common from '../lib/common';
import { ChipBaseExtendPropey } from './ChipBaseExtendPropey';
 // import
export const ChipAXP020RGBVExtendPropertyBase = t.intersection(
  [
    ChipBaseExtendPropey,
    t.type({
      RegValue: common.XMLArray(common.UInt16, 'ushort'),
    }),
    t.partial({
      IsUseNewModule: common.Bool, // #54
      ChipLibVersion: common.UInt8, // #56
      FirstDataLen: common.Int32, // #58
      FirstStartIndex: common.Int32, // #60
      FirstRegisterAddr: common.Int32, // #62
      ThirdDataLen: common.Int32, // #64
      ThirdDataStartIndex: common.Int32, // #66
      ThirdRegisterAddr: common.Int32, // #68
      IsAdvancedMode: common.Bool, // #70
      IsOpenChannelCheck: common.Bool, // #82
      T1H: common.UInt16, // #94
      T0H: common.UInt16, // #106
      OneCodeCycle: common.UInt16, // #118
      BrightnessControl: common.UInt8, // #130
      InterType: common.UInt8, // #142
      InterSpeed: common.UInt8, // #154
      ColorOfBit: common.UInt8,
    }),
  ],
  'ChipAXP020RGBVExtendPropertyBase'
);
/**
 * Codec for {@link ChipAXP020RGBVExtendProperty}
 * @category Codecs
 * @see Automatically generated from ../decompiled/Nova.LCT.GigabitSystem.Chip_AXP020.decompiled.cs:41
 */
export const ChipAXP020RGBVExtendProperty = t.intersection(
  [
    ChipAXP020RGBVExtendPropertyBase,
    t.partial({ '@_xsi:type': t.literal('ChipAXP020RGBVExtendProperty') }),
  ],
  'ChipAXP020RGBVExtendProperty'
);
export interface ChipAXP020RGBVExtendProperty
  extends t.TypeOf<typeof ChipAXP020RGBVExtendProperty> {}
