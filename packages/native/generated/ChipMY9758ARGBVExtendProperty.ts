import * as t from 'io-ts';
import * as common from '../lib/common';
import { ChipBaseExtendPropey } from './ChipBaseExtendPropey'; // import
import { ChipMY9758AExtendProperty } from './ChipMY9758AExtendProperty'; // import
import { PointDetectParameter } from './PointDetectParameter';
 // import
export const ChipMY9758ARGBVExtendPropertyBase = t.intersection(
  [
    ChipBaseExtendPropey,
    t.type({
      totalGclkUnitNumPerScanTemp: common.Int32_0, // #4880
      IsAdvancedMode: common.Bool_false,
    }),
    t.partial({
      RedExtendProperty: ChipMY9758AExtendProperty, // #4856
      GreenExtendProperty: ChipMY9758AExtendProperty, // #4858
      BlueExtendProperty: ChipMY9758AExtendProperty, // #4860
      VRedExtendProperty: ChipMY9758AExtendProperty, // #4864
      IsUseNewModule: common.Bool, // #4882
      SpecialDataLen: common.Int32, // #4894
      SpecialRegisterAddr: common.UInt32, // #4896
      BadPointMode: common.UInt8, // #4898
      SingleAndDoubleSelect: common.UInt8, // #4917
      EditScanningSequence: common.Bool, // #4939
      Hibernate: common.Bool, // #4951
      RCompensationCoarseNum: common.UInt8, // #5044
      GCompensationCoarseNum: common.UInt8, // #5056
      BCompensationCoarseNum: common.UInt8, // #5068
      RCompensationSmallNum: common.UInt8, // #5080
      GCompensationSmallNum: common.UInt8, // #5092
      BCompensationSmallNum: common.UInt8, // #5104
      WatchDog: common.UInt8, // #5116
      ScanningSequence: common.UInt8, // #5128
      ScanningMode: common.UInt8, // #5140
      DCLKMode: common.UInt8, // #5152
      TB: common.UInt16, // #5168
      TC: common.UInt16, // #5180
      ScanCount: common.UInt8, // #5192
      MutiRate: common.UInt8, // #5206
      GrayScaleElevate: common.UInt8, // #5218
      CompensationTime: common.UInt8, // #5230
      VanishingShadowTime: common.UInt8, // #5242
      FirstDataLen: common.Int32, // #5254
      FirstStartIndex: common.Int32, // #5256
      FirstRegisterAddr: common.Int32, // #5258
      SeventhRegisterAddr: common.Int32, // #5260
      EigthRegisterAddr: common.Int32, // #5262
      SecondDataLen: common.Int32, // #5264
      SecondStartIndex: common.Int32, // #5266
      SecondRegisterAddr: common.Int32, // #5268
      ThirdDataLen: common.Int32, // #5270
      ThirdDataStartIndex: common.Int32, // #5272
      ThirdRegisterAddr: common.Int32, // #5274
      PointDetectParameter,
    }),
  ],
  'ChipMY9758ARGBVExtendPropertyBase'
);
/**
 * Codec for {@link ChipMY9758ARGBVExtendProperty}
 * @category Codecs
 * @see Automatically generated from ../decompiled/Nova.LCT.GigabitSystem.ChipMY9758A.decompiled.cs:4849
 */
export const ChipMY9758ARGBVExtendProperty = t.intersection(
  [
    ChipMY9758ARGBVExtendPropertyBase,
    t.partial({ '@_xsi:type': t.literal('ChipMY9758ARGBVExtendProperty') }),
  ],
  'ChipMY9758ARGBVExtendProperty'
);
export interface ChipMY9758ARGBVExtendProperty
  extends t.TypeOf<typeof ChipMY9758ARGBVExtendProperty> {
  RedExtendProperty?: ChipMY9758AExtendProperty;
  GreenExtendProperty?: ChipMY9758AExtendProperty;
  BlueExtendProperty?: ChipMY9758AExtendProperty;
  VRedExtendProperty?: ChipMY9758AExtendProperty;
  PointDetectParameter?: PointDetectParameter;
}
