/* eslint-disable no-bitwise */
import { Duplex } from 'stream';

import {
  Connection,
  decodeUIntLE,
  delay,
  DeviceType,
  notEmpty,
  Request,
  series,
  Session,
} from '@novastar/codec';
import { makeStruct, UInt16 } from '@novastar/native/build/main/common';
import AddressMapping from '@novastar/native/build/main/generated/AddressMapping';
import { ChipTypeEnum } from '@novastar/native/build/main/generated/ChipType';
import type { GraphicsDVIPortInfo } from '@novastar/native/build/main/generated/GraphicsDVIPortInfo';
import { LEDDisplyTypeEnum } from '@novastar/native/build/main/generated/LEDDisplyType';
import { PortScanBoardInfo } from '@novastar/native/build/main/generated/PortScanBoardInfo';
import type { ScanBoardProperty } from '@novastar/native/build/main/generated/ScanBoardProperty';
import { ScreenDataInSoftSpace } from '@novastar/native/build/main/generated/ScreenDataInSoftSpace';
import type { SenderModulationInfo } from '@novastar/native/build/main/generated/SenderModulationInfo';
import type { SenderRedundancyInfo } from '@novastar/native/build/main/generated/SenderRedundancyInfo';
import { SimpleLEDDisplayInfo } from '@novastar/native/build/main/generated/SimpleLEDDisplayInfo';
import SoftwareSpaceBaseAddress from '@novastar/native/build/main/generated/SoftwareSpaceBaseAddress';
import { TestModeEnum } from '@novastar/native/build/main/generated/TestMode';
import { VirtualModeTypeEnum } from '@novastar/native/build/main/generated/VirtualModeType';
import debugFactory from 'debug';
import { isLeft } from 'fp-ts/lib/Either';
import * as t from 'io-ts';
import { PathReporter } from 'io-ts/lib/PathReporter';
import isEqual from 'lodash/isEqual';
import range from 'lodash/range';
import uniqWith from 'lodash/uniqWith';

import { isValidScanBdProp, isValidStandardLedModuleProp } from './CommonCalculator';
import ConfigurationError from './ConfigurationError';
import { GetSmartMode, IsSystemController } from './CustomTransform';
import { DeviceInfo } from './DeviceInfo';
import { DviScreenConfigInfo, DviScreenInfoFlag } from './DviScreenConfigInfo';
import {
  FILE_COMPRESS_AREA_START_ADDR,
  FileInfoObject,
  FileInfoObjectList,
  ScreenFileType,
  ScreenFileVersion,
} from './FileInfo';
import GetScreenPortAddrInfo from './GetScreenPortAddrInfo';
import GetScreenSenderAddrInfo from './GetScreenSenderAddrInfo';
import { GetAutoRefreshRateBytesSeq, SetVariousScanBdRefreshRate } from './HWAccessorCalculator';
import {
  decodeModulationInfo,
  encodeModulationInfo,
  ModulationInfoHeader,
  SenderModulationFlag,
} from './ModulationInfo';
import {
  decodeRedundancyInfo,
  encodeRedundancyInfo,
  ReduFlag,
  RedundancyInfo,
} from './RedundancyInfo';
import { ScreenConfigInfo } from './ScreenConfigInfo';
import { DVI1600Info } from './ScreenInfo';
import { SessionAPI } from './Session';
import {
  ParamSize,
  SoftwareSpaceHeader,
  SoftwareSpaceHeaderFlag,
  SoftwareSpaceHeaderVersion,
} from './SoftwareSpaceHeader';
import {
  crc,
  firstNotNull,
  isHorizontalConnection,
  isLeftConnection,
  isSimpleScreen,
  isTopConnection,
  LEDDisplayInfo,
  minimax,
  pack,
  unpack,
} from './common';
import { decodeScreenConfig } from './configs';
import convertLEDDisplayInfoToScreenDataInSoftSpace from './convertLEDDisplayInfoToScreenDataInSoftSpace';
import convertScreenDataInSoftSpaceToLEDDisplayInfo from './convertScreenDataInSoftSpaceToLEDDisplayInfo';
import enumerateDevices from './enumerator';
import getScreenLocation from './getScreenLocation';
import packAndSortCabinets from './packAndSortCabinets';
import splitScreensByDevice from './splitScreensByDevice';

