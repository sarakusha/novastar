import * as t from 'io-ts';
import * as common from '../lib/common';
import { ChipBaseExtendPropey } from './ChipBaseExtendPropey'; // import
import { ChipDP5125HExtendProperty } from './ChipDP5125HExtendProperty';
 // import
export const ChipDP5125HRGBVExtendPropertyBase = t.intersection(
  [
    ChipBaseExtendPropey,
    t.type({
      REG_LENGTH: common.Int32_1,
    }),
    t.partial({
      RedProperty: ChipDP5125HExtendProperty, // #101
      GreenProperty: ChipDP5125HExtendProperty, // #103
      BlueProperty: ChipDP5125HExtendProperty, // #105
      VRedProperty: ChipDP5125HExtendProperty, // #109
      IsUseNewModule: common.Bool, // #115
      ChipLibVersion: common.UInt8, // #117
      IsAdvancedMode: common.Bool, // #119
      IsDoubleChip: common.Bool, // #135
      SpecialDataLen: common.Int32, // #147
      SpecialRegisterAddr: common.UInt32,
    }),
  ],
  'ChipDP5125HRGBVExtendPropertyBase'
);
/**
 * Codec for {@link ChipDP5125HRGBVExtendProperty}
 * @category Codecs
 * @see Automatically generated from ../decompiled/Nova.LCT.GigabitSystem.ChipDP5125H.decompiled.cs:96
 */
export const ChipDP5125HRGBVExtendProperty = t.intersection(
  [
    ChipDP5125HRGBVExtendPropertyBase,
    t.partial({ '@_xsi:type': t.literal('ChipDP5125HRGBVExtendProperty') }),
  ],
  'ChipDP5125HRGBVExtendProperty'
);
export interface ChipDP5125HRGBVExtendProperty
  extends t.TypeOf<typeof ChipDP5125HRGBVExtendProperty> {
  RedProperty?: ChipDP5125HExtendProperty;
  GreenProperty?: ChipDP5125HExtendProperty;
  BlueProperty?: ChipDP5125HExtendProperty;
  VRedProperty?: ChipDP5125HExtendProperty;
}
