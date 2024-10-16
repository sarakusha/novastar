import * as t from 'io-ts';
import * as common from '../lib/common';
import { ChipBaseExtendPropey } from './ChipBaseExtendPropey'; // import
import { ChipMBI5251ExtendProperty } from './ChipMBI5251ExtendProperty';
 // import
export const ChipMBI5251RGBVExtendPropertyBase = t.intersection(
  [
    ChipBaseExtendPropey,
    t.partial({
      RedProperty: ChipMBI5251ExtendProperty, // #1255
      GreenProperty: ChipMBI5251ExtendProperty, // #1257
      BlueProperty: ChipMBI5251ExtendProperty, // #1259
      VRedProperty: ChipMBI5251ExtendProperty, // #1261
      IsUseNewModule: common.Bool, // #1269
      ChipLibVersion: common.UInt8, // #1271
      IsAdvancedMode: common.Bool, // #1348
      RedRegValueConfigFirst: common.UInt16, // #1360
      GreenRegValueConfigFirst: common.UInt16, // #1372
      BlueRegValueConfigFirst: common.UInt16, // #1384
      VRedRegValueConfigFirst: common.UInt16, // #1396
      RedRegValueConfigSecond: common.UInt16, // #1408
      GreenRegValueConfigSecond: common.UInt16, // #1420
      BlueRegValueConfigSecond: common.UInt16, // #1432
      VRedRegValueConfigSecond: common.UInt16, // #1444
      RedRegValueConfigThird: common.UInt16, // #1456
      GreenRegValueConfigThird: common.UInt16, // #1468
      BlueRegValueConfigThird: common.UInt16, // #1480
      VRedRegValueConfigThird: common.UInt16, // #1492
      RedRegValueConfigFour: common.UInt16, // #1504
      GreenRegValueConfigFour: common.UInt16, // #1516
      BlueRegValueConfigFour: common.UInt16, // #1528
      VRedRegValueConfigFour: common.UInt16, // #1540
      RedRegValueConfigFive: common.UInt16, // #1552
      GreenRegValueConfigFive: common.UInt16, // #1564
      BlueRegValueConfigFive: common.UInt16, // #1576
      VRedRegValueConfigFive: common.UInt16, // #1588
      RedRegValueConfigSix: common.UInt16, // #1600
      GreenRegValueConfigSix: common.UInt16, // #1612
      BlueRegValueConfigSix: common.UInt16, // #1624
      VRedRegValueConfigSix: common.UInt16, // #1636
    }),
  ],
  'ChipMBI5251RGBVExtendPropertyBase'
);
/**
 * Codec for {@link ChipMBI5251RGBVExtendProperty}
 * @category Codecs
 * @see Automatically generated from ../decompiled/Nova.LCT.GigabitSystem.ChipMBI5251.decompiled.cs:1248
 */
export const ChipMBI5251RGBVExtendProperty = t.intersection(
  [
    ChipMBI5251RGBVExtendPropertyBase,
    t.partial({ '@_xsi:type': t.literal('ChipMBI5251RGBVExtendProperty') }),
  ],
  'ChipMBI5251RGBVExtendProperty'
);
export interface ChipMBI5251RGBVExtendProperty
  extends t.TypeOf<typeof ChipMBI5251RGBVExtendProperty> {
  RedProperty?: ChipMBI5251ExtendProperty;
  GreenProperty?: ChipMBI5251ExtendProperty;
  BlueProperty?: ChipMBI5251ExtendProperty;
  VRedProperty?: ChipMBI5251ExtendProperty;
}
