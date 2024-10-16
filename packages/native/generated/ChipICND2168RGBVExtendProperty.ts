import * as t from 'io-ts';
import * as common from '../lib/common';
import { ChipBaseExtendPropey } from './ChipBaseExtendPropey'; // import
import { ChipICND2168ExtendProperty } from './ChipICND2168ExtendProperty'; // import
import { ScanType, ScanTypeEnum } from './ScanType';
 // import
export const ChipICND2168RGBVExtendPropertyBase = t.intersection(
  [
    ChipBaseExtendPropey,
    t.type({
      REG_LENGTH: common.Int32_48, // #817
      RegBadPointLength: common.Int32_7,
    }),
    t.partial({
      RedProperty: ChipICND2168ExtendProperty, // #800
      BlueProperty: ChipICND2168ExtendProperty, // #802
      GreenProperty: ChipICND2168ExtendProperty, // #804
      VRedProperty: ChipICND2168ExtendProperty, // #819
      IsUseNewModule: common.Bool, // #823
      ChipLibVersion: common.UInt8, // #825
      GclkNum: common.UInt16, // #827
      RefNumPerVs: common.UInt16, // #842
      ScanType, // #857
      LowGrayUniformity: common.UInt8, // #876
      RemoveBadPointsEnabled: common.Bool, // #890
      RemoveBadPointsMode: common.UInt8, // #904
      CurrentVerifiCationMode: common.Bool, // #916
      GridentOptimization: common.Bool, // #931
      GclkFreqP: common.UInt8, // #946
      GclkFreqM: common.UInt8, // #961
      GclkFreqN: common.UInt8, // #976
      IsAdvancedMode: common.Bool, // #991
      GclkNumberEn: common.Bool, // #1003
      FractionalFrequencyProEn: common.Bool, // #1019
      SpecialDataLen: common.Int32, // #1031
      SpecialRegisterAddr: common.UInt32,
    }),
  ],
  'ChipICND2168RGBVExtendPropertyBase'
);
/**
 * Codec for {@link ChipICND2168RGBVExtendProperty}
 * @category Codecs
 * @see Automatically generated from ../decompiled/Nova.LCT.GigabitSystem.ChipICND2168.decompiled.cs:797
 */
export const ChipICND2168RGBVExtendProperty = t.intersection(
  [
    ChipICND2168RGBVExtendPropertyBase,
    t.partial({ '@_xsi:type': t.literal('ChipICND2168RGBVExtendProperty') }),
  ],
  'ChipICND2168RGBVExtendProperty'
);
export interface ChipICND2168RGBVExtendProperty
  extends t.TypeOf<typeof ChipICND2168RGBVExtendProperty> {
  RedProperty?: ChipICND2168ExtendProperty;
  BlueProperty?: ChipICND2168ExtendProperty;
  GreenProperty?: ChipICND2168ExtendProperty;
  VRedProperty?: ChipICND2168ExtendProperty;
  ScanType?: ScanTypeEnum;
}
