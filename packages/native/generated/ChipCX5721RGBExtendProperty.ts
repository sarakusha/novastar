import * as t from 'io-ts';
import * as common from '../lib/common';
import { ChipBaseExtendPropey } from './ChipBaseExtendPropey'; // import
import { ChipCX5721ExtendProperty } from './ChipCX5721ExtendProperty';
 // import
export const ChipCX5721RGBExtendPropertyBase = t.intersection(
  [
    ChipBaseExtendPropey,
    t.type({
      REG_LENGTH: common.Int32_5,
    }),
    t.partial({
      RedProperty: ChipCX5721ExtendProperty, // #284
      GreenProperty: ChipCX5721ExtendProperty, // #286
      BlueProperty: ChipCX5721ExtendProperty, // #288
      VRedProperty: ChipCX5721ExtendProperty, // #290
      IsUseNewModule: common.Bool, // #296
      ChipLibVersion: common.UInt8, // #298
      GrayScaleEnhancementEn: common.Bool, // #300
      PartNumRef: common.UInt8, // #314
      ScanCount: common.UInt8, // #330
      GrayCutting64Sections: common.UInt8, // #344
      GradientOptimizationSwitchEn: common.Bool, // #358
      LowGrayHighRef: common.UInt8, // #372
      OpenOrShortMode: common.Bool, // #386
      ShortGrade: common.UInt8, // #400
      OpenGrade: common.UInt8, // #414
      EnableShortMode: common.Bool, // #428
      EnableOpenMode: common.Bool, // #442
      IsAdvancedMode: common.Bool, // #456
      SpecialDataLen: common.Int32, // #468
      SpecialRegisterAddr: common.UInt32,
    }),
  ],
  'ChipCX5721RGBExtendPropertyBase'
);
/**
 * Codec for {@link ChipCX5721RGBExtendProperty}
 * @category Codecs
 * @see Automatically generated from ../decompiled/Nova.LCT.GigabitSystem.ChipCX5721.decompiled.cs:279
 */
export const ChipCX5721RGBExtendProperty = t.intersection(
  [
    ChipCX5721RGBExtendPropertyBase,
    t.partial({ '@_xsi:type': t.literal('ChipCX5721RGBExtendProperty') }),
  ],
  'ChipCX5721RGBExtendProperty'
);
export interface ChipCX5721RGBExtendProperty extends t.TypeOf<typeof ChipCX5721RGBExtendProperty> {
  RedProperty?: ChipCX5721ExtendProperty;
  GreenProperty?: ChipCX5721ExtendProperty;
  BlueProperty?: ChipCX5721ExtendProperty;
  VRedProperty?: ChipCX5721ExtendProperty;
}
