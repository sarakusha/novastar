import * as t from 'io-ts';
import * as common from '../lib/common';
import { ChipBaseExtendPropey } from './ChipBaseExtendPropey';
 // import
export const CustomRegExtendPropertyBaseBase = t.intersection(
  [
    ChipBaseExtendPropey,
    t.type({
      RegValueConfigThird: common.UInt16_30976,
    }),
    t.partial({
      IsAdvancedMode: common.Bool, // #63986
      RegValueConfigFirst: common.UInt16, // #63999
      RegValueConfigSecond: common.UInt16,
    }),
  ],
  'CustomRegExtendPropertyBaseBase'
);
/**
 * Codec for {@link CustomRegExtendPropertyBase}
 * @category Codecs
 * @see Automatically generated from ../decompiled/Nova.LCT.GigabitSystem.DataClass.decompiled.cs:63976
 */
export const CustomRegExtendPropertyBase = t.intersection(
  [
    CustomRegExtendPropertyBaseBase,
    t.partial({ '@_xsi:type': t.literal('CustomRegExtendPropertyBase') }),
  ],
  'CustomRegExtendPropertyBase'
);
export interface CustomRegExtendPropertyBase extends t.TypeOf<typeof CustomRegExtendPropertyBase> {}
