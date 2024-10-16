import * as t from 'io-ts';
import * as common from '../lib/common';
import { ChipBaseExtendPropey } from './ChipBaseExtendPropey'; // import
import { ChipRT5938SS_ComExtendProperty } from './ChipRT5938SS_ComExtendProperty'; // import
import { PointDetectParameter } from './PointDetectParameter';
 // import
export const ChipRT5938SS_ComRGBVExtendPropertyBase = t.intersection(
  [
    ChipBaseExtendPropey,
    t.type({
      REG_LENGTH: common.Int32_1,
    }),
    t.partial({
      RedProperty: ChipRT5938SS_ComExtendProperty, // #2258
      GreenProperty: ChipRT5938SS_ComExtendProperty, // #2260
      BlueProperty: ChipRT5938SS_ComExtendProperty, // #2262
      VRedProperty: ChipRT5938SS_ComExtendProperty, // #2264
      IsUseNewModule: common.Bool, // #2272
      IsAdvancedMode: common.Bool, // #2274
      FirstDataLen: common.Int32, // #2290
      FirstStartIndex: common.Int32, // #2292
      FirstRegisterAddr: common.Int32, // #2294
      PointDetectParameter,
    }),
  ],
  'ChipRT5938SS_ComRGBVExtendPropertyBase'
);
/**
 * Codec for {@link ChipRT5938SS_ComRGBVExtendProperty}
 * @category Codecs
 * @see Automatically generated from ../decompiled/Nova.LCT.GigabitSystem.ChipRT5938SS_Common.decompiled.cs:2253
 */
export const ChipRT5938SS_ComRGBVExtendProperty = t.intersection(
  [
    ChipRT5938SS_ComRGBVExtendPropertyBase,
    t.partial({ '@_xsi:type': t.literal('ChipRT5938SS_ComRGBVExtendProperty') }),
  ],
  'ChipRT5938SS_ComRGBVExtendProperty'
);
export interface ChipRT5938SS_ComRGBVExtendProperty
  extends t.TypeOf<typeof ChipRT5938SS_ComRGBVExtendProperty> {
  RedProperty?: ChipRT5938SS_ComExtendProperty;
  GreenProperty?: ChipRT5938SS_ComExtendProperty;
  BlueProperty?: ChipRT5938SS_ComExtendProperty;
  VRedProperty?: ChipRT5938SS_ComExtendProperty;
  PointDetectParameter?: PointDetectParameter;
}
