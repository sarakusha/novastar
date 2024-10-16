import * as t from 'io-ts';
import * as common from '../lib/common';
import { ChipBaseExtendPropey } from './ChipBaseExtendPropey'; // import
import { ChipCNS7153ExtendProperty } from './ChipCNS7153ExtendProperty';
 // import
export const ChipCNS7153RGBVExtendPropertyBase = t.intersection(
  [
    ChipBaseExtendPropey,
    t.type({
      IsAdvancedMode: common.Bool_true,
    }),
    t.partial({
      RedProperty: ChipCNS7153ExtendProperty, // #1795
      GreenProperty: ChipCNS7153ExtendProperty, // #1797
      BlueProperty: ChipCNS7153ExtendProperty, // #1799
      VRedProperty: ChipCNS7153ExtendProperty, // #1801
      IsUseNewModule: common.Bool,
    }),
  ],
  'ChipCNS7153RGBVExtendPropertyBase'
);
/**
 * Codec for {@link ChipCNS7153RGBVExtendProperty}
 * @category Codecs
 * @see Automatically generated from ../decompiled/Nova.LCT.GigabitSystem.ChipCNS7153.decompiled.cs:1788
 */
export const ChipCNS7153RGBVExtendProperty = t.intersection(
  [
    ChipCNS7153RGBVExtendPropertyBase,
    t.partial({ '@_xsi:type': t.literal('ChipCNS7153RGBVExtendProperty') }),
  ],
  'ChipCNS7153RGBVExtendProperty'
);
export interface ChipCNS7153RGBVExtendProperty
  extends t.TypeOf<typeof ChipCNS7153RGBVExtendProperty> {
  RedProperty?: ChipCNS7153ExtendProperty;
  GreenProperty?: ChipCNS7153ExtendProperty;
  BlueProperty?: ChipCNS7153ExtendProperty;
  VRedProperty?: ChipCNS7153ExtendProperty;
}
