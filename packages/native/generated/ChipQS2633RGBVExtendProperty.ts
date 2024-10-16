import * as t from 'io-ts';
import * as common from '../lib/common';
import { ChipBaseExtendPropey } from './ChipBaseExtendPropey';
 // import
export const ChipQS2633RGBVExtendPropertyBase = t.intersection(
  [
    ChipBaseExtendPropey,
    t.type({
      RegAA: common.withDefault(common.UInt32, 128), // #51
      T1: common.withDefault(common.UInt16, 69), // #54
      T0: common.withDefault(common.UInt16, 31), // #60
      DataGroupNumber: common.UInt8_64, // #62
      Duration: common.UInt16_125, // #190
      SerieConnICNumPerGroupPowerSupply: common.UInt8_10, // #235
      BaudRate: common.UInt16_125,
    }),
    t.partial({
      LampNumPerData: common.UInt16, // #65
      IsUseNewModule: common.Bool, // #68
      En_Reg_Dis: common.Bool, // #70
      Reg_Delay_Pipes: common.UInt8, // #82
      Alarm_HTemp: common.UInt8, // #94
      TimeOut_Dis: common.Bool, // #106
      Soft_RST: common.Bool, // #118
      RSV: common.UInt8, // #130
      WorkMode: common.UInt8, // #142
      CurrentGrade: common.UInt8, // #154
      OpenDetectOff: common.Bool, // #166
      Shunt_Det_Off: common.Bool, // #178
      RSV1: common.UInt8, // #202
      SecondDataLen: common.Int32, // #225
      SecondStartIndex: common.Int32, // #227
      SecondRegisterAddr: common.Int32, // #229
      ThirdDataLen: common.Int32, // #231
      ThirdDataStartIndex: common.Int32, // #233
      ThirdRegisterAddr: common.Int32,
    }),
  ],
  'ChipQS2633RGBVExtendPropertyBase'
);
/**
 * Codec for {@link ChipQS2633RGBVExtendProperty}
 * @category Codecs
 * @see Automatically generated from ../decompiled/Nova.LCT.GigabitSystem.ChipQS2633.decompiled.cs:46
 */
export const ChipQS2633RGBVExtendProperty = t.intersection(
  [
    ChipQS2633RGBVExtendPropertyBase,
    t.partial({ '@_xsi:type': t.literal('ChipQS2633RGBVExtendProperty') }),
  ],
  'ChipQS2633RGBVExtendProperty'
);
export interface ChipQS2633RGBVExtendProperty
  extends t.TypeOf<typeof ChipQS2633RGBVExtendProperty> {}
