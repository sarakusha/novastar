import ScreenConfigurator, { BrightnessRGBV } from './ScreenConfigurator';

export type { DeviceInfo } from './DeviceInfo';
export type { BrightnessRGBV };
export {
  isSimpleScreen,
  isStandardScreen,
  isComplexScreen,
  isHorizontalConnection,
  isLeftConnection,
  isTopConnection,
} from './common';
export type { LEDDisplayInfo } from './common';
export type { PortCount } from './CustomTransform';
export { AudioControlModeEnum } from '@novastar/native/build/main/generated/AudioControlMode';
export { DviSelectModeEnum } from '@novastar/native/build/main/generated/DviSelectMode';
export { HDEnableModeEnum } from '@novastar/native/build/main/generated/HDEnableMode';
export { VedioSelectModeEnum } from '@novastar/native/build/main/generated/VedioSelectMode';
export type { SenderModulationInfo } from '@novastar/native/build/main/generated/SenderModulationInfo';
export type { SenderRedundancyInfo } from '@novastar/native/build/main/generated/SenderRedundancyInfo';
export { ScanBoardConnectTypeEnum } from '@novastar/native/build/main/generated/ScanBoardConnectType';
export { SimpleLEDDisplayInfo } from '@novastar/native/build/main/generated/SimpleLEDDisplayInfo';
export { StandardLEDDisplayInfo } from '@novastar/native/build/main/generated/StandardLEDDisplayInfo';

export type { API, SessionAPI } from './Session';

export default ScreenConfigurator;
