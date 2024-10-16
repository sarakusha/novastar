import * as t from 'io-ts';
import * as common from '../lib/common';
import { ChipBaseExtendPropey } from './ChipBaseExtendPropey'; // import
import { ChipICND3069ExtendProperty } from './ChipICND3069ExtendProperty'; // import
import { ScanType, ScanTypeEnum } from './ScanType';
 // import
export const ChipICND3069RGBVExtendPropertyBase = t.intersection(
  [
    ChipBaseExtendPropey,
    t.partial({
      RedProperty: ChipICND3069ExtendProperty, // #5010
      BlueProperty: ChipICND3069ExtendProperty, // #5013
      GreenProperty: ChipICND3069ExtendProperty, // #5016
      VRedProperty: ChipICND3069ExtendProperty, // #5019
      IsUseNewModule: common.Bool, // #5022
      ChipLibVersion: common.UInt8, // #5024
      RefNumPerVs: common.UInt16, // #5026
      SubField: common.UInt16, // #5041
      ScanType, // #5055
      SaveSetSubfieldByMySelfToConfigfile: common.Bool, // #5074
      GclkFreqP: common.UInt8, // #5086
      GclkFreqM: common.UInt8, // #5101
      DisplayGrayQ: common.UInt8, // #5116
      GclkNumberEn: common.Bool, // #5130
      ToCalcBrightEffectWith0x09BitSevenToFour: common.UInt8, // #5142
      ToCalcBrightEffectWith0x09BitTwoToZero: common.UInt8, // #5156
      IsAdvancedMode: common.Bool, // #5170
      BadPointEnhanceMode: common.UInt8, // #5182
      BadPixelGainR: common.UInt16, // #5194
      BadPixelGainG: common.UInt16, // #5206
      BadPixelGainB: common.UInt16, // #5218
      SpecialDataLen: common.Int32, // #5230
      SpecialRegisterAddr: common.UInt32, // #5232
      IrefGain: common.Int32, // #5286
    }),
  ],
  'ChipICND3069RGBVExtendPropertyBase'
);
/**
 * Codec for {@link ChipICND3069RGBVExtendProperty}
 * @category Codecs
 * @see Automatically generated from ../decompiled/Nova.LCT.GigabitSystem.ChipICND3069.decompiled.cs:5003
 */
export const ChipICND3069RGBVExtendProperty = t.intersection(
  [
    ChipICND3069RGBVExtendPropertyBase,
    t.partial({ '@_xsi:type': t.literal('ChipICND3069RGBVExtendProperty') }),
  ],
  'ChipICND3069RGBVExtendProperty'
);
export interface ChipICND3069RGBVExtendProperty
  extends t.TypeOf<typeof ChipICND3069RGBVExtendProperty> {
  RedProperty?: ChipICND3069ExtendProperty;
  BlueProperty?: ChipICND3069ExtendProperty;
  GreenProperty?: ChipICND3069ExtendProperty;
  VRedProperty?: ChipICND3069ExtendProperty;
  ScanType?: ScanTypeEnum;
}
