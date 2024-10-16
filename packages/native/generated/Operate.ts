import EnumFromString from '../lib/common/EnumFromString';
/** @category Enums */
export enum OperateEnum {
  sendFile,
  getFile,
  sendData,
  getData,
}
/**
 * Codec for {@link OperateEnum}
 * @category Codecs
 * @see Automatically generated from ../decompiled/Nova.LCT.CorrectionProtocol.decompiled.cs:207
 */
export const Operate = EnumFromString(OperateEnum, 'Operate');
