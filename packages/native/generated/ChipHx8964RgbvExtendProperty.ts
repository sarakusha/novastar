import * as t from 'io-ts';
import * as common from '../lib/common';
import { ChipBaseExtendPropey } from './ChipBaseExtendPropey'; // import
import { ChipHX8964ExtendProperty } from './ChipHX8964ExtendProperty';
 // import
export const ChipHx8964RgbvExtendPropertyBase = t.intersection(
  [
    ChipBaseExtendPropey,
    t.type({
      REG_LENGTH: common.Int32_13,
    }),
    t.partial({
      RedProperty: ChipHX8964ExtendProperty, // #3463
      GreenProperty: ChipHX8964ExtendProperty, // #3466
      BlueProperty: ChipHX8964ExtendProperty, // #3469
      VRedProperty: ChipHX8964ExtendProperty, // #3472
      IsAdvancedMode: common.Bool, // #3492
      SubField: common.UInt8, // #3504
      GrayDepth: common.UInt8, // #3525
      IsUseNewModule: common.Bool, // #3549
      SpecialDataLen: common.Int32, // #3551
      SpecialRegisterAddr: common.UInt32, // #3553
      RemoveBadPoint: common.Bool, // #3555
      M: common.UInt8, // #3569
      N: common.UInt8, // #3590
      P: common.UInt8, // #3611
      StaticPower: common.Bool, // #3625
      MoverPower: common.Bool, // #3639
      FirstDataLen: common.Int32, // #3725
      FirstStartIndex: common.Int32, // #3727
      FirstRegisterAddr: common.Int32, // #3729
      ErrRedGain: common.Int32, // #3731
      ErrGreenGain: common.Int32, // #3743
      ErrBlueGain: common.Int32,
    }),
  ],
  'ChipHx8964RgbvExtendPropertyBase'
);
/**
 * Codec for {@link ChipHx8964RgbvExtendProperty}
 * @category Codecs
 * @see Automatically generated from ../decompiled/Nova.LCT.GigabitSystem.ChipHX8964.decompiled.cs:3452
 */
export const ChipHx8964RgbvExtendProperty = t.intersection(
  [
    ChipHx8964RgbvExtendPropertyBase,
    t.partial({ '@_xsi:type': t.literal('ChipHx8964RgbvExtendProperty') }),
  ],
  'ChipHx8964RgbvExtendProperty'
);
export interface ChipHx8964RgbvExtendProperty
  extends t.TypeOf<typeof ChipHx8964RgbvExtendProperty> {
  RedProperty?: ChipHX8964ExtendProperty;
  GreenProperty?: ChipHX8964ExtendProperty;
  BlueProperty?: ChipHX8964ExtendProperty;
  VRedProperty?: ChipHX8964ExtendProperty;
}
