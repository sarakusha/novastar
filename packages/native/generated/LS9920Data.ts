import * as t from 'io-ts';
import * as common from '../lib/common';
/**
 * Codec for interface {@link LS9920Data}
 * @category Codecs
 * @see Automatically generated from ../decompiled/Nova.LCT.GigabitSystem.DataClass.decompiled.cs:22508
 */
export const LS9920Data = t.intersection(
  [
    t.type({
      BitsNum: common.Int32_2, // #22819
      SubFrameNum: common.Int32_3, // #22855
      FriedFreuquance: common.Int32_60, // #22879
      ShiftClockList: common.XMLArray(common.Numeric, 'double'), // #22915
      StarRefreshRateList: common.XMLArray(common.Int32, 'int'), // #22939
      MaxRefreshRateList: common.XMLArray(common.Int32, 'int'), // #22963
      HighNumberList: common.XMLArray(common.Int32, 'int'), // #23431
      ModeList: common.XMLArray(t.string, 'string'), // #23947
      DutyRationList: common.XMLArray(common.Numeric, 'double'), // #24043
      LineDutyCycleList: common.XMLArray(common.Numeric, 'double'),
    }),
    t.partial({
      RGBSQ: common.Int32, // #22747
      PmData: common.Base64, // #22759
      DmFirstData: common.Base64, // #22771
      DmSecondData: common.Base64, // #22783
      DmThridData: common.Base64, // #22795
      LS9920OEData: common.Base64, // #22831
      Factor: common.Int32, // #22843
      FrequenceDivsion: common.Int32, // #22867
      SystemClock: common.Int32, // #22891
      ShiftClock: common.Numeric, // #22903
      StarRefreshRate: common.Int32, // #22927
      MaxRefreshRate: common.Int32, // #22951
      HighNumber: common.Int32, // #22975
      PositiveScan: common.Int32, // #22987
      NegetiveScan: common.Int32, // #22999
      BrightnessEfficiency: common.Int32, // #23011
      ShiftLenth: common.Int32, // #23023
      ScanType: common.Int32, // #23035
      GammaStartValue: common.Int32, // #23047
      GammaMaxValue: common.Int32, // #23059
      GammaShift: common.Int32, // #23071
      GameTable: common.Base64, // #23083
      ContrastValue: common.Int32, // #23095
      MaxBrightness: common.Int32, // #23107
      RedJumpOne: common.Numeric, // #23119
      RedJumpTwo: common.Numeric, // #23131
      RedJumpThree: common.Numeric, // #23143
      RedJumpFour: common.Numeric, // #23155
      GreenJumpOne: common.Numeric, // #23167
      GreenJumpTwo: common.Numeric, // #23179
      GreenJumpThree: common.Numeric, // #23191
      GreenJumpFour: common.Numeric, // #23203
      BlueJumpOne: common.Numeric, // #23215
      BlueJumpTwo: common.Numeric, // #23227
      BlueJumpThree: common.Numeric, // #23239
      BlueJumpFour: common.Numeric, // #23251
      CompensateValue: common.Numeric, // #23263
      MinWidth: common.Int32, // #23275
      OEHiLevel: common.Int32, // #23287
      OELoLevel: common.Int32, // #23299
      ClockPhase: common.Int32, // #23311
      ShadowZone: common.Int32, // #23323
      ShadowZeroVal0: common.Int32, // #23335
      ShadowZeroVal1: common.Int32, // #23347
      ShadowZeroVal2: common.Int32, // #23359
      RowShadow: common.Int32, // #23371
      LineCharge: common.Int32, // #23383
      ShadowThree: common.Int32, // #23395
      ErrorBegin: common.Int32, // #23407
      IsNewPcbVersion: common.Bool, // #23419
      ModeValue: common.Int32, // #23443
      IsLineShadowOK: common.Bool, // #23455
      IsRowSwitch: common.Bool, // #23467
      SelectRowSwitch: common.Int32, // #23479
      Select32Port: common.Int32, // #23491
      FirstLineRed: common.Int32, // #23503
      FirstLineGreen: common.Int32, // #23515
      FirstLineBlue: common.Int32, // #23527
      CurrentRed: common.Int32, // #23539
      CurrentGreen: common.Int32, // #23551
      CurrentBlue: common.Int32, // #23563
      RDataPhase: common.Int32, // #23575
      GDataPhase: common.Int32, // #23587
      BDataPhase: common.Int32, // #23599
      HighFrequenceStatus: common.Int32, // #23611
      Mode9739: common.Int32, // #23623
      PassThroughMode: common.Int32, // #23635
      FixValue: common.Int32, // #23647
      ROScale: common.Numeric, // #23659
      ColUpVoltageOne: common.Int32, // #23671
      ColUpVoltageTwo: common.Int32, // #23683
      ColUpVoltageThree: common.Int32, // #23695
      CurrentThresholdVoltateOne: common.Int32, // #23707
      CurrentThresholdVoltateTwo: common.Int32, // #23719
      CurrentThresholdVoltateThree: common.Int32, // #23731
      RowEliminateModeOne: common.Int32, // #23743
      RowEliminateModeTwo: common.Int32, // #23755
      RowEliminateModeThree: common.Int32, // #23767
      RowDownVoltagePointOne: common.Int32, // #23779
      RowDownVoltagePointTwo: common.Int32, // #23791
      RowDownVoltagePointThree: common.Int32, // #23803
      RowDownVoltageClampPointOne: common.Int32, // #23815
      RowDownVoltageClampPointTwo: common.Int32, // #23827
      RowDownVoltageClampPointThree: common.Int32, // #23839
      StartColorOne: common.Int32, // #23851
      StartColorTwo: common.Int32, // #23863
      StartColorThree: common.Int32, // #23875
      StartColorFour: common.Int32, // #23887
      StartScanOne: common.Int32, // #23899
      StartScanTwo: common.Int32, // #23911
      StartScanThree: common.Int32, // #23923
      StartScanFour: common.Int32, // #23935
      DutyRation: common.Int32, // #23959
      RowMergeMode: common.Int32, // #23971
      RowBankVoltageRed: common.Int32, // #23983
      RowBankVoltageGreen: common.Int32, // #23995
      RowBankVoltageBlue: common.Int32, // #24007
      BackMode: common.Int32, // #24019
      LineClockPhase: common.Int32, // #24031
      LineDutyCycle: common.Int32, // #24055
      LineOutPutDalay: common.Int32, // #24067
      TotalNumber: common.Int32, // #24079
      RowJiangPing: common.Int32, // #24091
      ROpenDetection: common.Int32, // #24103
      GOpenDetection: common.Int32, // #24115
      BOpenDetection: common.Int32,
    }),
  ],
  'LS9920Data'
);
export interface LS9920Data extends t.TypeOf<typeof LS9920Data> {}
