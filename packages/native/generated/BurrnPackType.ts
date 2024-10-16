import EnumFromString from '../lib/common/EnumFromString';
/** @category Enums */
export enum BurrnPackTypeEnum {
  MCU,
  FPGA,
  FontLib,
  GammaTable,
  FunctionTable,
  OTHER,
}
/**
 * Codec for {@link BurrnPackTypeEnum}
 * @category Codecs
 * @see Automatically generated from ../decompiled/Nova.LCT.GigabitSystem.ProtocolEnum.decompiled.cs:2296
 */
export const BurrnPackType = EnumFromString(BurrnPackTypeEnum, 'BurrnPackType');
