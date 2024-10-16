import EnumFromString from '../lib/common/EnumFromString';
/** @category Enums */
export enum EnLightSensorSiteEnum {
  FunctionCard = 0,
  SendCard = 1,
  None = 255,
}
/**
 * Codec for {@link EnLightSensorSiteEnum}
 * @category Codecs
 * @see Automatically generated from ../decompiled/Nova.LCT.GigabitSystem.ProtocolEnum.decompiled.cs:120
 */
export const EnLightSensorSite = EnumFromString(EnLightSensorSiteEnum, 'EnLightSensorSite');
