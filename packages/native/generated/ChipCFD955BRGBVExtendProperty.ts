import * as t from 'io-ts';
import * as common from '../lib/common';
import { ChipBaseExtendPropey } from './ChipBaseExtendPropey'; // import
import { ChipCFD955BExtendProperty } from './ChipCFD955BExtendProperty';
 // import
export const ChipCFD955BRGBVExtendPropertyBase = t.intersection(
  [
    ChipBaseExtendPropey,
    t.partial({
      RedProperty: ChipCFD955BExtendProperty, // #3630
      GreenProperty: ChipCFD955BExtendProperty, // #3632
      BlueProperty: ChipCFD955BExtendProperty, // #3634
      VRedProperty: ChipCFD955BExtendProperty, // #3636
      GclkToDclkNum: common.UInt8, // #3644
      SubField: common.UInt8, // #3673
      GrayDepth: common.UInt8, // #3694
      IsAdvancedMode: common.Bool, // #3708
      IsUseNewModule: common.Bool, // #3720
      PLLFreqDivision: common.UInt8, // #3722
      PLLFreqDoubling: common.UInt8, // #3736
      GrayClkSelect: common.UInt8, // #3750
      SpecialDataLen: common.Int32, // #3835
      SpecialRegisterAddr: common.UInt32, // #3837
    }),
  ],
  'ChipCFD955BRGBVExtendPropertyBase'
);
/**
 * Codec for {@link ChipCFD955BRGBVExtendProperty}
 * @category Codecs
 * @see Automatically generated from ../decompiled/Nova.LCT.GigabitSystem.ChipCFD955B.decompiled.cs:3625
 */
export const ChipCFD955BRGBVExtendProperty = t.intersection(
  [
    ChipCFD955BRGBVExtendPropertyBase,
    t.partial({ '@_xsi:type': t.literal('ChipCFD955BRGBVExtendProperty') }),
  ],
  'ChipCFD955BRGBVExtendProperty'
);
export interface ChipCFD955BRGBVExtendProperty
  extends t.TypeOf<typeof ChipCFD955BRGBVExtendProperty> {
  RedProperty?: ChipCFD955BExtendProperty;
  GreenProperty?: ChipCFD955BExtendProperty;
  BlueProperty?: ChipCFD955BExtendProperty;
  VRedProperty?: ChipCFD955BExtendProperty;
}
