import * as t from 'io-ts';
import * as common from '../lib/common';
import { AdjustMode, AdjustModeEnum } from './AdjustMode'; // import
import { LightSensorData } from './LightSensorData'; // import
/**
 * Codec for interface {@link SetBrightData}
 * @category Codecs
 * @see Automatically generated from ../decompiled/Nova.LCT.GigabitSystem.ProtocolEnum.decompiled.cs:126
 */
export const SetBrightData = t.intersection(
  [
    t.type({
      PosNumber: common.UInt8_255, // #174
      SectionNumber: common.UInt8_255, // #186
      MaxLuxData: common.UInt16_65535, // #198
      MinLuxData: common.UInt16_65535, // #210
      MaxAdjustBright: common.UInt8_255, // #222
      MinAdjustBright: common.UInt8_255, // #234
      LightSensorDataList: common.XMLArray(LightSensorData, 'LightSensorData'),
    }),
    t.partial({
      IsHWAutoBright: common.Bool, // #150
      IsConfigurationSetted: common.Bool, // #246
      SelectAdjustMode: AdjustMode,
    }),
  ],
  'SetBrightData'
);
export interface SetBrightData extends t.TypeOf<typeof SetBrightData> {
  SelectAdjustMode?: AdjustModeEnum;
}
