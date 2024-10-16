import * as t from 'io-ts';
import * as common from '../lib/common';
import { ChipBaseExtendPropey } from './ChipBaseExtendPropey'; // import
import { ChipRT5965ExtendProperty } from './ChipRT5965ExtendProperty';
 // import
export const ChipRT5965RGBVExtendPropertyBase = t.intersection(
  [
    ChipBaseExtendPropey,
    t.partial({
      RedProperty: ChipRT5965ExtendProperty, // #1150
      GreenProperty: ChipRT5965ExtendProperty, // #1152
      BlueProperty: ChipRT5965ExtendProperty, // #1154
      VRedProperty: ChipRT5965ExtendProperty, // #1156
      IsUseNewModule: common.Bool, // #1162
      ChipLibVersion: common.UInt8, // #1164
      ScanCount: common.UInt8, // #1166
      SubField: common.UInt8, // #1180
      BitMode: common.Bool, // #1194
      OpenCircuitDetectionEn: common.Bool, // #1208
      IsAdvancedMode: common.Bool, // #1222
      FirstDataLen: common.Int32, // #1315
      FirstStartIndex: common.Int32, // #1317
      FirstRegisterAddr: common.Int32, // #1319
      SecondDataLen: common.Int32, // #1321
      SecondStartIndex: common.Int32, // #1323
      SecondRegisterAddr: common.Int32, // #1325
      ThirdDataLen: common.Int32, // #1327
      ThirdDataStartIndex: common.Int32, // #1329
      ThirdRegisterAddr: common.Int32, // #1331
    }),
  ],
  'ChipRT5965RGBVExtendPropertyBase'
);
/**
 * Codec for {@link ChipRT5965RGBVExtendProperty}
 * @category Codecs
 * @see Automatically generated from ../decompiled/Nova.LCT.GigabitSystem.ChipRT5965.decompiled.cs:1143
 */
export const ChipRT5965RGBVExtendProperty = t.intersection(
  [
    ChipRT5965RGBVExtendPropertyBase,
    t.partial({ '@_xsi:type': t.literal('ChipRT5965RGBVExtendProperty') }),
  ],
  'ChipRT5965RGBVExtendProperty'
);
export interface ChipRT5965RGBVExtendProperty
  extends t.TypeOf<typeof ChipRT5965RGBVExtendProperty> {
  RedProperty?: ChipRT5965ExtendProperty;
  GreenProperty?: ChipRT5965ExtendProperty;
  BlueProperty?: ChipRT5965ExtendProperty;
  VRedProperty?: ChipRT5965ExtendProperty;
}
