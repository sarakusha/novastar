import * as t from 'io-ts';
import * as common from '../lib/common';
import { ChipBaseExtendPropey } from './ChipBaseExtendPropey';
 // import
export const ChipCFD855AExtendPropertyBase = t.intersection(
  [
    ChipBaseExtendPropey,
    t.type({
      RegisterArray: common.XMLArray(common.UInt16, 'ushort'),
    }),
    t.partial({
      IsUseNewModule: common.Bool, // #3232
      ChipLibVersion: common.UInt8, // #3234
      LowAshEnhanceUniformity: common.UInt8, // #3236
      ChangeLineBlankingLevel: common.UInt8, // #3248
      CouplingBlankingLevel: common.UInt8, // #3260
      ColumnBlankingInterval: common.UInt8, // #3272
      CoupledBlankingMode: common.UInt8, // #3284
      LineBreakBlankingMode: common.UInt8, // #3296
      OpenProtectEnable: common.Bool, // #3308
      OpenCircuitDetectionSuspends: common.Bool, // #3320
      CurrentGear: common.UInt8, // #3332
      ConstantCurrentInflectionPoint: common.UInt8, // #3344
      OpenDetectionVoltage: common.UInt8, // #3356
      PreDriverStrength: common.UInt8, // #3368
      PreDriverMode: common.UInt8, // #3380
      LowGrayCompsentionStrength: common.UInt8, // #3392
      LowGrayCompsentionMode: common.UInt8, // #3404
      DynamicEnergySavingEn1: common.Bool, // #3430
      LineBlankEnhanceModeEn: common.Bool, // #3442
      ParityScanningEnable: common.Bool, // #3454
      CouplingOptimizationSetting: common.UInt8, // #3466
      GclkSelection: common.UInt8, // #3478
      OpenCircuitDeteAutoRecoverEnableLevMode: common.UInt8, // #3490
      OpenCircuitDeteAutoRecoverEnableLev: common.UInt8, // #3502
      GrayScaleEnhancementEnable: common.Bool,
    }),
  ],
  'ChipCFD855AExtendPropertyBase'
);
/**
 * Codec for {@link ChipCFD855AExtendProperty}
 * @category Codecs
 * @see Automatically generated from ../decompiled/Nova.LCT.GigabitSystem.ChipCFD855A.decompiled.cs:3227
 */
export const ChipCFD855AExtendProperty = t.intersection(
  [
    ChipCFD855AExtendPropertyBase,
    t.partial({ '@_xsi:type': t.literal('ChipCFD855AExtendProperty') }),
  ],
  'ChipCFD855AExtendProperty'
);
export interface ChipCFD855AExtendProperty extends t.TypeOf<typeof ChipCFD855AExtendProperty> {}
