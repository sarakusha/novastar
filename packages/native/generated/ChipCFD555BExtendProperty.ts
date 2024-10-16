import * as t from 'io-ts';
import * as common from '../lib/common';
import { ChipBaseExtendPropey } from './ChipBaseExtendPropey';
 // import
export const ChipCFD555BExtendPropertyBase = t.intersection(
  [
    ChipBaseExtendPropey,
    t.type({
      RegisterArray: common.XMLArray(common.UInt16, 'ushort'),
    }),
    t.partial({
      IsUseNewModule: common.Bool, // #3506
      ChipLibVersion: common.UInt8, // #3508
      RefreshRate: common.UInt8, // #3510
      LowAshEnhanceUniformity: common.UInt8, // #3522
      ChangeLineBlankingLevel: common.UInt8, // #3534
      CouplingBlankingLevel: common.UInt8, // #3546
      ColumnBlankingInterval: common.UInt8, // #3558
      CoupledBlankingMode: common.UInt8, // #3570
      LineBreakBlankingMode: common.UInt8, // #3582
      OpenProtectEnable: common.Bool, // #3594
      OpenCircuitDetectionSuspends: common.Bool, // #3606
      CurrentGear: common.UInt8, // #3618
      ConstantCurrentInflectionPoint: common.UInt8, // #3630
      OpenDetectionVoltage: common.UInt8, // #3642
      PreDriverStrength: common.UInt8, // #3654
      PreDriverMode: common.UInt8, // #3666
      LowGrayCompsentionStrength: common.UInt8, // #3678
      LowGrayCompsentionMode: common.UInt8, // #3690
      DynamicEnergySavingEn1: common.Bool, // #3716
      LineBlankEnhanceModeEn: common.Bool, // #3728
      ParityScanningEnable: common.Bool, // #3740
      CouplingOptimizationSetting: common.UInt8, // #3752
      AshCompensationSetting1: common.UInt8, // #3764
      LowGrayModeEn: common.Bool, // #3776
      AshCompensationSetting2: common.UInt8, // #3788
      OpenCircuitDeteAutoRecoverEnable: common.Bool, // #3800
      OpenCircuitDeteAutoRecoverEnableLev: common.UInt8, // #3812
      OpenCircuitDeteAutoRecoverEnableLevMode: common.UInt8, // #3824
      GclkSelection: common.UInt8, // #3836
      GrayScaleEnhancementEnable: common.Bool,
    }),
  ],
  'ChipCFD555BExtendPropertyBase'
);
/**
 * Codec for {@link ChipCFD555BExtendProperty}
 * @category Codecs
 * @see Automatically generated from ../decompiled/Nova.LCT.GigabitSystem.ChipCFD555B.decompiled.cs:3501
 */
export const ChipCFD555BExtendProperty = t.intersection(
  [
    ChipCFD555BExtendPropertyBase,
    t.partial({ '@_xsi:type': t.literal('ChipCFD555BExtendProperty') }),
  ],
  'ChipCFD555BExtendProperty'
);
export interface ChipCFD555BExtendProperty extends t.TypeOf<typeof ChipCFD555BExtendProperty> {}
