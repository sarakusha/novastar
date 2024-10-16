import * as t from 'io-ts';
import * as common from '../lib/common';
/**
 * Codec for interface {@link SenderRedundancyInfo}
 * @category Codecs
 * @see Automatically generated from ../decompiled/Nova.LCT.GigabitSystem.DataClass.decompiled.cs:70909
 */
export const SenderRedundancyInfo = t.partial(
  {
    MasterSenderIndex: common.UInt8, // #70920
    MasterPortIndex: common.UInt8, // #70932
    SlaveSenderIndex: common.UInt8, // #70944
    SlavePortIndex: common.UInt8, // #70956
  },
  'SenderRedundancyInfo'
);
export interface SenderRedundancyInfo extends t.TypeOf<typeof SenderRedundancyInfo> {}
