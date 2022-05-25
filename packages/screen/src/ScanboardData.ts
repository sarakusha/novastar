/* eslint-disable no-bitwise,no-param-reassign */
import type { Chip2053ExtendPropety } from '@novastar/native/Chip2053ExtendPropety';
import type { Chip2163ExtendPropety } from '@novastar/native/Chip2163ExtendPropety';
import { ChipTypeEnum } from '@novastar/native/ChipType';
import MaxValue from '@novastar/native/MaxValue';
import MaxValueInfo from '@novastar/native/MaxValueInfo';
import { RotateAngleEnum } from '@novastar/native/RotateAngle';
import type { ScanBoardProperty } from '@novastar/native/ScanBoardProperty';
import type { ChipBaseExtendPropey } from '@novastar/native/unions';
import Struct, { ExtractType, Getter, Setter } from 'typed-struct';

import { isValidScanBdProp } from './CommonCalculator';
import { hasProps } from './common';

const MonitorRGBCodeStruct = new Struct('MonitorRGBCode')
  .Bits8({
    a: [0, 2],
    b: [2, 2],
    c: [4, 2],
    d: [6, 2],
  })
  .compile();

const getMonitorRGBCode: Getter<Buffer> = (_, buffer) => {
  const { a, b, c, d } = new MonitorRGBCodeStruct(buffer);
  return Buffer.from([a, b, c, d]);
};

const setMonitorRGBCode: Setter<Buffer> = (_, buffer, value) => {
  if (value.length < 4) return false;
  const [a, b, c, d] = value;
  Object.assign(new MonitorRGBCodeStruct(buffer), {
    a,
    b,
    c,
    d,
  });
  return true;
};

const DataGroupSequenceStruct = new Struct('DataGroupSequence')
  .Bits32({
    a: [0, 4],
    b: [4, 4],
    c: [8, 4],
    d: [12, 4],
    e: [16, 4],
    f: [20, 4],
    g: [24, 4],
    h: [28, 4],
  })
  .compile();

const getDataGroupSequence: Getter<Buffer> = (_, buffer) => {
  const { a, b, c, d, e, f, g, h } = new DataGroupSequenceStruct(buffer);
  return Buffer.from([a, b, c, d, e, f, g, h]);
};

const setDataGroupSequence: Setter<Buffer> = (_, buffer, value) => {
  if (value.length < 8) return false;
  const [a, b, c, d, e, f, g, h] = value;
  Object.assign(new DataGroupSequenceStruct(buffer), {
    a,
    b,
    c,
    d,
    e,
    f,
    g,
    h,
  });
  return true;
};

const getBool =
  (trueValue = 1): Getter<boolean> =>
  (_, [data]) =>
    data === trueValue;

const setBool =
  (trueValue = 1, falseValue = 0): Setter<boolean> =>
  (_, buffer, value) =>
    buffer.writeUInt8(value ? trueValue : falseValue) > 0;

const ghostGetter: Getter<boolean> = (type, buffer) => {
  switch (type) {
    case 'IsCloseGhostSignal':
      return (buffer[0] & (1 << 5)) !== 0;
    case 'IsGhostSignalNegation':
      return (buffer[0] & 5) === 5;
    default:
      throw new TypeError('Unknown type');
  }
};

const ghostSetter: Setter<boolean> = (type, buffer, value) => {
  switch (type) {
    case 'IsCloseGhostSignal': {
      const mask = 1 << 5;
      if (value) buffer[0] |= mask;
      else buffer[0] &= ~mask;
      break;
    }
    case 'IsGhostSignalNegation':
      buffer[0] &= 0b11111000;
      if (value) buffer[0] |= 5;
      break;
    default:
      throw new TypeError('Unknown type');
  }
  return true;
};

/**
 * Nova.LCT.GigabitSystem.DataClass.dll
 *
 * Nova.LCT.GigabitSystem.Common::ScanBoardProperty
 */
