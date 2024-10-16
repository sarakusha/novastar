import EnumFromString from '../lib/common/EnumFromString';
/** @category Enums */
export enum CoefTypeEnum {
  common = 1,
  lowlum,
  bluewhite,
  MultiLayer,
  DarkLine,
  ChipLowlum,
  SelfAdaption,
  TBSLowlum,
}
/**
 * Codec for {@link CoefTypeEnum}
 * @category Codecs
 * @see Automatically generated from ../decompiled/Nova.LCT.GigabitSystem.ProtocolEnum.decompiled.cs:2359
 */
export const CoefType = EnumFromString(CoefTypeEnum, 'CoefType');
