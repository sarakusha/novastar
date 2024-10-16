import * as t from 'io-ts';
import * as common from '../lib/common';
import { ChipBaseExtendPropey } from './ChipBaseExtendPropey';
 // import
export const ChipSM16389SFExtendPropertyBase = t.intersection(
  [
    ChipBaseExtendPropey,
    t.type({
      REG_LENGTH: common.Int32_34, // #47
      RegisterArray: common.XMLArray(common.UInt16, 'ushort'),
    }),
    t.partial({
      FirstRegValue: common.UInt16, // #51
      CouplingOptimizeEn3: common.Bool, // #53
      CouplingOptimizeLevel3: common.UInt8, // #65
      CouplingOptimizeEn4: common.Bool, // #77
      AwaitMode: common.Bool, // #89
      AutoEnergyPattern: common.Bool, // #101
      LowGrayHomogeneity: common.UInt8, // #113
      CouplingOptimize2: common.Int32, // #125
      BlankingTime1: common.UInt8, // #138
      FirstLineCompensation: common.UInt8, // #150
      FramesSynchronizationMode: common.Bool, // #162
      LowGrayOptimize2: common.UInt8, // #174
      OpenTest: common.Bool, // #186
      EliminateOpenCrossGrade: common.UInt8, // #198
      CouplingEnhancePattern: common.Bool, // #210
      LowGrayOptimize1: common.UInt8, // #222
      LowGrayAcrossStripeOptimize: common.UInt8, // #234
      CouplingGrade: common.UInt8, // #246
      Gain: common.Int32, // #258
      BlankingGrade1: common.UInt8, // #270
      FirstLineDarkCompensationGrade: common.UInt8, // #282
      BlankingOpen2: common.Bool, // #294
      BlankingGrade2: common.UInt8, // #306
      BlankingTime2: common.UInt8, // #318
      CouplingOptimize1: common.UInt8,
    }),
  ],
  'ChipSM16389SFExtendPropertyBase'
);
/**
 * Codec for {@link ChipSM16389SFExtendProperty}
 * @category Codecs
 * @see Automatically generated from ../decompiled/Nova.LCT.GigabitSystem.ChipSM16389SF.decompiled.cs:44
 */
export const ChipSM16389SFExtendProperty = t.intersection(
  [
    ChipSM16389SFExtendPropertyBase,
    t.partial({ '@_xsi:type': t.literal('ChipSM16389SFExtendProperty') }),
  ],
  'ChipSM16389SFExtendProperty'
);
export interface ChipSM16389SFExtendProperty extends t.TypeOf<typeof ChipSM16389SFExtendProperty> {}
