import * as t from 'io-ts';
import * as common from '../lib/common';
/**
 * Codec for interface {@link SenderPortRegionInfo}
 * @category Codecs
 * @see Automatically generated from ../decompiled/Nova.LCT.GigabitSystem.DataClass.decompiled.cs:68153
 */
export const SenderPortRegionInfo = t.intersection(
  [
    t.type({
      Width: common.UInt16_400, // #68164
      Height: common.UInt16_400, // #68166
      LoadScanBoardCount: common.UInt16_1024,
    }),
    t.partial({
      SenderIndex: common.UInt8, // #68156
      PortIndex: common.UInt8, // #68158
      X: common.UInt16, // #68160
      Y: common.UInt16, // #68168
      DVIIndex: common.UInt8,
    }),
  ],
  'SenderPortRegionInfo'
);
export interface SenderPortRegionInfo extends t.TypeOf<typeof SenderPortRegionInfo> {}
