import EnumFromString from '../lib/common/EnumFromString';
/** @category Enums */
export enum DataDirectionTypeEnum {
  Horizontal = 0,
  Vertical = 1,
  Unknown = 255,
}
/**
 * Codec for {@link DataDirectionTypeEnum}
 * @category Codecs
 * @see Automatically generated from ../decompiled/Nova.LCT.GigabitSystem.ProtocolEnum.decompiled.cs:1961
 */
export const DataDirectionType = EnumFromString(DataDirectionTypeEnum, 'DataDirectionType');
