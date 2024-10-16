import * as t from 'io-ts';
import * as common from '../lib/common';
import { ChipBaseExtendPropey } from './ChipBaseExtendPropey'; // import
import { ChipRT5938SSExtendProperty } from './ChipRT5938SSExtendProperty';
 // import
export const ChipRT5938SSRGBVExtendPropertyBase = t.intersection(
  [
    ChipBaseExtendPropey,
    t.type({
      REG_LENGTH: common.Int32_1,
    }),
    t.partial({
      RedProperty: ChipRT5938SSExtendProperty, // #4822
      GreenProperty: ChipRT5938SSExtendProperty, // #4824
      BlueProperty: ChipRT5938SSExtendProperty, // #4826
      VRedProperty: ChipRT5938SSExtendProperty, // #4828
      IsUseNewModule: common.Bool, // #4834
      IsAdvancedMode: common.Bool, // #4836
      SpecialDataLen: common.Int32, // #4848
      SpecialRegisterAddr: common.UInt32,
    }),
  ],
  'ChipRT5938SSRGBVExtendPropertyBase'
);
/**
 * Codec for {@link ChipRT5938SSRGBVExtendProperty}
 * @category Codecs
 * @see Automatically generated from ../decompiled/Nova.LCT.GigabitSystem.ChipRT5938SS.decompiled.cs:4817
 */
export const ChipRT5938SSRGBVExtendProperty = t.intersection(
  [
    ChipRT5938SSRGBVExtendPropertyBase,
    t.partial({ '@_xsi:type': t.literal('ChipRT5938SSRGBVExtendProperty') }),
  ],
  'ChipRT5938SSRGBVExtendProperty'
);
export interface ChipRT5938SSRGBVExtendProperty
  extends t.TypeOf<typeof ChipRT5938SSRGBVExtendProperty> {
  RedProperty?: ChipRT5938SSExtendProperty;
  GreenProperty?: ChipRT5938SSExtendProperty;
  BlueProperty?: ChipRT5938SSExtendProperty;
  VRedProperty?: ChipRT5938SSExtendProperty;
}
