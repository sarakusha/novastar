import * as t from 'io-ts';
import * as common from '../lib/common';
import { ChipBaseExtendPropey } from './ChipBaseExtendPropey'; // import
import { ChipCNS7263ExtendProperty } from './ChipCNS7263ExtendProperty';
 // import
export const ChipCNS7263RGBVExtendPropertyBase = t.intersection(
  [
    ChipBaseExtendPropey,
    t.type({
      REG_LENGTH: common.Int32_4, // #2393
      IsAdvancedMode: common.Bool_true, // #2415
      MTTime: common.Int32_0,
    }),
    t.partial({
      RedProperty: ChipCNS7263ExtendProperty, // #2377
      GreenProperty: ChipCNS7263ExtendProperty, // #2379
      BlueProperty: ChipCNS7263ExtendProperty, // #2381
      VRedProperty: ChipCNS7263ExtendProperty, // #2383
      IsUseNewModule: common.Bool, // #2412
      IsStarSwipPoint: common.Bool, // #2429
      SpecialDataLen: common.Int32, // #2441
      SpecialRegisterAddr: common.UInt32,
    }),
  ],
  'ChipCNS7263RGBVExtendPropertyBase'
);
/**
 * Codec for {@link ChipCNS7263RGBVExtendProperty}
 * @category Codecs
 * @see Automatically generated from ../decompiled/Nova.LCT.GigabitSystem.ChipCNS7263.decompiled.cs:2370
 */
export const ChipCNS7263RGBVExtendProperty = t.intersection(
  [
    ChipCNS7263RGBVExtendPropertyBase,
    t.partial({ '@_xsi:type': t.literal('ChipCNS7263RGBVExtendProperty') }),
  ],
  'ChipCNS7263RGBVExtendProperty'
);
export interface ChipCNS7263RGBVExtendProperty
  extends t.TypeOf<typeof ChipCNS7263RGBVExtendProperty> {
  RedProperty?: ChipCNS7263ExtendProperty;
  GreenProperty?: ChipCNS7263ExtendProperty;
  BlueProperty?: ChipCNS7263ExtendProperty;
  VRedProperty?: ChipCNS7263ExtendProperty;
}
