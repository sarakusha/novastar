import * as t from 'io-ts';
import * as common from '../lib/common';
import { ChipBaseExtendPropey } from './ChipBaseExtendPropey';
 // import
export const ChipSM16158ExtendPropertyBase = t.intersection(
  [
    ChipBaseExtendPropey,
    t.partial({
      IsAdvancedMode: common.Bool, // #59815
      RLowAshImprovement: common.UInt8, // #59828
      GLowAshImprovement: common.UInt8, // #59841
      BLowAshImprovement: common.UInt8, // #59854
      OpenDetection: common.Bool, // #59867
      REnableOpenInspection: common.Bool, // #59880
      GEnableOpenInspection: common.Bool, // #59893
      BEnableOpenInspection: common.Bool, // #59906
      RLowAshPitsImprove: common.UInt8, // #59919
      GLowAshPitsImprove: common.UInt8, // #59932
      BLowAshPitsImprove: common.UInt8, // #59945
      RDimInterval: common.UInt8, // #59958
      GDimInterval: common.UInt8, // #59971
      BDimInterval: common.UInt8, // #59984
      RDimCompensation: common.UInt8, // #59997
      GDimCompensation: common.UInt8, // #60010
      BDimCompensation: common.UInt8, // #60023
      RedRegValueConfigFirst: common.UInt16, // #60036
      GreenRegValueConfigFirst: common.UInt16, // #60049
      BlueRegValueConfigFirst: common.UInt16, // #60062
      VRedRegValueConfigFirst: common.UInt16, // #60075
      RedRegValueConfigSecond: common.UInt16, // #60088
      GreenRegValueConfigSecond: common.UInt16, // #60101
      BlueRegValueConfigSecond: common.UInt16, // #60114
      VRedRegValueConfigSecond: common.UInt16, // #60127
    }),
  ],
  'ChipSM16158ExtendPropertyBase'
);
/**
 * Codec for {@link ChipSM16158ExtendProperty}
 * @category Codecs
 * @see Automatically generated from ../decompiled/Nova.LCT.GigabitSystem.DataClass.decompiled.cs:59763
 */
export const ChipSM16158ExtendProperty = t.intersection(
  [
    ChipSM16158ExtendPropertyBase,
    t.partial({ '@_xsi:type': t.literal('ChipSM16158ExtendProperty') }),
  ],
  'ChipSM16158ExtendProperty'
);
export interface ChipSM16158ExtendProperty extends t.TypeOf<typeof ChipSM16158ExtendProperty> {}
