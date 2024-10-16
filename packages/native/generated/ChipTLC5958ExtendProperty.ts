import * as t from 'io-ts';
import * as common from '../lib/common';
import { ChipBaseExtendPropey } from './ChipBaseExtendPropey';
 // import
export const ChipTLC5958ExtendPropertyBase = t.intersection(
  [
    ChipBaseExtendPropey,
    t.type({
      GlobalBrightness: common.UInt8_4, // #60944
      RedGain: common.UInt16_256, // #60957
      GreenGain: common.UInt16_256, // #60970
      BlueGain: common.UInt16_256, // #61035
      SetTD0: common.UInt8_1, // #61048
      CheckVoltageSetting: common.UInt8_1,
    }),
    t.partial({
      RedLowAshEnhancedControl: common.UInt8, // #60996
      GreenLowAshEnhancedControl: common.UInt8, // #61009
      BlueLowAshEnhancedControl: common.UInt8, // #61022
      TimingControl: common.Bool, // #61061
      ImproveTheLowAsh: common.UInt8, // #61074
      PWMModelSelecte: common.Bool, // #61087
      RedInhibitoryControlEMI: common.Bool, // #61100
      GreenInhibitoryControlEMI: common.Bool, // #61113
      BlueInhibitoryControlEMI: common.Bool, // #61126
      ChargingMode: common.Bool, // #61139
      EdgeSetGCLK: common.Bool, // #61152
      PowerSavingModeSettings: common.Bool,
    }),
  ],
  'ChipTLC5958ExtendPropertyBase'
);
/**
 * Codec for {@link ChipTLC5958ExtendProperty}
 * @category Codecs
 * @see Automatically generated from ../decompiled/Nova.LCT.GigabitSystem.DataClass.decompiled.cs:60906
 */
export const ChipTLC5958ExtendProperty = t.intersection(
  [
    ChipTLC5958ExtendPropertyBase,
    t.partial({ '@_xsi:type': t.literal('ChipTLC5958ExtendProperty') }),
  ],
  'ChipTLC5958ExtendProperty'
);
export interface ChipTLC5958ExtendProperty extends t.TypeOf<typeof ChipTLC5958ExtendProperty> {}
