import * as t from 'io-ts';
import * as common from '../lib/common';
/**
 * Codec for interface {@link DviResolutionInfo}
 * @category Codecs
 * @see Automatically generated from ../decompiled/Nova.GigabitController.ProgramInnerData.decompiled.cs:381
 */
export const DviResolutionInfo = t.intersection(
  [
    t.type({
      DviWidth: common.UInt16_1024, // #390
      DviHeight: common.UInt16_768, // #403
      DisplayString: common.string_empty,
    }),
    t.partial({}),
  ],
  'DviResolutionInfo'
);
export interface DviResolutionInfo extends t.TypeOf<typeof DviResolutionInfo> {}
