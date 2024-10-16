import * as t from 'io-ts';
import * as common from '../lib/common';
import { DecodeType, DecodeTypeEnum } from './DecodeType'; // import
/**
 * Codec for interface {@link DecodeChipParamBase}
 * @category Codecs
 * @see Automatically generated from ../decompiled/Nova.LCT.GigabitSystem.DataClass.decompiled.cs:31726
 */
export const DecodeChipParamBase = t.partial(
  {
    DecodeChipType: DecodeType, // #31749
    IsNewDecodeType: common.Bool, // #31751
    BlankUnitNumPerScan: common.Int32, // #31753
    RowChangePoint: common.Int32, // #31755
    CtrEndPoint: common.Int32, // #31757
  },
  'DecodeChipParamBase'
);
export interface DecodeChipParamBase extends t.TypeOf<typeof DecodeChipParamBase> {
  DecodeChipType?: DecodeTypeEnum;
}
