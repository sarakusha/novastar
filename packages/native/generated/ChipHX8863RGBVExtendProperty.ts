import * as t from 'io-ts';
import * as common from '../lib/common';
import { ChipBaseExtendPropey } from './ChipBaseExtendPropey'; // import
import { ChipHX8863ExtendProperty } from './ChipHX8863ExtendProperty'; // import
import { PointDetectParameter } from './PointDetectParameter';
 // import
export const ChipHX8863RGBVExtendPropertyBase = t.intersection(
  [
    ChipBaseExtendPropey,
    t.type({
      REG_LENGTH: common.Int32_11,
    }),
    t.partial({
      RedProperty: ChipHX8863ExtendProperty, // #3481
      GreenProperty: ChipHX8863ExtendProperty, // #3483
      BlueProperty: ChipHX8863ExtendProperty, // #3485
      VRedProperty: ChipHX8863ExtendProperty, // #3487
      IsAdvancedMode: common.Bool, // #3512
      IsAdvancedsMode: common.Bool, // #3524
      SubField: common.UInt8, // #3536
      GrayDepth: common.UInt8, // #3557
      IsUseNewModule: common.Bool, // #3581
      SpecialDataLen: common.Int32, // #3583
      SpecialRegisterAddr: common.UInt32, // #3585
      OpenDetection: common.Bool, // #3587
      M: common.UInt8, // #3602
      N: common.UInt8, // #3623
      P: common.UInt8, // #3644
      IsNeedConfigureReg: common.Bool, // #3658
      FirstDataLen: common.Int32, // #3741
      FirstStartIndex: common.Int32, // #3743
      FirstRegisterAddr: common.Int32, // #3745
      ErrRedGain: common.Int32, // #3747
      ErrGreenGain: common.Int32, // #3759
      ErrBlueGain: common.Int32, // #3771
      PointDetectParameter,
    }),
  ],
  'ChipHX8863RGBVExtendPropertyBase'
);
/**
 * Codec for {@link ChipHX8863RGBVExtendProperty}
 * @category Codecs
 * @see Automatically generated from ../decompiled/Nova.LCT.GigabitSystem.ChipHX8863.decompiled.cs:3474
 */
export const ChipHX8863RGBVExtendProperty = t.intersection(
  [
    ChipHX8863RGBVExtendPropertyBase,
    t.partial({ '@_xsi:type': t.literal('ChipHX8863RGBVExtendProperty') }),
  ],
  'ChipHX8863RGBVExtendProperty'
);
export interface ChipHX8863RGBVExtendProperty
  extends t.TypeOf<typeof ChipHX8863RGBVExtendProperty> {
  RedProperty?: ChipHX8863ExtendProperty;
  GreenProperty?: ChipHX8863ExtendProperty;
  BlueProperty?: ChipHX8863ExtendProperty;
  VRedProperty?: ChipHX8863ExtendProperty;
  PointDetectParameter?: PointDetectParameter;
}
