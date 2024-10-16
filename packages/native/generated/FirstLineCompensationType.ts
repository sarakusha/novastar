import EnumFromString from '../lib/common/EnumFromString';
/** @category Enums */
export enum FirstLineCompensationTypeEnum {
  Closed,
  Effect1,
  Effect2,
  Effect3,
  Effect4,
  Effect5,
  Effect6,
  Effect7,
}
/**
 * Codec for {@link FirstLineCompensationTypeEnum}
 * @category Codecs
 * @see Automatically generated from ../decompiled/Nova.LCT.GigabitSystem.DataClass.decompiled.cs:66701
 */
export const FirstLineCompensationType = EnumFromString(
  FirstLineCompensationTypeEnum,
  'FirstLineCompensationType'
);
