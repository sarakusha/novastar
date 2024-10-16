import * as t from 'io-ts';
import * as common from '../lib/common';
import { ChipBaseExtendPropey } from './ChipBaseExtendPropey'; // import
import { ChipICND1065SExtendProperty } from './ChipICND1065SExtendProperty'; // import
import { PointDetectParameter } from './PointDetectParameter'; // import
import { ScanType, ScanTypeEnum } from './ScanType';
 // import
export const ChipICND1065SRGBVExtendPropertyBase = t.intersection(
  [
    ChipBaseExtendPropey,
    t.type({
      REG_LENGTH: common.Int32_34,
    }),
    t.partial({
      RedProperty: ChipICND1065SExtendProperty, // #995
      GreenProperty: ChipICND1065SExtendProperty, // #997
      BlueProperty: ChipICND1065SExtendProperty, // #999
      VRedProperty: ChipICND1065SExtendProperty, // #1001
      RefNumPerVs: common.UInt16, // #1007
      BeginTime: common.UInt8, // #1021
      NumToSubFiled: common.UInt16, // #1035
      SubField: common.UInt8, // #1050
      ScanType, // #1064
      GclkFreqP: common.UInt8, // #1082
      GclkFreqM: common.UInt8, // #1096
      GclkFreqN: common.UInt8, // #1110
      IsAdvancedMode: common.Bool, // #1124
      SaveSetSubfieldByMySelfToConfigfile: common.Bool, // #1140
      SpecialDataLen: common.Int32, // #1152
      SpecialRegisterAddr: common.UInt32, // #1154
      IsUseNewModule: common.Bool, // #1237
      ChipLibVersion: common.UInt8, // #1239
      PointDetectParameter,
    }),
  ],
  'ChipICND1065SRGBVExtendPropertyBase'
);
/**
 * Codec for {@link ChipICND1065SRGBVExtendProperty}
 * @category Codecs
 * @see Automatically generated from ../decompiled/Nova.LCT.GigabitSystem.ChipICND1065S.decompiled.cs:990
 */
export const ChipICND1065SRGBVExtendProperty = t.intersection(
  [
    ChipICND1065SRGBVExtendPropertyBase,
    t.partial({ '@_xsi:type': t.literal('ChipICND1065SRGBVExtendProperty') }),
  ],
  'ChipICND1065SRGBVExtendProperty'
);
export interface ChipICND1065SRGBVExtendProperty
  extends t.TypeOf<typeof ChipICND1065SRGBVExtendProperty> {
  RedProperty?: ChipICND1065SExtendProperty;
  GreenProperty?: ChipICND1065SExtendProperty;
  BlueProperty?: ChipICND1065SExtendProperty;
  VRedProperty?: ChipICND1065SExtendProperty;
  ScanType?: ScanTypeEnum;
  PointDetectParameter?: PointDetectParameter;
}
