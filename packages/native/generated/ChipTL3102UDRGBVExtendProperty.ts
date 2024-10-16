import * as t from 'io-ts';
import * as common from '../lib/common';
import { ChipBaseExtendPropey } from './ChipBaseExtendPropey'; // import
import { ChipTL3102UDExtendProperty } from './ChipTL3102UDExtendProperty';
 // import
export const ChipTL3102UDRGBVExtendPropertyBase = t.intersection(
  [
    ChipBaseExtendPropey,
    t.type({
      REG_LENGTH: common.Int32_7,
    }),
    t.partial({
      RedProperty: ChipTL3102UDExtendProperty, // #104
      GreenProperty: ChipTL3102UDExtendProperty, // #106
      BlueProperty: ChipTL3102UDExtendProperty, // #108
      VRedProperty: ChipTL3102UDExtendProperty, // #110
      IsUseNewModule: common.Bool, // #114
      ChipLibVersion: common.UInt8, // #116
      PatrNumPerRef: common.UInt8, // #135
      GrayDepth: common.UInt8, // #183
      FirstDataLen: common.Int32, // #204
      FirstStartIndex: common.Int32, // #206
      FirstRegisterAddr: common.Int32, // #208
      SpecialDataLen: common.Int32, // #210
      SpecialRegisterAddr: common.UInt32,
    }),
  ],
  'ChipTL3102UDRGBVExtendPropertyBase'
);
/**
 * Codec for {@link ChipTL3102UDRGBVExtendProperty}
 * @category Codecs
 * @see Automatically generated from ../decompiled/Nova.LCT.GigabitSystem.ChipTL3102UD.decompiled.cs:97
 */
export const ChipTL3102UDRGBVExtendProperty = t.intersection(
  [
    ChipTL3102UDRGBVExtendPropertyBase,
    t.partial({ '@_xsi:type': t.literal('ChipTL3102UDRGBVExtendProperty') }),
  ],
  'ChipTL3102UDRGBVExtendProperty'
);
export interface ChipTL3102UDRGBVExtendProperty
  extends t.TypeOf<typeof ChipTL3102UDRGBVExtendProperty> {
  RedProperty?: ChipTL3102UDExtendProperty;
  GreenProperty?: ChipTL3102UDExtendProperty;
  BlueProperty?: ChipTL3102UDExtendProperty;
  VRedProperty?: ChipTL3102UDExtendProperty;
}
