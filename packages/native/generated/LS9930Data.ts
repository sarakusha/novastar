import * as t from 'io-ts';
import * as common from '../lib/common';
/**
 * Codec for interface {@link LS9930Data}
 * @category Codecs
 * @see Automatically generated from ../decompiled/Nova.LCT.GigabitSystem.DataClass.decompiled.cs:16762
 */
export const LS9930Data = t.intersection(
  [
    t.type({
      BitsNum: common.Int32_2, // #17111
      SubFrameNum: common.Int32_3, // #17147
      FriedFreuquance: common.Int32_60, // #17171
      ShiftClockList: common.XMLArray(common.Numeric, 'double'), // #17207
      StarRefreshRateList: common.XMLArray(common.Int32, 'int'), // #17231
      MaxRefreshRateList: common.XMLArray(common.Int32, 'int'), // #17255
      HighNumberList: common.XMLArray(common.Int32, 'int'), // #17375
      GammaValue: common.Numeric_28, // #17730
      ModeList: common.XMLArray(t.string, 'string'), // #18354
      DutyRationList: common.XMLArray(common.Numeric, 'double'), // #18390
      BankPresetList: common.XMLArray(t.string, 'string'), // #18402
      BankPresetStr: common.string_empty, // #18486
      LineDutyCycleList: common.XMLArray(common.Numeric, 'double'), // #18606
      Value3DMax: common.Int32_4559,
    }),
    t.partial({
      RGBSQ: common.Int32, // #17039
      PmData: common.Base64, // #17051
      DmFirstData: common.Base64, // #17063
      DmSecondData: common.Base64, // #17075
      DmThridData: common.Base64, // #17087
      LS9930OEData: common.Base64, // #17123
      Factor: common.Int32, // #17135
      FrequenceDivsion: common.Int32, // #17159
      SystemClock: common.Int32, // #17183
      ShiftClock: common.Numeric, // #17195
      StarRefreshRate: common.Int32, // #17219
      MaxRefreshRate: common.Int32, // #17243
      HighNumber: common.Int32, // #17267
      PositiveScan: common.Int32, // #17279
      NegetiveScan: common.Int32, // #17291
      BrightnessEfficiency: common.Int32, // #17303
      ShiftLenth: common.Int32, // #17315
      ScanType: common.Int32, // #17327
      GammaStartValue: common.Int32, // #17339
      GammaMaxValue: common.Int32, // #17351
      GammaShift: common.Int32, // #17363
      GameTable: common.Base64, // #17387
      ContrastValue: common.Int32, // #17406
      MaxBrightness: common.Int32, // #17418
      RedJumpOne: common.Numeric, // #17430
      RedJumpTwo: common.Numeric, // #17442
      RedJumpThree: common.Numeric, // #17454
      RedJumpFour: common.Numeric, // #17466
      GreenJumpOne: common.Numeric, // #17478
      GreenJumpTwo: common.Numeric, // #17490
      GreenJumpThree: common.Numeric, // #17502
      GreenJumpFour: common.Numeric, // #17514
      BlueJumpOne: common.Numeric, // #17526
      BlueJumpTwo: common.Numeric, // #17538
      BlueJumpThree: common.Numeric, // #17550
      BlueJumpFour: common.Numeric, // #17562
      CompensateValue: common.Numeric, // #17574
      MinWidth: common.Int32, // #17586
      OEHiLevel: common.Int32, // #17598
      OELoLevel: common.Int32, // #17610
      ClockPhase: common.Int32, // #17622
      ShadowZone: common.Int32, // #17634
      ShadowZeroVal0: common.Int32, // #17646
      ShadowZeroVal1: common.Int32, // #17658
      ShadowZeroVal2: common.Int32, // #17670
      RowShadow: common.Int32, // #17682
      LineCharge: common.Int32, // #17694
      ShadowThree: common.Int32, // #17706
      ErrorBegin: common.Int32, // #17718
      ModeValue: common.Int32, // #17742
      IsLineShadowOK: common.Bool, // #17754
      IsRowSwitch: common.Bool, // #17766
      SelectRowSwitch: common.Int32, // #17778
      Select32Port: common.Int32, // #17790
      FirstLineRed: common.Int32, // #17802
      FirstLineGreen: common.Int32, // #17814
      FirstLineBlue: common.Int32, // #17826
      CurrentRed: common.Int32, // #17838
      CurrentGreen: common.Int32, // #17850
      CurrentBlue: common.Int32, // #17862
      RDataPhase: common.Int32, // #17874
      GDataPhase: common.Int32, // #17886
      BDataPhase: common.Int32, // #17898
      HighFrequenceStatus: common.Int32, // #17910
      Mode9739: common.Int32, // #17922
      PassThroughMode: common.Int32, // #17934
      FixValue: common.Int32, // #17946
      ROScale: common.Numeric, // #17958
      ColEliminateUpPointOne: common.Int32, // #17970
      ColEliminateUpPointTwo: common.Int32, // #17982
      ColEliminateUpPointThree: common.Int32, // #17994
      ColUpVoltageOne: common.Int32, // #18006
      ColUpVoltageTwo: common.Int32, // #18018
      ColUpVoltageThree: common.Int32, // #18030
      CurrentThresholdVoltateOne: common.Int32, // #18042
      CurrentThresholdVoltateTwo: common.Int32, // #18054
      CurrentThresholdVoltateThree: common.Int32, // #18066
      ColUpDriveOne: common.Int32, // #18078
      ColUpDriveTwo: common.Int32, // #18090
      ColUpDriveThree: common.Int32, // #18102
      ModePinControlOne: common.Int32, // #18114
      ModePinControlTwo: common.Int32, // #18126
      ModePinControlThree: common.Int32, // #18138
      RowEliminateModeOne: common.Int32, // #18150
      RowEliminateModeTwo: common.Int32, // #18162
      RowEliminateModeThree: common.Int32, // #18174
      RowDownVoltagePointOne: common.Int32, // #18186
      RowDownVoltagePointTwo: common.Int32, // #18198
      RowDownVoltagePointThree: common.Int32, // #18210
      RowDownVoltageClampPointOne: common.Int32, // #18222
      RowDownVoltageClampPointTwo: common.Int32, // #18234
      RowDownVoltageClampPointThree: common.Int32, // #18246
      StartColorOne: common.Int32, // #18258
      StartColorTwo: common.Int32, // #18270
      StartColorThree: common.Int32, // #18282
      StartColorFour: common.Int32, // #18294
      StartScanOne: common.Int32, // #18306
      StartScanTwo: common.Int32, // #18318
      StartScanThree: common.Int32, // #18330
      StartScanFour: common.Int32, // #18342
      DutyRation: common.Int32, // #18366
      RowMergeMode: common.Int32, // #18378
      BankPreset: common.Int32, // #18414
      RowBankVoltageRed: common.Int32, // #18426
      RowBankVoltageGreen: common.Int32, // #18438
      RowBankVoltageBlue: common.Int32, // #18450
      BackMode: common.Int32, // #18462
      LineClockPhase: common.Int32, // #18474
      LineDutyCycle: common.Int32, // #18498
      LineOutPutDalay: common.Int32, // #18510
      TotalNumber: common.Int32, // #18522
      RowJiangPing: common.Int32, // #18534
      IsLowPower: common.Bool, // #18546
      CurLeakageIndex: common.Int32, // #18558
      CurLeakageTotal: common.Int32, // #18570
      CurGrayIndex: common.Int32, // #18582
      CurGrayTotal: common.Int32, // #18594
      Value3D: common.Int32, // #18618
      IsSimplyfy: common.Bool, // #18630
      CurFlashIndex: common.Int32, // #18642
      CurFlashTotal: common.Int32,
    }),
  ],
  'LS9930Data'
);
export interface LS9930Data extends t.TypeOf<typeof LS9930Data> {}
