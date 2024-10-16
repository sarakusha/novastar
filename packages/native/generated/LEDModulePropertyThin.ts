import * as t from 'io-ts';
import * as common from '../lib/common';
import { ChipType, ChipTypeEnum } from './ChipType'; // import
import { DataDirectionType, DataDirectionTypeEnum } from './DataDirectionType'; // import
import { DecodeType, DecodeTypeEnum } from './DecodeType'; // import
import { IrregularDataGroupDriverChipNumPair } from './IrregularDataGroupDriverChipNumPair'; // import
import { OEPolarityType, OEPolarityTypeEnum } from './OEPolarityType'; // import
import { ScanType, ScanTypeEnum } from './ScanType'; // import
import { ScreenDriveType, ScreenDriveTypeEnum } from './ScreenDriveType'; // import
/**
 * Codec for interface {@link LEDModulePropertyThin}
 * @category Codecs
 * @see Automatically generated from ../decompiled/Nova.LCT.GigabitSystem.DataClass.decompiled.cs:38081
 */
export const LEDModulePropertyThin = t.intersection(
  [
    t.type({
      ModuleVersion: common.string_20, // #38086
      ModulePixelCols: common.Int32_16, // #38088
      ModulePixelRows: common.Int32_8, // #38090
      ScanType: common.withDefault(ScanType, 'Scan_2'), // #38100
      OEPolarity: common.withDefault(OEPolarityType, 'LowEnable'), // #38102
      DecType: common.withDefault(DecodeType, 'Decode138'), // #38106
      DataGroup: common.UInt8_2, // #38118
      TotalPointInTable: common.Int32_128, // #38130
      SerialColorNum: common.UInt8_3, // #38132
      SerialDotsNumPerColor: common.UInt8_1, // #38136
      ChipMinLawRepeatNumber: common.Int32_1, // #38148
      DataGroupDriverChipNumPairArray: common.XMLArray(
        IrregularDataGroupDriverChipNumPair,
        'IrregularDataGroupDriverChipNumPair'
      ), // #38150
      DriverChipType: common.withDefault(ChipType, 'Chip_MBI5036'),
    }),
    t.partial({
      Name: t.string, // #38104
      DataDirectType: DataDirectionType, // #38108
      DataGroupSequence: common.buffer_MAX_MODULEDATAGROUP, // #38110
      ScanABCDCode: common.buffer_MAX_SCAN, // #38112
      NewScanABCDCode: common.buffer_MAX_SCAN_NEW, // #38114
      ScanABCDCodeSpecila: common.buffer_MAX_SCANSPECIAL, // #38116
      RGBCode: common.buffer_COLOR_COUNT, // #38120
      PointTableData: common.buffer_256, // #38122
      RowsCtrlByDataGroup: common.buffer_MAX_MODULEDATAGROUP, // #38124
      ScreenDriveType, // #38126
      LineBias: common.Int32, // #38128
      StartPositionOfDataGroup: common.buffer_MAX_MODULEDATAGROUP, // #38134
      SerialRGBCode: common.buffer_COLOR_COUNT, // #38138
      ChannelEnableData: common.buffer_2, // #38140
      ChannelData: common.buffer_2, // #38142
      ChipNumber: common.UInt8, // #38144
      IsIrregular: common.UInt8, // #38146
      IrregularPointInfo: t.string, // #38152
      DriverChipTypeExtend: common.UInt8, // #38173
      DriverTypePro: common.UInt8, // #38194
      DecodeTypePro: common.UInt8,
    }),
  ],
  'LEDModulePropertyThin'
);
export interface LEDModulePropertyThin extends t.TypeOf<typeof LEDModulePropertyThin> {
  ScanType: ScanTypeEnum;
  OEPolarity: OEPolarityTypeEnum;
  DecType: DecodeTypeEnum;
  DataDirectType?: DataDirectionTypeEnum;
  ScreenDriveType?: ScreenDriveTypeEnum;
  DriverChipType: ChipTypeEnum;
}
