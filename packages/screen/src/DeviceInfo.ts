import { AudioControlModeEnum } from '@novastar/native/AudioControlMode';
import { DviSelectModeEnum } from '@novastar/native/DviSelectMode';
import { HDEnableModeEnum } from '@novastar/native/HDEnableMode';
import { VedioSelectModeEnum } from '@novastar/native/VedioSelectMode';

import { PortCount } from './CustomTransform';

export type DeviceInfo = {
  model: number;
  mac: string;
  maxPackageSize: number;
  name?: string;
  companyId: number;
  audioControl: AudioControlModeEnum;
  dviSelect: DviSelectModeEnum;
  hdEnable: HDEnableModeEnum;
  videoSelect: VedioSelectModeEnum;
  fieldRate: number;
  portCount: PortCount;
};
