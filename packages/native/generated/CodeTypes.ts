import EnumFromString from '../lib/common/EnumFromString';
/** @category Enums */
export enum CodeTypesEnum {
  requestRead,
  replyRead,
  requestWrite,
  replyWrite,
}
/**
 * Codec for {@link CodeTypesEnum}
 * @category Codecs
 * @see Automatically generated from ../decompiled/Nova.LCT.GigabitSystem.ProtocolEnum.decompiled.cs:2083
 */
export const CodeTypes = EnumFromString(CodeTypesEnum, 'CodeTypes');
