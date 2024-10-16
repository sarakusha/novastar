import EnumFromString from '../lib/common/EnumFromString';
/** @category Enums */
export enum DeviceStateTypesEnum {
  Other,
  Device_Master,
  Device_Slave,
}
/**
 * Codec for {@link DeviceStateTypesEnum}
 * @category Codecs
 * @see Automatically generated from ../decompiled/Nova.LCT.GigabitSystem.ProtocolEnum.decompiled.cs:2312
 */
export const DeviceStateTypes = EnumFromString(DeviceStateTypesEnum, 'DeviceStateTypes');
