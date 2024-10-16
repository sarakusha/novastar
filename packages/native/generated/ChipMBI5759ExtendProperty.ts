import * as t from 'io-ts';
import * as common from '../lib/common';
import { ChipBaseExtendPropey } from './ChipBaseExtendPropey'; // import
import { ChipMBI5759CustomExtendProperty } from './ChipMBI5759CustomExtendProperty'; // import
import { ChipMBI5759GRGBExtendProperty } from './ChipMBI5759GRGBExtendProperty';
 // import
export const ChipMBI5759ExtendPropertyBase = t.intersection(
  [
    ChipBaseExtendPropey,
    t.type({
      IsAdvancedMode: common.Bool_true,
    }),
    t.partial({
      GRGBExtendProperty: ChipMBI5759GRGBExtendProperty, // #1507
      CustomExtendProperty: ChipMBI5759CustomExtendProperty, // #1509
      IsUseNewModule: common.Bool, // #1517
      ChipLibVersion: common.UInt8, // #1521
      SpecialDataLen: common.Int32, // #1533
      SpecialRegisterAddr: common.UInt32,
    }),
  ],
  'ChipMBI5759ExtendPropertyBase'
);
/**
 * Codec for {@link ChipMBI5759ExtendProperty}
 * @category Codecs
 * @see Automatically generated from ../decompiled/Nova.LCT.GigabitSystem.ChipMBI5759.decompiled.cs:1504
 */
export const ChipMBI5759ExtendProperty = t.intersection(
  [
    ChipMBI5759ExtendPropertyBase,
    t.partial({ '@_xsi:type': t.literal('ChipMBI5759ExtendProperty') }),
  ],
  'ChipMBI5759ExtendProperty'
);
export interface ChipMBI5759ExtendProperty extends t.TypeOf<typeof ChipMBI5759ExtendProperty> {
  GRGBExtendProperty?: ChipMBI5759GRGBExtendProperty;
  CustomExtendProperty?: ChipMBI5759CustomExtendProperty;
}
