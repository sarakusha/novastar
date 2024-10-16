import * as t from 'io-ts';
import * as common from '../lib/common';
import { ZoomType, ZoomTypeEnum } from './ZoomType'; // import
/**
 * Codec for interface {@link ScreenAdjustParams}
 * @category Codecs
 * @see Automatically generated from ../decompiled/Nova.LCT.GigabitSystem.DataClass.decompiled.cs:71481
 */
export const ScreenAdjustParams = t.intersection(
  [
    t.type({
      ScreenXScale: common.Int32_1, // #71487
      ScreenYScale: common.Int32_1, // #71489
      VirtualMap: common.withDefault(common.Int32, 228), // #71491
      ScreenName: common.string_empty,
    }),
    t.partial({
      ScreenXZoomType: ZoomType, // #71483
      ScreenYZoomType: ZoomType, // #71493
      ThreeD: common.UInt8,
    }),
  ],
  'ScreenAdjustParams'
);
export interface ScreenAdjustParams extends t.TypeOf<typeof ScreenAdjustParams> {
  ScreenXZoomType?: ZoomTypeEnum;
  ScreenYZoomType?: ZoomTypeEnum;
}
