import * as t from 'io-ts';
import * as common from '../lib/common';
import { ChipBaseExtendPropey } from './ChipBaseExtendPropey';
 // import
export const ChipMBI5759GRGBExtendPropertyBase = t.intersection(
  [
    ChipBaseExtendPropey,
    t.type({
      Global1_Register1: common.withDefault(common.UInt16, 57216), // #1011
      Global1_Register2: common.UInt16_3, // #1013
      Global1_Register3: common.UInt16_11267, // #1015
      Global2_Register1: common.UInt16_11, // #1017
      Global2_Register2: common.UInt16_4096, // #1019
      Global2_Register3: common.withDefault(common.UInt16, 12315), // #1021
      Global3_Register1: common.UInt16_0, // #1023
      Global3_Register2: common.withDefault(common.UInt16, 24649), // #1025
      Global3_Register3: common.withDefault(common.UInt16, 272), // #1027
      R1_Register1: common.UInt16_16384, // #1029
      R1_Register2: common.UInt16_64929, // #1031
      R1_Register3: common.UInt16_0, // #1033
      R2_Register1: common.UInt16_1023, // #1035
      R2_Register2: common.UInt16_2080, // #1037
      R2_Register3: common.UInt16_16387, // #1039
      G1_Register1: common.UInt16_16384, // #1041
      G1_Register2: common.UInt16_64929, // #1043
      G1_Register3: common.UInt16_0, // #1045
      G2_Register1: common.UInt16_1023, // #1047
      G2_Register2: common.UInt16_2080, // #1049
      G2_Register3: common.UInt16_16387, // #1051
      B1_Register1: common.UInt16_16384, // #1053
      B1_Register2: common.UInt16_64929, // #1055
      B1_Register3: common.UInt16_0, // #1057
      B2_Register1: common.UInt16_1023, // #1059
      B2_Register2: common.UInt16_2080, // #1061
      B2_Register3: common.UInt16_16387,
    }),
    t.partial({
      RLowGrayCompsentionOne: common.UInt8, // #1065
      GLowGrayCompsentionOne: common.UInt8, // #1077
      BLowGrayCompsentionOne: common.UInt8, // #1089
      RLowGrayCompsentionTwo: common.UInt8, // #1101
      GLowGrayCompsentionTwo: common.UInt8, // #1113
      BLowGrayCompsentionTwo: common.UInt8, // #1125
      RAdvancedLowGrayCompsention: common.UInt8, // #1137
      GAdvancedLowGrayCompsention: common.UInt8, // #1149
      BAdvancedLowGrayCompsention: common.UInt8, // #1161
      RedGain: common.UInt8, // #1173
      GreenGain: common.UInt8, // #1185
      BlueGain: common.UInt8,
    }),
  ],
  'ChipMBI5759GRGBExtendPropertyBase'
);
/**
 * Codec for {@link ChipMBI5759GRGBExtendProperty}
 * @category Codecs
 * @see Automatically generated from ../decompiled/Nova.LCT.GigabitSystem.ChipMBI5759.decompiled.cs:1008
 */
export const ChipMBI5759GRGBExtendProperty = t.intersection(
  [
    ChipMBI5759GRGBExtendPropertyBase,
    t.partial({ '@_xsi:type': t.literal('ChipMBI5759GRGBExtendProperty') }),
  ],
  'ChipMBI5759GRGBExtendProperty'
);
export interface ChipMBI5759GRGBExtendProperty
  extends t.TypeOf<typeof ChipMBI5759GRGBExtendProperty> {}
