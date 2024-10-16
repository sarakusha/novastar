import * as t from 'io-ts';
import * as common from '../lib/common';
import { ChipBaseExtendPropey } from './ChipBaseExtendPropey'; // import
import {
  FirstLineCompensationType,
  FirstLineCompensationTypeEnum,
} from './FirstLineCompensationType';
 // import
export const Chip5152ExtendPropertyBase = t.intersection(
  [
    ChipBaseExtendPropey,
    t.partial({
      IsAdvancedMode: common.Bool, // #42811
      RedRegValueConfigFirst: common.UInt16, // #42824
      GreenRegValueConfigFirst: common.UInt16, // #42837
      BlueRegValueConfigFirst: common.UInt16, // #42850
      VRedRegValueConfigFirst: common.UInt16, // #42863
      RedRegValueConfigSecond: common.UInt16, // #42876
      GreenRegValueConfigSecond: common.UInt16, // #42889
      BlueRegValueConfigSecond: common.UInt16, // #42902
      VRedRegValueConfigSecond: common.UInt16, // #42915
      LowGrayCompensate1En: common.Bool, // #42928
      LowGrayCompensate2En: common.Bool, // #42941
      FirstLineCompensation: FirstLineCompensationType, // #42954
      EliminationGhost: common.UInt8, // #42967
    }),
  ],
  'Chip5152ExtendPropertyBase'
);
/**
 * Codec for {@link Chip5152ExtendProperty}
 * @category Codecs
 * @see Automatically generated from ../decompiled/Nova.LCT.GigabitSystem.DataClass.decompiled.cs:42783
 */
export const Chip5152ExtendProperty = t.intersection(
  [Chip5152ExtendPropertyBase, t.partial({ '@_xsi:type': t.literal('Chip5152ExtendProperty') })],
  'Chip5152ExtendProperty'
);
export interface Chip5152ExtendProperty extends t.TypeOf<typeof Chip5152ExtendProperty> {
  FirstLineCompensation?: FirstLineCompensationTypeEnum;
}
