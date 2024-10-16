import * as t from 'io-ts';
import * as common from '../lib/common';
import { ChipBaseExtendPropey } from './ChipBaseExtendPropey'; // import
import { ChipMBI5264ExtendProperty } from './ChipMBI5264ExtendProperty'; // import
import { PointDetectParameter } from './PointDetectParameter';
 // import
export const ChipMBI5264RGBVExtendPropertyBase = t.intersection(
  [
    ChipBaseExtendPropey,
    t.type({
      REG_LENGTH: common.Int32_16,
    }),
    t.partial({
      RedProperty: ChipMBI5264ExtendProperty, // #5854
      GreenProperty: ChipMBI5264ExtendProperty, // #5857
      BlueProperty: ChipMBI5264ExtendProperty, // #5860
      VRedProperty: ChipMBI5264ExtendProperty, // #5863
      PointDetectParameter, // #5880
      IsUseNewModule: common.Bool, // #5883
      ChipLibVersion: common.UInt8, // #5885
      FailureLEDElimination: common.Bool, // #5887
      GclkAddedNumer: common.UInt8, // #5901
      SubField: common.UInt8, // #5915
      GrayDepth: common.UInt8, // #5929
      ScanCount: common.UInt8, // #5956
      CompsentionTime: common.UInt16, // #5973
      GradientTransitionOptimizationTime: common.UInt16, // #5996
      M: common.UInt8, // #6019
      N: common.UInt8, // #6042
      Div: common.UInt8, // #6065
      IsAdvancedMode: common.Bool, // #6080
      IsGrayEnhncedMode: common.Bool, // #6092
      DefaultRegisterType: common.UInt8, // #6107
      SpecialDataLen: common.Int32, // #6119
      SpecialRegisterAddr: common.UInt32, // #6121
      FirstDataLen: common.Int32, // #6123
      FirstStartIndex: common.Int32, // #6125
      FirstRegisterAddr: common.Int32, // #6127
      ThirdDataLen: common.Int32,
    }),
  ],
  'ChipMBI5264RGBVExtendPropertyBase'
);
/**
 * Codec for {@link ChipMBI5264RGBVExtendProperty}
 * @category Codecs
 * @see Automatically generated from ../decompiled/Nova.LCT.GigabitSystem.ChipMBI5264.decompiled.cs:5843
 */
export const ChipMBI5264RGBVExtendProperty = t.intersection(
  [
    ChipMBI5264RGBVExtendPropertyBase,
    t.partial({ '@_xsi:type': t.literal('ChipMBI5264RGBVExtendProperty') }),
  ],
  'ChipMBI5264RGBVExtendProperty'
);
export interface ChipMBI5264RGBVExtendProperty
  extends t.TypeOf<typeof ChipMBI5264RGBVExtendProperty> {
  RedProperty?: ChipMBI5264ExtendProperty;
  GreenProperty?: ChipMBI5264ExtendProperty;
  BlueProperty?: ChipMBI5264ExtendProperty;
  VRedProperty?: ChipMBI5264ExtendProperty;
  PointDetectParameter: PointDetectParameter;
}
