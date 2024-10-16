import * as t from 'io-ts';
import * as common from '../lib/common';
import { ValueInfo } from './ValueInfo'; // import
/**
 * Codec for interface {@link OneModuleInfo}
 * @category Codecs
 * @see Automatically generated from ../decompiled/Nova.LCT.GigabitSystem.DataClass.decompiled.cs:76216
 */
export const OneModuleInfo = t.partial(
  {
    IsConnectModule: common.Bool, // #76219
    PowerInfo: ValueInfo, // #76221
    TemperInfo: ValueInfo, // #76223
    WorkTime: common.Int32, // #76225
    ModuleStatusBytes: common.Base64, // #76227
  },
  'OneModuleInfo'
);
export interface OneModuleInfo extends t.TypeOf<typeof OneModuleInfo> {
  PowerInfo?: ValueInfo;
  TemperInfo?: ValueInfo;
}
