import * as t from 'io-ts';
import * as common from '../lib/common';
/**
 * Codec for interface {@link ValueInfo}
 * @category Codecs
 * @see Automatically generated from ../decompiled/Nova.LCT.GigabitSystem.ProtocolEnum.decompiled.cs:2110
 */
export const ValueInfo = t.partial(
  {
    IsValid: common.Bool, // #2113
    Value: common.Numeric, // #2115
  },
  'ValueInfo'
);
export interface ValueInfo extends t.TypeOf<typeof ValueInfo> {}
