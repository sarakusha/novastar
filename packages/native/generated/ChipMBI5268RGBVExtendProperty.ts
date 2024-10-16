import * as t from 'io-ts';
import * as common from '../lib/common';
import { ChipBaseExtendPropey } from './ChipBaseExtendPropey'; // import
import { ChipMBI5268ExtendProperty } from './ChipMBI5268ExtendProperty'; // import
import { PointDetectParameter } from './PointDetectParameter';
 // import
export const ChipMBI5268RGBVExtendPropertyBase = t.intersection(
  [
    ChipBaseExtendPropey,
    t.type({
      REG_LENGTH: common.Int32_16,
    }),
    t.partial({
      RedProperty: ChipMBI5268ExtendProperty, // #5127
      GreenProperty: ChipMBI5268ExtendProperty, // #5129
      BlueProperty: ChipMBI5268ExtendProperty, // #5131
      VRedProperty: ChipMBI5268ExtendProperty, // #5133
      IsUseNewModule: common.Bool, // #5145
      ChipLibVersion: common.UInt8, // #5147
      FailureLEDElimination: common.Bool, // #5149
      GclkAddedNumer: common.UInt8, // #5163
      SubField: common.UInt8, // #5177
      GrayDepth: common.UInt8, // #5191
      ScanCount: common.UInt8, // #5218
      CompsentionTime: common.UInt16, // #5238
      GradientTransitionOptimizationTime: common.UInt16, // #5261
      M: common.UInt8, // #5284
      N: common.UInt8, // #5307
      Div: common.UInt8, // #5330
      IsAdvancedMode: common.Bool, // #5345
      IsGrayEnhncedMode: common.Bool, // #5357
      DefaultRegisterType: common.UInt8, // #5372
      SpecialDataLen: common.Int32, // #5385
      SpecialRegisterAddr: common.UInt32, // #5387
      FirstDataLen: common.Int32, // #5389
      FirstStartIndex: common.Int32, // #5391
      FirstRegisterAddr: common.Int32, // #5393
      ThirdDataLen: common.Int32, // #5395
      PointDetectParameter,
    }),
  ],
  'ChipMBI5268RGBVExtendPropertyBase'
);
/**
 * Codec for {@link ChipMBI5268RGBVExtendProperty}
 * @category Codecs
 * @see Automatically generated from ../decompiled/Nova.LCT.GigabitSystem.ChipMBI5268.decompiled.cs:5122
 */
export const ChipMBI5268RGBVExtendProperty = t.intersection(
  [
    ChipMBI5268RGBVExtendPropertyBase,
    t.partial({ '@_xsi:type': t.literal('ChipMBI5268RGBVExtendProperty') }),
  ],
  'ChipMBI5268RGBVExtendProperty'
);
export interface ChipMBI5268RGBVExtendProperty
  extends t.TypeOf<typeof ChipMBI5268RGBVExtendProperty> {
  RedProperty?: ChipMBI5268ExtendProperty;
  GreenProperty?: ChipMBI5268ExtendProperty;
  BlueProperty?: ChipMBI5268ExtendProperty;
  VRedProperty?: ChipMBI5268ExtendProperty;
  PointDetectParameter?: PointDetectParameter;
}
