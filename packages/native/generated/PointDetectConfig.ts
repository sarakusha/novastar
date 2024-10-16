import * as t from 'io-ts';
import * as common from '../lib/common';
import { ChipType, ChipTypeEnum } from './ChipType'; // import
import { DetectPointType, DetectPointTypeEnum } from './DetectPointType'; // import
import { ThresholdType, ThresholdTypeEnum } from './ThresholdType'; // import
/**
 * Codec for interface {@link PointDetectConfig}
 * @category Codecs
 * @see Automatically generated from ../decompiled/Nova.GigabitController.ProgramInnerData.decompiled.cs:487
 */
export const PointDetectConfig = t.intersection(
  [
    t.type({
      ScreenSN: common.string_empty, // #520
      ComPort: common.string_empty, // #532
      ScreenIndex: common.Int32_0, // #544
      ScreenChipType: common.withDefault(ChipType, 'Unknown'), // #556
      DetectType: common.withDefault(DetectPointType, 'None'), // #568
      DetectThreshold: common.withDefault(ThresholdType, 'None'), // #580
      IsUseGain: common.Bool_true, // #592
      DetectRedGainStep: common.Int32_32, // #604
      DetectGreenGainStep: common.Int32_32, // #616
      DetectBlueGainStep: common.Int32_32, // #628
      IsSynchronousGain: common.Bool_true, // #640
      IsUsedResistor: common.Bool_false, // #652
      RedResistor: common.Int32_300, // #664
      GreenResistor: common.Int32_300, // #676
      BlueResistor: common.Int32_300,
    }),
    t.partial({}),
  ],
  'PointDetectConfig'
);
export interface PointDetectConfig extends t.TypeOf<typeof PointDetectConfig> {
  ScreenChipType: ChipTypeEnum;
  DetectType: DetectPointTypeEnum;
  DetectThreshold: ThresholdTypeEnum;
}
