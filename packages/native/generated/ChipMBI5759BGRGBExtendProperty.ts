import * as t from 'io-ts';
import * as common from '../lib/common';
import { ChipBaseExtendPropey } from './ChipBaseExtendPropey';
 // import
export const ChipMBI5759BGRGBExtendPropertyBase = t.intersection(
  [
    ChipBaseExtendPropey,
    t.type({
      Global1_Register1: common.UInt16_16384, // #48
      Global1_Register2: common.UInt16_3, // #50
      Global1_Register3: common.UInt16_11267, // #52
      Global2_Register1: common.withDefault(common.UInt16, 27), // #54
      Global2_Register2: common.UInt16_4096, // #56
      Global2_Register3: common.withDefault(common.UInt16, 32648), // #58
      Global3_Register1: common.UInt16_0, // #60
      Global3_Register2: common.withDefault(common.UInt16, 25673), // #62
      Global3_Register3: common.withDefault(common.UInt16, 16), // #64
      R1_Register1: common.UInt16_16384, // #66
      R1_Register2: common.UInt16_0, // #68
      R1_Register3: common.UInt16_0, // #70
      R2_Register1: common.UInt16_1023, // #72
      R2_Register2: common.UInt16_3072, // #74
      R2_Register3: common.UInt16_16899, // #76
      G1_Register1: common.UInt16_16384, // #78
      G1_Register2: common.UInt16_0, // #80
      G1_Register3: common.UInt16_0, // #82
      G2_Register1: common.UInt16_1023, // #84
      G2_Register2: common.UInt16_3072, // #86
      G2_Register3: common.UInt16_16899, // #88
      B1_Register1: common.UInt16_16384, // #90
      B1_Register2: common.UInt16_0, // #92
      B1_Register3: common.UInt16_0, // #94
      B2_Register1: common.UInt16_1023, // #96
      B2_Register2: common.UInt16_3072, // #98
      B2_Register3: common.UInt16_16899, // #104
      IsOpenDLLMode: common.Bool_false,
    }),
    t.partial({
      DLLMode: common.UInt8, // #126
      N: common.UInt8, // #138
      BadPiont: common.Bool, // #155
      BlankingTime: common.Int32, // #167
      LineTime: common.Int32, // #184
      GradientTime: common.Int32, // #196
      RLowGrayCompsentionOne: common.UInt8, // #208
      GLowGrayCompsentionOne: common.UInt8, // #220
      BLowGrayCompsentionOne: common.UInt8, // #232
      RLowGrayCompsentionTwo: common.UInt8, // #244
      GLowGrayCompsentionTwo: common.UInt8, // #256
      BLowGrayCompsentionTwo: common.UInt8, // #268
      RAdvancedLowGrayCompsention: common.UInt8, // #280
      GAdvancedLowGrayCompsention: common.UInt8, // #292
      BAdvancedLowGrayCompsention: common.UInt8, // #304
      RedGain: common.UInt8, // #316
      GreenGain: common.UInt8, // #328
      BlueGain: common.UInt8,
    }),
  ],
  'ChipMBI5759BGRGBExtendPropertyBase'
);
/**
 * Codec for {@link ChipMBI5759BGRGBExtendProperty}
 * @category Codecs
 * @see Automatically generated from ../decompiled/Nova.LCT.GigabitSystem.ChipMBI5759B.decompiled.cs:45
 */
export const ChipMBI5759BGRGBExtendProperty = t.intersection(
  [
    ChipMBI5759BGRGBExtendPropertyBase,
    t.partial({ '@_xsi:type': t.literal('ChipMBI5759BGRGBExtendProperty') }),
  ],
  'ChipMBI5759BGRGBExtendProperty'
);
export interface ChipMBI5759BGRGBExtendProperty
  extends t.TypeOf<typeof ChipMBI5759BGRGBExtendProperty> {}
