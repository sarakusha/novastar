import EnumFromString from '../lib/common/EnumFromString';
/** @category Enums */
export enum ModulationModeTypeEnum {
  NoDistributor = 0,
  TwoToFour = 1,
  OneToEight = 2,
  Unknown = 255,
}
/**
 * Codec for {@link ModulationModeTypeEnum}
 * @category Codecs
 * @see Automatically generated from ../decompiled/Nova.LCT.GigabitSystem.ProtocolEnum.decompiled.cs:2275
 */
export const ModulationModeType = EnumFromString(ModulationModeTypeEnum, 'ModulationModeType');
