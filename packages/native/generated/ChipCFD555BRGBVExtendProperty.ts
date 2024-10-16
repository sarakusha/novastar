import * as t from 'io-ts';
import * as common from '../lib/common';
import { ChipBaseExtendPropey } from './ChipBaseExtendPropey'; // import
import { ChipCFD555BExtendProperty } from './ChipCFD555BExtendProperty';
 // import
export const ChipCFD555BRGBVExtendPropertyBase = t.intersection(
  [
    ChipBaseExtendPropey,
    t.partial({
      RedProperty: ChipCFD555BExtendProperty, // #3923
      GreenProperty: ChipCFD555BExtendProperty, // #3925
      BlueProperty: ChipCFD555BExtendProperty, // #3927
      VRedProperty: ChipCFD555BExtendProperty, // #3929
      SubField: common.UInt8, // #3966
      GrayDepth: common.UInt8, // #3984
      IsAdvancedMode: common.Bool, // #4006
      IsUseNewModule: common.Bool, // #4018
      PLLFreqDivision: common.UInt8, // #4020
      PLLFreqDoubling: common.UInt8, // #4032
      SpecialDataLen: common.Int32, // #4115
      SpecialRegisterAddr: common.UInt32, // #4117
    }),
  ],
  'ChipCFD555BRGBVExtendPropertyBase'
);
/**
 * Codec for {@link ChipCFD555BRGBVExtendProperty}
 * @category Codecs
 * @see Automatically generated from ../decompiled/Nova.LCT.GigabitSystem.ChipCFD555B.decompiled.cs:3918
 */
export const ChipCFD555BRGBVExtendProperty = t.intersection(
  [
    ChipCFD555BRGBVExtendPropertyBase,
    t.partial({ '@_xsi:type': t.literal('ChipCFD555BRGBVExtendProperty') }),
  ],
  'ChipCFD555BRGBVExtendProperty'
);
export interface ChipCFD555BRGBVExtendProperty
  extends t.TypeOf<typeof ChipCFD555BRGBVExtendProperty> {
  RedProperty?: ChipCFD555BExtendProperty;
  GreenProperty?: ChipCFD555BExtendProperty;
  BlueProperty?: ChipCFD555BExtendProperty;
  VRedProperty?: ChipCFD555BExtendProperty;
}
