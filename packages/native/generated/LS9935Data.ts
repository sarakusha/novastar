import * as t from 'io-ts';
import * as common from '../lib/common';
/**
 * Codec for interface {@link LS9935Data}
 * @category Codecs
 * @see Automatically generated from ../decompiled/Nova.LCT.GigabitSystem.DataClass.decompiled.cs:12403
 */
export const LS9935Data = t.intersection(
  [
    t.type({
      BitsNum: common.Int32_2, // #12782
      SubFrameNum: common.Int32_3, // #12818
      FriedFreuquance: common.Int32_60, // #12842
      ShiftClockList: common.XMLArray(common.Numeric, 'double'), // #12878
      StarRefreshRateList: common.XMLArray(common.Int32, 'int'), // #12902
      MaxRefreshRateList: common.XMLArray(common.Int32, 'int'), // #12926
      HighNumberList: common.XMLArray(common.Int32, 'int'), // #13046
      GammaValue: common.Numeric_28, // #13461
      ModeList: common.XMLArray(t.string, 'string'), // #14085
      DutyRationList: common.XMLArray(common.Numeric, 'double'), // #14121
      BankPresetList: common.XMLArray(t.string, 'string'), // #14133
      BankPresetStr: common.string_empty, // #14217
      LineDutyCycleList: common.XMLArray(common.Numeric, 'double'), // #14349
      Value3DMax: common.Int32_4559,
    }),
    t.partial({
      RGBSQ: common.Int32, // #12710
      PmData: common.Base64, // #12722
      DmFirstData: common.Base64, // #12734
      DmSecondData: common.Base64, // #12746
      DmThridData: common.Base64, // #12758
      LS9935OEData: common.Base64, // #12794
      Factor: common.Int32, // #12806
      FrequenceDivsion: common.Int32, // #12830
      SystemClock: common.Int32, // #12854
      ShiftClock: common.Numeric, // #12866
      StarRefreshRate: common.Int32, // #12890
      MaxRefreshRate: common.Int32, // #12914
      HighNumber: common.Int32, // #12938
      PositiveScan: common.Int32, // #12950
      NegetiveScan: common.Int32, // #12962
      BrightnessEfficiency: common.Int32, // #12974
      ShiftLenth: common.Int32, // #12986
      ScanType: common.Int32, // #12998
      GammaStartValue: common.Int32, // #13010
      GammaMaxValue: common.Int32, // #13022
      GammaShift: common.Int32, // #13034
      GameTable: common.Base64, // #13058
      ContrastValue: common.Int32, // #13077
      MaxBrightness: common.Int32, // #13089
      IsSimplyfy: common.Bool, // #13101
      RedJumpOne: common.Numeric, // #13113
      RedJumpTwo: common.Numeric, // #13125
      RedJumpThree: common.Numeric, // #13137
      RedJumpFour: common.Numeric, // #13149
      GreenJumpOne: common.Numeric, // #13161
      GreenJumpTwo: common.Numeric, // #13173
      GreenJumpThree: common.Numeric, // #13185
      GreenJumpFour: common.Numeric, // #13197
      BlueJumpOne: common.Numeric, // #13209
      BlueJumpTwo: common.Numeric, // #13221
      BlueJumpThree: common.Numeric, // #13233
      BlueJumpFour: common.Numeric, // #13245
      RedCompsentionOne: common.Numeric, // #13257
      GreenCompsentionOne: common.Numeric, // #13269
      BlueCompsentionOne: common.Numeric, // #13281
      CompensateValue: common.Numeric, // #13293
      MinWidth: common.Int32, // #13305
      OEHiLevel: common.Int32, // #13317
      OELoLevel: common.Int32, // #13329
      ClockPhase: common.Int32, // #13341
      ShadowZone: common.Int32, // #13353
      ShadowZeroVal0: common.Int32, // #13365
      ShadowZeroVal1: common.Int32, // #13377
      ShadowZeroVal2: common.Int32, // #13389
      RowShadow: common.Int32, // #13401
      LineCharge: common.Int32, // #13413
      ShadowThree: common.Int32, // #13425
      ErrorBegin: common.Int32, // #13437
      IsNewPcbVersion: common.Bool, // #13449
      ModeValue: common.Int32, // #13473
      IsLineShadowOK: common.Bool, // #13485
      IsRowSwitch: common.Bool, // #13497
      SelectRowSwitch: common.Int32, // #13509
      Select32Port: common.Int32, // #13521
      FirstLineRed: common.Int32, // #13533
      FirstLineGreen: common.Int32, // #13545
      FirstLineBlue: common.Int32, // #13557
      CurrentRed: common.Int32, // #13569
      CurrentGreen: common.Int32, // #13581
      CurrentBlue: common.Int32, // #13593
      RDataPhase: common.Int32, // #13605
      GDataPhase: common.Int32, // #13617
      BDataPhase: common.Int32, // #13629
      HighFrequenceStatus: common.Int32, // #13641
      Mode9739: common.Int32, // #13653
      PassThroughMode: common.Int32, // #13665
      FixValue: common.Int32, // #13677
      ROScale: common.Numeric, // #13689
      ColEliminateUpPointOne: common.Int32, // #13701
      ColEliminateUpPointTwo: common.Int32, // #13713
      ColEliminateUpPointThree: common.Int32, // #13725
      ColUpVoltageOne: common.Int32, // #13737
      ColUpVoltageTwo: common.Int32, // #13749
      ColUpVoltageThree: common.Int32, // #13761
      CurrentThresholdVoltateOne: common.Int32, // #13773
      CurrentThresholdVoltateTwo: common.Int32, // #13785
      CurrentThresholdVoltateThree: common.Int32, // #13797
      ColUpDriveOne: common.Int32, // #13809
      ColUpDriveTwo: common.Int32, // #13821
      ColUpDriveThree: common.Int32, // #13833
      ModePinControlOne: common.Int32, // #13845
      ModePinControlTwo: common.Int32, // #13857
      ModePinControlThree: common.Int32, // #13869
      RowEliminateModeOne: common.Int32, // #13881
      RowEliminateModeTwo: common.Int32, // #13893
      RowEliminateModeThree: common.Int32, // #13905
      RowDownVoltagePointOne: common.Int32, // #13917
      RowDownVoltagePointTwo: common.Int32, // #13929
      RowDownVoltagePointThree: common.Int32, // #13941
      RowDownVoltageClampPointOne: common.Int32, // #13953
      RowDownVoltageClampPointTwo: common.Int32, // #13965
      RowDownVoltageClampPointThree: common.Int32, // #13977
      StartColorOne: common.Int32, // #13989
      StartColorTwo: common.Int32, // #14001
      StartColorThree: common.Int32, // #14013
      StartColorFour: common.Int32, // #14025
      StartScanOne: common.Int32, // #14037
      StartScanTwo: common.Int32, // #14049
      StartScanThree: common.Int32, // #14061
      StartScanFour: common.Int32, // #14073
      DutyRation: common.Int32, // #14097
      RowMergeMode: common.Int32, // #14109
      BankPreset: common.Int32, // #14145
      RowBankVoltageRed: common.Int32, // #14157
      RowBankVoltageGreen: common.Int32, // #14169
      RowBankVoltageBlue: common.Int32, // #14181
      BackMode: common.Int32, // #14193
      LineClockPhase: common.Int32, // #14205
      LineDutyCycle: common.Int32, // #14229
      LineOutPutDalay: common.Int32, // #14241
      TotalNumber: common.Int32, // #14253
      RowJiangPing: common.Int32, // #14265
      CurFlashIndex: common.Int32, // #14277
      CurFlashTotal: common.Int32, // #14289
      CurLeakageIndex: common.Int32, // #14301
      CurLeakageTotal: common.Int32, // #14313
      CurGrayIndex: common.Int32, // #14325
      CurGrayTotal: common.Int32, // #14337
      Value3D: common.Int32, // #14361
      RedOpenDetection: common.Int32, // #14373
      GreenOpenDetection: common.Int32, // #14385
      BlueOpenDetection: common.Int32, // #14397
      RedLowGrayFirstLine: common.Int32, // #14409
      GreenLowGrayFirstLine: common.Int32, // #14421
      BlueLowGrayFirstLine: common.Int32, // #14433
      RedPresentGain: common.Int32, // #14445
      GreenPresentGain: common.Int32, // #14457
      BluePresentGain: common.Int32, // #14469
      PreParamEnable: common.Bool, // #14481
      PreParamValue: common.Numeric, // #14493
      IsLowPower: common.Bool,
    }),
  ],
  'LS9935Data'
);
export interface LS9935Data extends t.TypeOf<typeof LS9935Data> {}
