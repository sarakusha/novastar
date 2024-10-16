import * as t from 'io-ts';
import * as common from '../lib/common';
import { ChipBaseExtendPropey } from './ChipBaseExtendPropey'; // import
import { ChipMTS01ExtendProperty } from './ChipMTS01ExtendProperty';
 // import
export const ChipMTS01RGBVExtendPropertyBase = t.intersection(
  [
    ChipBaseExtendPropey,
    t.type({
      REG_LENGTH: common.Int32_7,
    }),
    t.partial({
      RedProperty: ChipMTS01ExtendProperty, // #3059
      GreenProperty: ChipMTS01ExtendProperty, // #3061
      BlueProperty: ChipMTS01ExtendProperty, // #3063
      VRedProperty: ChipMTS01ExtendProperty, // #3065
      IsUseNewModule: common.Bool, // #3071
      ChipLibVersion: common.UInt8, // #3073
      IsAdvancedMode: common.Bool, // #3075
      SetConfig: common.Bool, // #3091
      ScanType: common.UInt8, // #3107
      BitLevel: common.UInt8, // #3119
      SlotsSplitNum: common.UInt8, // #3140
      GainTest: common.UInt8, // #3161
      OpenMismatch: common.UInt8, // #3173
      SaveEnergy: common.Bool, // #3185
      M: common.UInt8, // #3201
      N: common.UInt8, // #3222
      K: common.UInt8, // #3243
      FrequencyPclk: common.UInt8, // #3255
      LowGrayBalanceMode: common.Bool, // #3274
      FrameBlanking: common.UInt16, // #3290
      LineBlanking: common.UInt16, // #3302
      TestMode: common.Bool, // #3314
      TemperatureTestLevel: common.UInt8, // #3330
      BadPointEn: common.Bool, // #3342
      Dummy: common.Bool, // #3358
      CloseMos: common.UInt8, // #3374
      OpenMos: common.UInt8, // #3386
      clmp: common.UInt8, // #3398
      SpecialDataLen: common.Int32, // #3410
      SpecialRegisterAddr: common.UInt32,
    }),
  ],
  'ChipMTS01RGBVExtendPropertyBase'
);
/**
 * Codec for {@link ChipMTS01RGBVExtendProperty}
 * @category Codecs
 * @see Automatically generated from ../decompiled/Nova.LCT.GigabitSystem.ChipMTS01.decompiled.cs:3054
 */
export const ChipMTS01RGBVExtendProperty = t.intersection(
  [
    ChipMTS01RGBVExtendPropertyBase,
    t.partial({ '@_xsi:type': t.literal('ChipMTS01RGBVExtendProperty') }),
  ],
  'ChipMTS01RGBVExtendProperty'
);
export interface ChipMTS01RGBVExtendProperty extends t.TypeOf<typeof ChipMTS01RGBVExtendProperty> {
  RedProperty?: ChipMTS01ExtendProperty;
  GreenProperty?: ChipMTS01ExtendProperty;
  BlueProperty?: ChipMTS01ExtendProperty;
  VRedProperty?: ChipMTS01ExtendProperty;
}
