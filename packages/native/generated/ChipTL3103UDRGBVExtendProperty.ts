import * as t from 'io-ts';
import * as common from '../lib/common';
import { ChipBaseExtendPropey } from './ChipBaseExtendPropey'; // import
import { ChipTL3103UDExtendProperty } from './ChipTL3103UDExtendProperty';
 // import
export const ChipTL3103UDRGBVExtendPropertyBase = t.intersection(
  [
    ChipBaseExtendPropey,
    t.type({
      REG_LENGTH: common.Int32_15,
    }),
    t.partial({
      RedProperty: ChipTL3103UDExtendProperty, // #1023
      GreenProperty: ChipTL3103UDExtendProperty, // #1025
      BlueProperty: ChipTL3103UDExtendProperty, // #1027
      VRedProperty: ChipTL3103UDExtendProperty, // #1029
      IsUseNewModule: common.Bool, // #1033
      ChipLibVersion: common.UInt8, // #1035
      PatrNumPerRef: common.UInt8, // #1052
      SpecialDataLen: common.Int32, // #1073
      SpecialRegisterAddr: common.UInt32, // #1075
      FirstDataLen: common.Int32, // #1077
      FirstStartIndex: common.Int32, // #1079
      FirstRegisterAddr: common.Int32, // #1081
      SecondDataLen: common.Int32, // #1083
      SecondStartIndex: common.Int32, // #1085
      SecondRegisterAddr: common.Int32, // #1087
      ThirdDataLen: common.Int32, // #1089
      ThirdDataStartIndex: common.Int32, // #1091
      ThirdRegisterAddr: common.Int32, // #1093
      FourthDataLen: common.Int32, // #1095
      FourthStartIndex: common.Int32, // #1097
      FourthRegisterAddr: common.Int32,
    }),
  ],
  'ChipTL3103UDRGBVExtendPropertyBase'
);
/**
 * Codec for {@link ChipTL3103UDRGBVExtendProperty}
 * @category Codecs
 * @see Automatically generated from ../decompiled/Nova.LCT.GigabitSystem.ChipTL3103UD.decompiled.cs:1016
 */
export const ChipTL3103UDRGBVExtendProperty = t.intersection(
  [
    ChipTL3103UDRGBVExtendPropertyBase,
    t.partial({ '@_xsi:type': t.literal('ChipTL3103UDRGBVExtendProperty') }),
  ],
  'ChipTL3103UDRGBVExtendProperty'
);
export interface ChipTL3103UDRGBVExtendProperty
  extends t.TypeOf<typeof ChipTL3103UDRGBVExtendProperty> {
  RedProperty?: ChipTL3103UDExtendProperty;
  GreenProperty?: ChipTL3103UDExtendProperty;
  BlueProperty?: ChipTL3103UDExtendProperty;
  VRedProperty?: ChipTL3103UDExtendProperty;
}
