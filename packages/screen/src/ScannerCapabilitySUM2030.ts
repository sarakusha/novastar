/* eslint-disable no-underscore-dangle */
import type { ScanBoardProperty } from '@novastar/native/lib/generated/ScanBoardProperty';

import ScanBoardCapability from './ScanBoardCapabilty';

export default class ScannerCapabilitySUM2030 implements ScanBoardCapability {
  static readonly SUBDIFF = 0.15;

  static readonly BLACKTIME_STATIC = 5;

  readonly IsHasMinimumOE = false;

  readonly MinimumOE = 0;

  readonly LightTimePerSubField = 0;

  readonly TotalLightCdfResault = 0;

  protected _totalUnitNumPerSubField = 0;

  protected _gclkNumPerRef = 0;

  protected _refNumPerVs = 0;

  protected _totalGclkUintNumPerScan = 0;

  protected _lightTimeNum2 = 0;

  protected _dclkUnitCycle = 0;

  protected _gclkUnitCycle = 0;

  protected _scanCount = 0;

  protected _fieldPeriod = 0;

  protected _vsFreq = 60;

  protected _usBlackTime = 0;

  protected _shiftNumPerSubField = 0;

  protected _maxUnitNumPerScan = 0;

  protected _maxGclkNumPerRef = 0;

  protected _brightEfficiency = 0;

  protected _blackingTime = 0;

  protected _maxLoadedPixels = 0;

  protected _fieldWaitTime = 0.1;

  protected _m1TranCntNum = 3;

  protected _m2TranCntNum = 3;

  protected _scanBdProperty: ScanBoardProperty | null = null;

  get TotalUnitNumPerSubField() {
    return this._totalUnitNumPerSubField;
  }

  get MaxLoadedPixels() {
    return this._totalUnitNumPerSubField - 3;
  }

  get BrightEfficiency() {
    return this._brightEfficiency;
  }

  get GclkNumPerRef() {
    return this._gclkNumPerRef;
  }

  get RefNumPerVs() {
    return this._refNumPerVs;
  }

  get TotalGclkUnitNumPerScan() {
    return this._totalGclkUintNumPerScan;
  }

  get LightTimeNum2() {
    return this._lightTimeNum2;
  }

  // eslint-disable-next-line class-methods-use-this
  UpdateParameters(scanBdProp: ScanBoardProperty, vsFreq: number): boolean {
    throw new TypeError('Not implemented');
  }
}
