import * as t from 'io-ts';
import * as common from '../lib/common';
import { ChipBaseExtendPropey } from './ChipBaseExtendPropey';
 // import
export const ChipFM6047ExtendPropertyBase = t.intersection(
  [
    ChipBaseExtendPropey,
    t.partial({
      IsUseNewModule: common.Bool, // #2924
      ChipLibVersion: common.UInt8, // #2926
      FirstRegValue: common.UInt16, // #2928
      SecondRegValue: common.UInt16, // #2930
      ThirdRegValue: common.UInt16, // #2932
      FourthRegValue: common.UInt16, // #2934
      OEWidth: common.UInt8, // #2936
      OEDelay: common.UInt8, // #2949
      Inflexion: common.UInt8, // #2961
      HiddenMode: common.UInt8, // #2973
      CurrentGain: common.UInt16, // #2985
      ShadowEliminationLevel: common.UInt8, // #2997
      OpenTestEnable: common.Bool, // #3009
      ErrCurrentGain: common.UInt16, // #3021
    }),
  ],
  'ChipFM6047ExtendPropertyBase'
);
/**
 * Codec for {@link ChipFM6047ExtendProperty}
 * @category Codecs
 * @see Automatically generated from ../decompiled/Nova.LCT.GigabitSystem.ChipFM6047.decompiled.cs:2921
 */
export const ChipFM6047ExtendProperty = t.intersection(
  [
    ChipFM6047ExtendPropertyBase,
    t.partial({ '@_xsi:type': t.literal('ChipFM6047ExtendProperty') }),
  ],
  'ChipFM6047ExtendProperty'
);
export interface ChipFM6047ExtendProperty extends t.TypeOf<typeof ChipFM6047ExtendProperty> {}
