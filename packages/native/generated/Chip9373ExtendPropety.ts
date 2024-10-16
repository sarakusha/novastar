import * as t from 'io-ts';
import * as common from '../lib/common';
import { ChipBaseExtendPropey } from './ChipBaseExtendPropey';
 // import
export const Chip9373ExtendPropetyBase = t.intersection(
  [
    ChipBaseExtendPropey,
    t.type({
      BFirstScancompensation: common.UInt8_2, // #43447
      BlueVanishingRating: common.UInt8_1, // #43460
      CrossEn: common.Bool_true, // #43525
      GCurrentCompensationThird: common.UInt8_1, // #43538
      GFirstScancompensation: common.UInt8_1, // #43564
      GrayDepth: common.UInt8_2, // #43577
      GreenVanishingRating: common.UInt8_2, // #43668
      RCurrentCompensationThird: common.UInt8_2, // #43681
      RedVanishingRating: common.UInt8_3, // #43746
      VRCurrentCompensationThird: common.UInt8_2, // #43759
      VRedVanishingRating: common.UInt8_3,
    }),
    t.partial({
      BCompensationMode: common.UInt8, // #43382
      BCurrentCompensationFirst: common.UInt8, // #43395
      BCurrentCompensationSec: common.UInt8, // #43408
      BCurrentCompensationThird: common.UInt8, // #43434
      BLowGrayValue: common.UInt8, // #43473
      GclkMutiRate: common.Bool, // #43486
      GCompensationMode: common.UInt8, // #43499
      GCurrentCompensationFirst: common.UInt8, // #43512
      GCurrentCompensationSec: common.UInt8, // #43551
      GLowGrayValue: common.UInt8, // #43590
      RCompensationMode: common.UInt8, // #43603
      RCurrentCompensationFirst: common.UInt8, // #43616
      RCurrentCompensationSec: common.UInt8, // #43629
      RCurrentCompensationFo: common.UInt8, // #43642
      GCurrentCompensationFo: common.UInt8, // #43655
      BCurrentCompensationFo: common.UInt8, // #43694
      RFirstScancompensation: common.UInt8, // #43707
      RLowGrayValue: common.UInt8, // #43720
      VRCurrentCompensationFirst: common.UInt8, // #43733
      VRCurrentCompensationSec: common.UInt8, // #43772
      VRFirstScancompensation: common.UInt8, // #43785
      VRLowGrayValue: common.UInt8,
    }),
  ],
  'Chip9373ExtendPropetyBase'
);
/**
 * Codec for {@link Chip9373ExtendPropety}
 * @category Codecs
 * @see Automatically generated from ../decompiled/Nova.LCT.GigabitSystem.DataClass.decompiled.cs:43314
 */
export const Chip9373ExtendPropety = t.intersection(
  [Chip9373ExtendPropetyBase, t.partial({ '@_xsi:type': t.literal('Chip9373ExtendPropety') })],
  'Chip9373ExtendPropety'
);
export interface Chip9373ExtendPropety extends t.TypeOf<typeof Chip9373ExtendPropety> {}
