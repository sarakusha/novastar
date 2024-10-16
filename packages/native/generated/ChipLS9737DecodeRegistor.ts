import * as t from 'io-ts';
import * as common from '../lib/common';
/**
 * Codec for interface {@link ChipLS9737DecodeRegistor}
 * @category Codecs
 * @see Automatically generated from ../decompiled/Nova.LCT.GigabitSystem.DecodeChip_LS9737.decompiled.cs:764
 */
export const ChipLS9737DecodeRegistor = t.partial(
  {
    Registor_D0: common.UInt16, // #767
    Registor_D1: common.UInt16, // #769
    Registor_D2: common.UInt16, // #771
    Registor_D3: common.UInt16, // #773
  },
  'ChipLS9737DecodeRegistor'
);
export interface ChipLS9737DecodeRegistor extends t.TypeOf<typeof ChipLS9737DecodeRegistor> {}
