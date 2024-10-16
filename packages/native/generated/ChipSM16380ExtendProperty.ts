import * as t from 'io-ts';
import * as common from '../lib/common';
import { ChipBaseExtendPropey } from './ChipBaseExtendPropey';
 // import
export const ChipSM16380ExtendPropertyBase = t.intersection(
  [
    ChipBaseExtendPropey,
    t.type({
      RegisterArray: common.XMLArray(common.UInt16, 'ushort'),
    }),
    t.partial({
      FirstRegValue: common.UInt16, // #997
      SecondRegValue: common.UInt16, // #999
      ShadowEliminationLevel: common.UInt8, // #1001
      ShadowEliminationTime: common.UInt8, // #1013
      ShadowEliminationEnable: common.Bool, // #1025
      FirstLineDarkCompensationLevel: common.UInt8, // #1037
      LowGrayCompsention: common.UInt8, // #1049
      CrossEliminationLevel: common.UInt8, // #1061
      GrayScaleUniformity: common.UInt8, // #1073
      CouplingOptimization: common.Int32, // #1085
      EnergySavingMode: common.UInt8, // #1097
      EnergySavingEnable: common.Bool,
    }),
  ],
  'ChipSM16380ExtendPropertyBase'
);
/**
 * Codec for {@link ChipSM16380ExtendProperty}
 * @category Codecs
 * @see Automatically generated from ../decompiled/Nova.LCT.GigabitSystem.ChipSM16380.decompiled.cs:990
 */
export const ChipSM16380ExtendProperty = t.intersection(
  [
    ChipSM16380ExtendPropertyBase,
    t.partial({ '@_xsi:type': t.literal('ChipSM16380ExtendProperty') }),
  ],
  'ChipSM16380ExtendProperty'
);
export interface ChipSM16380ExtendProperty extends t.TypeOf<typeof ChipSM16380ExtendProperty> {}
