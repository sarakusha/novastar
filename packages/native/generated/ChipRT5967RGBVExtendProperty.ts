import * as t from 'io-ts';
import * as common from '../lib/common';
import { ChipBaseExtendPropey } from './ChipBaseExtendPropey'; // import
import { ChipRT5967ExtendProperty } from './ChipRT5967ExtendProperty';
 // import
export const ChipRT5967RGBVExtendPropertyBase = t.intersection(
  [
    ChipBaseExtendPropey,
    t.type({
      REG_LENGTH: common.Int32_5,
    }),
    t.partial({
      RedProperty: ChipRT5967ExtendProperty, // #432
      GreenProperty: ChipRT5967ExtendProperty, // #434
      BlueProperty: ChipRT5967ExtendProperty, // #436
      VRedProperty: ChipRT5967ExtendProperty, // #438
      IsUseNewModule: common.Bool, // #444
      ChipLibVersion: common.UInt8, // #446
      SpecialDataLen: common.Int32, // #448
      SpecialRegisterAddr: common.UInt32, // #450
      GrayDepth: common.UInt8, // #452
      GrayEnhance: common.Bool, // #479
      ScanType: common.UInt8, // #493
      IsAdvancedMode: common.Bool,
    }),
  ],
  'ChipRT5967RGBVExtendPropertyBase'
);
/**
 * Codec for {@link ChipRT5967RGBVExtendProperty}
 * @category Codecs
 * @see Automatically generated from ../decompiled/Nova.LCT.GigabitSystem.ChipRT5967.decompiled.cs:427
 */
export const ChipRT5967RGBVExtendProperty = t.intersection(
  [
    ChipRT5967RGBVExtendPropertyBase,
    t.partial({ '@_xsi:type': t.literal('ChipRT5967RGBVExtendProperty') }),
  ],
  'ChipRT5967RGBVExtendProperty'
);
export interface ChipRT5967RGBVExtendProperty
  extends t.TypeOf<typeof ChipRT5967RGBVExtendProperty> {
  RedProperty?: ChipRT5967ExtendProperty;
  GreenProperty?: ChipRT5967ExtendProperty;
  BlueProperty?: ChipRT5967ExtendProperty;
  VRedProperty?: ChipRT5967ExtendProperty;
}
