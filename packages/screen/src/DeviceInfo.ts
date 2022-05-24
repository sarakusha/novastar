import { AudioControlModeEnum } from '@novastar/native/lib/generated/AudioControlMode';
import { DviSelectModeEnum } from '@novastar/native/lib/generated/DviSelectMode';
import { HDEnableModeEnum } from '@novastar/native/lib/generated/HDEnableMode';
import { VedioSelectModeEnum } from '@novastar/native/lib/generated/VedioSelectMode';

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
