import * as t from 'io-ts';
import * as common from '../lib/common';
/**
 * Codec for interface {@link LS9917Data}
 * @category Codecs
 * @see Automatically generated from ../decompiled/Nova.LCT.GigabitSystem.DataClass.decompiled.cs:18827
 */
export const LS9917Data = t.intersection(
  [
    t.type({
      BitsNum: common.Int32_2, // #19156
      SubFrameNum: common.Int32_3, // #19192
      FriedFreuquance: common.Int32_60, // #19216
      ShiftClockList: common.XMLArray(common.Numeric, 'double'), // #19252
      StarRefreshRateList: common.XMLArray(common.Int32, 'int'), // #19276
      MaxRefreshRateList: common.XMLArray(common.Int32, 'int'), // #19300
      HighNumberList: common.XMLArray(common.Int32, 'int'), // #19780
      ModeList: common.XMLArray(t.string, 'string'), // #20356
      DutyRationList: common.XMLArray(common.Numeric, 'double'), // #20452
      LineDutyCycleList: common.XMLArray(common.Numeric, 'double'),
    }),
    t.partial({
      RGBSQ: common.Int32, // #19084
      PmData: common.Base64, // #19096
      DmFirstData: common.Base64, // #19108
      DmSecondData: common.Base64, // #19120
      DmThridData: common.Base64, // #19132
      LS9917OEData: common.Base64, // #19168
      Factor: common.Int32, // #19180
      FrequenceDivsion: common.Int32, // #19204
      SystemClock: common.Int32, // #19228
      ShiftClock: common.Numeric, // #19240
      StarRefreshRate: common.Int32, // #19264
      MaxRefreshRate: common.Int32, // #19288
      HighNumber: common.Int32, // #19312
      PositiveScan: common.Int32, // #19324
      NegetiveScan: common.Int32, // #19336
      BrightnessEfficiency: common.Int32, // #19348
      ShiftLenth: common.Int32, // #19360
      ScanType: common.Int32, // #19372
      GammaStartValue: common.Int32, // #19384
      GammaMaxValue: common.Int32, // #19396
      GammaShift: common.Int32, // #19408
      GameTable: common.Base64, // #19420
      ContrastValue: common.Int32, // #19432
      MaxBrightness: common.Int32, // #19444
      IsSimplyfy: common.Bool, // #19456
      RedJumpOne: common.Numeric, // #19468
      RedJumpTwo: common.Numeric, // #19480
      RedJumpThree: common.Numeric, // #19492
      RedJumpFour: common.Numeric, // #19504
      GreenJumpOne: common.Numeric, // #19516
      GreenJumpTwo: common.Numeric, // #19528
      GreenJumpThree: common.Numeric, // #19540
      GreenJumpFour: common.Numeric, // #19552
      BlueJumpOne: common.Numeric, // #19564
      BlueJumpTwo: common.Numeric, // #19576
      BlueJumpThree: common.Numeric, // #19588
      BlueJumpFour: common.Numeric, // #19600
      CompensateValue: common.Numeric, // #19612
      MinWidth: common.Int32, // #19624
      OEHiLevel: common.Int32, // #19636
      OELoLevel: common.Int32, // #19648
      ClockPhase: common.Int32, // #19660
      ShadowZone: common.Int32, // #19672
      ShadowZeroVal0: common.Int32, // #19684
      ShadowZeroVal1: common.Int32, // #19696
      ShadowZeroVal2: common.Int32, // #19708
      RowShadow: common.Int32, // #19720
      LineCharge: common.Int32, // #19732
      ShadowThree: common.Int32, // #19744
      ErrorBegin: common.Int32, // #19756
      IsNewPcbVersion: common.Bool, // #19768
      ModeValue: common.Int32, // #19792
      IsLineShadowOK: common.Bool, // #19804
      IsRowSwitch: common.Bool, // #19816
      Select32Port: common.Int32, // #19828
      FirstLineRed: common.Int32, // #19840
      FirstLineGreen: common.Int32, // #19852
      FirstLineBlue: common.Int32, // #19864
      RDataPhase: common.Int32, // #19876
      GDataPhase: common.Int32, // #19888
      BDataPhase: common.Int32, // #19900
      HighFrequenceStatus: common.Int32, // #19912
      Mode9739: common.Int32, // #19924
      PassThroughMode: common.Int32, // #19936
      FixValue: common.Int32, // #19948
      ROScale: common.Numeric, // #19960
      ColEliminateUpPointOne: common.Int32, // #19972
      ColEliminateUpPointTwo: common.Int32, // #19984
      ColEliminateUpPointThree: common.Int32, // #19996
      ColUpVoltageOne: common.Int32, // #20008
      ColUpVoltageTwo: common.Int32, // #20020
      ColUpVoltageThree: common.Int32, // #20032
      CurrentThresholdVoltateOne: common.Int32, // #20044
      CurrentThresholdVoltateTwo: common.Int32, // #20056
      CurrentThresholdVoltateThree: common.Int32, // #20068
      ColUpDriveOne: common.Int32, // #20080
      ColUpDriveTwo: common.Int32, // #20092
      ColUpDriveThree: common.Int32, // #20104
      ModePinControlOne: common.Int32, // #20116
      ModePinControlTwo: common.Int32, // #20128
      ModePinControlThree: common.Int32, // #20140
      RowEliminateModeOne: common.Int32, // #20152
      RowEliminateModeTwo: common.Int32, // #20164
      RowEliminateModeThree: common.Int32, // #20176
      RowDownVoltagePointOne: common.Int32, // #20188
      RowDownVoltagePointTwo: common.Int32, // #20200
      RowDownVoltagePointThree: common.Int32, // #20212
      RowDownVoltageClampPointOne: common.Int32, // #20224
      RowDownVoltageClampPointTwo: common.Int32, // #20236
      RowDownVoltageClampPointThree: common.Int32, // #20248
      StartColorOne: common.Int32, // #20260
      StartColorTwo: common.Int32, // #20272
      StartColorThree: common.Int32, // #20284
      StartColorFour: common.Int32, // #20296
      StartScanOne: common.Int32, // #20308
      StartScanTwo: common.Int32, // #20320
      StartScanThree: common.Int32, // #20332
      StartScanFour: common.Int32, // #20344
      DutyRation: common.Int32, // #20368
      RowMergeMode: common.Int32, // #20380
      RowBankVoltageRed: common.Int32, // #20392
      RowBankVoltageGreen: common.Int32, // #20404
      RowBankVoltageBlue: common.Int32, // #20416
      BackMode: common.Int32, // #20428
      LineClockPhase: common.Int32, // #20440
      LineDutyCycle: common.Int32, // #20464
      LineOutPutDalay: common.Int32, // #20476
      TotalNumber: common.Int32, // #20488
      RowJiangPing: common.Int32, // #20500
      CurFlashIndex: common.Int32, // #20512
      CurFlashTotal: common.Int32, // #20524
      CurLeakageIndex: common.Int32, // #20536
      CurLeakageTotal: common.Int32, // #20548
      CurGrayIndex: common.Int32, // #20560
      CurGrayTotal: common.Int32,
    }),
  ],
  'LS9917Data'
);
export interface LS9917Data extends t.TypeOf<typeof LS9917Data> {}
