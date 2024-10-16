import * as t from 'io-ts';
import * as common from '../lib/common';
import { ChipBaseExtendPropey } from './ChipBaseExtendPropey'; // import
import { ChipFM6353ExtendProperty } from './ChipFM6353ExtendProperty';
 // import
export const ChipFM6353RGBVExtendPropertyBase = t.intersection(
  [
    ChipBaseExtendPropey,
    t.type({
      IsAdvancedModel: common.Bool_true, // #1210
      EnhancedModeGrade: common.UInt8_0,
    }),
    t.partial({
      ScanNumber: common.UInt8, // #1240
      PartNumRef: common.UInt8, // #1255
      IsAberrationOptimize: common.Bool, // #1270
      LowAshPitsImprove: common.UInt8, // #1285
      IsStarSwipPoint: common.Bool, // #1300
      RedProperty: ChipFM6353ExtendProperty, // #1315
      GreenProperty: ChipFM6353ExtendProperty, // #1328
      BlueProperty: ChipFM6353ExtendProperty, // #1341
      IsUseNewModule: common.Bool, // #1367
      ThirdDataLen: common.Int32, // #1387
      ThirdDataStartIndex: common.Int32, // #1389
      ThirdRegisterAddr: common.Int32, // #1391
      FourthDataLen: common.Int32, // #1393
      FourthStartIndex: common.Int32, // #1395
      FourthRegisterAddr: common.Int32,
    }),
  ],
  'ChipFM6353RGBVExtendPropertyBase'
);
/**
 * Codec for {@link ChipFM6353RGBVExtendProperty}
 * @category Codecs
 * @see Automatically generated from ../decompiled/Nova.LCT.GigabitSystem.ChipFM6353.decompiled.cs:1185
 */
export const ChipFM6353RGBVExtendProperty = t.intersection(
  [
    ChipFM6353RGBVExtendPropertyBase,
    t.partial({ '@_xsi:type': t.literal('ChipFM6353RGBVExtendProperty') }),
  ],
  'ChipFM6353RGBVExtendProperty'
);
export interface ChipFM6353RGBVExtendProperty
  extends t.TypeOf<typeof ChipFM6353RGBVExtendProperty> {
  RedProperty?: ChipFM6353ExtendProperty;
  GreenProperty?: ChipFM6353ExtendProperty;
  BlueProperty?: ChipFM6353ExtendProperty;
}
