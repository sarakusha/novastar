import * as t from 'io-ts';
import * as common from '../lib/common';
import { ChipBaseExtendPropey } from './ChipBaseExtendPropey';
 // import
export const ChipDP3246CommonExtendPropertyBase = t.intersection(
  [
    ChipBaseExtendPropey,
    t.partial({
      IsUseNewModule: common.Bool, // #4187
      ChipLibVersion: common.UInt8, // #4189
      FirstRegValue: common.UInt16, // #4191
      SecondRegValue: common.UInt16, // #4193
      ThirdRegValue: common.UInt16, // #4195
      FourthRegValue: common.UInt16, // #4197
      GammaSmoothingLevel: common.UInt8, // #4199
      CurrentGain: common.UInt16, // #4211
      ConstantCurrentOutputInflectionPointGrade: common.UInt8, // #4223
      ShadowEliminationLevelEnable: common.Bool, // #4235
      ShadowEliminationLevel: common.UInt8, // #4247
      ErrorCurrentGain: common.UInt16, // #4259
    }),
  ],
  'ChipDP3246CommonExtendPropertyBase'
);
/**
 * Codec for {@link ChipDP3246CommonExtendProperty}
 * @category Codecs
 * @see Automatically generated from ../decompiled/Nova.LCT.GigabitSystem.ChipDP3246Common.decompiled.cs:4184
 */
export const ChipDP3246CommonExtendProperty = t.intersection(
  [
    ChipDP3246CommonExtendPropertyBase,
    t.partial({ '@_xsi:type': t.literal('ChipDP3246CommonExtendProperty') }),
  ],
  'ChipDP3246CommonExtendProperty'
);
export interface ChipDP3246CommonExtendProperty
  extends t.TypeOf<typeof ChipDP3246CommonExtendProperty> {}
