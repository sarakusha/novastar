import * as t from 'io-ts';
import * as common from '../lib/common';
import { ChipType, ChipTypeEnum } from './ChipType'; // import
import { ScanBoardProperty } from './ScanBoardProperty'; // import
/**
 * Codec for interface {@link BrightAndSBProperty}
 * @category Codecs
 * @see Automatically generated from ../decompiled/Nova.LCT.GigabitSystem.DataClass.decompiled.cs:74384
 */
export const BrightAndSBProperty = t.intersection(
  [
    t.type({
      SelectChipType: common.withDefault(ChipType, 'Unknown'),
    }),
    t.partial({
      ScanBoardProp: ScanBoardProperty, // #74387
      FirstRegData: common.Base64, // #74389
      SecondRegData: common.Base64, // #74391
      ThirdRegData: common.Base64,
    }),
  ],
  'BrightAndSBProperty'
);
export interface BrightAndSBProperty extends t.TypeOf<typeof BrightAndSBProperty> {
  ScanBoardProp?: ScanBoardProperty;
  SelectChipType: ChipTypeEnum;
}
