import * as t from 'io-ts';
import * as common from '../lib/common';
import { ChipBaseExtendPropey } from './ChipBaseExtendPropey';
 // import
export const ChipLD1074ExtendPropertyBase = t.intersection(
  [
    ChipBaseExtendPropey,
    t.partial({
      FirstRegValue: common.UInt16, // #49
      AlgorithmMode: common.UInt8, // #51
      DataSysMode: common.UInt8, // #63
      NumCountMode: common.UInt8, // #75
      TemperatureProtectMode: common.Bool, // #87
      ErrorCheck: common.Bool, // #99
      ChooseChannelSpeed: common.UInt8, // #111
      Gain: common.Int32, // #123
    }),
  ],
  'ChipLD1074ExtendPropertyBase'
);
/**
 * Codec for {@link ChipLD1074ExtendProperty}
 * @category Codecs
 * @see Automatically generated from ../decompiled/Nova.LCT.GigabitSystem.ChipLD1074.decompiled.cs:46
 */
export const ChipLD1074ExtendProperty = t.intersection(
  [
    ChipLD1074ExtendPropertyBase,
    t.partial({ '@_xsi:type': t.literal('ChipLD1074ExtendProperty') }),
  ],
  'ChipLD1074ExtendProperty'
);
export interface ChipLD1074ExtendProperty extends t.TypeOf<typeof ChipLD1074ExtendProperty> {}
