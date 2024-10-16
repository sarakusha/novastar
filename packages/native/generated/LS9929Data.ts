import * as t from 'io-ts';
import * as common from '../lib/common';
/**
 * Codec for interface {@link LS9929Data}
 * @category Codecs
 * @see Automatically generated from ../decompiled/Nova.LCT.GigabitSystem.DataClass.decompiled.cs:9374
 */
export const LS9929Data = t.intersection(
  [
    t.type({
      BitsNum: common.Int32_2, // #9723
      SubFrameNum: common.Int32_3, // #9759
      FriedFreuquance: common.Int32_60, // #9783
      ShiftClockList: common.XMLArray(common.Numeric, 'double'), // #9819
      StarRefreshRateList: common.XMLArray(common.Int32, 'int'), // #9843
      MaxRefreshRateList: common.XMLArray(common.Int32, 'int'), // #9867
      HighNumberList: common.XMLArray(common.Int32, 'int'), // #9975
      GammaValue: common.Numeric_28, // #10366
      ModeList: common.XMLArray(t.string, 'string'), // #10990
      DutyRationList: common.XMLArray(common.Numeric, 'double'), // #11026
      BankPresetList: common.XMLArray(t.string, 'string'), // #11038
      BankPresetStr: common.string_empty, // #11122
      LineDutyCycleList: common.XMLArray(common.Numeric, 'double'), // #11254
      Value3DMax: common.Int32_4559,
    }),
    t.partial({
      RGBSQ: common.Int32, // #9651
      PmData: common.Base64, // #9663
      DmFirstData: common.Base64, // #9675
      DmSecondData: common.Base64, // #9687
      DmThridData: common.Base64, // #9699
      LS9929OEData: common.Base64, // #9735
      Factor: common.Int32, // #9747
      FrequenceDivsion: common.Int32, // #9771
      SystemClock: common.Int32, // #9795
      ShiftClock: common.Numeric, // #9807
      StarRefreshRate: common.Int32, // #9831
      MaxRefreshRate: common.Int32, // #9855
      HighNumber: common.Int32, // #9879
      PositiveScan: common.Int32, // #9891
      NegetiveScan: common.Int32, // #9903
      BrightnessEfficiency: common.Int32, // #9915
      ShiftLenth: common.Int32, // #9927
      ScanType: common.Int32, // #9939
      GammaStartValue: common.Int32, // #9951
      GammaMaxValue: common.Int32, // #9963
      GammaShift: common.Int32, // #9987
      GameTable: common.Base64, // #10006
      ContrastValue: common.Int32, // #10018
      MaxBrightness: common.Int32, // #10030
      IsSimplyfy: common.Bool, // #10042
      RedJumpOne: common.Numeric, // #10054
      RedJumpTwo: common.Numeric, // #10066
      RedJumpThree: common.Numeric, // #10078
      RedJumpFour: common.Numeric, // #10090
      GreenJumpOne: common.Numeric, // #10102
      GreenJumpTwo: common.Numeric, // #10114
      GreenJumpThree: common.Numeric, // #10126
      GreenJumpFour: common.Numeric, // #10138
      BlueJumpOne: common.Numeric, // #10150
      BlueJumpTwo: common.Numeric, // #10162
      BlueJumpThree: common.Numeric, // #10174
      BlueJumpFour: common.Numeric, // #10186
      CompensateValue: common.Numeric, // #10198
      MinWidth: common.Int32, // #10210
      OEHiLevel: common.Int32, // #10222
      OELoLevel: common.Int32, // #10234
      ClockPhase: common.Int32, // #10246
      ShadowZone: common.Int32, // #10258
      ShadowZeroVal0: common.Int32, // #10270
      ShadowZeroVal1: common.Int32, // #10282
      ShadowZeroVal2: common.Int32, // #10294
      RowShadow: common.Int32, // #10306
      LineCharge: common.Int32, // #10318
      ShadowThree: common.Int32, // #10330
      ErrorBegin: common.Int32, // #10342
      IsNewPcbVersion: common.Bool, // #10354
      ModeValue: common.Int32, // #10378
      IsLineShadowOK: common.Bool, // #10390
      IsRowSwitch: common.Bool, // #10402
      SelectRowSwitch: common.Int32, // #10414
      Select32Port: common.Int32, // #10426
      FirstLineRed: common.Int32, // #10438
      FirstLineGreen: common.Int32, // #10450
      FirstLineBlue: common.Int32, // #10462
      CurrentRed: common.Int32, // #10474
      CurrentGreen: common.Int32, // #10486
      CurrentBlue: common.Int32, // #10498
      RDataPhase: common.Int32, // #10510
      GDataPhase: common.Int32, // #10522
      BDataPhase: common.Int32, // #10534
      HighFrequenceStatus: common.Int32, // #10546
      Mode9739: common.Int32, // #10558
      PassThroughMode: common.Int32, // #10570
      FixValue: common.Int32, // #10582
      ROScale: common.Numeric, // #10594
      ColEliminateUpPointOne: common.Int32, // #10606
      ColEliminateUpPointTwo: common.Int32, // #10618
      ColEliminateUpPointThree: common.Int32, // #10630
      ColUpVoltageOne: common.Int32, // #10642
      ColUpVoltageTwo: common.Int32, // #10654
      ColUpVoltageThree: common.Int32, // #10666
      CurrentThresholdVoltateOne: common.Int32, // #10678
      CurrentThresholdVoltateTwo: common.Int32, // #10690
      CurrentThresholdVoltateThree: common.Int32, // #10702
      ColUpDriveOne: common.Int32, // #10714
      ColUpDriveTwo: common.Int32, // #10726
      ColUpDriveThree: common.Int32, // #10738
      ModePinControlOne: common.Int32, // #10750
      ModePinControlTwo: common.Int32, // #10762
      ModePinControlThree: common.Int32, // #10774
      RowEliminateModeOne: common.Int32, // #10786
      RowEliminateModeTwo: common.Int32, // #10798
      RowEliminateModeThree: common.Int32, // #10810
      RowDownVoltagePointOne: common.Int32, // #10822
      RowDownVoltagePointTwo: common.Int32, // #10834
      RowDownVoltagePointThree: common.Int32, // #10846
      RowDownVoltageClampPointOne: common.Int32, // #10858
      RowDownVoltageClampPointTwo: common.Int32, // #10870
      RowDownVoltageClampPointThree: common.Int32, // #10882
      StartColorOne: common.Int32, // #10894
      StartColorTwo: common.Int32, // #10906
      StartColorThree: common.Int32, // #10918
      StartColorFour: common.Int32, // #10930
      StartScanOne: common.Int32, // #10942
      StartScanTwo: common.Int32, // #10954
      StartScanThree: common.Int32, // #10966
      StartScanFour: common.Int32, // #10978
      DutyRation: common.Int32, // #11002
      RowMergeMode: common.Int32, // #11014
      BankPreset: common.Int32, // #11050
      RowBankVoltageRed: common.Int32, // #11062
      RowBankVoltageGreen: common.Int32, // #11074
      RowBankVoltageBlue: common.Int32, // #11086
      BackMode: common.Int32, // #11098
      LineClockPhase: common.Int32, // #11110
      LineDutyCycle: common.Int32, // #11134
      LineOutPutDalay: common.Int32, // #11146
      TotalNumber: common.Int32, // #11158
      RowJiangPing: common.Int32, // #11170
      CurFlashIndex: common.Int32, // #11182
      CurFlashTotal: common.Int32, // #11194
      CurLeakageIndex: common.Int32, // #11206
      CurLeakageTotal: common.Int32, // #11218
      CurGrayIndex: common.Int32, // #11230
      CurGrayTotal: common.Int32, // #11242
      Value3D: common.Int32,
    }),
  ],
  'LS9929Data'
);
export interface LS9929Data extends t.TypeOf<typeof LS9929Data> {}
