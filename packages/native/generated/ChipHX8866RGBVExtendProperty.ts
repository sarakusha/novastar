import * as t from 'io-ts';
import * as common from '../lib/common';
import { ChipBaseExtendPropey } from './ChipBaseExtendPropey'; // import
import { ChipHX8866ExtendProperty } from './ChipHX8866ExtendProperty';
 // import
export const ChipHX8866RGBVExtendPropertyBase = t.intersection(
  [
    ChipBaseExtendPropey,
    t.type({
      REG_LENGTH: common.Int32_11,
    }),
    t.partial({
      RedProperty: ChipHX8866ExtendProperty, // #3464
      GreenProperty: ChipHX8866ExtendProperty, // #3466
      BlueProperty: ChipHX8866ExtendProperty, // #3468
      VRedProperty: ChipHX8866ExtendProperty, // #3470
      IsAdvancedMode: common.Bool, // #3495
      SubField: common.UInt8, // #3507
      GrayDepth: common.UInt8, // #3528
      IsUseNewModule: common.Bool, // #3552
      SpecialDataLen: common.Int32, // #3554
      SpecialRegisterAddr: common.UInt32, // #3556
      RemoveBadPoint: common.Bool, // #3558
      M: common.UInt8, // #3573
      N: common.UInt8, // #3594
      P: common.UInt8, // #3615
      FirstDataLen: common.Int32, // #3710
      FirstStartIndex: common.Int32, // #3712
      FirstRegisterAddr: common.Int32, // #3714
      ErrRedGain: common.Int32, // #3716
      ErrGreenGain: common.Int32, // #3728
      ErrBlueGain: common.Int32,
    }),
  ],
  'ChipHX8866RGBVExtendPropertyBase'
);
/**
 * Codec for {@link ChipHX8866RGBVExtendProperty}
 * @category Codecs
 * @see Automatically generated from ../decompiled/Nova.LCT.GigabitSystem.ChipHX8866.decompiled.cs:3457
 */
export const ChipHX8866RGBVExtendProperty = t.intersection(
  [
    ChipHX8866RGBVExtendPropertyBase,
    t.partial({ '@_xsi:type': t.literal('ChipHX8866RGBVExtendProperty') }),
  ],
  'ChipHX8866RGBVExtendProperty'
);
export interface ChipHX8866RGBVExtendProperty
  extends t.TypeOf<typeof ChipHX8866RGBVExtendProperty> {
  RedProperty?: ChipHX8866ExtendProperty;
  GreenProperty?: ChipHX8866ExtendProperty;
  BlueProperty?: ChipHX8866ExtendProperty;
  VRedProperty?: ChipHX8866ExtendProperty;
}
