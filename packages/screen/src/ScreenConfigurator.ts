/* eslint-disable no-bitwise */
import {
  Connection,
  decodeUIntLE,
  delay,
  DeviceType,
  ErrorType,
  Packet,
  Request,
  series,
} from '@novastar/codec';
import { makeStruct, UInt16 } from '@novastar/native/lib/common';
import AddressMapping from '@novastar/native/lib/generated/AddressMapping';
import { BaudRateTypeEnum } from '@novastar/native/lib/generated/BaudRateType';
import type { GraphicsDVIPortInfo } from '@novastar/native/lib/generated/GraphicsDVIPortInfo';
import { LEDDisplyTypeEnum } from '@novastar/native/lib/generated/LEDDisplyType';
import { PortScanBoardInfo } from '@novastar/native/lib/generated/PortScanBoardInfo';
import type { ScanBoardProperty } from '@novastar/native/lib/generated/ScanBoardProperty';
import { ScreenDataInSoftSpace } from '@novastar/native/lib/generated/ScreenDataInSoftSpace';
import type { SenderModulationInfo } from '@novastar/native/lib/generated/SenderModulationInfo';
import type { SenderRedundancyInfo } from '@novastar/native/lib/generated/SenderRedundancyInfo';
import { SimpleLEDDisplayInfo } from '@novastar/native/lib/generated/SimpleLEDDisplayInfo';
import SoftwareSpaceBaseAddress from '@novastar/native/lib/generated/SoftwareSpaceBaseAddress';
import { TestModeEnum } from '@novastar/native/lib/generated/TestMode';
import { VirtualModeTypeEnum } from '@novastar/native/lib/generated/VirtualModeType';
import debugFactory from 'debug';
import { isLeft } from 'fp-ts/lib/Either';
import * as t from 'io-ts';
import { PathReporter } from 'io-ts/lib/PathReporter';
import range from 'lodash/range';
import { Duplex } from 'stream';
import {
  AllowedNames,
  crc16,
  crc8,
  isHorizontalConnection,
  isLeftConnection,
  isSimpleScreen,
  isTopConnection,
  itFirstNotNull,
  LEDDisplayInfo,
  minimax,
  pack,
  unpack,
} from './common';

import { isValidScanBdProp, isValidStandardLedModuleProp } from './CommonCalculator';
import { decodeScreenConfig } from './configs';
import ConfigurationError from './ConfigurationError';
import convertLEDDisplayInfoToScreenDataInSoftSpace
  from './convertLEDDisplayInfoToScreenDataInSoftSpace';
import convertScreenDataInSoftSpaceToLEDDisplayInfo
  from './convertScreenDataInSoftSpaceToLEDDisplayInfo';
import { GetSmartMode, IsSystemController } from './CustomTransform';
import { DeviceInfo } from './DeviceInfo';
import { DviScreenConfigInfo, DviScreenInfoFlag } from './DviScreenConfigInfo';
import enumerateDevices from './enumerator';
import {
  FILE_COMPRESS_AREA_START_ADDR,
  FileInfoObject,
  FileInfoObjectList,
  ScreenFileType,
  ScreenFileVersion,
} from './FileInfo';
import getScreenLocation from './getScreenLocation';
import GetScreenPortAddrInfo from './GetScreenPortAddrInfo';
import GetScreenSenderAddrInfo from './GetScreenSenderAddrInfo';
import { GetAutoRefreshRateBytesSeq, SetVariousScanBdRefreshRate } from './HWAccessorCalculator';
import { HWStatus } from './HWStatus';
import {
  decodeModulationInfo,
  encodeModulationInfo,
  ModulationInfoHeader,
  SenderModulationFlag,
} from './ModulationInfo';
import packAndSortCabinets from './packAndSortCabinets';
import {
  decodeRedundancyInfo,
  encodeRedundancyInfo,
  ReduFlag,
  RedundancyInfo,
} from './RedundancyInfo';
import { ScreenConfigInfo } from './ScreenConfigInfo';
import { DVI1600Info } from './ScreenInfo';
import Session, { SessionAPI } from './Session';
import {
  ParamSize,
  SoftwareSpaceHeader,
  SoftwareSpaceHeaderFlag,
  SoftwareSpaceHeaderVersion,
} from './SoftwareSpaceHeader';
import splitScreensByDevice from './splitScreensByDevice';

const debug = debugFactory('novastar:screen');
console.log('Hello from ScreenConfigurator');
debug('Hello from ScreenConfigurator');
export const AllSenders = 0xff;
export const AllPorts = 0xff;
export const AllScanBoards = 0xffff;

// const DVIDataVer = 1001;
// const ScrAdjustParamsVer = 1002;
/**
 * RedundancyInfoAccessor
 */
// const ReduHeaderInfoLen = 10;
/**
 * SenderModulationInfoAccessor
 */

