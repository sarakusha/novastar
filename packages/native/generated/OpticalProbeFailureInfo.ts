import * as t from 'io-ts';
import * as common from '../lib/common';
/**
 * Codec for interface {@link OpticalProbeFailureInfo}
 * @category Codecs
 * @see Automatically generated from ../decompiled/Nova.LCT.GigabitSystem.DataClass.decompiled.cs:73476
 */
export const OpticalProbeFailureInfo = t.partial(
  {
    IsEnable: common.Bool, // #73479
    BrightnessValue: common.Int32, // #73481
  },
  'OpticalProbeFailureInfo'
);
export interface OpticalProbeFailureInfo extends t.TypeOf<typeof OpticalProbeFailureInfo> {}
