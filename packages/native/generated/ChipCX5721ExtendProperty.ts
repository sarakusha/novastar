import * as t from 'io-ts';
import * as common from '../lib/common';
import { ChipBaseExtendPropey } from './ChipBaseExtendPropey';
 // import
export const ChipCX5721ExtendPropertyBase = t.intersection(
  [
    ChipBaseExtendPropey,
    t.type({
      REG_LENGTH: common.Int32_5, // #44
      RegisterArray: common.XMLArray(common.UInt16, 'ushort'),
    }),
    t.partial({
      BrightBlockCouplingLevel: common.UInt8, // #49
      BrightBlockCouplingEn: common.Bool, // #61
      CompensationMode: common.UInt8, // #73
      CompensationLevel: common.UInt8, // #85
      ShadowEliminationLevel: common.UInt8, // #97
      ExtinctionEnhancementEn: common.Bool, // #109
      DarkBlockCouplingLevel: common.UInt8, // #121
      DarkBlockCouplingEn: common.Bool, // #133
      BestEnergySaving: common.Bool, // #145
      BlackScreenEnergySaving: common.Bool, // #157
      DynamicEnergySaving: common.Bool, // #169
      LevelOfPreDecoupling: common.UInt8, // #181
      CurrentGain: common.UInt8, // #193
      IntensityOfDecoupling: common.UInt8, // #205
      LowAshHighBrushLevel: common.UInt8,
    }),
  ],
  'ChipCX5721ExtendPropertyBase'
);
/**
 * Codec for {@link ChipCX5721ExtendProperty}
 * @category Codecs
 * @see Automatically generated from ../decompiled/Nova.LCT.GigabitSystem.ChipCX5721.decompiled.cs:41
 */
export const ChipCX5721ExtendProperty = t.intersection(
  [
    ChipCX5721ExtendPropertyBase,
    t.partial({ '@_xsi:type': t.literal('ChipCX5721ExtendProperty') }),
  ],
  'ChipCX5721ExtendProperty'
);
export interface ChipCX5721ExtendProperty extends t.TypeOf<typeof ChipCX5721ExtendProperty> {}