export const ScanboardData = new Struct('ScanboardData')
  .UInt8('GammaValue')
  .UInt8('Brightness')
  .UInt8('RedBright')
  .UInt8('GreenBright')
  .UInt8('BlueBright')
  .UInt8('VRedBright')
  .Custom('MonitorRGBCode', MonitorRGBCodeStruct.baseSize, getMonitorRGBCode, setMonitorRGBCode)
  .UInt8('ScreenDriveType')
  .UInt8('DclkHighRatio')
  .UInt8('DataDirectType')
  .UInt8('ModulePixelCols')
  .UInt8('ModulePixelRows')
  .UInt8('DriverChipType')
  .UInt8('ScanType')
  .UInt8('OEPolarity')
  .UInt8('DecType')
  .UInt8('DataGroup')
  .Custom(
    'DataGroupSequence',
    DataGroupSequenceStruct.baseSize,
    getDataGroupSequence,
    setDataGroupSequence
  )
  .UInt8('ModuleCols')
  .UInt8('ModuleRows')
  .UInt16LE('Width')
  .UInt16LE('Height')
  .UInt8('PhysicalDataGroupNum')
  .UInt8('ModCascadeType')
  .UInt16LE('TotalPointInTable')
  .UInt16LE('PointNumberPerDriver')
  .Bits8({
    IsIrRegular: [0, 1],
    CommonIrCabinetMode: [4, 1],
  })
  .UInt8('LogicalDataGroupNum')
  .UInt8('DriverFucntion')
  .Custom(
    'Is28DataGroup',
    1,
    (_, [data]) => data === 18,
    (_, buffer, value) => buffer.writeUInt8(value ? 18 : 0) > 0
  )
  .back()
  .Custom(
    'Is24DataGroup',
    1,
    (_, [data]) => data === 2,
    (_, buffer, value) => buffer.writeUInt8(value ? 2 : 0) > 0
  )
  .back()
  .Custom(
    'IsDExtendMode',
    1,
    (_, [data]) => data === 1,
    (_, buffer, value) => buffer.writeUInt8(value ? 1 : 0) > 0
  )
  .UInt8('GrayDepth')
  .Bits8({
    GrayMode: [0, 4],
    GrayRealize: [4, 4],
  })
  .Custom(
    'RefNumPerVs',
    2,
    (_, [l, h]) => l + (h << 7),
    (_, buffer, value) => {
      buffer.writeUInt16LE(value);
      buffer[1] <<= 1;
      return true;
    }
  )
  .UInt8('LineBias')
  .UInt16LE('BlankUnitNumPerScan')
  .UInt16LE('RowChangePoint')
  .Bits8({
    ABCDRollOver: [0, 1],
    ScanABCDCodeDesc: [1, 1],
    IsReverseScanOutput: [2, 1],
  })
  .UInt16LE('GclkNumPerScan')
  .UInt8('LightTimeRatio')
  .UInt16LE('ShiftUnitNum')
  .UInt16LE('TotalUnitNum')
  .UInt16LE('LightTime')
  .UInt8('DclkUnitCycle')
  .UInt8('DclkPhase')
  .UInt8('DclkHigh')
  .UInt8('GCLKRate')
  .UInt8('GCLKPhase')
  .UInt8('GCLKDuty')
  .UInt8('SubFields')
  .Buffer('SubFieldPart', MaxValue.MAX_SUBFIELDPART_COUNT)
  .Buffer('RowsCtrlByDataGroup', MaxValue.MAX_MODULEDATAGROUP)
  .UInt16LE('TotalGclkUnitNumPerScan')
  .Bits8({
    IsEnableCalibration: [0, 1],
    CorrectionMode: [1, 1],
    IsChromaCorrentionLowGray: [2, 1],
  })
  .UInt8('CoefSourceType')
  .UInt8('OfflineFrame')
  .Buffer('ScanABCDCode', MaxValue.MAX_SCAN >>> 1)
  .Custom('RGBCode', MonitorRGBCodeStruct.baseSize, getMonitorRGBCode, setMonitorRGBCode)
  .UInt16LE('MaxGammaValue')
  .back()
  .UInt16LE('LightTimeNum2')
  .Bits8({
    EnhancedMode: [0, 7],
    EnhancedModeSwitch: [7, 1],
  })
  .UInt8('LineScanTime')
  .seek(1)
  .Custom('IsSymmetricalOutputMode', 1, getBool(), setBool())
  .Custom('IsOpenClearBlankLine', 1, getBool(5), setBool(5))
  .UInt8('LowAshCompensationOne')
  .UInt8('LowAshCompensationTwo')
  .Custom('IsOpenLowAshCompensation', 1, getBool(160), setBool(160))
  .Bits8({
    DriverTypePro: [0, 4],
    DecodeTypePro: [4, 4],
  })
  .seek(2)
  .UInt16LE('GPositiveNegativeValue')
  .UInt16LE('BPositiveNegativeValue')
  .Custom('IsOpenSetGainValue', 1, getBool(245), setBool(245, 5))
  .UInt16LE('RPositiveNegativeValue')
  .Buffer('Gain3', 8)
  .Custom('PowerOnBrightnessAdjustEn', 1, getBool(5), setBool(5))
  .Custom('OpenEMCFun', 1, getBool(5), setBool(5))
  .UInt8('StartRefNumPerVs')
  .UInt8('StartSubFields')
  .UInt8('EndRefNumPerVs')
  .UInt8('EndSubFields')
  .seek(1)
  .UInt8('FirstScanCompensation')
  .UInt8('OtherScanCompenscation')
  .Custom('IsEnableOtherRefreshNumParams', 1, getBool(2), setBool(2))
  .Buffer('StartPositionOfDataGroup', MaxValue.MAX_MODULEDATAGROUP)
  .seek(2)
  .Buffer('Gain1', 8)
  .Custom('IsCloseGhostSignal', 1, ghostGetter, ghostSetter)
  .back()
  .Custom('IsGhostSignalNegation', 1, ghostGetter, ghostSetter)
  .UInt8('SerialDecodeRepeatTimes')
  .Custom('IsSupportMBI5041BNewTiming', 1, getBool(5), setBool(5))
  .Custom('IsSupportDriverInterDeghostEnable', 1, getBool(5), setBool(5))
  .Custom('LightFlashClose', 1, getBool(254), setBool(254, 1)) // 153
  .seek(1)
  .Custom(
    'CabinetRotateAngle',
    1,
    (_, [data]) => <RotateAngleEnum>((data + 3) % 4),
    (_, buffer, value) => buffer.writeUInt8((value + 1) % 4) > 0
  )
  .UInt8('GrayEnhanced') // 156
  .UInt16LE('RedNoCorrectionThreshold')
  .UInt16LE('GreenNoCorrectionThreshold')
  .UInt16LE('BlueNoCorrectionThreshold')
  .UInt16LE('VirRedNoCorrectionThreshold') // 163
  .UInt16LE('RedNoCorrectionAttenuation')
  .UInt16LE('GreenNoCorrectionAttenuation')
  .UInt16LE('BlueNoCorrectionAttenuation')
  .UInt16LE('VirRedNoCorrectionAttenuation')
  .UInt16LE('CtrlEndPoint') // 173
  .seek(4)
  .Bits8({
    IsNewOERamEnable: [1, 1],
    LowGrayQuery: [4, 2],
  }) // 179
  .UInt8('LowGrayCompensation')
  .UInt8('AddrExtend')
  .Custom('TwentyDataGroupEnable', 1, getBool(5), setBool(5))
  .Custom('GroupSwapEnable', 1, getBool(5), setBool(5))
  .Buffer('GroupSwapInfo', MaxValue.MAX_SCANNER_DATAGROUP) // 184
  .Bits8({
    IsLowGrayRamEnable: [0, 3],
    GrayDepthEx: [4, 4],
  })
  .UInt8('PreChargeTime')
  .UInt8('DataGroupOutPutType')
  .UInt8('MBI515xDeltaT')
  .UInt8('MBI515xDhT')
  .UInt8('SerialColorNum')
  .UInt8('SerialDotsNumPerColor')
  .Custom('SerialRGBCode', MonitorRGBCodeStruct.baseSize, getMonitorRGBCode, setMonitorRGBCode)
  .seek(8)
  .UInt16LE('LogicalShiftUnitNum') // 232
  // TODO: ChipRegistorConfig, ScanSequenceAdjustEn
  .Buffer('Gain2', 8)
  .Custom('ScanSequenceAdjustEn', 1, getBool(170), setBool(170))
  .seek(2)
  .Buffer('Gain4', 8)
  .seek(-2)
  .Bits8({
    EnFrameTimeMgt: [0, 2],
    IsSupportHighLoad: [4, 1],
  }) // 251
  .Custom('IsStarSwipPoint', 1, getBool(5), setBool(5))
  .UInt8('UnitIcCount')
  .Custom('EnableEnhanceFirstScan', 1, getBool(5), setBool(5))
  .back(0)
  .seek(334)
  .UInt8('RealBrightnessOf2053')
  .seek(1)
  .UInt16LE('TotalLightCdfResault')
  .Buffer('Gain5', 6)
  .seek(-4)
  .Buffer('ChannelEnableData', 2)
  .seek(2)
  .Buffer('Gain6', 6)
  .Buffer('Gain7', 6)
  .UInt8('ReduceHighContrast')
  .back(0)
  .seek(357)
  .UInt8('TinyAfterglowMoment')
  .UInt8('TinyLineFeedMoment')
  .Bits8({
    UsingBright: [6, 1],
    UsingSUM2033Gamma: [7, 1],
  }) // 359
  .UInt8('DisplayMode')
  .seek(1)
  .UInt8('LatDelay')
  .Bits8({
    CurrentPhase: [0, 2],
    CurrentPosition: [2, 2],
  })
  .seek(3)
  .Custom('EnableDirectMode', 1, getBool(5), setBool(5))
  .UInt8('ChipNumber')
  .UInt8('BrightPriorityMode')
  .back(0)
  .seek(400)
  .UInt8('OddEvenScan')
  .Bits8({
    ABCDESignalDelayTime: [0, 4],
    ABCSignalDelayEnable: [4, 1],
    DESignalDelayEnable: [5, 1],
  })
  .seek(10)
  .UInt8('BitModel')
  .seek(9)
  .Bits8({
    AutoOrManual5252ResetSwitch: [7, 1],
  })
  .back()
  .BCD('hour')
  .BCD('minute')
  .BCD('IntervalDate5252')
  .back(0)
  .seek(470)
  .UInt8('RealPhysicalGroupNum')
  .seek(2)
  .UInt8('chipGrayBit')
  .back(0)
  .seek(MaxValueInfo.MAX_PARAMETER_TABLE_LEN)
  .compile();
