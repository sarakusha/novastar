import * as t from 'io-ts';
import * as common from '../lib/common';
import { LEDDisplyType, LEDDisplyTypeEnum } from './LEDDisplyType'; // import
import { ScanBoardRegionInfo } from './ScanBoardRegionInfo'; // import
import { ScreenAdjustParams } from './ScreenAdjustParams'; // import
import { VirtualModeParams } from './VirtualModeParams'; // import
import { VirtualModeType, VirtualModeTypeEnum } from './VirtualModeType'; // import
/**
 * Codec for interface {@link StandardLEDDisplayInfo}
 * @category Codecs
 * @see Automatically generated from ../decompiled/Nova.LCT.GigabitSystem.DataClass.decompiled.cs:69325
 */
export const StandardLEDDisplayInfo = t.intersection(
  [
    t.type({
      ScanBoardCols: common.UInt16_1, // #69388
      ScanBoardRows: common.UInt16_1, // #69455
      ScannerRegionList: common.XMLArray(ScanBoardRegionInfo, 'ScanBoardRegionInfo'),
    }),
    t.partial({
      X: common.UInt16, // #69332
      Y: common.UInt16, // #69334
      DVIOffest: t.record(common.Int32, common.PointFromString), // #69336
      IsOpen18Bit: common.Bool, // #69350
      IsOpenClearview: common.Bool, // #69362
      Type: LEDDisplyType, // #69374
      VirtualMode: VirtualModeType, // #69400
      ScannerCount: common.Int32, // #69412
      ScrAdjustParams: ScreenAdjustParams, // #69443
      VirtualModeParams,
    }),
  ],
  'StandardLEDDisplayInfo'
);
export interface StandardLEDDisplayInfo extends t.TypeOf<typeof StandardLEDDisplayInfo> {
  Type?: LEDDisplyTypeEnum;
  VirtualMode?: VirtualModeTypeEnum;
  ScrAdjustParams?: ScreenAdjustParams;
  VirtualModeParams?: VirtualModeParams;
}
