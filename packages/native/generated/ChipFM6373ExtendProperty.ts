import * as t from 'io-ts';
import * as common from '../lib/common';
import { ChipBaseExtendPropey } from './ChipBaseExtendPropey'; // import
import { ScanType, ScanTypeEnum } from './ScanType';
 // import
export const ChipFM6373ExtendPropertyBase = t.intersection(
  [
    ChipBaseExtendPropey,
    t.type({
      RegValue: common.XMLArray(common.UInt16, 'ushort'),
    }),
    t.partial({
      ShadowEliminationLevel: common.UInt8, // #965
      ShadowEliminationTime: common.UInt8, // #977
      PrechargeVoltag: common.UInt8, // #989
      PreChargeTime: common.UInt8, // #1002
      LowGrayDisplayEnhance: common.UInt8, // #1014
      LowGrayDisplayEnhanceCheckbox: common.Bool, // #1026
      CouplingOptimizationGrade: common.UInt8, // #1038
      CouplingStrengthAdjust: common.UInt8, // #1050
      EnableCouplingToAdjust: common.Bool, // #1062
      DarkBlockCouplingOptimization: common.UInt8, // #1074
      OpenSpeed: common.UInt8, // #1086
      QuickTurnOff: common.UInt8, // #1098
      UnderGhost: common.Bool, // #1110
      ConstantCurrentInflectionPoint: common.UInt8, // #1122
      DynamicEnergySaving: common.UInt8, // #1134
      EnableToRemoveBadPoints: common.Bool, // #1151
      Gain: common.UInt16, // #1163
      TheFirstLineSlantsDarkCompensationTime: common.UInt8, // #1175
      ShadowBeginEliminationTime: common.UInt8, // #1187
      ScanType, // #1199
      RefreshTheNumberOfClusters: common.UInt16, // #1225
      SubFields: common.UInt8,
    }),
  ],
  'ChipFM6373ExtendPropertyBase'
);
/**
 * Codec for {@link ChipFM6373ExtendProperty}
 * @category Codecs
 * @see Automatically generated from ../decompiled/Nova.LCT.GigabitSystem.ChipFM6373.decompiled.cs:956
 */
export const ChipFM6373ExtendProperty = t.intersection(
  [
    ChipFM6373ExtendPropertyBase,
    t.partial({ '@_xsi:type': t.literal('ChipFM6373ExtendProperty') }),
  ],
  'ChipFM6373ExtendProperty'
);
export interface ChipFM6373ExtendProperty extends t.TypeOf<typeof ChipFM6373ExtendProperty> {
  ScanType?: ScanTypeEnum;
}