const ParamAddress = 0x0500_0200;
const FileInfoCompressedAddress = 0x0500_0400;

const ScreenDataInSoftSpaceList = t.type({
  ScreenDataInSoftSpace: t.array(ScreenDataInSoftSpace),
});

type ConsolidatedResult = null | boolean;

const consolidateResults = (results: (ErrorType | null)[]): ConsolidatedResult => results.every(res => res == null)
  ? null
  : results.every(res => res === ErrorType.Succeeded);

export type BrightnessRGBV = {
  overall: number;
  red: number;
  green: number;
  blue: number;
  vRed: number;
};

type ReadFunction<T> = (SenderIndex: number, PortIndex: number, ScanIndex: number) => Promise<T>;

type WriteFunction<T> = (
  SenderIndex: number,
  PortIndex: number,
  ScanIndex: number,
  broadcast: boolean,
  value: T,
) => Promise<void>;

type ReadNames<T = number | Buffer> = AllowedNames<SessionAPI, ReadFunction<T>>;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type WriteNames<T = any> = AllowedNames<SessionAPI, WriteFunction<T>>;

type FilterHasTry<T> = {
  [Key in keyof T]: Key extends string
    ? `try${Key}` extends keyof T ? Key : never
    : never;
};

type ValueType<T> = T extends WriteFunction<infer V> ? V : never;

type ValueTypeFromName<N extends WriteNames> = ValueType<SessionAPI[N]>;

/**
 * Factory method for creating an asynchronous generator function to sequentially read data from
 * all receiving cards of the specified screen.
 * @template T Return type
 * @param screen Selected screen
 */
export type ScreenReadAsyncGenerator<T> = (screen?: number) => AsyncGenerator<T | null>;

export type ScreenWriter<T> = (value: T, screen?: number) => Promise<ConsolidatedResult>;

const firstCreator =
  <T>(genFactory: ScreenReadAsyncGenerator<T>) =>
    (screen?: number): Promise<T | null> => {
      const it = genFactory(screen);
      return itFirstNotNull(it);
    };

type Codec<I, O = I> = (value: I) => O;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const identity = <T>(value: any): T => value;

/*
type AsyncGeneratorType<T> = T extends AsyncGenerator<infer R> ? R : never;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type GeneratorFactory = (...args: ReadonlyArray<any>) => AsyncGenerator<any>;

type FirstWrapper<T extends GeneratorFactory> = (
  ...args: Parameters<T>
) => Promise<AsyncGeneratorType<ReturnType<T>> | null>;

type FirstWrapperCreator = <T extends GeneratorFactory>(gen: T) => FirstWrapper<T>;

const first: FirstWrapperCreator = gen =>
  async (...args) => {
    const generator = gen(...args);
    for await (const res of generator) {
      if (res !== null) return res;
    }
    return null;
  };
*/

const stringConverter = (res: Packet): string => {
  const end = Math.max(0, res.data.indexOf(0));
  return res.data.slice(0, end).toString();
};

// noinspection JSMethodCanBeStatic,JSUnusedGlobalSymbols
/**
 *
 */
export default class ScreenConfigurator {
  /**
   * Current session
   */
  readonly session: SessionAPI;

  /**
   * Find all connected devices in the current session/connection, read screen configurations.
   */
  reload: () => Promise<void> = this.queue(this.reloadImpl);

  /**
   * Save screen configurations to devices.
   */
  save: () => Promise<void> = this.queue(this.saveImpl);

  ReadHWStatus = this.createReadGenerator('ReadAllStatus', res => new HWStatus(res.data).toJSON());

  ReadReceivingCardMCURemarks = this.createReadGenerator(
    'ReadScanner_McuProgramRemarks',
    stringConverter,
  );

  ReadReceivingCardFPGARemarks = this.createReadGenerator(
    'ReadScanner_FPGAProgramRemarks',
    stringConverter,
  );

  ReadChipType = this.createReadGenerator('ReadDriverType', decodeUIntLE);

  ReadFirstChipType = firstCreator(this.ReadChipType);

  WriteBrightness = this.createWriter('SetGlobalBrightness', percent =>
    Math.ceil((minimax(0, 100, percent) * 255) / 100),
  );

  ReadBrightness = this.createReadGenerator(
    'ReadGlobalBrightness',
    res => Math.round((decodeUIntLE(res) * 10000) / 255) / 100,
  );

  ReadFirstBrightness = firstCreator(this.ReadBrightness);

  WriteDisplayMode = this.createWriter('SetSelfTestMode');

  ReadDisplayMode = this.createReadGenerator('ReadSelfTestMode', decodeUIntLE);

  ReadFirstDisplayMode = firstCreator(this.ReadDisplayMode);

  ReadGamma = this.createReadGenerator('ReadGamma', res => decodeUIntLE(res) / 10);

