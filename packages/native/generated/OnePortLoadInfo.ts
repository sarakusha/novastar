import * as t from 'io-ts';
import * as common from '../lib/common';
import { ScanBoardConnectType, ScanBoardConnectTypeEnum } from './ScanBoardConnectType'; // import
/**
 * Codec for interface {@link OnePortLoadInfo}
 * @category Codecs
 * @see Automatically generated from ../decompiled/Nova.LCT.GigabitSystem.CommonInfoAccessor.decompiled.cs:1297
 */
export const OnePortLoadInfo = t.partial(
  {
    Port: common.UInt8, // #1312
    LineType: ScanBoardConnectType, // #1324
    StartCabCol: common.UInt16, // #1336
    StartCabRow: common.UInt16, // #1348
    EndCabCol: common.UInt16, // #1360
    EndCabRow: common.UInt16, // #1372
  },
  'OnePortLoadInfo'
);
export interface OnePortLoadInfo extends t.TypeOf<typeof OnePortLoadInfo> {
  LineType?: ScanBoardConnectTypeEnum;
}
