import * as t from 'io-ts';
import * as common from '../lib/common';
/**
 * Codec for interface {@link LS9961Data}
 * @category Codecs
 * @see Automatically generated from ../decompiled/Nova.LCT.GigabitSystem.DataClass.decompiled.cs:24281
 */
export const LS9961Data = t.intersection(
  [
    t.type({
      BitsNum: common.Int32_2, // #24622
      SubFrameNum: common.Int32_3, // #24658
      FriedFreuquance: common.Int32_60, // #24682
      ShiftClockList: common.XMLArray(common.Numeric, 'double'), // #24718
      StarRefreshRateList: common.XMLArray(common.Int32, 'int'), // #24742
      MaxRefreshRateList: common.XMLArray(common.Int32, 'int'), // #24766
      HighNumberList: common.XMLArray(common.Int32, 'int'), // #24934
      ConnnectUnitCount: common.Int32_1, // #24958
      ICNumberOrder: common.string_empty, // #25270
      ModeList: common.XMLArray(t.string, 'string'), // #25894
      DutyRationList: common.XMLArray(common.Numeric, 'double'), // #25930
      BankPresetList: common.XMLArray(t.string, 'string'), // #25942
      BankPresetStr: common.string_empty, // #26026
      LineDutyCycleList: common.XMLArray(common.Numeric, 'double'), // #26098
      Value3DMax: common.Int32_4559,
    }),
    t.partial({
      RGBSQ: common.Int32, // #24550
      PmData: common.Base64, // #24562
      DmFirstData: common.Base64, // #24574
      DmSecondData: common.Base64, // #24586
      DmThridData: common.Base64, // #24598
      LS9961OEData: common.Base64, // #24634
      Factor: common.Int32, // #24646
      FrequenceDivsion: common.Int32, // #24670
      SystemClock: common.Int32, // #24694
      ShiftClock: common.Numeric, // #24706
      StarRefreshRate: common.Int32, // #24730
      MaxRefreshRate: common.Int32, // #24754
      HighNumber: common.Int32, // #24778
      PositiveScan: common.Int32, // #24790
      NegetiveScan: common.Int32, // #24802
      BrightnessEfficiency: common.Int32, // #24814
      ShiftLenth: common.Int32, // #24826
      ScanType: common.Int32, // #24838
      GammaStartValue: common.Int32, // #24850
      GammaMaxValue: common.Int32, // #24862
      GammaShift: common.Int32, // #24874
      GameTable: common.Base64, // #24886
      ContrastValue: common.Int32, // #24898
      MaxBrightness: common.Int32, // #24910
      IsSimplyfy: common.Bool, // #24922
      ErrorBegin: common.Int32, // #24946
      UnitIcCount: common.Int32, // #24970
      RedJumpOne: common.Numeric, // #24982
      RedJumpTwo: common.Numeric, // #24994
      RedJumpThree: common.Numeric, // #25006
      RedJumpFour: common.Numeric, // #25018
      GreenJumpOne: common.Numeric, // #25030
      GreenJumpTwo: common.Numeric, // #25042
      GreenJumpThree: common.Numeric, // #25054
      GreenJumpFour: common.Numeric, // #25066
      BlueJumpOne: common.Numeric, // #25078
      BlueJumpTwo: common.Numeric, // #25090
      BlueJumpThree: common.Numeric, // #25102
      BlueJumpFour: common.Numeric, // #25114
      CompensateValue: common.Numeric, // #25126
      MinWidth: common.Int32, // #25138
      OEHiLevel: common.Int32, // #25150
      OELoLevel: common.Int32, // #25162
      ClockPhase: common.Int32, // #25174
      ShadowZone: common.Int32, // #25186
      ShadowZeroVal0: common.Int32, // #25198
      ShadowZeroVal1: common.Int32, // #25210
      ShadowZeroVal2: common.Int32, // #25222
      RowShadow: common.Int32, // #25234
      LineCharge: common.Int32, // #25246
      ShadowThree: common.Int32, // #25258
      ModeValue: common.Int32, // #25282
      IsLineShadowOK: common.Bool, // #25294
      IsRowSwitch: common.Bool, // #25306
      SelectRowSwitch: common.Int32, // #25318
      Select32Port: common.Int32, // #25330
      FirstLineRed: common.Int32, // #25342
      FirstLineGreen: common.Int32, // #25354
      FirstLineBlue: common.Int32, // #25366
      CurrentRed: common.Int32, // #25378
      CurrentGreen: common.Int32, // #25390
      CurrentBlue: common.Int32, // #25402
      RDataPhase: common.Int32, // #25414
      GDataPhase: common.Int32, // #25426
      BDataPhase: common.Int32, // #25438
      HighFrequenceStatus: common.Int32, // #25450
      Mode9739: common.Int32, // #25462
      PassThroughMode: common.Int32, // #25474
      FixValue: common.Int32, // #25486
      ROScale: common.Numeric, // #25498
      ColEliminateUpPointOne: common.Int32, // #25510
      ColEliminateUpPointTwo: common.Int32, // #25522
      ColEliminateUpPointThree: common.Int32, // #25534
      ColUpVoltageOne: common.Int32, // #25546
      ColUpVoltageTwo: common.Int32, // #25558
      ColUpVoltageThree: common.Int32, // #25570
      CurrentThresholdVoltateOne: common.Int32, // #25582
      CurrentThresholdVoltateTwo: common.Int32, // #25594
      CurrentThresholdVoltateThree: common.Int32, // #25606
      ColUpDriveOne: common.Int32, // #25618
      ColUpDriveTwo: common.Int32, // #25630
      ColUpDriveThree: common.Int32, // #25642
      ModePinControlOne: common.Int32, // #25654
      ModePinControlTwo: common.Int32, // #25666
      ModePinControlThree: common.Int32, // #25678
      RowEliminateModeOne: common.Int32, // #25690
      RowEliminateModeTwo: common.Int32, // #25702
      RowEliminateModeThree: common.Int32, // #25714
      RowDownVoltagePointOne: common.Int32, // #25726
      RowDownVoltagePointTwo: common.Int32, // #25738
      RowDownVoltagePointThree: common.Int32, // #25750
      RowDownVoltageClampPointOne: common.Int32, // #25762
      RowDownVoltageClampPointTwo: common.Int32, // #25774
      RowDownVoltageClampPointThree: common.Int32, // #25786
      StartColorOne: common.Int32, // #25798
      StartColorTwo: common.Int32, // #25810
      StartColorThree: common.Int32, // #25822
      StartColorFour: common.Int32, // #25834
      StartScanOne: common.Int32, // #25846
      StartScanTwo: common.Int32, // #25858
      StartScanThree: common.Int32, // #25870
      StartScanFour: common.Int32, // #25882
      DutyRation: common.Int32, // #25906
      RowMergeMode: common.Int32, // #25918
      BankPreset: common.Int32, // #25954
      RowBankVoltageRed: common.Int32, // #25966
      RowBankVoltageGreen: common.Int32, // #25978
      RowBankVoltageBlue: common.Int32, // #25990
      BackMode: common.Int32, // #26002
      LineClockPhase: common.Int32, // #26014
      LineDutyCycle: common.Int32, // #26038
      LineOutPutDalay: common.Int32, // #26050
      TotalNumber: common.Int32, // #26062
      RowJiangPing: common.Int32, // #26074
      IsLowPower: common.Bool, // #26086
      Value3D: common.Int32,
    }),
  ],
  'LS9961Data'
);
export interface LS9961Data extends t.TypeOf<typeof LS9961Data> {}
