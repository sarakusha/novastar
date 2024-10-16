import * as t from 'io-ts';
import * as common from '../lib/common';
import { ChipBaseExtendPropey } from './ChipBaseExtendPropey';
 // import
export const ChipIT1505ExtendPropertyBase = t.intersection(
  [
    ChipBaseExtendPropey,
    t.type({
      RedRegValueConfigFirst: common.UInt16_60543, // #65294
      GreenRegValueConfigFirst: common.UInt16_60543, // #65307
      BlueRegValueConfigFirst: common.UInt16_60543, // #65320
      VRedRegValueConfigFirst: common.UInt16_60543,
    }),
    t.partial({
      IsAdvancedMode: common.Bool, // #65177
      CureentRedGain: common.UInt16, // #65190
      CureentGreenGain: common.UInt16, // #65203
      CureentBlueGain: common.UInt16, // #65216
      RedShortCirult: common.Int32, // #65229
      GreenShortCirult: common.Int32, // #65242
      BlueShortCirult: common.Int32, // #65255
      PowerSavingMode: common.Int32, // #65268
      PWMAlgorithm: common.Int32,
    }),
  ],
  'ChipIT1505ExtendPropertyBase'
);
/**
 * Codec for {@link ChipIT1505ExtendProperty}
 * @category Codecs
 * @see Automatically generated from ../decompiled/Nova.LCT.GigabitSystem.DataClass.decompiled.cs:65149
 */
export const ChipIT1505ExtendProperty = t.intersection(
  [
    ChipIT1505ExtendPropertyBase,
    t.partial({ '@_xsi:type': t.literal('ChipIT1505ExtendProperty') }),
  ],
  'ChipIT1505ExtendProperty'
);
export interface ChipIT1505ExtendProperty extends t.TypeOf<typeof ChipIT1505ExtendProperty> {}
