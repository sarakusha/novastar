import * as t from 'io-ts';
import * as common from '../lib/common';
import { ChipBaseExtendPropey } from './ChipBaseExtendPropey'; // import
import { ChipMBI5754ExtendProperty } from './ChipMBI5754ExtendProperty'; // import
import { PointDetectParameter } from './PointDetectParameter';
 // import
export const ChipMBI5754RGBVExtendPropertyBase = t.intersection(
  [
    ChipBaseExtendPropey,
    t.type({
      REG_LENGTH: common.Int32_16,
    }),
    t.partial({
      RedProperty: ChipMBI5754ExtendProperty, // #306
      GreenProperty: ChipMBI5754ExtendProperty, // #308
      BlueProperty: ChipMBI5754ExtendProperty, // #310
      VRedProperty: ChipMBI5754ExtendProperty, // #312
      IsUseNewModule: common.Bool, // #324
      ChipLibVersion: common.UInt8, // #326
      PointDetectParameter, // #409
      FailureLEDElimination: common.Bool, // #421
      GclkAddedNumer: common.UInt8, // #435
      EnGCLKMutiRate: common.Bool, // #449
      SubField: common.UInt8, // #463
      GrayDepth: common.UInt8, // #477
      ScanCount: common.UInt8, // #504
      IsAdvancedMode: common.Bool, // #521
      SpecialDataLen: common.Int32, // #533
      SpecialRegisterAddr: common.UInt32, // #535
      FirstDataLen: common.Int32, // #537
      FirstStartIndex: common.Int32, // #539
      FirstRegisterAddr: common.Int32, // #541
      ThirdDataLen: common.Int32,
    }),
  ],
  'ChipMBI5754RGBVExtendPropertyBase'
);
/**
 * Codec for {@link ChipMBI5754RGBVExtendProperty}
 * @category Codecs
 * @see Automatically generated from ../decompiled/Nova.LCT.GigabitSystem.ChipMBI5754.decompiled.cs:301
 */
export const ChipMBI5754RGBVExtendProperty = t.intersection(
  [
    ChipMBI5754RGBVExtendPropertyBase,
    t.partial({ '@_xsi:type': t.literal('ChipMBI5754RGBVExtendProperty') }),
  ],
  'ChipMBI5754RGBVExtendProperty'
);
export interface ChipMBI5754RGBVExtendProperty
  extends t.TypeOf<typeof ChipMBI5754RGBVExtendProperty> {
  RedProperty?: ChipMBI5754ExtendProperty;
  GreenProperty?: ChipMBI5754ExtendProperty;
  BlueProperty?: ChipMBI5754ExtendProperty;
  VRedProperty?: ChipMBI5754ExtendProperty;
  PointDetectParameter?: PointDetectParameter;
}
