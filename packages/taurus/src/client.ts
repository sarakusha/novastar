import {
  inspectCalibrationModules,
  loadCalibrationFromModules,
  openCalibrationTransport,
  validateCalibrationTargets,
} from './calibration';
import type {
  TaurusCalibrationProgress,
  TaurusCalibrationResult,
  TaurusCalibrationTarget,
} from './calibrationTypes';
import { randomUUID } from 'crypto';
import tls, { ConnectionOptions } from 'tls';

import { TaurusConnection } from './connection';

// cspell:ignore logined validition RCCB rcfgx sdcard

export const TAURUS_MANAGEMENT_PORT = 16606;

export interface TaurusConnectOptions extends Omit<ConnectionOptions, 'host' | 'port'> {
  host: string;
  port?: number;
  timeout?: number;
  privacy?: boolean;
}

export interface TaurusLoginOptions {
  sn: string;
  password: string;
  username?: string;
  clientId?: string;
  clientName?: string;
}

export interface TaurusLoginResult {
  logined: boolean;
  validation?: boolean;
  validition?: boolean;
  username?: string;
  sn?: string;
}

export interface TaurusBrightness {
  brightness?: number;
  ratio?: number;
  solidity: boolean;
  orderId: number;
}

/** Video-source policy used by the Taurus player. */
export enum TaurusVideoMode {
  /** Use HDMI while a signal is present and fall back to the internal player. */
  HdmiPreferred = 0,
  /** Keep the explicitly selected source. */
  Manual = 1,
  /** Select the source using the schedule stored on the player. */
  Scheduled = 2,
}

export enum TaurusVideoSource {
  Internal = 0,
  Hdmi = 1,
}

export interface TaurusVideoOffset {
  x: number;
  y: number;
}

export interface TaurusVideoConfiguration {
  enabled: boolean;
  scaling: boolean;
  offset: TaurusVideoOffset;
  mode: TaurusVideoMode;
  source: TaurusVideoSource;
  conditions?: unknown[];
  orderId: number;
}

export interface TaurusVideoConfigurationUpdate {
  scaling?: boolean;
  offset?: Partial<TaurusVideoOffset>;
  mode?: TaurusVideoMode;
  source?: TaurusVideoSource;
}

export interface TaurusSynchronousModeOptions {
  /** Allow Taurus to fall back to its internal player when HDMI disappears. */
  fallbackToInternal?: boolean;
  scaling?: boolean;
  offset?: Partial<TaurusVideoOffset>;
}

export interface TaurusResolution {
  width: number;
  height: number;
  frameRate: number;
}

export interface TaurusSupportedResolution {
  width: number;
  height: number;
  frameRates: number[];
}

export interface TaurusHdmiCapabilities {
  type?: string;
  algorithmType?: string;
  minWidth?: number;
  maxWidth?: number;
  minHeight?: number;
  maxHeight?: number;
  pixelUpperLimit?: number;
}

export interface TaurusVideoSourceInfo extends TaurusResolution {
  source: number;
  name: string;
  internal: boolean;
  connected: boolean;
  supportedFrameRates: number[];
  supportedResolutions: TaurusSupportedResolution[];
  supportsCustomResolution: boolean;
  hdmi?: TaurusHdmiCapabilities;
}

export interface TaurusVideoSources {
  currentSource: TaurusVideoSource;
  sources: TaurusVideoSourceInfo[];
}

export interface TaurusLedScreenSize {
  width: number;
  height: number;
}

export interface TaurusReceivingCardRegion extends TaurusLedScreenSize {
  x: number;
  y: number;
  xInPort: number;
  yInPort: number;
  column?: number;
  row?: number;
  port: number;
  connection: number;
}

export interface TaurusLedScreen {
  id: number;
  source: number;
  type: number;
  columns: number;
  rows: number;
  offset: TaurusVideoOffset;
  portNumber: number;
  portOrder: number[];
  receivingCards: TaurusReceivingCardRegion[];
  size: TaurusLedScreenSize;
}

export interface TaurusLedScreenConfiguration {
  screens: TaurusLedScreen[];
}

export interface TaurusReceivingCardConfigTarget {
  /** Absolute path of an RCCB .bin or .rcfgx file already stored on Taurus. */
  filePath: string;
  md5: string;
  port: number;
  receivingCard: number;
}

export enum TaurusReceivingCardConfigStatus {
  Preparing = 0,
  Completed = 1,
  Running = 2,
  Failed = 3,
}

export interface TaurusReceivingCardConfigProgress {
  status: TaurusReceivingCardConfigStatus;
  completed: number;
  total: number;
  progress?: number;
  errorCode?: number;
  errorMessage?: string;
  executing?: {
    port: number;
    receivingCard: number;
  };
}

