import * as t from 'io-ts';
import * as common from '../lib/common';
/**
 * Codec for interface {@link ChipLS9735DecodeRegistor}
 * @category Codecs
 * @see Automatically generated from ../decompiled/Nova.LCT.GigabitSystem.DecodeChip_LS9735.decompiled.cs:643
 */
export const ChipLS9735DecodeRegistor = t.partial(
  {
    Registor_D0: common.UInt16, // #646
    Registor_D1: common.UInt16, // #648
    Registor_D2: common.UInt16, // #650
    Registor_D3: common.UInt16, // #652
  },
  'ChipLS9735DecodeRegistor'
);
export interface ChipLS9735DecodeRegistor extends t.TypeOf<typeof ChipLS9735DecodeRegistor> {}
