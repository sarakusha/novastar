import EnumFromString from '../lib/common/EnumFromString';
/** @category Enums */
export enum DisplayPatternTypeEnum {
  DotScreen = 1,
  BlockScreen = 2,
  ChessboardScreen = 3,
  ReturnScreen = 4,
  SubpixelDotSpacingScreen = 5,
  SubpixelChessboardScreen = 6,
  CloseScreen = 0,
}
/**
 * Codec for {@link DisplayPatternTypeEnum}
 * @category Codecs
 * @see Automatically generated from ../decompiled/Nova.LCT.CorrectionProtocol.decompiled.cs:1640
 */
export const DisplayPatternType = EnumFromString(DisplayPatternTypeEnum, 'DisplayPatternType');
