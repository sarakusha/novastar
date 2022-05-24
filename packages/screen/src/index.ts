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
export { AudioControlModeEnum } from '@novastar/native/lib/generated/AudioControlMode';
export { DviSelectModeEnum } from '@novastar/native/lib/generated/DviSelectMode';
export { HDEnableModeEnum } from '@novastar/native/lib/generated/HDEnableMode';
export { VedioSelectModeEnum } from '@novastar/native/lib/generated/VedioSelectMode';
export type { SenderModulationInfo } from '@novastar/native/lib/generated/SenderModulationInfo';
export type { SenderRedundancyInfo } from '@novastar/native/lib/generated/SenderRedundancyInfo';
export { ScanBoardConnectTypeEnum } from '@novastar/native/lib/generated/ScanBoardConnectType';
export { SimpleLEDDisplayInfo } from '@novastar/native/lib/generated/SimpleLEDDisplayInfo';
export { StandardLEDDisplayInfo } from '@novastar/native/lib/generated/StandardLEDDisplayInfo';
export { ZoomTypeEnum } from '@novastar/native/lib/generated/ZoomType';

export type { API, SessionAPI } from './Session';

export { default as getScreenLocation } from './getScreenLocation';

export { default as getCabinetPosition } from './getCabinetPosition';
export type { CabinetPosition } from './getCabinetPosition';

export default ScreenConfigurator;
