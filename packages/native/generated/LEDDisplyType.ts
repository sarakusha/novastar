import EnumFromString from '../lib/common/EnumFromString';
/** @category Enums */
export enum LEDDisplyTypeEnum {
  SimpleSingleType,
  StandardType,
  ComplexType,
  CommonIrregularType,
}
/**
 * Codec for {@link LEDDisplyTypeEnum}
 * @category Codecs
 * @see Automatically generated from ../decompiled/Nova.LCT.GigabitSystem.DataClass.decompiled.cs:71346
 */
export const LEDDisplyType = EnumFromString(LEDDisplyTypeEnum, 'LEDDisplyType');
