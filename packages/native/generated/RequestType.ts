import EnumFromString from '../lib/common/EnumFromString';
/** @category Enums */
export enum RequestTypeEnum {
  Read,
  Send,
}
/**
 * Codec for {@link RequestTypeEnum}
 * @category Codecs
 * @see Automatically generated from ../decompiled/Nova.LCT.CorrectionProtocol.decompiled.cs:214
 */
export const RequestType = EnumFromString(RequestTypeEnum, 'RequestType');
