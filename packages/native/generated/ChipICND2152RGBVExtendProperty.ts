import * as t from 'io-ts';
import * as common from '../lib/common';
import { ChipBaseExtendPropey } from './ChipBaseExtendPropey'; // import
import { ChipICND2152ExtendProperty } from './ChipICND2152ExtendProperty';
 // import
export const ChipICND2152RGBVExtendPropertyBase = t.intersection(
  [
    ChipBaseExtendPropey,
    t.type({
      REG_LENGTH: common.Int32_6,
    }),
    t.partial({
      RedProperty: ChipICND2152ExtendProperty, // #215
      GreenProperty: ChipICND2152ExtendProperty, // #217
      BlueProperty: ChipICND2152ExtendProperty, // #219
      VRedProperty: ChipICND2152ExtendProperty, // #230
      SpecialRegisterAddr: common.UInt32, // #236
      IsUseNewModule: common.Bool, // #238
      ChipLibVersion: common.UInt8, // #240
      RefNumPerVs: common.Int32, // #258
      SubField: common.UInt8, // #277
      LowGrayUniformity: common.Bool, // #292
      BlackScreenEnergyConservation: common.Bool, // #306
      IsAdvancedMode: common.Bool, // #323
      RemoveBadPointsRedGain: common.UInt8, // #335
      RemoveBadPointsGreenGain: common.UInt8, // #347
      RemoveBadPointsBlueGain: common.UInt8, // #359
      RemoveBadPointEnable: common.Bool, // #371
      SpecialDataLen: common.Int32, // #385
      SepcialRegisterAddr: common.UInt32,
    }),
  ],
  'ChipICND2152RGBVExtendPropertyBase'
);
/**
 * Codec for {@link ChipICND2152RGBVExtendProperty}
 * @category Codecs
 * @see Automatically generated from ../decompiled/Nova.LCT.GigabitSystem.ChipICND2152.decompiled.cs:212
 */
export const ChipICND2152RGBVExtendProperty = t.intersection(
  [
    ChipICND2152RGBVExtendPropertyBase,
    t.partial({ '@_xsi:type': t.literal('ChipICND2152RGBVExtendProperty') }),
  ],
  'ChipICND2152RGBVExtendProperty'
);
export interface ChipICND2152RGBVExtendProperty
  extends t.TypeOf<typeof ChipICND2152RGBVExtendProperty> {
  RedProperty?: ChipICND2152ExtendProperty;
  GreenProperty?: ChipICND2152ExtendProperty;
  BlueProperty?: ChipICND2152ExtendProperty;
  VRedProperty?: ChipICND2152ExtendProperty;
}