  ReadFirstGamma = firstCreator(this.ReadGamma);

  ReadRGBVBrightness = this.createReadGenerator('ReadAllBrightnessInfo', res => {
    const [overall, red, green, blue, vRed] = res.data;
    return {
      overall,
      red,
      green,
      blue,
      vRed,
    } as BrightnessRGBV;
  });

  ReadFirstRGBVBrightness = firstCreator(this.ReadRGBVBrightness);

  WriteGamma = this.createWriter('SetGamma', gamma => (gamma * 10) & 0xff);

  ReadFirstFuncCardLightSensor = firstCreator(this.ReadAllFuncCardLightSensor.bind(this));

  ReadFuncCardLightSensor = this.queue(this.readFuncCardLightSensorImpl);

  #ready = Promise.resolve();

  #devices: DeviceInfo[] = [];

  #screens: LEDDisplayInfo[] = [];

  #dviInfo?: GraphicsDVIPortInfo;

  #dviExtends?: DVI1600Info;

  #reduList: Required<SenderRedundancyInfo>[] = [];

  #modulations: Required<SenderModulationInfo>[] = [];

  #dviVersion = 0;

  #screenVersion = 0;

  constructor(connection: Connection<Duplex>);

  constructor(session: SessionAPI);

  constructor(arg: SessionAPI | Connection<Duplex>) {
    this.session = (arg instanceof Connection ? new Session(arg) : arg) as SessionAPI;
    // this.session.Distribute_SetRebootAppFpgaProgram(0,0,0,true,0);
  }

  get devices(): ReadonlyArray<Readonly<DeviceInfo>> {
    return this.#devices;
  }

  get screens(): ReadonlyArray<Readonly<LEDDisplayInfo>> {
    return this.#screens;
  }

  get reduList(): ReadonlyArray<Readonly<Required<SenderRedundancyInfo>>> {
    return this.#reduList;
  }

  get modulations(): ReadonlyArray<Readonly<Required<SenderModulationInfo>>> {
    return this.#modulations;
  }

  reset(): void {
    this.#devices = [];
    this.#screens = [];
    this.#dviInfo = undefined;
    this.#dviExtends = undefined;
    this.#screenVersion = 0;
    this.#dviVersion = 0;
    this.#reduList = [];
    this.#modulations = [];
  }

  /**
   * FormMain
   */
  GetScreenAllPort(
    screen: number,
    toRead = false,
  ): {
    SenderIndex: number;
    PortIndex: number;
    ScanIndex: number;
    SlaveSenderIndex?: number;
    SlavePortIndex?: number;
  }[] {
    if (!toRead && (screen === -1 || this.screens.length === 0))
      return [
        {
          SenderIndex: AllSenders,
          PortIndex: AllPorts,
          ScanIndex: AllScanBoards,
        },
      ];
    if (this.screens.length === 0) return [];
    const scr = this.screens[screen];
    if (!scr) throw new TypeError(`Invalid screen index: ${screen}`);
    const list = GetScreenPortAddrInfo(scr).flatMap(
      ({
        SenderIndex,
        PortIndex,
        MinConnectIndex,
        LoadScannerCount,
      }) => {
        const {
          SlaveSenderIndex,
          SlavePortIndex,
        } =
        this.reduList.find(
          item => item.MasterPortIndex === PortIndex && item.MasterSenderIndex === SenderIndex,
        ) ?? {};
        return toRead
          ? range(MinConnectIndex, MinConnectIndex + LoadScannerCount).map(ScanIndex => ({
            SenderIndex,
            PortIndex,
            SlaveSenderIndex,
            SlavePortIndex,
            ScanIndex,
          }))
          : {
            SenderIndex,
            PortIndex,
            SlaveSenderIndex,
            SlavePortIndex,
            ScanIndex: 0xffff,
          };
      },
    );

    return toRead ? list.filter(({ SenderIndex }) => SenderIndex !== AllSenders) : list;
  }

  async WriteRGBVBrightness(
    {
      overall,
      red,
      green,
      blue,
      vRed,
    }: BrightnessRGBV,
    screen = 0,
  ): Promise<null | boolean> {
    const addresses = this.GetScreenAllPort(screen);
    const value = Buffer.from([overall, red, green, blue, vRed]);
    if (addresses.length === 0) {
      const req = new Request(value, true);
      req.address = AddressMapping.AllBrightnessInfoAddr;
      req.deviceType = DeviceType.ReceivingCard;
      req.destination = AllSenders;
      req.port = AllPorts;
      req.rcvIndex = AllScanBoards;
      await this.session.connection.send(req);
      return true;
    }
    const results = await series(addresses, async address => {
      const req = new Request(value);
      req.address = AddressMapping.AllBrightnessInfoAddr;
      req.deviceType = DeviceType.ReceivingCard;
      req.destination = address.SenderIndex;
      req.port = address.PortIndex;
      req.rcvIndex = address.ScanIndex;
      const res = await this.session.connection.trySend(req);
      return res && res.ack;
    });
    return consolidateResults(results);
  }

