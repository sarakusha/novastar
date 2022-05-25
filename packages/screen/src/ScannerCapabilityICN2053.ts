/* eslint-disable no-underscore-dangle,no-bitwise,no-param-reassign */
/**
 * Nova.LCT.GigabitSystem.ScanBoardCapability
 */
import { ChipTypeEnum } from '@novastar/native/ChipType';
import { DataDirectionTypeEnum } from '@novastar/native/DataDirectionType';
import type { ScanBoardProperty } from '@novastar/native/ScanBoardProperty';
import { ScreenDriveTypeEnum } from '@novastar/native/ScreenDriveType';

import {
  CaculateShiftUnitNum,
  GetGclkInfoByPartNumPerRef,
  GetGrayScaleByGclkNumPerRef,
} from './CommonCalculator';
import ScannerCapabilitySUM2030 from './ScannerCapabilitySUM2030';

export default class ScannerCapabilityICN2053 extends ScannerCapabilitySUM2030 {
  UpdateParameters(scanBdProperty: ScanBoardProperty, vsFreq: number): boolean {
    this._scanBdProperty = scanBdProperty;
    const {
      StandardLedModuleProp,
      IsIrRegular,
      Width = 0,
      Height = 0,
      IsSymmetricalOutputMode,
      ShiftUnitNum,
      DclkUnitCycle,
      GCLKRate,
      BlankUnitNumPerScan: blackTime,
      SubFields: partNumPerRef,
    } = scanBdProperty;
    if (!StandardLedModuleProp) throw new TypeError('Unknown StandardLedModuleProp');
    const {
      ModulePixelCols,
      ModulePixelRows,
      TotalPointInTable,
      DataDirectType = DataDirectionTypeEnum.Horizontal,
      ScanType,
      DriverChipType: chipType,
    } = StandardLedModuleProp;
    if (!chipType) throw new TypeError('Unknown chipType');
    if (!IsIrRegular) {
      this._shiftNumPerSubField = CaculateShiftUnitNum(
        ModulePixelCols,
        ModulePixelRows,
        TotalPointInTable,
        DataDirectType,
        Width,
        Height
      );
      if (StandardLedModuleProp.ScreenDriveType === ScreenDriveTypeEnum.Serial)
        this._shiftNumPerSubField *= StandardLedModuleProp.SerialColorNum;
      if (IsSymmetricalOutputMode) this._shiftNumPerSubField >>>= 1;
    } else {
      this._shiftNumPerSubField = ShiftUnitNum;
    }
    scanBdProperty.IsEnableTranCntNum = true;
    scanBdProperty.M1TranCntNum = 3;
    scanBdProperty.M2TranCntNum = 3;

    this._fieldWaitTime = this._scanBdProperty.IsOpenClearBlankLine ? 0.03 : 0.1;
    this._dclkUnitCycle = DclkUnitCycle;
    this._gclkUnitCycle = GCLKRate;
    this._scanCount = ScanType;
    this._fieldPeriod = 1000 / vsFreq;
    this._vsFreq = vsFreq;
    scanBdProperty.RefNumPerVs = this.CaculateAllParameters(chipType, partNumPerRef, blackTime);
    scanBdProperty.GrayDepth = GetGrayScaleByGclkNumPerRef(
      this._gclkNumPerRef -
        (chipType === ChipTypeEnum.Chip_ICN2050 || chipType === ChipTypeEnum.Chip_ICN2053 ? 1 : 0)
    );
    scanBdProperty.TotalGclkUnitNumPerScan = this._totalGclkUintNumPerScan;
    return true;
  }

  private CaculateAllParameters(
    chipType: ChipTypeEnum,
    partNumPerRef: number,
    blackTime: number
  ): number {
    const num = 125 * (this._fieldPeriod - this._fieldWaitTime) * 1000;
    const num2 =
      (5 * (this._shiftNumPerSubField + 8 + 20) + 20 + 20 + 8 + 1) * this._dclkUnitCycle +
      14 * (this._m1TranCntNum + 1 + 1);
    const num3 = this._dclkUnitCycle + this._m1TranCntNum + 1 + 1;
    const { gclkNumPerScan, validGclkNumPerScan, brightGclkNumPerScan } =
      GetGclkInfoByPartNumPerRef(chipType, partNumPerRef);
    this._totalUnitNumPerSubField = Math.floor(
      (((num - num2) / this._scanCount - num3) / 16 - (this._m1TranCntNum + 1) - 1) /
        this._dclkUnitCycle
    );
    if (
      this._scanCount === 1 &&
      chipType !== ChipTypeEnum.Chip_ICN2053 &&
      chipType !== ChipTypeEnum.Chip_ICN2050
    )
      this._totalUnitNumPerSubField -= 160;
    if (
      this._scanCount === 1 &&
      chipType !== ChipTypeEnum.Chip_ICN2053 &&
      chipType !== ChipTypeEnum.Chip_ICN2050 &&
      chipType !== ChipTypeEnum.Chip_VOD5153 &&
      chipType !== ChipTypeEnum.Chip_ICND2163
    ) {
      this._refNumPerVs = 1;
      this._totalGclkUintNumPerScan = gclkNumPerScan;
      this._gclkNumPerRef = Math.floor(((125 / this._gclkUnitCycle) * 1000000) / this._vsFreq);
      this._blackingTime = ScannerCapabilitySUM2030.BLACKTIME_STATIC;
    } else {
      this._blackingTime = blackTime;
      const num5 =
        48 * this._dclkUnitCycle +
        this._gclkUnitCycle +
        4 * (this._m2TranCntNum + 1) +
        4 +
        4 * this._gclkUnitCycle;
      const num6 =
        (gclkNumPerScan + this._blackingTime) * this._scanCount * this._gclkUnitCycle +
        (this._m2TranCntNum + 1 + 1) * 2 * this._scanCount +
        (this._m2TranCntNum + 1) +
        1 +
        this._gclkUnitCycle;
      const num7 = (num - num5) / num6;
      this._refNumPerVs = Math.max(0, Math.floor(num7));
      if (this._refNumPerVs === 0) return 0;
      const num10 =
        (num - num5) / this._refNumPerVs - this._gclkUnitCycle - (this._m2TranCntNum + 1) - 1;
      this._totalGclkUintNumPerScan = Math.floor(
        (num10 / this._scanCount - 2 * (this._m2TranCntNum + 1) - 2) / this._gclkUnitCycle -
          this._blackingTime
      );
      this._gclkNumPerRef = this._refNumPerVs * validGclkNumPerScan;
      const num18 = num - (48 - 1 - 4) * this._dclkUnitCycle;
      const num19 =
        this._refNumPerVs * this._gclkUnitCycle +
        (this._totalGclkUintNumPerScan + this._blackingTime) *
          this._gclkUnitCycle *
          this._scanCount *
          this._refNumPerVs;
      const num20 = 4 + this._refNumPerVs + 2 * this._refNumPerVs * this._scanCount;
      this._m2TranCntNum = Math.min(3, (num18 - num19) / num20 - 2);
    }
    this._brightEfficiency =
      (((this._fieldPeriod - this._fieldWaitTime) / this._fieldPeriod) * brightGclkNumPerScan) /
      (this._totalGclkUintNumPerScan + this._blackingTime);
    return this._refNumPerVs;
  }
}
