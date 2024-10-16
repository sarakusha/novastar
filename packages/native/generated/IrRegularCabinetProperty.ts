import * as t from 'io-ts';
import * as common from '../lib/common';
import { CabinetType, CabinetTypeEnum } from './CabinetType'; // import
import { ModuleInIrRegularCabinet } from './ModuleInIrRegularCabinet'; // import
/**
 * Codec for interface {@link IrRegularCabinetProperty}
 * @category Codecs
 * @see Automatically generated from ../decompiled/Nova.LCT.GigabitSystem.DataClass.decompiled.cs:27524
 */
export const IrRegularCabinetProperty = t.intersection(
  [
    t.type({
      Name: common.string_empty, // #27648
      CabinetVersion: common.string_20, // #27688
      ModuleListInCabinet: common.XMLArray(ModuleInIrRegularCabinet, 'ModuleInIrRegularCabinet'),
    }),
    t.partial({
      PhysicalDataGroupNum: common.Int32, // #27660
      CabinetType, // #27672
      Width: common.Int32, // #27674
      Height: common.Int32, // #27676
      MaxSumOfScanPointInGroup: common.Int32, // #27678
      PointTableData: common.Base64, // #27690
      PumpModel: common.Int32, // #27692
      pumpGroupsLines: common.Base64, // #27704
      PumpWidthReduction: common.Int32, // #27716
      PumpHeightReduction: common.Int32, // #27728
      RelativeXPoint: common.Int32, // #27740
      RelativeYPoint: common.Int32, // #27742
      CoordinateOfGroupsJsonStr: t.string,
    }),
  ],
  'IrRegularCabinetProperty'
);
export interface IrRegularCabinetProperty extends t.TypeOf<typeof IrRegularCabinetProperty> {
  CabinetType?: CabinetTypeEnum;
}
