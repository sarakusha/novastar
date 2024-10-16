import * as t from 'io-ts';
import * as common from '../lib/common';
import { ChipBaseExtendPropey } from './ChipBaseExtendPropey';
 // import
export const ChipRT5977ExtendPropertyBase = t.intersection(
  [
    ChipBaseExtendPropey,
    t.type({
      RegisterArray: common.XMLArray(common.UInt16, 'ushort'),
    }),
    t.partial({
      OpenTime: common.UInt8, // #54
      AdditionalDisplayTime: common.UInt8, // #66
      BlackScreenPowerSaving: common.Bool, // #78
      DynamicPowerSavingLevel: common.UInt8, // #90
      DynamicPowerSavingTime: common.UInt8, // #102
      CompensationGrade: common.UInt8, // #114
      OpenCircuitDetectionCurrent: common.UInt8, // #126
      OpenCircuitDetectionLevel: common.UInt8, // #138
      PerformsOpenCircuitDetection: common.Bool, // #150
      LEDBadSpotDetectionModeBetweenOpenAndShortCircuit: common.Bool, // #162
      CurrentHalved: common.Bool, // #174
      TurningVoltage: common.UInt8, // #186
      CurrentSegmentation: common.UInt8, // #198
      UnitSettingOne: common.UInt8, // #210
      UnitSettingTwo: common.UInt8, // #222
      UnitSettingThree: common.UInt8, // #234
      UnitSettingFour: common.UInt8, // #246
      UnitSettingFive: common.UInt8, // #258
      UnitSettingSix: common.UInt8, // #270
      UnitSettingSeven: common.UInt8, // #282
      EnergySavingShadowEliminationLevel: common.UInt8, // #294
      ShadowEliminationTime: common.UInt8, // #306
      ShadowEhancedModeEn: common.Bool, // #318
      HighlightingAndShadingOfFirstLine: common.Bool, // #330
      ShadowEhancedMode: common.UInt8, // #342
      ShadowTimeOpen: common.Bool, // #354
      GeneralDIntensityOfAblation: common.UInt8, // #366
      GeneralDLevelOfAblation: common.UInt8, // #378
      GeneralLIntensityOfAblation: common.UInt8, // #390
      GeneralLLevelOfAblation: common.UInt8, // #402
      FirstLineLightOrDark_D_Intensity: common.UInt8, // #414
      FirstLineLightOrDark_D_Level: common.UInt8, // #426
      FirstLineLightOrDark_L_Intensity: common.UInt8, // #438
      FirstLineLightOrDark_L_Level: common.UInt8, // #450
      Predecoupled_D_Intensity: common.UInt8, // #462
      Predecoupled_D_Level: common.UInt8, // #474
      Predecoupled_L_Intensity: common.UInt8, // #486
      Predecoupled_L_Level: common.UInt8, // #498
      ZeroD_Intensity: common.UInt8, // #510
      ZeroD_Level: common.UInt8, // #522
      OneD_Intensity: common.UInt8, // #534
      OneD_Level: common.UInt8, // #546
      TwoD_Intensity: common.UInt8, // #558
      TwoD_Level: common.UInt8, // #570
      ThreeD_Intensity: common.UInt8, // #582
      ThreeD_Level: common.UInt8, // #594
      FourD_Intensity: common.UInt8, // #606
      FourD_Level: common.UInt8, // #618
      FiveD_Intensity: common.UInt8, // #630
      FiveD_Level: common.UInt8, // #642
      SixD_Intensity: common.UInt8, // #654
      SixD_Level: common.UInt8, // #666
      SevenD_Intensity: common.UInt8, // #678
      SevenD_Level: common.UInt8, // #690
      EightD_Intensity: common.UInt8, // #702
      EightD_Level: common.UInt8, // #714
      NineD_Intensity: common.UInt8, // #726
      NineD_Level: common.UInt8, // #738
      TenD_Intensity: common.UInt8, // #750
      TenD_Level: common.UInt8, // #762
      ElevenD_Intensity: common.UInt8, // #774
      ElevenD_Level: common.UInt8, // #786
      TwelveD_Intensity: common.UInt8, // #798
      TwelveD_Level: common.UInt8, // #810
      ThirteenD_Intensity: common.UInt8, // #822
      ThirteenD_Level: common.UInt8, // #834
      FourteenD_Intensity: common.UInt8, // #846
      FourteenD_Level: common.UInt8, // #858
      FifteenD_Intensity: common.UInt8, // #870
      FifteenD_Level: common.UInt8, // #882
      OneL_Intensity: common.UInt8, // #894
      OneL_Level: common.UInt8, // #906
      TwoL_Intensity: common.UInt8, // #918
      TwoL_Level: common.UInt8, // #930
      ThreeL_Intensity: common.UInt8, // #942
      ThreeL_Level: common.UInt8, // #954
      FourL_Intensity: common.UInt8, // #966
      FourL_Level: common.UInt8, // #978
      FiveL_Intensity: common.UInt8, // #990
      FiveL_Level: common.UInt8, // #1002
      SixL_Intensity: common.UInt8, // #1014
      SixL_Level: common.UInt8, // #1026
      SevenL_Intensity: common.UInt8, // #1038
      SevenL_Level: common.UInt8, // #1050
      EightL_Intensity: common.UInt8, // #1062
      EightL_Level: common.UInt8, // #1074
      NineL_Intensity: common.UInt8, // #1086
      NineL_Level: common.UInt8, // #1098
      TenL_Intensity: common.UInt8, // #1110
      TenL_Level: common.UInt8, // #1122
      ElevenL_Intensity: common.UInt8, // #1134
      ElevenL_Level: common.UInt8, // #1146
      TwelveL_Intensity: common.UInt8, // #1158
      TwelveL_Level: common.UInt8, // #1170
      ThirteenL_Intensity: common.UInt8, // #1182
      ThirteenL_Level: common.UInt8, // #1194
      FourteenL_Intensity: common.UInt8, // #1206
      FourteenL_Level: common.UInt8, // #1218
      FifteenL_Intensity: common.UInt8, // #1230
      FifteenL_Level: common.UInt8, // #1242
      SixteenL_Intensity: common.UInt8, // #1254
      SixteenL_Level: common.UInt8, // #1266
      ZeroDL_T: common.UInt8, // #1278
      OneDL_T: common.UInt8, // #1290
      TwoDL_T: common.UInt8, // #1302
      ThreeDL_T: common.UInt8, // #1314
      FourDL_T: common.UInt8, // #1326
      FiveDL_T: common.UInt8, // #1338
      SixDL_T: common.UInt8, // #1350
      SevenDL_T: common.UInt8, // #1362
      EightDL_T: common.UInt8, // #1374
      NineDL_T: common.UInt8, // #1386
      TenDL_T: common.UInt8, // #1398
      ElevenDL_T: common.UInt8, // #1410
      TwelveDL_T: common.UInt8, // #1422
      ThirteenDL_T: common.UInt8, // #1434
      FourteenDL_T: common.UInt8, // #1446
      FifteenDL_T: common.UInt8, // #1458
      SixteenDL_T: common.UInt8, // #1470
      D_Intensity: common.UInt8, // #1482
      D_Level: common.UInt8, // #1494
      LowAshSetpoint: common.UInt16, // #1506
      LowGreyBiasAdjustment: common.UInt8, // #1518
      HighAshSetpoint: common.UInt8, // #1530
      HighGreyBiasAdjustment: common.UInt8, // #1542
      MiddleGreyBiasAdjustment: common.UInt8, // #1554
      HighBrushUnit: common.UInt8, // #1566
      GreyingHighBrush: common.UInt8, // #1578
      OffColourAdjustment: common.UInt8, // #1590
      HighBrushCompensationForDusting: common.UInt8, // #1602
      AdvancedMode: common.Bool, // #1614
      HighBrushUnitSettingOne: common.UInt8, // #1626
      HighBrushUnitSettingTwo: common.UInt8, // #1638
      HighBrushUnitSettingThree: common.UInt8, // #1650
      HighBrushUnitSettingFour: common.UInt8, // #1662
      HighBrushUnitSettingFive: common.UInt8, // #1674
      HighBrushUnitSettingSix: common.UInt8, // #1686
      HighBrushUnitSettingSeven: common.UInt8, // #1698
      CurrentGainR: common.UInt8, // #1710
      CurrentGainG: common.UInt8, // #1722
      CurrentGainB: common.UInt8,
    }),
  ],
  'ChipRT5977ExtendPropertyBase'
);
/**
 * Codec for {@link ChipRT5977ExtendProperty}
 * @category Codecs
 * @see Automatically generated from ../decompiled/Nova.LCT.GigabitSystem.ChipRT5977.decompiled.cs:46
 */
export const ChipRT5977ExtendProperty = t.intersection(
  [
    ChipRT5977ExtendPropertyBase,
    t.partial({ '@_xsi:type': t.literal('ChipRT5977ExtendProperty') }),
  ],
  'ChipRT5977ExtendProperty'
);
export interface ChipRT5977ExtendProperty extends t.TypeOf<typeof ChipRT5977ExtendProperty> {}
