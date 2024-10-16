import * as t from 'io-ts';
import * as common from '../lib/common';
import { ChipBaseExtendPropey } from './ChipBaseExtendPropey'; // import
import { LowAshGrade, LowAshGradeEnum } from './LowAshGrade'; // import
import { MultiplierGrade, MultiplierGradeEnum } from './MultiplierGrade'; // import
import { OpenTestVoltageGrade, OpenTestVoltageGradeEnum } from './OpenTestVoltageGrade'; // import
import { PWMModel, PWMModelEnum } from './PWMModel';
 // import
export const ChipSM16259ExtendPropertyBase = t.intersection(
  [
    ChipBaseExtendPropey,
    t.type({
      IsShadowsEnable: common.Bool_true, // #115
      MultiplierGrade: common.withDefault(MultiplierGrade, 'EightGrade'), // #128
      ScanTypeUshort: common.UInt8_32, // #141
      LowAshCompensationTwo: common.UInt8_0, // #154
      Gain: common.withDefault(common.UInt8, 57), // #167
      RegValueConfigFirst: common.UInt16_65337, // #182
      LowAshCompensationOne: common.UInt8_0, // #195
      IsOpenTest: common.Bool_false, // #208
      OpenTestVoltageGrade: common.withDefault(OpenTestVoltageGrade, 'OneVoltageGrade'), // #221
      BlankingMode: common.UInt8_2, // #234
      RegValueConfigSecond: common.UInt16_11, // #247
      IsEnergySaving: common.Bool_false, // #260
      ShadowVoltageOne: common.UInt8_0, // #273
      ShadowVoltageTwo: common.UInt8_0, // #286
      PWMModel: common.withDefault(PWMModel, 'OneModel'), // #299
      RegValueConfigThird: common.UInt16_3072, // #325
      RegValueConfigForth: common.UInt16_0,
    }),
    t.partial({
      LowAshGrade,
    }),
  ],
  'ChipSM16259ExtendPropertyBase'
);
/**
 * Codec for {@link ChipSM16259ExtendProperty}
 * @category Codecs
 * @see Automatically generated from ../decompiled/Nova.LCT.GigabitSystem.ChipSM16259.decompiled.cs:76
 */
export const ChipSM16259ExtendProperty = t.intersection(
  [
    ChipSM16259ExtendPropertyBase,
    t.partial({ '@_xsi:type': t.literal('ChipSM16259ExtendProperty') }),
  ],
  'ChipSM16259ExtendProperty'
);
export interface ChipSM16259ExtendProperty extends t.TypeOf<typeof ChipSM16259ExtendProperty> {
  MultiplierGrade: MultiplierGradeEnum;
  OpenTestVoltageGrade: OpenTestVoltageGradeEnum;
  PWMModel: PWMModelEnum;
  LowAshGrade?: LowAshGradeEnum;
}
