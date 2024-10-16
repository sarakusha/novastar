import * as t from 'io-ts';
import * as common from '../lib/common';
import { ChipBaseExtendPropey } from './ChipBaseExtendPropey';
 // import
export const ChipMY9758ExtendPropertyBase = t.intersection(
  [
    ChipBaseExtendPropey,
    t.type({
      RegisterArray: common.XMLArray(common.UInt16, 'ushort'),
    }),
    t.partial({
      DCLKMode: common.UInt8, // #1011
      ScanNumber: common.UInt8, // #1023
      RefreshRate: common.UInt8, // #1035
      ScanningSequence: common.UInt8, // #1047
      LowAshUniformity: common.UInt8, // #1059
      NonIntegerGrayScale: common.UInt8, // #1071
      GrayScaleUpgrade: common.UInt8, // #1083
      UplinkMode: common.UInt8, // #1095
      GCKDoubFrequency: common.UInt8, // #1107
      UpVanishingShadow: common.UInt8, // #1119
      VanishingShadowTime: common.UInt8, // #1131
      CompensateTime: common.UInt8, // #1143
      CrossEliminate: common.UInt8, // #1155
      DetectionPosition: common.UInt8, // #1171
      BlackEnergySaving: common.UInt8, // #1183
      DynamicEnergySaving: common.UInt8, // #1195
      CurrentSetting_1: common.UInt8, // #1207
      CurrentSetting_2: common.UInt8, // #1219
      FineTuning_3: common.UInt8, // #1231
      CurrentGain: common.UInt8, // #1243
      CurrentSetting_3: common.UInt8, // #1255
      ConductionMode: common.UInt8, // #1267
      Compensation_crude: common.UInt8, // #1279
      TimeSharing: common.UInt8, // #1291
      FirstCompensate: common.UInt8, // #1303
      CouplingOptimization: common.UInt8, // #1315
      SquareGhost: common.UInt8, // #1327
      DownVanishingShadow: common.UInt8, // #1339
      CompensationMode: common.UInt8, // #1351
      CouplingStrengthen: common.UInt8, // #1363
      FineTuning_2: common.UInt8, // #1375
      CompensationCapacity: common.UInt8, // #1387
      FineTuning_1: common.UInt8, // #1399
      Compensation_fine: common.UInt8, // #1411
      CrossEliminateBool: common.Bool,
    }),
  ],
  'ChipMY9758ExtendPropertyBase'
);
/**
 * Codec for {@link ChipMY9758ExtendProperty}
 * @category Codecs
 * @see Automatically generated from ../decompiled/Nova.LCT.ChipMY9758.decompiled.cs:1004
 */
export const ChipMY9758ExtendProperty = t.intersection(
  [
    ChipMY9758ExtendPropertyBase,
    t.partial({ '@_xsi:type': t.literal('ChipMY9758ExtendProperty') }),
  ],
  'ChipMY9758ExtendProperty'
);
export interface ChipMY9758ExtendProperty extends t.TypeOf<typeof ChipMY9758ExtendProperty> {}
