import * as t from 'io-ts';
import * as common from '../lib/common';
import { ChipBaseExtendPropey } from './ChipBaseExtendPropey'; // import
import { ChipLD1074ExtendProperty } from './ChipLD1074ExtendProperty';
 // import
export const ChipLD1074RGBVExtendPropertyBase = t.intersection(
  [
    ChipBaseExtendPropey,
    t.partial({
      RedProperty: ChipLD1074ExtendProperty, // #174
      GreenProperty: ChipLD1074ExtendProperty, // #176
      BlueProperty: ChipLD1074ExtendProperty, // #178
      VRedProperty: ChipLD1074ExtendProperty, // #180
      IsUseNewModule: common.Bool, // #186
      ChipLibVersion: common.UInt8, // #188
      IsAdvancedMode: common.Bool, // #190
      FirstDataLen: common.Int32, // #202
      FirstStartIndex: common.Int32, // #204
      FirstRegisterAddr: common.Int32, // #206
    }),
  ],
  'ChipLD1074RGBVExtendPropertyBase'
);
/**
 * Codec for {@link ChipLD1074RGBVExtendProperty}
 * @category Codecs
 * @see Automatically generated from ../decompiled/Nova.LCT.GigabitSystem.ChipLD1074.decompiled.cs:167
 */
export const ChipLD1074RGBVExtendProperty = t.intersection(
  [
    ChipLD1074RGBVExtendPropertyBase,
    t.partial({ '@_xsi:type': t.literal('ChipLD1074RGBVExtendProperty') }),
  ],
  'ChipLD1074RGBVExtendProperty'
);
export interface ChipLD1074RGBVExtendProperty
  extends t.TypeOf<typeof ChipLD1074RGBVExtendProperty> {
  RedProperty?: ChipLD1074ExtendProperty;
  GreenProperty?: ChipLD1074ExtendProperty;
  BlueProperty?: ChipLD1074ExtendProperty;
  VRedProperty?: ChipLD1074ExtendProperty;
}
