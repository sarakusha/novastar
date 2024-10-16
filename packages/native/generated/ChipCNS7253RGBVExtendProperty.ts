import * as t from 'io-ts';
import * as common from '../lib/common';
import { ChipBaseExtendPropey } from './ChipBaseExtendPropey'; // import
import { ChipCNS7253ExtendProperty } from './ChipCNS7253ExtendProperty';
 // import
export const ChipCNS7253RGBVExtendPropertyBase = t.intersection(
  [
    ChipBaseExtendPropey,
    t.type({
      IsAdvancedMode: common.Bool_true,
    }),
    t.partial({
      CNS7253_R: ChipCNS7253ExtendProperty, // #334
      CNS7253_G: ChipCNS7253ExtendProperty, // #336
      CNS7253_B: ChipCNS7253ExtendProperty, // #338
      CNS7253_V: ChipCNS7253ExtendProperty, // #340
      IsUseNewModule: common.Bool, // #367
      IsStarSwipPoint: common.Bool, // #370
      FirstDataLen: common.Int32, // #384
      FirstStartIndex: common.Int32, // #386
      FirstRegisterAddr: common.Int32, // #388
      SecondDataLen: common.Int32, // #390
      SecondStartIndex: common.Int32, // #392
      SecondRegisterAddr: common.Int32, // #394
      ThirdDataLen: common.Int32, // #396
      ThirdDataStartIndex: common.Int32, // #398
      ThirdRegisterAddr: common.Int32, // #400
      FourthDataLen: common.Int32, // #402
      FourthStartIndex: common.Int32, // #404
      FourthRegisterAddr: common.Int32,
    }),
  ],
  'ChipCNS7253RGBVExtendPropertyBase'
);
/**
 * Codec for {@link ChipCNS7253RGBVExtendProperty}
 * @category Codecs
 * @see Automatically generated from ../decompiled/Nova.LCT.GigabitSystem.ChipCNS7253.decompiled.cs:327
 */
export const ChipCNS7253RGBVExtendProperty = t.intersection(
  [
    ChipCNS7253RGBVExtendPropertyBase,
    t.partial({ '@_xsi:type': t.literal('ChipCNS7253RGBVExtendProperty') }),
  ],
  'ChipCNS7253RGBVExtendProperty'
);
export interface ChipCNS7253RGBVExtendProperty
  extends t.TypeOf<typeof ChipCNS7253RGBVExtendProperty> {
  CNS7253_R?: ChipCNS7253ExtendProperty;
  CNS7253_G?: ChipCNS7253ExtendProperty;
  CNS7253_B?: ChipCNS7253ExtendProperty;
  CNS7253_V?: ChipCNS7253ExtendProperty;
}
