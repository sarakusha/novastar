import * as t from 'io-ts';
import * as common from '../lib/common';
import { ChipBaseExtendPropey } from './ChipBaseExtendPropey'; // import
import { ChipCFD955AExtendProperty } from './ChipCFD955AExtendProperty';
 // import
export const ChipCFD955ARGBVExtendPropertyBase = t.intersection(
  [
    ChipBaseExtendPropey,
    t.partial({
      RedProperty: ChipCFD955AExtendProperty, // #4152
      GreenProperty: ChipCFD955AExtendProperty, // #4154
      BlueProperty: ChipCFD955AExtendProperty, // #4156
      VRedProperty: ChipCFD955AExtendProperty, // #4158
      SubField: common.UInt8, // #4183
      GrayDepth: common.UInt8, // #4204
      IsAdvancedMode: common.Bool, // #4228
      IsUseNewModule: common.Bool, // #4240
      PLLFreqDivision: common.UInt8, // #4242
      PLLFreqDoubling: common.UInt8, // #4256
      SpecialDataLen: common.Int32, // #4341
      SpecialRegisterAddr: common.UInt32, // #4343
    }),
  ],
  'ChipCFD955ARGBVExtendPropertyBase'
);
/**
 * Codec for {@link ChipCFD955ARGBVExtendProperty}
 * @category Codecs
 * @see Automatically generated from ../decompiled/Nova.LCT.GigabitSystem.ChipCFD955A.decompiled.cs:4145
 */
export const ChipCFD955ARGBVExtendProperty = t.intersection(
  [
    ChipCFD955ARGBVExtendPropertyBase,
    t.partial({ '@_xsi:type': t.literal('ChipCFD955ARGBVExtendProperty') }),
  ],
  'ChipCFD955ARGBVExtendProperty'
);
export interface ChipCFD955ARGBVExtendProperty
  extends t.TypeOf<typeof ChipCFD955ARGBVExtendProperty> {
  RedProperty?: ChipCFD955AExtendProperty;
  GreenProperty?: ChipCFD955AExtendProperty;
  BlueProperty?: ChipCFD955AExtendProperty;
  VRedProperty?: ChipCFD955AExtendProperty;
}
