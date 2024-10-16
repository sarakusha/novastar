import * as t from 'io-ts';
import * as common from '../lib/common';
import { ChipBaseExtendPropey } from './ChipBaseExtendPropey'; // import
import { ChipDP5125HCommonExtendProperty } from './ChipDP5125HCommonExtendProperty';
 // import
export const ChipDP5125HCommonRGBVExtendPropertyBase = t.intersection(
  [
    ChipBaseExtendPropey,
    t.type({
      REG_LENGTH: common.Int32_1,
    }),
    t.partial({
      RedProperty: ChipDP5125HCommonExtendProperty, // #99
      GreenProperty: ChipDP5125HCommonExtendProperty, // #101
      BlueProperty: ChipDP5125HCommonExtendProperty, // #103
      VRedProperty: ChipDP5125HCommonExtendProperty, // #107
      IsUseNewModule: common.Bool, // #113
      ChipLibVersion: common.UInt8, // #115
      IsAdvancedMode: common.Bool, // #117
      DclkIsSingleOrDouble: common.Bool, // #133
      SpecialDataLen: common.Int32, // #135
      SpecialRegisterAddr: common.UInt32,
    }),
  ],
  'ChipDP5125HCommonRGBVExtendPropertyBase'
);
/**
 * Codec for {@link ChipDP5125HCommonRGBVExtendProperty}
 * @category Codecs
 * @see Automatically generated from ../decompiled/Nova.LCT.GigabitSystem.ChipDP5125HCommon.decompiled.cs:94
 */
export const ChipDP5125HCommonRGBVExtendProperty = t.intersection(
  [
    ChipDP5125HCommonRGBVExtendPropertyBase,
    t.partial({ '@_xsi:type': t.literal('ChipDP5125HCommonRGBVExtendProperty') }),
  ],
  'ChipDP5125HCommonRGBVExtendProperty'
);
export interface ChipDP5125HCommonRGBVExtendProperty
  extends t.TypeOf<typeof ChipDP5125HCommonRGBVExtendProperty> {
  RedProperty?: ChipDP5125HCommonExtendProperty;
  GreenProperty?: ChipDP5125HCommonExtendProperty;
  BlueProperty?: ChipDP5125HCommonExtendProperty;
  VRedProperty?: ChipDP5125HCommonExtendProperty;
}
