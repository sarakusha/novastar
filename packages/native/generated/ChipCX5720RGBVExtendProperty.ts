import * as t from 'io-ts';
import * as common from '../lib/common';
import { ChipBaseExtendPropey } from './ChipBaseExtendPropey'; // import
import { ChipCX5720ExtendProperty } from './ChipCX5720ExtendProperty';
 // import
export const ChipCX5720RGBVExtendPropertyBase = t.intersection(
  [
    ChipBaseExtendPropey,
    t.type({
      REG_LENGTH: common.Int32_3,
    }),
    t.partial({
      RedProperty: ChipCX5720ExtendProperty, // #1721
      GreenProperty: ChipCX5720ExtendProperty, // #1724
      BlueProperty: ChipCX5720ExtendProperty, // #1727
      VRedProperty: ChipCX5720ExtendProperty, // #1730
      ChannelEnergySaveSettingModel: common.Bool, // #1733
      SuperSaveSettingModel: common.Bool, // #1747
      IsUseNewModule: common.Bool, // #1761
      ChipLibVersion: common.UInt8, // #1763
      ScanCount: common.UInt8, // #1765
      GrayScaleEnhancementEn: common.Bool, // #1779
      SpwmGrayMode: common.Bool, // #1793
      GCLK_MultiFrequent: common.Bool, // #1807
      DoubleMultiRefresh: common.Bool, // #1821
      IsAdvancedMode: common.Bool, // #1835
      TestGain: common.UInt8, // #1847
      SpecialDataLen: common.Int32, // #1859
      SpecialRegisterAddr: common.UInt32,
    }),
  ],
  'ChipCX5720RGBVExtendPropertyBase'
);
/**
 * Codec for {@link ChipCX5720RGBVExtendProperty}
 * @category Codecs
 * @see Automatically generated from ../decompiled/Nova.LCT.GigabitSystem.ChipCX5720.decompiled.cs:1714
 */
export const ChipCX5720RGBVExtendProperty = t.intersection(
  [
    ChipCX5720RGBVExtendPropertyBase,
    t.partial({ '@_xsi:type': t.literal('ChipCX5720RGBVExtendProperty') }),
  ],
  'ChipCX5720RGBVExtendProperty'
);
export interface ChipCX5720RGBVExtendProperty
  extends t.TypeOf<typeof ChipCX5720RGBVExtendProperty> {
  RedProperty?: ChipCX5720ExtendProperty;
  GreenProperty?: ChipCX5720ExtendProperty;
  BlueProperty?: ChipCX5720ExtendProperty;
  VRedProperty?: ChipCX5720ExtendProperty;
}
