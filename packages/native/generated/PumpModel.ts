import EnumFromString from '../lib/common/EnumFromString';
/** @category Enums */
export enum PumpModelEnum {
  NoPump = 0,
  pumpByGroup = 2,
  pumpByCabinet = 1,
}
/**
 * Codec for {@link PumpModelEnum}
 * @category Codecs
 * @see Automatically generated from ../decompiled/Nova.LCT.GigabitSystem.DataClass.decompiled.cs:29131
 */
export const PumpModel = EnumFromString(PumpModelEnum, 'PumpModel');
