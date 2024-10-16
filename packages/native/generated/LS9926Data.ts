import * as t from 'io-ts';
import * as common from '../lib/common';
/**
 * Codec for interface {@link LS9926Data}
 * @category Codecs
 * @see Automatically generated from ../decompiled/Nova.LCT.GigabitSystem.DataClass.decompiled.cs:14697
 */
export const LS9926Data = t.intersection(
  [
    t.type({
      BitsNum: common.Int32_2, // #15046
      SubFrameNum: common.Int32_3, // #15082
      FriedFreuquance: common.Int32_60, // #15106
      ShiftClockList: common.XMLArray(common.Numeric, 'double'), // #15142
      StarRefreshRateList: common.XMLArray(common.Int32, 'int'), // #15166
      MaxRefreshRateList: common.XMLArray(common.Int32, 'int'), // #15190
      HighNumberList: common.XMLArray(common.Int32, 'int'), // #15310
      GammaValue: common.Numeric_28, // #15689
      ModeList: common.XMLArray(t.string, 'string'), // #16313
      DutyRationList: common.XMLArray(common.Numeric, 'double'), // #16349
      BankPresetList: common.XMLArray(t.string, 'string'), // #16361
      BankPresetStr: common.string_empty, // #16445
      LineDutyCycleList: common.XMLArray(common.Numeric, 'double'), // #16577
      Value3DMax: common.Int32_4559,
    }),
    t.partial({
      RGBSQ: common.Int32, // #14974
      PmData: common.Base64, // #14986
      DmFirstData: common.Base64, // #14998
      DmSecondData: common.Base64, // #15010
      DmThridData: common.Base64, // #15022
      LS9926OEData: common.Base64, // #15058
      Factor: common.Int32, // #15070
      FrequenceDivsion: common.Int32, // #15094
      SystemClock: common.Int32, // #15118
      ShiftClock: common.Numeric, // #15130
      StarRefreshRate: common.Int32, // #15154
      MaxRefreshRate: common.Int32, // #15178
      HighNumber: common.Int32, // #15202
      PositiveScan: common.Int32, // #15214
      NegetiveScan: common.Int32, // #15226
      BrightnessEfficiency: common.Int32, // #15238
      ShiftLenth: common.Int32, // #15250
      ScanType: common.Int32, // #15262
      GammaStartValue: common.Int32, // #15274
      GammaMaxValue: common.Int32, // #15286
      GammaShift: common.Int32, // #15298
      GameTable: common.Base64, // #15322
      ContrastValue: common.Int32, // #15341
      MaxBrightness: common.Int32, // #15353
      IsSimplyfy: common.Bool, // #15365
      RedJumpOne: common.Numeric, // #15377
      RedJumpTwo: common.Numeric, // #15389
      RedJumpThree: common.Numeric, // #15401
      RedJumpFour: common.Numeric, // #15413
      GreenJumpOne: common.Numeric, // #15425
      GreenJumpTwo: common.Numeric, // #15437
      GreenJumpThree: common.Numeric, // #15449
      GreenJumpFour: common.Numeric, // #15461
      BlueJumpOne: common.Numeric, // #15473
      BlueJumpTwo: common.Numeric, // #15485
      BlueJumpThree: common.Numeric, // #15497
      BlueJumpFour: common.Numeric, // #15509
      CompensateValue: common.Numeric, // #15521
      MinWidth: common.Int32, // #15533
      OEHiLevel: common.Int32, // #15545
      OELoLevel: common.Int32, // #15557
      ClockPhase: common.Int32, // #15569
      ShadowZone: common.Int32, // #15581
      ShadowZeroVal0: common.Int32, // #15593
      ShadowZeroVal1: common.Int32, // #15605
      ShadowZeroVal2: common.Int32, // #15617
      RowShadow: common.Int32, // #15629
      LineCharge: common.Int32, // #15641
      ShadowThree: common.Int32, // #15653
      ErrorBegin: common.Int32, // #15665
      IsNewPcbVersion: common.Bool, // #15677
      ModeValue: common.Int32, // #15701
      IsLineShadowOK: common.Bool, // #15713
      IsRowSwitch: common.Bool, // #15725
      SelectRowSwitch: common.Int32, // #15737
      Select32Port: common.Int32, // #15749
      FirstLineRed: common.Int32, // #15761
      FirstLineGreen: common.Int32, // #15773
      FirstLineBlue: common.Int32, // #15785
      CurrentRed: common.Int32, // #15797
      CurrentGreen: common.Int32, // #15809
      CurrentBlue: common.Int32, // #15821
      RDataPhase: common.Int32, // #15833
      GDataPhase: common.Int32, // #15845
      BDataPhase: common.Int32, // #15857
      HighFrequenceStatus: common.Int32, // #15869
      Mode9739: common.Int32, // #15881
      PassThroughMode: common.Int32, // #15893
      FixValue: common.Int32, // #15905
      ROScale: common.Numeric, // #15917
      ColEliminateUpPointOne: common.Int32, // #15929
      ColEliminateUpPointTwo: common.Int32, // #15941
      ColEliminateUpPointThree: common.Int32, // #15953
      ColUpVoltageOne: common.Int32, // #15965
      ColUpVoltageTwo: common.Int32, // #15977
      ColUpVoltageThree: common.Int32, // #15989
      CurrentThresholdVoltateOne: common.Int32, // #16001
      CurrentThresholdVoltateTwo: common.Int32, // #16013
      CurrentThresholdVoltateThree: common.Int32, // #16025
      ColUpDriveOne: common.Int32, // #16037
      ColUpDriveTwo: common.Int32, // #16049
      ColUpDriveThree: common.Int32, // #16061
      ModePinControlOne: common.Int32, // #16073
      ModePinControlTwo: common.Int32, // #16085
      ModePinControlThree: common.Int32, // #16097
      RowEliminateModeOne: common.Int32, // #16109
      RowEliminateModeTwo: common.Int32, // #16121
      RowEliminateModeThree: common.Int32, // #16133
      RowDownVoltagePointOne: common.Int32, // #16145
      RowDownVoltagePointTwo: common.Int32, // #16157
      RowDownVoltagePointThree: common.Int32, // #16169
      RowDownVoltageClampPointOne: common.Int32, // #16181
      RowDownVoltageClampPointTwo: common.Int32, // #16193
      RowDownVoltageClampPointThree: common.Int32, // #16205
      StartColorOne: common.Int32, // #16217
      StartColorTwo: common.Int32, // #16229
      StartColorThree: common.Int32, // #16241
      StartColorFour: common.Int32, // #16253
      StartScanOne: common.Int32, // #16265
      StartScanTwo: common.Int32, // #16277
      StartScanThree: common.Int32, // #16289
      StartScanFour: common.Int32, // #16301
      DutyRation: common.Int32, // #16325
      RowMergeMode: common.Int32, // #16337
      BankPreset: common.Int32, // #16373
      RowBankVoltageRed: common.Int32, // #16385
      RowBankVoltageGreen: common.Int32, // #16397
      RowBankVoltageBlue: common.Int32, // #16409
      BackMode: common.Int32, // #16421
      LineClockPhase: common.Int32, // #16433
      LineDutyCycle: common.Int32, // #16457
      LineOutPutDalay: common.Int32, // #16469
      TotalNumber: common.Int32, // #16481
      RowJiangPing: common.Int32, // #16493
      CurFlashIndex: common.Int32, // #16505
      CurFlashTotal: common.Int32, // #16517
      CurLeakageIndex: common.Int32, // #16529
      CurLeakageTotal: common.Int32, // #16541
      CurGrayIndex: common.Int32, // #16553
      CurGrayTotal: common.Int32, // #16565
      Value3D: common.Int32,
    }),
  ],
  'LS9926Data'
);
export interface LS9926Data extends t.TypeOf<typeof LS9926Data> {}
