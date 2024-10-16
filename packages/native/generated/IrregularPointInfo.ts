import * as t from 'io-ts';
import * as common from '../lib/common';
/**
 * Codec for interface {@link IrregularPointInfo}
 * @category Codecs
 * @see Automatically generated from ../decompiled/Nova.LCT.GigabitSystem.DataClass.decompiled.cs:38001
 */
export const IrregularPointInfo = t.intersection(
  [
    t.type({
      CopyDG: common.withDefault(common.Int32, -1),
    }),
    t.partial({
      Scan: common.Int32, // #38003
      Pos: common.Int32, // #38005
      DG: common.Int32, // #38009
      PointX: common.Int32, // #38011
      PointY: common.Int32,
    }),
  ],
  'IrregularPointInfo'
);
export interface IrregularPointInfo extends t.TypeOf<typeof IrregularPointInfo> {}