  async FactoryReset(screen = 0): Promise<ErrorType | null> {
    this.session.pushTimeout(60000);
    try {
      return this.session.trySetReturnFactoryValues(screen, 0);
    } finally {
      this.session.popTimeout();
    }
  }

  async ReadHasDVISignalIn(device = 0): Promise<boolean | null> {
    const res = await this.session.tryReadIsHasDVI(device);
    return res && res.ack === 0 && res.data[0] !== 0;
  }

  async* ReadAllFuncCardLightSensor(): AsyncGenerator<number | null> {
    const { portCount = 2 } = this.devices[0] ?? [];
    for (let PortIndex = 0; PortIndex < portCount; PortIndex += 1) {
      yield this.ReadFuncCardLightSensor(0, PortIndex, 0);
    }
  }

  protected async readFuncCardLightSensorImpl(
    senderIndex = 0,
    portIndex = 0,
    cardIndex = 0,
  ): Promise<number | null> {
    const data = Buffer.from([
      cardIndex,
      BaudRateTypeEnum.BT_115200bps,
      0,
      0,
      0x55,
      0xaa,
      1,
      2,
      0x80,
      0xff,
      0x81,
    ]);
    const req = new Request(data);
    req.address = AddressMapping.FuncCard_WriteOutDeviceAddr;
    req.deviceType = DeviceType.FunctionCard;
    req.destination = senderIndex;
    req.port = portIndex;
    req.rcvIndex = cardIndex;
    let res = await this.session.connection.trySend(req);
    if (!res || res.ack !== 0) return null;
    res = await this.session.tryFuncCard_ReadOutDeviceValue_1(senderIndex, portIndex, cardIndex);
    if (
      !res ||
      res.ack !== 0 ||
      res.data.length !== 5 ||
      res.data[0] !== 1 ||
      res.data[1] !== 2 ||
      crc8(res.data.slice(1, -1)) !== res.data[4] ||
      (res.data[2] & 0x80) === 0
    )
      return null;
    return (((res.data[2] & 0x7f) << 8) + res.data[3]) * 2;
  }

  protected createReadGenerator<N extends ReadNames, T>(
    name: N,
    decoder: (res: Packet) => T,
  ): ScreenReadAsyncGenerator<T> {
    return {
      async* [name](this: ScreenConfigurator, screen = 0): AsyncGenerator<Awaited<T> | null> {
        const addresses = this.GetScreenAllPort(screen, true);
        for (const address of addresses) {
          const {
            SenderIndex,
            PortIndex,
            ScanIndex,
          } = address;
          yield this.session[`try${name}`](SenderIndex, PortIndex, ScanIndex).then(res =>
            !res || res.ack !== 0 ? null : decoder(res),
          );
        }
      },
    }[name].bind(this);
  }

  protected createWriter<N extends FilterHasTry<SessionAPI>[WriteNames], I = ValueTypeFromName<N>>(
    name: N,
    encoder: Codec<I, ValueTypeFromName<N>> = identity,
  ): ScreenWriter<I> {
    return {
      async [name](this: ScreenConfigurator, value: I, screen = -1): Promise<ConsolidatedResult> {
        const addresses = this.GetScreenAllPort(screen);
        // debug(`addresses: ${JSON.stringify(addresses)}`);
        const val = encoder(value) as never;
        const results = await series(
          addresses,
          ({
            SenderIndex,
            PortIndex,
            ScanIndex,
          }) =>
            this.session[`try${name}`](SenderIndex, PortIndex, ScanIndex, val),
        );
        return consolidateResults(results);
      },
    }[name].bind(this);
  }

  protected queue<A, R>(
    func: (this: ScreenConfigurator, ...args: A[]) => Promise<R>,
  ): (...args: A[]) => Promise<R> {
    return (...args) =>
      new Promise((resolve, reject) => {
        this.#ready = this.#ready.finally(() => func.apply(this, args).then(resolve, reject));
      });
  }

  /**
   * ScreenInfoAccessor::LoadDviScreenInfoFromHW
   * NovaLCT::FormMain::OnEquipmentChangeEvent
   */
  protected async reloadImpl(): Promise<void> {
    this.reset();
    this.#devices = await enumerateDevices(this.session);
    debug(`devices: ${JSON.stringify(this.devices)}`);
    if (this.devices.length > 1) throw new Error('An unexpected number of devices!');
    await series(
      this.devices,
      async ({
        maxPackageSize,
        model,
      }, index): Promise<void> => {
        if (!IsSystemController(model)) return;
        this.session.connection.maxLength = maxPackageSize;
        await this.readBase(index);
        await this.readRedundancy(index);
        await this.readModulation(index);
      },
    );
  }

