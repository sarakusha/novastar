import * as t from 'io-ts';
import * as common from '../lib/common';
import { ChipBaseExtendPropey } from './ChipBaseExtendPropey'; // import
import { ChipSM16289ExtendProperty } from './ChipSM16289ExtendProperty'; // import
import { PointDetectParameter } from './PointDetectParameter';
 // import
export const ChipSM16289RGBVExtendPropertyBase = t.intersection(
  [
    ChipBaseExtendPropey,
    t.type({
      REGLENGTH: common.Int32_35, // #4055
      REGREMOVEBADPOINTSLENGTH: common.Int32_6,
    }),
    t.partial({
      RedProperty: ChipSM16289ExtendProperty, // #4047
      GreenProperty: ChipSM16289ExtendProperty, // #4049
      BlueProperty: ChipSM16289ExtendProperty, // #4051
      VRedProperty: ChipSM16289ExtendProperty, // #4057
      SpecialRegisterAddr: common.UInt32, // #4063
      IsUseNewModule: common.Bool, // #4065
      ChipLibVersion: common.UInt8, // #4067
      ScanType: common.UInt8, // #4069
      RefNumPerVs: common.UInt8, // #4081
      Subfield: common.Int32, // #4093
      SubfieldEn: common.Bool, // #4105
      LowGrayHigh: common.UInt8, // #4117
      LowGrayHighEn: common.Bool, // #4129
      SmartValue: common.UInt8, // #4141
      BlackScreenMode: common.Bool, // #4153
      WisdomEnergyConservation: common.Bool, // #4165
      StandbyMode: common.Bool, // #4177
      TakePhotosOptimization: common.Bool, // #4189
      OpenCircuitCheckEnable: common.Bool, // #4201
      GammaMinValue: common.UInt8, // #4213
      GammaMinen: common.Bool, // #4225
      GclkFreqP1: common.UInt8, // #4237
      GclkFreqP2: common.UInt8, // #4249
      GclkFreqP3: common.UInt8, // #4261
      CurrentCheckLevel: common.UInt8, // #4273
      CustomCoefficient: common.Bool, // #4285
      IsAdvancedMode: common.Bool, // #4297
      SpecialDataLen: common.Int32, // #4309
      PointDetectParameter,
    }),
  ],
  'ChipSM16289RGBVExtendPropertyBase'
);
/**
 * Codec for {@link ChipSM16289RGBVExtendProperty}
 * @category Codecs
 * @see Automatically generated from ../decompiled/Nova.LCT.GigabitSystem.ChipSM16289.decompiled.cs:4044
 */
export const ChipSM16289RGBVExtendProperty = t.intersection(
  [
    ChipSM16289RGBVExtendPropertyBase,
    t.partial({ '@_xsi:type': t.literal('ChipSM16289RGBVExtendProperty') }),
  ],
  'ChipSM16289RGBVExtendProperty'
);
export interface ChipSM16289RGBVExtendProperty
  extends t.TypeOf<typeof ChipSM16289RGBVExtendProperty> {
  RedProperty?: ChipSM16289ExtendProperty;
  GreenProperty?: ChipSM16289ExtendProperty;
  BlueProperty?: ChipSM16289ExtendProperty;
  VRedProperty?: ChipSM16289ExtendProperty;
  PointDetectParameter?: PointDetectParameter;
}