export interface TaurusReceivingCardAddress {
  port: number;
  receivingCard: number;
}

export interface TaurusReceivingCardVersion extends TaurusReceivingCardAddress {
  modelId?: number;
  fpgaVersion?: string;
  mcuVersion?: string;
  error?: string;
}

export interface TaurusReceivingCardFirmwareProgress extends TaurusReceivingCardAddress {
  totalTargets: number;
  targetIndex: number;
  totalFiles: number;
  fileIndex: number;
  fileLabel: string;
  fileProgress: number;
  overallProgress: number;
}

export interface TaurusReceivingCardFirmwareOptions {
  onProgress?: (progress: TaurusReceivingCardFirmwareProgress) => void;
  pollInterval?: number;
  timeout?: number;
}

type TaurusVideoConfigurationResponse = {
  enable?: unknown;
  isScale?: unknown;
  offsetX?: unknown;
  offsetY?: unknown;
  videoMode?: unknown;
  videoSource?: unknown;
  conditions?: unknown;
  orderId?: unknown;
};

type TaurusVideoSourceResponse = {
  sourceNum?: unknown;
  name?: unknown;
  isInternalSource?: unknown;
  linkStatus?: unknown;
  width?: unknown;
  height?: unknown;
  rate?: unknown;
  sourceFPS?: unknown;
  supportResolutions?: unknown;
  supportCustomResolution?: unknown;
  hdmiInfo?: unknown;
};

type TaurusReceivingCardRegionResponse = {
  width?: unknown;
  height?: unknown;
  x?: unknown;
  y?: unknown;
  xInPort?: unknown;
  yInPort?: unknown;
  colIndex?: unknown;
  rowIndex?: unknown;
  portIndex?: unknown;
  connectIndex?: unknown;
};

type TaurusLedScreenResponse = {
  id?: unknown;
  screenSource?: unknown;
  screenType?: unknown;
  xCount?: unknown;
  yCount?: unknown;
  xOffset?: unknown;
  yOffset?: unknown;
  portNumber?: unknown;
  orders?: unknown;
  scanInfos?: unknown;
};

type TaurusReceivingCardVersionResponse = {
  portIndex?: unknown;
  connectedIndex?: unknown;
  modelId?: unknown;
};

type TaurusReceivingCardMonitorResponse = {
  portIndex?: unknown;
  connectIndex?: unknown;
  fpgaHardwareVersionInfo?: unknown;
  mcuHardwareVersionInfo?: unknown;
};

type TaurusReceivingCardFirmwareProgressResponse = {
  totalLists?: unknown;
  listIndex?: unknown;
  portIndex?: unknown;
  connectedIndex?: unknown;
  totalFiles?: unknown;
  fileIndex?: unknown;
  fileLabel?: unknown;
  fileProcess?: unknown;
};

const numberOrUndefined = (value: unknown): number | undefined =>
  typeof value === 'number' && Number.isFinite(value) ? value : undefined;

const requiredNumber = (value: unknown, field: string): number => {
  const result = numberOrUndefined(value);
  if (result === undefined) throw new Error(`Invalid Taurus ${field}`);
  return result;
};

const validateInteger = (value: number, field: string): number => {
  if (!Number.isSafeInteger(value)) throw new RangeError(`${field} must be a safe integer`);
  return value;
};

const validatePositiveInteger = (value: number, field: string): number => {
  validateInteger(value, field);
  if (value <= 0) throw new RangeError(`${field} must be greater than zero`);
  return value;
};

const validateNonNegativeInteger = (value: number, field: string): number => {
  validateInteger(value, field);
  if (value < 0) throw new RangeError(`${field} must not be negative`);
  return value;
};

const errorMessage = (error: unknown): string =>
  error instanceof Error ? error.message : String(error);

const clampPercent = (value: number): number => Math.min(100, Math.max(0, value));

const wait = (milliseconds: number): Promise<void> =>
  new Promise((resolve) => {
    const timer = setTimeout(resolve, milliseconds);
    timer.unref();
  });

const videoMode = (value: unknown): TaurusVideoMode => {
  if (
    value !== TaurusVideoMode.HdmiPreferred &&
    value !== TaurusVideoMode.Manual &&
    value !== TaurusVideoMode.Scheduled
  ) {
    throw new Error('Invalid Taurus video mode');
  }
  return value;
};

const videoSource = (value: unknown): TaurusVideoSource => {
  if (value !== TaurusVideoSource.Internal && value !== TaurusVideoSource.Hdmi) {
    throw new Error('Invalid Taurus video source');
  }
  return value;
};

