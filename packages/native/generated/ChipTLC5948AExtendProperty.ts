import * as t from 'io-ts';
import * as common from '../lib/common';
import { ChipBaseExtendPropey } from './ChipBaseExtendPropey';
 // import
export const ChipTLC5948AExtendPropertyBase = t.intersection(
  [
    ChipBaseExtendPropey,
    t.type({
      RepeatDisplayMode: common.Bool_true, // #58422
      PWMDisplayMode: common.Int32_1,
    }),
    t.partial({
      IsAdvancedMode: common.Bool, // #58435
      OpenCheckVoltageRed: common.Int32, // #58448
      OpenCheckVoltageGreen: common.Int32, // #58461
      OpenCheckVoltageBlue: common.Int32, // #58474
      ShortCheckVoltageRed: common.Int32, // #58487
      ShortCheckVoltageGreen: common.Int32, // #58500
      ShortCheckVoltageBlue: common.Int32, // #58513
      HiddenCheck: common.Int32, // #58526
      CheckLostGain: common.Int32, // #58539
      GlobalBrightRed: common.Int32, // #58552
      GlobalBrightGreen: common.Int32, // #58565
      GlobalBrightBlue: common.Int32, // #58578
      RedRegValueConfigFirst: common.UInt16, // #58591
      GreenRegValueConfigFirst: common.UInt16, // #58604
      BlueRegValueConfigFirst: common.UInt16, // #58617
      VRedRegValueConfigFirst: common.UInt16, // #58630
      RedRegValueConfigSecond: common.UInt16, // #58643
      GreenRegValueConfigSecond: common.UInt16, // #58656
      BlueRegValueConfigSecond: common.UInt16, // #58669
      VRedRegValueConfigSecond: common.UInt16,
    }),
  ],
  'ChipTLC5948AExtendPropertyBase'
);
/**
 * Codec for {@link ChipTLC5948AExtendProperty}
 * @category Codecs
 * @see Automatically generated from ../decompiled/Nova.LCT.GigabitSystem.DataClass.decompiled.cs:58363
 */
export const ChipTLC5948AExtendProperty = t.intersection(
  [
    ChipTLC5948AExtendPropertyBase,
    t.partial({ '@_xsi:type': t.literal('ChipTLC5948AExtendProperty') }),
  ],
  'ChipTLC5948AExtendProperty'
);
export interface ChipTLC5948AExtendProperty extends t.TypeOf<typeof ChipTLC5948AExtendProperty> {}
