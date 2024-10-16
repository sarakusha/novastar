import * as t from 'io-ts';
import * as common from '../lib/common';
import { ChipBaseExtendPropey } from './ChipBaseExtendPropey';
 // import
export const ChipMY9758AExtendPropertyBase = t.intersection(
  [
    ChipBaseExtendPropey,
    t.type({
      RegisterArray: common.XMLArray(common.UInt16, 'ushort'),
    }),
    t.partial({
      DCLKMode: common.UInt8, // #4391
      ScanNumber: common.UInt8, // #4404
      RefreshRate: common.UInt8, // #4417
      LowAshUniformity: common.UInt8, // #4430
      NonIntegerGrayScale: common.UInt8, // #4443
      GrayScaleUpgrade: common.UInt8, // #4456
      UplinkMode: common.UInt8, // #4469
      GCKDoubFrequency: common.UInt8, // #4482
      UpVanishingShadow: common.UInt8, // #4495
      VanishingShadowTime: common.UInt8, // #4507
      CompensateTime: common.UInt8, // #4519
      CrossEliminate: common.UInt8, // #4535
      DetectionPosition: common.UInt8, // #4551
      BlackEnergySaving: common.UInt8, // #4563
      DynamicEnergySaving: common.UInt8, // #4575
      CurrentSetting_1: common.UInt8, // #4587
      CurrentSetting_2: common.UInt8, // #4599
      FineTuning_3: common.UInt8, // #4611
      CurrentGain: common.UInt8, // #4623
      CurrentSetting_3: common.UInt8, // #4635
      ConductionMode: common.UInt8, // #4647
      Compensation_crude: common.UInt8, // #4659
      TimeSharing: common.UInt8, // #4671
      FirstCompensate: common.UInt8, // #4683
      CouplingOptimization: common.UInt8, // #4695
      SquareGhost: common.UInt8, // #4707
      DownVanishingShadow: common.UInt8, // #4719
      CompensationMode: common.UInt8, // #4731
      CouplingStrengthen: common.UInt8, // #4743
      FineTuning_2: common.UInt8, // #4755
      CompensationCapacity: common.UInt8, // #4767
      FineTuning_1: common.UInt8, // #4779
      Compensation_fine: common.UInt8, // #4791
      CrossEliminateBool: common.Bool,
    }),
  ],
  'ChipMY9758AExtendPropertyBase'
);
/**
 * Codec for {@link ChipMY9758AExtendProperty}
 * @category Codecs
 * @see Automatically generated from ../decompiled/Nova.LCT.GigabitSystem.ChipMY9758A.decompiled.cs:4383
 */
export const ChipMY9758AExtendProperty = t.intersection(
  [
    ChipMY9758AExtendPropertyBase,
    t.partial({ '@_xsi:type': t.literal('ChipMY9758AExtendProperty') }),
  ],
  'ChipMY9758AExtendProperty'
);
export interface ChipMY9758AExtendProperty extends t.TypeOf<typeof ChipMY9758AExtendProperty> {}
