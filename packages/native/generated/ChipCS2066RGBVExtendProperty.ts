import * as t from 'io-ts';
import * as common from '../lib/common';
import { ChipBaseExtendPropey } from './ChipBaseExtendPropey'; // import
import { ChipCS2066ExtendProperty } from './ChipCS2066ExtendProperty';
 // import
export const ChipCS2066RGBVExtendPropertyBase = t.intersection(
  [
    ChipBaseExtendPropey,
    t.partial({
      RedProperty: ChipCS2066ExtendProperty, // #6431
      GreenProperty: ChipCS2066ExtendProperty, // #6433
      BlueProperty: ChipCS2066ExtendProperty, // #6435
      VRedProperty: ChipCS2066ExtendProperty, // #6437
      SubField: common.UInt8, // #6462
      GrayDepth: common.UInt8, // #6483
      IsAdvancedMode: common.Bool, // #6507
      IsUseNewModule: common.Bool, // #6519
      PLLFreqDivision: common.UInt8, // #6521
      PLLFreqDoubling: common.UInt8, // #6535
      FirstDataLen: common.Int32, // #6549
      FirstStartIndex: common.Int32, // #6551
      FirstRegisterAddr: common.Int32, // #6553
      SecondDataLen: common.Int32, // #6555
      SecondStartIndex: common.Int32, // #6557
      SecondRegisterAddr: common.Int32, // #6559
      ThirdDataLen: common.Int32, // #6561
      ThirdDataStartIndex: common.Int32, // #6563
      ThirdRegisterAddr: common.Int32, // #6565
      FourthDataLen: common.Int32, // #6567
      FourthStartIndex: common.Int32, // #6569
      FourthRegisterAddr: common.Int32, // #6571
      FifthDataLen: common.Int32, // #6573
      FifthStartIndex: common.Int32, // #6575
      FifthRegisterAddr: common.Int32, // #6577
      SixthDataLen: common.Int32, // #6579
      SixthStartIndex: common.Int32, // #6581
      SixthRegisterAddr: common.Int32, // #6583
      SeventhDataLen: common.Int32, // #6585
      SeventhStartIndex: common.Int32, // #6587
      SeventhRegisterAddr: common.Int32, // #6589
      SpecialDataLen: common.Int32, // #6662
      SpecialRegisterAddr: common.UInt32, // #6664
    }),
  ],
  'ChipCS2066RGBVExtendPropertyBase'
);
/**
 * Codec for {@link ChipCS2066RGBVExtendProperty}
 * @category Codecs
 * @see Automatically generated from ../decompiled/Nova.LCT.GigabitSystem.ChipCS2066.decompiled.cs:6424
 */
export const ChipCS2066RGBVExtendProperty = t.intersection(
  [
    ChipCS2066RGBVExtendPropertyBase,
    t.partial({ '@_xsi:type': t.literal('ChipCS2066RGBVExtendProperty') }),
  ],
  'ChipCS2066RGBVExtendProperty'
);
export interface ChipCS2066RGBVExtendProperty
  extends t.TypeOf<typeof ChipCS2066RGBVExtendProperty> {
  RedProperty?: ChipCS2066ExtendProperty;
  GreenProperty?: ChipCS2066ExtendProperty;
  BlueProperty?: ChipCS2066ExtendProperty;
  VRedProperty?: ChipCS2066ExtendProperty;
}
