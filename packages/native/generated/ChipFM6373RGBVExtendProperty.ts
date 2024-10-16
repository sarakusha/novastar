import * as t from 'io-ts';
import * as common from '../lib/common';
import { ChipBaseExtendPropey } from './ChipBaseExtendPropey'; // import
import { ChipFM6373ExtendProperty } from './ChipFM6373ExtendProperty'; // import
import { ScanType, ScanTypeEnum } from './ScanType';
 // import
export const ChipFM6373RGBVExtendPropertyBase = t.intersection(
  [
    ChipBaseExtendPropey,
    t.type({
      REG_LENGTH: common.Int32_48,
    }),
    t.partial({
      RedProperty: ChipFM6373ExtendProperty, // #1319
      GreenProperty: ChipFM6373ExtendProperty, // #1322
      BlueProperty: ChipFM6373ExtendProperty, // #1325
      VRedProperty: ChipFM6373ExtendProperty, // #1328
      RefNumPerVs: common.UInt16, // #1331
      SubField: common.UInt8, // #1345
      ScanType, // #1359
      IsAdvancedMode: common.Bool, // #1377
      SaveSetSubfieldByMySelfToConfigfile: common.Bool, // #1389
      LowGreyPittingOptimization: common.UInt8, // #1401
      CouplingEnhancedMode: common.Bool, // #1415
      SpecialDataLen: common.Int32, // #1429
      SpecialRegisterAddr: common.UInt32, // #1431
      IsUseNewModule: common.Bool, // #1520
      ChipLibVersion: common.UInt8,
    }),
  ],
  'ChipFM6373RGBVExtendPropertyBase'
);
/**
 * Codec for {@link ChipFM6373RGBVExtendProperty}
 * @category Codecs
 * @see Automatically generated from ../decompiled/Nova.LCT.GigabitSystem.ChipFM6373.decompiled.cs:1314
 */
export const ChipFM6373RGBVExtendProperty = t.intersection(
  [
    ChipFM6373RGBVExtendPropertyBase,
    t.partial({ '@_xsi:type': t.literal('ChipFM6373RGBVExtendProperty') }),
  ],
  'ChipFM6373RGBVExtendProperty'
);
export interface ChipFM6373RGBVExtendProperty
  extends t.TypeOf<typeof ChipFM6373RGBVExtendProperty> {
  RedProperty?: ChipFM6373ExtendProperty;
  GreenProperty?: ChipFM6373ExtendProperty;
  BlueProperty?: ChipFM6373ExtendProperty;
  VRedProperty?: ChipFM6373ExtendProperty;
  ScanType?: ScanTypeEnum;
}
