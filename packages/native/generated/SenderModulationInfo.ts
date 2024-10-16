import * as t from 'io-ts';
import * as common from '../lib/common';
import { ModulationModeType } from './ModulationModeType'; // import
/**
 * Codec for interface {@link SenderModulationInfo}
 * @category Codecs
 * @see Automatically generated from ../decompiled/Nova.LCT.GigabitSystem.DataClass.decompiled.cs:71020
 */
export const SenderModulationInfo = t.intersection(
  [
    t.type({
      ModulationModeTypeInfoList: common.XMLArray(ModulationModeType, 'ModulationModeType'),
    }),
    t.partial({
      SenderIndex: common.UInt8, // #71031
      PortIndex: common.UInt8, // #71055
      IsUseDistributor: common.Bool,
    }),
  ],
  'SenderModulationInfo'
);
export interface SenderModulationInfo extends t.TypeOf<typeof SenderModulationInfo> {}