const numberArray = (value: unknown): number[] =>
  Array.isArray(value)
    ? value.filter((item): item is number => numberOrUndefined(item) !== undefined)
    : [];

const hdmiCapabilities = (value: unknown): TaurusHdmiCapabilities | undefined => {
  if (!value || typeof value !== 'object') return undefined;
  const source = value as Record<string, unknown>;
  return {
    type: typeof source.type === 'string' ? source.type : undefined,
    algorithmType: typeof source.algorithmType === 'string' ? source.algorithmType : undefined,
    minWidth: numberOrUndefined(source.minWidth),
    maxWidth: numberOrUndefined(source.maxWidth),
    minHeight: numberOrUndefined(source.minHeight),
    maxHeight: numberOrUndefined(source.maxHeight),
    pixelUpperLimit: numberOrUndefined(source.pixelUpperLimit),
  };
};

const calculateLedScreenSize = (regions: TaurusReceivingCardRegion[]): TaurusLedScreenSize => {
  if (!regions.length) return { width: 0, height: 0 };
  const left = Math.min(...regions.map(({ x }) => x));
  const top = Math.min(...regions.map(({ y }) => y));
  const right = Math.max(...regions.map(({ x, width }) => x + width));
  const bottom = Math.max(...regions.map(({ y, height }) => y + height));
  return { width: right - left, height: bottom - top };
};

export class TaurusClient {
  private calibrationBusy = false;
  private authenticated = false;
  private constructor(
    public readonly connection: TaurusConnection,
    private readonly host?: string,
  ) {}

  /** Checks module flash hardware without replacing calibration coefficients. */
  async inspectReceivingCardCalibration(
    targets: TaurusCalibrationTarget[],
    options: { onProgress?: (progress: TaurusCalibrationProgress) => void } = {},
  ): Promise<TaurusCalibrationResult> {
    return this.runReceivingCardCalibration(targets, false, options);
  }

  /** Loads normal coefficients from LED modules and saves them in receiving-card flash. */
  async loadReceivingCardCalibration(
    targets: TaurusCalibrationTarget[],
    options: {
      allowPartial?: boolean;
      onProgress?: (progress: TaurusCalibrationProgress) => void;
    } = {},
  ): Promise<TaurusCalibrationResult> {
    return this.runReceivingCardCalibration(targets, true, options);
  }

  private async runReceivingCardCalibration(
    targets: TaurusCalibrationTarget[],
    apply: boolean,
    options: {
      allowPartial?: boolean;
      onProgress?: (progress: TaurusCalibrationProgress) => void;
    } = {},
  ): Promise<TaurusCalibrationResult> {
    if (!this.authenticated || this.connection.closed || !this.host)
      throw new Error('Taurus authentication is required');
    if (this.calibrationBusy) throw new Error('Taurus calibration is already running');
    this.calibrationBusy = true;
    let transport: Awaited<ReturnType<typeof openCalibrationTransport>> | undefined;
    let heartbeat: ReturnType<typeof setInterval> | undefined;
    try {
      const topology = await this.getLedScreenConfiguration();
      const available = topology.screens.flatMap((screen) =>
        screen.receivingCards.map((card) => ({ port: card.port, receivingCard: card.connection })),
      );
      const selected = validateCalibrationTargets(targets, available);
      const versions = await this.getReceivingCardVersions(selected);
      if (
        versions.length !== selected.length ||
        versions.some((card) => card.error || card.modelId === undefined)
      )
        throw new Error('Not all selected receiving cards are available');
      transport = await openCalibrationTransport(this.host);
      const activeTransport = transport;
      // TCP/5200 authorization expires without activity on the management connection.
      let pingPending = false;
      heartbeat = setInterval(() => {
        if (pingPending) return;
        pingPending = true;
        void this.getBrightness()
          .catch(() => activeTransport.close())
          .finally(() => {
            pingPending = false;
          });
      }, 5000);
      const report = options.onProgress ?? (() => undefined);
      if (apply)
        return await loadCalibrationFromModules(
          transport,
          selected,
          options.allowPartial === true,
          report,
        );
      const cards = [];
      for (const target of selected) {
        report({ completed: cards.length, total: selected.length, target, stage: 'checking' });
        cards.push(await inspectCalibrationModules(transport, target));
      }
      return { completed: 0, total: selected.length, cards };
    } finally {
      clearInterval(heartbeat);
      transport?.close();
      this.calibrationBusy = false;
    }
  }

