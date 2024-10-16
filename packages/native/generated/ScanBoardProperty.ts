import * as t from 'io-ts';
import { DateFromISOString } from 'io-ts-types';
import * as common from '../lib/common';
import { CabinetInfomation } from './CabinetInfomation'; // import
import { ChipAutoAdjustRefreshRateParamBase } from './ChipAutoAdjustRefreshRateParamBase'; // import
import { ChipBaseExtendPropey } from './ChipBaseExtendPropey'; // import
import { ChipCfgCurrentRange, ChipCfgCurrentRangeEnum } from './ChipCfgCurrentRange'; // import
import { ChipCfgCurrentRisingTime, ChipCfgCurrentRisingTimeEnum } from './ChipCfgCurrentRisingTime'; // import
import { ChipOperatingMode, ChipOperatingModeEnum } from './ChipOperatingMode'; // import
import { CoefType, CoefTypeEnum } from './CoefType'; // import
import { CoefficientSourceType, CoefficientSourceTypeEnum } from './CoefficientSourceType'; // import
import { CommonIrCabinetType, CommonIrCabinetTypeEnum } from './CommonIrCabinetType'; // import
import { ConfigFileVersionInfo } from './ConfigFileVersionInfo'; // import
import { ControlModeType, ControlModeTypeEnum } from './ControlModeType'; // import
import { CorrectType, CorrectTypeEnum } from './CorrectType'; // import
import { CustomGammaInfo } from './CustomGammaInfo'; // import
import { DataGroupOutPutMode, DataGroupOutPutModeEnum } from './DataGroupOutPutMode'; // import
import { DecodeChipParamBase } from './DecodeChipParamBase'; // import
import { DriverCurrentSpeedType, DriverCurrentSpeedTypeEnum } from './DriverCurrentSpeedType'; // import
import { FlashTopology } from './FlashTopology'; // import
import { GhostRemoveModeType, GhostRemoveModeTypeEnum } from './GhostRemoveModeType'; // import
import { GrayModeType, GrayModeTypeEnum } from './GrayModeType'; // import
import { GrayRealizeType, GrayRealizeTypeEnum } from './GrayRealizeType'; // import
import { IrRegularCabinetProperty } from './IrRegularCabinetProperty'; // import
import { LEDModuleProperty } from './LEDModuleProperty'; // import
import { LS9917Data } from './LS9917Data'; // import
import { LS9918Data } from './LS9918Data'; // import
import { LS9919Data } from './LS9919Data'; // import
import { LS9920Data } from './LS9920Data'; // import
import { LS9926Data } from './LS9926Data'; // import
import { LS9929CData } from './LS9929CData'; // import
import { LS9929Data } from './LS9929Data'; // import
import { LS9930Data } from './LS9930Data'; // import
import { LS9933Data } from './LS9933Data'; // import
import { LS9935Data } from './LS9935Data'; // import
import { LS9960Data } from './LS9960Data'; // import
import { LS9961Data } from './LS9961Data'; // import
import { LowGrayQueryMode, LowGrayQueryModeEnum } from './LowGrayQueryMode'; // import
import MaxValue from './MaxValue';
import { ModuleCascadeDiretion, ModuleCascadeDiretionEnum } from './ModuleCascadeDiretion'; // import
import { PriorityMode, PriorityModeEnum } from './PriorityMode'; // import
import { RotateAngle, RotateAngleEnum } from './RotateAngle'; // import
import {
  ShowTypeWhenPortDisconnected,
  ShowTypeWhenPortDisconnectedEnum,
} from './ShowTypeWhenPortDisconnected'; // import
import { SmartSetMode, SmartSetModeEnum } from './SmartSetMode'; // import
import { SpecialFrameRateInfo } from './SpecialFrameRateInfo'; // import
import { VirtualModeType, VirtualModeTypeEnum } from './VirtualModeType'; // import
/**
 * Codec for interface {@link ScanBoardProperty}
 * @category Codecs
 * @see Automatically generated from ../decompiled/Nova.LCT.GigabitSystem.DataClass.decompiled.cs:38605
 */
