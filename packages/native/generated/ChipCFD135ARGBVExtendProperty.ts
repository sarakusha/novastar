import * as t from 'io-ts';
import * as common from '../lib/common';
import { ChipBaseExtendPropey } from './ChipBaseExtendPropey'; // import
import { ChipCFD135AExtendProperty } from './ChipCFD135AExtendProperty';
 // import
export const ChipCFD135ARGBVExtendPropertyBase = t.intersection(
  [
    ChipBaseExtendPropey,
    t.partial({
      RedProperty: ChipCFD135AExtendProperty, // #2341
      GreenProperty: ChipCFD135AExtendProperty, // #2343
      BlueProperty: ChipCFD135AExtendProperty, // #2345
      VRedProperty: ChipCFD135AExtendProperty, // #2347
      IsAdvancedMode: common.Bool, // #2351
      IsUseNewModule: common.Bool, // #2363
      ChipLibVersion: common.UInt8, // #2365
      FirstDataLen: common.Int32, // #2367
      FirstStartIndex: common.Int32, // #2369
      FirstRegisterAddr: common.Int32, // #2371
    }),
  ],
  'ChipCFD135ARGBVExtendPropertyBase'
);
/**
 * Codec for {@link ChipCFD135ARGBVExtendProperty}
 * @category Codecs
 * @see Automatically generated from ../decompiled/Nova.LCT.GigabitSystem.ChipCFD135A.decompiled.cs:2336
 */
export const ChipCFD135ARGBVExtendProperty = t.intersection(
  [
    ChipCFD135ARGBVExtendPropertyBase,
    t.partial({ '@_xsi:type': t.literal('ChipCFD135ARGBVExtendProperty') }),
  ],
  'ChipCFD135ARGBVExtendProperty'
);
export interface ChipCFD135ARGBVExtendProperty
  extends t.TypeOf<typeof ChipCFD135ARGBVExtendProperty> {
  RedProperty?: ChipCFD135AExtendProperty;
  GreenProperty?: ChipCFD135AExtendProperty;
  BlueProperty?: ChipCFD135AExtendProperty;
  VRedProperty?: ChipCFD135AExtendProperty;
}
