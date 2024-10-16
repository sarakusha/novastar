import * as t from 'io-ts';
import * as common from '../lib/common';
import { LEDModuleProperty } from './LEDModuleProperty'; // import
import { ModuleGroupInCabinet } from './ModuleGroupInCabinet'; // import
/**
 * Codec for interface {@link ModuleInIrRegularCabinet}
 * @category Codecs
 * @see Automatically generated from ../decompiled/Nova.LCT.GigabitSystem.DataClass.decompiled.cs:27564
 */
export const ModuleInIrRegularCabinet = t.intersection(
  [
    t.type({
      GroupInfoInCabinet: common.XMLArray(ModuleGroupInCabinet, 'ModuleGroupInCabinet'),
    }),
    t.partial({
      Id: t.string, // #27567
      ModuleProperty: LEDModuleProperty, // #27569
      HubIndex: common.Int32, // #27571
      XInCabinet: common.Int32, // #27573
      YInCabinet: common.Int32, // #27575
      PixelColInCabinet: common.Int32, // #27577
      PixelRowInCabinet: common.Int32, // #27581
      IsSector: common.Bool, // #27583
      SectorPoint: common.PointFromString,
    }),
  ],
  'ModuleInIrRegularCabinet'
);
export interface ModuleInIrRegularCabinet extends t.TypeOf<typeof ModuleInIrRegularCabinet> {
  ModuleProperty?: LEDModuleProperty;
}
