import * as t from 'io-ts';
import * as common from '../lib/common';
/**
 * Codec for interface {@link ClearViewInfo}
 * @category Codecs
 * @see Automatically generated from ../decompiled/Nova.Equipment.Protocol.TGProtocol.decompiled.cs:3431
 */
export const ClearViewInfo = t.partial(
  {
    Enable: common.Bool, // #3433
    MasterValue: common.Int32, // #3435
    SlaveValue: common.Int32, // #3437
  },
  'ClearViewInfo'
);
export interface ClearViewInfo extends t.TypeOf<typeof ClearViewInfo> {}
