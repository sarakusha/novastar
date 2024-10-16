import * as t from 'io-ts';
import * as common from '../lib/common';
/**
 * Codec for interface {@link ChipSUM2032ExtendProperty}
 * @category Codecs
 * @see Automatically generated from ../decompiled/Nova.LCT.GigabitSystem.DataClass.decompiled.cs:63173
 */
export const ChipSUM2032ExtendProperty = t.intersection(
  [
    t.type({
      RColumnGhostCancelingMode: common.UInt8_56, // #63207
      GColumnGhostCancelingMode: common.UInt8_56, // #63220
      BColumnGhostCancelingMode: common.UInt8_56, // #63233
      VRColumnGhostCancelingMode: common.UInt8_56, // #63246
      RColumnGhostCanceling: common.UInt8_7, // #63259
      GColumnGhostCanceling: common.UInt8_5, // #63272
      BColumnGhostCanceling: common.UInt8_3, // #63285
      VRColumnGhostCanceling: common.UInt8_7, // #63298
      RLowGrayMode: common.UInt8_7, // #63311
      GLowGrayMode: common.UInt8_1, // #63324
      BLowGrayMode: common.UInt8_1, // #63337
      VRLowGrayMode: common.UInt8_7, // #63350
      RLowGrayCompensation: common.UInt8_1, // #63363
      GLowGrayCompensation: common.UInt8_4, // #63376
      BLowGrayCompensation: common.UInt8_4, // #63389
      VRLowGrayCompensation: common.UInt8_1,
    }),
    t.partial({}),
  ],
  'ChipSUM2032ExtendProperty'
);
export interface ChipSUM2032ExtendProperty extends t.TypeOf<typeof ChipSUM2032ExtendProperty> {}
