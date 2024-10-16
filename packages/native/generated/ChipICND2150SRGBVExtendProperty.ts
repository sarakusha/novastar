import * as t from 'io-ts';
import * as common from '../lib/common';
import { ChipBaseExtendPropey } from './ChipBaseExtendPropey'; // import
import { ChipICND2150SExtendProperty } from './ChipICND2150SExtendProperty';
 // import
export const ChipICND2150SRGBVExtendPropertyBase = t.intersection(
  [
    ChipBaseExtendPropey,
    t.partial({
      RedProperty: ChipICND2150SExtendProperty, // #2568
      GreenProperty: ChipICND2150SExtendProperty, // #2570
      BlueProperty: ChipICND2150SExtendProperty, // #2572
      VRedProperty: ChipICND2150SExtendProperty, // #2574
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
  'ChipICND2150SRGBVExtendPropertyBase'
);
/**
 * Codec for {@link ChipICND2150SRGBVExtendProperty}
 * @category Codecs
 * @see Automatically generated from ../decompiled/Nova.LCT.GigabitSystem.ChipICND2150S.decompiled.cs:2563
 */
export const ChipICND2150SRGBVExtendProperty = t.intersection(
  [
    ChipICND2150SRGBVExtendPropertyBase,
    t.partial({ '@_xsi:type': t.literal('ChipICND2150SRGBVExtendProperty') }),
  ],
  'ChipICND2150SRGBVExtendProperty'
);
export interface ChipICND2150SRGBVExtendProperty
  extends t.TypeOf<typeof ChipICND2150SRGBVExtendProperty> {
  RedProperty?: ChipICND2150SExtendProperty;
  GreenProperty?: ChipICND2150SExtendProperty;
  BlueProperty?: ChipICND2150SExtendProperty;
  VRedProperty?: ChipICND2150SExtendProperty;
}
