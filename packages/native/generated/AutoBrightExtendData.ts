import * as t from 'io-ts';
import * as common from '../lib/common';
import { AutoBrightCalcType, AutoBrightCalcTypeEnum } from './AutoBrightCalcType'; // import
import { DisplayAutoBrightMapping } from './DisplayAutoBrightMapping'; // import
import { OpticalProbeFailureInfo } from './OpticalProbeFailureInfo'; // import
import { PeripheralsLocation } from './PeripheralsLocation'; // import
import { SetBrightData } from './SetBrightData'; // import
/**
 * Codec for interface {@link AutoBrightExtendData}
 * @category Codecs
 * @see Automatically generated from ../decompiled/Nova.LCT.GigabitSystem.DataClass.decompiled.cs:73390
 */
export const AutoBrightExtendData = t.intersection(
  [
    t.type({
      AutoBrightMappingList: common.XMLArray(DisplayAutoBrightMapping, 'DisplayAutoBrightMapping'), // #73395
      UseLightSensorList: common.XMLArray(PeripheralsLocation, 'PeripheralsLocation'),
    }),
    t.partial({
      CalcType: AutoBrightCalcType, // #73397
      OpticalFailureInfo: OpticalProbeFailureInfo, // #73399
      SetBrightData,
    }),
  ],
  'AutoBrightExtendData'
);
export interface AutoBrightExtendData extends t.TypeOf<typeof AutoBrightExtendData> {
  CalcType?: AutoBrightCalcTypeEnum;
  OpticalFailureInfo?: OpticalProbeFailureInfo;
  SetBrightData?: SetBrightData;
}
