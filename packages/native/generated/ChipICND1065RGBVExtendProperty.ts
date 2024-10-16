import * as t from 'io-ts';
import * as common from '../lib/common';
import { ChipBaseExtendPropey } from './ChipBaseExtendPropey'; // import
import { ChipICND1065ExtendProperty } from './ChipICND1065ExtendProperty'; // import
import { ScanType, ScanTypeEnum } from './ScanType';
 // import
export const ChipICND1065RGBVExtendPropertyBase = t.intersection(
  [
    ChipBaseExtendPropey,
    t.type({
      REG_LENGTH: common.Int32_16,
    }),
    t.partial({
      RedProperty: ChipICND1065ExtendProperty, // #517
      GreenProperty: ChipICND1065ExtendProperty, // #519
      BlueProperty: ChipICND1065ExtendProperty, // #521
      VRedProperty: ChipICND1065ExtendProperty, // #523
      RefNumPerVs: common.UInt16, // #529
      BeginTime: common.UInt8, // #543
      NumToSubFiled: common.UInt16, // #557
      SubField: common.UInt8, // #572
      ScanType, // #586
      GclkFreqP: common.UInt8, // #604
      GclkFreqM: common.UInt8, // #618
      GclkFreqN: common.UInt8, // #632
      IsAdvancedMode: common.Bool, // #646
      SpecialDataLen: common.Int32, // #662
      SpecialRegisterAddr: common.UInt32, // #664
      IsUseNewModule: common.Bool, // #747
      ChipLibVersion: common.UInt8,
    }),
  ],
  'ChipICND1065RGBVExtendPropertyBase'
);
/**
 * Codec for {@link ChipICND1065RGBVExtendProperty}
 * @category Codecs
 * @see Automatically generated from ../decompiled/Nova.LCT.GigabitSystem.ChipICND1065.decompiled.cs:512
 */
export const ChipICND1065RGBVExtendProperty = t.intersection(
  [
    ChipICND1065RGBVExtendPropertyBase,
    t.partial({ '@_xsi:type': t.literal('ChipICND1065RGBVExtendProperty') }),
  ],
  'ChipICND1065RGBVExtendProperty'
);
export interface ChipICND1065RGBVExtendProperty
  extends t.TypeOf<typeof ChipICND1065RGBVExtendProperty> {
  RedProperty?: ChipICND1065ExtendProperty;
  GreenProperty?: ChipICND1065ExtendProperty;
  BlueProperty?: ChipICND1065ExtendProperty;
  VRedProperty?: ChipICND1065ExtendProperty;
  ScanType?: ScanTypeEnum;
}
