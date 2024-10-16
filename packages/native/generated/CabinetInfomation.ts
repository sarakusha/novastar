import * as t from 'io-ts';
import * as common from '../lib/common';
/**
 * Codec for interface {@link CabinetInfomation}
 * @category Codecs
 * @see Automatically generated from ../decompiled/Nova.LCT.GigabitSystem.DataClass.decompiled.cs:38373
 */
export const CabinetInfomation = t.partial(
  {
    Weight: common.Numeric, // #38376
    Power: common.Numeric, // #38378
    Voltage: common.Numeric, // #38380
    Width: common.Numeric, // #38382
    Height: common.Numeric, // #38384
    PixelWidth: common.Int32, // #38386
    PixelHeight: common.Int32, // #38388
  },
  'CabinetInfomation'
);
export interface CabinetInfomation extends t.TypeOf<typeof CabinetInfomation> {}
