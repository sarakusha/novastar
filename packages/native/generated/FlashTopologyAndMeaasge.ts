import * as t from 'io-ts';
import * as common from '../lib/common';
/**
 * Codec for interface {@link FlashTopologyAndMeaasge}
 * @category Codecs
 * @see Automatically generated from ../decompiled/Nova.LCT.GigabitSystem.DataClass.decompiled.cs:67695
 */
export const FlashTopologyAndMeaasge = t.intersection(
  [
    t.type({
      ThisFlashExist: common.Bool_true,
    }),
    t.partial({
      SerialNumOfThisBus: common.Int32, // #67722
      FlashSerialNumOnThisBus: common.Int32, // #67746
      StartXOfThisFlash: common.Int32, // #67758
      StartYOfThisFlash: common.Int32, // #67770
      TotalFlashCascadedOnThisBus: common.Int32, // #67782
      PixelColsOfThisFlash: common.Int32, // #67794
      PixelRowsOfThisFlash: common.Int32, // #67806
      GroupNumInModule: common.Int32, // #67818
      GroupOrderInModule: common.Base64,
    }),
  ],
  'FlashTopologyAndMeaasge'
);
export interface FlashTopologyAndMeaasge extends t.TypeOf<typeof FlashTopologyAndMeaasge> {}
