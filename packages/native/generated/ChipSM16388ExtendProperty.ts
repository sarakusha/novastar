import * as t from 'io-ts';
import * as common from '../lib/common';
import { ChipBaseExtendPropey } from './ChipBaseExtendPropey';
 // import
export const ChipSM16388ExtendPropertyBase = t.intersection(
  [
    ChipBaseExtendPropey,
    t.type({
      RegisterArray: common.XMLArray(common.UInt16, 'ushort'),
    }),
    t.partial({
      ShadowEliminationLevel_1: common.UInt8, // #3307
      ShadowEliminationTime_1: common.UInt8, // #3319
      ShadowEliminationEnable_2: common.Bool, // #3331
      ShadowEliminationLevel_2: common.UInt8, // #3343
      ShadowEliminationEnable_3: common.Bool, // #3355
      ShadowEliminationLevel_3: common.UInt8, // #3367
      FirstLineDarkCompensationLevel: common.UInt8, // #3379
      FirstLineDarkCompensationTime: common.UInt8, // #3391
      LowGrayCompsention1: common.UInt8, // #3403
      LowGrayCompsention2: common.UInt8, // #3415
      LowGrayHorizontalStripesImproved: common.UInt8, // #3427
      CoupledEnhancementModeEn: common.Bool, // #3439
      CouplingOptimization_1: common.UInt8, // #3451
      CouplingOptimization_2: common.UInt16, // #3463
      EnergySavingMode: common.UInt8, // #3475
      GrayScaleUniformity: common.UInt8, // #3487
      CrossEliminationLevel: common.UInt8,
    }),
  ],
  'ChipSM16388ExtendPropertyBase'
);
/**
 * Codec for {@link ChipSM16388ExtendProperty}
 * @category Codecs
 * @see Automatically generated from ../decompiled/Nova.LCT.GigabitSystem.ChipSM16388.decompiled.cs:3300
 */
export const ChipSM16388ExtendProperty = t.intersection(
  [
    ChipSM16388ExtendPropertyBase,
    t.partial({ '@_xsi:type': t.literal('ChipSM16388ExtendProperty') }),
  ],
  'ChipSM16388ExtendProperty'
);
export interface ChipSM16388ExtendProperty extends t.TypeOf<typeof ChipSM16388ExtendProperty> {}
