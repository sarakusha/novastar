import * as t from 'io-ts';
import * as common from '../lib/common';
import { ChipBaseExtendPropey } from './ChipBaseExtendPropey';
 // import
export const ChipSM16380SHExtendPropertyBase = t.intersection(
  [
    ChipBaseExtendPropey,
    t.type({
      REG_LENGTH: common.Int32_34, // #2768
      RegValue: common.XMLArray(common.UInt16, 'ushort'),
    }),
    t.partial({
      IsUseNewModule: common.Bool, // #2766
      ChipLibVersion: common.UInt8, // #2770
      GammaMinValue: common.UInt8, // #2773
      EliminateGhostLevel: common.UInt8, // #2785
      GammaMinen: common.Bool, // #2797
      EliminateCharactersGhostLevel: common.UInt8, // #2809
      TheFistScanDarkCompensationLevel: common.UInt8, // #2821
      LowGrayUniformity: common.UInt8, // #2833
      LowGrayCompensationOne: common.UInt8, // #2845
      LowGrayCompensationTwo: common.UInt8, // #2857
      LowGrayTransverseStriationImprove: common.UInt8, // #2869
      CouplingOptimization: common.UInt8, // #2881
      CrossBoardOptimization: common.UInt16, // #2893
      EliminateOpenCircuitCrossLevel: common.UInt8, // #2906
      CurrentGain: common.UInt8, // #2918
      EliminateGhostTimeOne: common.UInt8,
    }),
  ],
  'ChipSM16380SHExtendPropertyBase'
);
/**
 * Codec for {@link ChipSM16380SHExtendProperty}
 * @category Codecs
 * @see Automatically generated from ../decompiled/Nova.LCT.GigabitSystem.ChipSM16380SH.decompiled.cs:2761
 */
export const ChipSM16380SHExtendProperty = t.intersection(
  [
    ChipSM16380SHExtendPropertyBase,
    t.partial({ '@_xsi:type': t.literal('ChipSM16380SHExtendProperty') }),
  ],
  'ChipSM16380SHExtendProperty'
);
export interface ChipSM16380SHExtendProperty extends t.TypeOf<typeof ChipSM16380SHExtendProperty> {}
