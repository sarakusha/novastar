import * as t from 'io-ts';
import * as common from '../lib/common';
import { ChipBaseExtendPropey } from './ChipBaseExtendPropey';
 // import
export const ChipCFD135AExtendPropertyBase = t.intersection(
  [
    ChipBaseExtendPropey,
    t.partial({
      IsUseNewModule: common.Bool, // #2228
      ChipLibVersion: common.UInt8, // #2230
      FirstRegValue: common.UInt16, // #2232
      CurrentGain: common.UInt16, // #2234
      ConstantCurrentPointSetting: common.UInt8, // #2246
      ConstantCurrentLevelSetting: common.UInt8, // #2258
      ResponseSetting: common.Bool, // #2270
      BlankLineStrength: common.UInt8, // #2282
      DoutMode: common.Bool, // #2294
    }),
  ],
  'ChipCFD135AExtendPropertyBase'
);
/**
 * Codec for {@link ChipCFD135AExtendProperty}
 * @category Codecs
 * @see Automatically generated from ../decompiled/Nova.LCT.GigabitSystem.ChipCFD135A.decompiled.cs:2225
 */
export const ChipCFD135AExtendProperty = t.intersection(
  [
    ChipCFD135AExtendPropertyBase,
    t.partial({ '@_xsi:type': t.literal('ChipCFD135AExtendProperty') }),
  ],
  'ChipCFD135AExtendProperty'
);
export interface ChipCFD135AExtendProperty extends t.TypeOf<typeof ChipCFD135AExtendProperty> {}