export const ScanBoardProperty = t.intersection(
  [
    t.type({
      NewRcfgxVersion: common.string_20, // #38694
      RCFGXVersion: common.withDefault(t.string, '\u672A\u77E5'), // #38696
      ProgramVersion: common.string_empty, // #38708
      GammaValue: common.UInt8_28, // #38726
      Brightness: common.Int32_255, // #38728
      RedBright: common.Int32_255, // #38730
      BlueBright: common.Int32_255, // #38732
      GreenBright: common.Int32_255, // #38734
      VRedBright: common.Int32_255, // #38736
      RedGain: common.Int32_255, // #38738
      BlueGain: common.Int32_255, // #38740
      GreenGain: common.Int32_255, // #38742
      VRedGain: common.Int32_255, // #38750
      IsChromaCorrentionLowGray: common.Bool_true, // #38752
      CoefTypeMode: common.withDefault(CoefType, 'common'), // #38764
      Width: common.Int32_32, // #38766
      Height: common.Int32_16, // #38768
      GroupNumHeight: common.Int32_1, // #38770
      GroupNumWidth: common.Int32_1, // #38772
      ModuleCols: common.Int32_1, // #38774
      ModuleRows: common.Int32_1, // #38776
      PhysicalDataGroupNum: common.Int32_2, // #38778
      LogicalDataGroupNum: common.Int32_8, // #38786
      RefNumPerVs: common.Int32_4, // #38788
      GrayDepth: common.UInt8_12, // #38790
      GrayMode: common.withDefault(GrayModeType, 'Normallight'), // #38792
      GrayRealize: common.withDefault(GrayRealizeType, 'HGHR'), // #38798
      LineScanTime: common.Int32_5, // #38800
      GhostRemoveType: common.withDefault(GhostRemoveModeType, 'Unknown'), // #38802
      BlankUnitNumPerScan: common.Int32_25, // #38804
      RowChangePoint: common.Int32_3, // #38808
      TinyLineFeedMoment: common.Int32_2, // #38810
      LightTimeRatio: common.Int32_100, // #38812
      LightTime: common.Int32_2650, // #38814
      LightTimeNum2: common.Int32_2650, // #38816
      ShiftUnitNum: common.Int32_32, // #38818
      PointNumberPerDriver: common.Int32_32, // #38820
      TotalUnitNum: common.withDefault(common.Int32, 267), // #38822
      DclkUnitCycle: common.UInt8_10, // #38824
      DclkPhase: common.UInt8_2, // #38826
      DclkHigh: common.UInt8_5, // #38828
      DclkHighRatio: common.UInt8_50, // #38830
      GCLKRate: common.UInt8_10, // #38832
      GCLKPhase: common.UInt8_5, // #38834
      GCLKDuty: common.UInt8_5, // #38836
      CtrlEndPoint: common.withDefault(common.Int32, 20), // #38840
      SubFields: common.Int32_4, // #38846
      TotalGclkUnitNumPerScan: common.UInt16_4096, // #38850
      AddrExtend: common.UInt8_5, // #38852
      TotalLightCdfResault: common.withDefault(common.Int32, 65535), // #38854
      LogicalShiftUnitNum: common.Int32_128, // #38864
      M1TranCntNum: common.Int32_3, // #38866
      M2TranCntNum: common.Int32_3, // #38874
      IsConnectSmartModule: common.Bool_true, // #38876
      IsNoSmartModule: common.Bool_true, // #38880
      ColorMatrix: common.XMLArray(common.Int32, 'int'), // #38892
      GclkNumPerScan: common.UInt16_4096, // #38914
      IsNoCorrectionThresholdEable: common.Bool_true, // #38924
      RedNoCorrectionAttenuation: common.UInt16_2048, // #38926
      GreenNoCorrectionAttenuation: common.UInt16_2048, // #38928
      BlueNoCorrectionAttenuation: common.UInt16_2048, // #38930
      VirRedNoCorrectionAttenuation: common.UInt16_2048, // #38948
      CabinetRotateAngle: common.withDefault(RotateAngle, 'R_360'), // #38950
      IsClearGhost: common.Bool_true, // #38958
      SerialDecodeRepeatTimes: common.UInt8_1, // #38994
      LowAshCompensationOne5253: common.UInt8_100, // #38996
      LowAshCompensationTwo5253: common.UInt8_100, // #39004
      OperatingMode: common.withDefault(ChipOperatingMode, 'Unknown'), // #39030
      IsOpenSetGainValue: common.Bool_true, // #39034
      CurrentRisingTime: common.withDefault(ChipCfgCurrentRisingTime, 'CurrentRising2'), // #39038
      RedSpeedType: common.withDefault(DriverCurrentSpeedType, 'Fast'), // #39040
      GreenSpeedType: common.withDefault(DriverCurrentSpeedType, 'Fast'), // #39042
      BlueSpeedType: common.withDefault(DriverCurrentSpeedType, 'Fast'), // #39054
      MBI515xDhT: common.UInt8_3, // #39056
      PreChargeTime: common.Int32_1, // #39062
      EliminatePotential: common.Int32_3, // #39072
      Max2053Gamma: common.withDefault(common.Numeric, 100), // #39074
      MaxGammaValue: common.withDefault(common.Int32, 4096), // #39080
      UnitIcCount: common.Int32_255, // #39106
      ICNumber: common.UInt8_5, // #39110
      BlankOptimizationLevel: common.UInt8_1, // #39114
      Support22BitModel: common.Bool_true, // #39128
      Auto5252ResetTime: common.withDefault(DateFromISOString, new Date(2017, 0, 1, 0, 0, 59)), // #39132
      GclkFreqP: common.UInt8_12, // #39134
      GclkFreqM: common.UInt8_3, // #39136
      GclkFreqN: common.UInt8_2, // #39138
      GclkFreqDIV: common.UInt8_2, // #39140
      GclkFreqG: common.UInt8_2, // #39142
      vsFreq: common.withDefault(common.Numeric, 16.666666), // #39144
      DclkNumFor2055: common.Int32_1, // #39146
      GclkNumFor2055: common.Int32_128, // #39148
      GCLKRate2055: common.withDefault(common.Numeric, 10), // #39150
      DisplayMode: common.UInt8_255, // #39152
      RealPhysicalGroupNum: common.Int32_2, // #39156
      ShadowEliminationPotentialLevel: common.UInt8_5, // #39158
      LineBlankVoltage: common.UInt8_2, // #39160
      StartScan1: common.UInt8_15, // #39162
      StartScan2: common.UInt8_31, // #39164
      StartScan3: common.withDefault(common.UInt8, 47), // #39166
      StartScan4: common.withDefault(common.UInt8, 63), // #39172
      RealBrightnessOf2053: common.UInt8_255, // #39174
      BrightPriorityMode: common.withDefault(PriorityMode, 'Contrast'), // #39202
      IsSupportExtendProperty: common.Bool_true, // #39215
      LowGray: common.UInt8_2,
    }),
    t.partial({
      ConfigFileVersion: ConfigFileVersionInfo, // #38700
      LEDCtrlStatus: ControlModeType, // #38702
      VirtualMode: VirtualModeType, // #38704
      IncAddrPerDrive: common.Int32, // #38706
      isSupportMulticolorGamma: common.Bool, // #38710
      RedGammaTable: common.buffer_GAMMAVALUE_COUNT, // #38712
      GreenGammaTable: common.buffer_GAMMAVALUE_COUNT, // #38714
      BlueGammaTable: common.buffer_GAMMAVALUE_COUNT, // #38716
      ExtendRedGammaTable: common.buffer_GAMMAVALUE_COUNT, // #38718
      ExtendGreenGammaTable: common.buffer_GAMMAVALUE_COUNT, // #38720
      ExtendBlueGammaTable: common.buffer_GAMMAVALUE_COUNT, // #38722
      NewGammaTable: common.Base64, // #38724
      VedioMode: common.UInt8, // #38744
      IsEnableCalibration: common.Bool, // #38746
      CoefSourceType: CoefficientSourceType, // #38748
      CorrectionMode: CorrectType, // #38754
      ThreasholdOfPointDetect: common.Int32, // #38756
      IsIrRegular: common.Bool, // #38758
      StandardLedModuleProp: LEDModuleProperty, // #38760
      X: common.Int32, // #38762
      Y: common.Int32, // #38780
      ModCascadeType: ModuleCascadeDiretion, // #38782
      CoordinateForCabinetJsonStr: t.string, // #38784
      PointTableData: common.Base64, // #38794
      IsLightFrom1stGray: common.Bool, // #38796
      IsSM5266Decode: common.Bool, // #38806
      LatDelay: common.Int32, // #38838
      TinyAfterglowMoment: common.Int32, // #38842
      SubFieldPart: new common.BufferFromBase64(
        'SubFieldPart',
        MaxValue.MAX_SUBFIELDPART_COUNT /* SimpleMemberAccessExpression */
      ), // #38844
      OEData: new common.BufferFromBase64(
        'OEData',
        MaxValue.MAX_OETABLE_LENGHT /* SimpleMemberAccessExpression */
      ), // #38848
      LowGrayCompensation: common.UInt8, // #38856
      LowGrayQuery: LowGrayQueryMode, // #38858
      IsNewOERamEnable: common.Bool, // #38860
      IsLowGrayRamEnable: common.Bool, // #38862
      IsEnableTranCntNum: common.Bool, // #38868
      AutoCorrectLightUpload: common.Bool, // #38870
      AutoCorrectLightUploadIsSupport: common.Bool, // #38872
      TempOEValue: common.Numeric, // #38878
      IsConnectHubMonitor: common.Bool, // #38882
      OfflineFrame: ShowTypeWhenPortDisconnected, // #38884
      DriverFucntion: common.UInt8, // #38886
      ABCDRollOver: common.Bool, // #38888
      ScanSequenceAdjustEn: common.Bool, // #38890
      LightFlashClose: common.Bool, // #38894
      SmartSetMode, // #38896
      RamAData: common.buffer_MAX_MULTIPLE_CHIP_TABLELEN, // #38898
      RamBData: common.buffer_MAX_MULTIPLE_CHIP_TABLELEN, // #38900
      RamCData: common.buffer_MAX_MULTIPLE_CHIP_TABLELEN, // #38902
      RamDData: common.buffer_MAX_MULTIPLE_CHIP_TABLELEN, // #38904
      ICRamAData: common.buffer_MAX_MULTIPLE_CHIP_TABLELEN, // #38906
      ICRamDData: common.buffer_MAX_MULTIPLE_CHIP_TABLELEN, // #38908
      IsDExtendMode: common.Bool, // #38910
      Is64DataGroup: common.Bool, // #38912
      IsSymmetricalOutputMode: common.Bool, // #38916
      RedNoCorrectionThreshold: common.UInt16, // #38918
      GreenNoCorrectionThreshold: common.UInt16, // #38920
      BlueNoCorrectionThreshold: common.UInt16, // #38922
      VirRedNoCorrectionThreshold: common.UInt16, // #38932
      TwentyDataGroupEnable: common.Bool, // #38934
      GroupSwapEnable: common.Bool, // #38936
      GroupSwapInfo: common.buffer_MAX_SCANNER_DATAGROUP, // #38938
      MonitorGroupSwapEnable: common.Bool, // #38940
      MonitorGroupSwapInfo: new common.BufferFromBase64(
        'MonitorGroupSwapInfo',
        MaxValue.MAX_MONITOR_DATAGROUP /* SimpleMemberAccessExpression */
      ), // #38942
      Mbi5042GrayEnhanced: common.Bool, // #38944
      My9262GrayEnhanced: common.Bool, // #38946
      Mbi5166GrayEnhanced: common.Bool, // #38952
      IsLowAshOptimization: common.Bool, // #38954
      IsEnableMonitorRGB: common.Bool, // #38956
      MonitorRGBCode: common.buffer_COLOR_COUNT, // #38960
      Is24DataGroup: common.Bool, // #38962
      Is28DataGroup: common.Bool, // #38964
      OtherRefreshNumParams: new common.BufferFromBase64(
        'OtherRefreshNumParams',
        MaxValue.MAX_OTHER_REFRESH_NUM_PARAMS_COUNT /* SimpleMemberAccessExpression */
      ), // #38966
      IsEnableOtherRefreshNumParams: common.Bool, // #38968
      CommonIrCabinetMode: CommonIrCabinetType, // #38970
      IsSupportHighLoad: common.Bool, // #38972
      IsSupportLowLatencyPointTable: common.Bool, // #38974
      IsGhostSignalNegation: common.Bool, // #38976
      IsCloseGhostSignal: common.Bool, // #38978
      IsReverseScanOutput: common.Bool, // #38980
      DataGroupOutPutType: DataGroupOutPutMode, // #38982
      IsStarSwipPoint: common.Bool, // #38984
      IsOpenProtection: common.Bool, // #38986
      IsOpenClearBlankLine: common.Bool, // #38988
      IsOpenLowAshCompensation: common.Bool, // #38990
      LowAshCompensationOne: common.UInt8, // #38992
      LowAshCompensationTwo: common.UInt8, // #38998
      PowerOnBrightnessAdjustEn: common.Bool, // #39000
      OpenEMCFunValue: common.UInt8, // #39002
      EnFrameTimeMgt: common.Bool, // #39006
      ReduceHighContrast: common.UInt8, // #39008
      IsChipSUM2117: common.Bool, // #39010
      IsStartDoubleLock: common.Bool, // #39012
      CurrentPosition: common.Int32, // #39014
      CurrentPhase: common.Int32, // #39016
      IsChipSUM2017TD: common.Bool, // #39018
      IsStartDoubleLock2017TD: common.Bool, // #39020
      CurrentPosition2017TD: common.Int32, // #39022
      CurrentPhase2017TD: common.Int32, // #39024
      RPositiveNegativeValue: common.Bool, // #39026
      GPositiveNegativeValue: common.Bool, // #39028
      BPositiveNegativeValue: common.Bool, // #39032
      CabinetInfo: CabinetInfomation, // #39036
      CurrentRange: ChipCfgCurrentRange, // #39044
      EnableEnhanceFirstScan: common.Bool, // #39046
      FirstScanCompensation: common.Int32, // #39048
      OtherScanCompenscation: common.Int32, // #39050
      ChipPropey: ChipBaseExtendPropey, // #39052
      MBI515xDeltaT: common.UInt8, // #39058
      IsOpen5958Exchange: common.Bool, // #39060
      EliminateMode: common.Int32, // #39064
      IrCabinetProp: IrRegularCabinetProperty, // #39066
      FlashPTopology: FlashTopology, // #39068
      Exceed256DataIsValid: common.Bool, // #39070
      IsKillMode: common.Bool, // #39076
      SpecialFrameRate: SpecialFrameRateInfo, // #39078
      LS9960Data, // #39082
      LS9918Data, // #39084
      LS9918orSC6618Flag: common.Int32, // #39086
      LS9929Data, // #39088
      LS9935Data, // #39090
      LS9930Data, // #39092
      LS9929CData, // #39094
      LS9933Data, // #39096
      LS9961Data, // #39098
      LS9926Data, // #39100
      LS9919Data, // #39102
      LS9920Data, // #39104
      LS9917Data, // #39108
      ScanShiftForImageData: common.UInt16, // #39112
      Enable18BitModel: common.Bool, // #39116
      Enable22BitModel: common.Bool, // #39118
      EnableDirectMode: common.Bool, // #39120
      ABCSignalDelayEnable: common.Bool, // #39122
      DESignalDelayEnable: common.Bool, // #39124
      ABCDESignalDelayTime: common.UInt8, // #39126
      AutoOrManual5252ResetSwitch: common.Bool, // #39130
      IntervalDate5252: common.UInt8, // #39154
      ShadowEliminationEnhancedEnable: common.Bool, // #39168
      BlankFinetuning: common.UInt8, // #39170
      ChipIs5124NewFlag: common.UInt8, // #39176
      Driver24BitEn: common.UInt8, // #39178
      RegGroupCnt: common.Int32, // #39180
      RegCgfMode: common.UInt8, // #39182
      DrivedDclkModeContinuation: common.UInt8, // #39184
      DrivedDclkMode: common.UInt8, // #39186
      LatchDclkMode: common.UInt8, // #39188
      FirstGclkScanAdjust: common.UInt8, // #39190
      BadPointEn: common.UInt8, // #39192
      BadPointNum: common.UInt8, // #39194
      DataHighLow: common.Bool, // #39196
      DecodeChipParamExtendProp: DecodeChipParamBase, // #39198
      ChipAutoAdjustRefreshRateParam: ChipAutoAdjustRefreshRateParamBase, // #39200
      CustomGammaInfo, // #39208
      IntegratedRCChip: common.Bool, // #39211
      IsSupportChipAutoRate: common.Bool, // #39213
      IOExtend: common.UInt8, // #39217
      IsSetLowEffectGamma: common.Bool, // #39220
      IsEnableBrightDarkLine: common.Bool, // #39222
      IsEnableTotalGrayScale: common.Bool, // #39224
      IsEnableModuleStandardAdj: common.Bool, // #39226
      IsEnableBlueAndWhite: common.Bool, // #39228
      IsEnablePAM: common.Bool, // #39230
      OddEvenScan: common.UInt8,
    }),
  ],
  'ScanBoardProperty'
);
export interface ScanBoardProperty extends t.TypeOf<typeof ScanBoardProperty> {
  ConfigFileVersion?: ConfigFileVersionInfo;
  LEDCtrlStatus?: ControlModeTypeEnum;
  VirtualMode?: VirtualModeTypeEnum;
  CoefSourceType?: CoefficientSourceTypeEnum;
  CorrectionMode?: CorrectTypeEnum;
  CoefTypeMode: CoefTypeEnum;
  StandardLedModuleProp?: LEDModuleProperty;
  ModCascadeType?: ModuleCascadeDiretionEnum;
  GrayMode: GrayModeTypeEnum;
  GrayRealize: GrayRealizeTypeEnum;
  GhostRemoveType: GhostRemoveModeTypeEnum;
  LowGrayQuery?: LowGrayQueryModeEnum;
  OfflineFrame?: ShowTypeWhenPortDisconnectedEnum;
  SmartSetMode?: SmartSetModeEnum;
  CabinetRotateAngle: RotateAngleEnum;
  CommonIrCabinetMode?: CommonIrCabinetTypeEnum;
  DataGroupOutPutType?: DataGroupOutPutModeEnum;
  OperatingMode: ChipOperatingModeEnum;
  CabinetInfo?: CabinetInfomation;
  CurrentRisingTime: ChipCfgCurrentRisingTimeEnum;
  CurrentRange?: ChipCfgCurrentRangeEnum;
  RedSpeedType: DriverCurrentSpeedTypeEnum;
  GreenSpeedType: DriverCurrentSpeedTypeEnum;
  BlueSpeedType: DriverCurrentSpeedTypeEnum;
  ChipPropey?: ChipBaseExtendPropey;
  IrCabinetProp?: IrRegularCabinetProperty;
  FlashPTopology?: FlashTopology;
  SpecialFrameRate?: SpecialFrameRateInfo;
  LS9960Data?: LS9960Data;
  LS9918Data?: LS9918Data;
  LS9929Data?: LS9929Data;
  LS9935Data?: LS9935Data;
  LS9930Data?: LS9930Data;
  LS9929CData?: LS9929CData;
  LS9933Data?: LS9933Data;
  LS9961Data?: LS9961Data;
  LS9926Data?: LS9926Data;
  LS9919Data?: LS9919Data;
  LS9920Data?: LS9920Data;
  LS9917Data?: LS9917Data;
  BrightPriorityMode: PriorityModeEnum;
  DecodeChipParamExtendProp?: DecodeChipParamBase;
  ChipAutoAdjustRefreshRateParam?: ChipAutoAdjustRefreshRateParamBase;
  CustomGammaInfo?: CustomGammaInfo;
}
