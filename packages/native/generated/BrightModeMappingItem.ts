import * as t from 'io-ts';
import * as common from '../lib/common';
import { ChipType, ChipTypeEnum } from './ChipType'; // import
/**
 * Codec for interface {@link BrightModeMappingItem}
 * @category Codecs
 * @see Automatically generated from ../decompiled/Nova.LCT.GigabitSystem.DataClass.decompiled.cs:74409
 */
export const BrightModeMappingItem = t.partial(
  {
    DriverChipType: ChipType, // #74412
    FileName: t.string, // #74414
    BrightPercent: common.Numeric, // #74416
    BrightName: t.string, // #74418
    RedGain: common.Int32, // #74420
    GreenGain: common.Int32, // #74422
    BlueGain: common.Int32, // #74424
    VRedGain: common.Int32, // #74426
    RedGainPercent: common.Numeric, // #74428
    GreenGainPercent: common.Numeric, // #74430
    BlueGainPercent: common.Numeric, // #74432
    VRedGainPercent: common.Numeric, // #74434
    GrayDepth: common.Int32, // #74436
  },
  'BrightModeMappingItem'
);
export interface BrightModeMappingItem extends t.TypeOf<typeof BrightModeMappingItem> {
  DriverChipType?: ChipTypeEnum;
}
