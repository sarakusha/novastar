import * as t from 'io-ts';
import * as common from '../lib/common';
import { ChipBaseExtendPropey } from './ChipBaseExtendPropey'; // import
import { ChipCFD555AExtendProperty } from './ChipCFD555AExtendProperty';
 // import
export const ChipCFD555ARGBVExtendPropertyBase = t.intersection(
  [
    ChipBaseExtendPropey,
    t.partial({
      RedProperty: ChipCFD555AExtendProperty, // #4925
      GreenProperty: ChipCFD555AExtendProperty, // #4927
      BlueProperty: ChipCFD555AExtendProperty, // #4929
      VRedProperty: ChipCFD555AExtendProperty, // #4931
      SubField: common.UInt8, // #4956
      GrayDepth: common.UInt8, // #4977
      IsAdvancedMode: common.Bool, // #5001
      IsUseNewModule: common.Bool, // #5013
      PLLFreqDivision: common.UInt8, // #5015
      PLLFreqDoubling: common.UInt8, // #5029
      SpecialDataLen: common.Int32, // #5114
      SpecialRegisterAddr: common.UInt32, // #5116
    }),
  ],
  'ChipCFD555ARGBVExtendPropertyBase'
);
/**
 * Codec for {@link ChipCFD555ARGBVExtendProperty}
 * @category Codecs
 * @see Automatically generated from ../decompiled/Nova.LCT.GigabitSystem.ChipCFD555A.decompiled.cs:4918
 */
export const ChipCFD555ARGBVExtendProperty = t.intersection(
  [
    ChipCFD555ARGBVExtendPropertyBase,
    t.partial({ '@_xsi:type': t.literal('ChipCFD555ARGBVExtendProperty') }),
  ],
  'ChipCFD555ARGBVExtendProperty'
);
export interface ChipCFD555ARGBVExtendProperty
  extends t.TypeOf<typeof ChipCFD555ARGBVExtendProperty> {
  RedProperty?: ChipCFD555AExtendProperty;
  GreenProperty?: ChipCFD555AExtendProperty;
  BlueProperty?: ChipCFD555AExtendProperty;
  VRedProperty?: ChipCFD555AExtendProperty;
}
