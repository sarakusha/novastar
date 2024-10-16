import * as t from 'io-ts';
import * as common from '../lib/common';
import { ChipBaseExtendPropey } from './ChipBaseExtendPropey';
 // import
export const ChipSUM2017TExtendPropertyBase = t.intersection(
  [
    ChipBaseExtendPropey,
    t.partial({
      IsAdvancedMode: common.Bool, // #64573
      RSetVanishingCompensation: common.UInt8, // #64586
      GSetVanishingCompensation: common.UInt8, // #64599
      BSetVanishingCompensation: common.UInt8, // #64612
      RSetVanishing: common.UInt8, // #64625
      GSetVanishing: common.UInt8, // #64638
      BSetVanishing: common.UInt8, // #64651
      RConstantSettings: common.UInt8, // #64664
      GConstantSettings: common.UInt8, // #64677
      BConstantSettings: common.UInt8, // #64690
      RedRegValueConfigFirst: common.UInt16, // #64703
      GreenRegValueConfigFirst: common.UInt16, // #64716
      BlueRegValueConfigFirst: common.UInt16, // #64729
      VRedRegValueConfigFirst: common.UInt16, // #64742
    }),
  ],
  'ChipSUM2017TExtendPropertyBase'
);
/**
 * Codec for {@link ChipSUM2017TExtendProperty}
 * @category Codecs
 * @see Automatically generated from ../decompiled/Nova.LCT.GigabitSystem.DataClass.decompiled.cs:64543
 */
export const ChipSUM2017TExtendProperty = t.intersection(
  [
    ChipSUM2017TExtendPropertyBase,
    t.partial({ '@_xsi:type': t.literal('ChipSUM2017TExtendProperty') }),
  ],
  'ChipSUM2017TExtendProperty'
);
export interface ChipSUM2017TExtendProperty extends t.TypeOf<typeof ChipSUM2017TExtendProperty> {}
