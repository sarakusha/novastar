import * as t from 'io-ts';
import * as common from '../lib/common';
import { ChipBaseExtendPropey } from './ChipBaseExtendPropey';
 // import
export const ChipSM16389ExtendPropertyBase = t.intersection(
  [
    ChipBaseExtendPropey,
    t.type({
      REG_LENGTH: common.Int32_34, // #996
      RegisterArray: common.XMLArray(common.UInt16, 'ushort'),
    }),
    t.partial({
      EnergyPattern: common.UInt8, // #1000
      LowGrayHomogeneity: common.UInt8, // #1012
      CouplingOptimize2: common.Int32, // #1024
      BlankingTime1: common.UInt8, // #1037
      FirstLineCompensation: common.UInt8, // #1049
      LowGrayOptimize2: common.UInt8, // #1061
      OpenTest: common.Bool, // #1073
      EliminateOpenCrossGrade: common.UInt8, // #1085
      CouplingEnhancePattern: common.Bool, // #1097
      LowGrayOptimize1: common.UInt8, // #1109
      LowGrayAcrossStripeOptimize: common.UInt8, // #1121
      CouplingGrade: common.UInt8, // #1133
      Gain: common.Int32, // #1145
      BlankingGrade1: common.UInt8, // #1157
      FirstLineDarkCompensationGrade: common.UInt8, // #1169
      BlankingOpen2: common.Bool, // #1181
      BlankingGrade2: common.UInt8, // #1193
      BlankingOpen3: common.Bool, // #1205
      BlankingGrade3: common.UInt8, // #1217
      CouplingOptimize1: common.UInt8,
    }),
  ],
  'ChipSM16389ExtendPropertyBase'
);
/**
 * Codec for {@link ChipSM16389ExtendProperty}
 * @category Codecs
 * @see Automatically generated from ../decompiled/Nova.LCT.GigabitSystem.ChipSM16389.decompiled.cs:993
 */
export const ChipSM16389ExtendProperty = t.intersection(
  [
    ChipSM16389ExtendPropertyBase,
    t.partial({ '@_xsi:type': t.literal('ChipSM16389ExtendProperty') }),
  ],
  'ChipSM16389ExtendProperty'
);
export interface ChipSM16389ExtendProperty extends t.TypeOf<typeof ChipSM16389ExtendProperty> {}
