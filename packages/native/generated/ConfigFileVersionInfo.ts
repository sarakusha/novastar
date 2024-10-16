import * as t from 'io-ts';
import * as common from '../lib/common';
import { ScanBoardVersionInfo } from './ScanBoardVersionInfo'; // import
/**
 * Codec for interface {@link ConfigFileVersionInfo}
 * @category Codecs
 * @see Automatically generated from ../decompiled/Nova.LCT.GigabitSystem.DataClass.decompiled.cs:38572
 */
export const ConfigFileVersionInfo = t.intersection(
  [
    t.type({
      HWProgramVersionList: common.XMLArray(ScanBoardVersionInfo, 'ScanBoardVersionInfo'),
    }),
    t.partial({
      ChipLibVersion: common.UInt8, // #38578
      ChipRamTableVersion: common.UInt8,
    }),
  ],
  'ConfigFileVersionInfo'
);
export interface ConfigFileVersionInfo extends t.TypeOf<typeof ConfigFileVersionInfo> {}
