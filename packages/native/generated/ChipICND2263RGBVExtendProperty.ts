import * as t from 'io-ts';
import * as common from '../lib/common';
import { ChipBaseExtendPropey } from './ChipBaseExtendPropey'; // import
import { ChipICND2263ExtendProperty } from './ChipICND2263ExtendProperty';
 // import
export const ChipICND2263RGBVExtendPropertyBase = t.intersection(
  [
    ChipBaseExtendPropey,
    t.type({
      REG_LENGTH: common.Int32_16,
    }),
    t.partial({
      RedProperty: ChipICND2263ExtendProperty, // #251
      GreenProperty: ChipICND2263ExtendProperty, // #253
      BlueProperty: ChipICND2263ExtendProperty, // #255
      VRedProperty: ChipICND2263ExtendProperty, // #257
      IsUseNewModule: common.Bool, // #263
      ChipLibVersion: common.UInt8, // #265
      DefaultRegisterType: common.UInt8, // #282
      EnhancedMode: common.Bool, // #294
      IsAdvancedMode: common.Bool, // #306
      SpecialDataLen: common.Int32, // #318
      SpecialRegisterAddr: common.UInt32, // #320
      LowAshUniformity: common.Bool, // #322
      RefreshVS: common.UInt8, // #336
      LEDRefreshRate: common.UInt8,
    }),
  ],
  'ChipICND2263RGBVExtendPropertyBase'
);
/**
 * Codec for {@link ChipICND2263RGBVExtendProperty}
 * @category Codecs
 * @see Automatically generated from ../decompiled/Nova.LCT.GigabitSystem.ChipICND2263.decompiled.cs:246
 */
export const ChipICND2263RGBVExtendProperty = t.intersection(
  [
    ChipICND2263RGBVExtendPropertyBase,
    t.partial({ '@_xsi:type': t.literal('ChipICND2263RGBVExtendProperty') }),
  ],
  'ChipICND2263RGBVExtendProperty'
);
export interface ChipICND2263RGBVExtendProperty
  extends t.TypeOf<typeof ChipICND2263RGBVExtendProperty> {
  RedProperty?: ChipICND2263ExtendProperty;
  GreenProperty?: ChipICND2263ExtendProperty;
  BlueProperty?: ChipICND2263ExtendProperty;
  VRedProperty?: ChipICND2263ExtendProperty;
}
