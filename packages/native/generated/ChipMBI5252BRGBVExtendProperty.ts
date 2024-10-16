import * as t from 'io-ts';
import * as common from '../lib/common';
import { ChipBaseExtendPropey } from './ChipBaseExtendPropey'; // import
import { ChipMBI5252BExtendProperty } from './ChipMBI5252BExtendProperty';
 // import
export const ChipMBI5252BRGBVExtendPropertyBase = t.intersection(
  [
    ChipBaseExtendPropey,
    t.type({
      REG_LENGTH: common.Int32_14,
    }),
    t.partial({
      RedProperty: ChipMBI5252BExtendProperty, // #1395
      GreenProperty: ChipMBI5252BExtendProperty, // #1397
      BlueProperty: ChipMBI5252BExtendProperty, // #1399
      VRedProperty: ChipMBI5252BExtendProperty, // #1401
      IsUseNewModule: common.Bool, // #1411
      ChipLibVersion: common.UInt8, // #1413
      FailureLEDElimination: common.Bool, // #1415
      GclkAddedNumer: common.UInt8, // #1429
      EnGCLKMutiRate: common.Bool, // #1443
      SubField: common.UInt8, // #1457
      GrayDepth: common.UInt8, // #1471
      ScanCount: common.UInt8, // #1495
      IsAdvancedMode: common.Bool, // #1512
      SpecialDataLen: common.Int32, // #1524
      SpecialRegisterAddr: common.UInt32, // #1526
      FirstDataLen: common.Int32, // #1528
      FirstStartIndex: common.Int32, // #1530
      FirstRegisterAddr: common.Int32, // #1532
      ThirdDataLen: common.Int32,
    }),
  ],
  'ChipMBI5252BRGBVExtendPropertyBase'
);
/**
 * Codec for {@link ChipMBI5252BRGBVExtendProperty}
 * @category Codecs
 * @see Automatically generated from ../decompiled/Nova.LCT.GigabitSystem.ChipMBI5252B.decompiled.cs:1390
 */
export const ChipMBI5252BRGBVExtendProperty = t.intersection(
  [
    ChipMBI5252BRGBVExtendPropertyBase,
    t.partial({ '@_xsi:type': t.literal('ChipMBI5252BRGBVExtendProperty') }),
  ],
  'ChipMBI5252BRGBVExtendProperty'
);
export interface ChipMBI5252BRGBVExtendProperty
  extends t.TypeOf<typeof ChipMBI5252BRGBVExtendProperty> {
  RedProperty?: ChipMBI5252BExtendProperty;
  GreenProperty?: ChipMBI5252BExtendProperty;
  BlueProperty?: ChipMBI5252BExtendProperty;
  VRedProperty?: ChipMBI5252BExtendProperty;
}
