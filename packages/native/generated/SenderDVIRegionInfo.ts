import * as t from 'io-ts';
import * as common from '../lib/common';
/**
 * Codec for interface {@link SenderDVIRegionInfo}
 * @category Codecs
 * @see Automatically generated from ../decompiled/Nova.LCT.GigabitSystem.DataClass.decompiled.cs:68112
 */
export const SenderDVIRegionInfo = t.intersection(
  [
    t.type({
      Width: common.UInt16_1024, // #68125
      Height: common.UInt16_768,
    }),
    t.partial({
      SenderIndex: common.UInt8, // #68115
      graphicsDviPortIndex: common.UInt8, // #68117
      DVIIndex: common.UInt8, // #68119
      X: common.UInt16, // #68121
      Y: common.UInt16,
    }),
  ],
  'SenderDVIRegionInfo'
);
export interface SenderDVIRegionInfo extends t.TypeOf<typeof SenderDVIRegionInfo> {}
