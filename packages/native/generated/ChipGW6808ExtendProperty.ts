import * as t from 'io-ts';
import * as common from '../lib/common';
import { ChipBaseExtendPropey } from './ChipBaseExtendPropey';
 // import
export const ChipGW6808ExtendPropertyBase = t.intersection(
  [
    ChipBaseExtendPropey,
    t.type({
      ConfigValue7: common.withDefault(common.Int32, 67), // #61823
      ConfigValue8: common.Int32_3, // #61836
      ConfigValue9: common.Int32_1, // #61940
      ConfigValue17: common.Int32_10, // #61953
      ConfigValue18: common.Int32_13, // #61966
      ConfigValue19: common.withDefault(common.Int32, 18), // #61979
      ConfigValue20: common.Int32_25, // #61992
      ConfigValue21: common.Int32_32, // #62005
      ConfigValue22: common.withDefault(common.Int32, 72), // #62018
      ConfigValue23: common.Int32_137, // #62031
      ConfigValue24: common.Int32_137, // #62044
      ConfigValue25: common.Int32_137, // #62057
      ConfigValue26: common.Int32_137, // #62070
      ConfigValue27: common.Int32_137, // #62083
      ConfigValue28: common.Int32_137, // #62096
      ConfigValue29: common.Int32_140, // #62109
      ConfigValue30: common.Int32_140, // #62122
      ConfigValue31: common.Int32_140, // #62135
      ConfigValue32: common.withDefault(common.Int32, 156), // #62148
      RedResistanceValue: common.withDefault(common.Int32, 2200), // #62161
      GreenResistanceValue: common.Int32_3300, // #62174
      BlueResistanceValue: common.Int32_3300,
    }),
    t.partial({
      IsAdvancedMode: common.Bool, // #61721
      ConfigArray: common.Base64, // #61733
      ConfigValue1: common.Int32, // #61745
      ConfigValue2: common.Int32, // #61758
      ConfigValue3: common.Int32, // #61771
      ConfigValue4: common.Int32, // #61784
      ConfigValue5: common.Int32, // #61797
      ConfigValue6: common.Int32, // #61849
      ConfigValue10: common.Int32, // #61862
      ConfigValue11: common.Int32, // #61875
      ConfigValue12: common.Int32, // #61888
      ConfigValue13: common.Int32, // #61901
      ConfigValue14: common.Int32, // #61914
      ConfigValue15: common.Int32, // #61927
      ConfigValue16: common.Int32,
    }),
  ],
  'ChipGW6808ExtendPropertyBase'
);
/**
 * Codec for {@link ChipGW6808ExtendProperty}
 * @category Codecs
 * @see Automatically generated from ../decompiled/Nova.LCT.GigabitSystem.DataClass.decompiled.cs:61644
 */
export const ChipGW6808ExtendProperty = t.intersection(
  [
    ChipGW6808ExtendPropertyBase,
    t.partial({ '@_xsi:type': t.literal('ChipGW6808ExtendProperty') }),
  ],
  'ChipGW6808ExtendProperty'
);
export interface ChipGW6808ExtendProperty extends t.TypeOf<typeof ChipGW6808ExtendProperty> {}
