import * as t from 'io-ts';
import * as common from '../lib/common';
import { ChipBaseExtendPropey } from './ChipBaseExtendPropey'; // import
import { ChipMBI5253NewBExtendProperty } from './ChipMBI5253NewBExtendProperty'; // import
import { PointDetectParameter } from './PointDetectParameter';
 // import
export const ChipMBI5253NewBRGBVExtendPropertyBase = t.intersection(
  [
    ChipBaseExtendPropey,
    t.type({
      REG_LENGTH: common.Int32_14,
    }),
    t.partial({
      RedProperty: ChipMBI5253NewBExtendProperty, // #1343
      GreenProperty: ChipMBI5253NewBExtendProperty, // #1346
      BlueProperty: ChipMBI5253NewBExtendProperty, // #1349
      VRedProperty: ChipMBI5253NewBExtendProperty, // #1352
      IsUseNewModule: common.Bool, // #1355
      ChipLibVersion: common.UInt8, // #1357
      FailureLEDElimination: common.Bool, // #1359
      GclkAddedNumer: common.UInt8, // #1373
      EnGCLKMutiRate: common.Bool, // #1387
      SubField: common.UInt8, // #1401
      GrayDepth: common.UInt8, // #1415
      ScanCount: common.UInt8, // #1439
      IsAdvancedMode: common.Bool, // #1456
      IsGammaDllMode: common.Bool, // #1468
      SpecialDataLen: common.Int32, // #1481
      SpecialRegisterAddr: common.UInt32, // #1483
      FirstDataLen: common.Int32, // #1485
      FirstStartIndex: common.Int32, // #1487
      FirstRegisterAddr: common.Int32, // #1489
      ThirdDataLen: common.Int32, // #1491
      PointDetectParameter,
    }),
  ],
  'ChipMBI5253NewBRGBVExtendPropertyBase'
);
/**
 * Codec for {@link ChipMBI5253NewBRGBVExtendProperty}
 * @category Codecs
 * @see Automatically generated from ../decompiled/Nova.LCT.GigabitSystem.ChipMBI5253NewB.decompiled.cs:1334
 */
export const ChipMBI5253NewBRGBVExtendProperty = t.intersection(
  [
    ChipMBI5253NewBRGBVExtendPropertyBase,
    t.partial({ '@_xsi:type': t.literal('ChipMBI5253NewBRGBVExtendProperty') }),
  ],
  'ChipMBI5253NewBRGBVExtendProperty'
);
export interface ChipMBI5253NewBRGBVExtendProperty
  extends t.TypeOf<typeof ChipMBI5253NewBRGBVExtendProperty> {
  RedProperty?: ChipMBI5253NewBExtendProperty;
  GreenProperty?: ChipMBI5253NewBExtendProperty;
  BlueProperty?: ChipMBI5253NewBExtendProperty;
  VRedProperty?: ChipMBI5253NewBExtendProperty;
  PointDetectParameter?: PointDetectParameter;
}
