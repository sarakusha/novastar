import * as t from 'io-ts';
import * as common from '../lib/common';
import { ChipBaseExtendPropey } from './ChipBaseExtendPropey';
 // import
export const ChipLS9903ExtendPropertyBase = t.intersection(
  [
    ChipBaseExtendPropey,
    t.type({
      RGBSQ: common.Int32_0, // #3451
      BitsNum: common.Int32_16, // #3454
      SubFrameNum: common.Int32_1, // #3457
      Factor: common.Int32_0, // #3460
      FrequenceDivsion: common.Int32_0, // #3463
      FriedFreuquance: common.Int32_60, // #3466
      SystemClock: common.Int32_0, // #3469
      ShiftClockList: common.XMLArray(common.Numeric, 'double'), // #3472
      ShiftClock: common.Numeric_0, // #3475
      StarRefreshRate: common.Int32_0, // #3478
      StarRefreshRateList: common.XMLArray(common.Int32, 'int'), // #3481
      MaxRefreshRate: common.Int32_0, // #3484
      MaxRefreshRateList: common.XMLArray(common.Int32, 'int'), // #3487
      HighNumber: common.Int32_0, // #3490
      HighNumberList: common.XMLArray(common.Int32, 'int'), // #3493
      PositiveScan: common.Int32_0, // #3496
      NegetiveScan: common.Int32_0, // #3499
      BrightnessEfficiency: common.Int32_0, // #3502
      ShiftLenth: common.Int32_0, // #3505
      ScanType: common.Int32_0, // #3508
      GammaStartValue: common.Int32_0, // #3511
      GammaMaxValue: common.Int32_0, // #3514
      GammaShift: common.Int32_0, // #3520
      GammaValue: common.Numeric_28, // #3523
      ContrastValue: common.Int32_0, // #3542
      MaxBrightness: common.Int32_0, // #3548
      RedJumpOne: common.Numeric_0, // #3550
      RedJumpTwo: common.Numeric_0, // #3553
      RedJumpThree: common.Numeric_0, // #3556
      RedJumpFour: common.Numeric_0, // #3559
      GreenJumpOne: common.Numeric_0, // #3562
      GreenJumpTwo: common.Numeric_0, // #3565
      GreenJumpThree: common.Numeric_0, // #3568
      GreenJumpFour: common.Numeric_0, // #3571
      BlueJumpOne: common.Numeric_0, // #3574
      BlueJumpTwo: common.Numeric_0, // #3577
      BlueJumpThree: common.Numeric_0, // #3580
      BlueJumpFour: common.Numeric_0, // #3583
      RedCompsentionOne: common.Numeric_0, // #3586
      GreenCompsentionOne: common.Numeric_0, // #3589
      BlueCompsentionOne: common.Numeric_0, // #3592
      CompensateValue: common.Numeric_0, // #3595
      MinWidth: common.Int32_0, // #3598
      OEHiLevel: common.Int32_0, // #3601
      OELoLevel: common.Int32_0, // #3604
      ClockPhase: common.Int32_0, // #3607
      ShadowZone: common.Int32_0, // #3610
      ShadowZeroVal0: common.Int32_0, // #3613
      ShadowZeroVal1: common.Int32_0, // #3616
      ShadowZeroVal2: common.Int32_0, // #3619
      RowShadow: common.Int32_0, // #3622
      LineCharge: common.Int32_0, // #3625
      ShadowThree: common.Int32_0, // #3628
      ErrorBegin: common.Int32_0, // #3631
      IsNewPcbVersion: common.Bool_false, // #3634
      ModeValue: common.Int32_0, // #3637
      ModeList: common.XMLArray(t.string, 'string'), // #3640
      IsLineShadowOK: common.Bool_false, // #3643
      IsRowSwitch: common.Bool_false, // #3646
      SelectRowSwitch: common.Int32_0, // #3649
      Select32Port: common.Int32_0, // #3652
      FirstLineRed: common.Int32_0, // #3655
      FirstLineGreen: common.Int32_0, // #3658
      FirstLineBlue: common.Int32_0, // #3661
      CurrentRed: common.Int32_0, // #3664
      CurrentGreen: common.Int32_0, // #3667
      CurrentBlue: common.Int32_0, // #3670
      RDataPhase: common.Int32_0, // #3673
      GDataPhase: common.Int32_0, // #3676
      BDataPhase: common.Int32_0, // #3679
      HighFrequenceStatus: common.Int32_0, // #3682
      Mode9739: common.Int32_0, // #3685
      PassThroughMode: common.Int32_0, // #3688
      FixValue: common.Int32_0, // #3691
      ROScale: common.Numeric_0, // #3694
      ColEliminateUpPointOne: common.Int32_0, // #3697
      ColEliminateUpPointTwo: common.Int32_0, // #3700
      ColEliminateUpPointThree: common.Int32_0, // #3703
      ColUpVoltageOne: common.Int32_0, // #3706
      ColUpVoltageTwo: common.Int32_0, // #3709
      ColUpVoltageThree: common.Int32_0, // #3712
      CurrentThresholdVoltateOne: common.Int32_0, // #3715
      CurrentThresholdVoltateTwo: common.Int32_0, // #3718
      CurrentThresholdVoltateThree: common.Int32_0, // #3721
      ColUpDriveOne: common.Int32_0, // #3724
      ColUpDriveTwo: common.Int32_0, // #3727
      ColUpDriveThree: common.Int32_0, // #3730
      ModePinControlOne: common.Int32_0, // #3733
      ModePinControlTwo: common.Int32_0, // #3736
      ModePinControlThree: common.Int32_0, // #3739
      RowEliminateModeOne: common.Int32_0, // #3742
      RowEliminateModeTwo: common.Int32_0, // #3745
      RowEliminateModeThree: common.Int32_0, // #3748
      RowDownVoltagePointOne: common.Int32_0, // #3751
      RowDownVoltagePointTwo: common.Int32_0, // #3754
      RowDownVoltagePointThree: common.Int32_0, // #3757
      RowDownVoltageClampPointOne: common.Int32_0, // #3760
      RowDownVoltageClampPointTwo: common.Int32_0, // #3763
      RowDownVoltageClampPointThree: common.Int32_0, // #3766
      StartColorOne: common.Int32_0, // #3769
      StartColorTwo: common.Int32_0, // #3772
      StartColorThree: common.Int32_0, // #3775
      StartColorFour: common.Int32_0, // #3778
      StartScanOne: common.Int32_0, // #3781
      StartScanTwo: common.Int32_0, // #3784
      StartScanThree: common.Int32_0, // #3787
      StartScanFour: common.Int32_0, // #3790
      DutyRation: common.Int32_0, // #3793
      DutyRationList: common.XMLArray(common.Numeric, 'double'), // #3796
      RowMergeMode: common.Int32_0, // #3799
      BankPreset: common.Int32_0, // #3802
      BankPresetList: common.XMLArray(t.string, 'string'), // #3805
      BankPresetStr: common.string_empty, // #3808
      RowBankVoltageRed: common.Int32_0, // #3811
      RowBankVoltageGreen: common.Int32_0, // #3814
      RowBankVoltageBlue: common.Int32_0, // #3817
      BackMode: common.Int32_0, // #3820
      LineClockPhase: common.Int32_0, // #3823
      LineDutyCycle: common.Int32_0, // #3826
      LineDutyCycleList: common.XMLArray(common.Numeric, 'double'), // #3829
      LineOutPutDalay: common.Int32_0, // #3832
      TotalNumber: common.Int32_0, // #3835
      RowJiangPing: common.Int32_0, // #3838
      CurFlashIndex: common.Int32_0, // #3841
      CurFlashTotal: common.Int32_0, // #3844
      CurLeakageIndex: common.Int32_0, // #3847
      CurLeakageTotal: common.Int32_0, // #3857
      Value3DMax: common.Int32_4559, // #3859
      RedOpenDetection: common.Int32_0, // #3862
      GreenOpenDetection: common.Int32_0, // #3865
      BlueOpenDetection: common.Int32_0, // #3868
      RedLowGrayFirstLine: common.Int32_0, // #3871
      GreenLowGrayFirstLine: common.Int32_0, // #3874
      BlueLowGrayFirstLine: common.Int32_0, // #3877
      RedPresentGain: common.Int32_0, // #3880
      GreenPresentGain: common.Int32_0, // #3883
      BluePresentGain: common.Int32_0, // #3886
      PreParamEnable: common.Bool_false, // #3889
      PreParamValue: common.Numeric_0, // #3892
      IsLowPower: common.Bool_false, // #3895
      GearCurrent: common.Int32_0,
    }),
    t.partial({
      PmData: new common.BufferFromBase64('PmData', 4096 /* IdentifierName */), // #3439
      DmFirstData: common.buffer_2048, // #3442
      DmSecondData: common.buffer_2048, // #3445
      DmThridData: common.buffer_2048, // #3448
      OEData: common.UInt8, // #3517
      GameTable: new common.BufferFromBase64('GameTable', 1536 /* IdentifierName */), // #3545
      IsSimplyfy: common.Bool, // #3850
      CurGrayIndex: common.Int32, // #3853
      CurGrayTotal: common.Int32, // #3855
      Value3D: common.Int32, // #3898
      DoubleClk: common.Int32, // #3901
      IsUseNewModule: common.Bool, // #3913
      ChipLibVersion: common.UInt8, // #3915
      ReadPMDataLen: common.Int32, // #3917
      ReadPMDataRegisterAddr: common.UInt32,
    }),
  ],
  'ChipLS9903ExtendPropertyBase'
);
/**
 * Codec for {@link ChipLS9903ExtendProperty}
 * @category Codecs
 * @see Automatically generated from ../decompiled/Nova.LCT.GigabitSystem.ChipLS9903.decompiled.cs:3401
 */
export const ChipLS9903ExtendProperty = t.intersection(
  [
    ChipLS9903ExtendPropertyBase,
    t.partial({ '@_xsi:type': t.literal('ChipLS9903ExtendProperty') }),
  ],
  'ChipLS9903ExtendProperty'
);
export interface ChipLS9903ExtendProperty extends t.TypeOf<typeof ChipLS9903ExtendProperty> {}
