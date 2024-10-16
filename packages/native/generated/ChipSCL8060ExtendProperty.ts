import * as t from 'io-ts';
import * as common from '../lib/common';
import { ChipBaseExtendPropey } from './ChipBaseExtendPropey';
 // import
export const ChipSCL8060ExtendPropertyBase = t.intersection(
  [
    ChipBaseExtendPropey,
    t.type({
      EnLEDOpenShortDet: common.UInt8_3, // #60814
      LongWaitB: common.Bool_true,
    }),
    t.partial({
      RedDtVoltage: common.Bool, // #60658
      GreenDtVoltage: common.Bool, // #60671
      BlueDtVoltage: common.Bool, // #60684
      AnodeSideFastCharge: common.UInt8, // #60697
      DeadTimeGCLKVsync: common.UInt8, // #60723
      SLowFrame: common.Bool, // #60736
      OutPutCurRange: common.Bool, // #60749
      F50_25Hz: common.Bool, // #60762
      Dtbig: common.Bool, // #60775
      GclkSkewValue: common.UInt8, // #60788
      EnLEDShortProtect: common.Bool, // #60801
      GclkE1A0A2Source: common.Bool, // #60827
      EnOverTemprDect: common.Bool, // #60840
      GrayScaleMode: common.Bool,
    }),
  ],
  'ChipSCL8060ExtendPropertyBase'
);
/**
 * Codec for {@link ChipSCL8060ExtendProperty}
 * @category Codecs
 * @see Automatically generated from ../decompiled/Nova.LCT.GigabitSystem.DataClass.decompiled.cs:60624
 */
export const ChipSCL8060ExtendProperty = t.intersection(
  [
    ChipSCL8060ExtendPropertyBase,
    t.partial({ '@_xsi:type': t.literal('ChipSCL8060ExtendProperty') }),
  ],
  'ChipSCL8060ExtendProperty'
);
export interface ChipSCL8060ExtendProperty extends t.TypeOf<typeof ChipSCL8060ExtendProperty> {}