  static async connect(options: TaurusConnectOptions): Promise<TaurusClient> {
    const {
      host,
      port = TAURUS_MANAGEMENT_PORT,
      timeout = 5000,
      privacy = true,
      ...tlsOptions
    } = options;
    if (!privacy) {
      const { connect } = await import('net');
      const socket = connect({ host, port });
      await new Promise<void>((resolve, reject) => {
        socket.once('connect', resolve);
        socket.once('error', reject);
      });
      return new TaurusClient(new TaurusConnection(socket, timeout), host);
    }

    const socket = tls.connect({
      host,
      port,
      rejectUnauthorized: false,
      ...tlsOptions,
    });
    await new Promise<void>((resolve, reject) => {
      socket.once('secureConnect', resolve);
      socket.once('error', reject);
    });
    return new TaurusClient(new TaurusConnection(socket, timeout), host);
  }

  async login(options: TaurusLoginOptions): Promise<TaurusLoginResult> {
    this.authenticated = false;
    const response = await this.connection.requestJson<
      TaurusLoginResult & { token?: string; password?: string }
    >(
      { what: 0, type: 0, action: 0 },
      {
        sn: options.sn,
        username: options.username ?? 'admin',
        password: options.password,
        loginType: 0,
        source: { type: 1, platform: 2, platformVersion: '3.6.0' },
        clientId: options.clientId ?? randomUUID(),
        clientName: options.clientName ?? 'novastar.js',
      },
    );
    this.authenticated = response.logined === true;
    const { token: _token, password: _password, ...safeResponse } = response;
    return safeResponse;
  }

  /** Returns the per-device password used by the Taurus FTP file-transfer service. */
  async getFtpPassword(): Promise<string> {
    const result = await this.connection.requestJson<{ password?: unknown }>({
      what: 0x12,
      type: 1,
      action: 5,
    });
    if (typeof result.password !== 'string' || !result.password) {
      throw new Error('Invalid Taurus FTP password');
    }
    return result.password;
  }

  async getBrightness(): Promise<TaurusBrightness> {
    const result = await this.connection.requestJson<Record<string, unknown>>({
      what: 0x18,
      type: 1,
      action: 5,
    });
    return {
      brightness: numberOrUndefined(result.brightness),
      ratio: numberOrUndefined(result.ratio),
      solidity: result.solidity === true,
      orderId: numberOrUndefined(result.orderId) ?? -1,
    };
  }

  async setBrightness(percent: number, persist = false): Promise<void> {
    if (!Number.isFinite(percent) || percent < 0 || percent > 100) {
      throw new RangeError('Brightness must be between 0 and 100');
    }
    await this.connection.requestJson<unknown>(
      { what: 0x18, type: 1, action: 4 },
      { ratio: percent, solidity: persist, orderId: -1 },
    );
  }

  async getEnvironmentBrightness(): Promise<number> {
    const result = await this.connection.requestJson<{ value?: unknown }>({
      what: 0x1a,
      type: 0,
      action: 5,
    });
    const value = numberOrUndefined(result.value);
    if (value === undefined || value === -1000)
      throw new Error('Taurus ambient light sensor is unavailable');
    return value;
  }

  async getVideoConfiguration(): Promise<TaurusVideoConfiguration> {
    const result = await this.connection.requestJson<TaurusVideoConfigurationResponse>({
      what: 0x27,
      type: 1,
      action: 5,
    });
    return {
      enabled: result.enable === true,
      scaling: result.isScale === true,
      offset: {
        x: requiredNumber(result.offsetX, 'video offset X'),
        y: requiredNumber(result.offsetY, 'video offset Y'),
      },
      mode: videoMode(result.videoMode),
      source: videoSource(result.videoSource),
      conditions: Array.isArray(result.conditions) ? result.conditions : undefined,
      orderId: numberOrUndefined(result.orderId) ?? -1,
    };
  }

  /** Updates selected video settings while preserving all other values on the player. */
  async setVideoConfiguration(update: TaurusVideoConfigurationUpdate): Promise<void> {
    const current = await this.getVideoConfiguration();
    const mode = update.mode === undefined ? current.mode : videoMode(update.mode);
    const source = update.source === undefined ? current.source : videoSource(update.source);
    const offsetX = validateInteger(update.offset?.x ?? current.offset.x, 'Video offset X');
    const offsetY = validateInteger(update.offset?.y ?? current.offset.y, 'Video offset Y');

    await this.connection.requestJson<unknown>(
      { what: 0x27, type: 1, action: 4 },
      {
        enable: current.enabled,
        isScale: update.scaling ?? current.scaling,
        offsetX,
        offsetY,
        videoMode: mode,
        videoSource: source,
        conditions: current.conditions,
        orderId: current.orderId,
      },
    );
  }

  async setVideoOffset(offset: TaurusVideoOffset): Promise<void> {
    await this.setVideoConfiguration({ offset });
  }

