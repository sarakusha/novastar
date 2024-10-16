import * as t from 'io-ts';
import * as common from '../lib/common';
import { ChipBaseExtendPropey } from './ChipBaseExtendPropey';
 // import
export const ChipDP3246ExtendPropertyBase = t.intersection(
  [
    ChipBaseExtendPropey,
    t.partial({
      IsUseNewModule: common.Bool, // #4624
      ChipLibVersion: common.UInt8, // #4626
      FirstRegValue: common.UInt16, // #4628
      SecondRegValue: common.UInt16, // #4630
      ThirdRegValue: common.UInt16, // #4632
      FourthRegValue: common.UInt16, // #4634
      GammaSmoothingLevel: common.UInt8, // #4636
      CurrentGain: common.UInt16, // #4648
      ConstantCurrentOutputInflectionPointGrade: common.UInt8, // #4660
      ShadowEliminationLevelEnable: common.Bool, // #4672
      ShadowEliminationLevel: common.UInt8, // #4684
      ErrorCurrentGain: common.UInt16, // #4696
    }),
  ],
  'ChipDP3246ExtendPropertyBase'
);
/**
 * Codec for {@link ChipDP3246ExtendProperty}
 * @category Codecs
 * @see Automatically generated from ../decompiled/Nova.LCT.GigabitSystem.ChipDP3246.decompiled.cs:4621
 */
export const ChipDP3246ExtendProperty = t.intersection(
  [
    ChipDP3246ExtendPropertyBase,
    t.partial({ '@_xsi:type': t.literal('ChipDP3246ExtendProperty') }),
  ],
  'ChipDP3246ExtendProperty'
);
export interface ChipDP3246ExtendProperty extends t.TypeOf<typeof ChipDP3246ExtendProperty> {}
