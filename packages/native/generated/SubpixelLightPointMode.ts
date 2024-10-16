import EnumFromString from '../lib/common/EnumFromString';
/** @category Enums */
export enum SubpixelLightPointModeEnum {
  unknow,
  Light_Three_Mode1,
  Light_Three_Mode2,
  Light_Six_Mode1,
  Light_Six_Mode2,
  Light_Four_Mode,
  Light_Six_Mode3,
  Light_Six_Mode4,
}
/**
 * Codec for {@link SubpixelLightPointModeEnum}
 * @category Codecs
 * @see Automatically generated from ../decompiled/Nova.LCT.CorrectionProtocol.decompiled.cs:1280
 */
export const SubpixelLightPointMode = EnumFromString(
  SubpixelLightPointModeEnum,
  'SubpixelLightPointMode'
);
