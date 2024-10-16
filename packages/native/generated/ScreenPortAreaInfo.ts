import * as t from 'io-ts';
import * as common from '../lib/common';
/**
 * Codec for interface {@link ScreenPortAreaInfo}
 * @category Codecs
 * @see Automatically generated from ../decompiled/Nova.LCT.GigabitSystem.DataClass.decompiled.cs:70805
 */
export const ScreenPortAreaInfo = t.intersection(
  [
    t.type({
      DviIndex: common.UInt8_1,
    }),
    t.partial({
      SenderIndex: common.UInt8, // #70810
      PortIndex: common.UInt8, // #70812
      LoadMinX: common.Int32, // #70814
      LoadMinY: common.Int32, // #70816
      LoadMaxX: common.Int32, // #70818
      LoadMaxY: common.Int32, // #70820
      DeviationX: common.Int32, // #70822
      DeviationY: common.Int32,
    }),
  ],
  'ScreenPortAreaInfo'
);
export interface ScreenPortAreaInfo extends t.TypeOf<typeof ScreenPortAreaInfo> {}
