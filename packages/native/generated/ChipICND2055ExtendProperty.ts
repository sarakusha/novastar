import * as t from 'io-ts';
import * as common from '../lib/common';
import { ChipBaseExtendPropey } from './ChipBaseExtendPropey'; // import
import { ScanType, ScanTypeEnum } from './ScanType';
 // import
export const ChipICND2055ExtendPropertyBase = t.intersection(
  [
    ChipBaseExtendPropey,
    t.type({
      ScanType: common.withDefault(ScanType, 'Scan_32'), // #48653
      RefreshTheNumberOfClusters: common.UInt8_31, // #48671
      SubFields: common.UInt8_4, // #48712
      ShadowEliminationLevel: common.UInt8_29, // #48737
      ShadowEliminationTime: common.UInt8_1, // #48759
      LowAshUniformity: common.UInt8_2, // #48781
      TheFirstSweepDarkCompensation: common.UInt8_8, // #48860
      TheFirstLineSlantsDarkCompensationTime: common.UInt8_4, // #48904
      CouplingToAdjust: common.UInt8_8, // #48966
      CrossCouplingToAdjust: common.UInt8_1, // #49006
      SlowlyOpening: common.UInt8_1, // #49040
      DclkNumPerScanRegPart: common.Int32_77, // #49097
      Gain: common.UInt16_185, // #49115
      GclkFreqP: common.UInt8_12, // #49133
      GclkFreqM: common.UInt8_3, // #49155
      GclkFreqN: common.UInt8_2, // #49177
      Group_Num: common.UInt8_32, // #49199
      GclkNum: common.UInt16_128, // #49225
      RegValue: common.XMLArray(common.UInt16, 'ushort'), // #49275
      FirstRegValue: common.UInt16_85, // #49288
      SecondRegValue: common.UInt16_341, // #49307
      ThreeRegValue: common.UInt16_543, // #49326
      FourRegValue: common.UInt16_799, // #49345
      FiveRegValue: common.UInt16_1027, // #49365
      SixRegValue: common.UInt16_1292, // #49385
      SevenRegValue: common.UInt16_1538, // #49405
      EightRegValue: common.UInt16_1824, // #49425
      NineRegValue: common.UInt16_2080, // #49445
      TenRegValue: common.UInt16_2312, // #49465
      ElevenRegValue: common.UInt16_2568, // #49484
      TwelveRegValue: common.UInt16_2944, // #49503
      ThirteenRegValue: common.UInt16_3073, // #49522
      ForteenRegValue: common.UInt16_3329, // #49542
      FifteenRegValue: common.UInt16_3588, // #49562
      SixteenRegValue: common.UInt16_3841, // #49582
      SeveteenRegValue: common.UInt16_4226, // #49602
      EighteenRegValue: common.UInt16_4385, // #49622
      NineteenRegValue: common.UInt16_4609, // #49641
      TwentyRegValue: common.withDefault(common.UInt16, 4872), // #49660
      TwentyOneRegValue: common.UInt16_5120, // #49680
      TwentyTwoRegValue: common.UInt16_5376, // #49699
      TwentyThreeRegValue: common.UInt16_5632, // #49718
      TwentyFourRegValue: common.UInt16_6128, // #49738
      TwentyFiveRegValue: common.UInt16_6175, // #49757
      TwentySixRegValue: common.UInt16_6400, // #49777
      TwentySevenRegValue: common.UInt16_6687, // #49797
      TwentyEightRegValue: common.UInt16_6928, // #49816
      TwentyNineRegValue: common.UInt16_7376, // #49835
      ThirtyRegValue: common.UInt16_7434, // #49855
      ThirtyOneRegValue: common.UInt16_7746, // #49875
      ThirtyTwoRegValue: common.UInt16_7940, // #49895
      ThirtyThreeRegValue: common.UInt16_8200, // #49915
      ThirtyFourRegValue: common.UInt16_8449, // #49936
      ThirtyFiveRegValue: common.UInt16_8732, // #49955
      ThirtySixRegValue: common.UInt16_28672, // #49974
      ThirtySevenRegValue: common.UInt16_28928, // #49993
      ThirtyEightRegValue: common.UInt16_29184, // #50012
      ThirtyNineRegValue: common.UInt16_29440, // #50031
      FortyRegValue: common.UInt16_29696, // #50050
      FortyOneRegValue: common.UInt16_61440, // #50069
      FortyTwoRegValue: common.UInt16_61696, // #50088
      FortyThreeRegValue: common.UInt16_61952, // #50107
      FortyFourRegValue: common.UInt16_62208, // #50126
      FortyFiveRegValue: common.UInt16_62464, // #50145
      FortySixRegValue: common.UInt16_62720, // #50164
      FortySevenRegValue: common.UInt16_8960,
    }),
    t.partial({
      DisplayMode: common.UInt8, // #48803
      FineTuningTheFirstSweepDarkCompensationEnable: common.Bool, // #48842
      FineTuningTheFirstSweepDarkCompensation: common.UInt8, // #48882
      LowAshColorCompensation: common.UInt8, // #48926
      EnableCouplingToAdjust: common.Bool, // #48948
      CouplingEnhancedMode: common.Bool, // #48984
      CrossCouplingToAdjustN: common.UInt8, // #49022
      KneeVoltage: common.UInt8, // #49058
      EnergySavingMode: common.UInt8, // #49075
      EnableToRemoveBadPoints: common.Bool, // #49249
      IsAdvancedMode: common.Bool,
    }),
  ],
  'ChipICND2055ExtendPropertyBase'
);
/**
 * Codec for {@link ChipICND2055ExtendProperty}
 * @category Codecs
 * @see Automatically generated from ../decompiled/Nova.LCT.GigabitSystem.DataClass.decompiled.cs:48489
 */
export const ChipICND2055ExtendProperty = t.intersection(
  [
    ChipICND2055ExtendPropertyBase,
    t.partial({ '@_xsi:type': t.literal('ChipICND2055ExtendProperty') }),
  ],
  'ChipICND2055ExtendProperty'
);
export interface ChipICND2055ExtendProperty extends t.TypeOf<typeof ChipICND2055ExtendProperty> {
  ScanType: ScanTypeEnum;
}
