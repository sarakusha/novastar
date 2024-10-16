import * as t from 'io-ts';
import * as common from '../lib/common';
import { ChipBaseExtendPropey } from './ChipBaseExtendPropey'; // import
import { ChipFM6356ExtendProperty } from './ChipFM6356ExtendProperty';
 // import
export const ChipFM6356RGBVExtendPropertyBase = t.intersection(
  [
    ChipBaseExtendPropey,
    t.partial({
      RedProperty: ChipFM6356ExtendProperty, // #281
      GreenProperty: ChipFM6356ExtendProperty, // #283
      BlueProperty: ChipFM6356ExtendProperty, // #285
      VRedProperty: ChipFM6356ExtendProperty, // #287
      IsAdvancedModel: common.Bool, // #293
      EnhancedModeGrade: common.UInt8, // #305
      ScanCount: common.UInt8, // #317
      SubFields: common.UInt8, // #331
      IsAberrationOptimize: common.Bool, // #346
      LowAshPitsImprove: common.UInt8, // #360
      IsStarSwipPoint: common.Bool, // #374
      IsUseNewModule: common.Bool, // #388
      ChipLibVersion: common.UInt8, // #390
      ThirdDataLen: common.Int32, // #481
      ThirdDataStartIndex: common.Int32, // #483
      ThirdRegisterAddr: common.Int32, // #485
      FourthDataLen: common.Int32, // #487
      FourthStartIndex: common.Int32, // #489
      FourthRegisterAddr: common.Int32, // #491
      FifthDataLen: common.Int32, // #493
      FifthStartIndex: common.Int32, // #495
      FifthRegisterAddr: common.Int32, // #497
    }),
  ],
  'ChipFM6356RGBVExtendPropertyBase'
);
/**
 * Codec for {@link ChipFM6356RGBVExtendProperty}
 * @category Codecs
 * @see Automatically generated from ../decompiled/Nova.LCT.GigabitSystem.ChipFM6356.decompiled.cs:274
 */
export const ChipFM6356RGBVExtendProperty = t.intersection(
  [
    ChipFM6356RGBVExtendPropertyBase,
    t.partial({ '@_xsi:type': t.literal('ChipFM6356RGBVExtendProperty') }),
  ],
  'ChipFM6356RGBVExtendProperty'
);
export interface ChipFM6356RGBVExtendProperty
  extends t.TypeOf<typeof ChipFM6356RGBVExtendProperty> {
  RedProperty?: ChipFM6356ExtendProperty;
  GreenProperty?: ChipFM6356ExtendProperty;
  BlueProperty?: ChipFM6356ExtendProperty;
  VRedProperty?: ChipFM6356ExtendProperty;
}
