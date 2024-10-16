import * as t from 'io-ts';
import * as common from '../lib/common';
import { CabinetCorrectLocationSize } from './CabinetCorrectLocationSize'; // import
import { DviSelectMode, DviSelectModeEnum } from './DviSelectMode'; // import
import { ScanBoardProperty } from './ScanBoardProperty'; // import
/**
 * Codec for interface {@link ScanBoardRegionInfo}
 * @category Codecs
 * @see Automatically generated from ../decompiled/Nova.LCT.GigabitSystem.DataClass.decompiled.cs:68197
 */
export const ScanBoardRegionInfo = t.intersection(
  [
    t.type({
      CoordinateForCabinetJsonStr: common.string_empty, // #68242
      ScreenPointList: common.XMLArray(common.PointFromString, 'Point'), // #68248
      DviSelect: common.withDefault(DviSelectMode, 'DVI'), // #68272
      DVIIndex: common.UInt8_255, // #68320
      Width: common.UInt16_32, // #68332
      Height: common.UInt16_32, // #68420
      TagInfoColor: common.withDefault(t.string, 'Red'),
    }),
    t.partial({
      XInPort: common.UInt16, // #68206
      YInPort: common.UInt16, // #68208
      ScanBoardProperty, // #68244
      RcfgxName: t.string, // #68246
      SenderIndex: common.UInt8, // #68260
      PortIndex: common.UInt8, // #68284
      ConnectIndex: common.UInt16, // #68296
      X: common.UInt16, // #68308
      Y: common.UInt16, // #68344
      IsHasMrvID: common.Bool, // #68356
      MrvID: t.string, // #68368
      FreeRoutConnect: common.UInt16, // #68380
      MrvIDObject: t.UnknownRecord, // #68392
      CabinetCorrectLocationSize, // #68404
      RowIndexInScreen: common.Int32, // #68416
      ColIndexInScreen: common.Int32, // #68418
      TagInfo: common.Bool,
    }),
  ],
  'ScanBoardRegionInfo'
);
export interface ScanBoardRegionInfo extends t.TypeOf<typeof ScanBoardRegionInfo> {
  ScanBoardProperty?: ScanBoardProperty;
  DviSelect: DviSelectModeEnum;
  CabinetCorrectLocationSize?: CabinetCorrectLocationSize;
}
