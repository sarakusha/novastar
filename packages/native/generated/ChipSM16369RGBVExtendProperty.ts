import * as t from 'io-ts';
import * as common from '../lib/common';
import { ChipBaseExtendPropey } from './ChipBaseExtendPropey'; // import
import { ChipSM16369ExtendProperty } from './ChipSM16369ExtendProperty';
 // import
export const ChipSM16369RGBVExtendPropertyBase = t.intersection(
  [
    ChipBaseExtendPropey,
    t.type({
      IsAdvancedMode: common.Bool_true, // #1262
      CurrentGainGrade: common.UInt8_2,
    }),
    t.partial({
      RedExtendProperty: ChipSM16369ExtendProperty, // #1204
      GreenExtendProperty: ChipSM16369ExtendProperty, // #1206
      BlueExtendProperty: ChipSM16369ExtendProperty, // #1208
      VRedExtendProperty: ChipSM16369ExtendProperty, // #1210
      IsUseNewModule: common.Bool, // #1222
      ScanCount: common.UInt8, // #1234
      MutiRate: common.UInt8, // #1248
      FailureEliminationEn: common.Bool, // #1276
      SpecialDataLen: common.Int32, // #1288
      SpecialRegisterAddr: common.UInt32,
    }),
  ],
  'ChipSM16369RGBVExtendPropertyBase'
);
/**
 * Codec for {@link ChipSM16369RGBVExtendProperty}
 * @category Codecs
 * @see Automatically generated from ../decompiled/Nova.LCT.GigabitSystem.ChipSM16369.decompiled.cs:1199
 */
export const ChipSM16369RGBVExtendProperty = t.intersection(
  [
    ChipSM16369RGBVExtendPropertyBase,
    t.partial({ '@_xsi:type': t.literal('ChipSM16369RGBVExtendProperty') }),
  ],
  'ChipSM16369RGBVExtendProperty'
);
export interface ChipSM16369RGBVExtendProperty
  extends t.TypeOf<typeof ChipSM16369RGBVExtendProperty> {
  RedExtendProperty?: ChipSM16369ExtendProperty;
  GreenExtendProperty?: ChipSM16369ExtendProperty;
  BlueExtendProperty?: ChipSM16369ExtendProperty;
  VRedExtendProperty?: ChipSM16369ExtendProperty;
}
