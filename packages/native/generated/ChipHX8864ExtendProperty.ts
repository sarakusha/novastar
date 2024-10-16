import * as t from 'io-ts';
import * as common from '../lib/common';
import { ChipBaseExtendPropey } from './ChipBaseExtendPropey';
 // import
export const ChipHX8864ExtendPropertyBase = t.intersection(
  [
    ChipBaseExtendPropey,
    t.type({
      RegisterArray: common.XMLArray(common.UInt16, 'ushort'),
    }),
    t.partial({
      FirstRegValue: common.UInt16, // #3913
      SecondRegValue: common.UInt16, // #3915
      ThirdRegValue: common.UInt16, // #3917
      FourthRegValue: common.UInt16, // #3919
      FifthRegValue: common.UInt16, // #3921
      SixthRegValue: common.UInt16, // #3923
      IsUseNewModule: common.Bool, // #3925
      ChipLibVersion: common.UInt8, // #3927
      LowGreyOrderOptModel: common.UInt8, // #3929
      LowGreyOrderOpt2: common.UInt8, // #3941
      CouplingStartTime: common.UInt8, // #3957
      CurrentGain: common.UInt16, // #3969
      ErrorCurrentGain: common.UInt16, // #3983
      InflectionPointVoltage: common.UInt8, // #3997
      FirstLineCompensationTime: common.UInt8, // #4009
      ShadowEliminationTime: common.UInt8, // #4021
      FirstLineCompensationLevel: common.UInt8, // #4033
      ShadowEliminationLevel: common.UInt8, // #4045
      LowGrayColorCompensation: common.UInt8, // #4057
      CouplingOptimization1: common.UInt8, // #4069
      CouplingOptimization2Enable: common.Bool, // #4081
      CouplingOptimization2: common.UInt8, // #4093
      CouplingReguEnable: common.Bool, // #4105
      CouplingEnhan: common.UInt8,
    }),
  ],
  'ChipHX8864ExtendPropertyBase'
);
/**
 * Codec for {@link ChipHX8864ExtendProperty}
 * @category Codecs
 * @see Automatically generated from ../decompiled/Nova.LCT.GigabitSystem.ChipHX8864.decompiled.cs:3908
 */
export const ChipHX8864ExtendProperty = t.intersection(
  [
    ChipHX8864ExtendPropertyBase,
    t.partial({ '@_xsi:type': t.literal('ChipHX8864ExtendProperty') }),
  ],
  'ChipHX8864ExtendProperty'
);
export interface ChipHX8864ExtendProperty extends t.TypeOf<typeof ChipHX8864ExtendProperty> {}
