import * as t from 'io-ts';
import * as common from '../lib/common';
/**
 * Codec for interface {@link CabinetInDevice}
 * @category Codecs
 * @see Automatically generated from ../decompiled/Nova.LCT.GigabitSystem.CommonInfoAccessor.decompiled.cs:1407
 */
export const CabinetInDevice = t.partial(
  {
    DevID: common.UInt32, // #1426
    NetPort: common.UInt32, // #1438
    ConnectID: common.UInt32, // #1450
    XPos: common.Int32, // #1462
    YPos: common.Int32, // #1474
    Width: common.UInt32, // #1486
    Height: common.UInt32, // #1498
    GroupID: common.UInt8, // #1510
    RowIndexInScreen: common.Int32, // #1522
    ColIndexInScreen: common.Int32, // #1524
    DviIndex: common.UInt8, // #1526
  },
  'CabinetInDevice'
);
export interface CabinetInDevice extends t.TypeOf<typeof CabinetInDevice> {}
