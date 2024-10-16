import * as t from 'io-ts';
import * as common from '../lib/common';
import { ChipBaseExtendPropey } from './ChipBaseExtendPropey'; // import
import { ChipICND1068ExtendProperty } from './ChipICND1068ExtendProperty'; // import
import { ScanType, ScanTypeEnum } from './ScanType';
 // import
export const ChipICND1068RGBVExtendPropertyBase = t.intersection(
  [
    ChipBaseExtendPropey,
    t.type({
      REG_LENGTH: common.Int32_48, // #559
      RegBadPointLength: common.Int32_12,
    }),
    t.partial({
      RedProperty: ChipICND1068ExtendProperty, // #551
      BlueProperty: ChipICND1068ExtendProperty, // #553
      GreenProperty: ChipICND1068ExtendProperty, // #555
      VRedProperty: ChipICND1068ExtendProperty, // #561
      IsUseNewModule: common.Bool, // #565
      ChipLibVersion: common.UInt8, // #567
      RefNumPerVs: common.UInt16, // #569
      ScanType, // #597
      LowGrayUniformity: common.UInt8, // #616
      RemoveBadPointsEnabled: common.Bool, // #630
      CurrentVerifiCationMode: common.Bool, // #644
      GclkFreqP: common.UInt8, // #659
      GclkFreqM: common.UInt8, // #674
      GclkFreqN: common.UInt8, // #689
      IsAdvancedMode: common.Bool, // #704
      GclkNumberEn: common.Bool, // #716
      FractionalFrequencyProEn: common.Bool, // #728
      LowGrayRefHighModeEn: common.UInt8, // #743
      TakePhotoHoriGrainOptimize: common.UInt8, // #758
      SlowSpeedOpenEnhanceMode: common.UInt8, // #773
      InflectionPointVoltageEnhanceMode: common.UInt8, // #788
      SpecialDataLen: common.Int32, // #803
      SpecialRegisterAddr: common.UInt32,
    }),
  ],
  'ChipICND1068RGBVExtendPropertyBase'
);
/**
 * Codec for {@link ChipICND1068RGBVExtendProperty}
 * @category Codecs
 * @see Automatically generated from ../decompiled/Nova.LCT.GigabitSystem.ChipICND1068.decompiled.cs:548
 */
export const ChipICND1068RGBVExtendProperty = t.intersection(
  [
    ChipICND1068RGBVExtendPropertyBase,
    t.partial({ '@_xsi:type': t.literal('ChipICND1068RGBVExtendProperty') }),
  ],
  'ChipICND1068RGBVExtendProperty'
);
export interface ChipICND1068RGBVExtendProperty
  extends t.TypeOf<typeof ChipICND1068RGBVExtendProperty> {
  RedProperty?: ChipICND1068ExtendProperty;
  BlueProperty?: ChipICND1068ExtendProperty;
  GreenProperty?: ChipICND1068ExtendProperty;
  VRedProperty?: ChipICND1068ExtendProperty;
  ScanType?: ScanTypeEnum;
}
