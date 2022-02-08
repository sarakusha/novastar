// Nova.LCT.GigabitSystem.LEDConfigAccessorBase.dll
import { notEmpty } from '@novastar/codec';
import { makeStruct } from '@novastar/native/build/main/common';
import { AutoAdjustRefreshRateParameters } from '@novastar/native/build/main/generated/AutoAdjustRefreshRateParameters';
import { AutoAdjustRefreshRateTypeEnum } from '@novastar/native/build/main/generated/AutoAdjustRefreshRateType';
import { ChipTypeEnum } from '@novastar/native/build/main/generated/ChipType';
import MaxValue from '@novastar/native/build/main/generated/MaxValue';
import type { ScanBoardProperty } from '@novastar/native/build/main/generated/ScanBoardProperty';
import { ScreenDriveTypeEnum } from '@novastar/native/build/main/generated/ScreenDriveType';

import { AutoRefreshRate } from './AutoRefreshRate';
import { CanManualAdjustRefreshRate } from './ChipInherentProperties';
import {
  CaculateMaxloadSize,
  isValidScanBdProp,
  isValidStandardLedModuleProp,
} from './CommonCalculator';
import ScannerCapabilityICN2053 from './ScannerCapabilityICN2053';

export const OneParameterLen = 16;

export const AllParameterNumberLen = 128;

export const GetRateFromRateType = (rateType: AutoAdjustRefreshRateTypeEnum): number => {
  let rateFromRateType: number;
  switch (rateType % 16) {
    case 0:
      rateFromRateType = 50;
      break;
    case 1:
      rateFromRateType = 60;
      break;
    case 2:
      rateFromRateType = 75;
      break;
    case 3:
      rateFromRateType = 120;
      break;
    case 4:
      rateFromRateType = 48;
      break;
    case 5:
      rateFromRateType = 30;
      break;
    case 6:
      rateFromRateType = 85;
      break;
    case 7:
      rateFromRateType = 100;
      break;
    case 8:
      rateFromRateType = 24;
      break;
    case 9:
      rateFromRateType = 72;
      break;
    case 10:
      rateFromRateType = 25;
      break;
    case 11:
      rateFromRateType = 240;
      break;
    case 12:
      rateFromRateType = 144;
      break;
    default:
      rateFromRateType = 60;
  }
  switch (rateType / 16) {
    case 1:
      rateFromRateType -= 0.05;
      break;
    case 2:
      rateFromRateType -= 0.1;
      break;
    case 3:
      rateFromRateType += 0.05;
      break;
    case 4:
      rateFromRateType += 0.1;
      break;
    case 5:
      rateFromRateType += 0.15;
      break;
    case 6:
      rateFromRateType += 0.2;
      break;
    case 7:
      rateFromRateType += 0.25;
      break;
    default:
      throw new TypeError('Invalid AutoAdjustRefreshRateTypeEnum');
  }
  return rateFromRateType;
};

export const CheckIsModeSupport = (
  scanBdProperty: Readonly<ScanBoardProperty>,
  fieldRate: number
): [boolean, ScanBoardProperty] => {
  if (!isValidScanBdProp(scanBdProperty)) throw new TypeError('Invalid ScanBoardProperty');
  const { StandardLedModuleProp, Width, Height } = scanBdProperty;
  if (!isValidStandardLedModuleProp(StandardLedModuleProp))
    throw new TypeError('Invalid StandardLedModuleProp');
  const { DriverChipType, ScreenDriveType, SerialColorNum } = StandardLedModuleProp;
  // ChipDataMaker.GetChipInfo <- skipped
  if (DriverChipType !== ChipTypeEnum.Chip_ICN2053) throw new Error('Not implemented');
  const result = { ...scanBdProperty };
  const scanBoardCapability = new ScannerCapabilityICN2053();
  scanBoardCapability.UpdateParameters(result, fieldRate);
  const k = ScreenDriveType === ScreenDriveTypeEnum.Serial ? SerialColorNum : 1;
  const { maxWidth, maxHeight } = CaculateMaxloadSize(
    result,
    scanBoardCapability.MaxLoadedPixels / k,
    MaxValue.MAX_SCANNER_AREA
  );
  result.TotalUnitNum = scanBoardCapability.TotalUnitNumPerSubField;
  result.TotalGclkUnitNumPerScan = scanBoardCapability.TotalGclkUnitNumPerScan;
  result.LightTime = scanBoardCapability.LightTimePerSubField;
  result.LightTimeNum2 = scanBoardCapability.LightTimeNum2;
  return [maxWidth >= Width && maxHeight >= Height, result];
};

export const SetVariousScanBdRefreshRate = (
  scanBdProperty: Readonly<ScanBoardProperty>,
  isSmartMode: boolean
): ReadonlyArray<Required<AutoAdjustRefreshRateParameters>> => {
  const { StandardLedModuleProp: { DriverChipType: chipType, ScanType: scanType } = {} } =
    scanBdProperty;
  if (chipType === undefined || scanType === undefined)
    throw new TypeError('Invalid ScanBoardProperty');
  return Object.values(AutoAdjustRefreshRateTypeEnum)
    .map(Number)
    .filter<AutoAdjustRefreshRateTypeEnum>(notEmpty)
    .map(rateType => {
      let prop: ScanBoardProperty | undefined;
      const rateFromRateType = GetRateFromRateType(rateType);
      if (!isSmartMode) {
        if (CanManualAdjustRefreshRate(chipType, scanType)) {
          throw new Error('Not implemented');
        }
        const [isSupport, res] = CheckIsModeSupport(scanBdProperty, rateFromRateType);
        if (isSupport || res.TotalUnitNum - 3 >= res.ShiftUnitNum) prop = res;
      }
      const {
        TotalUnitNum,
        TotalGclkUnitNumPerScan,
        RefNumPerVs,
        GCLKRate,
        IsEnableTranCntNum,
        M1TranCntNum,
        M2TranCntNum,
        LightTime,
        LightTimeNum2,
      } = prop ?? scanBdProperty;
      return makeStruct(AutoAdjustRefreshRateParameters, {
        AdjustRateType: rateType,
        TotalUnitNum,
        TotalGclkUnitNumPerScan,
        RefNumPerVs,
        GCLKRate,
        IsEnableTranCntNum,
        M1TranCntNum,
        M2TranCntNum,
        LightTime,
        LightTimeNum2,
      });
    });
};

export const GetAutoRefreshRateBytesSeq = (
  autoRateParamList: ReadonlyArray<Required<AutoAdjustRefreshRateParameters>>
): Buffer => {
  const buffer = Buffer.alloc(OneParameterLen * AllParameterNumberLen);
  autoRateParamList.forEach(({ AdjustRateType, ...props }) => {
    const data = new AutoRefreshRate(OneParameterLen);
    Object.assign(data, props);
    AutoRefreshRate.raw(data).copy(buffer, AdjustRateType * OneParameterLen);
  });
  return buffer;
};