  // TODO: Not Impl
  /**
   * Nova.LCT.GigabitSystem.CommonInfoAccessor.dll
   *
   * Nova.LCT.GigabitSystem.CommonInfoAccessor::ScreenInfoAccessor::SaveDviScreenInfoToHW
   * @protected
   */
  protected async saveImpl(): Promise<void> {
    // Only one device expected
    // SetScreenConfigFalg
    await series(this.devices, async ({ maxPackageSize }, index) => {
      this.session.connection.maxLength = maxPackageSize;
      await this.session.SetSender_ScreenConfigFlagSpace(index, false, [85, 0]);
    });
    const items = splitScreensByDevice(
      this.screens.map(convertLEDDisplayInfoToScreenDataInSoftSpace),
    );
    if (items.length !== this.devices.length) throw new Error('Invalid number of devices');
    // NewSoftSpaceBasicAccessor::CompressFile
    await series(items, async (screens, index) => {
      const src = JSON.stringify(
        ScreenDataInSoftSpaceList.encode({
          ScreenDataInSoftSpace: screens,
        }),
      );
      const [props, fileCompressDataArea] = await pack(src);
      const info: FileInfoObject = {
        FileType: ScreenFileType,
        Version: ScreenFileVersion,
        Addr: FILE_COMPRESS_AREA_START_ADDR,
        SrcLength: src.length,
        DestLength: fileCompressDataArea.length,
        DecompressProps: props,
        CheckSum: crc16(fileCompressDataArea, 0x55aa),
      };
      // NewSoftSpaceBasicAccessor::CompressFileInfo
      const srcInfo = Buffer.from(
        JSON.stringify({
          SectionFormat: [info],
        }),
      );
      const [infoProps, fileInfoCompressDataArea] = await pack(srcInfo);
      const nonCompressDataArea = Buffer.alloc(ParamSize);
      nonCompressDataArea.writeUInt16LE(infoProps.length);
      nonCompressDataArea.write(infoProps, 2, 'binary');
      // NewSoftSpaceBasicAccessor::ConstructSpaceHeader
      const ss = new SoftwareSpaceHeader();
      ss.header = SoftwareSpaceHeaderFlag;
      ss.version = SoftwareSpaceHeaderVersion;
      ss.paramSize = ParamSize;
      ss.paramCRC = crc16(nonCompressDataArea, 0x55aa);
      ss.compressedSize = fileInfoCompressDataArea.length;
      ss.fileInfoSize = srcInfo.length;
      ss.fileInfoCRC = crc16(fileInfoCompressDataArea, 0x55aa);
      const raw = SoftwareSpaceHeader.raw(ss);
      ss.crc = crc16(raw.slice(SoftwareSpaceHeader.getOffsetOf('crc') + 2), 0x55aa);
      const spaceData = Buffer.alloc(0x2000 + fileCompressDataArea.length);
      raw.copy(spaceData);
      nonCompressDataArea.copy(spaceData, 512);
      fileInfoCompressDataArea.copy(spaceData, 1024);
      fileCompressDataArea.copy(spaceData, 0x2000);
      await this.WriteData(index, AddressMapping.Sender_SoftwareSpaceAddr, spaceData);
    });
  }

  protected async saveRedundancy(index: number): Promise<void> {
    const data = encodeRedundancyInfo(this.reduList);
    await this.session.SetSender_SoftwareSpace(
      index,
      false,
      data,
      data.length,
      SoftwareSpaceBaseAddress.REDUNDANCY_BASE_ADDRESS,
    );
  }

  // ScannerPropertyAccessor
  protected async sendParametersToScanBoardGroupImpl(
    scanBdProperty: Readonly<ScanBoardProperty>,
    isSmartMode = false,
    isSmartNoSend = true,
    senderIndex = 255,
    portIndex = 255,
    scanBdIndex = 0xffff,
  ): Promise<void> {
    if (!isValidScanBdProp(scanBdProperty)) throw new TypeError('Invalid ScanBoardProperty');
    const copy = { ...scanBdProperty };
    const {
      StandardLedModuleProp,
      Support22BitModel,
    } = scanBdProperty;
    if (!isValidStandardLedModuleProp(StandardLedModuleProp))
      throw new TypeError('Invalid StandardLedModuleProp');
    const {
      ScreenDriveType,
      DriverChipType,
    } = StandardLedModuleProp;
    // ChipDataMaker.GetChipInfo <- skipped (2053)
    if (!isSmartMode) {
      await this.session.SetSelfTestMode(
        senderIndex,
        portIndex,
        scanBdIndex,
        false,
        TestModeEnum.ParaFreeze,
      );
      await delay(1000);
    }
    // ScannerPropertyDataProcess.Instance.ScanBdPropertyExchanged <- skipped
    if (Support22BitModel) {
      await this.session.SetScannerxBitEnable(senderIndex, portIndex, scanBdIndex, false, 100);
      await delay(100);
    }
    const autoRefreshRates = GetAutoRefreshRateBytesSeq(
      SetVariousScanBdRefreshRate(scanBdProperty, isSmartMode),
    );
    await this.session.SetScanner_AutoRefreshRate(
      senderIndex,
      portIndex,
      scanBdIndex,
      false,
      autoRefreshRates,
    );
    const smartMode = GetSmartMode(isSmartMode, ScreenDriveType, DriverChipType);
    await this.session.SetSmartSetMode(senderIndex, portIndex, scanBdIndex, false, smartMode);
    copy.IsEnableOtherRefreshNumParams = !isSmartMode;
  }

