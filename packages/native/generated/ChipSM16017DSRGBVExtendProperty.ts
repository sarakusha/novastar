import * as t from 'io-ts';
import * as common from '../lib/common';
import { ChipBaseExtendPropey } from './ChipBaseExtendPropey';
 // import
export const ChipSM16017DSRGBVExtendPropertyBase = t.intersection(
  [
    ChipBaseExtendPropey,
    t.partial({
      RedRegValue: common.UInt16, // #3437
      GreenRegValue: common.UInt16, // #3439
      BlueRegValue: common.UInt16, // #3441
      VRedRegValue: common.UInt16, // #3443
      IsUseNewModule: common.Bool, // #3445
      FirstDataLen: common.Int32, // #3447
      FirstStartIndex: common.Int32, // #3449
      FirstRegisterAddr: common.Int32, // #3451
    }),
  ],
  'ChipSM16017DSRGBVExtendPropertyBase'
);
/**
 * Codec for {@link ChipSM16017DSRGBVExtendProperty}
 * @category Codecs
 * @see Automatically generated from ../decompiled/Nova.LCT.GigabitSystem.ChipSM16017DS.decompiled.cs:3432
 */
export const ChipSM16017DSRGBVExtendProperty = t.intersection(
  [
    ChipSM16017DSRGBVExtendPropertyBase,
    t.partial({ '@_xsi:type': t.literal('ChipSM16017DSRGBVExtendProperty') }),
  ],
  'ChipSM16017DSRGBVExtendProperty'
);
export interface ChipSM16017DSRGBVExtendProperty
  extends t.TypeOf<typeof ChipSM16017DSRGBVExtendProperty> {}
