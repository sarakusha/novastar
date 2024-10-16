import * as t from 'io-ts';
import * as common from '../lib/common';
import { ChipBaseExtendPropey } from './ChipBaseExtendPropey';
 // import
export const ChipICND2153PExtendPropertyBase = t.intersection(
  [
    ChipBaseExtendPropey,
    t.partial({
      IsUseNewModule: common.Bool, // #2363
      ChipLibVersion: common.UInt8, // #2365
      FirstRegValue: common.UInt16, // #2367
      SecondRegValue: common.UInt16, // #2369
      ThirdRegValue: common.UInt16, // #2371
      FourthRegValue: common.UInt16, // #2373
      LowAshPitsImprove: common.UInt8, // #2375
      IsAberrationOptimize: common.Bool, // #2387
      IsElimateShadow: common.Bool, // #2403
      LowGrayAdjustGrade: common.UInt8, // #2419
      IsLowGrayAdjust: common.Bool, // #2431
      LowGrayCompensateGrade: common.UInt8, // #2447
      IsLowGrayCompensate: common.Bool, // #2459
      FirstLineSlantsDarkOpt: common.UInt8, // #2475
      CurrentGain: common.UInt16, // #2487
    }),
  ],
  'ChipICND2153PExtendPropertyBase'
);
/**
 * Codec for {@link ChipICND2153PExtendProperty}
 * @category Codecs
 * @see Automatically generated from ../decompiled/Nova.LCT.GigabitSystem.ChipICND2153P.decompiled.cs:2360
 */
export const ChipICND2153PExtendProperty = t.intersection(
  [
    ChipICND2153PExtendPropertyBase,
    t.partial({ '@_xsi:type': t.literal('ChipICND2153PExtendProperty') }),
  ],
  'ChipICND2153PExtendProperty'
);
export interface ChipICND2153PExtendProperty extends t.TypeOf<typeof ChipICND2153PExtendProperty> {}
