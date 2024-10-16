import * as t from 'io-ts';
import * as common from '../lib/common';
import { ChipBaseExtendPropey } from './ChipBaseExtendPropey'; // import
import { ChipDP3263ExtendProperty } from './ChipDP3263ExtendProperty';
 // import
export const ChipDP3263RGBVExtendPropertyBase = t.intersection(
  [
    ChipBaseExtendPropey,
    t.type({
      REG_LENGTH: common.Int32_7, // #3377
      IsAdvancedMode: common.Bool_true,
    }),
    t.partial({
      RedProperty: ChipDP3263ExtendProperty, // #3325
      GreenProperty: ChipDP3263ExtendProperty, // #3327
      BlueProperty: ChipDP3263ExtendProperty, // #3329
      VRedProperty: ChipDP3263ExtendProperty, // #3331
      IsUseNewModule: common.Bool, // #3341
      ChipLibVersion: common.UInt8, // #3343
      BlackScreenEnergySaving: common.UInt8, // #3345
      GCLKMutiRateEn: common.Bool, // #3359
      DoubleAlongCoefficient: common.Bool, // #3389
      SpecialDataLen: common.Int32, // #3401
      SpecialRegisterAddr: common.UInt32, // #3403
      ErrRedGain: common.Int32, // #3486
      ErrGreenGain: common.Int32, // #3498
      ErrBlueGain: common.Int32, // #3510
      ErrVRedGain: common.Int32,
    }),
  ],
  'ChipDP3263RGBVExtendPropertyBase'
);
/**
 * Codec for {@link ChipDP3263RGBVExtendProperty}
 * @category Codecs
 * @see Automatically generated from ../decompiled/Nova.LCT.GigabitSystem.ChipDP3263.decompiled.cs:3320
 */
export const ChipDP3263RGBVExtendProperty = t.intersection(
  [
    ChipDP3263RGBVExtendPropertyBase,
    t.partial({ '@_xsi:type': t.literal('ChipDP3263RGBVExtendProperty') }),
  ],
  'ChipDP3263RGBVExtendProperty'
);
export interface ChipDP3263RGBVExtendProperty
  extends t.TypeOf<typeof ChipDP3263RGBVExtendProperty> {
  RedProperty?: ChipDP3263ExtendProperty;
  GreenProperty?: ChipDP3263ExtendProperty;
  BlueProperty?: ChipDP3263ExtendProperty;
  VRedProperty?: ChipDP3263ExtendProperty;
}
