import EnumFromString from '../lib/common/EnumFromString';
/** @category Enums */
export enum AckResultsEnum {
  ok = 0,
  timeout = 1,
  requestCrcErr = 2,
  replyCrcErr = 3,
  unknownCmd = 4,
  invalid = 255,
}
/**
 * Codec for {@link AckResultsEnum}
 * @category Codecs
 * @see Automatically generated from ../decompiled/Nova.LCT.GigabitSystem.ProtocolEnum.decompiled.cs:2091
 */
export const AckResults = EnumFromString(AckResultsEnum, 'AckResults');
