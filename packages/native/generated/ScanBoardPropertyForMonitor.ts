import * as t from 'io-ts';
import * as common from '../lib/common';
import { CommonIrCabinetType, CommonIrCabinetTypeEnum } from './CommonIrCabinetType'; // import
import { CorrectType, CorrectTypeEnum } from './CorrectType'; // import
import { DataGroupOutPutMode, DataGroupOutPutModeEnum } from './DataGroupOutPutMode'; // import
import { FlashTopology } from './FlashTopology'; // import
import { IrRegularCabinetProperty } from './IrRegularCabinetProperty'; // import
import { LEDModuleProperty } from './LEDModuleProperty'; // import
import { ModuleCascadeDiretion, ModuleCascadeDiretionEnum } from './ModuleCascadeDiretion'; // import
/**
 * Codec for interface {@link ScanBoardPropertyForMonitor}
 * @category Codecs
 * @see Automatically generated from ../decompiled/Nova.LCT.GigabitSystem.DataClass.decompiled.cs:26626
 */
export const ScanBoardPropertyForMonitor = t.intersection(
  [
    t.type({
      Width: common.Int32_32, // #26637
      Height: common.Int32_16, // #26639
      ModuleCols: common.Int32_1, // #26641
      ModuleRows: common.Int32_1, // #26643
      PhysicalDataGroupNum: common.Int32_2, // #26645
      LogicalDataGroupNum: common.Int32_8, // #26647
      IsConnectSmartModule: common.Bool_true, // #26655
      DclkHighRatio: common.UInt8_50,
    }),
    t.partial({
      Exceed256DataIsValid: common.Bool, // #26629
      IsKillMode: common.Bool, // #26631
      IsIrRegular: common.Bool, // #26633
      StandardLedModuleProp: LEDModuleProperty, // #26649
      IsConnectHubMonitor: common.Bool, // #26651
      IsSymmetricalOutputMode: common.Bool, // #26653
      CorrectionMode: CorrectType, // #26657
      TinyAfterglowMoment: common.Int32, // #26659
      CommonIrCabinetMode: CommonIrCabinetType, // #26661
      DataGroupOutPutType: DataGroupOutPutMode, // #26663
      ModCascadeType: ModuleCascadeDiretion, // #26665
      IrCabinetProp: IrRegularCabinetProperty, // #26667
      TwentyDataGroupEnable: common.Bool, // #26669
      GroupSwapEnable: common.Bool, // #26671
      GroupSwapInfo: common.buffer_MAX_SCANNER_DATAGROUP, // #26673
      IsEnableMonitorRGB: common.Bool, // #26675
      MonitorRGBCode: common.buffer_COLOR_COUNT, // #26677
      FlashPTopology: FlashTopology,
    }),
  ],
  'ScanBoardPropertyForMonitor'
);
export interface ScanBoardPropertyForMonitor extends t.TypeOf<typeof ScanBoardPropertyForMonitor> {
  StandardLedModuleProp?: LEDModuleProperty;
  CorrectionMode?: CorrectTypeEnum;
  CommonIrCabinetMode?: CommonIrCabinetTypeEnum;
  DataGroupOutPutType?: DataGroupOutPutModeEnum;
  ModCascadeType?: ModuleCascadeDiretionEnum;
  IrCabinetProp?: IrRegularCabinetProperty;
  FlashPTopology?: FlashTopology;
}
