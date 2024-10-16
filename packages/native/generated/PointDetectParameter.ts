import * as t from 'io-ts';
import * as common from '../lib/common';
import { DetectPointType, DetectPointTypeEnum } from './DetectPointType'; // import
import { RegisterGroupType, RegisterGroupTypeEnum } from './RegisterGroupType'; // import
import { ThresholdType, ThresholdTypeEnum } from './ThresholdType'; // import
/**
 * Codec for interface {@link PointDetectParameter}
 * @category Codecs
 * @see Automatically generated from ../decompiled/Nova.LCT.GigabitSystem.DataClass.decompiled.cs:857
 */
export const PointDetectParameter = t.partial(
  {
    DetectType: DetectPointType, // #859
    IsUseThreshold: common.Bool, // #861
    Threshold: ThresholdType, // #863
    ThresholdGradeCount: common.Int32, // #865
    IsNeedConfigRegister: common.Bool, // #867
    ConfigGroupType: RegisterGroupType, // #869
    TheTallyMode: common.UInt8, // #871
    DetectTypeValue: common.Int32, // #873
  },
  'PointDetectParameter'
);
export interface PointDetectParameter extends t.TypeOf<typeof PointDetectParameter> {
  DetectType?: DetectPointTypeEnum;
  Threshold?: ThresholdTypeEnum;
  ConfigGroupType?: RegisterGroupTypeEnum;
}
