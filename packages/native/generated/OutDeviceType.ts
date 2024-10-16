import EnumFromString from '../lib/common/EnumFromString';
/** @category Enums */
export enum OutDeviceTypeEnum {
  LightSensor = 0,
  TemAndHumSesor = 1,
  Emitter_3D = 2,
  TemperatureSensor = 3,
  HumiditySensor = 4,
  None = 255,
}
/**
 * Codec for {@link OutDeviceTypeEnum}
 * @category Codecs
 * @see Automatically generated from ../decompiled/Nova.LCT.GigabitSystem.ProtocolEnum.decompiled.cs:2073
 */
export const OutDeviceType = EnumFromString(OutDeviceTypeEnum, 'OutDeviceType');
