import * as t from 'io-ts';
import * as common from '../lib/common';
import { ChipBaseExtendPropey } from './ChipBaseExtendPropey'; // import
import { ChipFM6555ExtendProperty } from './ChipFM6555ExtendProperty';
 // import
export const ChipFM6555RGBVExtendPropertyBase = t.intersection(
  [
    ChipBaseExtendPropey,
    t.type({
      REG_LENGTH: common.Int32_48,
    }),
    t.partial({
      RedProperty: ChipFM6555ExtendProperty, // #1246
      GreenProperty: ChipFM6555ExtendProperty, // #1248
      BlueProperty: ChipFM6555ExtendProperty, // #1250
      VRedProperty: ChipFM6555ExtendProperty, // #1252
      IsUseNewModule: common.Bool, // #1470
      ChipLibVersion: common.UInt8,
    }),
  ],
  'ChipFM6555RGBVExtendPropertyBase'
);
/**
 * Codec for {@link ChipFM6555RGBVExtendProperty}
 * @category Codecs
 * @see Automatically generated from ../decompiled/Nova.LCT.GigabitSystem.ChipFM6555.decompiled.cs:1241
 */
export const ChipFM6555RGBVExtendProperty = t.intersection(
  [
    ChipFM6555RGBVExtendPropertyBase,
    t.partial({ '@_xsi:type': t.literal('ChipFM6555RGBVExtendProperty') }),
  ],
  'ChipFM6555RGBVExtendProperty'
);
export interface ChipFM6555RGBVExtendProperty
  extends t.TypeOf<typeof ChipFM6555RGBVExtendProperty> {
  RedProperty?: ChipFM6555ExtendProperty;
  GreenProperty?: ChipFM6555ExtendProperty;
  BlueProperty?: ChipFM6555ExtendProperty;
  VRedProperty?: ChipFM6555ExtendProperty;
}
