import * as t from 'io-ts';
import * as common from '../lib/common';
import { ChipBaseExtendPropey } from './ChipBaseExtendPropey';
 // import
export const Chip5051BExtendPropeyBase = t.intersection(
  [
    ChipBaseExtendPropey,
    t.partial({
      EliminateAfterLow: common.UInt8, // #43194
      FirstSweepElimination: common.UInt8, // #43207
      GrayscaleUniformitySettingEn: common.Bool, // #43220
    }),
  ],
  'Chip5051BExtendPropeyBase'
);
/**
 * Codec for {@link Chip5051BExtendPropey}
 * @category Codecs
 * @see Automatically generated from ../decompiled/Nova.LCT.GigabitSystem.DataClass.decompiled.cs:43186
 */
export const Chip5051BExtendPropey = t.intersection(
  [Chip5051BExtendPropeyBase, t.partial({ '@_xsi:type': t.literal('Chip5051BExtendPropey') })],
  'Chip5051BExtendPropey'
);
export interface Chip5051BExtendPropey extends t.TypeOf<typeof Chip5051BExtendPropey> {}
