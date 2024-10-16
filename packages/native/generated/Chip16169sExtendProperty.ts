import * as t from 'io-ts';
import * as common from '../lib/common';
import { ChipBaseExtendPropey } from './ChipBaseExtendPropey'; // import
import { ScanType, ScanTypeEnum } from './ScanType';
 // import
export const Chip16169sExtendPropertyBase = t.intersection(
  [
    ChipBaseExtendPropey,
    t.type({
      FailureLEDEliminationGainLevel: common.UInt8_32,
    }),
    t.partial({
      GrayHorizontalStripesEliminateLow: common.Bool, // #66374
      LowGayCompensation: common.UInt8, // #66376
      FailureLEDElimination: common.Bool, // #66378
      OpenTestGrade: common.UInt8, // #66380
      ShadowVoltage: common.UInt8, // #66382
      IsClearGhostEnable: common.Bool, // #66384
      SubFields: common.UInt8, // #66386
      ScanType, // #66388
      GrayDepth: common.UInt8, // #66390
      LowGayCompensationEnhance: common.Bool, // #66392
      Gain: common.UInt8,
    }),
  ],
  'Chip16169sExtendPropertyBase'
);
/**
 * Codec for {@link Chip16169sExtendProperty}
 * @category Codecs
 * @see Automatically generated from ../decompiled/Nova.LCT.GigabitSystem.DataClass.decompiled.cs:66372
 */
export const Chip16169sExtendProperty = t.intersection(
  [
    Chip16169sExtendPropertyBase,
    t.partial({ '@_xsi:type': t.literal('Chip16169sExtendProperty') }),
  ],
  'Chip16169sExtendProperty'
);
export interface Chip16169sExtendProperty extends t.TypeOf<typeof Chip16169sExtendProperty> {
  ScanType?: ScanTypeEnum;
}