// .UInt8('')
// .UInt8('')
// .UInt8('')
// .UInt8('')
// .UInt8('')
// .UInt8('')
// .UInt8('')
// .UInt8('')
// .UInt8('')
// .UInt8('')
// .UInt8('')
// .UInt8('')
// .UInt8('')
// .UInt8('')
// .UInt8('')
// .UInt8('')
// .UInt8('')
// .UInt8('')
// .UInt8('')
// .UInt8('')
// .UInt8('')
// .UInt8('')
// .UInt8('')
// .UInt8('')
// .UInt8('')
// .UInt8('')
// .UInt8('')
// .UInt8('')
// .UInt8('')
// .UInt8('')
// .UInt8('')
// .UInt8('')
// .UInt8('')
// .UInt8('')
// .UInt8('')
// .UInt8('')
// .UInt8('')
// .UInt8('')
// .UInt8('')
// .UInt8('')
// .UInt8('')
// .UInt8('');

export type ScanboardData = ExtractType<typeof ScanboardData, false>;

const hasEnhancedMode = hasProps('EnhancedMode', 'EnhancedModeSwitch');
const is2033 = hasProps('UsingBright', 'UsingSUM2033Gamma');

const isChip2053ExtendPropety = (
  chipPropey: ChipBaseExtendPropey
): chipPropey is Chip2053ExtendPropety =>
  (chipPropey as any)['@_xsi:type'] === 'Chip2053ExtendPropety';

