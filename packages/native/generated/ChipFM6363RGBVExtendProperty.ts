import * as t from 'io-ts';
import * as common from '../lib/common';
import { ChipBaseExtendPropey } from './ChipBaseExtendPropey'; // import
import { ChipFM6363ExtendProperty } from './ChipFM6363ExtendProperty';
 // import
export const ChipFM6363RGBVExtendPropertyBase = t.intersection(
  [
    ChipBaseExtendPropey,
    t.partial({
      RedProperty: ChipFM6363ExtendProperty, // #1178
      GreenProperty: ChipFM6363ExtendProperty, // #1180
      BlueProperty: ChipFM6363ExtendProperty, // #1182
      VRedProperty: ChipFM6363ExtendProperty, // #1184
      ScanCount: common.UInt8, // #1190
      LowAshPitsImprove: common.UInt8, // #1204
      IsAberrationOptimize: common.Bool, // #1218
      IsStarSwipPoint: common.Bool, // #1232
      IsAdvancedModel: common.Bool, // #1246
      IsUseNewModule: common.Bool, // #1258
      ChipLibVersion: common.UInt8, // #1260
      ThirdDataLen: common.Int32, // #1390
      ThirdDataStartIndex: common.Int32, // #1392
      ThirdRegisterAddr: common.Int32, // #1394
      FourthDataLen: common.Int32, // #1396
      FourthStartIndex: common.Int32, // #1398
      FourthRegisterAddr: common.Int32, // #1400
      FifthDataLen: common.Int32, // #1402
      FifthStartIndex: common.Int32, // #1404
      FifthRegisterAddr: common.Int32, // #1406
      SixthDataLen: common.Int32, // #1408
      SixthStartIndex: common.Int32, // #1410
      SixthRegisterAddr: common.Int32, // #1412
    }),
  ],
  'ChipFM6363RGBVExtendPropertyBase'
);
/**
 * Codec for {@link ChipFM6363RGBVExtendProperty}
 * @category Codecs
 * @see Automatically generated from ../decompiled/Nova.LCT.GigabitSystem.ChipFM6363.decompiled.cs:1171
 */
export const ChipFM6363RGBVExtendProperty = t.intersection(
  [
    ChipFM6363RGBVExtendPropertyBase,
    t.partial({ '@_xsi:type': t.literal('ChipFM6363RGBVExtendProperty') }),
  ],
  'ChipFM6363RGBVExtendProperty'
);
export interface ChipFM6363RGBVExtendProperty
  extends t.TypeOf<typeof ChipFM6363RGBVExtendProperty> {
  RedProperty?: ChipFM6363ExtendProperty;
  GreenProperty?: ChipFM6363ExtendProperty;
  BlueProperty?: ChipFM6363ExtendProperty;
  VRedProperty?: ChipFM6363ExtendProperty;
}
