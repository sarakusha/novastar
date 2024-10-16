import * as t from 'io-ts';
import * as common from '../lib/common';
import { ChipBaseExtendPropey } from './ChipBaseExtendPropey';
 // import
export const ChipNT27052ExtendPropertyBase = t.intersection(
  [
    ChipBaseExtendPropey,
    t.type({
      REGLENTH: common.Int32_34, // #3064
      RegValue: common.XMLArray(common.UInt16, 'ushort'), // #3066
      REMOVEBADPOINTSREGLENGTH: common.Int32_6, // #3068
      RemoveBadPointsRegValue: common.XMLArray(common.UInt16, 'ushort'),
    }),
    t.partial({
      IsUseNewModule: common.Bool, // #3072
      ChipLibVersion: common.UInt8, // #3074
      SavePowerA: common.Bool, // #3076
      OpenRodeBlack: common.Bool, // #3088
      AUTO_RUN_EN: common.Bool, // #3100
      OpenCircuitCheckEnable: common.Bool, // #3112
      SleepMode: common.Bool, // #3124
      SoftRest: common.Bool, // #3136
      SavePowerB: common.Bool, // #3148
      LowGrayOptiomize1: common.UInt8, // #3160
      CloseTime: common.UInt8, // #3172
      PointKnee: common.UInt8, // #3184
      LowGrayOptiomize2: common.UInt8, // #3196
      LowGrayColour1: common.UInt8, // #3208
      LowGrayColour2: common.UInt8, // #3220
      VOC: common.UInt8, // #3232
      PhaEliTime: common.UInt8, // #3244
      BeforeTime: common.UInt8, // #3256
      BeforeVolt: common.UInt8, // #3268
      LowGrayOptim3: common.UInt8, // #3280
      VanishLevel2: common.UInt8, // #3292
      VanishLevel1: common.UInt8, // #3304
      LowGrayOptim1: common.UInt8, // #3316
      LowGrayOptim2: common.UInt8, // #3328
      HighGrayOptim1: common.UInt8, // #3340
      HighGrayOptim2: common.UInt8, // #3352
      CurrentGain: common.UInt16, // #3364
      CurrentGain2: common.UInt16, // #3366
      CurrentGain1: common.UInt8, // #3379
      PRE_CHARGE: common.UInt8, // #3391
      PRE_Ghost: common.UInt8,
    }),
  ],
  'ChipNT27052ExtendPropertyBase'
);
/**
 * Codec for {@link ChipNT27052ExtendProperty}
 * @category Codecs
 * @see Automatically generated from ../decompiled/Nova.LCT.GigabitSystem.Chip_NT27052.decompiled.cs:3061
 */
export const ChipNT27052ExtendProperty = t.intersection(
  [
    ChipNT27052ExtendPropertyBase,
    t.partial({ '@_xsi:type': t.literal('ChipNT27052ExtendProperty') }),
  ],
  'ChipNT27052ExtendProperty'
);
export interface ChipNT27052ExtendProperty extends t.TypeOf<typeof ChipNT27052ExtendProperty> {}
