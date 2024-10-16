import * as t from 'io-ts';
import * as common from '../lib/common';
import { ChipBaseExtendPropey } from './ChipBaseExtendPropey'; // import
import { ChipDM413ExtendProperty } from './ChipDM413ExtendProperty';
 // import
export const ChipDM413RGBVExtendPropertyBase = t.intersection(
  [
    ChipBaseExtendPropey,
    t.partial({
      RedProperty: ChipDM413ExtendProperty, // #84
      GreenProperty: ChipDM413ExtendProperty, // #86
      BlueProperty: ChipDM413ExtendProperty, // #88
      IsUseNewModule: common.Bool, // #90
      ChipLibVersion: common.UInt8, // #92
      FirstDataLen: common.Int32, // #94
      FirstStartIndex: common.Int32, // #96
      FirstRegisterAddr: common.Int32, // #98
    }),
  ],
  'ChipDM413RGBVExtendPropertyBase'
);
/**
 * Codec for {@link ChipDM413RGBVExtendProperty}
 * @category Codecs
 * @see Automatically generated from ../decompiled/Nova.LCT.GigabitSystem.ChipDM413.decompiled.cs:77
 */
export const ChipDM413RGBVExtendProperty = t.intersection(
  [
    ChipDM413RGBVExtendPropertyBase,
    t.partial({ '@_xsi:type': t.literal('ChipDM413RGBVExtendProperty') }),
  ],
  'ChipDM413RGBVExtendProperty'
);
export interface ChipDM413RGBVExtendProperty extends t.TypeOf<typeof ChipDM413RGBVExtendProperty> {
  RedProperty?: ChipDM413ExtendProperty;
  GreenProperty?: ChipDM413ExtendProperty;
  BlueProperty?: ChipDM413ExtendProperty;
}
