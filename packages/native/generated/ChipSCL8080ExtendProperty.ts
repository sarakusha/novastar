import * as t from 'io-ts';
import * as common from '../lib/common';
import { ChipBaseExtendPropey } from './ChipBaseExtendPropey';
 // import
export const ChipSCL8080ExtendPropertyBase = t.intersection(
  [
    ChipBaseExtendPropey,
    t.partial({
      RegValueConfigFirst: common.UInt16, // #302
      RegValueConfigSecond: common.UInt16, // #315
      RegValueConfigThird: common.UInt16, // #328
    }),
  ],
  'ChipSCL8080ExtendPropertyBase'
);
/**
 * Codec for {@link ChipSCL8080ExtendProperty}
 * @category Codecs
 * @see Automatically generated from ../decompiled/Nova.LCT.GigabitSystem.ChipSCL8080.decompiled.cs:293
 */
export const ChipSCL8080ExtendProperty = t.intersection(
  [
    ChipSCL8080ExtendPropertyBase,
    t.partial({ '@_xsi:type': t.literal('ChipSCL8080ExtendProperty') }),
  ],
  'ChipSCL8080ExtendProperty'
);
export interface ChipSCL8080ExtendProperty extends t.TypeOf<typeof ChipSCL8080ExtendProperty> {}
