import * as t from 'io-ts';
import * as common from '../lib/common';
/**
 * Codec for interface {@link CabinetCorrectLocationSize}
 * @category Codecs
 * @see Automatically generated from ../decompiled/Nova.LCT.GigabitSystem.DataClass.decompiled.cs:68544
 */
export const CabinetCorrectLocationSize = t.partial(
  {
    IsValid: common.Bool, // #68557
    StartCol: common.Int32, // #68569
    StartRow: common.Int32, // #68581
    Width: common.Int32, // #68593
    Height: common.Int32, // #68605
  },
  'CabinetCorrectLocationSize'
);
export interface CabinetCorrectLocationSize extends t.TypeOf<typeof CabinetCorrectLocationSize> {}
