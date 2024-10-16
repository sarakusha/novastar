import * as t from 'io-ts';
import * as common from '../lib/common';
import { RGBCIE } from './RGBCIE'; // import
import { RGBCIEType, RGBCIETypeEnum } from './RGBCIEType'; // import
/**
 * Codec for interface {@link AddColorRestoreInfo}
 * @category Codecs
 * @see Automatically generated from ../decompiled/Nova.LCT.GigabitSystem.DataClass.decompiled.cs:72411
 */
export const AddColorRestoreInfo = t.intersection(
  [
    t.type({
      TagetCIEType: common.withDefault(RGBCIEType, 'PAL'), // #72460
      ColorRestoreName: common.string_empty,
    }),
    t.partial({
      ColorTempertureValue: common.Int32, // #72436
      OriganalCIE: RGBCIE, // #72448
      TagetCIE: RGBCIE,
    }),
  ],
  'AddColorRestoreInfo'
);
export interface AddColorRestoreInfo extends t.TypeOf<typeof AddColorRestoreInfo> {
  TagetCIEType: RGBCIETypeEnum;
  OriganalCIE?: RGBCIE;
  TagetCIE?: RGBCIE;
}