  async setVideoScaling(enabled: boolean): Promise<void> {
    await this.setVideoConfiguration({ scaling: enabled });
  }

  /** Forces HDMI (synchronous playback), optionally retaining automatic internal fallback. */
  async setSynchronousMode(options: TaurusSynchronousModeOptions = {}): Promise<void> {
    await this.setVideoConfiguration({
      mode: options.fallbackToInternal ? TaurusVideoMode.HdmiPreferred : TaurusVideoMode.Manual,
      source: TaurusVideoSource.Hdmi,
      scaling: options.scaling,
      offset: options.offset,
    });
  }

  /** Selects the Taurus internal player and disables source scheduling/fallback. */
  async setAsynchronousMode(): Promise<void> {
    await this.setVideoConfiguration({
      mode: TaurusVideoMode.Manual,
      source: TaurusVideoSource.Internal,
    });
  }

  async getCurrentVideoSource(): Promise<TaurusVideoSource> {
    const result = await this.connection.requestJson<{ state?: unknown; videoSource?: unknown }>(
      { what: 0x27, type: 5, action: 5 },
      { orderId: -1 },
    );
    return videoSource(result.videoSource ?? result.state);
  }

  async getVideoSources(): Promise<TaurusVideoSources> {
    const result = await this.connection.requestJson<{
      currentSource?: unknown;
      videoSourceList?: unknown;
    }>({ what: 0x27, type: 8, action: 5 });
    const sources = Array.isArray(result.videoSourceList)
      ? (result.videoSourceList as TaurusVideoSourceResponse[])
      : [];
    return {
      currentSource: videoSource(result.currentSource),
      sources: sources.map((source) => ({
        source: requiredNumber(source.sourceNum, 'video source number'),
        name: typeof source.name === 'string' ? source.name : '',
        internal: source.isInternalSource === true,
        connected: source.linkStatus === true,
        width: requiredNumber(source.width, 'video source width'),
        height: requiredNumber(source.height, 'video source height'),
        frameRate: requiredNumber(source.rate, 'video source frame rate'),
        supportedFrameRates: numberArray(source.sourceFPS),
        supportedResolutions: Array.isArray(source.supportResolutions)
          ? source.supportResolutions.map((resolution) => {
              const item = resolution as Record<string, unknown>;
              return {
                width: requiredNumber(item.width, 'supported resolution width'),
                height: requiredNumber(item.height, 'supported resolution height'),
                frameRates: numberArray(item.fps),
              };
            })
          : [],
        supportsCustomResolution: source.supportCustomResolution === true,
        hdmi: hdmiCapabilities(source.hdmiInfo),
      })),
    };
  }

  /** Reads the resolution advertised by the Taurus HDMI input to the source device. */
  async getHdmiInputResolution(): Promise<TaurusResolution> {
    const result = await this.connection.requestJson<{
      width?: unknown;
      height?: unknown;
      fieldRate?: unknown;
    }>({ what: 0x27, type: 2, action: 5 });
    return {
      width: requiredNumber(result.width, 'HDMI input width'),
      height: requiredNumber(result.height, 'HDMI input height'),
      frameRate: requiredNumber(result.fieldRate, 'HDMI input frame rate'),
    };
  }

  /** Changes the resolution advertised by the Taurus HDMI input to the source device. */
  async setHdmiInputResolution(resolution: TaurusResolution): Promise<void> {
    const width = validatePositiveInteger(resolution.width, 'HDMI input width');
    const height = validatePositiveInteger(resolution.height, 'HDMI input height');
    const fieldRate = validatePositiveInteger(resolution.frameRate, 'HDMI input frame rate');
    await this.connection.requestJson<unknown>(
      { what: 0x27, type: 2, action: 4 },
      { width, height, fieldRate },
    );
  }

