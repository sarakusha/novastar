import * as t from 'io-ts';
import * as common from '../lib/common';
import { RedundantStateType } from './RedundantStateType'; // import
/**
 * Codec for interface {@link RedundantStateInfo}
 * @category Codecs
 * @see Automatically generated from ../decompiled/Nova.LCT.GigabitSystem.DataClass.decompiled.cs:76320
 */
export const RedundantStateInfo = t.intersection(
  [
    t.type({
      CommPort: common.string_empty,
    }),
    t.partial({
      SenderIndex: common.UInt8, // #76325
      PortCount: common.Int32, // #76327
      RedundantStateTypeList: t.record(common.Int32, RedundantStateType),
    }),
  ],
  'RedundantStateInfo'
);
export interface RedundantStateInfo extends t.TypeOf<typeof RedundantStateInfo> {}
