import * as t from 'io-ts';
import * as common from '../lib/common';
/**
 * Codec for interface {@link DVISenderBoardPortConnectInfo}
 * @category Codecs
 * @see Automatically generated from ../decompiled/Nova.LCT.GigabitSystem.DataClass.decompiled.cs:68079
 */
export const DVISenderBoardPortConnectInfo = t.partial(
  {
    DVIPortIndex: common.UInt8, // #68082
    SenderBoardIndex: common.UInt8, // #68084
  },
  'DVISenderBoardPortConnectInfo'
);
export interface DVISenderBoardPortConnectInfo
  extends t.TypeOf<typeof DVISenderBoardPortConnectInfo> {}
