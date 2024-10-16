import * as t from 'io-ts';
import * as common from '../lib/common';
import { ClearViewInfo } from './ClearViewInfo'; // import
/**
 * Codec for interface {@link ScreenPortAddrInfo}
 * @category Codecs
 * @see Automatically generated from ../decompiled/Nova.LCT.GigabitSystem.DataClass.decompiled.cs:70757
 */
export const ScreenPortAddrInfo = t.partial(
  {
    SenderIndex: common.UInt8, // #70760
    PortIndex: common.UInt8, // #70762
    LoadScannerCount: common.Int32, // #70764
    MaxConnectIndex: common.Int32, // #70766
    MinConnectIndex: common.Int32, // #70768
    CurIsOpen18Bit: common.Bool, // #70770
    CurIsOpenClearview: common.Bool, // #70772
    ClearViewInfo, // #70774
  },
  'ScreenPortAddrInfo'
);
export interface ScreenPortAddrInfo extends t.TypeOf<typeof ScreenPortAddrInfo> {
  ClearViewInfo?: ClearViewInfo;
}
