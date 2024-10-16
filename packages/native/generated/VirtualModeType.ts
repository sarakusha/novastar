import EnumFromString from '../lib/common/EnumFromString';
/** @category Enums */
export enum VirtualModeTypeEnum {
  Disable = 0,
  Led4Mode1 = 135, // 0x87
  Led4Mode2 = 136, // 0x88
  Led3 = 129, // 0x81
  Led31 = 130, // 0x82
  Unknown = 255,
}
/**
 * Codec for {@link VirtualModeTypeEnum}
 * @category Codecs
 * @see Automatically generated from ../decompiled/Nova.LCT.GigabitSystem.ProtocolEnum.decompiled.cs:1717
 */
export const VirtualModeType = EnumFromString(VirtualModeTypeEnum, 'VirtualModeType');
