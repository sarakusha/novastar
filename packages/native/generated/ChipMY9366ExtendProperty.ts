import * as t from 'io-ts';
import * as common from '../lib/common';
import { ChipBaseExtendPropey } from './ChipBaseExtendPropey';
 // import
export const ChipMY9366ExtendPropertyBase = t.intersection(
  [
    ChipBaseExtendPropey,
    t.type({
      RIsClearGhost: common.Bool_true, // #63077
      GIsClearGhost: common.Bool_true, // #63090
      BIsClearGhost: common.Bool_true, // #63103
      VRIsClearGhost: common.Bool_true,
    }),
    t.partial({
      RFirstScancompensation: common.UInt8, // #62869
      GFirstScancompensation: common.UInt8, // #62882
      BFirstScancompensation: common.UInt8, // #62895
      VRFirstScancompensation: common.UInt8, // #62908
      RSmallAdjust: common.UInt8, // #62921
      GSmallAdjust: common.UInt8, // #62934
      BSmallAdjust: common.UInt8, // #62947
      VRSmallAdjust: common.UInt8, // #62960
      RCurrentCompensation: common.Bool, // #62973
      GCurrentCompensation: common.Bool, // #62986
      BCurrentCompensation: common.Bool, // #62999
      VRCurrentCompensation: common.Bool, // #63012
      RLowGrayValue: common.UInt8, // #63025
      GLowGrayValue: common.UInt8, // #63038
      BLowGrayValue: common.UInt8, // #63051
      VRLowGrayValue: common.UInt8,
    }),
  ],
  'ChipMY9366ExtendPropertyBase'
);
/**
 * Codec for {@link ChipMY9366ExtendProperty}
 * @category Codecs
 * @see Automatically generated from ../decompiled/Nova.LCT.GigabitSystem.DataClass.decompiled.cs:62827
 */
export const ChipMY9366ExtendProperty = t.intersection(
  [
    ChipMY9366ExtendPropertyBase,
    t.partial({ '@_xsi:type': t.literal('ChipMY9366ExtendProperty') }),
  ],
  'ChipMY9366ExtendProperty'
);
export interface ChipMY9366ExtendProperty extends t.TypeOf<typeof ChipMY9366ExtendProperty> {}
