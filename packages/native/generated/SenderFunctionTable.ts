import EnumFromString from '../lib/common/EnumFromString';
/** @category Enums */
export enum SenderFunctionTableEnum {
  HLG,
  HDR10,
  Sender_3D,
  RGBSignalGamma,
  AudioSwitch,
  RedundantSetting,
  ScreenLock,
  DeviceRename,
  CabinetFileSender,
  CorrectionSpeed,
  QualityRegulation,
  DehumidificationMode1,
  HotBackUpChenck,
  PhotoelectricConversion,
  Rotation,
  LowDelay,
  BackupAndRestore,
  MirrorFlip,
  OpticalPortHotBackUp,
  ABL,
  ATMO,
  EDE,
  FreeRouting,
  HardwareScreen,
  Genlock,
  BoxConfigurationFileV20,
}
/**
 * Codec for {@link SenderFunctionTableEnum}
 * @category Codecs
 * @see Automatically generated from ../decompiled/Nova.LCT.GigabitSystem.ProtocolEnum.decompiled.cs:2487
 */
export const SenderFunctionTable = EnumFromString(SenderFunctionTableEnum, 'SenderFunctionTable');
