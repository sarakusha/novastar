import * as t from 'io-ts';
import * as common from '../lib/common';
import { ChipBaseExtendPropey } from './ChipBaseExtendPropey'; // import
import { ChipHX8864ExtendProperty } from './ChipHX8864ExtendProperty'; // import
import { PointDetectParameter } from './PointDetectParameter';
 // import
export const ChipHX8864RGBVExtendPropertyBase = t.intersection(
  [
    ChipBaseExtendPropey,
    t.type({
      REG_LENGTH: common.Int32_15,
    }),
    t.partial({
      RedProperty: ChipHX8864ExtendProperty, // #4193
      GreenProperty: ChipHX8864ExtendProperty, // #4195
      BlueProperty: ChipHX8864ExtendProperty, // #4197
      VRedProperty: ChipHX8864ExtendProperty, // #4199
      SubField: common.UInt8, // #4224
      GrayDepth: common.UInt8, // #4246
      IsAdvancedMode: common.Bool, // #4270
      GammaTable: common.Bool, // #4282
      IsUseNewModule: common.Bool, // #4294
      SpecialDataLen: common.Int32, // #4296
      SpecialRegisterAddr: common.UInt32, // #4298
      GclkFreqP: common.UInt8, // #4300
      GclkFreqN: common.UInt8, // #4314
      GclkFreqM: common.UInt8, // #4328
      OpenCircuitDetctEnable: common.Bool, // #4351
      IsNeedConfigureReg: common.Bool, // #4365
      PointDetectParameter, // #4367
      FirstDataLen: common.Int32, // #4369
      FirstStartIndex: common.Int32, // #4371
      FirstRegisterAddr: common.Int32, // #4373
      SecondDataLen: common.Int32, // #4375
      SecondStartIndex: common.Int32, // #4377
      SecondRegisterAddr: common.Int32, // #4379
      ThirdDataLen: common.Int32, // #4381
      ThirdDataStartIndex: common.Int32, // #4383
      ThirdRegisterAddr: common.Int32, // #4385
      FourthDataLen: common.Int32, // #4387
      FourthStartIndex: common.Int32, // #4389
      FourthRegisterAddr: common.Int32, // #4391
      FifthDataLen: common.Int32, // #4393
      FifthStartIndex: common.Int32, // #4395
      FifthRegisterAddr: common.Int32, // #4397
      SixthDataLen: common.Int32, // #4399
      SixthStartIndex: common.Int32, // #4401
      SixthRegisterAddr: common.Int32, // #4403
      ErrRedGain: common.Int32,
    }),
  ],
  'ChipHX8864RGBVExtendPropertyBase'
);
/**
 * Codec for {@link ChipHX8864RGBVExtendProperty}
 * @category Codecs
 * @see Automatically generated from ../decompiled/Nova.LCT.GigabitSystem.ChipHX8864.decompiled.cs:4186
 */
export const ChipHX8864RGBVExtendProperty = t.intersection(
  [
    ChipHX8864RGBVExtendPropertyBase,
    t.partial({ '@_xsi:type': t.literal('ChipHX8864RGBVExtendProperty') }),
  ],
  'ChipHX8864RGBVExtendProperty'
);
export interface ChipHX8864RGBVExtendProperty
  extends t.TypeOf<typeof ChipHX8864RGBVExtendProperty> {
  RedProperty?: ChipHX8864ExtendProperty;
  GreenProperty?: ChipHX8864ExtendProperty;
  BlueProperty?: ChipHX8864ExtendProperty;
  VRedProperty?: ChipHX8864ExtendProperty;
  PointDetectParameter?: PointDetectParameter;
}
