import * as t from 'io-ts';
import * as common from '../lib/common';
/**
 * Codec for interface {@link ModuleGroupInCabinet}
 * @category Codecs
 * @see Automatically generated from ../decompiled/Nova.LCT.GigabitSystem.DataClass.decompiled.cs:27527
 */
export const ModuleGroupInCabinet = t.intersection(
  [
    t.type({
      groupIndex: common.withDefault(common.Int32, -1), // #27532
      hubIndex: common.withDefault(common.Int32, -1),
    }),
    t.partial({
      connectIndex: common.UInt8,
    }),
  ],
  'ModuleGroupInCabinet'
);
export interface ModuleGroupInCabinet extends t.TypeOf<typeof ModuleGroupInCabinet> {}