  /** Reads the physical LED canvas and receiving-card layout configured on Taurus. */
  async getLedScreenConfiguration(): Promise<TaurusLedScreenConfiguration> {
    const result = await this.connection.requestJson<{ screenAttributes?: unknown }>({
      what: 0x1b,
      type: 1,
      action: 5,
    });
    const screens = Array.isArray(result.screenAttributes)
      ? (result.screenAttributes as TaurusLedScreenResponse[])
      : [];
    return {
      screens: screens.map((screen) => {
        const scanInfos = Array.isArray(screen.scanInfos)
          ? (screen.scanInfos as TaurusReceivingCardRegionResponse[])
          : [];
        const receivingCards = scanInfos.map((region) => ({
          width: requiredNumber(region.width, 'receiving-card region width'),
          height: requiredNumber(region.height, 'receiving-card region height'),
          x: requiredNumber(region.x, 'receiving-card region X'),
          y: requiredNumber(region.y, 'receiving-card region Y'),
          xInPort: requiredNumber(region.xInPort, 'receiving-card port X'),
          yInPort: requiredNumber(region.yInPort, 'receiving-card port Y'),
          column: numberOrUndefined(region.colIndex),
          row: numberOrUndefined(region.rowIndex),
          port: requiredNumber(region.portIndex, 'receiving-card port index'),
          connection: requiredNumber(region.connectIndex, 'receiving-card connection index'),
        }));
        return {
          id: requiredNumber(screen.id, 'LED screen id'),
          source: requiredNumber(screen.screenSource, 'LED screen source'),
          type: requiredNumber(screen.screenType, 'LED screen type'),
          columns: requiredNumber(screen.xCount, 'LED screen column count'),
          rows: requiredNumber(screen.yCount, 'LED screen row count'),
          offset: {
            x: requiredNumber(screen.xOffset, 'LED screen offset X'),
            y: requiredNumber(screen.yOffset, 'LED screen offset Y'),
          },
          portNumber: requiredNumber(screen.portNumber, 'LED screen port number'),
          portOrder: numberArray(screen.orders),
          receivingCards,
          size: calculateLedScreenSize(receivingCards),
        };
      }),
    };
  }

  /**
   * Replaces the complete physical LED screen and receiving-card layout.
   * Prefer round-tripping a configuration returned by getLedScreenConfiguration().
   */
  async setLedScreenConfiguration(configuration: TaurusLedScreenConfiguration): Promise<void> {
    if (!configuration.screens.length) {
      throw new RangeError('LED screen configuration must contain at least one screen');
    }
    const screenAttributes = configuration.screens.map((screen, screenIndex) => {
      const prefix = `LED screen ${screenIndex}`;
      if (!screen.receivingCards.length) {
        throw new RangeError(`${prefix} must contain at least one receiving-card region`);
      }
      return {
        id: validateNonNegativeInteger(screen.id, `${prefix} id`),
        screenSource: validateNonNegativeInteger(screen.source, `${prefix} source`),
        screenType: validateNonNegativeInteger(screen.type, `${prefix} type`),
        xCount: validatePositiveInteger(screen.columns, `${prefix} column count`),
        yCount: validatePositiveInteger(screen.rows, `${prefix} row count`),
        xOffset: validateInteger(screen.offset.x, `${prefix} offset X`),
        yOffset: validateInteger(screen.offset.y, `${prefix} offset Y`),
        portNumber: validateNonNegativeInteger(screen.portNumber, `${prefix} port number`),
        orders: screen.portOrder.map((order, index) =>
          validateNonNegativeInteger(order, `${prefix} port order ${index}`),
        ),
        scanInfos: screen.receivingCards.map((region, regionIndex) => {
          const regionPrefix = `${prefix} receiving-card region ${regionIndex}`;
          return {
            width: validatePositiveInteger(region.width, `${regionPrefix} width`),
            height: validatePositiveInteger(region.height, `${regionPrefix} height`),
            x: validateNonNegativeInteger(region.x, `${regionPrefix} X`),
            y: validateNonNegativeInteger(region.y, `${regionPrefix} Y`),
            xInPort: validateNonNegativeInteger(region.xInPort, `${regionPrefix} port X`),
            yInPort: validateNonNegativeInteger(region.yInPort, `${regionPrefix} port Y`),
            colIndex:
              region.column === undefined
                ? undefined
                : validateNonNegativeInteger(region.column, `${regionPrefix} column`),
            rowIndex:
              region.row === undefined
                ? undefined
                : validateNonNegativeInteger(region.row, `${regionPrefix} row`),
            portIndex: validateNonNegativeInteger(region.port, `${regionPrefix} port index`),
            connectIndex: validateNonNegativeInteger(
              region.connection,
              `${regionPrefix} connection index`,
            ),
          };
        }),
      };
    });

    await this.connection.requestJson<unknown>(
      { what: 0x1b, type: 1, action: 4 },
      { screenAttributes },
    );
  }

  /** Returns the physical pixel dimensions of the first configured LED screen. */
  async getLedScreenSize(): Promise<TaurusLedScreenSize> {
    const configuration = await this.getLedScreenConfiguration();
    const screen = configuration.screens[0];
    if (!screen) throw new Error('Taurus has no configured LED screen');
    return screen.size;
  }

