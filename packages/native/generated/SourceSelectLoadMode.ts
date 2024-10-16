import EnumFromString from '../lib/common/EnumFromString';
/** @category Enums */
export enum SourceSelectLoadModeEnum {
  HighLoad = 0,
  BackUpLoad = 88,
}
/**
 * Codec for {@link SourceSelectLoadModeEnum}
 * @category Codecs
 * @see Automatically generated from ../decompiled/Nova.LCT.GigabitSystem.ProtocolEnum.decompiled.cs:2252
 */
export const SourceSelectLoadMode = EnumFromString(
  SourceSelectLoadModeEnum,
  'SourceSelectLoadMode'
);
