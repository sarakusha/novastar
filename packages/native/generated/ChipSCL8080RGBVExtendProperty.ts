import * as t from 'io-ts';
import * as common from '../lib/common';
import { ChipBaseExtendPropey } from './ChipBaseExtendPropey'; // import
import { ChipSCL8080ExtendProperty } from './ChipSCL8080ExtendProperty';
 // import
export const ChipSCL8080RGBVExtendPropertyBase = t.intersection(
  [
    ChipBaseExtendPropey,
    t.partial({
      RedProperty: ChipSCL8080ExtendProperty, // #373
      GreenProperty: ChipSCL8080ExtendProperty, // #375
      BlueProperty: ChipSCL8080ExtendProperty, // #377
      VRedProperty: ChipSCL8080ExtendProperty, // #379
      ScanType: common.UInt8, // #385
      ChipLibVersion: common.UInt8, // #404
      IsAdvancedMode: common.Bool, // #406
      FirstDataLen: common.Int32, // #408
      FirstStartIndex: common.Int32, // #410
      FirstRegisterAddr: common.Int32, // #412
      SecondDataLen: common.Int32, // #414
      SecondStartIndex: common.Int32, // #416
      SecondRegisterAddr: common.Int32, // #418
      ThirdRegisterAddr: common.Int32, // #420
      ThirdDataLen: common.Int32, // #422
      ThirdDataStartIndex: common.Int32, // #424
      IsUseNewModule: common.Bool, // #426
    }),
  ],
  'ChipSCL8080RGBVExtendPropertyBase'
);
/**
 * Codec for {@link ChipSCL8080RGBVExtendProperty}
 * @category Codecs
 * @see Automatically generated from ../decompiled/Nova.LCT.GigabitSystem.ChipSCL8080.decompiled.cs:368
 */
export const ChipSCL8080RGBVExtendProperty = t.intersection(
  [
    ChipSCL8080RGBVExtendPropertyBase,
    t.partial({ '@_xsi:type': t.literal('ChipSCL8080RGBVExtendProperty') }),
  ],
  'ChipSCL8080RGBVExtendProperty'
);
export interface ChipSCL8080RGBVExtendProperty
  extends t.TypeOf<typeof ChipSCL8080RGBVExtendProperty> {
  RedProperty?: ChipSCL8080ExtendProperty;
  GreenProperty?: ChipSCL8080ExtendProperty;
  BlueProperty?: ChipSCL8080ExtendProperty;
  VRedProperty?: ChipSCL8080ExtendProperty;
}