  /**
   * Nova.LCT.GigabitSystem.LEDConfigAccessor
   *
   * Nova.LCT.GigabitSystem.HWConfigAccessor::PollingScannerParam
   *
   * ScannerPropertyAccessor::StartPollingScannerAccessor
   * @constructor
   * @protected
   */
  protected async ExecuteCheck(req: Readonly<Request>): Promise<void> {
    const {
      destination,
      port,
      rcvIndex,
    } = req;
    let attempts = 20;
    while (attempts > 0) {
      // ReadRegisterState
      // eslint-disable-next-line no-await-in-loop
      const res = await this.session.tryReadScannerFunctionInfo(destination, port, rcvIndex);
      if (res) return;
      attempts -= 1;
      // eslint-disable-next-line no-await-in-loop
      if (attempts) await delay(400);
    }
    throw new Error('Hardware timeout');
  }

  /**
   * Nova.LCT.GigabitSystem.CommonInfoAccessor, RedundancyInfoAccessor
   */
  private async readRedundancy(index: number): Promise<void> {
    const info = new RedundancyInfo(
      await this.session.ReadSender_SoftwareSpace(
        index,
        RedundancyInfo.baseSize,
        SoftwareSpaceBaseAddress.REDUNDANCY_BASE_ADDRESS,
      ),
    );
    debug(`redundancyHeader: ${info.header} (${info.length})`);
    if (info.header !== ReduFlag || info.length === 0) return;
    const data = await this.session.ReadSender_SoftwareSpace(
      index,
      RedundancyInfo.baseSize + info.length,
      SoftwareSpaceBaseAddress.REDUNDANCY_BASE_ADDRESS,
    );
    this.#reduList = decodeRedundancyInfo(data);
    debug(`redundancy: ${JSON.stringify(this.reduList)}`);
  }

  private async readModulation(index = 0): Promise<void> {
    const data = await this.session.ReadSender_SoftwareSpace(
      index,
      ModulationInfoHeader.baseSize,
      SoftwareSpaceBaseAddress.MODULATION_BASE_ADDRESS,
    );
    const header = new ModulationInfoHeader(data);
    if (header.header !== SenderModulationFlag || header.length === 0) return;
    const total = header.length + ModulationInfoHeader.baseSize;
    const buf = await this.session.ReadSender_SoftwareSpace(
      0,
      total,
      SoftwareSpaceBaseAddress.MODULATION_BASE_ADDRESS,
    );
    this.#modulations = decodeModulationInfo(buf);
    debug(`modulations: ${JSON.stringify(this.modulations)}`);
  }

  private async saveModulation(index: number): Promise<void> {
    const data = encodeModulationInfo(this.modulations);
    await this.session.SetSender_SoftwareSpace(
      index,
      false,
      data,
      data.length,
      SoftwareSpaceBaseAddress.MODULATION_BASE_ADDRESS,
    );
  }

  private async readBase(index: number) {
    debug(`try readBase:${index}`);
    const spaceHeader = await this.session.ReadSender_SoftwareSpace(
      index,
      512, // HEADER_LENGTH
      SoftwareSpaceBaseAddress.BASE_ADDRESS,
    );
    /**
     * ScreenInfoAccessor::OnReadSpaceTypeCompleted
     */
    const header = spaceHeader.slice(0, 4).toString('ascii');
    debug(`readBase: ${header}`);
    switch (header) {
      case 'NSSD': // after sendConfig;
        return this.ReadSoftSpaceData(spaceHeader, index);
      case DviScreenInfoFlag:
        return this.ReadDviScreenInfo(spaceHeader, index);
      case '\x00\x00\x00\x00': // Quick Config
        return this.ReadSenderScreenConfigInfo(index);
      default:
        throw new TypeError('Unknown header type');
    }
  }

