import * as t from 'io-ts';
import * as common from '../lib/common';
import { EnLightSensorSite, EnLightSensorSiteEnum } from './EnLightSensorSite'; // import
/**
 * Codec for interface {@link LightSensorData}
 * @category Codecs
 * @see Automatically generated from ../decompiled/Nova.LCT.GigabitSystem.ProtocolEnum.decompiled.cs:464
 */
export const LightSensorData = t.intersection(
  [
    t.type({
      POS_STORAGE_SPACE: common.Int32_16, // #474
      LightSensorSite: common.withDefault(EnLightSensorSite, 'None'), // #476
      FunctionCardPosSite: common.UInt16_65535, // #488
      PortAddrPosSite: common.UInt8_255, // #500
      PosInFunctionCardAddr: common.UInt8_255,
    }),
    t.partial({}),
  ],
  'LightSensorData'
);
export interface LightSensorData extends t.TypeOf<typeof LightSensorData> {
  LightSensorSite: EnLightSensorSiteEnum;
}
