import EnumFromString from '../lib/common/EnumFromString';
/** @category Enums */
export enum PeripheralsTypeEnum {
  LightSensorOnSender,
  LightSensorOnFuncCardInPort,
  LightSensorOnComm,
}
/**
 * Codec for {@link PeripheralsTypeEnum}
 * @category Codecs
 * @see Automatically generated from ../decompiled/Nova.LCT.GigabitSystem.DataClass.decompiled.cs:72885
 */
export const PeripheralsType = EnumFromString(PeripheralsTypeEnum, 'PeripheralsType');
