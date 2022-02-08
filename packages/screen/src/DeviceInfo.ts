import { AudioControlModeEnum } from '@novastar/native/build/main/generated/AudioControlMode';
import { DviSelectModeEnum } from '@novastar/native/build/main/generated/DviSelectMode';
import { HDEnableModeEnum } from '@novastar/native/build/main/generated/HDEnableMode';
import { VedioSelectModeEnum } from '@novastar/native/build/main/generated/VedioSelectMode';

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
