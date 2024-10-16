import * as t from 'io-ts';
import * as common from '../lib/common';
import { ChipBaseExtendPropey } from './ChipBaseExtendPropey'; // import
import { ChipICND3065ExtendProperty } from './ChipICND3065ExtendProperty'; // import
import { ScanType, ScanTypeEnum } from './ScanType';
 // import
export const ChipICND3065RGBVExtendPropertyBase = t.intersection(
  [
    ChipBaseExtendPropey,
    t.partial({
      RedProperty: ChipICND3065ExtendProperty, // #4845
      BlueProperty: ChipICND3065ExtendProperty, // #4847
      GreenProperty: ChipICND3065ExtendProperty, // #4849
      VRedProperty: ChipICND3065ExtendProperty, // #4851
      IsUseNewModule: common.Bool, // #4855
      ChipLibVersion: common.UInt8, // #4857
      RefNumPerVs: common.UInt16, // #4859
      ScanType, // #4874
      GclkFreqP: common.UInt8, // #4893
      GclkFreqM: common.UInt8, // #4908
      GclkFreqN: common.UInt8, // #4923
      IsAdvancedMode: common.Bool, // #4938
      GclkNumberEn: common.Bool, // #4950
      FractionalFrequencyProEn: common.Bool, // #4962
      BadPointEnhanceModeEn: common.Bool, // #4974
      BadPointEnhanceMode: common.UInt8, // #4986
      SpecialDataLen: common.Int32, // #4998
      SpecialRegisterAddr: common.UInt32, // #5000
    }),
  ],
  'ChipICND3065RGBVExtendPropertyBase'
);
/**
 * Codec for {@link ChipICND3065RGBVExtendProperty}
 * @category Codecs
 * @see Automatically generated from ../decompiled/Nova.LCT.GigabitSystem.ChipICND3065.decompiled.cs:4842
 */
export const ChipICND3065RGBVExtendProperty = t.intersection(
  [
    ChipICND3065RGBVExtendPropertyBase,
    t.partial({ '@_xsi:type': t.literal('ChipICND3065RGBVExtendProperty') }),
  ],
  'ChipICND3065RGBVExtendProperty'
);
export interface ChipICND3065RGBVExtendProperty
  extends t.TypeOf<typeof ChipICND3065RGBVExtendProperty> {
  RedProperty?: ChipICND3065ExtendProperty;
  BlueProperty?: ChipICND3065ExtendProperty;
  GreenProperty?: ChipICND3065ExtendProperty;
  VRedProperty?: ChipICND3065ExtendProperty;
  ScanType?: ScanTypeEnum;
}