  /**
   * Applies receiving-card configuration files already stored on Taurus.
   * The operation continues asynchronously; poll getReceivingCardConfigProgress().
   */
  async applyReceivingCardConfiguration(
    targets: TaurusReceivingCardConfigTarget[],
    persist = true,
  ): Promise<void> {
    if (!targets.length) throw new RangeError('At least one receiving-card target is required');
    const rcParamBackUpList = targets.map((target, index) => {
      if (!target.filePath.endsWith('.bin') && !target.filePath.endsWith('.rcfgx')) {
        throw new RangeError(`Receiving-card target ${index} must use a .bin or .rcfgx file`);
      }
      if (!/^[a-f\d]{32}$/i.test(target.md5)) {
        throw new RangeError(`Receiving-card target ${index} must have a valid MD5 digest`);
      }
      return {
        filePath: target.filePath,
        md5: target.md5.toLowerCase(),
        portIndex: validateNonNegativeInteger(target.port, `Receiving-card target ${index} port`),
        connectedIndex: validateNonNegativeInteger(
          target.receivingCard,
          `Receiving-card target ${index} receiving-card index`,
        ),
      };
    });
    await this.connection.requestJson<unknown>(
      { what: 0x2e, type: 2, action: 4 },
      {
        rcParamBackUpList,
        requestTimes: 1,
        resolvePath: '',
        // ScreenService uses recovery type 1 for device-local RCCB files.
        resolveType: 1,
        solidityRequired: persist,
      },
    );
  }

  async getReceivingCardConfigProgress(): Promise<TaurusReceivingCardConfigProgress> {
    const result = await this.connection.requestJson<Record<string, unknown>>({
      what: 0x2e,
      type: 6,
      action: 5,
    });
    const status = requiredNumber(result.status, 'receiving-card configuration status');
    if (
      status !== TaurusReceivingCardConfigStatus.Preparing &&
      status !== TaurusReceivingCardConfigStatus.Completed &&
      status !== TaurusReceivingCardConfigStatus.Running &&
      status !== TaurusReceivingCardConfigStatus.Failed
    ) {
      throw new Error('Invalid Taurus receiving-card configuration status');
    }
    const executing =
      result.rcExecuting && typeof result.rcExecuting === 'object'
        ? (result.rcExecuting as Record<string, unknown>)
        : undefined;
    return {
      status,
      completed: numberOrUndefined(result.rcCompleted) ?? 0,
      total: numberOrUndefined(result.rcTotal) ?? 0,
      progress: numberOrUndefined(result.progress),
      errorCode: numberOrUndefined(result.errorCode),
      errorMessage: typeof result.errorMsg === 'string' ? result.errorMsg : undefined,
      executing: executing
        ? {
            port: requiredNumber(executing.portIndex, 'executing receiving-card port'),
            receivingCard: requiredNumber(
              executing.connectedIndex,
              'executing receiving-card index',
            ),
          }
        : undefined,
    };
  }

  /** Reads model identity and live FPGA/MCU versions for explicit zero-based card addresses. */
  async getReceivingCardVersions(
    targets: TaurusReceivingCardAddress[],
  ): Promise<TaurusReceivingCardVersion[]> {
    const versions: TaurusReceivingCardVersion[] = [];
    for (const [index, target] of targets.entries()) {
      const port = validateNonNegativeInteger(target.port, `Receiving-card target ${index} port`);
      const receivingCard = validateNonNegativeInteger(
        target.receivingCard,
        `Receiving-card target ${index} receiving-card index`,
      );
      try {
        const result = await this.connection.requestJson<{ receiveCardList?: unknown }>(
          { what: 0x2e, type: 7, action: 5 },
          { receiveCardList: [{ portIndex: port, connectedIndex: receivingCard }] },
        );
        const cards = Array.isArray(result.receiveCardList)
          ? (result.receiveCardList as TaurusReceivingCardVersionResponse[])
          : [];
        const card = cards.find(
          (item) =>
            numberOrUndefined(item.portIndex) === port &&
            numberOrUndefined(item.connectedIndex) === receivingCard,
        );
        versions.push({
          port,
          receivingCard,
          modelId: card ? numberOrUndefined(card.modelId) : undefined,
          error: card ? undefined : 'Receiving card did not return its version information',
        });
      } catch (error) {
        versions.push({ port, receivingCard, error: errorMessage(error) });
      }
    }

    try {
      const topology = await this.connection.requestJson<Record<string, unknown>>({
        what: 0x21,
        type: 7,
        action: 5,
      });
      const monitor = await this.connection.requestJson<{ screenMonitorData?: unknown }>(
        { what: 0x21, type: 8, action: 5 },
        topology,
      );
      const data = Array.isArray(monitor.screenMonitorData) ? monitor.screenMonitorData : [];
      const monitorByAddress = new Map<string, TaurusReceivingCardMonitorResponse>();
      for (const entry of data) {
        if (!entry || typeof entry !== 'object') continue;
        const card = (entry as Record<string, unknown>).receiveCardMonitorInfo;
        if (!card || typeof card !== 'object') continue;
        const info = card as TaurusReceivingCardMonitorResponse;
        monitorByAddress.set(
          `${numberOrUndefined(info.portIndex)}:${numberOrUndefined(info.connectIndex)}`,
          info,
        );
      }
      return versions.map((version) => {
        const monitorInfo = monitorByAddress.get(`${version.port}:${version.receivingCard}`);
        return {
          ...version,
          fpgaVersion:
            typeof monitorInfo?.fpgaHardwareVersionInfo === 'string'
              ? monitorInfo.fpgaHardwareVersionInfo
              : undefined,
          mcuVersion:
            typeof monitorInfo?.mcuHardwareVersionInfo === 'string'
              ? monitorInfo.mcuHardwareVersionInfo
              : undefined,
        };
      });
    } catch {
      return versions;
    }
  }

