import * as t from 'io-ts';
import * as common from '../lib/common';
import { ChipBaseExtendPropey } from './ChipBaseExtendPropey'; // import
import { ChipCFD435AExtendProperty } from './ChipCFD435AExtendProperty'; // import
import { PointDetectParameter } from './PointDetectParameter';
 // import
export const ChipCFD435ARGBVExtendPropertyBase = t.intersection(
  [
    ChipBaseExtendPropey,
    t.partial({
      RedProperty: ChipCFD435AExtendProperty, // #4169
      GreenProperty: ChipCFD435AExtendProperty, // #4171
      BlueProperty: ChipCFD435AExtendProperty, // #4173
      VRedProperty: ChipCFD435AExtendProperty, // #4175
      EnGCLKMutiRate: common.Bool, // #4200
      SubField: common.UInt8, // #4214
      GrayDepth: common.UInt8, // #4235
      IsAdvancedMode: common.Bool, // #4259
      IsUseNewModule: common.Bool, // #4271
      FirstDataLen: common.Int32, // #4273
      FirstStartIndex: common.Int32, // #4275
      FirstRegisterAddr: common.Int32, // #4277
      SecondDataLen: common.Int32, // #4279
      SecondStartIndex: common.Int32, // #4281
      SecondRegisterAddr: common.Int32, // #4283
      ThirdDataLen: common.Int32, // #4285
      ThirdDataStartIndex: common.Int32, // #4287
      ThirdRegisterAddr: common.Int32, // #4289
      FourthDataLen: common.Int32, // #4291
      FourthStartIndex: common.Int32, // #4293
      FourthRegisterAddr: common.Int32, // #4295
      PointDetectParameter, // #4368
    }),
  ],
  'ChipCFD435ARGBVExtendPropertyBase'
);
/**
 * Codec for {@link ChipCFD435ARGBVExtendProperty}
 * @category Codecs
 * @see Automatically generated from ../decompiled/Nova.LCT.GigabitSystem.ChipCFD435A.decompiled.cs:4162
 */
export const ChipCFD435ARGBVExtendProperty = t.intersection(
  [
    ChipCFD435ARGBVExtendPropertyBase,
    t.partial({ '@_xsi:type': t.literal('ChipCFD435ARGBVExtendProperty') }),
  ],
  'ChipCFD435ARGBVExtendProperty'
);
export interface ChipCFD435ARGBVExtendProperty
  extends t.TypeOf<typeof ChipCFD435ARGBVExtendProperty> {
  RedProperty?: ChipCFD435AExtendProperty;
  GreenProperty?: ChipCFD435AExtendProperty;
  BlueProperty?: ChipCFD435AExtendProperty;
  VRedProperty?: ChipCFD435AExtendProperty;
  PointDetectParameter?: PointDetectParameter;
}
