import EnumFromString from '../lib/common/EnumFromString';
/** @category Enums */
export enum AutoAdjustFreqConfigModeEnum {
  Addr_1B00 = 0,
  Addr_0200 = 1,
  Addr_1B00And0200 = 2,
  UnKnow = 255,
}
/**
 * Codec for {@link AutoAdjustFreqConfigModeEnum}
 * @category Codecs
 * @see Automatically generated from ../decompiled/Nova.LCT.GigabitSystem.ProtocolEnum.decompiled.cs:2479
 */
export const AutoAdjustFreqConfigMode = EnumFromString(
  AutoAdjustFreqConfigModeEnum,
  'AutoAdjustFreqConfigMode'
);
