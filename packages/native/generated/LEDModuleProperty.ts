import * as t from 'io-ts';
import * as common from '../lib/common';
import { ChipType, ChipTypeEnum } from './ChipType'; // import
import { DataDirectionType, DataDirectionTypeEnum } from './DataDirectionType'; // import
import { DecodeType, DecodeTypeEnum } from './DecodeType'; // import
import { IrregularDataGroupDriverChipNumPair } from './IrregularDataGroupDriverChipNumPair'; // import
import { IrregularPointInfo } from './IrregularPointInfo'; // import
import { OEPolarityType, OEPolarityTypeEnum } from './OEPolarityType'; // import
import { ScanType, ScanTypeEnum } from './ScanType'; // import
import { ScreenDriveType, ScreenDriveTypeEnum } from './ScreenDriveType'; // import
/**
 * Codec for interface {@link LEDModuleProperty}
 * @category Codecs
 * @see Automatically generated from ../decompiled/Nova.LCT.GigabitSystem.DataClass.decompiled.cs:37620
 */
export const LEDModuleProperty = t.intersection(
  [
    t.type({
      ModuleVersion: common.string_20, // #37625
      ModulePixelCols: common.Int32_16, // #37627
      ModulePixelRows: common.Int32_8, // #37629
      ScanType: common.withDefault(ScanType, 'Scan_2'), // #37639
      OEPolarity: common.withDefault(OEPolarityType, 'LowEnable'), // #37641
      DecType: common.withDefault(DecodeType, 'Decode138'), // #37645
      DataGroup: common.UInt8_2, // #37657
      TotalPointInTable: common.Int32_128, // #37669
      SerialColorNum: common.UInt8_3, // #37671
      SerialDotsNumPerColor: common.UInt8_1, // #37675
      ChipMinLawRepeatNumber: common.Int32_1, // #37685
      IrregularPointInfoArray: common.XMLArray(IrregularPointInfo, 'IrregularPointInfo'), // #37687
      DataGroupDriverChipNumPairArray: common.XMLArray(
        IrregularDataGroupDriverChipNumPair,
        'IrregularDataGroupDriverChipNumPair'
      ), // #37691
      DriverChipType: common.withDefault(ChipType, 'Chip_MBI5036'),
    }),
    t.partial({
      Name: t.string, // #37643
      DataDirectType: DataDirectionType, // #37647
      DataGroupSequence: common.buffer_MAX_MODULEDATAGROUP, // #37649
      ScanABCDCode: common.buffer_MAX_SCAN, // #37651
      NewScanABCDCode: common.buffer_MAX_SCAN_NEW, // #37653
      ScanABCDCodeSpecila: common.buffer_MAX_SCANSPECIAL, // #37655
      RGBCode: common.buffer_COLOR_COUNT, // #37659
      PointTableData: common.buffer_256, // #37661
      RowsCtrlByDataGroup: common.buffer_MAX_MODULEDATAGROUP, // #37663
      ScreenDriveType, // #37665
      LineBias: common.Int32, // #37667
      StartPositionOfDataGroup: common.buffer_MAX_MODULEDATAGROUP, // #37673
      SerialRGBCode: common.buffer_COLOR_COUNT, // #37677
      ChannelEnableData: common.buffer_2, // #37679
      ChannelData: common.buffer_2, // #37681
      ChipNumber: common.UInt8, // #37683
      IsIrregular: common.UInt8, // #37689
      IrregularPointInfo: t.string, // #37693
      DriverChipTypeExtend: common.UInt8, // #37714
      DriverTypePro: common.UInt8, // #37735
      DecodeTypePro: common.UInt8,
    }),
  ],
  'LEDModuleProperty'
);
export interface LEDModuleProperty extends t.TypeOf<typeof LEDModuleProperty> {
  ScanType: ScanTypeEnum;
  OEPolarity: OEPolarityTypeEnum;
  DecType: DecodeTypeEnum;
  DataDirectType?: DataDirectionTypeEnum;
  ScreenDriveType?: ScreenDriveTypeEnum;
  DriverChipType: ChipTypeEnum;
}
