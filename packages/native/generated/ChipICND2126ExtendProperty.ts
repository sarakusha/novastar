import * as t from 'io-ts';
import * as common from '../lib/common';
import { ChipBaseExtendPropey } from './ChipBaseExtendPropey';
 // import
export const ChipICND2126ExtendPropertyBase = t.intersection(
  [
    ChipBaseExtendPropey,
    t.partial({
      FirstRegValue: common.UInt16, // #1212
      SecondRegValue: common.UInt16, // #1214
      ShortDetection: common.UInt8, // #1216
      ErrorSurvey_OnTime: common.Bool, // #1228
      SavingPowerMode: common.UInt8, // #1240
      CurrentGain: common.UInt16, // #1261
      ShadowEliminationEn: common.Bool, // #1273
      InflectionPiont: common.UInt8, // #1285
      ShadowEliminationElectric: common.UInt8, // #1297
    }),
  ],
  'ChipICND2126ExtendPropertyBase'
);
/**
 * Codec for {@link ChipICND2126ExtendProperty}
 * @category Codecs
 * @see Automatically generated from ../decompiled/Nova.LCT.GigabitSystem.ChipICN2126.decompiled.cs:1209
 */
export const ChipICND2126ExtendProperty = t.intersection(
  [
    ChipICND2126ExtendPropertyBase,
    t.partial({ '@_xsi:type': t.literal('ChipICND2126ExtendProperty') }),
  ],
  'ChipICND2126ExtendProperty'
);
export interface ChipICND2126ExtendProperty extends t.TypeOf<typeof ChipICND2126ExtendProperty> {}
