import * as t from 'io-ts';
import * as common from '../lib/common';
import { ChipBaseExtendPropey } from './ChipBaseExtendPropey'; // import
import { ChipMY9758ExtendProperty } from './ChipMY9758ExtendProperty'; // import
import { PointDetectParameter } from './PointDetectParameter';
 // import
export const ChipMY9758RGBVExtendPropertyBase = t.intersection(
  [
    ChipBaseExtendPropey,
    t.type({
      IsAdvancedMode: common.Bool_false,
    }),
    t.partial({
      RedExtendProperty: ChipMY9758ExtendProperty, // #1476
      GreenExtendProperty: ChipMY9758ExtendProperty, // #1478
      BlueExtendProperty: ChipMY9758ExtendProperty, // #1480
      VRedExtendProperty: ChipMY9758ExtendProperty, // #1482
      IsUseNewModule: common.Bool, // #1500
      SpecialDataLen: common.Int32, // #1512
      SpecialRegisterAddr: common.UInt32, // #1514
      BadPointMode: common.UInt8, // #1516
      SingleAndDoubleSelect: common.UInt8, // #1535
      DCLKMode: common.UInt8, // #1638
      ScanCount: common.UInt8, // #1654
      MutiRate: common.UInt8, // #1666
      GrayScaleElevate: common.UInt8, // #1678
      CompensationTime: common.UInt8, // #1690
      VanishingShadowTime: common.UInt8, // #1702
      FirstDataLen: common.Int32, // #1714
      FirstStartIndex: common.Int32, // #1716
      FirstRegisterAddr: common.Int32, // #1718
      SecondDataLen: common.Int32, // #1720
      SecondStartIndex: common.Int32, // #1722
      SecondRegisterAddr: common.Int32, // #1724
      PointDetectParameter,
    }),
  ],
  'ChipMY9758RGBVExtendPropertyBase'
);
/**
 * Codec for {@link ChipMY9758RGBVExtendProperty}
 * @category Codecs
 * @see Automatically generated from ../decompiled/Nova.LCT.ChipMY9758.decompiled.cs:1469
 */
export const ChipMY9758RGBVExtendProperty = t.intersection(
  [
    ChipMY9758RGBVExtendPropertyBase,
    t.partial({ '@_xsi:type': t.literal('ChipMY9758RGBVExtendProperty') }),
  ],
  'ChipMY9758RGBVExtendProperty'
);
export interface ChipMY9758RGBVExtendProperty
  extends t.TypeOf<typeof ChipMY9758RGBVExtendProperty> {
  RedExtendProperty?: ChipMY9758ExtendProperty;
  GreenExtendProperty?: ChipMY9758ExtendProperty;
  BlueExtendProperty?: ChipMY9758ExtendProperty;
  VRedExtendProperty?: ChipMY9758ExtendProperty;
  PointDetectParameter?: PointDetectParameter;
}
