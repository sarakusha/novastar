import * as t from 'io-ts';
import * as common from '../lib/common';
import { CabinetStoreEffect, CabinetStoreEffectEnum } from './CabinetStoreEffect'; // import
import { NoSignalMode, NoSignalModeEnum } from './NoSignalMode'; // import
import { PictureShowMode, PictureShowModeEnum } from './PictureShowMode'; // import
/**
 * Codec for interface {@link PicturePrestoreConfig}
 * @category Codecs
 * @see Automatically generated from ../decompiled/Nova.GigabitController.ProgramInnerData.decompiled.cs:729
 */
export const PicturePrestoreConfig = t.intersection(
  [
    t.type({
      PictureName: common.string_empty, // #748
      StoreEffect: common.withDefault(CabinetStoreEffect, 'FullScreen'), // #760
      FullScreenShowMode: common.withDefault(PictureShowMode, 'Stretch'), // #772
      OneCabinetShowMode: common.withDefault(PictureShowMode, 'Stretch'), // #784
      IsUseStartPicture: common.Bool_false, // #796
      StartPictureTime: common.Int32_2, // #808
      OfflineMode: common.withDefault(NoSignalMode, 'BlackScreen'), // #820
      NoDviMode: common.withDefault(NoSignalMode, 'BlackScreen'),
    }),
    t.partial({}),
  ],
  'PicturePrestoreConfig'
);
export interface PicturePrestoreConfig extends t.TypeOf<typeof PicturePrestoreConfig> {
  StoreEffect: CabinetStoreEffectEnum;
  FullScreenShowMode: PictureShowModeEnum;
  OneCabinetShowMode: PictureShowModeEnum;
  OfflineMode: NoSignalModeEnum;
  NoDviMode: NoSignalModeEnum;
}
