import * as t from 'io-ts';
import * as common from '../lib/common';
import { ChipBaseExtendPropey } from './ChipBaseExtendPropey'; // import
import { ChipCS2017SExtendProperty } from './ChipCS2017SExtendProperty';
 // import
export const ChipCS2017SRGBVExtendPropertyBase = t.intersection(
  [
    ChipBaseExtendPropey,
    t.partial({
      RedProperty: ChipCS2017SExtendProperty, // #191
      GreenProperty: ChipCS2017SExtendProperty, // #193
      BlueProperty: ChipCS2017SExtendProperty, // #195
      VRedProperty: ChipCS2017SExtendProperty, // #197
      IsAdvancedMode: common.Bool, // #205
      IsUseNewModule: common.Bool, // #217
      ConfigDataLen: common.Int32, // #219
      FirstDataLen: common.Int32, // #221
      FirstStartIndex: common.Int32, // #223
      FirstRegisterAddr: common.Int32, // #225
    }),
  ],
  'ChipCS2017SRGBVExtendPropertyBase'
);
/**
 * Codec for {@link ChipCS2017SRGBVExtendProperty}
 * @category Codecs
 * @see Automatically generated from ../decompiled/Nova.LCT.GigabitSystem.ChipCS2017S.decompiled.cs:184
 */
export const ChipCS2017SRGBVExtendProperty = t.intersection(
  [
    ChipCS2017SRGBVExtendPropertyBase,
    t.partial({ '@_xsi:type': t.literal('ChipCS2017SRGBVExtendProperty') }),
  ],
  'ChipCS2017SRGBVExtendProperty'
);
export interface ChipCS2017SRGBVExtendProperty
  extends t.TypeOf<typeof ChipCS2017SRGBVExtendProperty> {
  RedProperty?: ChipCS2017SExtendProperty;
  GreenProperty?: ChipCS2017SExtendProperty;
  BlueProperty?: ChipCS2017SExtendProperty;
  VRedProperty?: ChipCS2017SExtendProperty;
}
