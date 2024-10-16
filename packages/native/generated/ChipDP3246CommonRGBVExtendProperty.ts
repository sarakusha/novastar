import * as t from 'io-ts';
import * as common from '../lib/common';
import { ChipBaseExtendPropey } from './ChipBaseExtendPropey'; // import
import { ChipDP3246CommonExtendProperty } from './ChipDP3246CommonExtendProperty';
 // import
export const ChipDP3246CommonRGBVExtendPropertyBase = t.intersection(
  [
    ChipBaseExtendPropey,
    t.partial({
      RedProperty: ChipDP3246CommonExtendProperty, // #4311
      GreenProperty: ChipDP3246CommonExtendProperty, // #4313
      BlueProperty: ChipDP3246CommonExtendProperty, // #4315
      VRedProperty: ChipDP3246CommonExtendProperty, // #4317
      ClkDataTransMode: common.UInt8, // #4321
      BlackScreenEnergySaving: common.Bool, // #4335
      EnableToRemoveBadPoints: common.Bool, // #4349
      IsAdvancedMode: common.Bool, // #4363
      IsUseNewModule: common.Bool, // #4375
      ChipLibVersion: common.UInt8, // #4377
      FirstDataLen: common.Int32, // #4379
      FirstStartIndex: common.Int32, // #4381
      FirstRegisterAddr: common.Int32, // #4383
      SecondDataLen: common.Int32, // #4385
      SecondStartIndex: common.Int32, // #4387
      SecondRegisterAddr: common.Int32, // #4389
      ThirdDataLen: common.Int32, // #4391
      ThirdDataStartIndex: common.Int32, // #4393
      ThirdRegisterAddr: common.Int32, // #4395
      FourthDataLen: common.Int32, // #4397
      FourthStartIndex: common.Int32, // #4399
      FourthRegisterAddr: common.Int32, // #4401
      ErrRedGain: common.Int32, // #4475
      ErrGreenGain: common.Int32, // #4487
      ErrBlueGain: common.Int32, // #4499
      ErrVRedGain: common.Int32, // #4511
    }),
  ],
  'ChipDP3246CommonRGBVExtendPropertyBase'
);
/**
 * Codec for {@link ChipDP3246CommonRGBVExtendProperty}
 * @category Codecs
 * @see Automatically generated from ../decompiled/Nova.LCT.GigabitSystem.ChipDP3246Common.decompiled.cs:4306
 */
export const ChipDP3246CommonRGBVExtendProperty = t.intersection(
  [
    ChipDP3246CommonRGBVExtendPropertyBase,
    t.partial({ '@_xsi:type': t.literal('ChipDP3246CommonRGBVExtendProperty') }),
  ],
  'ChipDP3246CommonRGBVExtendProperty'
);
export interface ChipDP3246CommonRGBVExtendProperty
  extends t.TypeOf<typeof ChipDP3246CommonRGBVExtendProperty> {
  RedProperty?: ChipDP3246CommonExtendProperty;
  GreenProperty?: ChipDP3246CommonExtendProperty;
  BlueProperty?: ChipDP3246CommonExtendProperty;
  VRedProperty?: ChipDP3246CommonExtendProperty;
}
