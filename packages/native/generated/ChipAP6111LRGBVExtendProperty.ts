import * as t from 'io-ts';
import * as common from '../lib/common';
import { ChipBaseExtendPropey } from './ChipBaseExtendPropey';
 // import
export const ChipAP6111LRGBVExtendPropertyBase = t.intersection(
  [
    ChipBaseExtendPropey,
    t.type({
      IsOpenChannelCheck: common.Bool_false,
    }),
    t.partial({
      RedFirstReg1: common.UInt16, // #57
      GreenFirstReg1: common.UInt16, // #59
      BlueFirstReg1: common.UInt16, // #61
      VRedFirstReg1: common.UInt16, // #63
      RedFirstReg2: common.UInt16, // #65
      GreenFirstReg2: common.UInt16, // #67
      BlueFirstReg2: common.UInt16, // #69
      VRedFirstReg2: common.UInt16, // #73
      IsUseNewModule: common.Bool, // #85
      FirstDataLen: common.Int32, // #87
      FirstStartIndex: common.Int32, // #89
      FirstRegisterAddr: common.Int32, // #91
      SecondDataLen: common.Int32, // #93
      SecondStartIndex: common.Int32, // #95
      SecondRegisterAddr: common.Int32, // #97
      IsAdvancedMode: common.Bool, // #99
      ExecuteCommand: common.Bool, // #111
      WakeUpMode: common.Bool, // #123
      SleepUpMode: common.Bool,
    }),
  ],
  'ChipAP6111LRGBVExtendPropertyBase'
);
/**
 * Codec for {@link ChipAP6111LRGBVExtendProperty}
 * @category Codecs
 * @see Automatically generated from ../decompiled/Nova.LCT.GigabitSystem.ChipAP6111L.decompiled.cs:44
 */
export const ChipAP6111LRGBVExtendProperty = t.intersection(
  [
    ChipAP6111LRGBVExtendPropertyBase,
    t.partial({ '@_xsi:type': t.literal('ChipAP6111LRGBVExtendProperty') }),
  ],
  'ChipAP6111LRGBVExtendProperty'
);
export interface ChipAP6111LRGBVExtendProperty
  extends t.TypeOf<typeof ChipAP6111LRGBVExtendProperty> {}
