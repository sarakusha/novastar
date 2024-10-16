import * as t from 'io-ts';
import * as common from '../lib/common';
import { ChipBaseExtendPropey } from './ChipBaseExtendPropey'; // import
import { ChipICND2153SExtendProperty } from './ChipICND2153SExtendProperty'; // import
import { ScanType, ScanTypeEnum } from './ScanType';
 // import
export const ChipICND2153SRGBVExtendPropertyBase = t.intersection(
  [
    ChipBaseExtendPropey,
    t.type({
      REG_LENGTH: common.Int32_48,
    }),
    t.partial({
      RedProperty: ChipICND2153SExtendProperty, // #942
      GreenProperty: ChipICND2153SExtendProperty, // #944
      BlueProperty: ChipICND2153SExtendProperty, // #946
      VRedProperty: ChipICND2153SExtendProperty, // #948
      RefNumPerVs: common.UInt16, // #954
      SubField: common.UInt8, // #968
      InsertFrameMode: common.Bool, // #982
      ManualSettings: common.Bool, // #996
      FrequencyEnhancement: common.Bool, // #1008
      CustomSubField: common.UInt8, // #1020
      ScanType, // #1032
      GclkFreqP: common.UInt8, // #1056
      GclkFreqM: common.UInt8, // #1072
      GclkFreqN: common.UInt8, // #1088
      IsAdvancedMode: common.Bool, // #1102
      SpecialDataLen: common.Int32, // #1114
      SpecialRegisterAddr: common.UInt32, // #1116
      IsUseNewModule: common.Bool, // #1199
      ChipLibVersion: common.UInt8,
    }),
  ],
  'ChipICND2153SRGBVExtendPropertyBase'
);
/**
 * Codec for {@link ChipICND2153SRGBVExtendProperty}
 * @category Codecs
 * @see Automatically generated from ../decompiled/Nova.LCT.GigabitSystem.ChipICND2153S.decompiled.cs:937
 */
export const ChipICND2153SRGBVExtendProperty = t.intersection(
  [
    ChipICND2153SRGBVExtendPropertyBase,
    t.partial({ '@_xsi:type': t.literal('ChipICND2153SRGBVExtendProperty') }),
  ],
  'ChipICND2153SRGBVExtendProperty'
);
export interface ChipICND2153SRGBVExtendProperty
  extends t.TypeOf<typeof ChipICND2153SRGBVExtendProperty> {
  RedProperty?: ChipICND2153SExtendProperty;
  GreenProperty?: ChipICND2153SExtendProperty;
  BlueProperty?: ChipICND2153SExtendProperty;
  VRedProperty?: ChipICND2153SExtendProperty;
  ScanType?: ScanTypeEnum;
}
