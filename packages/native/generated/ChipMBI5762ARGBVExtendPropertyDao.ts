import * as t from 'io-ts';
import * as common from '../lib/common';
import { ChipBaseExtendPropey } from './ChipBaseExtendPropey'; // import
import { ChipMBI5762AExtendPropertyDao } from './ChipMBI5762AExtendPropertyDao';
 // import
export const ChipMBI5762ARGBVExtendPropertyDaoBase = t.intersection(
  [
    ChipBaseExtendPropey,
    t.type({
      REG_LENGTH: common.Int32_128,
    }),
    t.partial({
      RedProperty: ChipMBI5762AExtendPropertyDao, // #4338
      GreenProperty: ChipMBI5762AExtendPropertyDao, // #4341
      BlueProperty: ChipMBI5762AExtendPropertyDao, // #4344
      VRedProperty: ChipMBI5762AExtendPropertyDao, // #4347
      IsUseNewModule: common.Bool, // #4350
      ChipLibVersion: common.UInt8, // #4352
      ScanType: common.UInt8, // #4354
      GrayDepth: common.UInt8, // #4368
      SubField: common.UInt8, // #4382
      LowGrayHomogeneityEnhance: common.UInt8, // #4396
      LineScanSynchronization: common.Bool, // #4410
      HighGrayMissTimeOne: common.UInt8, // #4424
      BlankingTime: common.UInt16, // #4438
      GrayScaleEnhanceMode: common.Bool, // #4453
      RemoveBadPointsEnable: common.Bool, // #4467
      DIV: common.UInt8, // #4481
      GradientTransitionOptimizationTime: common.UInt16, // #4495
      CoefficientM: common.UInt8, // #4510
      GetCoefficientMValue: common.UInt8, // #4526
      DLLRange: common.Bool, // #4550
      DCLKReset: common.Bool, // #4566
      DigitalReset: common.Bool, // #4582
      DLLFunction: common.UInt8, // #4598
      EnhanceDynamicPlusPowerSaving: common.Bool, // #4614
      PowerSavingMode: common.Bool, // #4630
      PerFrameOriginWaitTime: common.UInt16, // #4646
      DLLReset: common.Bool, // #4660
      AdvanceLowGrayscaleColorShiftCompensationOne: common.UInt8, // #4676
      AdvanceLowGrayscaleUniformityOptimization: common.UInt8, // #4692
      GradientCompensation: common.Bool, // #4708
      NTimesRefreshFun: common.Bool, // #4724
      NTimesRefreshNumber: common.UInt8, // #4740
      LowGrayColorCompensationThreeR: common.UInt8, // #4756
      LowGrayColorCompensationThreeG: common.UInt8, // #4773
      LowGrayColorCompensationThreeB: common.UInt8, // #4790
      LowGrayColorCompensationFourR: common.UInt8, // #4807
      LowGrayColorCompensationFourG: common.UInt8, // #4824
      LowGrayColorCompensationFourB: common.UInt8, // #4841
      LowGrayColorCompensationFiveR: common.UInt8, // #4858
      LowGrayColorCompensationFiveG: common.UInt8, // #4872
      LowGrayColorCompensationFiveB: common.UInt8, // #4886
      IsAdvancedMode: common.Bool, // #4900
      SpecialDataLen: common.Int32, // #4912
      SpecialRegisterAddr: common.UInt32,
    }),
  ],
  'ChipMBI5762ARGBVExtendPropertyDaoBase'
);
/**
 * Codec for {@link ChipMBI5762ARGBVExtendPropertyDao}
 * @category Codecs
 * @see Automatically generated from ../decompiled/Nova.LCT.GigabitSystem.ChipMBI5762C.decompiled.cs:4327
 */
export const ChipMBI5762ARGBVExtendPropertyDao = t.intersection(
  [
    ChipMBI5762ARGBVExtendPropertyDaoBase,
    t.partial({ '@_xsi:type': t.literal('ChipMBI5762ARGBVExtendPropertyDao') }),
  ],
  'ChipMBI5762ARGBVExtendPropertyDao'
);
export interface ChipMBI5762ARGBVExtendPropertyDao
  extends t.TypeOf<typeof ChipMBI5762ARGBVExtendPropertyDao> {
  RedProperty?: ChipMBI5762AExtendPropertyDao;
  GreenProperty?: ChipMBI5762AExtendPropertyDao;
  BlueProperty?: ChipMBI5762AExtendPropertyDao;
  VRedProperty?: ChipMBI5762AExtendPropertyDao;
}
