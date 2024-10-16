import EnumFromString from '../lib/common/EnumFromString';
/** @category Enums */
export enum WorkStatusTypeEnum {
  OK = 0,
  Error = 1,
  SenderCardError = 2,
  Unknown = 255,
}
/**
 * Codec for {@link WorkStatusTypeEnum}
 * @category Codecs
 * @see Automatically generated from ../decompiled/Nova.LCT.GigabitSystem.ProtocolEnum.decompiled.cs:2022
 */
export const WorkStatusType = EnumFromString(WorkStatusTypeEnum, 'WorkStatusType');
