import * as t from 'io-ts';
import * as common from '../lib/common';
/**
 * Codec for interface {@link SpecialFrameRateInfo}
 * @category Codecs
 * @see Automatically generated from ../decompiled/Nova.LCT.GigabitSystem.DataClass.decompiled.cs:67932
 */
export const SpecialFrameRateInfo = t.partial(
  {
    StartRefNumPerVs: common.Int32, // #67943
    EndRefNumPerVs: common.Int32, // #67956
    StartSubFields: common.Int32, // #67969
    EndSubFields: common.Int32, // #67982
  },
  'SpecialFrameRateInfo'
);
export interface SpecialFrameRateInfo extends t.TypeOf<typeof SpecialFrameRateInfo> {}
