import * as t from 'io-ts';
import * as common from '../lib/common';
import { ScanBoardProperty } from './ScanBoardProperty'; // import
import { SenderRedundancyInfo } from './SenderRedundancyInfo'; // import
/**
 * Codec for interface {@link SystemParameterConfig}
 * @category Codecs
 * @see Automatically generated from ../decompiled/Nova.GigabitController.ProgramInnerData.decompiled.cs:895
 */
export const SystemParameterConfig = t.intersection(
  [
    t.type({
      ReduInfoList: common.XMLArray(SenderRedundancyInfo, 'SenderRedundancyInfo'), // #932
      CaptureScreenFrame: common.withDefault(common.Int32, 30),
    }),
    t.partial({
      SacnBdProp: ScanBoardProperty, // #920
      ScreenCfgInfo: common.Base64, // #944
      SyncVideoData: common.Base64,
    }),
  ],
  'SystemParameterConfig'
);
export interface SystemParameterConfig extends t.TypeOf<typeof SystemParameterConfig> {
  SacnBdProp?: ScanBoardProperty;
}
