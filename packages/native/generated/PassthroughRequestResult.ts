import EnumFromString from '../lib/common/EnumFromString';
/** @category Enums */
export enum PassthroughRequestResultEnum {
  NoRespond,
  Fail,
  Success,
}
/**
 * Codec for {@link PassthroughRequestResultEnum}
 * @category Codecs
 * @see Automatically generated from ../decompiled/Nova.LCT.CorrectionProtocol.decompiled.cs:219
 */
export const PassthroughRequestResult = EnumFromString(
  PassthroughRequestResultEnum,
  'PassthroughRequestResult'
);
