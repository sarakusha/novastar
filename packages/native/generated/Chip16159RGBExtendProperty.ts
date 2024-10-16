import * as t from 'io-ts';
import * as common from '../lib/common';
import { Chip16159ExtendProperty } from './Chip16159ExtendProperty'; // import
/**
 * Codec for interface {@link Chip16159RGBExtendProperty}
 * @category Codecs
 * @see Automatically generated from ../decompiled/Nova.LCT.GigabitSystem.DataClass.decompiled.cs:63696
 */
export const Chip16159RGBExtendProperty = t.intersection(
  [
    t.type({
      RedRegValueConfigFirst: common.UInt16_32569, // #63760
      GreenRegValueConfigFirst: common.UInt16_32569, // #63773
      BlueRegValueConfigFirst: common.UInt16_32569, // #63786
      VRedRegValueConfigFirst: common.UInt16_32569, // #63799
      RedRegValueConfigSecond: common.UInt16_62465, // #63812
      GreenRegValueConfigSecond: common.UInt16_58369, // #63825
      BlueRegValueConfigSecond: common.UInt16_58369, // #63838
      VRedRegValueConfigSecond: common.UInt16_62465, // #63851
      RedRegValueConfigThird: common.UInt16_30976, // #63864
      GreenRegValueConfigThird: common.UInt16_30976, // #63877
      BlueRegValueConfigThird: common.UInt16_30976, // #63890
      VRedRegValueConfigThird: common.UInt16_30976,
    }),
    t.partial({
      RedProperty: Chip16159ExtendProperty, // #63698
      GreenProperty: Chip16159ExtendProperty, // #63700
      BlueProperty: Chip16159ExtendProperty, // #63702
      VRedProperty: Chip16159ExtendProperty, // #63704
      IsOpenTest: common.Bool, // #63734
      OpenTestGrade: common.UInt8,
    }),
  ],
  'Chip16159RGBExtendProperty'
);
export interface Chip16159RGBExtendProperty extends t.TypeOf<typeof Chip16159RGBExtendProperty> {
  RedProperty?: Chip16159ExtendProperty;
  GreenProperty?: Chip16159ExtendProperty;
  BlueProperty?: Chip16159ExtendProperty;
  VRedProperty?: Chip16159ExtendProperty;
}
