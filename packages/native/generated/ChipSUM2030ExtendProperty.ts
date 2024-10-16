import * as t from 'io-ts';
import * as common from '../lib/common';
import { ChipBaseExtendPropey } from './ChipBaseExtendPropey';
 // import
export const ChipSUM2030ExtendPropertyBase = t.intersection(
  [
    ChipBaseExtendPropey,
    t.type({
      IsOpenCircuitProtection: common.Bool_true,
    }),
    t.partial({
      IsCustomSecondChipReg: common.Bool, // #62322
      RedRegLowValue: common.UInt8, // #62335
      RedRegHighValue: common.UInt8, // #62348
      GreenRegLowValue: common.UInt8, // #62361
      GreenRegHighValue: common.UInt8, // #62374
      BlueRegLowValue: common.UInt8, // #62387
      BlueRegHighValue: common.UInt8, // #62400
      VRedRegLowValue: common.UInt8, // #62413
      VRedRegHighValue: common.UInt8,
    }),
  ],
  'ChipSUM2030ExtendPropertyBase'
);
/**
 * Codec for {@link ChipSUM2030ExtendProperty}
 * @category Codecs
 * @see Automatically generated from ../decompiled/Nova.LCT.GigabitSystem.DataClass.decompiled.cs:62300
 */
export const ChipSUM2030ExtendProperty = t.intersection(
  [
    ChipSUM2030ExtendPropertyBase,
    t.partial({ '@_xsi:type': t.literal('ChipSUM2030ExtendProperty') }),
  ],
  'ChipSUM2030ExtendProperty'
);
export interface ChipSUM2030ExtendProperty extends t.TypeOf<typeof ChipSUM2030ExtendProperty> {}
