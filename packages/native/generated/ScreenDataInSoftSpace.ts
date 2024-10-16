import * as t from 'io-ts';
import * as common from '../lib/common';
import { CabinetInDevice } from './CabinetInDevice'; // import
import { DviSelectMode, DviSelectModeEnum } from './DviSelectMode'; // import
import { LEDDisplyType, LEDDisplyTypeEnum } from './LEDDisplyType'; // import
import { OnePortLoadInfo } from './OnePortLoadInfo'; // import
import { VirtualModeType, VirtualModeTypeEnum } from './VirtualModeType'; // import
/**
 * Codec for interface {@link ScreenDataInSoftSpace}
 * @category Codecs
 * @see Automatically generated from ../decompiled/Nova.LCT.GigabitSystem.CommonInfoAccessor.decompiled.cs:1014
 */
export const ScreenDataInSoftSpace = t.intersection(
  [
    t.type({
      UUID: common.string_empty, // #1063
      DviSelect: common.withDefault(DviSelectMode, 'DVI'), // #1195
      OnePortLoadInfo: common.XMLArray(OnePortLoadInfo, 'OnePortLoadInfo'), // #1207
      CabinetInDevice: common.XMLArray(CabinetInDevice, 'CabinetInDevice'),
    }),
    t.partial({
      ScrType: LEDDisplyType, // #1075
      VirMode: VirtualModeType, // #1087
      ScrX: common.Int32, // #1099
      ScrY: common.Int32, // #1111
      CabinetCol: common.UInt16, // #1123
      CabinetRow: common.UInt16, // #1135
      PortCols: common.UInt8, // #1147
      PortRows: common.UInt8, // #1159
      DeviceID: common.UInt8, // #1171
      CabinetWidth: common.UInt16, // #1183
      CabinetHeight: common.UInt16, // #1219
      ScreenIndex: common.Int32, // #1231
      DVIlist: t.record(common.Int32, common.PointFromString),
    }),
  ],
  'ScreenDataInSoftSpace'
);
export interface ScreenDataInSoftSpace extends t.TypeOf<typeof ScreenDataInSoftSpace> {
  ScrType?: LEDDisplyTypeEnum;
  DviSelect: DviSelectModeEnum;
  VirMode?: VirtualModeTypeEnum;
}
