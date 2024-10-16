import * as t from 'io-ts';
import * as common from '../lib/common';
import { ChipBaseExtendPropey } from './ChipBaseExtendPropey'; // import
import { DriverCurrentSpeedType, DriverCurrentSpeedTypeEnum } from './DriverCurrentSpeedType';
 // import
export const ChipMY9221ExtendPropertyBase = t.intersection(
  [
    ChipBaseExtendPropey,
    t.type({
      DriverSpeed: common.withDefault(DriverCurrentSpeedType, 'Fast'), // #58171
      IsCurrentBreakUp: common.Bool_true, // #58183
      IsInternalOscillator: common.Bool_true, // #58195
      IsDriverLED: common.Bool_true, // #58207
      IsAutoRefreshPicture: common.Bool_true, // #58219
      IsPictrueRepeat: common.Bool_true,
    }),
    t.partial({}),
  ],
  'ChipMY9221ExtendPropertyBase'
);
/**
 * Codec for {@link ChipMY9221ExtendProperty}
 * @category Codecs
 * @see Automatically generated from ../decompiled/Nova.LCT.GigabitSystem.DataClass.decompiled.cs:58157
 */
export const ChipMY9221ExtendProperty = t.intersection(
  [
    ChipMY9221ExtendPropertyBase,
    t.partial({ '@_xsi:type': t.literal('ChipMY9221ExtendProperty') }),
  ],
  'ChipMY9221ExtendProperty'
);
export interface ChipMY9221ExtendProperty extends t.TypeOf<typeof ChipMY9221ExtendProperty> {
  DriverSpeed: DriverCurrentSpeedTypeEnum;
}
