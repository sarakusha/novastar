import * as t from 'io-ts';
import * as common from '../lib/common';
import { ChipBaseExtendPropey } from './ChipBaseExtendPropey'; // import
import { ChipSM16259ExtendProperty } from './ChipSM16259ExtendProperty';
 // import
export const ChipSM16259RGBVExtendPropertyBase = t.intersection(
  [
    ChipBaseExtendPropey,
    t.partial({
      RedProperty: ChipSM16259ExtendProperty, // #404
      GreenProperty: ChipSM16259ExtendProperty, // #406
      BlueProperty: ChipSM16259ExtendProperty, // #408
      VRedProperty: ChipSM16259ExtendProperty, // #410
      IsUseNewModule: common.Bool, // #434
      ChipLibVersion: common.UInt8, // #436
      FirstDataLen: common.Int32, // #579
      FirstStartIndex: common.Int32, // #581
      FirstRegisterAddr: common.Int32, // #583
    }),
  ],
  'ChipSM16259RGBVExtendPropertyBase'
);
/**
 * Codec for {@link ChipSM16259RGBVExtendProperty}
 * @category Codecs
 * @see Automatically generated from ../decompiled/Nova.LCT.GigabitSystem.ChipSM16259.decompiled.cs:393
 */
export const ChipSM16259RGBVExtendProperty = t.intersection(
  [
    ChipSM16259RGBVExtendPropertyBase,
    t.partial({ '@_xsi:type': t.literal('ChipSM16259RGBVExtendProperty') }),
  ],
  'ChipSM16259RGBVExtendProperty'
);
export interface ChipSM16259RGBVExtendProperty
  extends t.TypeOf<typeof ChipSM16259RGBVExtendProperty> {
  RedProperty?: ChipSM16259ExtendProperty;
  GreenProperty?: ChipSM16259ExtendProperty;
  BlueProperty?: ChipSM16259ExtendProperty;
  VRedProperty?: ChipSM16259ExtendProperty;
}
