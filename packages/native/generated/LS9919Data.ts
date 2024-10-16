import * as t from 'io-ts';
import * as common from '../lib/common';
/**
 * Codec for interface {@link LS9919Data}
 * @category Codecs
 * @see Automatically generated from ../decompiled/Nova.LCT.GigabitSystem.DataClass.decompiled.cs:20735
 */
export const LS9919Data = t.intersection(
  [
    t.type({
      BitsNum: common.Int32_2, // #21046
      SubFrameNum: common.Int32_3, // #21082
      FriedFreuquance: common.Int32_60, // #21106
      ShiftClockList: common.XMLArray(common.Numeric, 'double'), // #21142
      StarRefreshRateList: common.XMLArray(common.Int32, 'int'), // #21166
      MaxRefreshRateList: common.XMLArray(common.Int32, 'int'), // #21190
      HighNumberList: common.XMLArray(common.Int32, 'int'), // #21658
      ModeList: common.XMLArray(t.string, 'string'), // #22174
      DutyRationList: common.XMLArray(common.Numeric, 'double'), // #22270
      LineDutyCycleList: common.XMLArray(common.Numeric, 'double'),
    }),
    t.partial({
      RGBSQ: common.Int32, // #20974
      PmData: common.Base64, // #20986
      DmFirstData: common.Base64, // #20998
      DmSecondData: common.Base64, // #21010
      DmThridData: common.Base64, // #21022
      LS9919OEData: common.Base64, // #21058
      Factor: common.Int32, // #21070
      FrequenceDivsion: common.Int32, // #21094
      SystemClock: common.Int32, // #21118
      ShiftClock: common.Numeric, // #21130
      StarRefreshRate: common.Int32, // #21154
      MaxRefreshRate: common.Int32, // #21178
      HighNumber: common.Int32, // #21202
      PositiveScan: common.Int32, // #21214
      NegetiveScan: common.Int32, // #21226
      BrightnessEfficiency: common.Int32, // #21238
      ShiftLenth: common.Int32, // #21250
      ScanType: common.Int32, // #21262
      GammaStartValue: common.Int32, // #21274
      GammaMaxValue: common.Int32, // #21286
      GammaShift: common.Int32, // #21298
      GameTable: common.Base64, // #21310
      ContrastValue: common.Int32, // #21322
      MaxBrightness: common.Int32, // #21334
      RedJumpOne: common.Numeric, // #21346
      RedJumpTwo: common.Numeric, // #21358
      RedJumpThree: common.Numeric, // #21370
      RedJumpFour: common.Numeric, // #21382
      GreenJumpOne: common.Numeric, // #21394
      GreenJumpTwo: common.Numeric, // #21406
      GreenJumpThree: common.Numeric, // #21418
      GreenJumpFour: common.Numeric, // #21430
      BlueJumpOne: common.Numeric, // #21442
      BlueJumpTwo: common.Numeric, // #21454
      BlueJumpThree: common.Numeric, // #21466
      BlueJumpFour: common.Numeric, // #21478
      CompensateValue: common.Numeric, // #21490
      MinWidth: common.Int32, // #21502
      OEHiLevel: common.Int32, // #21514
      OELoLevel: common.Int32, // #21526
      ClockPhase: common.Int32, // #21538
      ShadowZone: common.Int32, // #21550
      ShadowZeroVal0: common.Int32, // #21562
      ShadowZeroVal1: common.Int32, // #21574
      ShadowZeroVal2: common.Int32, // #21586
      RowShadow: common.Int32, // #21598
      LineCharge: common.Int32, // #21610
      ShadowThree: common.Int32, // #21622
      ErrorBegin: common.Int32, // #21634
      IsNewPcbVersion: common.Bool, // #21646
      ModeValue: common.Int32, // #21670
      IsLineShadowOK: common.Bool, // #21682
      IsRowSwitch: common.Bool, // #21694
      SelectRowSwitch: common.Int32, // #21706
      Select32Port: common.Int32, // #21718
      FirstLineRed: common.Int32, // #21730
      FirstLineGreen: common.Int32, // #21742
      FirstLineBlue: common.Int32, // #21754
      CurrentRed: common.Int32, // #21766
      CurrentGreen: common.Int32, // #21778
      CurrentBlue: common.Int32, // #21790
      RDataPhase: common.Int32, // #21802
      GDataPhase: common.Int32, // #21814
      BDataPhase: common.Int32, // #21826
      HighFrequenceStatus: common.Int32, // #21838
      Mode9739: common.Int32, // #21850
      PassThroughMode: common.Int32, // #21862
      FixValue: common.Int32, // #21874
      ROScale: common.Numeric, // #21886
      ColUpVoltageOne: common.Int32, // #21898
      ColUpVoltageTwo: common.Int32, // #21910
      ColUpVoltageThree: common.Int32, // #21922
      CurrentThresholdVoltateOne: common.Int32, // #21934
      CurrentThresholdVoltateTwo: common.Int32, // #21946
      CurrentThresholdVoltateThree: common.Int32, // #21958
      RowEliminateModeOne: common.Int32, // #21970
      RowEliminateModeTwo: common.Int32, // #21982
      RowEliminateModeThree: common.Int32, // #21994
      RowDownVoltagePointOne: common.Int32, // #22006
      RowDownVoltagePointTwo: common.Int32, // #22018
      RowDownVoltagePointThree: common.Int32, // #22030
      RowDownVoltageClampPointOne: common.Int32, // #22042
      RowDownVoltageClampPointTwo: common.Int32, // #22054
      RowDownVoltageClampPointThree: common.Int32, // #22066
      StartColorOne: common.Int32, // #22078
      StartColorTwo: common.Int32, // #22090
      StartColorThree: common.Int32, // #22102
      StartColorFour: common.Int32, // #22114
      StartScanOne: common.Int32, // #22126
      StartScanTwo: common.Int32, // #22138
      StartScanThree: common.Int32, // #22150
      StartScanFour: common.Int32, // #22162
      DutyRation: common.Int32, // #22186
      RowMergeMode: common.Int32, // #22198
      RowBankVoltageRed: common.Int32, // #22210
      RowBankVoltageGreen: common.Int32, // #22222
      RowBankVoltageBlue: common.Int32, // #22234
      BackMode: common.Int32, // #22246
      LineClockPhase: common.Int32, // #22258
      LineDutyCycle: common.Int32, // #22282
      LineOutPutDalay: common.Int32, // #22294
      TotalNumber: common.Int32, // #22306
      RowJiangPing: common.Int32, // #22318
      ROpenDetection: common.Int32, // #22330
      GOpenDetection: common.Int32, // #22342
      BOpenDetection: common.Int32,
    }),
  ],
  'LS9919Data'
);
export interface LS9919Data extends t.TypeOf<typeof LS9919Data> {}
