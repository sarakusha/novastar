import * as t from 'io-ts';
import * as common from '../lib/common';
import { ChipBaseExtendPropey } from './ChipBaseExtendPropey'; // import
import { ChipDP3265ExtendProperty } from './ChipDP3265ExtendProperty';
 // import
export const ChipDP3265RGBVExtendPropertyBase = t.intersection(
  [
    ChipBaseExtendPropey,
    t.type({
      REG_LENGTH: common.Int32_14, // #4331
      RefreshNum: common.Int32_32, // #4345
      MaxRefreshNum: common.Int32_64, // #4450
      GammaStepSize: common.UInt8_1, // #4452
      GammaMaxRatio: common.Numeric_1,
    }),
    t.partial({
      RedProperty: ChipDP3265ExtendProperty, // #4303
      GreenProperty: ChipDP3265ExtendProperty, // #4306
      BlueProperty: ChipDP3265ExtendProperty, // #4309
      VRedProperty: ChipDP3265ExtendProperty, // #4312
      RefreshNumPerVs: common.UInt8, // #4348
      LineGclkNum: common.UInt8, // #4351
      R: common.UInt8, // #4365
      BlackScreenDynamicEnergySaving: common.UInt8, // #4379
      HighGrayDataIndependentRefresh: common.UInt8, // #4393
      EnableToRemoveBadPoints: common.Bool, // #4407
      IsAdvancedMode: common.Bool, // #4421
      IsGammaDllMode: common.Bool, // #4433
      IsUseNewModule: common.Bool, // #4446
      SpecialDataLen: common.Int32, // #4448
      SpecialRegisterAddr: common.UInt32, // #4467
      FourthDataLen: common.Int32, // #4482
      FourthStartIndex: common.Int32, // #4484
      FourthRegisterAddr: common.Int32, // #4486
      ErrRedGain: common.Int32, // #4560
      ErrGreenGain: common.Int32, // #4562
      ErrBlueGain: common.Int32, // #4564
      ErrVRedGain: common.Int32, // #4566
      ChipMemberIndex: common.Int32,
    }),
  ],
  'ChipDP3265RGBVExtendPropertyBase'
);
/**
 * Codec for {@link ChipDP3265RGBVExtendProperty}
 * @category Codecs
 * @see Automatically generated from ../decompiled/Nova.LCT.GigabitSystem.ChipDP3265.decompiled.cs:4296
 */
export const ChipDP3265RGBVExtendProperty = t.intersection(
  [
    ChipDP3265RGBVExtendPropertyBase,
    t.partial({ '@_xsi:type': t.literal('ChipDP3265RGBVExtendProperty') }),
  ],
  'ChipDP3265RGBVExtendProperty'
);
export interface ChipDP3265RGBVExtendProperty
  extends t.TypeOf<typeof ChipDP3265RGBVExtendProperty> {
  RedProperty?: ChipDP3265ExtendProperty;
  GreenProperty?: ChipDP3265ExtendProperty;
  BlueProperty?: ChipDP3265ExtendProperty;
  VRedProperty?: ChipDP3265ExtendProperty;
}
