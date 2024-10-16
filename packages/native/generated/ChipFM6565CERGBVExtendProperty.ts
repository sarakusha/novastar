import * as t from 'io-ts';
import * as common from '../lib/common';
import { ChipBaseExtendPropey } from './ChipBaseExtendPropey'; // import
import { ChipFM6565CEExtendProperty } from './ChipFM6565CEExtendProperty'; // import
import { ScanType, ScanTypeEnum } from './ScanType';
 // import
export const ChipFM6565CERGBVExtendPropertyBase = t.intersection(
  [
    ChipBaseExtendPropey,
    t.type({
      REG_LENGTH: common.Int32_47,
    }),
    t.partial({
      RedProperty: ChipFM6565CEExtendProperty, // #512
      GreenProperty: ChipFM6565CEExtendProperty, // #514
      BlueProperty: ChipFM6565CEExtendProperty, // #516
      VRedProperty: ChipFM6565CEExtendProperty, // #518
      GclkNum: common.UInt16, // #524
      RefNumPerVs: common.UInt16, // #538
      SubField: common.UInt8, // #552
      ScanType, // #566
      GclkFreqP: common.UInt8, // #586
      GclkFreqM: common.UInt8, // #600
      GclkFreqN: common.UInt8, // #614
      IsAdvancedMode: common.Bool, // #628
      SpecialDataLen: common.Int32, // #640
      SpecialRegisterAddr: common.UInt32, // #642
      IsUseNewModule: common.Bool, // #725
      ChipLibVersion: common.UInt8, // #727
      FirstDataLen: common.Int32, // #729
      FirstStartIndex: common.Int32, // #731
      FirstRegisterAddr: common.Int32, // #733
      SecondDataLen: common.Int32, // #735
      SecondStartIndex: common.Int32, // #737
      SecondRegisterAddr: common.Int32,
    }),
  ],
  'ChipFM6565CERGBVExtendPropertyBase'
);
/**
 * Codec for {@link ChipFM6565CERGBVExtendProperty}
 * @category Codecs
 * @see Automatically generated from ../decompiled/Nova.LCT.GigabitSystem.ChipFM6565CE.decompiled.cs:505
 */
export const ChipFM6565CERGBVExtendProperty = t.intersection(
  [
    ChipFM6565CERGBVExtendPropertyBase,
    t.partial({ '@_xsi:type': t.literal('ChipFM6565CERGBVExtendProperty') }),
  ],
  'ChipFM6565CERGBVExtendProperty'
);
export interface ChipFM6565CERGBVExtendProperty
  extends t.TypeOf<typeof ChipFM6565CERGBVExtendProperty> {
  RedProperty?: ChipFM6565CEExtendProperty;
  GreenProperty?: ChipFM6565CEExtendProperty;
  BlueProperty?: ChipFM6565CEExtendProperty;
  VRedProperty?: ChipFM6565CEExtendProperty;
  ScanType?: ScanTypeEnum;
}
