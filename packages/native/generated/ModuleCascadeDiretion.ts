import EnumFromString from '../lib/common/EnumFromString';
/** @category Enums */
export enum ModuleCascadeDiretionEnum {
  RightLeft = 0,
  LeftRight = 1,
  DownUp = 2,
  UpDown = 3,
  Unknown = 255,
}
/**
 * Codec for {@link ModuleCascadeDiretionEnum}
 * @category Codecs
 * @see Automatically generated from ../decompiled/Nova.LCT.GigabitSystem.ProtocolEnum.decompiled.cs:1686
 */
export const ModuleCascadeDiretion = EnumFromString(
  ModuleCascadeDiretionEnum,
  'ModuleCascadeDiretion'
);
