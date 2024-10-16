import * as t from 'io-ts';
import * as common from '../lib/common';
import { LEDDisplyType, LEDDisplyTypeEnum } from './LEDDisplyType'; // import
import { PortScanBoardInfo } from './PortScanBoardInfo'; // import
import { ScreenAdjustParams } from './ScreenAdjustParams'; // import
import { VirtualModeParams } from './VirtualModeParams'; // import
import { VirtualModeType, VirtualModeTypeEnum } from './VirtualModeType'; // import
/**
 * Codec for interface {@link SimpleLEDDisplayInfo}
 * @category Codecs
 * @see Automatically generated from ../decompiled/Nova.LCT.GigabitSystem.DataClass.decompiled.cs:68639
 */
export const SimpleLEDDisplayInfo = t.intersection(
  [
    t.type({
      PixelColsInScanBd: common.UInt16_32, // #68695
      PixelRowsInScanBd: common.UInt16_32, // #68789
      PortScanBdInfoList: common.XMLArray(PortScanBoardInfo, 'PortScanBoardInfo'),
    }),
    t.partial({
      X: common.UInt16, // #68687
      Y: common.UInt16, // #68689
      ScanBdCols: common.UInt16, // #68691
      ScanBdRows: common.UInt16, // #68697
      SenderIndex: common.UInt8, // #68699
      VirtualModeParams, // #68713
      IsOpen18Bit: common.Bool, // #68725
      IsOpenClearview: common.Bool, // #68737
      Type: LEDDisplyType, // #68749
      VirtualMode: VirtualModeType, // #68751
      PortCols: common.UInt8, // #68763
      PortRows: common.UInt8, // #68775
      ScannerCount: common.Int32, // #68787
      ScrAdjustParams: ScreenAdjustParams,
    }),
  ],
  'SimpleLEDDisplayInfo'
);
export interface SimpleLEDDisplayInfo extends t.TypeOf<typeof SimpleLEDDisplayInfo> {
  VirtualModeParams?: VirtualModeParams;
  Type?: LEDDisplyTypeEnum;
  VirtualMode?: VirtualModeTypeEnum;
  ScrAdjustParams?: ScreenAdjustParams;
}
