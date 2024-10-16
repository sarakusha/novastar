import * as t from 'io-ts';
import * as common from '../lib/common';
/**
 * Codec for interface {@link IrregularDataGroupDriverChipNumPair}
 * @category Codecs
 * @see Automatically generated from ../decompiled/Nova.LCT.GigabitSystem.DataClass.decompiled.cs:37973
 */
export const IrregularDataGroupDriverChipNumPair = t.partial(
  {
    DataGroup: common.Int32, // #37975
    DriverChipNum: common.Int32, // #37977
  },
  'IrregularDataGroupDriverChipNumPair'
);
export interface IrregularDataGroupDriverChipNumPair
  extends t.TypeOf<typeof IrregularDataGroupDriverChipNumPair> {}
