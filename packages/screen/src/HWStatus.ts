/* eslint-disable no-bitwise */
import AddressMapping from '@novastar/native/AddressMapping';
import Struct, { ExtractType } from 'typed-struct';

const TempInfo = new Struct('TempInfo')
  .Bits8({ IsValid: [0, 1] })
  .back()
  .Custom('Value', 2, (_, buffer): number => ((buffer[0] & 0x7f) === 1 ? -0.5 : 0.5) * buffer[1])
  .compile();

const ValueInfo = new Struct('ValueInfo')
  .Bits8({
    IsValid: [0, 1],
    Value: [1, 7],
  })
  .compile();

const VoltageInfo = new Struct('VoltageInfo')
  .Bits8({ IsValid: [0, 1] })
  .back()
  .Custom('Value', 1, (_, buffer) => (buffer[0] & 0x7f) / 10)
  .compile();

const FanSpeedInfo = new Struct('FanSpeedInfo')
  .Bits8({ IsValid: [0, 1] })
  .back()
  .Custom('Value', 1, (_, buffer) => (buffer[0] & 0x7f) * 50)
  .compile();

const moduleStatusLow = {
  offset:
    AddressMapping.Scanner_RowLineRelatedInfoOfModuleStatusAddr -
    AddressMapping.Scanner_AllMonitorDataAddr,
  length: AddressMapping.Scanner_RowLineRelatedInfoOfModuleStatusOccupancy,
};

const moduleStatusHigh = {
  offset:
    AddressMapping.Scanner_ModuleStatusOfMonitorCardAddr -
    AddressMapping.Scanner_AllMonitorDataAddr,
  length: AddressMapping.Scanner_ModuleStatusOfMonitorCardBytesCnt,
};

export const HWStatus = new Struct('HWStatus')
  .Struct('tempInfoInScanCard', TempInfo) // 0
  .Struct('humidityInfoInScanCard', ValueInfo) // 2
  .Struct('voltageInfoInScanCard', VoltageInfo) // 3
  .back(0)
  .seek(AddressMapping.AttachedMonitorCardExistAddr - AddressMapping.Scanner_AllMonitorDataAddr)
  .Boolean8('isConnectMonitorCard') // 32
  .back(0)
  .seek(
    AddressMapping.Scanner_TempInfoOfMonitorCardAddr - AddressMapping.Scanner_AllMonitorDataAddr
  )
  .Struct('tempInfoInMonitorCard', TempInfo) // 39
  .Struct('humidityInfoInMonitorCard', ValueInfo) // 41
  .Struct('smokeWarnInfo', ValueInfo) // 42
  .StructArray(
    'fanSpeedInfoListMonitorCard',
    FanSpeedInfo,
    AddressMapping.Scanner_FanSpeedOfMonitorCardNum
  ) // 43
  .StructArray(
    'valtageInfoListMonitorCard',
    VoltageInfo,
    AddressMapping.Scanner_VoltageOfMonitorCardNum
  ) // 47
  .Buffer('analogInputData', AddressMapping.Scanner_AnalogInputOfMonitorCardNum) // 56
  .seek(1)
  .UInt8('generalStatus') // 65
  .back(0)
  .seek(moduleStatusLow.offset)
  .Buffer('moduleStatusLow', moduleStatusLow.length) // 11
  .back(0)
  .seek(moduleStatusHigh.offset)
  .Buffer('moduleStatusHigh', moduleStatusHigh.length) // 66
  .compile(); // 82

export type HWStatus = ExtractType<typeof HWStatus, false>;
