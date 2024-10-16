import * as t from 'io-ts';
import * as common from '../lib/common';
import { ChipBaseExtendPropey } from './ChipBaseExtendPropey';
 // import
export const ChipSCL8081ExtendPropertyBase = t.intersection(
  [
    ChipBaseExtendPropey,
    t.type({
      RegArray: common.XMLArray(common.UInt32, 'uint'),
    }),
    t.partial({
      IsUseNewModule: common.Bool, // #857
      ChipLibVersion: common.UInt8, // #859
      Gain: common.Int32,
    }),
  ],
  'ChipSCL8081ExtendPropertyBase'
);
/**
 * Codec for {@link ChipSCL8081ExtendProperty}
 * @category Codecs
 * @see Automatically generated from ../decompiled/Nova.LCT.GigabitSystem.ChipSCL8081.decompiled.cs:851
 */
export const ChipSCL8081ExtendProperty = t.intersection(
  [
    ChipSCL8081ExtendPropertyBase,
    t.partial({ '@_xsi:type': t.literal('ChipSCL8081ExtendProperty') }),
  ],
  'ChipSCL8081ExtendProperty'
);
export interface ChipSCL8081ExtendProperty extends t.TypeOf<typeof ChipSCL8081ExtendProperty> {}
