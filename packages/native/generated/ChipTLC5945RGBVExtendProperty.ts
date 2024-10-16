import * as t from 'io-ts';
import * as common from '../lib/common';
import { ChipBaseExtendPropey } from './ChipBaseExtendPropey';
 // import
export const ChipTLC5945RGBVExtendPropertyBase = t.intersection(
  [
    ChipBaseExtendPropey,
    t.partial({
      IsUseNewModule: common.Bool, // #955
      ChipLibVersion: common.UInt8, // #957
    }),
  ],
  'ChipTLC5945RGBVExtendPropertyBase'
);
/**
 * Codec for {@link ChipTLC5945RGBVExtendProperty}
 * @category Codecs
 * @see Automatically generated from ../decompiled/Nova.LCT.GigabitSystem.ChipTLC5945.decompiled.cs:952
 */
export const ChipTLC5945RGBVExtendProperty = t.intersection(
  [
    ChipTLC5945RGBVExtendPropertyBase,
    t.partial({ '@_xsi:type': t.literal('ChipTLC5945RGBVExtendProperty') }),
  ],
  'ChipTLC5945RGBVExtendProperty'
);
export interface ChipTLC5945RGBVExtendProperty
  extends t.TypeOf<typeof ChipTLC5945RGBVExtendProperty> {}
