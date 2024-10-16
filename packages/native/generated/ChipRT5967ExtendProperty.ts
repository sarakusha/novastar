import * as t from 'io-ts';
import * as common from '../lib/common';
import { ChipBaseExtendPropey } from './ChipBaseExtendPropey';
 // import
export const ChipRT5967ExtendPropertyBase = t.intersection(
  [
    ChipBaseExtendPropey,
    t.type({
      REG_LENGTH: common.Int32_5, // #47
      RegisterArray: common.XMLArray(common.UInt16, 'ushort'),
    }),
    t.partial({
      BlankingGrade: common.UInt8, // #51
      BlankEnhance: common.Bool, // #63
      DarkBlockEn: common.Bool, // #75
      DarkBlockGrade: common.UInt8, // #87
      PreliminarySolutionGrade: common.UInt8, // #99
      LightBlockEn: common.Bool, // #111
      LightBlockGrade: common.UInt8, // #123
      DecouplingIntensity: common.UInt8, // #135
      CompensationMode: common.UInt8, // #158
      CompensationGrade: common.UInt8, // #179
      OptimizationGradient: common.Bool, // #191
      GrayCut: common.UInt8, // #203
      LowGrayHighRef: common.UInt8, // #215
      AutoEnergySave: common.Bool, // #236
      EnergySaveGrade: common.UInt8, // #248
      ScreenDarkEnergySave: common.Bool, // #260
      BestEnergySave: common.Bool, // #272
      OpenTestGrade: common.UInt8, // #284
      MoveingGrade: common.UInt8, // #296
      ShortTestGrade: common.UInt8, // #317
      BadPointMode: common.UInt8, // #329
      CurrentGain: common.UInt8,
    }),
  ],
  'ChipRT5967ExtendPropertyBase'
);
/**
 * Codec for {@link ChipRT5967ExtendProperty}
 * @category Codecs
 * @see Automatically generated from ../decompiled/Nova.LCT.GigabitSystem.ChipRT5967.decompiled.cs:44
 */
export const ChipRT5967ExtendProperty = t.intersection(
  [
    ChipRT5967ExtendPropertyBase,
    t.partial({ '@_xsi:type': t.literal('ChipRT5967ExtendProperty') }),
  ],
  'ChipRT5967ExtendProperty'
);
export interface ChipRT5967ExtendProperty extends t.TypeOf<typeof ChipRT5967ExtendProperty> {}