const debug = debugFactory('screen:cfg');
const AllSenders = 0xff;
const AllPorts = 0xff;
const AllScanBoards = 0xffff;

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

export type BrightnessRGBV = {
  overall: number;
  red: number;
  green: number;
  blue: number;
  vRed: number;
};

// noinspection JSMethodCanBeStatic,JSUnusedGlobalSymbols
export default class ScreenConfigurator {
  reload: () => Promise<void> = this.queue(this.reloadImpl);

  save: () => Promise<void> = this.queue(this.saveImpl);

  #ready = Promise.resolve();

  #devices: DeviceInfo[] = [];

  #screens: LEDDisplayInfo[] = [];

  #dviInfo?: GraphicsDVIPortInfo;

  #dviExtends?: DVI1600Info;

  #reduList: Required<SenderRedundancyInfo>[] = [];

  #modulations: Required<SenderModulationInfo>[] = [];

  #dviVersion = 0;

  #screenVersion = 0;

  readonly session: SessionAPI;

  constructor(connection: Connection<Duplex>);

  constructor(session: Session);

  constructor(arg: Session | Connection<Duplex>) {
    this.session = (arg instanceof Connection ? new Session(arg) : arg) as SessionAPI;
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
    selectedScreen = 0,
    toRead = false
  ): { SenderIndex: number; PortIndex: number; ScanIndex: number }[] {
    if (this.screens.length === 0) return [];
    const scr = this.screens[selectedScreen];
    if (!scr) throw new TypeError(`Invalid screen index: ${selectedScreen}`);
    const main = GetScreenPortAddrInfo(scr).map(({ SenderIndex, PortIndex }) => ({
      SenderIndex,
      PortIndex,
      ScanIndex: 0xffff,
    }));
    const redundancy = this.reduList
      .filter(item =>
        main.some(
          ({ SenderIndex, PortIndex }) =>
            item.MasterSenderIndex === SenderIndex && item.MasterPortIndex === PortIndex
        )
      )
      .map(({ SlaveSenderIndex, SlavePortIndex }) => ({
        SenderIndex: SlaveSenderIndex,
        PortIndex: SlavePortIndex,
        ScanIndex: 0xffff,
      }));
    const list = uniqWith([...main, ...redundancy], isEqual);
    return toRead ? list.filter(({ SenderIndex }) => SenderIndex !== AllSenders) : list;
  }

  async ReadBrightness(selectedScreen = 0): Promise<number | null> {
    const addresses = this.GetScreenAllPort(selectedScreen, true);

    const res = await firstNotNull(addresses, address =>
      this.session.tryReadGlobalBrightness(
        address.SenderIndex,
        address.PortIndex,
        address.ScanIndex
      )
    );
    const brightness = res && Math.round((decodeUIntLE(res) * 100) / 255);
    debug(`brightness[${selectedScreen}] = ${brightness}`);
    return brightness;
  }

  async WriteBrightness(percent: number, screen = 0): Promise<boolean> {
    const addresses = this.GetScreenAllPort(screen);
    const value = Math.round((minimax(0, 100, percent) * 255) / 100);
    if (addresses.length === 0) {
      await this.session.SetGlobalBrightness(AllSenders, AllPorts, AllScanBoards, true, value);
      return true;
    }
    const results = await series(addresses, address =>
      this.session.trySetGlobalBrightness(
        address.SenderIndex,
        address.PortIndex,
        address.ScanIndex,
        value
      )
    );
    return results.every(res => res);
  }

  async ReadRGBVBrightness(selectedScreen = 0): Promise<BrightnessRGBV | null> {
    const addresses = this.GetScreenAllPort(selectedScreen, true);

    const res = await firstNotNull(addresses, address =>
      this.session.tryReadAllBrightnessInfo(
        address.SenderIndex,
        address.PortIndex,
        address.ScanIndex
      )
    );
    if (res === null) return null;
    const [overall, red, green, blue, vRed] = res.data;
    debug(`brightnessRGBV[${selectedScreen}] = [${overall}, ${red}, ${green}, ${blue}, ${vRed}]`);
    return {
      overall,
      red,
      green,
      blue,
      vRed,
    };
  }

