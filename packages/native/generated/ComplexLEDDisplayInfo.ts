import * as t from 'io-ts';
import * as common from '../lib/common';
import { LEDDisplyType, LEDDisplyTypeEnum } from './LEDDisplyType'; // import
import { ScanBoardRegionInfo } from './ScanBoardRegionInfo'; // import
import { ScreenAdjustParams } from './ScreenAdjustParams'; // import
import { VirtualModeParams } from './VirtualModeParams'; // import
import { VirtualModeType, VirtualModeTypeEnum } from './VirtualModeType'; // import
/**
 * Codec for interface {@link ComplexLEDDisplayInfo}
 * @category Codecs
 * @see Automatically generated from ../decompiled/Nova.LCT.GigabitSystem.DataClass.decompiled.cs:70070
 */
export const ComplexLEDDisplayInfo = t.intersection(
  [
    t.type({
      ScanBoardRegionInfoList: common.XMLArray(ScanBoardRegionInfo, 'ScanBoardRegionInfo'),
    }),
    t.partial({
      IsOpen18Bit: common.Bool, // #70085
      IsOpenClearview: common.Bool, // #70097
      VirtualModeParams, // #70109
      Type: LEDDisplyType, // #70121
      VirtualMode: VirtualModeType, // #70135
      ScannerCount: common.Int32, // #70147
      ScrAdjustParams: ScreenAdjustParams,
    }),
  ],
  'ComplexLEDDisplayInfo'
);
export interface ComplexLEDDisplayInfo extends t.TypeOf<typeof ComplexLEDDisplayInfo> {
  VirtualModeParams?: VirtualModeParams;
  Type?: LEDDisplyTypeEnum;
  VirtualMode?: VirtualModeTypeEnum;
  ScrAdjustParams?: ScreenAdjustParams;
}
