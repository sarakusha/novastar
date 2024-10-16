import * as t from 'io-ts';
import * as common from '../lib/common';
import { ScanBoardConnectType, ScanBoardConnectTypeEnum } from './ScanBoardConnectType'; // import
/**
 * Codec for interface {@link PortScanBoardInfo}
 * @category Codecs
 * @see Automatically generated from ../decompiled/Nova.LCT.GigabitSystem.DataClass.decompiled.cs:68642
 */
export const PortScanBoardInfo = t.partial(
  {
    ConnectType: ScanBoardConnectType, // #68645
    PortIndex: common.UInt8, // #68647
    ScanBdBegColNo: common.UInt16, // #68649
    ScanBdBegRowNo: common.UInt16, // #68651
    ScanBdEndColNo: common.UInt16, // #68653
    ScanBdEndRowNo: common.UInt16, // #68655
  },
  'PortScanBoardInfo'
);
export interface PortScanBoardInfo extends t.TypeOf<typeof PortScanBoardInfo> {
  ConnectType?: ScanBoardConnectTypeEnum;
}
