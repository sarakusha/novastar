import * as t from 'io-ts';
import * as common from '../lib/common';
import { ChipBaseExtendPropey } from './ChipBaseExtendPropey'; // import
import { ChipICND2126ExtendProperty } from './ChipICND2126ExtendProperty'; // import
import { PointDetectParameter } from './PointDetectParameter';
 // import
export const ChipICND2126RGBVExtendPropertyBase = t.intersection(
  [
    ChipBaseExtendPropey,
    t.partial({
      RedProperty: ChipICND2126ExtendProperty, // #1345
      GreenProperty: ChipICND2126ExtendProperty, // #1347
      BlueProperty: ChipICND2126ExtendProperty, // #1349
      VRedProperty: ChipICND2126ExtendProperty, // #1351
      IsUseNewModule: common.Bool, // #1359
      ChipLibVersion: common.UInt8, // #1361
      IsAdvancedMode: common.Bool, // #1363
      PointDetectType: common.UInt8, // #1375
      SetSpecialBit9: common.UInt8, // #1387
      SetSpecialBit7: common.UInt8, // #1401
      FirstDataLen: common.Int32, // #1415
      FirstStartIndex: common.Int32, // #1417
      FirstRegisterAddr: common.Int32, // #1419
      SecondDataLen: common.Int32, // #1421
      SecondStartIndex: common.Int32, // #1423
      SecondRegisterAddr: common.Int32, // #1425
      PointDetectParameter, // #1510
    }),
  ],
  'ChipICND2126RGBVExtendPropertyBase'
);
/**
 * Codec for {@link ChipICND2126RGBVExtendProperty}
 * @category Codecs
 * @see Automatically generated from ../decompiled/Nova.LCT.GigabitSystem.ChipICN2126.decompiled.cs:1340
 */
export const ChipICND2126RGBVExtendProperty = t.intersection(
  [
    ChipICND2126RGBVExtendPropertyBase,
    t.partial({ '@_xsi:type': t.literal('ChipICND2126RGBVExtendProperty') }),
  ],
  'ChipICND2126RGBVExtendProperty'
);
export interface ChipICND2126RGBVExtendProperty
  extends t.TypeOf<typeof ChipICND2126RGBVExtendProperty> {
  RedProperty?: ChipICND2126ExtendProperty;
  GreenProperty?: ChipICND2126ExtendProperty;
  BlueProperty?: ChipICND2126ExtendProperty;
  VRedProperty?: ChipICND2126ExtendProperty;
  PointDetectParameter?: PointDetectParameter;
}
