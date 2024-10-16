import * as t from 'io-ts';
import * as common from '../lib/common';
import { ChipBaseExtendPropey } from './ChipBaseExtendPropey'; // import
import { ChipMBI5864ExtendProperty } from './ChipMBI5864ExtendProperty';
 // import
export const ChipMBI5864RGBVExtendPropertyBase = t.intersection(
  [
    ChipBaseExtendPropey,
    t.type({
      REG_LENGTH: common.Int32_12, // #239
      GlobalRegisterArray: common.XMLArray(common.UInt16, 'ushort'), // #241
      PINRegisterArray: common.XMLArray(common.UInt16, 'ushort'), // #243
      OrderRegisterArray: common.XMLArray(common.UInt16, 'ushort'), // #245
      GLOBAL: common.withDefault(t.string, 'Global'), // #247
      R: common.withDefault(t.string, 'R'), // #249
      G: common.withDefault(t.string, 'G'), // #251
      B: common.withDefault(t.string, 'B'), // #527
      WaiteTime: common.Int32_1, // #539
      CapabilityWaiteTime: common.UInt8_1, // #551
      Tvsync_dead: common.Int32_1, // #563
      Tgclktotal: common.Int32_1,
    }),
    t.partial({
      RedProperty: ChipMBI5864ExtendProperty, // #235
      GreenProperty: ChipMBI5864ExtendProperty, // #237
      BlueProperty: ChipMBI5864ExtendProperty, // #253
      IsUseNewModule: common.Bool, // #267
      ChipLibVersion: common.UInt8, // #269
      ScanCount: common.UInt8, // #271
      GrayDepth: common.UInt8, // #283
      SubField: common.UInt8, // #308
      FailureLEDElimination: common.Bool, // #329
      CompsentionTime: common.UInt16, // #341
      GradientTransitionOptimizationTime: common.UInt16, // #358
      P: common.UInt8, // #375
      M: common.UInt8, // #387
      N: common.UInt8, // #399
      Div: common.UInt8, // #411
      IsAdvancedMode: common.Bool, // #456
      VsyncDead: common.UInt16, // #468
      AllExtraGclk: common.UInt8, // #480
      ExtraGclkDummy: common.UInt8, // #492
      LowGray: common.UInt8, // #506
      LineScanMode: common.Bool, // #575
      SpecialDataLen: common.Int32, // #587
      SpecialRegisterAddr: common.UInt32, // #589
      SecondDataLen: common.Int32, // #591
      SecondStartIndex: common.Int32, // #593
      SecondRegisterAddr: common.Int32, // #595
      ThirdDataLen: common.Int32, // #597
      ThirdDataStartIndex: common.Int32, // #599
      ThirdRegisterAddr: common.Int32, // #601
      FourthDataLen: common.Int32, // #603
      FourthStartIndex: common.Int32, // #605
      FourthRegisterAddr: common.Int32,
    }),
  ],
  'ChipMBI5864RGBVExtendPropertyBase'
);
/**
 * Codec for {@link ChipMBI5864RGBVExtendProperty}
 * @category Codecs
 * @see Automatically generated from ../decompiled/Nova.LCT.GigabitSystem.ChipMBI5864.decompiled.cs:228
 */
export const ChipMBI5864RGBVExtendProperty = t.intersection(
  [
    ChipMBI5864RGBVExtendPropertyBase,
    t.partial({ '@_xsi:type': t.literal('ChipMBI5864RGBVExtendProperty') }),
  ],
  'ChipMBI5864RGBVExtendProperty'
);
export interface ChipMBI5864RGBVExtendProperty
  extends t.TypeOf<typeof ChipMBI5864RGBVExtendProperty> {
  RedProperty?: ChipMBI5864ExtendProperty;
  GreenProperty?: ChipMBI5864ExtendProperty;
  BlueProperty?: ChipMBI5864ExtendProperty;
}
