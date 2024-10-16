import EnumFromString from '../lib/common/EnumFromString';
/** @category Enums */
export enum SBCapNameTypeEnum {
  RefreshRate,
  GrayStep,
  GrayRelize,
  DCLKClock,
  DCLKOccupy,
  DCLKPhase,
  CtrlEndPoint,
  LineMultiple,
  BlankTime,
  LineChangeTime,
  LightTime,
  GCLKClock,
  LowGrayCompensation,
  LowGrayQuery,
  ICNumber,
  ExcessiveTime,
  M,
  N,
  DVI,
  GCLKOccupy,
  GradientTransitionOptimizationTime,
  CompsentionTime,
  R,
  BrightEcyValue,
  BlankTimeValue,
}
/**
 * Codec for {@link SBCapNameTypeEnum}
 * @category Codecs
 * @see Automatically generated from ../decompiled/Nova.LCT.ChipCommonUI.decompiled.cs:9002
 */
export const SBCapNameType = EnumFromString(SBCapNameTypeEnum, 'SBCapNameType');
