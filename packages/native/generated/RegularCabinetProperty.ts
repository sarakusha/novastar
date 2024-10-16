import * as t from 'io-ts';
import * as common from '../lib/common';
import { CabinetType, CabinetTypeEnum } from './CabinetType'; // import
import { LEDModuleProperty } from './LEDModuleProperty'; // import
import { ModuleCascadeDiretion, ModuleCascadeDiretionEnum } from './ModuleCascadeDiretion'; // import
/**
 * Codec for interface {@link RegularCabinetProperty}
 * @category Codecs
 * @see Automatically generated from ../decompiled/Nova.LCT.GigabitSystem.DataClass.decompiled.cs:38417
 */
export const RegularCabinetProperty = t.intersection(
  [
    t.type({
      Name: common.string_empty, // #38434
      CabinetVersion: common.string_20,
    }),
    t.partial({
      ModCascadeType: ModuleCascadeDiretion, // #38446
      CabinetType, // #38458
      Width: common.Int32, // #38460
      Height: common.Int32, // #38462
      PointTableData: common.Base64, // #38464
      ModColsInCabinet: common.UInt8, // #38466
      ModRowsInCabinet: common.UInt8, // #38468
      ModuleProperty: LEDModuleProperty,
    }),
  ],
  'RegularCabinetProperty'
);
export interface RegularCabinetProperty extends t.TypeOf<typeof RegularCabinetProperty> {
  ModCascadeType?: ModuleCascadeDiretionEnum;
  CabinetType?: CabinetTypeEnum;
  ModuleProperty?: LEDModuleProperty;
}
