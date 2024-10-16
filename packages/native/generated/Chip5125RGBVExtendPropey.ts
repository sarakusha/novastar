import * as t from 'io-ts';
import * as common from '../lib/common';
import { ChipBaseExtendPropey } from './ChipBaseExtendPropey'; // import
import { ChipMBI525ExtendProperty } from './ChipMBI525ExtendProperty';
 // import
export const Chip5125RGBVExtendPropeyBase = t.intersection(
  [
    ChipBaseExtendPropey,
    t.type({
      OEPlusWidth: common.Int32_1, // #57761
      HardwareResetOne: common.Bool_true,
    }),
    t.partial({
      RedProperty: ChipMBI525ExtendProperty, // #57730
      GreenProperty: ChipMBI525ExtendProperty, // #57732
      BlueProperty: ChipMBI525ExtendProperty, // #57734
      VRedProperty: ChipMBI525ExtendProperty, // #57736
      IsAdvancedMode: common.Bool, // #57774
      HardwareResetTwo: common.Int32, // #57787
      SoftwareReset: common.Int32,
    }),
  ],
  'Chip5125RGBVExtendPropeyBase'
);
/**
 * Codec for {@link Chip5125RGBVExtendPropey}
 * @category Codecs
 * @see Automatically generated from ../decompiled/Nova.LCT.GigabitSystem.DataClass.decompiled.cs:57728
 */
export const Chip5125RGBVExtendPropey = t.intersection(
  [
    Chip5125RGBVExtendPropeyBase,
    t.partial({ '@_xsi:type': t.literal('Chip5125RGBVExtendPropey') }),
  ],
  'Chip5125RGBVExtendPropey'
);
export interface Chip5125RGBVExtendPropey extends t.TypeOf<typeof Chip5125RGBVExtendPropey> {
  RedProperty?: ChipMBI525ExtendProperty;
  GreenProperty?: ChipMBI525ExtendProperty;
  BlueProperty?: ChipMBI525ExtendProperty;
  VRedProperty?: ChipMBI525ExtendProperty;
}
