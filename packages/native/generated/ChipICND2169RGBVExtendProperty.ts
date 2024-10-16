import * as t from 'io-ts';
import * as common from '../lib/common';
import { ChipBaseExtendPropey } from './ChipBaseExtendPropey'; // import
import { ChipICND2169ExtendProperty } from './ChipICND2169ExtendProperty'; // import
import { ScanType, ScanTypeEnum } from './ScanType';
 // import
export const ChipICND2169RGBVExtendPropertyBase = t.intersection(
  [
    ChipBaseExtendPropey,
    t.type({
      REG_LENGTH: common.Int32_48,
    }),
    t.partial({
      RedProperty: ChipICND2169ExtendProperty, // #5596
      BlueProperty: ChipICND2169ExtendProperty, // #5598
      GreenProperty: ChipICND2169ExtendProperty, // #5600
      VRedProperty: ChipICND2169ExtendProperty, // #5604
      IsUseNewModule: common.Bool, // #5608
      ChipLibVersion: common.UInt8, // #5610
      GclkNum: common.UInt16, // #5612
      RefNumPerVs: common.UInt16, // #5627
      ScanType, // #5642
      GclkFreqP: common.UInt8, // #5661
      GclkFreqM: common.UInt8, // #5676
      GclkFreqN: common.UInt8, // #5691
      InterMode: common.UInt8, // #5706
      InterModeG: common.UInt8, // #5708
      InterModeB: common.UInt8, // #5710
      IsAdvancedMode: common.Bool, // #5712
      GclkNumberEn: common.Bool, // #5724
      FractionalFrequencyProEn: common.Bool, // #5736
      SpecialDataLen: common.Int32, // #5748
      SpecialRegisterAddr: common.UInt32,
    }),
  ],
  'ChipICND2169RGBVExtendPropertyBase'
);
/**
 * Codec for {@link ChipICND2169RGBVExtendProperty}
 * @category Codecs
 * @see Automatically generated from ../decompiled/Nova.LCT.GigabitSystem.ChipICND2169.decompiled.cs:5593
 */
export const ChipICND2169RGBVExtendProperty = t.intersection(
  [
    ChipICND2169RGBVExtendPropertyBase,
    t.partial({ '@_xsi:type': t.literal('ChipICND2169RGBVExtendProperty') }),
  ],
  'ChipICND2169RGBVExtendProperty'
);
export interface ChipICND2169RGBVExtendProperty
  extends t.TypeOf<typeof ChipICND2169RGBVExtendProperty> {
  RedProperty?: ChipICND2169ExtendProperty;
  BlueProperty?: ChipICND2169ExtendProperty;
  GreenProperty?: ChipICND2169ExtendProperty;
  VRedProperty?: ChipICND2169ExtendProperty;
  ScanType?: ScanTypeEnum;
}
