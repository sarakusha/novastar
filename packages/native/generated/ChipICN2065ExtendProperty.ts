import * as t from 'io-ts';
import * as common from '../lib/common';
import { ChipBaseExtendPropey } from './ChipBaseExtendPropey'; // import
import { ScanType, ScanTypeEnum } from './ScanType';
 // import
export const ChipICN2065ExtendPropertyBase = t.intersection(
  [
    ChipBaseExtendPropey,
    t.type({
      ScanType: common.withDefault(ScanType, 'Scan_32'), // #51414
      RefreshTheNumberOfClusters: common.UInt8_31, // #51432
      SubFields: common.UInt8_4, // #51473
      ShadowEliminationLevel: common.UInt8_29, // #51498
      ShadowEliminationTime: common.UInt8_1, // #51520
      LowAshUniformity: common.UInt8_2, // #51542
      TheFirstSweepDarkCompensation: common.UInt8_8, // #51621
      TheFirstLineSlantsDarkCompensationTime: common.UInt8_4, // #51665
      CouplingToAdjust: common.UInt8_8, // #51727
      CrossCouplingToAdjust: common.UInt8_1, // #51767
      SlowlyOpening: common.UInt8_1, // #51801
      DclkNumPerScanRegPart: common.Int32_77, // #51857
      Gain: common.UInt16_185, // #51875
      GclkFreqP: common.UInt8_12, // #51893
      GclkFreqM: common.UInt8_3, // #51915
      GclkFreqN: common.UInt8_2, // #51937
      Group_Num: common.UInt8_32, // #51959
      GclkNum: common.UInt16_128, // #51981
      RegValue: common.XMLArray(common.UInt16, 'ushort'), // #52031
      FirstRegValue: common.UInt16_85, // #52044
      SecondRegValue: common.UInt16_341, // #52062
      ThreeRegValue: common.UInt16_543, // #52080
      FourRegValue: common.UInt16_799, // #52098
      FiveRegValue: common.UInt16_1027, // #52117
      SixRegValue: common.UInt16_1292, // #52136
      SevenRegValue: common.UInt16_1538, // #52155
      EightRegValue: common.UInt16_1824, // #52174
      NineRegValue: common.UInt16_2080, // #52193
      TenRegValue: common.UInt16_2312, // #52212
      ElevenRegValue: common.UInt16_2568, // #52230
      TwelveRegValue: common.UInt16_2944, // #52248
      ThirteenRegValue: common.UInt16_3073, // #52266
      ForteenRegValue: common.UInt16_3329, // #52285
      FifteenRegValue: common.UInt16_3588, // #52304
      SixteenRegValue: common.UInt16_3841, // #52323
      SeveteenRegValue: common.UInt16_4226, // #52342
      EighteenRegValue: common.UInt16_4385, // #52361
      NineteenRegValue: common.UInt16_4609, // #52379
      TwentyRegValue: common.withDefault(common.UInt16, 4864), // #52397
      TwentyOneRegValue: common.UInt16_5120, // #52416
      TwentyTwoRegValue: common.UInt16_5376, // #52434
      TwentyThreeRegValue: common.UInt16_5632, // #52452
      TwentyFourRegValue: common.UInt16_6128, // #52471
      TwentyFiveRegValue: common.UInt16_6175, // #52489
      TwentySixRegValue: common.UInt16_6400, // #52508
      TwentySevenRegValue: common.UInt16_6687, // #52527
      TwentyEightRegValue: common.UInt16_6928, // #52545
      TwentyNineRegValue: common.UInt16_7376, // #52563
      ThirtyRegValue: common.UInt16_7434, // #52582
      ThirtyOneRegValue: common.UInt16_7746, // #52601
      ThirtyTwoRegValue: common.UInt16_7940, // #52620
      ThirtyThreeRegValue: common.UInt16_8200, // #52639
      ThirtyFourRegValue: common.UInt16_8449, // #52659
      ThirtyFiveRegValue: common.UInt16_8732, // #52677
      ThirtySixRegValue: common.UInt16_28672, // #52695
      ThirtySevenRegValue: common.UInt16_28928, // #52713
      ThirtyEightRegValue: common.UInt16_29184, // #52731
      ThirtyNineRegValue: common.UInt16_29440, // #52749
      FortyRegValue: common.UInt16_29696, // #52767
      FortyOneRegValue: common.UInt16_61440, // #52785
      FortyTwoRegValue: common.UInt16_61696, // #52803
      FortyThreeRegValue: common.UInt16_61952, // #52821
      FortyFourRegValue: common.UInt16_62208, // #52839
      FortyFiveRegValue: common.UInt16_62464, // #52857
      FortySixRegValue: common.UInt16_62720, // #52875
      FortySevenRegValue: common.UInt16_8960,
    }),
    t.partial({
      DisplayMode: common.UInt8, // #51564
      FineTuningTheFirstSweepDarkCompensationEnable: common.Bool, // #51603
      FineTuningTheFirstSweepDarkCompensation: common.UInt8, // #51643
      LowAshColorCompensation: common.UInt8, // #51687
      EnableCouplingToAdjust: common.Bool, // #51709
      CouplingEnhancedMode: common.Bool, // #51745
      CrossCouplingToAdjustN: common.UInt8, // #51783
      KneeVoltage: common.UInt8, // #51819
      EnergySavingMode: common.UInt8, // #51835
      EnableToRemoveBadPoints: common.Bool, // #52005
      IsAdvancedMode: common.Bool,
    }),
  ],
  'ChipICN2065ExtendPropertyBase'
);
/**
 * Codec for {@link ChipICN2065ExtendProperty}
 * @category Codecs
 * @see Automatically generated from ../decompiled/Nova.LCT.GigabitSystem.DataClass.decompiled.cs:51250
 */
export const ChipICN2065ExtendProperty = t.intersection(
  [
    ChipICN2065ExtendPropertyBase,
    t.partial({ '@_xsi:type': t.literal('ChipICN2065ExtendProperty') }),
  ],
  'ChipICN2065ExtendProperty'
);
export interface ChipICN2065ExtendProperty extends t.TypeOf<typeof ChipICN2065ExtendProperty> {
  ScanType: ScanTypeEnum;
}
