import * as t from 'io-ts';
import * as common from '../lib/common';
import { ChipBaseExtendPropey } from './ChipBaseExtendPropey';
 // import
export const ChipHS3257ExtendPropertyBase = t.intersection(
  [
    ChipBaseExtendPropey,
    t.partial({
      RegFirst: common.UInt16, // #796
      RegSecond: common.UInt16, // #798
      RegThird: common.UInt16, // #800
      RegFourth: common.UInt16, // #802
      IsUseNewModule: common.Bool, // #947
      ChipLibVersion: common.UInt8, // #949
    }),
  ],
  'ChipHS3257ExtendPropertyBase'
);
/**
 * Codec for {@link ChipHS3257ExtendProperty}
 * @category Codecs
 * @see Automatically generated from ../decompiled/Nova.LCT.GigabitSystem.ChipHS3257.decompiled.cs:793
 */
export const ChipHS3257ExtendProperty = t.intersection(
  [
    ChipHS3257ExtendPropertyBase,
    t.partial({ '@_xsi:type': t.literal('ChipHS3257ExtendProperty') }),
  ],
  'ChipHS3257ExtendProperty'
);
export interface ChipHS3257ExtendProperty extends t.TypeOf<typeof ChipHS3257ExtendProperty> {}
