import * as t from 'io-ts';
import * as common from '../lib/common';
import { SubpixelLightPointLayout, SubpixelLightPointLayoutEnum } from './SubpixelLightPointLayout'; // import
import { SubpixelLightPointMode, SubpixelLightPointModeEnum } from './SubpixelLightPointMode'; // import
/**
 * Codec for interface {@link VirtualModeParams}
 * @category Codecs
 * @see Automatically generated from ../decompiled/Nova.LCT.GigabitSystem.DataClass.decompiled.cs:71521
 */
export const VirtualModeParams = t.intersection(
  [
    t.type({
      SubpixelModeNew: common.Int32_1, // #71572
      SubpixelLightPointLayout: common.withDefault(SubpixelLightPointLayout, 'RBG'),
    }),
    t.partial({
      VirtualMapNew: common.Int32, // #71547
      RGBModeNew: common.Int32, // #71559
      SubpixelLightPointMode,
    }),
  ],
  'VirtualModeParams'
);
export interface VirtualModeParams extends t.TypeOf<typeof VirtualModeParams> {
  SubpixelLightPointMode?: SubpixelLightPointModeEnum;
  SubpixelLightPointLayout: SubpixelLightPointLayoutEnum;
}
