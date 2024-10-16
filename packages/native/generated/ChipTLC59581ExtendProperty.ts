import * as t from 'io-ts';
import * as common from '../lib/common';
import { ChipBaseExtendPropey } from './ChipBaseExtendPropey';
 // import
export const ChipTLC59581ExtendPropertyBase = t.intersection(
  [
    ChipBaseExtendPropey,
    t.type({
      GlobalBrightness: common.UInt8_4, // #61272
      RedGain: common.UInt16_256, // #61285
      GreenGain: common.UInt16_256, // #61298
      BlueGain: common.UInt16_256, // #61376
      SetTD0: common.UInt8_1, // #61415
      GamaValue: common.UInt8_255, // #61428
      RedNegVoltageCtrl: common.UInt8_3, // #61440
      GreenNegVoltageCtrl: common.UInt8_3, // #61453
      BlueNegVoltageCtrl: common.UInt8_3,
    }),
    t.partial({
      RedInhibitoryControlEMI: common.Bool, // #61324
      GreenInhibitoryControlEMI: common.Bool, // #61337
      BlueInhibitoryControlEMI: common.Bool, // #61350
      PrechargeModeControl: common.UInt8, // #61363
      CaterpillarElimination: common.UInt8, // #61389
      EdgeSetGCLK: common.UInt8, // #61402
      PWMModelSelecte: common.Bool, // #61466
      RedInterference: common.UInt8, // #61479
      GreenInterference: common.UInt8, // #61492
      BlueInterference: common.UInt8, // #61505
      HardwarePar: common.UInt8, // #61518
      PowerSavingModeSettings: common.Bool, // #61531
      RedLowGrayscaleUniformity: common.UInt8, // #61544
      GreenLowGrayscaleUniformity: common.UInt8, // #61557
      BlueLowGrayscaleUniformity: common.UInt8, // #61570
      HighLightInterference: common.Bool,
    }),
  ],
  'ChipTLC59581ExtendPropertyBase'
);
/**
 * Codec for {@link ChipTLC59581ExtendProperty}
 * @category Codecs
 * @see Automatically generated from ../decompiled/Nova.LCT.GigabitSystem.DataClass.decompiled.cs:61220
 */
export const ChipTLC59581ExtendProperty = t.intersection(
  [
    ChipTLC59581ExtendPropertyBase,
    t.partial({ '@_xsi:type': t.literal('ChipTLC59581ExtendProperty') }),
  ],
  'ChipTLC59581ExtendProperty'
);
export interface ChipTLC59581ExtendProperty extends t.TypeOf<typeof ChipTLC59581ExtendProperty> {}
