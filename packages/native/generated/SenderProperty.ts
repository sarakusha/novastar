import * as t from 'io-ts';
import * as common from '../lib/common';
import { AudioControlMode, AudioControlModeEnum } from './AudioControlMode'; // import
import { DviSelectMode, DviSelectModeEnum } from './DviSelectMode'; // import
import { HDEnableMode, HDEnableModeEnum } from './HDEnableMode'; // import
import { SourceSelectLoadMode, SourceSelectLoadModeEnum } from './SourceSelectLoadMode'; // import
import { VedioSelectMode, VedioSelectModeEnum } from './VedioSelectMode'; // import
/**
 * Codec for interface {@link SenderProperty}
 * @category Codecs
 * @see Automatically generated from ../decompiled/Nova.LCT.GigabitSystem.DataClass.decompiled.cs:67876
 */
export const SenderProperty = t.intersection(
  [
    t.type({
      FieldRate: common.withDefault(common.Numeric, 60), // #67885
      DviSelect: common.withDefault(DviSelectMode, 'DVI'), // #67887
      AudioControl: common.withDefault(AudioControlMode, 'External'), // #67889
      HDEnable: common.withDefault(HDEnableMode, 'Bit8'), // #67891
      LoadSelect: common.withDefault(SourceSelectLoadMode, 'BackUpLoad'), // #67893
      VedioSelect: common.withDefault(VedioSelectMode, 'Manual'),
    }),
    t.partial({
      CompanyID: common.Int32, // #67881
      ModalID: common.Int32, // #67883
      SN: t.string, // #67895
      IsSerdes: common.Bool, // #67897
      Is3DEnable: common.Bool,
    }),
  ],
  'SenderProperty'
);
export interface SenderProperty extends t.TypeOf<typeof SenderProperty> {
  DviSelect: DviSelectModeEnum;
  AudioControl: AudioControlModeEnum;
  HDEnable: HDEnableModeEnum;
  LoadSelect: SourceSelectLoadModeEnum;
  VedioSelect: VedioSelectModeEnum;
}
