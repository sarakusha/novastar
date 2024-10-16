import * as t from 'io-ts';
import * as common from '../lib/common';
import { ChipBaseExtendPropey } from './ChipBaseExtendPropey';
 // import
export const ChipICND2210RGBVExtendPropertyBase = t.intersection(
  [
    ChipBaseExtendPropey,
    t.type({
      REG_LENGTH: common.withDefault(common.Int32, 40), // #45
      RegisterList: common.XMLArray(common.UInt16, 'ushort'), // #621
      RRemovePointCurrentAmplitude: common.UInt8_2, // #634
      GRemovePointCurrentAmplitude: common.UInt8_16, // #637
      BRemovePointCurrentAmplitude: common.UInt8_16, // #703
      IsAdvancedMode: common.Bool_false,
    }),
    t.partial({
      IsUseNewModule: common.Bool, // #68
      RShadowEliminationLevel: common.UInt8, // #70
      GShadowEliminationLevel: common.UInt8, // #82
      BShadowEliminationLevel: common.UInt8, // #94
      RShadowEliminationTime: common.UInt8, // #106
      GShadowEliminationTime: common.UInt8, // #118
      BShadowEliminationTime: common.UInt8, // #130
      LowAshuniformity: common.UInt8, // #142
      ShadowEliminationEn: common.Bool, // #154
      ShadowEliminationEhancedEn: common.Bool, // #166
      RLowGrayOffset: common.UInt8, // #178
      GLowGrayOffset: common.UInt8, // #193
      BLowGrayOffset: common.UInt8, // #208
      FirstLineDarkEn: common.Bool, // #223
      RLowGrayFirstLineDarkCompsention: common.UInt16, // #235
      GLowGrayFirstLineDarkCompsention: common.UInt16, // #247
      BLowGrayFirstLineDarkCompsention: common.UInt16, // #259
      RLowGrayFirstLineDarkCompsentionTime: common.UInt8, // #271
      GLowGrayFirstLineDarkCompsentionTime: common.UInt8, // #283
      BLowGrayFirstLineDarkCompsentionTime: common.UInt8, // #295
      CouplingAdjustEnhacneModeEn: common.Bool, // #307
      RCouplingOptimizationOne: common.UInt8, // #319
      GCouplingOptimizationOne: common.UInt8, // #331
      BCouplingOptimizationOne: common.UInt8, // #343
      RCouplingOptimizationTwoEn: common.Bool, // #355
      GCouplingOptimizationTwoEn: common.Bool, // #367
      BCouplingOptimizationTwoEn: common.Bool, // #379
      RCouplingOptimizationTwo: common.UInt8, // #391
      GCouplingOptimizationTwo: common.UInt8, // #403
      BCouplingOptimizationTwo: common.UInt8, // #415
      RSlowlyOpen: common.UInt8, // #427
      GSlowlyOpen: common.UInt8, // #439
      BSlowlyOpen: common.UInt8, // #451
      RKneePointVoltage: common.UInt8, // #463
      GKneePointVoltage: common.UInt8, // #475
      BKneePointVoltage: common.UInt8, // #487
      LineShadowEliminationLevel: common.UInt8, // #499
      LineShadowEliminationMode: common.UInt8, // #511
      FailureEliminationEn: common.Bool, // #523
      BlackScreenSavingEn: common.Bool, // #525
      RCurrentGain: common.UInt8, // #537
      GCurrentGain: common.UInt8, // #549
      BCurrentGain: common.UInt8, // #561
      RCurrentAmplitude: common.UInt8, // #573
      GCurrentAmplitude: common.UInt8, // #585
      BCurrentAmplitude: common.UInt8, // #597
      RefreshGroupNum: common.UInt8, // #609
      RowGrayLevel: common.UInt8, // #640
      ScanCountOfChipOne: common.UInt8, // #643
      ScanCountOfChipTwo: common.UInt8, // #655
      ScanCountOfChipThree: common.UInt8, // #667
      ScanCountOfChipFour: common.UInt8, // #679
      Line_Len: common.UInt16, // #691
      Row_Len: common.UInt16, // #715
      GclkFreqP: common.UInt8, // #727
      GclkFreqM: common.UInt8, // #739
      GclkFreqN: common.UInt8, // #756
      SpecialDataLen: common.Int32, // #778
      SpecialRegisterAddr: common.UInt32,
    }),
  ],
  'ChipICND2210RGBVExtendPropertyBase'
);
/**
 * Codec for {@link ChipICND2210RGBVExtendProperty}
 * @category Codecs
 * @see Automatically generated from ../decompiled/Nova.LCT.GigabitSystem.ChipICND2210.decompiled.cs:42
 */
export const ChipICND2210RGBVExtendProperty = t.intersection(
  [
    ChipICND2210RGBVExtendPropertyBase,
    t.partial({ '@_xsi:type': t.literal('ChipICND2210RGBVExtendProperty') }),
  ],
  'ChipICND2210RGBVExtendProperty'
);
export interface ChipICND2210RGBVExtendProperty
  extends t.TypeOf<typeof ChipICND2210RGBVExtendProperty> {}
