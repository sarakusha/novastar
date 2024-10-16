import * as t from 'io-ts';
import * as common from '../lib/common';
import { ChipBaseExtendPropey } from './ChipBaseExtendPropey'; // import
import { ChipICND2165ExtendProperty } from './ChipICND2165ExtendProperty'; // import
import { PointDetectParameter } from './PointDetectParameter'; // import
import { ScanType, ScanTypeEnum } from './ScanType';
 // import
export const ChipICND2165RGBVExtendPropertyBase = t.intersection(
  [
    ChipBaseExtendPropey,
    t.type({
      REG_LENGTH: common.Int32_48,
    }),
    t.partial({
      RedProperty: ChipICND2165ExtendProperty, // #5384
      BlueProperty: ChipICND2165ExtendProperty, // #5386
      GreenProperty: ChipICND2165ExtendProperty, // #5388
      VRedProperty: ChipICND2165ExtendProperty, // #5394
      IsUseNewModule: common.Bool, // #5398
      ChipLibVersion: common.UInt8, // #5400
      LowGrayColorCompensationMaxValue: common.UInt8, // #5402
      CouplingOptimizationEnhance: common.Bool, // #5414
      GradientOptimization: common.Bool, // #5428
      GclkNum: common.UInt16, // #5442
      RefNumPerVs: common.UInt16, // #5457
      ScanType, // #5472
      GclkFreqP: common.UInt8, // #5491
      GclkFreqM: common.UInt8, // #5506
      GclkFreqN: common.UInt8, // #5521
      IsAdvancedMode: common.Bool, // #5536
      GclkNumberEn: common.Bool, // #5552
      FractionalFrequencyProEn: common.Bool, // #5568
      SpecialDataLen: common.Int32, // #5584
      SpecialRegisterAddr: common.UInt32, // #5586
      PointDetectParameter, // #5656
      ChipMemberIndex: common.Int32,
    }),
  ],
  'ChipICND2165RGBVExtendPropertyBase'
);
/**
 * Codec for {@link ChipICND2165RGBVExtendProperty}
 * @category Codecs
 * @see Automatically generated from ../decompiled/Nova.LCT.GigabitSystem.ChipICND2165.decompiled.cs:5381
 */
export const ChipICND2165RGBVExtendProperty = t.intersection(
  [
    ChipICND2165RGBVExtendPropertyBase,
    t.partial({ '@_xsi:type': t.literal('ChipICND2165RGBVExtendProperty') }),
  ],
  'ChipICND2165RGBVExtendProperty'
);
export interface ChipICND2165RGBVExtendProperty
  extends t.TypeOf<typeof ChipICND2165RGBVExtendProperty> {
  RedProperty?: ChipICND2165ExtendProperty;
  BlueProperty?: ChipICND2165ExtendProperty;
  GreenProperty?: ChipICND2165ExtendProperty;
  VRedProperty?: ChipICND2165ExtendProperty;
  ScanType?: ScanTypeEnum;
  PointDetectParameter?: PointDetectParameter;
}
