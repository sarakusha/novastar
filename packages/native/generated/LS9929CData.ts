import * as t from 'io-ts';
import * as common from '../lib/common';
/**
 * Codec for interface {@link LS9929CData}
 * @category Codecs
 * @see Automatically generated from ../decompiled/Nova.LCT.GigabitSystem.DataClass.decompiled.cs:4618
 */
export const LS9929CData = t.intersection(
  [
    t.type({
      BitsNum: common.Int32_2, // #4967
      SubFrameNum: common.Int32_3, // #5003
      FriedFreuquance: common.Int32_60, // #5027
      ShiftClockList: common.XMLArray(common.Numeric, 'double'), // #5063
      StarRefreshRateList: common.XMLArray(common.Int32, 'int'), // #5087
      MaxRefreshRateList: common.XMLArray(common.Int32, 'int'), // #5111
      HighNumberList: common.XMLArray(common.Int32, 'int'), // #5231
      GammaValue: common.Numeric_28, // #5586
      ModeList: common.XMLArray(t.string, 'string'), // #6210
      DutyRationList: common.XMLArray(common.Numeric, 'double'), // #6246
      BankPresetList: common.XMLArray(t.string, 'string'), // #6258
      BankPresetStr: common.string_empty, // #6342
      LineDutyCycleList: common.XMLArray(common.Numeric, 'double'), // #6462
      Value3DMax: common.Int32_4559,
    }),
    t.partial({
      RGBSQ: common.Int32, // #4895
      PmData: common.Base64, // #4907
      DmFirstData: common.Base64, // #4919
      DmSecondData: common.Base64, // #4931
      DmThridData: common.Base64, // #4943
      LS9929COEData: common.Base64, // #4979
      Factor: common.Int32, // #4991
      FrequenceDivsion: common.Int32, // #5015
      SystemClock: common.Int32, // #5039
      ShiftClock: common.Numeric, // #5051
      StarRefreshRate: common.Int32, // #5075
      MaxRefreshRate: common.Int32, // #5099
      HighNumber: common.Int32, // #5123
      PositiveScan: common.Int32, // #5135
      NegetiveScan: common.Int32, // #5147
      BrightnessEfficiency: common.Int32, // #5159
      ShiftLenth: common.Int32, // #5171
      ScanType: common.Int32, // #5183
      GammaStartValue: common.Int32, // #5195
      GammaMaxValue: common.Int32, // #5207
      GammaShift: common.Int32, // #5219
      GameTable: common.Base64, // #5243
      ContrastValue: common.Int32, // #5262
      MaxBrightness: common.Int32, // #5274
      RedJumpOne: common.Numeric, // #5286
      RedJumpTwo: common.Numeric, // #5298
      RedJumpThree: common.Numeric, // #5310
      RedJumpFour: common.Numeric, // #5322
      GreenJumpOne: common.Numeric, // #5334
      GreenJumpTwo: common.Numeric, // #5346
      GreenJumpThree: common.Numeric, // #5358
      GreenJumpFour: common.Numeric, // #5370
      BlueJumpOne: common.Numeric, // #5382
      BlueJumpTwo: common.Numeric, // #5394
      BlueJumpThree: common.Numeric, // #5406
      BlueJumpFour: common.Numeric, // #5418
      CompensateValue: common.Numeric, // #5430
      MinWidth: common.Int32, // #5442
      OEHiLevel: common.Int32, // #5454
      OELoLevel: common.Int32, // #5466
      ClockPhase: common.Int32, // #5478
      ShadowZone: common.Int32, // #5490
      ShadowZeroVal0: common.Int32, // #5502
      ShadowZeroVal1: common.Int32, // #5514
      ShadowZeroVal2: common.Int32, // #5526
      RowShadow: common.Int32, // #5538
      LineCharge: common.Int32, // #5550
      ShadowThree: common.Int32, // #5562
      ErrorBegin: common.Int32, // #5574
      ModeValue: common.Int32, // #5598
      IsLineShadowOK: common.Bool, // #5610
      IsRowSwitch: common.Bool, // #5622
      SelectRowSwitch: common.Int32, // #5634
      Select32Port: common.Int32, // #5646
      FirstLineRed: common.Int32, // #5658
      FirstLineGreen: common.Int32, // #5670
      FirstLineBlue: common.Int32, // #5682
      CurrentRed: common.Int32, // #5694
      CurrentGreen: common.Int32, // #5706
      CurrentBlue: common.Int32, // #5718
      RDataPhase: common.Int32, // #5730
      GDataPhase: common.Int32, // #5742
      BDataPhase: common.Int32, // #5754
      HighFrequenceStatus: common.Int32, // #5766
      Mode9739: common.Int32, // #5778
      PassThroughMode: common.Int32, // #5790
      FixValue: common.Int32, // #5802
      ROScale: common.Numeric, // #5814
      ColEliminateUpPointOne: common.Int32, // #5826
      ColEliminateUpPointTwo: common.Int32, // #5838
      ColEliminateUpPointThree: common.Int32, // #5850
      ColUpVoltageOne: common.Int32, // #5862
      ColUpVoltageTwo: common.Int32, // #5874
      ColUpVoltageThree: common.Int32, // #5886
      CurrentThresholdVoltateOne: common.Int32, // #5898
      CurrentThresholdVoltateTwo: common.Int32, // #5910
      CurrentThresholdVoltateThree: common.Int32, // #5922
      ColUpDriveOne: common.Int32, // #5934
      ColUpDriveTwo: common.Int32, // #5946
      ColUpDriveThree: common.Int32, // #5958
      ModePinControlOne: common.Int32, // #5970
      ModePinControlTwo: common.Int32, // #5982
      ModePinControlThree: common.Int32, // #5994
      RowEliminateModeOne: common.Int32, // #6006
      RowEliminateModeTwo: common.Int32, // #6018
      RowEliminateModeThree: common.Int32, // #6030
      RowDownVoltagePointOne: common.Int32, // #6042
      RowDownVoltagePointTwo: common.Int32, // #6054
      RowDownVoltagePointThree: common.Int32, // #6066
      RowDownVoltageClampPointOne: common.Int32, // #6078
      RowDownVoltageClampPointTwo: common.Int32, // #6090
      RowDownVoltageClampPointThree: common.Int32, // #6102
      StartColorOne: common.Int32, // #6114
      StartColorTwo: common.Int32, // #6126
      StartColorThree: common.Int32, // #6138
      StartColorFour: common.Int32, // #6150
      StartScanOne: common.Int32, // #6162
      StartScanTwo: common.Int32, // #6174
      StartScanThree: common.Int32, // #6186
      StartScanFour: common.Int32, // #6198
      DutyRation: common.Int32, // #6222
      RowMergeMode: common.Int32, // #6234
      BankPreset: common.Int32, // #6270
      RowBankVoltageRed: common.Int32, // #6282
      RowBankVoltageGreen: common.Int32, // #6294
      RowBankVoltageBlue: common.Int32, // #6306
      BackMode: common.Int32, // #6318
      LineClockPhase: common.Int32, // #6330
      LineDutyCycle: common.Int32, // #6354
      LineOutPutDalay: common.Int32, // #6366
      TotalNumber: common.Int32, // #6378
      RowJiangPing: common.Int32, // #6390
      IsLowPower: common.Bool, // #6402
      CurLeakageIndex: common.Int32, // #6414
      CurLeakageTotal: common.Int32, // #6426
      CurGrayIndex: common.Int32, // #6438
      CurGrayTotal: common.Int32, // #6450
      Value3D: common.Int32, // #6474
      IsSimplyfy: common.Bool, // #6486
      CurFlashIndex: common.Int32, // #6498
      CurFlashTotal: common.Int32,
    }),
  ],
  'LS9929CData'
);
export interface LS9929CData extends t.TypeOf<typeof LS9929CData> {}