  async WriteRGBVBrightness(
    { overall, red, green, blue, vRed }: BrightnessRGBV,
    screen = 0
  ): Promise<boolean> {
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
      return (await this.session.connection.trySend(req)) !== null;
    });
    return results.every(res => res);
  }

  async FactoryReset(screen = 0): Promise<boolean> {
    this.session.pushTimeout(60000);
    try {
      return (await this.session.trySetReturnFactoryValues(screen, 0)) !== null;
    } finally {
      this.session.popTimeout();
    }
  }

  async ReadGamma(selectedScreen = 0): Promise<number | null> {
    const addresses = this.GetScreenAllPort(selectedScreen, true);

    const res = await firstNotNull(addresses, address =>
      this.session.tryReadGamma(address.SenderIndex, address.PortIndex, address.ScanIndex)
    );
    const gamma = res?.ack === 0 ? decodeUIntLE(res) / 10 : null;
    debug(`gamma[${selectedScreen}] = ${gamma}`);
    return gamma;
  }

  async WriteGamma(gamma: number, screen = 0): Promise<boolean> {
    const addresses = this.GetScreenAllPort(screen);
    const value = (gamma * 10) & 0xff;
    if (addresses.length === 0) {
      await this.session.SetGamma(AllSenders, AllPorts, AllScanBoards, true, value);
      return true;
    }
    const results = await series(addresses, address =>
      this.session.trySetGamma(address.SenderIndex, address.PortIndex, address.ScanIndex, value)
    );
    return results.every(res => res);
  }

  async ReadDisplayMode(screen = 0): Promise<TestModeEnum | null> {
    const addresses = this.GetScreenAllPort(screen, true);
    const res = await firstNotNull(addresses, address =>
      this.session.tryReadSelfTestMode(address.SenderIndex, address.PortIndex, address.ScanIndex)
    );
    const mode = res?.ack === 0 ? decodeUIntLE(res) : null;
    debug(`DisplayMode[${screen}] = ${mode && TestModeEnum[mode]}`);
    return mode;
  }

  async WriteDisplayMode(mode: TestModeEnum, screen = 0): Promise<boolean> {
    const addresses = this.GetScreenAllPort(screen);
    if (addresses.length === 0) {
      await this.session.SetSelfTestMode(AllSenders, AllPorts, AllScanBoards, true, mode);
      return true;
    }
    const results = await series(addresses, address =>
      this.session.trySetSelfTestMode(
        address.SenderIndex,
        address.PortIndex,
        address.ScanIndex,
        mode
      )
    );
    return results.every(res => res);
  }

  async ReadHasDVISignalIn(device = 0): Promise<boolean> {
    return (await this.session.ReadIsHasDVI(device)) !== 0;
  }

  async ReadChipType(selectedScreen = 0): Promise<ChipTypeEnum | null> {
    const addresses = this.GetScreenAllPort(selectedScreen, true);
    const res = await firstNotNull(addresses, address =>
      this.session.tryReadDriverType(address.SenderIndex, address.PortIndex, address.ScanIndex)
    );
    const chipType = res?.ack === 0 ? decodeUIntLE(res) : null;
    debug(`ChipType[${selectedScreen}] = ${chipType && ChipTypeEnum[chipType]}`);
    return chipType;
  }

  async ReadReceivingCardFPGARemarks(selectedScreen = 0): Promise<string[]> {
    const addresses = this.GetScreenAllPort(selectedScreen, true);
    const remarks = await series(addresses, ({ SenderIndex, PortIndex, ScanIndex }) =>
      this.session.tryReadScanner_FPGAProgramRemarks(SenderIndex, PortIndex, ScanIndex)
    );
    return remarks
      .filter(notEmpty)
      .filter(res => res.ack === 0)
      .map(({ data }) => {
        const end = data.indexOf(0);
        return data.slice(0, end).toString();
      });
  }

  async ReadReceivingCardMCURemarks(selectedScreen = 0): Promise<string[]> {
    const addresses = this.GetScreenAllPort(selectedScreen, true);
    const remarks = await series(addresses, ({ SenderIndex, PortIndex, ScanIndex }) =>
      this.session.tryReadScanner_McuProgramRemarks(SenderIndex, PortIndex, ScanIndex)
    );
    return remarks
      .filter(notEmpty)
      .filter(res => res.ack === 0)
      .map(({ data }) => {
        const end = data.indexOf(0);
        return data.slice(0, end).toString();
      });
  }

  /*
  async Read2053Brightness(selectedScreen = 0): Promise<number | null> {
    const [address] = this.GetScreenAllPort(selectedScreen, true);
    if (!address) return null;
    const brightness = await this.session.ReadGlobalBrightness(
      address.SenderIndex,
      address.PortIndex,
      address.ScanIndex
    );
    const gammaMax = await this.session.ReadGammaMaxValue2053(
      address.SenderIndex,
      address.PortIndex,
      address.ScanIndex
    );
    const result = Math.round((brightness * gammaMax) / 255);
    console.log({
      brightness,
      gammaMax,
      result,
    });
    return result;
  }
*/

  protected queue<A, R>(func: (...args: A[]) => Promise<R>): (...args: A[]) => Promise<R> {
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
    await series(this.devices, async ({ maxPackageSize, model }, index): Promise<void> => {
      if (!IsSystemController(model)) return;
      this.session.connection.maxLength = maxPackageSize;
      await this.readBase(index);
      await this.readRedundancy(index);
      await this.readModulation(index);
    });
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
      this.screens.map(convertLEDDisplayInfoToScreenDataInSoftSpace)
    );
    if (items.length !== this.devices.length) throw new Error('Invalid number of devices');
    // NewSoftSpaceBasicAccessor::CompressFile
    await series(items, async (screens, index) => {
      const src = JSON.stringify(
        ScreenDataInSoftSpaceList.encode({
          ScreenDataInSoftSpace: screens,
        })
      );
      const [props, fileCompressDataArea] = await pack(src);
      const info: FileInfoObject = {
        FileType: ScreenFileType,
        Version: ScreenFileVersion,
        Addr: FILE_COMPRESS_AREA_START_ADDR,
        SrcLength: src.length,
        DestLength: fileCompressDataArea.length,
        DecompressProps: props,
        CheckSum: crc(fileCompressDataArea, 0x55aa),
      };
      // NewSoftSpaceBasicAccessor::CompressFileInfo
      const srcInfo = Buffer.from(
        JSON.stringify({
          SectionFormat: [info],
        })
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
      ss.paramCRC = crc(nonCompressDataArea, 0x55aa);
      ss.compressedSize = fileInfoCompressDataArea.length;
      ss.fileInfoSize = srcInfo.length;
      ss.fileInfoCRC = crc(fileInfoCompressDataArea, 0x55aa);
      const raw = SoftwareSpaceHeader.raw(ss);
      ss.crc = crc(raw.slice(SoftwareSpaceHeader.getOffsetOf('crc') + 2), 0x55aa);
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
      SoftwareSpaceBaseAddress.REDUNDANCY_BASE_ADDRESS
    );
  }

  // ScannerPropertyAccessor
  protected async sendParametersToScanBoardGroupImpl(
    scanBdProperty: Readonly<ScanBoardProperty>,
    isSmartMode = false,
    isSmartNoSend = true,
    senderIndex = 255,
    portIndex = 255,
    scanBdIndex = 0xffff
  ): Promise<void> {
    if (!isValidScanBdProp(scanBdProperty)) throw new TypeError('Invalid ScanBoardProperty');
    const copy = { ...scanBdProperty };
    const { StandardLedModuleProp, Support22BitModel } = scanBdProperty;
    if (!isValidStandardLedModuleProp(StandardLedModuleProp))
      throw new TypeError('Invalid StandardLedModuleProp');
    const { ScreenDriveType, DriverChipType } = StandardLedModuleProp;
    // ChipDataMaker.GetChipInfo <- skipped (2053)
    if (!isSmartMode) {
      await this.session.SetSelfTestMode(
        senderIndex,
        portIndex,
        scanBdIndex,
        false,
        TestModeEnum.ParaFreeze
      );
      await delay(1000);
    }
    // ScannerPropertyDataProcess.Instance.ScanBdPropertyExchanged <- skipped
    if (Support22BitModel) {
      await this.session.SetScannerxBitEnable(senderIndex, portIndex, scanBdIndex, false, 100);
      await delay(100);
    }
    const autoRefreshRates = GetAutoRefreshRateBytesSeq(
      SetVariousScanBdRefreshRate(scanBdProperty, isSmartMode)
    );
    await this.session.SetScanner_AutoRefreshRate(
      senderIndex,
      portIndex,
      scanBdIndex,
      false,
      autoRefreshRates
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
    const { destination, port, rcvIndex } = req;
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
        SoftwareSpaceBaseAddress.REDUNDANCY_BASE_ADDRESS
      )
    );
    debug(`redundancyHeader: ${info.header} (${info.length})`);
    if (info.header !== ReduFlag || info.length === 0) return;
    const data = await this.session.ReadSender_SoftwareSpace(
      index,
      RedundancyInfo.baseSize + info.length,
      SoftwareSpaceBaseAddress.REDUNDANCY_BASE_ADDRESS
    );
    this.#reduList = decodeRedundancyInfo(data);
    debug(`redundancy: ${JSON.stringify(this.reduList)}`);
  }

  private async readModulation(index = 0): Promise<void> {
    const data = await this.session.ReadSender_SoftwareSpace(
      index,
      ModulationInfoHeader.baseSize,
      SoftwareSpaceBaseAddress.MODULATION_BASE_ADDRESS
    );
    const header = new ModulationInfoHeader(data);
    if (header.header !== SenderModulationFlag || header.length === 0) return;
    const total = header.length + ModulationInfoHeader.baseSize;
    const buf = await this.session.ReadSender_SoftwareSpace(
      0,
      total,
      SoftwareSpaceBaseAddress.MODULATION_BASE_ADDRESS
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
      SoftwareSpaceBaseAddress.MODULATION_BASE_ADDRESS
    );
  }

  private async readBase(index: number) {
    debug(`try readBase:${index}`);
    const spaceHeader = await this.session.ReadSender_SoftwareSpace(
      index,
      512, // HEADER_LENGTH
      SoftwareSpaceBaseAddress.BASE_ADDRESS
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
  private async SetScreenALLWidth(): Promise<boolean> {
    const results = await series(this.screens, scr => {
      const location = getScreenLocation(scr);
      const senders = GetScreenSenderAddrInfo(scr);
      return series(senders, ({ SenderIndex }) =>
        this.session.trySetSenderVideoEnclosingMode(
          SenderIndex,
          location.rightBottom.x,
          location.rightBottom.y
        )
      );
    });
    return results.flat(1).every(res => res);
  }

  private async ReadDviScreenInfo(header: Buffer, index: number): Promise<void> {
    debug(`${DviScreenInfoFlag}: ReadDviScreenInfo`);
    if (header.length < DviScreenConfigInfo.baseSize)
      throw new TypeError('Invalid DviScreenConfigInfo header length');
    const dsci = new DviScreenConfigInfo(header.slice(0, DviScreenConfigInfo.baseSize));
    const { dviInfoLength, screenInfoLength, adjustInfoLength } = dsci;
    const data = await this.session.ReadSender_SoftwareSpace(
      index,
      DviScreenConfigInfo.baseSize + dviInfoLength + screenInfoLength + adjustInfoLength,
      SoftwareSpaceBaseAddress.BASE_ADDRESS
    );
    const { screens, dviVersion, dviInfo, dviExtends } = decodeScreenConfig(data);
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
    if (crc(spaceHeader.slice(SoftwareSpaceHeader.getOffsetOf('crc') + 2), 0x55aa) !== ss.crc)
      throw new Error('Invalid space header crc');
    if (ss.paramSize !== ParamSize) throw new Error('Invalid uncompressedSize');
    const paramData = await this.ReadData(index, ParamAddress, ss.paramSize);
    if (ss.paramCRC !== crc(paramData, 0x55aa)) throw new Error('Param crc error');
    const fileInfoCompressData = await this.ReadData(
      index,
      FileInfoCompressedAddress,
      ss.compressedSize
    );
    if (ss.fileInfoCRC !== crc(fileInfoCompressData, 0x55aa)) throw new Error('FileInfoCRC error');
    const fileInfoListV = FileInfoObjectList.decode(
      JSON.parse(await unpack(paramData.slice(2), ss.fileInfoSize, fileInfoCompressData))
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
