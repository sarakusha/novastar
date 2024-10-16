import * as t from 'io-ts';
import * as common from '../lib/common';
/**
 * Codec for interface {@link ChipBaseExtendPropey}
 * @category Codecs
 * @see Automatically generated from ../decompiled/Nova.LCT.GigabitSystem.DataClass.decompiled.cs:30354
 */
export const ChipBaseExtendPropey = t.partial(
  {
    IsSetLowEffectGamma: common.Bool, // #30445
  },
  'ChipBaseExtendPropey'
);
export interface ChipBaseExtendPropey extends t.TypeOf<typeof ChipBaseExtendPropey> {}