  /**
   * Nova.GigabitController.FrmSysConfigMode
   */
  private async SetScreenALLWidth(): Promise<boolean | null> {
    const results = await series(this.screens, scr => {
      const location = getScreenLocation(scr);
      const senders = GetScreenSenderAddrInfo(scr);
      return series(senders, ({ SenderIndex }) =>
        this.session.trySetSenderVideoEnclosingMode(
          SenderIndex,
          location.rightBottom.x,
          location.rightBottom.y,
        ),
      );
    });
    return consolidateResults(results.flat(1));
  }

  private async ReadDviScreenInfo(header: Buffer, index: number): Promise<void> {
    debug(`${DviScreenInfoFlag}: ReadDviScreenInfo`);
    if (header.length < DviScreenConfigInfo.baseSize)
      throw new TypeError('Invalid DviScreenConfigInfo header length');
    const dsci = new DviScreenConfigInfo(header.slice(0, DviScreenConfigInfo.baseSize));
    const {
      dviInfoLength,
      screenInfoLength,
      adjustInfoLength,
    } = dsci;
    const data = await this.session.ReadSender_SoftwareSpace(
      index,
      DviScreenConfigInfo.baseSize + dviInfoLength + screenInfoLength + adjustInfoLength,
      SoftwareSpaceBaseAddress.BASE_ADDRESS,
    );
    const {
      screens,
      dviVersion,
      dviInfo,
      dviExtends,
    } = decodeScreenConfig(data);
    this.#screens = screens;
    this.#dviVersion = dviVersion;
    this.#dviInfo = dviInfo;
    this.#dviExtends = dviExtends;
    // if (crc(data, crc(DviScreenConfigInfo.raw(dsci).slice(6), 0)) !== crcInfo)
    //   throw new Error(`Invalid DviScreenConfigInfo crc`);
    // [this.#dviInfo, this.#dviVersion] = parseGraphicsDVIPortInfo(data.slice(0, dviInfoLength));
    // debug(`dviInfo: ${JSON.stringify(this.#dviInfo)}`);
    // debug(`dviVersion: ${this.#dviVersion}`);
    // [this.#screens, this.#screenVersion] = parseScreenInfo(
    //   data.slice(dviInfoLength, dviInfoLength + screenInfoLength)
    // );
    // const adjustInfo = parseScreenAdjustInfo(data.slice(dviInfoLength + screenInfoLength));
    // if (adjustInfo.length > 0) {
    //   if (adjustInfo.length !== this.screens.length) throw new Error('Invalid adjust info
    // count'); this.#screens = this.#screens.map(({ ScrAdjustParams, ...other }, i) => ({
    // ...other, ScrAdjustParams: adjustInfo[i], })); } debug(`screens:
    // ${JSON.stringify(this.#screens)}`);
  }

