import EnumFromString from '../lib/common/EnumFromString';
/** @category Enums */
export enum BaudRateTypeEnum {
  BT_115200bps,
  BT_57600bps,
  BT_38400bps,
  BT_19200bps,
  BT_9600bps,
  BT_4800bps,
  BT_2400bps,
  BT_1200bps,
  BT_Reserved,
}
/**
 * Codec for {@link BaudRateTypeEnum}
 * @category Codecs
 * @see Automatically generated from ../decompiled/Nova.LCT.GigabitSystem.ProtocolEnum.decompiled.cs:2060
 */
export const BaudRateType = EnumFromString(BaudRateTypeEnum, 'BaudRateType');
