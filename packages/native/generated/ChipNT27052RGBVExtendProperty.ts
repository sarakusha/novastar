import * as t from 'io-ts';
import * as common from '../lib/common';
import { ChipBaseExtendPropey } from './ChipBaseExtendPropey'; // import
import { ChipNT27052ExtendProperty } from './ChipNT27052ExtendProperty';
 // import
export const ChipNT27052RGBVExtendPropertyBase = t.intersection(
  [
    ChipBaseExtendPropey,
    t.type({
      REGLENGTH: common.Int32_34, // #3461
      REGREMOVEBADPOINTSLENGTH: common.Int32_6,
    }),
    t.partial({
      RedProperty: ChipNT27052ExtendProperty, // #3453
      GreenProperty: ChipNT27052ExtendProperty, // #3455
      BlueProperty: ChipNT27052ExtendProperty, // #3457
      VRedProperty: ChipNT27052ExtendProperty, // #3463
      SpecialRegisterAddr: common.UInt32, // #3469
      IsUseNewModule: common.Bool, // #3471
      ChipLibVersion: common.UInt8, // #3473
      ScanType: common.UInt8, // #3475
      Subfiled: common.UInt8, // #3487
      Pll_N: common.UInt8, // #3499
      Pll_P: common.UInt8, // #3511
      Pll_M: common.UInt8, // #3532
      GrayScale: common.UInt8, // #3544
      IsAdvancedMode: common.Bool, // #3556
      DisplayTime: common.UInt8, // #3568
      GCLK_ADD: common.UInt16, // #3580
      SUB_ADD: common.UInt16, // #3592
      SpecialDataLen: common.Int32,
    }),
  ],
  'ChipNT27052RGBVExtendPropertyBase'
);
/**
 * Codec for {@link ChipNT27052RGBVExtendProperty}
 * @category Codecs
 * @see Automatically generated from ../decompiled/Nova.LCT.GigabitSystem.Chip_NT27052.decompiled.cs:3450
 */
export const ChipNT27052RGBVExtendProperty = t.intersection(
  [
    ChipNT27052RGBVExtendPropertyBase,
    t.partial({ '@_xsi:type': t.literal('ChipNT27052RGBVExtendProperty') }),
  ],
  'ChipNT27052RGBVExtendProperty'
);
export interface ChipNT27052RGBVExtendProperty
  extends t.TypeOf<typeof ChipNT27052RGBVExtendProperty> {
  RedProperty?: ChipNT27052ExtendProperty;
  GreenProperty?: ChipNT27052ExtendProperty;
  BlueProperty?: ChipNT27052ExtendProperty;
  VRedProperty?: ChipNT27052ExtendProperty;
}
