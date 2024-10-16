import * as t from 'io-ts';
import * as common from '../lib/common';
import { CustomGammaMode, CustomGammaModeEnum } from './CustomGammaMode'; // import
import { CustomImageQualityMode, CustomImageQualityModeEnum } from './CustomImageQualityMode'; // import
/**
 * Codec for interface {@link CustomGammaInfo}
 * @category Codecs
 * @see Automatically generated from ../decompiled/Nova.LCT.GigabitSystem.DataClass.decompiled.cs:74852
 */
export const CustomGammaInfo = t.intersection(
  [
    t.type({
      GrayBit: common.Int32_12,
    }),
    t.partial({
      GammaMode: CustomGammaMode, // #74860
      ImageQualityMode: CustomImageQualityMode,
    }),
  ],
  'CustomGammaInfo'
);
export interface CustomGammaInfo extends t.TypeOf<typeof CustomGammaInfo> {
  GammaMode?: CustomGammaModeEnum;
  ImageQualityMode?: CustomImageQualityModeEnum;
}
