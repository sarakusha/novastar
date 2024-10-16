import * as t from 'io-ts';
import * as common from '../lib/common';
import { ChipBaseExtendPropey } from './ChipBaseExtendPropey';
 // import
export const ChipLSExtendPropertyBase = t.intersection(
  [
    ChipBaseExtendPropey,
    t.type({
      PassThroughMode: common.Int32_0, // #1943
      RowShadow: common.Int32_0, // #1946
      CurrentRed: common.Int32_0, // #1949
      CurrentGreen: common.Int32_0, // #1952
      CurrentBlue: common.Int32_0, // #1955
      LineCharge: common.Int32_0, // #1958
      ShadowZone: common.Int32_0, // #1961
      ShadowZeroVal0: common.Int32_0, // #1964
      ShadowZeroVal1: common.Int32_0, // #1967
      ShadowZeroVal2: common.Int32_0, // #1970
      ShadowThree: common.Int32_0, // #1973
      RGBSeq: common.Int32_0, // #2015
      GammaStartValue: common.Int32_0, // #2027
      GammaMaxValue: common.Int32_0, // #2030
      GammaShift: common.Int32_0, // #2036
      GammaValue: common.Numeric_28, // #2039
      SystemClock: common.Int32_0, // #2058
      ShiftClock: common.Numeric_0, // #2061
      ShiftClockList: common.XMLArray(common.Numeric, 'double'), // #2064
      ContrastValue: common.Int32_0, // #2067
      FriedFreuquance: common.Int32_60, // #2070
      StarRefreshRate: common.Int32_0, // #2073
      StarRefreshRateList: common.XMLArray(common.Int32, 'int'), // #2076
      MaxRefreshRate: common.Int32_0, // #2079
      MaxRefreshRateList: common.XMLArray(common.Int32, 'int'), // #2085
      HighNumber: common.Int32_0, // #2087
      HighNumberList: common.XMLArray(common.Int32, 'int'), // #2090
      PositiveScan: common.Int32_0, // #2093
      NegetiveScan: common.Int32_0, // #2096
      BrightnessEfficiency: common.Int32_0, // #2099
      ShiftLenth: common.Int32_0, // #2102
      ScanType: common.Int32_0, // #2105
      MaxBrightness: common.Int32_0, // #2111
      Version16To16: common.Int32_0, // #2113
      Version16To16List: common.XMLArray(common.Numeric, 'double'), // #2121
      BitsNum: common.Int32_2, // #2133
      SubFrameNum: common.Int32_3, // #2145
      Factor: common.Int32_0, // #2157
      RedJumpOne: common.Numeric_0, // #2169
      RedJumpTwo: common.Numeric_0, // #2172
      RedJumpThree: common.Numeric_0, // #2175
      RedJumpFour: common.Numeric_0, // #2178
      RedJumpFive: common.Numeric_0, // #2181
      GreenJumpOne: common.Numeric_0, // #2184
      GreenJumpTwo: common.Numeric_0, // #2187
      GreenJumpThree: common.Numeric_0, // #2190
      GreenJumpFour: common.Numeric_0, // #2193
      GreenJumpFive: common.Numeric_0, // #2196
      BlueJumpOne: common.Numeric_0, // #2199
      BlueJumpTwo: common.Numeric_0, // #2202
      BlueJumpThree: common.Numeric_0, // #2205
      BlueJumpFour: common.Numeric_0, // #2208
      BlueJumpFive: common.Numeric_0, // #2211
      CompensateValue: common.Numeric_0, // #2214
      MinWidth: common.Int32_0, // #2217
      OEHiLevel: common.Int32_0, // #2220
      OELoLevel: common.Int32_0, // #2223
      ClockPhase: common.Int32_0, // #2226
      IsNewPcbVersion: common.Bool_false, // #2234
      IsLineShadowOK: common.Bool_false, // #2236
      IsRowSwitch: common.Bool_false, // #2239
      SelectRowSwitch: common.Int32_0, // #2242
      SelectRowSwitchG: common.Int32_0, // #2245
      SelectRowSwitchB: common.Int32_0, // #2248
      Select32Port: common.Int32_0, // #2251
      FirstLineRed: common.Int32_0, // #2254
      FirstLineGreen: common.Int32_0, // #2257
      FirstLineBlue: common.Int32_0, // #2260
      RDataPhase: common.Int32_0, // #2263
      GDataPhase: common.Int32_0, // #2266
      BDataPhase: common.Int32_0, // #2269
      HighFrequenceStatus: common.Int32_0, // #2272
      Mode9739: common.Int32_0, // #2275
      FixValue: common.Int32_0, // #2278
      ROScale: common.Numeric_0, // #2281
      ColEliminateUpPointOne: common.Int32_0, // #2284
      ColEliminateUpPointTwo: common.Int32_0, // #2287
      ColEliminateUpPointThree: common.Int32_0, // #2290
      ColUpVoltageOne: common.Int32_0, // #2293
      ColUpVoltageTwo: common.Int32_0, // #2296
      ColUpVoltageThree: common.Int32_0, // #2299
      CurrentThresholdVoltateOne: common.Int32_0, // #2302
      CurrentThresholdVoltateTwo: common.Int32_0, // #2305
      CurrentThresholdVoltateThree: common.Int32_0, // #2308
      ColUpDriveOne: common.Int32_0, // #2311
      ColUpDriveTwo: common.Int32_0, // #2314
      ColUpDriveThree: common.Int32_0, // #2317
      ModePinControlOne: common.Int32_0, // #2320
      ModePinControlTwo: common.Int32_0, // #2323
      ModePinControlThree: common.Int32_0, // #2326
      RowEliminateModeOne: common.Int32_0, // #2329
      RowEliminateModeTwo: common.Int32_0, // #2332
      RowEliminateModeThree: common.Int32_0, // #2335
      RowDownVoltagePointOne: common.Int32_0, // #2338
      RowDownVoltagePointTwo: common.Int32_0, // #2341
      RowDownVoltagePointThree: common.Int32_0, // #2344
      RowDownVoltageClampPointOne: common.Int32_0, // #2347
      RowDownVoltageClampPointTwo: common.Int32_0, // #2350
      RowDownVoltageClampPointThree: common.Int32_0, // #2353
      StartColorOne: common.Int32_0, // #2356
      StartColorTwo: common.Int32_0, // #2368
      StartColorThree: common.Int32_0, // #2380
      StartColorFour: common.Int32_0, // #2392
      StartScanOne: common.Int32_0, // #2404
      StartScanTwo: common.Int32_0, // #2416
      StartScanThree: common.Int32_0, // #2428
      StartScanFour: common.Int32_0, // #2440
      DutyRation: common.Int32_0, // #2452
      DutyRationList: common.XMLArray(common.Numeric, 'double'), // #2464
      RowMergeMode: common.Int32_0, // #2476
      BankPreset: common.Int32_0, // #2488
      BankPresetList: common.XMLArray(t.string, 'string'), // #2500
      BankPresetStr: common.string_empty, // #2512
      RowBankVoltageRed: common.Int32_0, // #2524
      RowBankVoltageGreen: common.Int32_0, // #2536
      RowBankVoltageBlue: common.Int32_0, // #2548
      LineClockPhase: common.Int32_0, // #2560
      LineDutyCycle: common.Int32_0, // #2572
      LineDutyCycleList: common.XMLArray(common.Numeric, 'double'), // #2584
      LineOutPutDalay: common.Int32_0, // #2596
      RowJiangPing: common.Int32_0, // #2608
      Is18Bit: common.Int32_0, // #2620
      TotalNumber: common.Int32_0, // #2623
      BackMode: common.Int32_0, // #2635
      ModeValue: common.Int32_0, // #2647
      ModeList: common.XMLArray(t.string, 'string'), // #2650
      ErrorBegin: common.Int32_0, // #2653
      FrequenceDivsion: common.Int32_0, // #2656
      CurFlashIndex: common.Int32_0, // #2668
      CurFlashTotal: common.Int32_0, // #2680
      CurLeakageIndex: common.Int32_0, // #2692
      CurLeakageTotal: common.Int32_0, // #2740
      Value3DMax: common.Int32_4559, // #2752
      IsClickDetection: common.Int32_0, // #2764
      ModuleSwitch: common.Int32_0, // #2767
      RedOpenDetection: common.Int32_0, // #2770
      GreenOpenDetection: common.Int32_0, // #2773
      BlueOpenDetection: common.Int32_0, // #2776
      RedLowGrayFirstLine: common.Int32_0, // #2779
      GreenLowGrayFirstLine: common.Int32_0, // #2791
      BlueLowGrayFirstLine: common.Int32_0, // #2803
      NoColUpVoltateR: common.Int32_2, // #2815
      NoColUpVoltateG: common.Int32_2, // #2827
      NoColUpVoltateB: common.Int32_2, // #2839
      LineNoiseCheck: common.Bool_false, // #2851
      LineNoiseNum: common.Int32_0, // #2863
      LineNoiseLab: common.Int32_0, // #2875
      RedPresentGain: common.Int32_0, // #2887
      GreenPresentGain: common.Int32_0, // #2899
      BluePresentGain: common.Int32_0, // #2911
      PreParamEnable: common.Bool_false, // #2923
      PreParamValue: common.Numeric_0, // #2935
      IsLowPower: common.Bool_false, // #2947
      LowPowerMode: common.Int32_0, // #2959
      RedResistance: common.Int32_1000, // #2962
      GreenResistance: common.Int32_1000, // #2974
      BlueResistance: common.Int32_1000, // #3010
      ConnnectUnitCount: common.Int32_1, // #3022
      UnitIcCount: common.Int32_0, // #3034
      ICNumberOrder: common.string_empty, // #3046
      TakePicturesOptimization: common.UInt8_0, // #3058
      TimeDivisionOpenOne: common.UInt8_0, // #3061
      TimeDivisionOpenTwo: common.UInt8_0, // #3064
      TimeDivisionOpenThree: common.UInt8_0, // #3067
      CaterpillarOptimizationOne: common.UInt8_0, // #3070
      CaterpillarOptimizationTwo: common.UInt8_0, // #3073
      CaterpillarOptimizationThree: common.UInt8_0, // #3076
      CouplingOptimizationOneOne: common.UInt8_0, // #3079
      CouplingOptimizationOneTwo: common.UInt8_0, // #3082
      CouplingOptimizationOneThree: common.UInt8_0, // #3085
      BlankingLevelOne: common.UInt8_0, // #3088
      BlankingLevelTwo: common.UInt8_0, // #3091
      BlankingLevelThree: common.UInt8_0, // #3094
      VC1One: common.UInt8_0, // #3097
      VC1Two: common.UInt8_0, // #3100
      VC1Three: common.UInt8_0, // #3103
      LowGrayColorCompensationOne: common.UInt8_0, // #3106
      LowGrayColorCompensationTwo: common.UInt8_0, // #3109
      LowGrayColorCompensationThree: common.UInt8_0, // #3125
      JumpGrayCompensationOne: common.Numeric_0, // #3127
      JumpGrayCompensationTwo: common.Numeric_0, // #3130
      MidGrayColorCompensationOne: common.Int8_0, // #3133
      MidGrayColorCompensationTwo: common.Int8_0, // #3136
      MidGrayColorCompensationThree: common.Int8_0, // #3139
      HighGraySacleCompensationOne: common.Int8_0, // #3142
      HighGraySacleCompensationTwo: common.Int8_0, // #3145
      HighGraySacleCompensationThree: common.Int8_0, // #3148
      ColumnClampSwitchOne: common.UInt8_0, // #3151
      ColumnClampSwitchTwo: common.UInt8_0, // #3154
      ColumnClampSwitchThree: common.UInt8_0, // #3157
      ColumnBlankingModeOne: common.UInt8_0, // #3160
      ColumnBlankingModeTwo: common.UInt8_0, // #3163
      ColumnBlankingModeThree: common.UInt8_0, // #3166
      LineBlankingPotentialZero: common.UInt8_0, // #3169
      LineBlankingPotentialOne: common.UInt8_0, // #3187
      CorrectionState: common.Bool_false,
    }),
    t.partial({
      ChipId: common.Int32, // #1976
      PmData: common.Base64, // #1979
      DmFirstData: common.Base64, // #1991
      DmSecondData: common.Base64, // #2003
      DmThridData: common.Base64, // #2033
      GammaTable: new common.BufferFromBase64('GammaTable', 512 /* SimpleMemberAccessExpression */), // #2082
      GearCurrent: common.Int32, // #2108
      IsSimplyfy: common.Bool, // #2116
      CustomGammaFlag: common.Bool, // #2119
      OEData: common.Base64, // #2229
      IPVersion: common.Int32, // #2232
      IsOld: common.Bool, // #2704
      CurGrayIndex: common.Int32, // #2716
      CurGrayTotal: common.Int32, // #2728
      Value3D: common.Int32, // #2986
      DoubleClk: common.Int32, // #2998
      BrightMode: common.Int32, // #3112
      CorrectionDispersionOne: common.Numeric, // #3115
      CorrectionDispersionTwo: common.Numeric, // #3117
      CorrectionDispersionThree: common.Numeric, // #3119
      CalibrationcorrectionparametersOne: common.Numeric, // #3121
      CalibrationcorrectionparametersTwo: common.Numeric, // #3123
      CalibrationcorrectionparametersThree: common.Numeric, // #3172
      NCoutCon: common.Int32, // #3175
      NLR: common.Int32, // #3177
      IsUseNewModule: common.Bool, // #3179
      ReadPMDataLen: common.Int32, // #3181
      ReadPMDataRegisterAddr: common.UInt32, // #3183
      ICNumber: common.Int32, // #3185
      ICNumPerLine: common.Int32, // #3189
      GammaBufferLen: common.Int32,
    }),
  ],
  'ChipLSExtendPropertyBase'
);
/**
 * Codec for {@link ChipLSExtendProperty}
 * @category Codecs
 * @see Automatically generated from ../decompiled/Nova.LCT.GigabitSystem.ChipLSBase.decompiled.cs:1779
 */
export const ChipLSExtendProperty = t.intersection(
  [ChipLSExtendPropertyBase, t.partial({ '@_xsi:type': t.literal('ChipLSExtendProperty') })],
  'ChipLSExtendProperty'
);
export interface ChipLSExtendProperty extends t.TypeOf<typeof ChipLSExtendProperty> {}
