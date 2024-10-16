import * as t from 'io-ts';
import * as common from '../lib/common';
import { ChipBaseExtendPropey } from './ChipBaseExtendPropey'; // import
import { ChipNT27003ExtendProperty } from './ChipNT27003ExtendProperty';
 // import
export const ChipNT27003RGBVExtendPropertyBase = t.intersection(
  [
    ChipBaseExtendPropey,
    t.type({
      REG_LENGTH: common.Int32_196,
    }),
    t.partial({
      RedProperty: ChipNT27003ExtendProperty, // #99
      GreenProperty: ChipNT27003ExtendProperty, // #101
      BlueProperty: ChipNT27003ExtendProperty, // #103
      VRedProperty: ChipNT27003ExtendProperty, // #105
      IsUseNewModule: common.Bool, // #107
      ChipLibVersion: common.UInt8, // #109
      IsAdvancedMode: common.Bool, // #111
      ModeSelect: common.UInt8, // #123
      ScanType: common.UInt8, // #135
      RefreshRate: common.UInt8, // #147
      GCKF: common.UInt8, // #159
      GrayDepth: common.Int32, // #171
      FrameStartTime: common.Int32, // #183
      ShadowEliminationTime: common.Int32, // #195
      PrechargeTime: common.Int32, // #207
      ScanShadowEliminationTime: common.Int32, // #219
      ScanOpeningDelayTime: common.Int32, // #231
      ScanCloseingDelayTime: common.Int32, // #243
      ScanShadowEliminationVoltage: common.Int32, // #255
      ShadowEliminationVoltageR: common.Int32, // #267
      ShadowEliminationVoltageG: common.Int32, // #279
      ShadowEliminationVoltageB: common.Int32, // #291
      OverTemperatureProtection: common.Bool, // #303
      OverTemperatureProtectionSelect: common.UInt8, // #315
      OpenFillBlackSwitch: common.Bool, // #327
      ErrorDetectMode: common.Bool, // #339
      OpenCircuitDetectVoltageR: common.UInt8, // #351
      OpenCircuitDetectVoltageG: common.UInt8, // #363
      OpenCircuitDetectVoltageB: common.UInt8, // #375
      PrechargeVoltagR: common.Int32, // #387
      PrechargeVoltagG: common.Int32, // #399
      PrechargeVoltagB: common.Int32, // #411
      CurrentRangeSelectR: common.UInt8, // #423
      CurrentRangeSelectG: common.UInt8, // #435
      CurrentRangeSelectB: common.UInt8, // #447
      PWMCompensationR: common.UInt8, // #459
      PWMCompensationG: common.UInt8, // #471
      PWMCompensationB: common.UInt8, // #483
      ColorTemperatureAdjustOneHighR: common.UInt8, // #495
      ColorTemperatureAdjustOneHighG: common.UInt8, // #507
      ColorTemperatureAdjustOneHighB: common.UInt8, // #519
      ColorTemperatureAdjustTwoHighR: common.UInt8, // #531
      ColorTemperatureAdjustTwoHighG: common.UInt8, // #543
      ColorTemperatureAdjustTwoHighB: common.UInt8, // #555
      ColorTemperatureAdjustOneLowR: common.UInt8, // #567
      ColorTemperatureAdjustOneLowG: common.UInt8, // #579
      ColorTemperatureAdjustOneLowB: common.UInt8, // #591
      ColorTemperatureAdjustTwoLowR: common.UInt8, // #603
      ColorTemperatureAdjustTwoLowG: common.UInt8, // #615
      ColorTemperatureAdjustTwoLowB: common.UInt8, // #627
      CurrentGainR: common.Int32, // #639
      CurrentGainG: common.Int32, // #652
      CurrentGainB: common.Int32, // #667
      FirstDataLen: common.Int32, // #680
      FirstStartIndex: common.Int32, // #682
      FirstRegisterAddr: common.Int32, // #684
      SecondDataLen: common.Int32, // #686
      SecondStartIndex: common.Int32, // #688
      SecondRegisterAddr: common.Int32, // #690
      SpecialDataLen: common.Int32, // #692
      SpecialRegisterAddr: common.UInt32,
    }),
  ],
  'ChipNT27003RGBVExtendPropertyBase'
);
/**
 * Codec for {@link ChipNT27003RGBVExtendProperty}
 * @category Codecs
 * @see Automatically generated from ../decompiled/Nova.LCT.GigabitSystem.ChipNT27003.decompiled.cs:92
 */
export const ChipNT27003RGBVExtendProperty = t.intersection(
  [
    ChipNT27003RGBVExtendPropertyBase,
    t.partial({ '@_xsi:type': t.literal('ChipNT27003RGBVExtendProperty') }),
  ],
  'ChipNT27003RGBVExtendProperty'
);
export interface ChipNT27003RGBVExtendProperty
  extends t.TypeOf<typeof ChipNT27003RGBVExtendProperty> {
  RedProperty?: ChipNT27003ExtendProperty;
  GreenProperty?: ChipNT27003ExtendProperty;
  BlueProperty?: ChipNT27003ExtendProperty;
  VRedProperty?: ChipNT27003ExtendProperty;
}
