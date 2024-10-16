import EnumFromString from '../lib/common/EnumFromString';
/** @category Enums */
export enum MonitorDisplayTypeEnum {
  SBStatus,
  Temperature,
  MCStatus,
  Humidity,
  Smoke,
  Fan,
  Power,
  RowLine,
  GeneralSwitch,
  SenderDVI,
  ExternalDevice,
  MuduleTemperature,
}
/**
 * Codec for {@link MonitorDisplayTypeEnum}
 * @category Codecs
 * @see Automatically generated from ../decompiled/Nova.LCT.GigabitSystem.DataClass.decompiled.cs:71451
 */
export const MonitorDisplayType = EnumFromString(MonitorDisplayTypeEnum, 'MonitorDisplayType');
