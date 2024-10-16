import * as t from 'io-ts';
import * as common from '../lib/common';
/**
 * Codec for interface {@link Chip5155ExtendProperty}
 * @category Codecs
 * @see Automatically generated from ../decompiled/Nova.LCT.GigabitSystem.DataClass.decompiled.cs:56582
 */
export const Chip5155ExtendProperty = t.partial(
  {
    OptimizationEnable: common.Bool, // #56588
    GammaPresetType: common.UInt8, // #56601
  },
  'Chip5155ExtendProperty'
);
export interface Chip5155ExtendProperty extends t.TypeOf<typeof Chip5155ExtendProperty> {}
