import * as t from 'io-ts';
import * as common from '../lib/common';
import { ChipBaseExtendPropey } from './ChipBaseExtendPropey'; // import
import { ChipSM16609ExtendProperty } from './ChipSM16609ExtendProperty';
 // import
export const ChipSM16609RGBVExtendPropertyBase = t.intersection(
  [
    ChipBaseExtendPropey,
    t.type({
      REGLENGTH: common.Int32_42, // #3339
      REGREMOVEBADPOINTSLENGTH: common.Int32_6,
    }),
    t.partial({
      RedProperty: ChipSM16609ExtendProperty, // #3331
      GreenProperty: ChipSM16609ExtendProperty, // #3333
      BlueProperty: ChipSM16609ExtendProperty, // #3335
      VRedProperty: ChipSM16609ExtendProperty, // #3341
      SpecialRegisterAddr: common.UInt32, // #3347
      IsUseNewModule: common.Bool, // #3349
      ChipLibVersion: common.UInt8, // #3351
      ScanType: common.UInt8, // #3353
      RefNumPerVs: common.UInt8, // #3365
      GrayUniformity: common.UInt8, // #3377
      LineScanGamma: common.UInt8, // #3389
      StandbyEnergyConservation: common.Bool, // #3401
      WisdomEnergyConservation: common.Bool, // #3413
      TakePhotosOptimization: common.Bool, // #3425
      OpenCircuitCheckEnable: common.Bool, // #3437
      GclkFreqP1: common.UInt8, // #3449
      GclkFreqP2: common.UInt8, // #3461
      GclkFreqP3: common.UInt8, // #3473
      CurrentCheckLevel: common.UInt8, // #3485
      IsAdvancedMode: common.Bool, // #3497
      SpecialDataLen: common.Int32,
    }),
  ],
  'ChipSM16609RGBVExtendPropertyBase'
);
/**
 * Codec for {@link ChipSM16609RGBVExtendProperty}
 * @category Codecs
 * @see Automatically generated from ../decompiled/Nova.LCT.GigabitSystem.ChipSM16609.decompiled.cs:3328
 */
export const ChipSM16609RGBVExtendProperty = t.intersection(
  [
    ChipSM16609RGBVExtendPropertyBase,
    t.partial({ '@_xsi:type': t.literal('ChipSM16609RGBVExtendProperty') }),
  ],
  'ChipSM16609RGBVExtendProperty'
);
export interface ChipSM16609RGBVExtendProperty
  extends t.TypeOf<typeof ChipSM16609RGBVExtendProperty> {
  RedProperty?: ChipSM16609ExtendProperty;
  GreenProperty?: ChipSM16609ExtendProperty;
  BlueProperty?: ChipSM16609ExtendProperty;
  VRedProperty?: ChipSM16609ExtendProperty;
}
