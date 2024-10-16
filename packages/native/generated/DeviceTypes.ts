import EnumFromString from '../lib/common/EnumFromString';
/** @category Enums */
export enum DeviceTypesEnum {
  FirstScaleDevice,
  Scanner,
  FunctionCard,
  Distributor,
  Sender3D,
}
/**
 * Codec for {@link DeviceTypesEnum}
 * @category Codecs
 * @see Automatically generated from ../decompiled/Nova.LCT.GigabitSystem.ProtocolEnum.decompiled.cs:2101
 */
export const DeviceTypes = EnumFromString(DeviceTypesEnum, 'DeviceTypes');
