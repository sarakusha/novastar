import * as t from 'io-ts';
import * as common from '../lib/common';
import { ChipBaseExtendPropey } from './ChipBaseExtendPropey';
 // import
export const ChipICND2100ExtendPropertyBase = t.intersection(
  [
    ChipBaseExtendPropey,
    t.type({
      TurningPointVoltage: common.Int32_7, // #750
      RedRegValueConfigFirst: common.UInt16_23, // #763
      GreenRegValueConfigFirst: common.UInt16_23, // #776
      BlueRegValueConfigFirst: common.UInt16_23, // #789
      VRedRegValueConfigFirst: common.UInt16_23,
    }),
    t.partial({
      IsAdvanceModel: common.Bool, // #725
      IsEliminateShadow: common.Bool,
    }),
  ],
  'ChipICND2100ExtendPropertyBase'
);
/**
 * Codec for {@link ChipICND2100ExtendProperty}
 * @category Codecs
 * @see Automatically generated from ../decompiled/Nova.LCT.GigabitSystem.ChipICND2100.decompiled.cs:709
 */
export const ChipICND2100ExtendProperty = t.intersection(
  [
    ChipICND2100ExtendPropertyBase,
    t.partial({ '@_xsi:type': t.literal('ChipICND2100ExtendProperty') }),
  ],
  'ChipICND2100ExtendProperty'
);
export interface ChipICND2100ExtendProperty extends t.TypeOf<typeof ChipICND2100ExtendProperty> {}
