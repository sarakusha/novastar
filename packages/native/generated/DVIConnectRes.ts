import EnumFromString from '../lib/common/EnumFromString';
/** @category Enums */
export enum DVIConnectResEnum {
  OK,
  PartialConnect,
  Error,
}
/**
 * Codec for {@link DVIConnectResEnum}
 * @category Codecs
 * @see Automatically generated from ../decompiled/Nova.LCT.CorrectionProtocol.decompiled.cs:1634
 */
export const DVIConnectRes = EnumFromString(DVIConnectResEnum, 'DVIConnectRes');
