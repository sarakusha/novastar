import * as t from 'io-ts';
import * as common from '../lib/common';
import { ChipBaseExtendPropey } from './ChipBaseExtendPropey'; // import
import { ChipMBI5754BExtendProperty } from './ChipMBI5754BExtendProperty';
 // import
export const ChipMBI5754BRGBVExtendPropertyBase = t.intersection(
  [
    ChipBaseExtendPropey,
    t.type({
      REG_LENGTH: common.Int32_16,
    }),
    t.partial({
      RedProperty: ChipMBI5754BExtendProperty, // #3977
      GreenProperty: ChipMBI5754BExtendProperty, // #3979
      BlueProperty: ChipMBI5754BExtendProperty, // #3981
      VRedProperty: ChipMBI5754BExtendProperty, // #3983
      IsUseNewModule: common.Bool, // #3989
      ChipLibVersion: common.UInt8, // #3991
      IsAdvancedMode: common.Bool, // #3993
      SpecialDataLen: common.Int32, // #4005
      SpecialRegisterAddr: common.UInt32,
    }),
  ],
  'ChipMBI5754BRGBVExtendPropertyBase'
);
/**
 * Codec for {@link ChipMBI5754BRGBVExtendProperty}
 * @category Codecs
 * @see Automatically generated from ../decompiled/Nova.LCT.GigabitSystem.ChipMBI5754B.decompiled.cs:3972
 */
export const ChipMBI5754BRGBVExtendProperty = t.intersection(
  [
    ChipMBI5754BRGBVExtendPropertyBase,
    t.partial({ '@_xsi:type': t.literal('ChipMBI5754BRGBVExtendProperty') }),
  ],
  'ChipMBI5754BRGBVExtendProperty'
);
export interface ChipMBI5754BRGBVExtendProperty
  extends t.TypeOf<typeof ChipMBI5754BRGBVExtendProperty> {
  RedProperty?: ChipMBI5754BExtendProperty;
  GreenProperty?: ChipMBI5754BExtendProperty;
  BlueProperty?: ChipMBI5754BExtendProperty;
  VRedProperty?: ChipMBI5754BExtendProperty;
}
