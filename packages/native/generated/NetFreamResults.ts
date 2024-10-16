import EnumFromString from '../lib/common/EnumFromString';
/** @category Enums */
export enum NetFreamResultsEnum {
  ok = 0,
  pending = 1,
  paraErr = -1,
  timeout = -2,
  recvErrResp = -3,
  hardwareExcp = -4,
  netErr = -5,
  fileErr = -6,
  lctRecvDataErr = -7,
  lctRecvFileErr = -8,
  scrInfoErr = -9,
}
/**
 * Codec for {@link NetFreamResultsEnum}
 * @category Codecs
 * @see Automatically generated from ../decompiled/Nova.LCT.CorrectionProtocol.decompiled.cs:164
 */
export const NetFreamResults = EnumFromString(NetFreamResultsEnum, 'NetFreamResults');
