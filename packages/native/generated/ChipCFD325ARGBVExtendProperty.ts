import * as t from 'io-ts';
import * as common from '../lib/common';
import { ChipBaseExtendPropey } from './ChipBaseExtendPropey'; // import
import { ChipCFD325AExtendProperty } from './ChipCFD325AExtendProperty'; // import
import { PointDetectParameter } from './PointDetectParameter';
 // import
export const ChipCFD325ARGBVExtendPropertyBase = t.intersection(
  [
    ChipBaseExtendPropey,
    t.type({
      LineBlankingBeginTime: common.UInt8_3,
    }),
    t.partial({
      RedProperty: ChipCFD325AExtendProperty, // #2561
      GreenProperty: ChipCFD325AExtendProperty, // #2563
      BlueProperty: ChipCFD325AExtendProperty, // #2565
      VRedProperty: ChipCFD325AExtendProperty, // #2596
      EnGCLKMutiRate: common.Bool, // #2608
      GclkDoubleLine: common.Bool, // #2622
      SubField: common.UInt8, // #2640
      GrayDepth: common.UInt8, // #2661
      DataOutputSetting: common.UInt8, // #2677
      IsAdvancedMode: common.Bool, // #2691
      IsUseNewModule: common.Bool, // #2707
      FirstICDDataOutputSetting: common.UInt8, // #2709
      FirstDataLen: common.Int32, // #2721
      FirstStartIndex: common.Int32, // #2723
      FirstRegisterAddr: common.Int32, // #2725
      SecondDataLen: common.Int32, // #2727
      SecondStartIndex: common.Int32, // #2729
      SecondRegisterAddr: common.Int32, // #2731
      ThirdDataLen: common.Int32, // #2733
      ThirdDataStartIndex: common.Int32, // #2735
      ThirdRegisterAddr: common.Int32, // #2737
      FourthDataLen: common.Int32, // #2739
      FourthStartIndex: common.Int32, // #2741
      FourthRegisterAddr: common.Int32, // #2743
      PointDetectParameter,
    }),
  ],
  'ChipCFD325ARGBVExtendPropertyBase'
);
/**
 * Codec for {@link ChipCFD325ARGBVExtendProperty}
 * @category Codecs
 * @see Automatically generated from ../decompiled/Nova.LCT.GigabitSystem.ChipCFD325A.decompiled.cs:2554
 */
export const ChipCFD325ARGBVExtendProperty = t.intersection(
  [
    ChipCFD325ARGBVExtendPropertyBase,
    t.partial({ '@_xsi:type': t.literal('ChipCFD325ARGBVExtendProperty') }),
  ],
  'ChipCFD325ARGBVExtendProperty'
);
export interface ChipCFD325ARGBVExtendProperty
  extends t.TypeOf<typeof ChipCFD325ARGBVExtendProperty> {
  RedProperty?: ChipCFD325AExtendProperty;
  GreenProperty?: ChipCFD325AExtendProperty;
  BlueProperty?: ChipCFD325AExtendProperty;
  VRedProperty?: ChipCFD325AExtendProperty;
  PointDetectParameter?: PointDetectParameter;
}
