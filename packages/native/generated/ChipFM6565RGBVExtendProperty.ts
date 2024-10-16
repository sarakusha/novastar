import * as t from 'io-ts';
import * as common from '../lib/common';
import { ChipBaseExtendPropey } from './ChipBaseExtendPropey'; // import
import { ChipFM6565ExtendProperty } from './ChipFM6565ExtendProperty';
 // import
export const ChipFM6565RGBVExtendPropertyBase = t.intersection(
  [
    ChipBaseExtendPropey,
    t.type({
      REG_LENGTH: common.Int32_48,
    }),
    t.partial({
      RedProperty: ChipFM6565ExtendProperty, // #1256
      GreenProperty: ChipFM6565ExtendProperty, // #1258
      BlueProperty: ChipFM6565ExtendProperty, // #1260
      VRedProperty: ChipFM6565ExtendProperty, // #1262
      IsAdvancedMode: common.Bool, // #1467
      IsUseNewModule: common.Bool, // #1479
      ChipLibVersion: common.UInt8, // #1481
      SpecialDataLen: common.Int32, // #1483
      SpecialRegisterAddr: common.UInt32,
    }),
  ],
  'ChipFM6565RGBVExtendPropertyBase'
);
/**
 * Codec for {@link ChipFM6565RGBVExtendProperty}
 * @category Codecs
 * @see Automatically generated from ../decompiled/Nova.LCT.GigabitSystem.ChipFM6565.decompiled.cs:1251
 */
export const ChipFM6565RGBVExtendProperty = t.intersection(
  [
    ChipFM6565RGBVExtendPropertyBase,
    t.partial({ '@_xsi:type': t.literal('ChipFM6565RGBVExtendProperty') }),
  ],
  'ChipFM6565RGBVExtendProperty'
);
export interface ChipFM6565RGBVExtendProperty
  extends t.TypeOf<typeof ChipFM6565RGBVExtendProperty> {
  RedProperty?: ChipFM6565ExtendProperty;
  GreenProperty?: ChipFM6565ExtendProperty;
  BlueProperty?: ChipFM6565ExtendProperty;
  VRedProperty?: ChipFM6565ExtendProperty;
}
