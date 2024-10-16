import EnumFromString from '../lib/common/EnumFromString';
/** @category Enums */
export enum DeviceTypeEnum {
  Sender = 1,
  Scanner,
  All,
}
/**
 * Codec for {@link DeviceTypeEnum}
 * @category Codecs
 * @see Automatically generated from ../decompiled/Nova.LCT.CorrectionProtocol.decompiled.cs:1650
 */
export const DeviceType = EnumFromString(DeviceTypeEnum, 'DeviceType');
