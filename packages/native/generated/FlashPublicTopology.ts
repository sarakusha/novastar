import * as t from 'io-ts';
import * as common from '../lib/common';
/**
 * Codec for interface {@link FlashPublicTopology}
 * @category Codecs
 * @see Automatically generated from ../decompiled/Nova.LCT.GigabitSystem.DataClass.decompiled.cs:66841
 */
export const FlashPublicTopology = t.partial(
  {
    FlashRows: common.Int32, // #66854
    FlashCols: common.Int32, // #66866
    TopoInfoValidL: common.UInt16, // #66878
    TopoInfoValidH: common.UInt16, // #66890
    BusNum: common.UInt16, // #66902
  },
  'FlashPublicTopology'
);
export interface FlashPublicTopology extends t.TypeOf<typeof FlashPublicTopology> {}
