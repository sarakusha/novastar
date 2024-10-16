import * as t from 'io-ts';
import * as common from '../lib/common';
import { ChipBaseExtendPropey } from './ChipBaseExtendPropey'; // import
import { ChipSM16388ExtendProperty } from './ChipSM16388ExtendProperty';
 // import
export const ChipSM16388RGBVExtendPropertyBase = t.intersection(
  [
    ChipBaseExtendPropey,
    t.type({
      IsAdvancedMode: common.Bool_true, // #3595
      CurrentGainGrade: common.UInt8_2,
    }),
    t.partial({
      RedExtendProperty: ChipSM16388ExtendProperty, // #3550
      GreenExtendProperty: ChipSM16388ExtendProperty, // #3552
      BlueExtendProperty: ChipSM16388ExtendProperty, // #3554
      VRedExtendProperty: ChipSM16388ExtendProperty, // #3556
      IsUseNewModule: common.Bool, // #3564
      SubFields: common.UInt8, // #3567
      ScanCount: common.UInt8, // #3581
      FailureEliminationEn: common.Bool, // #3609
      FrequencyDoublingEn: common.Bool, // #3612
      SpecialDataLen: common.Int32, // #3626
      SpecialRegisterAddr: common.UInt32,
    }),
  ],
  'ChipSM16388RGBVExtendPropertyBase'
);
/**
 * Codec for {@link ChipSM16388RGBVExtendProperty}
 * @category Codecs
 * @see Automatically generated from ../decompiled/Nova.LCT.GigabitSystem.ChipSM16388.decompiled.cs:3545
 */
export const ChipSM16388RGBVExtendProperty = t.intersection(
  [
    ChipSM16388RGBVExtendPropertyBase,
    t.partial({ '@_xsi:type': t.literal('ChipSM16388RGBVExtendProperty') }),
  ],
  'ChipSM16388RGBVExtendProperty'
);
export interface ChipSM16388RGBVExtendProperty
  extends t.TypeOf<typeof ChipSM16388RGBVExtendProperty> {
  RedExtendProperty?: ChipSM16388ExtendProperty;
  GreenExtendProperty?: ChipSM16388ExtendProperty;
  BlueExtendProperty?: ChipSM16388ExtendProperty;
  VRedExtendProperty?: ChipSM16388ExtendProperty;
}