  private async ReadSenderScreenConfigInfo(index: number): Promise<void> {
    debug('0000: ReadSenderScreenConfigInfo');
    const res = await this.session.tryReadSender_ScreenConfigSpace(index);
    if (!res) return;
    const {
      Type,
      ScanBdCols,
      ScanBdRows,
      CabinetsPerPort,
      PixelColsInScanBd,
      PixelRowsInScanBd,
      ConnectType,
      X,
      Y,
    } = new ScreenConfigInfo(res.data);
    switch (Type) {
      case 1: {
        if (!ScanBdCols || !ScanBdRows || !CabinetsPerPort) throw new Error('Invalid screen cfg');
        const total = ScanBdRows * ScanBdCols;
        const portCount = Math.ceil(total / CabinetsPerPort);
        if (CabinetsPerPort % (isHorizontalConnection(ConnectType) ? ScanBdCols : ScanBdRows) !== 0)
          throw new ConfigurationError('Invalid cabinetsPerPort');
        let portCols = 0;
        let portRows = 0;
        let ports: PortScanBoardInfo[] = [];
        if (isHorizontalConnection(ConnectType)) {
          portCols = 1;
          portRows = portCount;
          const getRow = (row: number) =>
            minimax(0, ScanBdRows, isTopConnection(ConnectType) ? row : ScanBdRows - row);
          const rowsPerPort = CabinetsPerPort / ScanBdCols;
          ports = range(portCount).map<PortScanBoardInfo>(PortIndex => {
            const extremes = [
              getRow(PortIndex * rowsPerPort),
              getRow((PortIndex + 1) * rowsPerPort),
            ];
            return makeStruct(PortScanBoardInfo, {
              PortIndex,
              ConnectType,
              ScanBdBegColNo: 0,
              ScanBdEndColNo: ScanBdCols,
              ScanBdBegRowNo: Math.min(...extremes),
              ScanBdEndRowNo: Math.max(...extremes),
            });
          });
        } else {
          portCols = portCount;
          portRows = 1;
          const getCol = (col: number) =>
            minimax(0, ScanBdCols, isLeftConnection(ConnectType) ? col : ScanBdCols - col);
          const colsPerPort = CabinetsPerPort / ScanBdRows;
          ports = range(portCount).map<PortScanBoardInfo>(PortIndex => {
            const extremes = [
              getCol(PortIndex * colsPerPort),
              getCol((PortIndex + 1) * colsPerPort),
            ];
            return makeStruct(PortScanBoardInfo, {
              PortIndex,
              ConnectType,
              ScanBdBegRowNo: 0,
              ScanBdEndRowNo: ScanBdRows,
              ScanBdBegColNo: Math.min(...extremes),
              ScanBdEndColNo: Math.max(...extremes),
            });
          });
        }
        this.#screens = [
          makeStruct(SimpleLEDDisplayInfo, {
            Type: LEDDisplyTypeEnum.SimpleSingleType,
            PixelColsInScanBd,
            PixelRowsInScanBd,
            ScanBdCols,
            ScanBdRows,
            PortCols: portCols,
            PortRows: portRows,
            SenderIndex: 0,
            X,
            Y,
            VirtualMode: VirtualModeTypeEnum.Disable,
            PortScanBdInfoList: ports,
          }),
        ];
        break;
      }
      case 3: {
        if (this.#screens.length === 1) {
          const [screen] = this.#screens;
          if (isSimpleScreen(screen) && UInt16.is(X) && UInt16.is(Y)) {
            screen.X = X;
            screen.Y = Y;
          }
        }
        break;
      }
      case 5:
        break;
      default:
        throw new TypeError('Invalid screen config type');
    }
    debug(`screens: ${JSON.stringify(this.screens)}`);
  }

  private async ReadData(index: number, address: number, length: number): Promise<Buffer> {
    const req = new Request(length);
    req.address = address;
    req.destination = index;
    const { data } = await this.session.connection.send(req);
    return data;
  }

  private async WriteData(index: number, address: number, data: Buffer): Promise<void> {
    const req = new Request(data);
    req.address = address;
    req.destination = index;
    await this.session.connection.send(req);
  }

  private async ReadSoftSpaceData(spaceHeader: Buffer, index: number): Promise<void> {
    debug('NSSD: ReadSoftSpaceData');
    const ss = new SoftwareSpaceHeader(spaceHeader);
    if (crc16(spaceHeader.slice(SoftwareSpaceHeader.getOffsetOf('crc') + 2), 0x55aa) !== ss.crc)
      throw new Error('Invalid space header crc');
    if (ss.paramSize !== ParamSize) throw new Error('Invalid uncompressedSize');
    const paramData = await this.ReadData(index, ParamAddress, ss.paramSize);
    if (ss.paramCRC !== crc16(paramData, 0x55aa)) throw new Error('Param crc error');
    const fileInfoCompressData = await this.ReadData(
      index,
      FileInfoCompressedAddress,
      ss.compressedSize,
    );
    if (ss.fileInfoCRC !== crc16(fileInfoCompressData, 0x55aa))
      throw new Error('FileInfoCRC error');
    const fileInfoListV = FileInfoObjectList.decode(
      JSON.parse(await unpack(paramData.slice(2), ss.fileInfoSize, fileInfoCompressData)),
    );
    if (isLeft(fileInfoListV))
      throw new Error(`Invalid fileInfoList: ${PathReporter.report(fileInfoListV)}`);
    const fileInfoList = fileInfoListV.right;
    debug(`fileInfoList: ${JSON.stringify(fileInfoList)}`);
    // console.log(inspect(fileInfoList, false, null));
    const screens = (
      await series(fileInfoList.SectionFormat, async (info): Promise<ScreenDataInSoftSpace[]> => {
        const fi = await this.ReadData(index, info.Addr, info.DestLength);
        const list = JSON.parse(await unpack(info.DecompressProps, info.SrcLength, fi));
        // console.log(inspect(list, false, null));
        const screenListV = ScreenDataInSoftSpaceList.decode(list);
        if (isLeft(screenListV)) {
          console.error(PathReporter.report(screenListV));
          throw new Error('Invalid screenList');
        }
        // console.log('screenList:', inspect(screenListV.right, false, null));
        return packAndSortCabinets(screenListV.right.ScreenDataInSoftSpace, index);
      })
    ).flat(1);

    // console.log('packed:', screensByDevices.length, inspect(screensByDevices, false, null));
    this.#screens = screens.map(convertScreenDataInSoftSpaceToLEDDisplayInfo);
    debug(`screens: ${JSON.stringify(this.screens)}`);
    // console.log('screens:', inspect(this.#screens, false, null));
    // this.screens.forEach((screen, i) => {
    //   console.log('ports', inspect(GetScreenPortAddrInfo(screen), false, null));
    //   console.log('scr:', inspect(GetScreenSenderAddrInfo(screen), false, null));
    //   console.log('all:', inspect(this.GetScreenAllPort(i), false, null));
    // });
  }
}
