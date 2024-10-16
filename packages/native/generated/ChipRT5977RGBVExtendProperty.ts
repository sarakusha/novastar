import * as t from 'io-ts';
import * as common from '../lib/common';
import { ChipBaseExtendPropey } from './ChipBaseExtendPropey'; // import
import { ChipRT5977ExtendProperty } from './ChipRT5977ExtendProperty';
 // import
export const ChipRT5977RGBVExtendPropertyBase = t.intersection(
  [
    ChipBaseExtendPropey,
    t.type({
      REG_LENGTH: common.withDefault(common.Int32, 94),
    }),
    t.partial({
      RedProperty: ChipRT5977ExtendProperty, // #1794
      GreenProperty: ChipRT5977ExtendProperty, // #1797
      BlueProperty: ChipRT5977ExtendProperty, // #1800
      VRedProperty: ChipRT5977ExtendProperty, // #1803
      IsUseNewModule: common.Bool, // #1806
      ChipLibVersion: common.UInt8, // #1808
      SpecialDataLen: common.Int32, // #1810
      SpecialRegisterAddr: common.UInt32, // #1812
      Scramble: common.UInt8, // #1898
      GclkTemp: common.UInt8, // #1932
      GrayDepth: common.UInt8, // #1944
      ScanType: common.UInt8, // #1958
      IsAdvancedMode: common.Bool,
    }),
  ],
  'ChipRT5977RGBVExtendPropertyBase'
);
/**
 * Codec for {@link ChipRT5977RGBVExtendProperty}
 * @category Codecs
 * @see Automatically generated from ../decompiled/Nova.LCT.GigabitSystem.ChipRT5977.decompiled.cs:1787
 */
export const ChipRT5977RGBVExtendProperty = t.intersection(
  [
    ChipRT5977RGBVExtendPropertyBase,
    t.partial({ '@_xsi:type': t.literal('ChipRT5977RGBVExtendProperty') }),
  ],
  'ChipRT5977RGBVExtendProperty'
);
export interface ChipRT5977RGBVExtendProperty
  extends t.TypeOf<typeof ChipRT5977RGBVExtendProperty> {
  RedProperty?: ChipRT5977ExtendProperty;
  GreenProperty?: ChipRT5977ExtendProperty;
  BlueProperty?: ChipRT5977ExtendProperty;
  VRedProperty?: ChipRT5977ExtendProperty;
}
