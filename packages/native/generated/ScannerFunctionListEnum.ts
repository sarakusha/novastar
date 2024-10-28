import EnumFromString from '../lib/common/EnumFromString';
/** @category Enums */
export enum ScannerFunctionListEnumEnum {
  NoSenderCardMode = 0,
  ErrorBitDetect = 1,
  DobulePowerBackUp = 2,
  DobuleCardBackUp = 3,
  LinkMonitorCard = 4,
  HubMonitor = 5,
  SmartModule = 6,
  ModuleFlash = 7,
  LargeLoad = 8,
  ClearViewMode = 9,
  Is18BitMode = 10, // 0xA
  MappingMode = 11, // 0xB
  NewAdjustLine = 12, // 0xC
  CorrectionCofeDobuleBackUp = 13, // 0xD
  AutoCorrection = 14, // 0xE
  CorrectionMode = 15, // 0xF
  IsSupport18BitGamma = 16, // 0x10
  SingleGamma = 17, // 0x11
  ConfigParameterDobuleBackUp = 18, // 0x12
  ProgramRead = 19, // 0x13
  HDRMode = 20, // 0x14
  LowDelay = 21, // 0x15
  AnyAngleRotation = 22, // 0x16
  Rotation90 = 23, // 0x17
  FineGrayAdjust = 24, // 0x18
  GrayFirstAdjustBright = 25, // 0x19
  UpLoadCorrectionCofeSpeedUp = 26, // 0x1A
  MatrixColorMangement = 27, // 0x1B
  XBitMode = 28, // 0x1C
  HardwarePlayScreenAdjustLine = 29, // 0x1D
  ScannerParameterSegmentSolidified = 30, // 0x1E
  ProgramIsSimplyVersion = 31, // 0x1F
  FineGrayAdjustVer3 = 32, // 0x20
  MatrixColorMangement2 = 33, // 0x21
  FactoryBackUp = 34, // 0x22
  BrightDarkLineFix = 35, // 0x23
  BrightDarkLineFixCoefUploadSpeedUp = 36, // 0x24
  CorrectionCoefCompress = 37, // 0x25
  SetBrightDarkLineFixState = 38, // 0x26
  ReadBrightDarkLineFixCoef = 39, // 0x27
  MultiLayerCorrection = 40, // 0x28
  MultiLayerCorrection_BOE = 41, // 0x29
  ABL = 42, // 0x2A
  MagicGray = 43, // 0x2B
  ICConcordance = 44, // 0x2C
  Is64DataGroup = 45, // 0x2D
  MultiModeHigh0rderDepthGamma = 46, // 0x2E
  IsSupportChipAutoRate = 47, // 0x2F
  LowLatencyPointTable = 48, // 0x30
  TBS614En = 49, // 0x31
  IsSupportSubpxielCorrection = 50, // 0x32
  UnKnow = 65535,
}
/**
 * Codec for {@link ScannerFunctionListEnumEnum}
 * @category Codecs
 * @see Automatically generated from ../decompiled/Nova.LCT.GigabitSystem.ProtocolEnum.decompiled.cs:2396
 */
export const ScannerFunctionListEnum = EnumFromString(
  ScannerFunctionListEnumEnum,
  'ScannerFunctionListEnum'
);