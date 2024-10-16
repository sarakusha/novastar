import * as t from 'io-ts';
import * as common from '../lib/common';
import { ChipBaseExtendPropey } from './ChipBaseExtendPropey'; // import
import { ChipICND1065LExtendProperty } from './ChipICND1065LExtendProperty'; // import
import { ScanType, ScanTypeEnum } from './ScanType';
 // import
export const ChipICND1065LRGBVExtendPropertyBase = t.intersection(
  [
    ChipBaseExtendPropey,
    t.type({
      REG_LENGTH: common.Int32_48,
    }),
    t.partial({
      RedProperty: ChipICND1065LExtendProperty, // #681
      GreenProperty: ChipICND1065LExtendProperty, // #684
      BlueProperty: ChipICND1065LExtendProperty, // #687
      VRedProperty: ChipICND1065LExtendProperty, // #690
      RefNumPerVs: common.UInt16, // #693
      SubField: common.UInt8, // #707
      InsertFrameMode: common.Bool, // #721
      ManualSettings: common.Bool, // #735
      LowGrayHighRefMode: common.Bool, // #747
      CustomSubField: common.UInt8, // #761
      ScanType, // #773
      GclkPLL: common.UInt8, // #797
      GclkFreqP: common.UInt8, // #813
      GclkFreqM: common.UInt8, // #829
      IsAdvancedMode: common.Bool, // #845
      SpecialDataLen: common.Int32, // #857
      SpecialRegisterAddr: common.UInt32, // #859
      BadPixivRedGain: common.Int32, // #861
      BadPixivGreenGain: common.Int32, // #873
      BadPointEn_1: common.Int32, // #885
      BadPixivBlueGain: common.Int32, // #897
      IsUseNewModule: common.Bool, // #980
      ChipLibVersion: common.UInt8,
    }),
  ],
  'ChipICND1065LRGBVExtendPropertyBase'
);
/**
 * Codec for {@link ChipICND1065LRGBVExtendProperty}
 * @category Codecs
 * @see Automatically generated from ../decompiled/Nova.LCT.GigabitSystem.ChipICND1065L.decompiled.cs:674
 */
export const ChipICND1065LRGBVExtendProperty = t.intersection(
  [
    ChipICND1065LRGBVExtendPropertyBase,
    t.partial({ '@_xsi:type': t.literal('ChipICND1065LRGBVExtendProperty') }),
  ],
  'ChipICND1065LRGBVExtendProperty'
);
export interface ChipICND1065LRGBVExtendProperty
  extends t.TypeOf<typeof ChipICND1065LRGBVExtendProperty> {
  RedProperty?: ChipICND1065LExtendProperty;
  GreenProperty?: ChipICND1065LExtendProperty;
  BlueProperty?: ChipICND1065LExtendProperty;
  VRedProperty?: ChipICND1065LExtendProperty;
  ScanType?: ScanTypeEnum;
}
