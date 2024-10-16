import * as t from 'io-ts';
import * as common from '../lib/common';
import { ChipBaseExtendPropey } from './ChipBaseExtendPropey'; // import
import { ChipSCL8081ExtendProperty } from './ChipSCL8081ExtendProperty';
 // import
export const ChipSCL8081RGBVExtendPropertyBase = t.intersection(
  [
    ChipBaseExtendPropey,
    t.type({
      ModelsType: common.UInt8_0, // #910
      ChaPin: common.Int32_60, // #912
      Refershs: common.UInt8_32, // #914
      REG_LENGTH: common.Int32_12,
    }),
    t.partial({
      RedProperty: ChipSCL8081ExtendProperty, // #918
      GreenProperty: ChipSCL8081ExtendProperty, // #920
      BlueProperty: ChipSCL8081ExtendProperty, // #922
      VRedProperty: ChipSCL8081ExtendProperty, // #924
      IsUseNewModule: common.Bool, // #926
      ChipLibVersion: common.UInt8, // #928
      ScanCount: common.UInt8, // #930
      SpecialDataLen: common.Int32, // #942
      SpecialRegisterAddr: common.UInt32, // #944
      RedGain: common.Int32, // #946
      GreenGain: common.Int32, // #959
      BlueGain: common.Int32, // #972
      RedGainT: common.Int32, // #985
      GreenGainT: common.Int32, // #997
      BlueGainT: common.Int32, // #1009
      RedGainB: common.Int32, // #1021
      GreenGainB: common.Int32, // #1033
      BlueGainB: common.Int32,
    }),
  ],
  'ChipSCL8081RGBVExtendPropertyBase'
);
/**
 * Codec for {@link ChipSCL8081RGBVExtendProperty}
 * @category Codecs
 * @see Automatically generated from ../decompiled/Nova.LCT.GigabitSystem.ChipSCL8081.decompiled.cs:907
 */
export const ChipSCL8081RGBVExtendProperty = t.intersection(
  [
    ChipSCL8081RGBVExtendPropertyBase,
    t.partial({ '@_xsi:type': t.literal('ChipSCL8081RGBVExtendProperty') }),
  ],
  'ChipSCL8081RGBVExtendProperty'
);
export interface ChipSCL8081RGBVExtendProperty
  extends t.TypeOf<typeof ChipSCL8081RGBVExtendProperty> {
  RedProperty?: ChipSCL8081ExtendProperty;
  GreenProperty?: ChipSCL8081ExtendProperty;
  BlueProperty?: ChipSCL8081ExtendProperty;
  VRedProperty?: ChipSCL8081ExtendProperty;
}
