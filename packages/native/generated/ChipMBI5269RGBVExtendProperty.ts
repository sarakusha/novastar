import * as t from 'io-ts';
import * as common from '../lib/common';
import { ChipBaseExtendPropey } from './ChipBaseExtendPropey'; // import
import { ChipMBI5269ExtendProperty } from './ChipMBI5269ExtendProperty'; // import
import { DecodeType, DecodeTypeEnum } from './DecodeType';
 // import
export const ChipMBI5269RGBVExtendPropertyBase = t.intersection(
  [
    ChipBaseExtendPropey,
    t.type({
      REG_LENGTH: common.Int32_21,
    }),
    t.partial({
      RedProperty: ChipMBI5269ExtendProperty, // #4266
      GreenProperty: ChipMBI5269ExtendProperty, // #4268
      BlueProperty: ChipMBI5269ExtendProperty, // #4270
      VRedProperty: ChipMBI5269ExtendProperty, // #4272
      IsUseNewModule: common.Bool, // #4278
      ChipLibVersion: common.UInt8, // #4280
      SubField: common.UInt8, // #4282
      GrayDepth: common.UInt8, // #4321
      ScanCount: common.UInt8, // #4345
      HighAshouplingLevel: common.UInt8, // #4372
      HighAshouplingFront: common.UInt8, // #4386
      CompsentionTime: common.UInt16, // #4400
      FailureLEDElimination: common.Bool, // #4419
      GradientTransitionOptimizationTime: common.UInt16, // #4433
      P: common.UInt8, // #4452
      M: common.UInt8, // #4466
      N: common.UInt8, // #4480
      Div: common.UInt8, // #4494
      VrextVoltageEnable: common.Bool, // #4509
      IsAdvancedMode: common.Bool, // #4523
      DefaultRegisterType: common.UInt8, // #4535
      SpecialDataLen: common.Int32, // #4548
      SpecialRegisterAddr: common.UInt32, // #4550
      ChipMemberIndex: common.Int32, // #4633
      CurrentDecode: DecodeType,
    }),
  ],
  'ChipMBI5269RGBVExtendPropertyBase'
);
/**
 * Codec for {@link ChipMBI5269RGBVExtendProperty}
 * @category Codecs
 * @see Automatically generated from ../decompiled/Nova.LCT.GigabitSystem.ChipMBI5269.decompiled.cs:4259
 */
export const ChipMBI5269RGBVExtendProperty = t.intersection(
  [
    ChipMBI5269RGBVExtendPropertyBase,
    t.partial({ '@_xsi:type': t.literal('ChipMBI5269RGBVExtendProperty') }),
  ],
  'ChipMBI5269RGBVExtendProperty'
);
export interface ChipMBI5269RGBVExtendProperty
  extends t.TypeOf<typeof ChipMBI5269RGBVExtendProperty> {
  RedProperty?: ChipMBI5269ExtendProperty;
  GreenProperty?: ChipMBI5269ExtendProperty;
  BlueProperty?: ChipMBI5269ExtendProperty;
  VRedProperty?: ChipMBI5269ExtendProperty;
  CurrentDecode?: DecodeTypeEnum;
}
