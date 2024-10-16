import * as t from 'io-ts';
import * as common from '../lib/common';
import { ChipBaseExtendPropey } from './ChipBaseExtendPropey';
 // import
export const ChipMBI524ExtendPropertyBase = t.intersection(
  [
    ChipBaseExtendPropey,
    t.type({
      ColorCompensate: common.UInt8_3, // #57182
      LowAshImproveEnable: common.Bool_true,
    }),
    t.partial({
      SetBlanking: common.UInt8, // #57195
      IsAdvancedMode: common.Bool, // #57208
      RedRegValueConfigFirst: common.UInt16, // #57221
      GreenRegValueConfigFirst: common.UInt16, // #57234
      BlueRegValueConfigFirst: common.UInt16, // #57247
      VRedRegValueConfigFirst: common.UInt16,
    }),
  ],
  'ChipMBI524ExtendPropertyBase'
);
/**
 * Codec for {@link ChipMBI524ExtendProperty}
 * @category Codecs
 * @see Automatically generated from ../decompiled/Nova.LCT.GigabitSystem.DataClass.decompiled.cs:57151
 */
export const ChipMBI524ExtendProperty = t.intersection(
  [
    ChipMBI524ExtendPropertyBase,
    t.partial({ '@_xsi:type': t.literal('ChipMBI524ExtendProperty') }),
  ],
  'ChipMBI524ExtendProperty'
);
export interface ChipMBI524ExtendProperty extends t.TypeOf<typeof ChipMBI524ExtendProperty> {}