  async getReceivingCardVersion(
    target: TaurusReceivingCardAddress,
  ): Promise<TaurusReceivingCardVersion> {
    const [version] = await this.getReceivingCardVersions([target]);
    if (!version) throw new Error('Receiving-card version was not returned');
    return version;
  }

  async getReceivingCardFirmwareProgress(): Promise<
    TaurusReceivingCardFirmwareProgress | undefined
  > {
    const result = await this.connection.requestJson<TaurusReceivingCardFirmwareProgressResponse>({
      what: 0x2e,
      type: 3,
      action: 5,
    });
    const totalTargets = numberOrUndefined(result.totalLists) ?? 0;
    if (!totalTargets) return undefined;
    const targetIndex = numberOrUndefined(result.listIndex) ?? 0;
    const totalFiles = numberOrUndefined(result.totalFiles) ?? 0;
    const fileIndex = numberOrUndefined(result.fileIndex) ?? 0;
    const fileProgress = clampPercent(numberOrUndefined(result.fileProcess) ?? 0);
    const targetProgress = totalFiles ? (fileIndex + fileProgress / 100) / totalFiles : 0;
    return {
      totalTargets,
      targetIndex,
      port: numberOrUndefined(result.portIndex) ?? 0,
      receivingCard: numberOrUndefined(result.connectedIndex) ?? 0,
      totalFiles,
      fileIndex,
      fileLabel: typeof result.fileLabel === 'string' ? result.fileLabel : '',
      fileProgress,
      overallProgress: clampPercent(((targetIndex + targetProgress) / totalTargets) * 100),
    };
  }

  /** Applies a device-local firmware ZIP to explicit cards and reports ScreenService progress. */
  async applyReceivingCardFirmware(
    filePath: string,
    targets: TaurusReceivingCardAddress[],
    options: TaurusReceivingCardFirmwareOptions = {},
  ): Promise<void> {
    if (!filePath.toLowerCase().endsWith('.zip')) {
      throw new RangeError('Receiving-card firmware must use a .zip file');
    }
    if (!targets.length) throw new RangeError('At least one receiving-card target is required');
    const updateList = targets.map((target, index) => ({
      filePath,
      portIndex: validateNonNegativeInteger(target.port, `Receiving-card target ${index} port`),
      connectedIndex: validateNonNegativeInteger(
        target.receivingCard,
        `Receiving-card target ${index} receiving-card index`,
      ),
    }));
    const timeout =
      options.timeout ??
      Math.max(
        Number.isFinite(this.connection.timeout) ? this.connection.timeout : 5000,
        180_000 + targets.length * 120_000,
      );
    const pollInterval = options.pollInterval ?? 500;
    if (!Number.isSafeInteger(pollInterval) || pollInterval <= 0) {
      throw new RangeError('Firmware progress poll interval must be greater than zero');
    }
    let completed = false;
    let operationError: Error | undefined;
    const operation = this.connection
      .requestJson<unknown>({ what: 0x2e, type: 1, action: 8 }, { updateList }, timeout)
      .then(
        () => {
          completed = true;
        },
        (error) => {
          operationError = error instanceof Error ? error : new Error(String(error));
          completed = true;
        },
      );
    await Promise.resolve();
    while (!completed) {
      await wait(pollInterval);
      if (completed) break;
      try {
        const progress = await this.getReceivingCardFirmwareProgress();
        if (progress) options.onProgress?.(progress);
      } catch {
        // A missed progress sample must not abort the firmware operation itself.
      }
    }
    await operation;
    if (operationError) throw operationError;
  }

  close(): void {
    this.connection.close();
  }
}
