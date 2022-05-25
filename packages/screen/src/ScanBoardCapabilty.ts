import type { ScanBoardProperty } from '@novastar/native/ScanBoardProperty';

/**
 * Nova.LCT.GigabitSystem.ScanBoardCapability
 */
export default interface ScanBoardCapability {
  readonly TotalUnitNumPerSubField: number; // int

  readonly MaxLoadedPixels: number; // int

  readonly BrightEfficiency: number; // float

  readonly IsHasMinimumOE: boolean;

  readonly MinimumOE: number; // int

  readonly TotalGclkUnitNumPerScan: number;

  readonly LightTimePerSubField: number;

  readonly LightTimeNum2: number;

  readonly TotalLightCdfResault: number;

  UpdateParameters(scanBdProp: ScanBoardProperty, vsFreq: number): boolean;
}
