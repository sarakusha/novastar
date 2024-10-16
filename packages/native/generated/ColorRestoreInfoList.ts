import * as t from 'io-ts';
import * as common from '../lib/common';
import { AddColorRestoreInfo } from './AddColorRestoreInfo'; // import
/**
 * Codec for interface {@link ColorRestoreInfoList}
 * @category Codecs
 * @see Automatically generated from ../decompiled/Nova.LCT.GigabitSystem.DataClass.decompiled.cs:72542
 */
export const ColorRestoreInfoList = t.intersection(
  [
    t.type({
      SelectedPortName: common.string_empty, // #72563
      AddColorRestoreInfo: common.XMLArray(AddColorRestoreInfo, 'AddColorRestoreInfo'),
    }),
    t.partial({
      ScreenIndex: common.Int32,
    }),
  ],
  'ColorRestoreInfoList'
);
export interface ColorRestoreInfoList extends t.TypeOf<typeof ColorRestoreInfoList> {}
