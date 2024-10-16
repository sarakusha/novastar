import * as t from 'io-ts';
import * as common from '../lib/common';
import { ChipBaseExtendPropey } from './ChipBaseExtendPropey';
 // import
export const ChipSM16169SHExtendPropertyBase = t.intersection(
  [
    ChipBaseExtendPropey,
    t.type({
      REG_LENGTH: common.Int32_34, // #2580
      RegValue: common.XMLArray(common.UInt16, 'ushort'),
    }),
    t.partial({
      IsUseNewModule: common.Bool, // #2584
      ChipLibVersion: common.UInt8, // #2586
      EliminateGhostLevel: common.UInt8, // #2588
      GammaMinen: common.Bool, // #2600
      EliminateCharactersGhostLevel: common.UInt8, // #2612
      LowGrayUniformity: common.UInt8, // #2624
      LowGrayCompensationOne: common.UInt8, // #2636
      LowGrayTransverseStriationImprove: common.UInt8, // #2648
      CrossBoardOptimization: common.UInt8, // #2660
      GammaMinValue: common.UInt8, // #2672
      EliminateOpenCircuitCrossLevel: common.UInt8, // #2684
      CurrentGain: common.UInt8, // #2696
      EliminateGhostTimeOne: common.UInt8,
    }),
  ],
  'ChipSM16169SHExtendPropertyBase'
);
/**
 * Codec for {@link ChipSM16169SHExtendProperty}
 * @category Codecs
 * @see Automatically generated from ../decompiled/Nova.LCT.GigabitSystem.ChipSM16169SH.decompiled.cs:2577
 */
export const ChipSM16169SHExtendProperty = t.intersection(
  [
    ChipSM16169SHExtendPropertyBase,
    t.partial({ '@_xsi:type': t.literal('ChipSM16169SHExtendProperty') }),
  ],
  'ChipSM16169SHExtendProperty'
);
export interface ChipSM16169SHExtendProperty extends t.TypeOf<typeof ChipSM16169SHExtendProperty> {}
