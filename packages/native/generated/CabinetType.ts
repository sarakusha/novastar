import EnumFromString from '../lib/common/EnumFromString';
/** @category Enums */
export enum CabinetTypeEnum {
  Regular = 0,
  IrRegular = 1,
  Unknown = 255,
}
/**
 * Codec for {@link CabinetTypeEnum}
 * @category Codecs
 * @see Automatically generated from ../decompiled/Nova.LCT.GigabitSystem.DataClass.decompiled.cs:71354
 */
export const CabinetType = EnumFromString(CabinetTypeEnum, 'CabinetType');
