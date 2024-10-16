import * as t from 'io-ts';
import * as common from '../lib/common';
import { ChipBaseExtendPropey } from './ChipBaseExtendPropey';
 // import
export const ChipAXS6018RGBVExtendPropertyBase = t.intersection(
  [
    ChipBaseExtendPropey,
    t.type({
      WeightValueConfig: common.XMLArray(common.UInt16, 'ushort'),
    }),
    t.partial({
      FirstRegData: common.buffer_8, // #2083
      SecondRegData: common.buffer_8, // #2085
      ThirdRegData: common.buffer_8, // #2087
      FourthRegData: common.buffer_6, // #2089
      FifthRegData: common.buffer_6, // #2091
      SixthRegData: common.buffer_6, // #2093
      FirstRegisterAddr: common.Int32, // #2099
      SecondRegisterAddr: common.Int32, // #2101
      ThirdRegisterAddr: common.Int32, // #2103
      FourthRegisterAddr: common.Int32, // #2105
      FifthRegisterAddr: common.Int32, // #2107
      SixthRegisterAddr: common.Int32, // #2109
      FirstDataLen: common.Int32, // #2111
      FirstStartIndex: common.Int32, // #2113
      SecondDataLen: common.Int32, // #2115
      SecondStartIndex: common.Int32, // #2117
      ThirdDataLen: common.Int32, // #2119
      ThirdDataStartIndex: common.Int32, // #2121
      FourthDataLen: common.Int32, // #2123
      FourthStartIndex: common.Int32, // #2125
      FifthDataLen: common.Int32, // #2127
      FifthStartIndex: common.Int32, // #2129
      SixthDataLen: common.Int32, // #2131
      SixthStartIndex: common.Int32, // #2133
      IsUseNewModule: common.Bool, // #2135
      FirstLineDark: common.UInt8, // #2137
      ChargingOften: common.UInt8, // #2149
      LineShadowTime: common.UInt8, // #2161
      ShadowChargingMode: common.UInt8, // #2173
      AdditionalField: common.UInt8, // #2185
      HighGrayGain: common.UInt8, // #2197
      MultilevelCurrent: common.Bool, // #2209
      BlackLine: common.UInt8, // #2221
      DischargeTime: common.UInt8, // #2233
      DischargeR: common.Bool, // #2245
      DischargeG: common.Bool, // #2257
      DischargeB: common.Bool, // #2269
      RextR: common.UInt8, // #2281
      RextG: common.UInt8, // #2293
      RextB: common.UInt8, // #2305
      TubeDischargeEnable: common.Bool, // #2317
      LineTubeDischargeEnable: common.Bool, // #2329
      Contrast: common.UInt8, // #2341
      GammaGloablBright: common.UInt8, // #2353
      GammaRBright: common.UInt8, // #2365
      GammaGBright: common.UInt8, // #2377
      GammaBBright: common.UInt8, // #2389
      LineCP: common.UInt8, // #2401
      CtrlEndPoint: common.UInt8,
    }),
  ],
  'ChipAXS6018RGBVExtendPropertyBase'
);
/**
 * Codec for {@link ChipAXS6018RGBVExtendProperty}
 * @category Codecs
 * @see Automatically generated from ../decompiled/Nova.LCT.GigabitSystem.ChipAXS6018.decompiled.cs:2074
 */
export const ChipAXS6018RGBVExtendProperty = t.intersection(
  [
    ChipAXS6018RGBVExtendPropertyBase,
    t.partial({ '@_xsi:type': t.literal('ChipAXS6018RGBVExtendProperty') }),
  ],
  'ChipAXS6018RGBVExtendProperty'
);
export interface ChipAXS6018RGBVExtendProperty
  extends t.TypeOf<typeof ChipAXS6018RGBVExtendProperty> {}
