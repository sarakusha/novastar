import * as t from 'io-ts';
import * as common from '../lib/common';
import { ChipBaseExtendPropey } from './ChipBaseExtendPropey';
 // import
export const ChipUCS5603RGBVExtendPropertyBase = t.intersection(
  [
    ChipBaseExtendPropey,
    t.type({
      IsOpenChannelCheck: common.Bool_false,
    }),
    t.partial({
      RedFirstReg: common.UInt16, // #825
      GreenFirstReg: common.UInt16, // #827
      BlueFirstReg: common.UInt16, // #829
      VRedFirstReg: common.UInt16, // #833
      IsUseNewModule: common.Bool, // #845
      FirstDataLen: common.Int32, // #847
      FirstStartIndex: common.Int32, // #849
      FirstRegisterAddr: common.Int32, // #851
      SecondDataLen: common.Int32,
    }),
  ],
  'ChipUCS5603RGBVExtendPropertyBase'
);
/**
 * Codec for {@link ChipUCS5603RGBVExtendProperty}
 * @category Codecs
 * @see Automatically generated from ../decompiled/Nova.LCT.GigabitSystem.ChipUCS5603.decompiled.cs:812
 */
export const ChipUCS5603RGBVExtendProperty = t.intersection(
  [
    ChipUCS5603RGBVExtendPropertyBase,
    t.partial({ '@_xsi:type': t.literal('ChipUCS5603RGBVExtendProperty') }),
  ],
  'ChipUCS5603RGBVExtendProperty'
);
export interface ChipUCS5603RGBVExtendProperty
  extends t.TypeOf<typeof ChipUCS5603RGBVExtendProperty> {}
