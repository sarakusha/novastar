import * as t from 'io-ts';
import * as common from '../lib/common';
import { ChipBaseExtendPropey } from './ChipBaseExtendPropey'; // import
import { ChipICND2153PExtendProperty } from './ChipICND2153PExtendProperty';
 // import
export const ChipICND2153PRGBVExtendPropertyBase = t.intersection(
  [
    ChipBaseExtendPropey,
    t.partial({
      RedProperty: ChipICND2153PExtendProperty, // #2568
      GreenProperty: ChipICND2153PExtendProperty, // #2570
      BlueProperty: ChipICND2153PExtendProperty, // #2572
      VRedProperty: ChipICND2153PExtendProperty, // #2574
      IsUseNewModule: common.Bool, // #2582
      PartNumRef: common.UInt8, // #2601
      IsAdvancedMode: common.Bool, // #2623
      IsRemoveBad: common.Bool, // #2639
      IsRemoveBadEnhancedMode: common.Bool, // #2657
      EnhancedModeGrade: common.UInt8, // #2673
      FirstDataLen: common.Int32, // #2685
      FirstStartIndex: common.Int32, // #2687
      FirstRegisterAddr: common.Int32, // #2689
      SecondDataLen: common.Int32, // #2691
      SecondStartIndex: common.Int32, // #2693
      SecondRegisterAddr: common.Int32, // #2695
      ThirdDataLen: common.Int32, // #2697
      ThirdDataStartIndex: common.Int32, // #2699
      ThirdRegisterAddr: common.Int32, // #2701
      FourthDataLen: common.Int32, // #2703
      FourthStartIndex: common.Int32, // #2705
      FourthRegisterAddr: common.Int32, // #2707
    }),
  ],
  'ChipICND2153PRGBVExtendPropertyBase'
);
/**
 * Codec for {@link ChipICND2153PRGBVExtendProperty}
 * @category Codecs
 * @see Automatically generated from ../decompiled/Nova.LCT.GigabitSystem.ChipICND2153P.decompiled.cs:2563
 */
export const ChipICND2153PRGBVExtendProperty = t.intersection(
  [
    ChipICND2153PRGBVExtendPropertyBase,
    t.partial({ '@_xsi:type': t.literal('ChipICND2153PRGBVExtendProperty') }),
  ],
  'ChipICND2153PRGBVExtendProperty'
);
export interface ChipICND2153PRGBVExtendProperty
  extends t.TypeOf<typeof ChipICND2153PRGBVExtendProperty> {
  RedProperty?: ChipICND2153PExtendProperty;
  GreenProperty?: ChipICND2153PExtendProperty;
  BlueProperty?: ChipICND2153PExtendProperty;
  VRedProperty?: ChipICND2153PExtendProperty;
}