const isChip2163ExtendPropety = (
  chipPropey: ChipBaseExtendPropey
): chipPropey is Chip2163ExtendPropety =>
  (chipPropey as any)['@_xsi:type'] === 'Chip2163ExtendPropety';

export const encodeScanBoardProperty = (scanBdProp: ScanBoardProperty): Buffer => {
  if (!isValidScanBdProp(scanBdProp)) throw new TypeError('Invalid ScanBoardProperty');
  const scanData = new ScanboardData();
  Object.freeze(scanData);
  const {
    ChipPropey,
    StandardLedModuleProp: { DriverChipType },
    MaxGammaValue,
    LS9960Data,
  } = scanBdProp;
  if (isChip2053ExtendPropety(ChipPropey) || isChip2163ExtendPropety(ChipPropey)) {
    if (hasEnhancedMode(ChipPropey)) {
      const { EnhancedMode, EnhancedModeSwitch } = ChipPropey;
      scanData.EnhancedMode = EnhancedMode;
      scanData.EnhancedModeSwitch = EnhancedModeSwitch ? 1 : 0;
    }
  }
  if (
    [
      ChipTypeEnum.Chip_ICN2053,
      ChipTypeEnum.Chip_ICN2050,
      ChipTypeEnum.Chip_ICND2055,
      ChipTypeEnum.Chip_ICN2065,
      ChipTypeEnum.Chip_VOD5153,
      ChipTypeEnum.Chip_ICND2163,
      ChipTypeEnum.Chip_ICND2200,
      ChipTypeEnum.Chip_ICND2150,
      ChipTypeEnum.Chip_ICND2153,
    ].includes(DriverChipType)
  ) {
    scanData.MaxGammaValue = MaxGammaValue;
  } else if (DriverChipType === ChipTypeEnum.Chip_LS9960 && LS9960Data?.MaxGamaValue) {
    scanData.MaxGammaValue = LS9960Data.MaxGamaValue;
  }

  // let EnhancedMode;
  // let EnhancedModeSwitch;
  // if (hasEnhancedMode(ChipPropey)) {
  //   EnhancedMode = ChipPropey.EnhancedMode;
  //   EnhancedModeSwitch = ChipPropey.EnhancedModeSwitch;
  // }
  // let UsingBright;
  // let UsingSUM2033Gamma;
  // if (is2033(ChipPropey)) {
  //   UsingBright = ChipPrpey.UsingBright;
  //   UsingSUM2033Gamma = ChipPropey.UsingSUM2033Gamma;
  // }
  const {
    SpecialFrameRate: { StartRefNumPerVs, StartSubFields, EndRefNumPerVs, EndSubFields },
    StandardLedModuleProp: {
      ScreenDriveType,
      DataDirectType,
      ModulePixelCols,
      ModulePixelRows,
      DecodeTypePro,
      DriverTypePro,
      ScanType,
      OEPolarity,
      DecType,
      DataGroup,
      DataGroupSequence,
      TotalPointInTable,
      LineBias,
      ScanABCDCode, // *
      RowsCtrlByDataGroup, // A
      RGBCode,
      SerialColorNum,
      SerialDotsNumPerColor,
      SerialRGBCode,
      ChannelEnableData, // A
      // DecType
      ChipNumber,
    },
    GammaValue,
    Brightness,
    RedBright,
    GreenBright,
    BlueBright,
    VRedBright,
    MonitorRGBCode,
    DclkHighRatio,
    ModuleCols,
    ModuleRows,
    Width,
    Height,
    PhysicalDataGroupNum,
    ModCascadeType,
    PointNumberPerDriver, // *
    IsIrRegular,
    CommonIrCabinetMode,
    LogicalDataGroupNum,
    DriverFucntion,
    IsDExtendMode,
    Is24DataGroup,
    Is28DataGroup,
    // GrayDepth,
    // chipGrayBit,
    GrayRealize,
    GrayMode,
    RefNumPerVs,
    BlankUnitNumPerScan,
    RowChangePoint,
    ABCDRollOver,
    IsReverseScanOutput,
    ScanSequenceAdjustEn,
    GclkNumPerScan,
    LightTimeRatio,
    ShiftUnitNum, // *
    TotalUnitNum,
    LightTime,
    DclkUnitCycle,
    DclkPhase,
    DclkHigh,
    GCLKRate,
    GCLKPhase,
    GCLKDuty,
    SubFields,
    SubFieldPart, // A
    TotalGclkUnitNumPerScan, // *
    LatDelay, // *
    IsEnableCalibration,
    CorrectionMode,
    IsChromaCorrentionLowGray,
    CoefSourceType,
    OfflineFrame,
    // MaxGammaValue, // *
    LightTimeNum2, // *
    LineScanTime,
    IsSymmetricalOutputMode,
    IsOpenClearBlankLine,
    LowAshCompensationOne,
    LowAshCompensationTwo,
    IsOpenLowAshCompensation,
    PowerOnBrightnessAdjustEn,
    OpenEMCFun,
    EnableEnhanceFirstScan,
    IsOpenSetGainValue,
    FirstScanCompensation,
    OtherScanCompenscation,
    IsEnableOtherRefreshNumParams,
    IsSupportHighLoad,
    // startPositionOfDataGroup,
    IsCloseGhostSignal,
    IsGhostSignalNegation,
    SerialDecodeRepeatTimes,
    // IsSupportMBI5041BNewTiming,
    // IsSupportDriverInterDeghostEnable
    LightFlashClose,
    CabinetRotateAngle,
    // OperatingMode, GrayEnhanced
    RedNoCorrectionThreshold,
    GreenNoCorrectionThreshold,
    BlueNoCorrectionThreshold,
    VirRedNoCorrectionThreshold,
    RedNoCorrectionAttenuation,
    GreenNoCorrectionAttenuation,
    BlueNoCorrectionAttenuation,
    VirRedNoCorrectionAttenuation,
    CtrlEndPoint,
    IsNewOERamEnable,
    LowGrayQuery,
    LowGrayCompensation,
    AddrExtend,
    TwentyDataGroupEnable,
    GroupSwapEnable,
    GroupSwapInfo, // A
    IsLowGrayRamEnable,
    GrayDepth, // *
    PreChargeTime,
    DataGroupOutPutType, // *
    IsStarSwipPoint,
    UnitIcCount,
    MBI515xDeltaT,
    MBI515xDhT,
    LogicalShiftUnitNum,
    // chipRegistorConfig
    RealBrightnessOf2053,
    TotalLightCdfResault,
    ReduceHighContrast,
    CurrentPosition,
    CurrentPhase,
    TinyAfterglowMoment,
    TinyLineFeedMoment,
    BrightPriorityMode,
    ABCSignalDelayEnable,
    DESignalDelayEnable,
    ABCDESignalDelayTime,
    OddEvenScan,
    // Support22BitModel (BitModel)
    RealPhysicalGroupNum,
    AutoOrManual5252ResetSwitch,
    // Auto5252ResetTime: { Hour, Minute },
    IntervalDate5252,
    EnableDirectMode,
    // EliminateMode,
    // EliminatePotential,
    // ShadowEliminationEnhancedEnable,
    DisplayMode,
    // Support22BitModel
    // ChipPropey
    EnFrameTimeMgt,
    // IsSupportHighLoad,
  } = scanBdProp;
  Object.assign(scanData, {
    GammaValue,
    Brightness,
    RedBright,
    GreenBright,
    BlueBright,
    VRedBright,
    MonitorRGBCode,
    DclkHighRatio,
    ModuleCols,
    ModuleRows,
    Width,
    Height,
    PhysicalDataGroupNum,
    ModCascadeType,
    IsIrRegular,
    CommonIrCabinetMode,
    LogicalDataGroupNum,
    DriverFucntion,
    IsDExtendMode,
    Is24DataGroup,
    Is28DataGroup,
    GrayDepth,
    GrayRealize,
    GrayMode,
    RefNumPerVs,
    BlankUnitNumPerScan,
    RowChangePoint,
    ABCDRollOver,
    IsReverseScanOutput,
    ScanSequenceAdjustEn,
    GclkNumPerScan,
    LightTimeRatio,
    TotalUnitNum,
    LightTime,
    DclkUnitCycle,
    DclkPhase,
    DclkHigh,
    GCLKRate,
    GCLKPhase,
    GCLKDuty,
    SubFields,
    IsEnableCalibration,
    CorrectionMode,
    IsChromaCorrentionLowGray,
    CoefSourceType,
    OfflineFrame,
    LineScanTime,
    IsSymmetricalOutputMode,
    IsOpenClearBlankLine,
    LowAshCompensationOne,
    LowAshCompensationTwo,
    IsOpenLowAshCompensation,
    PowerOnBrightnessAdjustEn,
    OpenEMCFun,
    EnableEnhanceFirstScan,
    IsOpenSetGainValue,
    FirstScanCompensation,
    OtherScanCompenscation,
    IsEnableOtherRefreshNumParams,
    IsSupportHighLoad,
    IsCloseGhostSignal,
    IsGhostSignalNegation,
    SerialDecodeRepeatTimes,
    LightFlashClose,
    CabinetRotateAngle,
    RedNoCorrectionThreshold,
    GreenNoCorrectionThreshold,
    BlueNoCorrectionThreshold,
    VirRedNoCorrectionThreshold,
    RedNoCorrectionAttenuation,
    GreenNoCorrectionAttenuation,
    BlueNoCorrectionAttenuation,
    VirRedNoCorrectionAttenuation,
    CtrlEndPoint,
    IsNewOERamEnable,
    LowGrayQuery,
    LowGrayCompensation,
    AddrExtend,
    TwentyDataGroupEnable,
    GroupSwapEnable,
    IsLowGrayRamEnable,
    PreChargeTime,
    IsStarSwipPoint,
    UnitIcCount,
    MBI515xDeltaT,
    MBI515xDhT,
    LogicalShiftUnitNum,
    RealBrightnessOf2053,
    TotalLightCdfResault,
    ReduceHighContrast,
    CurrentPosition,
    CurrentPhase,
    TinyAfterglowMoment,
    TinyLineFeedMoment,
    BrightPriorityMode,
    ABCSignalDelayEnable,
    DESignalDelayEnable,
    ABCDESignalDelayTime,
    OddEvenScan,
    RealPhysicalGroupNum,
    AutoOrManual5252ResetSwitch,
    // Hour,
    // Minute,
    IntervalDate5252,
    EnableDirectMode,
    DisplayMode,
    EnFrameTimeMgt,

    StartRefNumPerVs,
    StartSubFields,
    EndRefNumPerVs,
    EndSubFields,

    ScreenDriveType,
    DataDirectType,
    ModulePixelCols,
    ModulePixelRows,
    DriverChipType,
    DecodeTypePro,
    DriverTypePro,
    ScanType,
    OEPolarity,
    DecType,
    DataGroup,
    DataGroupSequence,
    TotalPointInTable,
    LineBias,
    RGBCode,
    SerialColorNum,
    SerialDotsNumPerColor,
    SerialRGBCode,
    ChipNumber,
  });

  return ScanboardData.raw(scanData);
};
