import * as t from 'io-ts';
import * as common from '../lib/common';
import { ChipBaseExtendPropey } from './ChipBaseExtendPropey'; // import
import { ChipHX8932ExtendProperty } from './ChipHX8932ExtendProperty';
 // import
export const ChipHX8932RgbvExtendPropertyBase = t.intersection(
  [
    ChipBaseExtendPropey,
    t.type({
      REG_LENGTH: common.Int32_2,
    }),
    t.partial({
      FirstRegData: common.buffer_8, // #2885
      SecondRegData: common.buffer_8, // #2887
      FirstRegisterAddr: common.Int32, // #2891
      SecondRegisterAddr: common.Int32, // #2893
      FirstDataLen: common.Int32, // #2895
      FirstStartIndex: common.Int32, // #2897
      SecondDataLen: common.Int32, // #2899
      SecondStartIndex: common.Int32, // #2901
      RedProperty: ChipHX8932ExtendProperty, // #2903
      GreenProperty: ChipHX8932ExtendProperty, // #2906
      BlueProperty: ChipHX8932ExtendProperty, // #2909
      VRedProperty: ChipHX8932ExtendProperty, // #2912
      IsAdvancedMode: common.Bool, // #2919
      IsUseNewModule: common.Bool, // #2931
      SpecialDataLen: common.Int32, // #2933
      SpecialRegisterAddr: common.UInt32,
    }),
  ],
  'ChipHX8932RgbvExtendPropertyBase'
);
/**
 * Codec for {@link ChipHX8932RgbvExtendProperty}
 * @category Codecs
 * @see Automatically generated from ../decompiled/Nova.LCT.GigabitSystem.ChipHX8932.decompiled.cs:2876
 */
export const ChipHX8932RgbvExtendProperty = t.intersection(
  [
    ChipHX8932RgbvExtendPropertyBase,
    t.partial({ '@_xsi:type': t.literal('ChipHX8932RgbvExtendProperty') }),
  ],
  'ChipHX8932RgbvExtendProperty'
);
export interface ChipHX8932RgbvExtendProperty
  extends t.TypeOf<typeof ChipHX8932RgbvExtendProperty> {
  RedProperty?: ChipHX8932ExtendProperty;
  GreenProperty?: ChipHX8932ExtendProperty;
  BlueProperty?: ChipHX8932ExtendProperty;
  VRedProperty?: ChipHX8932ExtendProperty;
}
