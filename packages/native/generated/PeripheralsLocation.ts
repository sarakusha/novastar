import * as t from 'io-ts';
import * as common from '../lib/common';
import { PeripheralsType, PeripheralsTypeEnum } from './PeripheralsType'; // import
/**
 * Codec for interface {@link PeripheralsLocation}
 * @category Codecs
 * @see Automatically generated from ../decompiled/Nova.LCT.GigabitSystem.DataClass.decompiled.cs:72891
 */
export const PeripheralsLocation = t.partial(
  {
    IsEable: common.Bool, // #72893
    CommPort: t.string, // #72895
    FirstSenderSN: t.string, // #72897
    SensorType: PeripheralsType, // #72899
    SenderIndex: common.Int32, // #72901
    PortIndex: common.Int32, // #72903
    FuncCardIndex: common.Int32, // #72905
    SensorIndex: common.Int32, // #72907
  },
  'PeripheralsLocation'
);
export interface PeripheralsLocation extends t.TypeOf<typeof PeripheralsLocation> {
  SensorType?: PeripheralsTypeEnum;
}
