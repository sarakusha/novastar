import EnumFromString from '../lib/common/EnumFromString';
/** @category Enums */
export enum DeviceConnectionTypeEnum {
  Chronous = 0,
  Async = 1,
  UnKnow = 10,
}
/**
 * Codec for {@link DeviceConnectionTypeEnum}
 * @category Codecs
 * @see Automatically generated from ../decompiled/Nova.LCT.CorrectionProtocol.decompiled.cs:225
 */
export const DeviceConnectionType = EnumFromString(
  DeviceConnectionTypeEnum,
  'DeviceConnectionType'
);
