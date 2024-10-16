import * as t from 'io-ts';
import * as common from '../lib/common';
import { ChipBaseExtendPropey } from './ChipBaseExtendPropey';
 // import
export const ChipC8325ExtendPropertyBase = t.intersection(
  [
    ChipBaseExtendPropey,
    t.type({
      RegisterArray: common.XMLArray(common.UInt16, 'ushort'),
    }),
    t.partial({
      IsUseNewModule: common.Bool, // #2440
      ChipLibVersion: common.UInt8, // #2442
      RefreshRate: common.UInt8, // #2444
      LowAshEnhanceUniformity: common.UInt8, // #2456
      ChangeLineBlankingLevel: common.UInt8, // #2468
      CouplingBlankingLevel: common.UInt8, // #2480
      OpenProtectEnable: common.Bool, // #2492
      ColumnBlankingInterval: common.UInt8, // #2504
      ParityScanningEnable: common.Bool, // #2516
      CurrentGear: common.UInt8, // #2528
      ConstantCurrentInflectionPoint: common.UInt8, // #2540
      OpenDetectionVoltage: common.UInt8, // #2552
      CouplingOptimizationSetting: common.UInt8, // #2564
      LowGrayCompsentionStrength: common.UInt8, // #2576
      LowGrayCompsentionMode: common.UInt8,
    }),
  ],
  'ChipC8325ExtendPropertyBase'
);
/**
 * Codec for {@link ChipC8325ExtendProperty}
 * @category Codecs
 * @see Automatically generated from ../decompiled/Nova.LCT.GigabitSystem.ChipC8325.decompiled.cs:2435
 */
export const ChipC8325ExtendProperty = t.intersection(
  [ChipC8325ExtendPropertyBase, t.partial({ '@_xsi:type': t.literal('ChipC8325ExtendProperty') })],
  'ChipC8325ExtendProperty'
);
export interface ChipC8325ExtendProperty extends t.TypeOf<typeof ChipC8325ExtendProperty> {}
