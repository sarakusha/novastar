import EnumFromString from '../lib/common/EnumFromString';
/** @category Enums */
export enum ReplyPackageResultEnum {
  ok = 0,
  scrInfoErr = 1,
  recvErrResp = 2,
  hardwareExcp = 3,
  lctRecvDataErr = 4,
  lctRecvFileErr = 5,
  notSupport = 6,
  fileErr = 7,
  paraErr = 8,
  Failed = -1,
  RaiseAnException = 9,
  DataError = 10, // 0xA
  Cancelled = 11, // 0xB
  fileSendNotExist = 249, // 0xF9
  deviceSpaceNoEnough = 250, // 0xFA
  fileDataNotEnough = 251, // 0xFB
  fileCrcErr = 252, // 0xFC
  createCheckCodeError = 253, // 0xFD
  unkonwn = 254, // 0xFE
  timeout = 255,
}
/**
 * Codec for {@link ReplyPackageResultEnum}
 * @category Codecs
 * @see Automatically generated from ../decompiled/Nova.LCT.CorrectionProtocol.decompiled.cs:178
 */
export const ReplyPackageResult = EnumFromString(ReplyPackageResultEnum, 'ReplyPackageResult');
