import * as t from 'io-ts';
import * as common from '../lib/common';
import { Chip5051BExtendPropey } from './Chip5051BExtendPropey'; // import
/**
 * Codec for interface {@link Chip5051BRGBVExtendPropey}
 * @category Codecs
 * @see Automatically generated from ../decompiled/Nova.LCT.GigabitSystem.DataClass.decompiled.cs:43068
 */
export const Chip5051BRGBVExtendPropey = t.partial(
  {
    RedProperty: Chip5051BExtendPropey, // #43070
    GreenProperty: Chip5051BExtendPropey, // #43072
    BlueProperty: Chip5051BExtendPropey, // #43074
    VRedProperty: Chip5051BExtendPropey, // #43076
    RedRegValueConfigThird: common.UInt16, // #43088
    GreenRegValueConfigThird: common.UInt16, // #43101
    BlueRegValueConfigThird: common.UInt16, // #43114
    VRedRegValueConfigThird: common.UInt16, // #43127
    FailureLEDElimination: common.Bool, // #43140
  },
  'Chip5051BRGBVExtendPropey'
);
export interface Chip5051BRGBVExtendPropey extends t.TypeOf<typeof Chip5051BRGBVExtendPropey> {
  RedProperty?: Chip5051BExtendPropey;
  GreenProperty?: Chip5051BExtendPropey;
  BlueProperty?: Chip5051BExtendPropey;
  VRedProperty?: Chip5051BExtendPropey;
}
