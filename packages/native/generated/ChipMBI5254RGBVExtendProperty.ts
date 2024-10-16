import * as t from 'io-ts';
import * as common from '../lib/common';
import { ChipBaseExtendPropey } from './ChipBaseExtendPropey'; // import
import { ChipMBI5254ExtendProperty } from './ChipMBI5254ExtendProperty';
 // import
export const ChipMBI5254RGBVExtendPropertyBase = t.intersection(
  [
    ChipBaseExtendPropey,
    t.type({
      REG_LENGTH: common.Int32_14,
    }),
    t.partial({
      RedProperty: ChipMBI5254ExtendProperty, // #1336
      GreenProperty: ChipMBI5254ExtendProperty, // #1338
      BlueProperty: ChipMBI5254ExtendProperty, // #1340
      VRedProperty: ChipMBI5254ExtendProperty, // #1342
      IsUseNewModule: common.Bool, // #1352
      ChipLibVersion: common.UInt8, // #1354
      FailureLEDElimination: common.Bool, // #1356
      GclkAddedNumer: common.UInt8, // #1370
      EnGCLKMutiRate: common.Bool, // #1384
      SubField: common.UInt8, // #1398
      GrayDepth: common.UInt8, // #1412
      ScanCount: common.UInt8, // #1436
      IsAdvancedMode: common.Bool, // #1453
      SpecialDataLen: common.Int32, // #1465
      SpecialRegisterAddr: common.UInt32, // #1467
      FirstDataLen: common.Int32, // #1469
      FirstStartIndex: common.Int32, // #1471
      FirstRegisterAddr: common.Int32, // #1473
      ThirdDataLen: common.Int32,
    }),
  ],
  'ChipMBI5254RGBVExtendPropertyBase'
);
/**
 * Codec for {@link ChipMBI5254RGBVExtendProperty}
 * @category Codecs
 * @see Automatically generated from ../decompiled/Nova.LCT.GigabitSystem.ChipMBI5254.decompiled.cs:1331
 */
export const ChipMBI5254RGBVExtendProperty = t.intersection(
  [
    ChipMBI5254RGBVExtendPropertyBase,
    t.partial({ '@_xsi:type': t.literal('ChipMBI5254RGBVExtendProperty') }),
  ],
  'ChipMBI5254RGBVExtendProperty'
);
export interface ChipMBI5254RGBVExtendProperty
  extends t.TypeOf<typeof ChipMBI5254RGBVExtendProperty> {
  RedProperty?: ChipMBI5254ExtendProperty;
  GreenProperty?: ChipMBI5254ExtendProperty;
  BlueProperty?: ChipMBI5254ExtendProperty;
  VRedProperty?: ChipMBI5254ExtendProperty;
}
