import * as t from 'io-ts';
import * as common from '../lib/common';
import { ChipBaseExtendPropey } from './ChipBaseExtendPropey'; // import
import { ChipMBI5034BExtendProperty } from './ChipMBI5034BExtendProperty'; // import
import { PointDetectParameter } from './PointDetectParameter';
 // import
export const ChipMBI5034BRGBVExtendPropertyBase = t.intersection(
  [
    ChipBaseExtendPropey,
    t.partial({
      RedProperty: ChipMBI5034BExtendProperty, // #1276
      GreenProperty: ChipMBI5034BExtendProperty, // #1278
      BlueProperty: ChipMBI5034BExtendProperty, // #1280
      VRedProperty: ChipMBI5034BExtendProperty, // #1282
      IsUseNewModule: common.Bool, // #1290
      ChipLibVersion: common.UInt8, // #1292
      IsAdvancedMode: common.Bool, // #1294
      PointDetectType: common.UInt8, // #1306
      FirstDataLen: common.Int32, // #1318
      FirstStartIndex: common.Int32, // #1320
      FirstRegisterAddr: common.Int32, // #1322
      PointDetectParameter, // #1407
    }),
  ],
  'ChipMBI5034BRGBVExtendPropertyBase'
);
/**
 * Codec for {@link ChipMBI5034BRGBVExtendProperty}
 * @category Codecs
 * @see Automatically generated from ../decompiled/Nova.LCT.GigabitSystem.ChipMBI5034B.decompiled.cs:1271
 */
export const ChipMBI5034BRGBVExtendProperty = t.intersection(
  [
    ChipMBI5034BRGBVExtendPropertyBase,
    t.partial({ '@_xsi:type': t.literal('ChipMBI5034BRGBVExtendProperty') }),
  ],
  'ChipMBI5034BRGBVExtendProperty'
);
export interface ChipMBI5034BRGBVExtendProperty
  extends t.TypeOf<typeof ChipMBI5034BRGBVExtendProperty> {
  RedProperty?: ChipMBI5034BExtendProperty;
  GreenProperty?: ChipMBI5034BExtendProperty;
  BlueProperty?: ChipMBI5034BExtendProperty;
  VRedProperty?: ChipMBI5034BExtendProperty;
  PointDetectParameter?: PointDetectParameter;
}
