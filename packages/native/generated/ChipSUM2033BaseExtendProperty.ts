import * as t from 'io-ts';
import * as common from '../lib/common';
import { ChipBaseExtendPropey } from './ChipBaseExtendPropey';
 // import
export const ChipSUM2033BaseExtendPropertyBase = t.intersection(
  [
    ChipBaseExtendPropey,
    t.partial({
      CompensationLevel: common.UInt8, // #64090
      CompensationMode: common.UInt8, // #64103
      OpenCircuitProtection: common.Bool, // #64116
      CurrentWork: common.Bool, // #64129
      SystemRetainsSecond: common.Int32, // #64142
      ConstantSettings: common.UInt8, // #64155
      CurrentSynchronou: common.UInt8, // #64168
      OpenCircuitCheck: common.UInt8, // #64181
      VanishingMode: common.UInt8, // #64194
      GCLKFrequency: common.UInt8, // #64207
      SystemRetainsThird: common.Int32, // #64220
    }),
  ],
  'ChipSUM2033BaseExtendPropertyBase'
);
/**
 * Codec for {@link ChipSUM2033BaseExtendProperty}
 * @category Codecs
 * @see Automatically generated from ../decompiled/Nova.LCT.GigabitSystem.DataClass.decompiled.cs:64066
 */
export const ChipSUM2033BaseExtendProperty = t.intersection(
  [
    ChipSUM2033BaseExtendPropertyBase,
    t.partial({ '@_xsi:type': t.literal('ChipSUM2033BaseExtendProperty') }),
  ],
  'ChipSUM2033BaseExtendProperty'
);
export interface ChipSUM2033BaseExtendProperty
  extends t.TypeOf<typeof ChipSUM2033BaseExtendProperty> {}
