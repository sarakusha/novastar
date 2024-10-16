import * as t from 'io-ts';
import * as common from '../lib/common';
import { ChipBaseExtendPropey } from './ChipBaseExtendPropey'; // import
import { ChipMBI5759BCustomExtendProperty } from './ChipMBI5759BCustomExtendProperty'; // import
import { ChipMBI5759BGRGBExtendProperty } from './ChipMBI5759BGRGBExtendProperty';
 // import
export const ChipMBI5759BExtendPropertyBase = t.intersection(
  [
    ChipBaseExtendPropey,
    t.type({
      IsAdvancedMode: common.Bool_true,
    }),
    t.partial({
      GRGBExtendProperty: ChipMBI5759BGRGBExtendProperty, // #657
      CustomExtendProperty: ChipMBI5759BCustomExtendProperty, // #659
      IsUseNewModule: common.Bool, // #667
      ChipLibVersion: common.UInt8, // #671
      GrayDepth: common.UInt8, // #683
      ScanType: common.Int32, // #695
      subField: common.UInt8, // #707
      SpecialDataLen: common.Int32, // #719
      SpecialRegisterAddr: common.UInt32,
    }),
  ],
  'ChipMBI5759BExtendPropertyBase'
);
/**
 * Codec for {@link ChipMBI5759BExtendProperty}
 * @category Codecs
 * @see Automatically generated from ../decompiled/Nova.LCT.GigabitSystem.ChipMBI5759B.decompiled.cs:654
 */
export const ChipMBI5759BExtendProperty = t.intersection(
  [
    ChipMBI5759BExtendPropertyBase,
    t.partial({ '@_xsi:type': t.literal('ChipMBI5759BExtendProperty') }),
  ],
  'ChipMBI5759BExtendProperty'
);
export interface ChipMBI5759BExtendProperty extends t.TypeOf<typeof ChipMBI5759BExtendProperty> {
  GRGBExtendProperty?: ChipMBI5759BGRGBExtendProperty;
  CustomExtendProperty?: ChipMBI5759BCustomExtendProperty;
}
