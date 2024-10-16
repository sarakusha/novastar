import * as t from 'io-ts';
import * as common from '../lib/common';
import { ChipBaseExtendPropey } from './ChipBaseExtendPropey'; // import
import { ChipCFD855AExtendProperty } from './ChipCFD855AExtendProperty'; // import
import { PointDetectParameter } from './PointDetectParameter';
 // import
export const ChipCFD855ARGBVExtendPropertyBase = t.intersection(
  [
    ChipBaseExtendPropey,
    t.partial({
      RedProperty: ChipCFD855AExtendProperty, // #3589
      GreenProperty: ChipCFD855AExtendProperty, // #3591
      BlueProperty: ChipCFD855AExtendProperty, // #3593
      VRedProperty: ChipCFD855AExtendProperty, // #3595
      SubField: common.UInt8, // #3616
      GrayDepth: common.UInt8, // #3628
      IsAdvancedMode: common.Bool, // #3669
      IsUseNewModule: common.Bool, // #3681
      SpecialDataLen: common.Int32, // #3744
      SpecialRegisterAddr: common.UInt32, // #3746
      PointDetectParameter, // #3748
    }),
  ],
  'ChipCFD855ARGBVExtendPropertyBase'
);
/**
 * Codec for {@link ChipCFD855ARGBVExtendProperty}
 * @category Codecs
 * @see Automatically generated from ../decompiled/Nova.LCT.GigabitSystem.ChipCFD855A.decompiled.cs:3584
 */
export const ChipCFD855ARGBVExtendProperty = t.intersection(
  [
    ChipCFD855ARGBVExtendPropertyBase,
    t.partial({ '@_xsi:type': t.literal('ChipCFD855ARGBVExtendProperty') }),
  ],
  'ChipCFD855ARGBVExtendProperty'
);
export interface ChipCFD855ARGBVExtendProperty
  extends t.TypeOf<typeof ChipCFD855ARGBVExtendProperty> {
  RedProperty?: ChipCFD855AExtendProperty;
  GreenProperty?: ChipCFD855AExtendProperty;
  BlueProperty?: ChipCFD855AExtendProperty;
  VRedProperty?: ChipCFD855AExtendProperty;
  PointDetectParameter?: PointDetectParameter;
}
