import ScreenConfigurator from './ScreenConfigurator';

export type { BrightnessRGBV, ScreenReadAsyncGenerator, ScreenWriter } from './ScreenConfigurator';
export type { DeviceInfo } from './DeviceInfo';
export * from './HWStatus';
export {
  isSimpleScreen,
  isStandardScreen,
  isComplexScreen,
  isHorizontalConnection,
  isLeftConnection,
  isTopConnection,
  hasProps,
  itAll,
  itFirstNotNull,
} from './common';
export type { LEDDisplayInfo } from './common';
export type { PortCount } from './CustomTransform';
export { AudioControlModeEnum } from '@novastar/native/AudioControlMode';
export { DviSelectModeEnum } from '@novastar/native/DviSelectMode';
export { HDEnableModeEnum } from '@novastar/native/HDEnableMode';
export { VedioSelectModeEnum } from '@novastar/native/VedioSelectMode';
export type { SenderModulationInfo } from '@novastar/native/SenderModulationInfo';
export type { SenderRedundancyInfo } from '@novastar/native/SenderRedundancyInfo';
export { ScanBoardConnectTypeEnum } from '@novastar/native/ScanBoardConnectType';
export { SimpleLEDDisplayInfo } from '@novastar/native/SimpleLEDDisplayInfo';
export { StandardLEDDisplayInfo } from '@novastar/native/StandardLEDDisplayInfo';
export { ZoomTypeEnum } from '@novastar/native/ZoomType';

export type { API, SessionAPI } from './Session';

export { default as getScreenLocation } from './getScreenLocation';

export { default as getCabinetPosition } from './getCabinetPosition';
export type { CabinetPosition } from './getCabinetPosition';

export default ScreenConfigurator;
