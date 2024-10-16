import * as t from 'io-ts';
import * as common from '../lib/common';
import { ChipBaseExtendPropey } from './ChipBaseExtendPropey';
 // import
export const ChipSM16359ExtendPropertyBase = t.intersection(
  [
    ChipBaseExtendPropey,
    t.type({
      IsShadowsEnable: common.Bool_true, // #66151
      RegValueConfigFirst: common.UInt16_65337, // #66203
      BlankingMode: common.UInt8_2, // #66216
      RegValueConfigSecond: common.UInt16_11, // #66268
      RegValueConfigThird: common.UInt16_3072,
    }),
    t.partial({
      LowAshCompensationTwo: common.UInt8, // #66164
      LowAshCompensationOne: common.UInt8, // #66177
      IsOpenTest: common.Bool, // #66190
      OpenTestVoltageGrade: common.UInt8, // #66229
      IsEnergySaving: common.Bool, // #66242
      ShadowVoltageOne: common.UInt8, // #66255
      ShadowVoltageTwo: common.UInt8, // #66281
      RegValueConfigForth: common.UInt16, // #66294
      IsAdvancedMode: common.Bool, // #66307
      PWMModle: common.UInt8,
    }),
  ],
  'ChipSM16359ExtendPropertyBase'
);
/**
 * Codec for {@link ChipSM16359ExtendProperty}
 * @category Codecs
 * @see Automatically generated from ../decompiled/Nova.LCT.GigabitSystem.DataClass.decompiled.cs:66106
 */
export const ChipSM16359ExtendProperty = t.intersection(
  [
    ChipSM16359ExtendPropertyBase,
    t.partial({ '@_xsi:type': t.literal('ChipSM16359ExtendProperty') }),
  ],
  'ChipSM16359ExtendProperty'
);
export interface ChipSM16359ExtendProperty extends t.TypeOf<typeof ChipSM16359ExtendProperty> {}
