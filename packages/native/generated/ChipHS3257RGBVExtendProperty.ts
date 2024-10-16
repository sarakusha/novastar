import * as t from 'io-ts';
import * as common from '../lib/common';
import { ChipBaseExtendPropey } from './ChipBaseExtendPropey'; // import
import { ChipHS3257ExtendProperty } from './ChipHS3257ExtendProperty';
 // import
export const ChipHS3257RGBVExtendPropertyBase = t.intersection(
  [
    ChipBaseExtendPropey,
    t.type({
      ModeSelect: common.UInt8_0,
    }),
    t.partial({
      RedProperty: ChipHS3257ExtendProperty, // #991
      GreenProperty: ChipHS3257ExtendProperty, // #993
      BlueProperty: ChipHS3257ExtendProperty, // #995
      VRedProperty: ChipHS3257ExtendProperty, // #997
      IsUseNewModule: common.Bool, // #1005
      ChipLibVersion: common.UInt8, // #1118
      IsAdvancedMode: common.Bool, // #1130
      ThirdDataLen: common.Int32, // #1231
      ThirdDataStartIndex: common.Int32, // #1233
      ThirdRegisterAddr: common.Int32, // #1235
      FourthDataLen: common.Int32, // #1237
      FourthStartIndex: common.Int32, // #1239
      FourthRegisterAddr: common.Int32,
    }),
  ],
  'ChipHS3257RGBVExtendPropertyBase'
);
/**
 * Codec for {@link ChipHS3257RGBVExtendProperty}
 * @category Codecs
 * @see Automatically generated from ../decompiled/Nova.LCT.GigabitSystem.ChipHS3257.decompiled.cs:984
 */
export const ChipHS3257RGBVExtendProperty = t.intersection(
  [
    ChipHS3257RGBVExtendPropertyBase,
    t.partial({ '@_xsi:type': t.literal('ChipHS3257RGBVExtendProperty') }),
  ],
  'ChipHS3257RGBVExtendProperty'
);
export interface ChipHS3257RGBVExtendProperty
  extends t.TypeOf<typeof ChipHS3257RGBVExtendProperty> {
  RedProperty?: ChipHS3257ExtendProperty;
  GreenProperty?: ChipHS3257ExtendProperty;
  BlueProperty?: ChipHS3257ExtendProperty;
  VRedProperty?: ChipHS3257ExtendProperty;
}
