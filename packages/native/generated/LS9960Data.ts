import * as t from 'io-ts';
import * as common from '../lib/common';
/**
 * Codec for interface {@link LS9960Data}
 * @category Codecs
 * @see Automatically generated from ../decompiled/Nova.LCT.GigabitSystem.DataClass.decompiled.cs:11439
 */
export const LS9960Data = t.intersection(
  [
    t.type({
      FriedFreuquance: common.Int32_60, // #11642
      ClkAndPhaseClock: common.Int32_100, // #11738
      ConnnectUnitCount: common.Int32_1, // #11762
      ICNumberOrder: common.string_empty, // #11858
      RowElimination: common.Int32_10, // #11870
      ColElimination: common.Int32_10, // #11882
      ShiftClockList: common.XMLArray(common.Numeric, 'double'), // #12038
      GammaStepupLength: common.Int32_1, // #12050
      GammaModulus: common.Numeric_28, // #12218
      TableMode: common.Int32_2,
    }),
    t.partial({
      PmData: common.Base64, // #11570
      DmFirstData: common.Base64, // #11582
      DmSecondData: common.Base64, // #11594
      DmThridData: common.Base64, // #11606
      WspData: common.Base64, // #11630
      ScanType: common.Int32, // #11654
      MaxFreshRate: common.Int32, // #11666
      MinFreshRate: common.Int32, // #11678
      MinGamaValue: common.Int32, // #11690
      MaxGamaValue: common.Int32, // #11702
      GameTable: common.Base64, // #11714
      ContrastValue: common.Int32, // #11726
      BirghtEfficty: common.Numeric, // #11750
      UnitIcCount: common.Int32, // #11774
      RedJump: common.Int32, // #11786
      GreenJump: common.Int32, // #11798
      BlueJump: common.Int32, // #11810
      RedCurrentValue: common.Int32, // #11822
      GreenCurrentValue: common.Int32, // #11834
      BlueCurrentValue: common.Int32, // #11846
      ClokPhase: common.Int32, // #11894
      ShiftClock: common.Numeric, // #11906
      ScanLineArray: common.Base64, // #11918
      IsSelfMode: common.Bool, // #11930
      MoudleWeidth: common.Int32, // #11942
      MoudleHeight: common.Int32, // #11954
      BrightMaxValue: common.Int32, // #11966
      RGBSQ: common.Int32, // #11978
      RedColPhase: common.Int32, // #11990
      GreenColPhase: common.Int32, // #12002
      BlueColPhase: common.Int32, // #12014
      ConpensationValue: common.Int32, // #12026
      ScanNum: common.Int32, // #12062
      RgbSeq: common.Int32, // #12074
      FirstDarkertoeliminateR: common.Int32, // #12086
      FirstDarkertoeliminateG: common.Int32, // #12098
      FirstDarkertoeliminateB: common.Int32, // #12110
      Vol_blkl: common.Int32, // #12122
      Mode_blkl: common.Int32, // #12134
      MinPulseR: common.Int32, // #12146
      MinPulseG: common.Int32, // #12158
      MinPulseB: common.Int32, // #12170
      BlkIC: common.Int32, // #12182
      ColBankingMode: common.Int32, // #12194
      PllMode: common.Int32, // #12206
      NVersion: common.Int32, // #12230
      CutTime: common.Int32, // #12242
      LowPower: common.Int32, // #12254
      PreVoltageRed: common.Int32, // #12266
      PreVoltageGreen: common.Int32, // #12278
      PreVoltageBlue: common.Int32, // #12290
      Pre96Port: common.Int32,
    }),
  ],
  'LS9960Data'
);
export interface LS9960Data extends t.TypeOf<typeof LS9960Data> {}
