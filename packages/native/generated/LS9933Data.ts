import * as t from 'io-ts';
import * as common from '../lib/common';
/**
 * Codec for interface {@link LS9933Data}
 * @category Codecs
 * @see Automatically generated from ../decompiled/Nova.LCT.GigabitSystem.DataClass.decompiled.cs:2553
 */
export const LS9933Data = t.intersection(
  [
    t.type({
      BitsNum: common.Int32_2, // #2902
      SubFrameNum: common.Int32_3, // #2938
      FriedFreuquance: common.Int32_60, // #2962
      ShiftClockList: common.XMLArray(common.Numeric, 'double'), // #2998
      StarRefreshRateList: common.XMLArray(common.Int32, 'int'), // #3022
      MaxRefreshRateList: common.XMLArray(common.Int32, 'int'), // #3046
      HighNumberList: common.XMLArray(common.Int32, 'int'), // #3166
      GammaValue: common.Numeric_28, // #3521
      ModeList: common.XMLArray(t.string, 'string'), // #4145
      DutyRationList: common.XMLArray(common.Numeric, 'double'), // #4181
      BankPresetList: common.XMLArray(t.string, 'string'), // #4193
      BankPresetStr: common.string_empty, // #4277
      LineDutyCycleList: common.XMLArray(common.Numeric, 'double'), // #4397
      Value3DMax: common.Int32_4559,
    }),
    t.partial({
      RGBSQ: common.Int32, // #2830
      PmData: common.Base64, // #2842
      DmFirstData: common.Base64, // #2854
      DmSecondData: common.Base64, // #2866
      DmThridData: common.Base64, // #2878
      LS9933OEData: common.Base64, // #2914
      Factor: common.Int32, // #2926
      FrequenceDivsion: common.Int32, // #2950
      SystemClock: common.Int32, // #2974
      ShiftClock: common.Numeric, // #2986
      StarRefreshRate: common.Int32, // #3010
      MaxRefreshRate: common.Int32, // #3034
      HighNumber: common.Int32, // #3058
      PositiveScan: common.Int32, // #3070
      NegetiveScan: common.Int32, // #3082
      BrightnessEfficiency: common.Int32, // #3094
      ShiftLenth: common.Int32, // #3106
      ScanType: common.Int32, // #3118
      GammaStartValue: common.Int32, // #3130
      GammaMaxValue: common.Int32, // #3142
      GammaShift: common.Int32, // #3154
      GameTable: common.Base64, // #3178
      ContrastValue: common.Int32, // #3197
      MaxBrightness: common.Int32, // #3209
      RedJumpOne: common.Numeric, // #3221
      RedJumpTwo: common.Numeric, // #3233
      RedJumpThree: common.Numeric, // #3245
      RedJumpFour: common.Numeric, // #3257
      GreenJumpOne: common.Numeric, // #3269
      GreenJumpTwo: common.Numeric, // #3281
      GreenJumpThree: common.Numeric, // #3293
      GreenJumpFour: common.Numeric, // #3305
      BlueJumpOne: common.Numeric, // #3317
      BlueJumpTwo: common.Numeric, // #3329
      BlueJumpThree: common.Numeric, // #3341
      BlueJumpFour: common.Numeric, // #3353
      CompensateValue: common.Numeric, // #3365
      MinWidth: common.Int32, // #3377
      OEHiLevel: common.Int32, // #3389
      OELoLevel: common.Int32, // #3401
      ClockPhase: common.Int32, // #3413
      ShadowZone: common.Int32, // #3425
      ShadowZeroVal0: common.Int32, // #3437
      ShadowZeroVal1: common.Int32, // #3449
      ShadowZeroVal2: common.Int32, // #3461
      RowShadow: common.Int32, // #3473
      LineCharge: common.Int32, // #3485
      ShadowThree: common.Int32, // #3497
      ErrorBegin: common.Int32, // #3509
      ModeValue: common.Int32, // #3533
      IsLineShadowOK: common.Bool, // #3545
      IsRowSwitch: common.Bool, // #3557
      SelectRowSwitch: common.Int32, // #3569
      Select32Port: common.Int32, // #3581
      FirstLineRed: common.Int32, // #3593
      FirstLineGreen: common.Int32, // #3605
      FirstLineBlue: common.Int32, // #3617
      CurrentRed: common.Int32, // #3629
      CurrentGreen: common.Int32, // #3641
      CurrentBlue: common.Int32, // #3653
      RDataPhase: common.Int32, // #3665
      GDataPhase: common.Int32, // #3677
      BDataPhase: common.Int32, // #3689
      HighFrequenceStatus: common.Int32, // #3701
      Mode9739: common.Int32, // #3713
      PassThroughMode: common.Int32, // #3725
      FixValue: common.Int32, // #3737
      ROScale: common.Numeric, // #3749
      ColEliminateUpPointOne: common.Int32, // #3761
      ColEliminateUpPointTwo: common.Int32, // #3773
      ColEliminateUpPointThree: common.Int32, // #3785
      ColUpVoltageOne: common.Int32, // #3797
      ColUpVoltageTwo: common.Int32, // #3809
      ColUpVoltageThree: common.Int32, // #3821
      CurrentThresholdVoltateOne: common.Int32, // #3833
      CurrentThresholdVoltateTwo: common.Int32, // #3845
      CurrentThresholdVoltateThree: common.Int32, // #3857
      ColUpDriveOne: common.Int32, // #3869
      ColUpDriveTwo: common.Int32, // #3881
      ColUpDriveThree: common.Int32, // #3893
      ModePinControlOne: common.Int32, // #3905
      ModePinControlTwo: common.Int32, // #3917
      ModePinControlThree: common.Int32, // #3929
      RowEliminateModeOne: common.Int32, // #3941
      RowEliminateModeTwo: common.Int32, // #3953
      RowEliminateModeThree: common.Int32, // #3965
      RowDownVoltagePointOne: common.Int32, // #3977
      RowDownVoltagePointTwo: common.Int32, // #3989
      RowDownVoltagePointThree: common.Int32, // #4001
      RowDownVoltageClampPointOne: common.Int32, // #4013
      RowDownVoltageClampPointTwo: common.Int32, // #4025
      RowDownVoltageClampPointThree: common.Int32, // #4037
      StartColorOne: common.Int32, // #4049
      StartColorTwo: common.Int32, // #4061
      StartColorThree: common.Int32, // #4073
      StartColorFour: common.Int32, // #4085
      StartScanOne: common.Int32, // #4097
      StartScanTwo: common.Int32, // #4109
      StartScanThree: common.Int32, // #4121
      StartScanFour: common.Int32, // #4133
      DutyRation: common.Int32, // #4157
      RowMergeMode: common.Int32, // #4169
      BankPreset: common.Int32, // #4205
      RowBankVoltageRed: common.Int32, // #4217
      RowBankVoltageGreen: common.Int32, // #4229
      RowBankVoltageBlue: common.Int32, // #4241
      BackMode: common.Int32, // #4253
      LineClockPhase: common.Int32, // #4265
      LineDutyCycle: common.Int32, // #4289
      LineOutPutDalay: common.Int32, // #4301
      TotalNumber: common.Int32, // #4313
      RowJiangPing: common.Int32, // #4325
      IsLowPower: common.Bool, // #4337
      CurLeakageIndex: common.Int32, // #4349
      CurLeakageTotal: common.Int32, // #4361
      CurGrayIndex: common.Int32, // #4373
      CurGrayTotal: common.Int32, // #4385
      Value3D: common.Int32, // #4409
      IsSimplyfy: common.Bool, // #4421
      CurFlashIndex: common.Int32, // #4433
      CurFlashTotal: common.Int32,
    }),
  ],
  'LS9933Data'
);
export interface LS9933Data extends t.TypeOf<typeof LS9933Data> {}
