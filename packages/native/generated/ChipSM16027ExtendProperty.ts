import * as t from 'io-ts';
import * as common from '../lib/common';
import { ChipBaseExtendPropey } from './ChipBaseExtendPropey';
 // import
export const ChipSM16027ExtendPropertyBase = t.intersection(
  [
    ChipBaseExtendPropey,
    t.partial({
      IsAdvancedMode: common.Bool, // #60314
      RVanishingStrength: common.UInt8, // #60327
      GVanishingStrength: common.UInt8, // #60340
      BVanishingStrength: common.UInt8, // #60353
      RLowAshPitsImprove: common.UInt8, // #60366
      GLowAshPitsImprove: common.UInt8, // #60379
      BLowAshPitsImprove: common.UInt8, // #60392
      RLowAshImprovement: common.UInt8, // #60405
      GLowAshImprovement: common.UInt8, // #60418
      BLowAshImprovement: common.UInt8, // #60431
      RedRegValueConfigFirst: common.UInt16, // #60444
      GreenRegValueConfigFirst: common.UInt16, // #60457
      BlueRegValueConfigFirst: common.UInt16, // #60470
      VRedRegValueConfigFirst: common.UInt16, // #60483
    }),
  ],
  'ChipSM16027ExtendPropertyBase'
);
/**
 * Codec for {@link ChipSM16027ExtendProperty}
 * @category Codecs
 * @see Automatically generated from ../decompiled/Nova.LCT.GigabitSystem.DataClass.decompiled.cs:60284
 */
export const ChipSM16027ExtendProperty = t.intersection(
  [
    ChipSM16027ExtendPropertyBase,
    t.partial({ '@_xsi:type': t.literal('ChipSM16027ExtendProperty') }),
  ],
  'ChipSM16027ExtendProperty'
);
export interface ChipSM16027ExtendProperty extends t.TypeOf<typeof ChipSM16027ExtendProperty> {}
