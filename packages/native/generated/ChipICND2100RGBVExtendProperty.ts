import * as t from 'io-ts';
import * as common from '../lib/common';
import { ChipBaseExtendPropey } from './ChipBaseExtendPropey'; // import
import { ChipICND2100ExtendProperty } from './ChipICND2100ExtendProperty';
 // import
export const ChipICND2100RGBVExtendPropertyBase = t.intersection(
  [
    ChipBaseExtendPropey,
    t.partial({
      RedProperty: ChipICND2100ExtendProperty, // #1362
      GreenProperty: ChipICND2100ExtendProperty, // #1364
      BlueProperty: ChipICND2100ExtendProperty, // #1366
      VRedProperty: ChipICND2100ExtendProperty, // #1368
      ChipLibVersion: common.UInt8, // #1420
      IsUseNewModule: common.Bool, // #1422
      ShifNum: common.Int32, // #1424
      IsSupportGhostClear: common.Bool, // #1514
      FirstDataLen: common.Int32, // #1601
      FirstStartIndex: common.Int32, // #1610
    }),
  ],
  'ChipICND2100RGBVExtendPropertyBase'
);
/**
 * Codec for {@link ChipICND2100RGBVExtendProperty}
 * @category Codecs
 * @see Automatically generated from ../decompiled/Nova.LCT.GigabitSystem.ChipICND2100.decompiled.cs:1351
 */
export const ChipICND2100RGBVExtendProperty = t.intersection(
  [
    ChipICND2100RGBVExtendPropertyBase,
    t.partial({ '@_xsi:type': t.literal('ChipICND2100RGBVExtendProperty') }),
  ],
  'ChipICND2100RGBVExtendProperty'
);
export interface ChipICND2100RGBVExtendProperty
  extends t.TypeOf<typeof ChipICND2100RGBVExtendProperty> {
  RedProperty?: ChipICND2100ExtendProperty;
  GreenProperty?: ChipICND2100ExtendProperty;
  BlueProperty?: ChipICND2100ExtendProperty;
  VRedProperty?: ChipICND2100ExtendProperty;
}
