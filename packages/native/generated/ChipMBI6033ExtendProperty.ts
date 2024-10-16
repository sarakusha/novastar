import * as t from 'io-ts';
import * as common from '../lib/common';
import { ChipBaseExtendPropey } from './ChipBaseExtendPropey';
 // import
export const ChipMBI6033ExtendPropertyBase = t.intersection(
  [
    ChipBaseExtendPropey,
    t.partial({
      FirstReg: common.UInt16, // #42
      SecondReg: common.UInt16, // #44
      ThirdReg: common.UInt16, // #46
      IsUseNewModule: common.Bool, // #48
      ChipLibVersion: common.UInt8, // #50
    }),
  ],
  'ChipMBI6033ExtendPropertyBase'
);
/**
 * Codec for {@link ChipMBI6033ExtendProperty}
 * @category Codecs
 * @see Automatically generated from ../decompiled/Nova.LCT.GigabitSystem.ChipMBI6033.decompiled.cs:40
 */
export const ChipMBI6033ExtendProperty = t.intersection(
  [
    ChipMBI6033ExtendPropertyBase,
    t.partial({ '@_xsi:type': t.literal('ChipMBI6033ExtendProperty') }),
  ],
  'ChipMBI6033ExtendProperty'
);
export interface ChipMBI6033ExtendProperty extends t.TypeOf<typeof ChipMBI6033ExtendProperty> {}
