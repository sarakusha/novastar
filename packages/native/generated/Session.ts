// noinspection JSUnusedGlobalSymbols
/* eslint-disable class-methods-use-this */

/**
 * @see Automatically generated from ../decompiled/Nova.Equipment.Protocol.TGProtocol.decompiled.cs:3439
 */
import { Buffer } from 'buffer';
import { Duplex } from 'stream';
import { Connection, decodeUIntLE, encodeUIntLE, Request, Session } from '@novastar/codec';
import AddressMapping from './AddressMapping';
import { AudioControlModeEnum } from './AudioControlMode';
import { AudioFrequencyModeEnum } from './AudioFrequencyMode';
import { BaudRateTypeEnum } from './BaudRateType';
import { CardTypeEnum } from './CardType';
import { ChipTypeEnum } from './ChipType';
import { CoefTypeEnum } from './CoefType';
import { CoefficientSourceTypeEnum } from './CoefficientSourceType';
import { CorrectTypeEnum } from './CorrectType';
import { DVIEncryptTypeEnum } from './DVIEncryptType';
import { DataDirectionTypeEnum } from './DataDirectionType';
import { DecodeTypeEnum } from './DecodeType';
import { DviSelectModeEnum } from './DviSelectMode';
import { GhostRemoveModeTypeEnum } from './GhostRemoveModeType';
import { GrayModeTypeEnum } from './GrayModeType';
import { GrayRealizeTypeEnum } from './GrayRealizeType';
import { HDEnableModeEnum } from './HDEnableMode';
import { HDRTypeEnum } from './HDRType';
import { HLGModelEnum } from './HLGModel';
import { HWBrightAdjustTypeEnum } from './HWBrightAdjustType';
import { LowDelayModeEnum } from './LowDelayMode';
import MaxValueInfo from './MaxValueInfo';
import { ModulationModeTypeEnum } from './ModulationModeType';
import { ModuleCascadeDiretionEnum } from './ModuleCascadeDiretion';
import { OEPolarityTypeEnum } from './OEPolarityType';
import { OpticalWorkModeEnum } from './OpticalWorkMode';
import { PowerCtrlModeEnum } from './PowerCtrlMode';
import { PowerOperateTypeEnum } from './PowerOperateType';
import { ResetAndSwitchCommandTypeEnum } from './ResetAndSwitchCommandType';
import { ScanTypeEnum } from './ScanType';
import { ScreenDriveTypeEnum } from './ScreenDriveType';
import { ShowTypeWhenPortDisconnectedEnum } from './ShowTypeWhenPortDisconnected';
import { SmartSetModeEnum } from './SmartSetMode';
import { SourceSelectLoadModeEnum } from './SourceSelectLoadMode';
import { SourceSelectModeEnum } from './SourceSelectMode';
import { StandbyModeEnum } from './StandbyMode';
import { TestModeEnum } from './TestMode';
import { VedioSelectModeEnum } from './VedioSelectMode';
import { VirtualModeTypeEnum } from './VirtualModeType';

const makeOutDeviceBytes = (
  outDeviceAddress: number,
  baudRate: BaudRateTypeEnum,
  otherDeviceProtocol?: number[] | Buffer
): Buffer => {
  if (!otherDeviceProtocol || otherDeviceProtocol.length === 0)
    throw new TypeError('Invalid argument');
  const data = Buffer.alloc(
    AddressMapping.FuncCard_WriteOutDeviceHeaderOccupancy + otherDeviceProtocol.length
  );
  data[0] = outDeviceAddress;
  data[1] = baudRate;
  const src = Buffer.isBuffer(otherDeviceProtocol)
    ? otherDeviceProtocol
    : Buffer.from(otherDeviceProtocol);
  src.copy(data, AddressMapping.FuncCard_WriteOutDeviceHeaderOccupancy);
  return data;
};
export default class SessionAPI<S extends Duplex> implements Session<S> {
  constructor(readonly connection: Connection<S>) {}

  get isConnected(): boolean {
    return this.connection.isConnected;
  }

  close(): boolean {
    if (!this.connection.isConnected) return false;
    this.connection.close();
    return true;
  }

  pushTimeout(timeout: number): void {
    if (timeout <= 0) throw new TypeError('Invalid timeout');
    this.#timeouts.push(this.connection.timeout);
    this.connection.timeout = timeout;
  }

  popTimeout(): number {
    const timeout = this.#timeouts.pop();
    if (timeout) {
      this.connection.timeout = timeout;
    }
    return timeout ?? this.connection.timeout;
  }

  #timeouts: number[] = [];

  // #3461
  async ReadDeviceType(addr: number): Promise<number> {
    const req = new Request(AddressMapping.CompanyIdOccupancy, 'ReadDeviceType');
    req.destination = addr;
    req.address = AddressMapping.DeviceTypeAddr;
    return decodeUIntLE(await this.connection.send(req));
  }

  // #3492
  async ReadCompanyID(addr: number): Promise<number> {
    const req = new Request(AddressMapping.CompanyIdOccupancy, 'ReadCompanyID');
    req.destination = addr;
    req.address = AddressMapping.CompanyIdAddr;
    return decodeUIntLE(await this.connection.send(req));
  }

  // #3512
  async ReadControllerModelId(addr: number): Promise<number> {
    const req = new Request(AddressMapping.ControllerModelIdOccupancy, 'ReadControllerModelId');
    req.destination = addr;
    req.address = AddressMapping.ControllerModelIdAddr;
    return decodeUIntLE(await this.connection.send(req));
  }

  // #3532
  async ReadCommunicationProtocol(addr: number): Promise<number> {
    const req = new Request(
      AddressMapping.CommunicationProtocolOccupancy,
      'ReadCommunicationProtocol'
    );
    req.destination = addr;
    req.address = AddressMapping.CommunicationProtocolAddr;
    return decodeUIntLE(await this.connection.send(req));
  }

  // #3552
  async ReadLanguageLibraryFlag(addr: number): Promise<number> {
    const req = new Request(AddressMapping.LanguageLibraryFlagOccupancy, 'ReadLanguageLibraryFlag');
    req.destination = addr;
    req.address = AddressMapping.LanguageLibraryFlagAddr;
    return decodeUIntLE(await this.connection.send(req));
  }

  // #3577
  async ReadControllerSnHigh(addr: number): Promise<Buffer> {
    const req = new Request(AddressMapping.ControllerSnHighOccupancy, 'ReadControllerSnHigh');
    req.destination = addr;
    req.address = AddressMapping.ControllerSnHighAddr;
    return (await this.connection.send(req)).data;
  }

  // #3599
  async SetControllerSnHigh(addr: number, controllerSnHigh: number[] | Buffer): Promise<void> {
    if (controllerSnHigh.length !== AddressMapping.ControllerSnHighOccupancy)
      throw new TypeError(`Invalid buffer size: ${controllerSnHigh.length}`);
    const req = new Request(controllerSnHigh, false, 'SetControllerSnHigh');
    req.destination = addr;
    req.address = AddressMapping.ControllerSnHighAddr;
    await this.connection.send(req);
  }

  // #3608
  async ReadLicenseInfo(addr: number): Promise<Buffer> {
    const req = new Request(AddressMapping.LicenseInfoOccupancy, 'ReadLicenseInfo');
    req.destination = addr;
    req.address = AddressMapping.LicenseInfoAddr;
    return (await this.connection.send(req)).data;
  }

  // #3630
  async ReadSortOrder(addr: number): Promise<number> {
    const req = new Request(AddressMapping.SortOrderOccupancy, 'ReadSortOrder');
    req.destination = addr;
    req.address = AddressMapping.SortOrderAddr;
    return decodeUIntLE(await this.connection.send(req));
  }

  // #3650
  async SetSortOrder(addr: number, bBroadcast: boolean, sortOrder: number): Promise<void> {
    const $data = encodeUIntLE(sortOrder, AddressMapping.SortOrderOccupancy);
    const req = new Request($data, bBroadcast, 'SetSortOrder');
    req.destination = addr;
    req.address = AddressMapping.SortOrderAddr;
    await this.connection.send(req);
  }

  // #3661
  async ReadSaveSendCardsParameters(addr: number): Promise<number> {
    const req = new Request(
      AddressMapping.SaveSendCardsParametersOccupancy,
      'ReadSaveSendCardsParameters'
    );
    req.destination = addr;
    req.address = AddressMapping.SaveSendCardsParametersAddr;
    return decodeUIntLE(await this.connection.send(req));
  }

  // #3681
  async SetSaveSendCardsParameters(
    addr: number,
    bBroadcast: boolean,
    saveSendCardsParameters: number
  ): Promise<void> {
    const $data = encodeUIntLE(
      saveSendCardsParameters,
      AddressMapping.SaveSendCardsParametersOccupancy
    );
    const req = new Request($data, bBroadcast, 'SetSaveSendCardsParameters');
    req.destination = addr;
    req.address = AddressMapping.SaveSendCardsParametersAddr;
    await this.connection.send(req);
  }

  // #3692
  async ReadReturnFactoryValues(addr: number): Promise<number> {
    const req = new Request(AddressMapping.ReturnFactoryValuesOccupancy, 'ReadReturnFactoryValues');
    req.destination = addr;
    req.address = AddressMapping.ReturnFactoryValuesAddr;
    return decodeUIntLE(await this.connection.send(req));
  }

  // #3712
  async SetReturnFactoryValues(
    addr: number,
    bBroadcast: boolean,
    returnFactoryValues: number
  ): Promise<void> {
    const $data = encodeUIntLE(returnFactoryValues, AddressMapping.SortOrderOccupancy);
    const req = new Request($data, bBroadcast, 'SetReturnFactoryValues');
    req.destination = addr;
    req.address = AddressMapping.ReturnFactoryValuesAddr;
    await this.connection.send(req);
  }

  // #3723
  async ReadTestPoint(addr: number): Promise<number> {
    const req = new Request(AddressMapping.TestPointOccupancy, 'ReadTestPoint');
    req.destination = addr;
    req.address = AddressMapping.TestPointAddr;
    return decodeUIntLE(await this.connection.send(req));
  }

  // #3743
  async SetTestPoint(addr: number, bBroadcast: boolean, testPoint: number): Promise<void> {
    const $data = encodeUIntLE(testPoint, AddressMapping.SortOrderOccupancy);
    const req = new Request($data, bBroadcast, 'SetTestPoint');
    req.destination = addr;
    req.address = AddressMapping.SortOrderAddr;
    await this.connection.send(req);
  }

  // #3754
  async ReadSenderFunctionInfo(addr: number): Promise<Buffer> {
    const req = new Request(AddressMapping.SenderFunctionOccupancy, 'ReadSenderFunctionInfo');
    req.destination = addr;
    req.address = AddressMapping.SenderFunctionAddr;
    return (await this.connection.send(req)).data;
  }

  // #3763
  async ReadSenderABLInfo(addr: number): Promise<Buffer> {
    const req = new Request(AddressMapping.SenderABLOccupancy, 'ReadSenderABLInfo');
    req.destination = addr;
    req.address = AddressMapping.SenderABLtionAddr;
    return (await this.connection.send(req)).data;
  }

  // #3772
  async SetSenderABLParmsState(
    addr: number,
    bBroadcast: boolean,
    info: number[] | Buffer
  ): Promise<void> {
    const req = new Request(info, bBroadcast, 'SetSenderABLParmsState');
    req.destination = addr;
    req.address = AddressMapping.SenderABLtionAddr;
    await this.connection.send(req);
  }

  // #3781
  async SetSenderScrenPeakLum(
    addr: number,
    bBroadcast: boolean,
    info: number[] | Buffer
  ): Promise<void> {
    const req = new Request(info, bBroadcast, 'SetSenderScrenPeakLum');
    req.destination = addr;
    req.address = AddressMapping.ScrenPeakLumAddr;
    await this.connection.send(req);
  }

  // #3790
  async SetSender_ImageEnState(addr: number, bBroadcast: boolean, info: number): Promise<void> {
    const req = new Request([info], bBroadcast, 'SetSender_ImageEnState');
    req.destination = addr;
    req.address = AddressMapping.SenderABLOpreationAddr;
    await this.connection.send(req);
  }

  // #3801
  async SetSender_EDEState(addr: number, bBroadcast: boolean, info: number): Promise<void> {
    const req = new Request([info], bBroadcast, 'SetSender_EDEState');
    req.destination = addr;
    req.address = AddressMapping.SenderEDEOpreationAddr;
    await this.connection.send(req);
  }

  // #3812
  async ReadControllerPhysical(addr: number): Promise<number> {
    const req = new Request(AddressMapping.ControllerPhysicalOccupancy, 'ReadControllerPhysical');
    req.destination = addr;
    req.address = AddressMapping.ControllerPhysicalAddr;
    return decodeUIntLE(await this.connection.send(req));
  }

  // #3832
  async ReadTemperature(addr: number): Promise<number> {
    const req = new Request(AddressMapping.TemperatureOccupancy, 'ReadTemperature');
    req.destination = addr;
    req.address = AddressMapping.TemperatureAddr;
    return decodeUIntLE(await this.connection.send(req));
  }

  // #3852
  async ReadHumidity(addr: number): Promise<number> {
    const req = new Request(AddressMapping.HumidityOccupancy, 'ReadHumidity');
    req.destination = addr;
    req.address = AddressMapping.HumidityAddr;
    return decodeUIntLE(await this.connection.send(req));
  }

  // #3872
  async ReadFan(addr: number): Promise<number> {
    const req = new Request(AddressMapping.FanOccupancy, 'ReadFan');
    req.destination = addr;
    req.address = AddressMapping.FanAddr;
    return decodeUIntLE(await this.connection.send(req));
  }

  // #3892
  async SetFieldRateMode(addr: number, bBroadcast: boolean, fieldRateMode: number): Promise<void> {
    const $data = encodeUIntLE(fieldRateMode, AddressMapping.FieldRateModeOccupancy);
    const req = new Request($data, bBroadcast, 'SetFieldRateMode');
    req.destination = addr;
    req.address = AddressMapping.FieldRateModeAddr;
    await this.connection.send(req);
  }

  // #3902
  async ReadFieldRateMode(addr: number): Promise<number> {
    const req = new Request(AddressMapping.FieldRateModeOccupancy, 'ReadFieldRateMode');
    req.destination = addr;
    req.address = AddressMapping.FieldRateModeAddr;
    return decodeUIntLE(await this.connection.send(req));
  }

  // #3922
  async ReadFieldRate(addr: number): Promise<number> {
    const req = new Request(AddressMapping.SetFieldRateOccupancy, 'ReadFieldRate');
    req.destination = addr;
    req.address = AddressMapping.SetFieldRateAddr;
    return decodeUIntLE(await this.connection.send(req));
  }

  // #3942
  async SetFieldRate(addr: number, bBroadcast: boolean, setFieldRate: number): Promise<void> {
    const $data = encodeUIntLE(setFieldRate, AddressMapping.SetFieldRateOccupancy);
    const req = new Request($data, bBroadcast, 'SetFieldRate');
    req.destination = addr;
    req.address = AddressMapping.SetFieldRateAddr;
    await this.connection.send(req);
  }

  // #3952
  async ReadAudioControl(addr: number): Promise<number> {
    const req = new Request(AddressMapping.AudioControlOccupancy, 'ReadAudioControl');
    req.destination = addr;
    req.address = AddressMapping.AudioControlAddr;
    return decodeUIntLE(await this.connection.send(req));
  }

  // #3972
  async SetAudioControl(addr: number, bBroadcast: boolean, audioControl: number): Promise<void> {
    const $data = encodeUIntLE(audioControl, AddressMapping.AudioControlOccupancy);
    const req = new Request($data, bBroadcast, 'SetAudioControl');
    req.destination = addr;
    req.address = AddressMapping.AudioControlAddr;
    await this.connection.send(req);
  }

  // #4000
  async SetAudioControl_1(
    addr: number,
    bBroadcast: boolean,
    audioCtrlMode: AudioControlModeEnum
  ): Promise<void> {
    const $data = encodeUIntLE(audioCtrlMode, AddressMapping.AudioControlOccupancy);
    const req = new Request($data, bBroadcast, 'SetAudioControl_1');
    req.destination = addr;
    req.address = AddressMapping.AudioControlAddr;
    await this.connection.send(req);
  }

  // #4011
  async Sender_ReadActiveSourceType(addr: number): Promise<number> {
    const req = new Request(
      AddressMapping.ActiveSourceTypeOccupancy,
      'Sender_ReadActiveSourceType'
    );
    req.destination = addr;
    req.address = AddressMapping.ActiveSourceTypeAddr;
    return decodeUIntLE(await this.connection.send(req));
  }

  // #4038
  async Sender_SetSourceType(
    addr: number,
    bBroadcast: boolean,
    sourceMode: SourceSelectModeEnum
  ): Promise<void> {
    const $data = encodeUIntLE(sourceMode, AddressMapping.AudioControlOccupancy);
    const req = new Request($data, bBroadcast, 'Sender_SetSourceType');
    req.destination = addr;
    req.address = AddressMapping.SetSourceTypeAddr;
    await this.connection.send(req);
  }

  // #4049
  async Sender_ReadDVIModeSettingType(addr: number): Promise<number> {
    const req = new Request(
      AddressMapping.DVIModeSettingAddrOccupancy,
      'Sender_ReadDVIModeSettingType'
    );
    req.destination = addr;
    req.address = AddressMapping.DVIModeSettingAddr;
    return decodeUIntLE(await this.connection.send(req));
  }

  // #4074
  async ReadIoControl(addr: number): Promise<number> {
    const req = new Request(AddressMapping.IoControlOccupancy, 'ReadIoControl');
    req.destination = addr;
    req.address = AddressMapping.IoControlAddr;
    return decodeUIntLE(await this.connection.send(req));
  }

  // #4094
  async SetIoControl(addr: number, bBroadcast: boolean, ioControl: number): Promise<void> {
    const $data = encodeUIntLE(ioControl, AddressMapping.IoControlOccupancy);
    const req = new Request($data, bBroadcast, 'SetIoControl');
    req.destination = addr;
    req.address = AddressMapping.IoControlAddr;
    await this.connection.send(req);
  }

  // #4104
  async ReadSenderBrightnessLux(addr: number): Promise<number> {
    const req = new Request(AddressMapping.BrightnessOccupancy, 'ReadSenderBrightnessLux');
    req.destination = addr;
    req.address = AddressMapping.BrightnessAddr;
    return decodeUIntLE(await this.connection.send(req));
  }

  // #4133
  async ReadRtco(addr: number): Promise<Buffer> {
    const req = new Request(AddressMapping.RtcoOccupancy, 'ReadRtco');
    req.destination = addr;
    req.address = AddressMapping.RtcoAddr;
    return (await this.connection.send(req)).data;
  }

  // #4155
  async SetRtco(addr: number, bBroadcast: boolean, rtco: number[] | Buffer): Promise<void> {
    if (rtco.length !== AddressMapping.RtcoOccupancy)
      throw new TypeError(`Invalid buffer size: ${rtco.length}`);
    const req = new Request(rtco, bBroadcast, 'SetRtco');
    req.destination = addr;
    req.address = AddressMapping.RtcoAddr;
    await this.connection.send(req);
  }

  // #4169
  async ReadIsSerdes(addr: number): Promise<number> {
    const req = new Request(AddressMapping.SerdesEnableOccupancy, 'ReadIsSerdes');
    req.destination = addr;
    req.address = AddressMapping.SerdesEnableAddr;
    return decodeUIntLE(await this.connection.send(req));
  }

  // #4196
  async SetIsSerdes(addr: number, bBroadcast: boolean, IsSerdes: boolean): Promise<void> {
    const req = new Request(IsSerdes ? [1] : [0], bBroadcast, 'SetIsSerdes');
    req.destination = addr;
    req.address = AddressMapping.SerdesEnableAddr;
    await this.connection.send(req);
  }

  // #4214
  async ReadIsHasDVI(addr: number): Promise<number> {
    const req = new Request(AddressMapping.IsHasDVISignalOccupancy, 'ReadIsHasDVI');
    req.destination = addr;
    req.address = AddressMapping.IsHasDVISignalAddr;
    return decodeUIntLE(await this.connection.send(req));
  }

  // #4241
  async ReadMasterOrSlave(addr: number): Promise<number> {
    const req = new Request(AddressMapping.MasterOrSlaveOccupancy, 'ReadMasterOrSlave');
    req.destination = addr;
    req.address = AddressMapping.MasterOrSlaveAddr;
    return decodeUIntLE(await this.connection.send(req));
  }

  // #4261
  async SetMasterOrSlave(
    addr: number,
    bBroadcast: boolean,
    masterOrSlaveBytes: number[] | Buffer
  ): Promise<void> {
    if (masterOrSlaveBytes.length !== AddressMapping.MasterOrSlaveOccupancy)
      throw new TypeError(`Invalid buffer size: ${masterOrSlaveBytes.length}`);
    const req = new Request(masterOrSlaveBytes, bBroadcast, 'SetMasterOrSlave');
    req.destination = addr;
    req.address = AddressMapping.MasterOrSlaveAddr;
    await this.connection.send(req);
  }

  // #4270
  async ReadMasterOrSlaveNext(addr: number): Promise<number> {
    const req = new Request(AddressMapping.MasterOrSlaveOccupancy, 'ReadMasterOrSlaveNext');
    req.destination = addr;
    req.address = AddressMapping.MasterOrSlaveNewAddr;
    return decodeUIntLE(await this.connection.send(req));
  }

  // #4290
  async SetMasterOrSlaveNext(
    addr: number,
    bBroadcast: boolean,
    masterOrSlaveBytes: number[] | Buffer
  ): Promise<void> {
    if (masterOrSlaveBytes.length !== AddressMapping.MasterOrSlaveOccupancy)
      throw new TypeError(`Invalid buffer size: ${masterOrSlaveBytes.length}`);
    const req = new Request(masterOrSlaveBytes, bBroadcast, 'SetMasterOrSlaveNext');
    req.destination = addr;
    req.address = AddressMapping.MasterOrSlaveNewAddr;
    await this.connection.send(req);
  }

  // #4299
  async ReadMasterOrSlaveAllData(addr: number): Promise<Buffer> {
    const req = new Request(
      AddressMapping.Sender_AllDataSpaceOccupancy,
      'ReadMasterOrSlaveAllData'
    );
    req.destination = addr;
    req.address = AddressMapping.Sender_AllDataAddr;
    return (await this.connection.send(req)).data;
  }

  SetMasterOrSlave_1 = (): void => {
    throw new TypeError('Not implemented');
  };

  // #4402
  async SetMasterOrSlaveNew16Addr(
    addr: number,
    bBroadcast: boolean,
    masterOrSlaveBytes: number[] | Buffer
  ): Promise<void> {
    const req = new Request(masterOrSlaveBytes, bBroadcast, 'SetMasterOrSlaveNew16Addr');
    req.destination = addr;
    req.address = AddressMapping.MasterOrSlaveNew16Addr;
    await this.connection.send(req);
  }

  // #4412
  async SetMasterOrSlaveNew32Addr(
    addr: number,
    bBroadcast: boolean,
    masterOrSlaveBytes: number[] | Buffer
  ): Promise<void> {
    const req = new Request(masterOrSlaveBytes, bBroadcast, 'SetMasterOrSlaveNew32Addr');
    req.destination = addr;
    req.address = AddressMapping.MasterOrSlaveNew32Addr;
    await this.connection.send(req);
  }

  // #4422
  async ReadDVI0FieldRate(addr: number): Promise<number> {
    const req = new Request(AddressMapping.DVI0FieldRateOccupancy, 'ReadDVI0FieldRate');
    req.destination = addr;
    req.address = AddressMapping.DVI0FieldRateAddr;
    return decodeUIntLE(await this.connection.send(req));
  }

  // #4442
  async ReadDVI1FieldRate(addr: number): Promise<number> {
    const req = new Request(AddressMapping.DVI1FieldRateOccupancy, 'ReadDVI1FieldRate');
    req.destination = addr;
    req.address = AddressMapping.DVI1FieldRateAddr;
    return decodeUIntLE(await this.connection.send(req));
  }

  // #4462
  async ReadHoldTime(addr: number): Promise<number> {
    const req = new Request(AddressMapping.HoldTimeOccupancy, 'ReadHoldTime');
    req.destination = addr;
    req.address = AddressMapping.HoldTimeAddr;
    return decodeUIntLE(await this.connection.send(req));
  }

  // #4482
  async SetHoldTime(addr: number, bBroadcast: boolean, holdTimeSec: number): Promise<void> {
    const $data = encodeUIntLE(holdTimeSec, AddressMapping.HoldTimeOccupancy);
    const req = new Request($data, bBroadcast, 'SetHoldTime');
    req.destination = addr;
    req.address = AddressMapping.HoldTimeAddr;
    await this.connection.send(req);
  }

  // #4492
  async ReadIsHasGenLock(addr: number): Promise<number> {
    const req = new Request(AddressMapping.IsHasGenLockOccupancy, 'ReadIsHasGenLock');
    req.destination = addr;
    req.address = AddressMapping.IsHasGenLockAddr;
    return decodeUIntLE(await this.connection.send(req));
  }

  // #4519
  async ReadDviMode(addr: number): Promise<number> {
    const req = new Request(AddressMapping.DviModeOccupancy, 'ReadDviMode');
    req.destination = addr;
    req.address = AddressMapping.DviModeAddr;
    return decodeUIntLE(await this.connection.send(req));
  }

  // #4539
  async SetDviMode(addr: number, bBroadcast: boolean, dviMode: number): Promise<void> {
    const $data = encodeUIntLE(dviMode, AddressMapping.DviModeOccupancy);
    const req = new Request($data, bBroadcast, 'SetDviMode');
    req.destination = addr;
    req.address = AddressMapping.DviModeAddr;
    await this.connection.send(req);
  }

  // #4565
  async SetDviMode_1(
    addr: number,
    bBroadcast: boolean,
    dviMode: VedioSelectModeEnum
  ): Promise<void> {
    const $data = encodeUIntLE(
      dviMode !== VedioSelectModeEnum.Manual ? 255 : 90,
      AddressMapping.DviModeOccupancy
    );
    const req = new Request($data, bBroadcast, 'SetDviMode_1');
    req.destination = addr;
    req.address = AddressMapping.DviModeAddr;
    await this.connection.send(req);
  }

  // #4577
  async ReadDviSelect(addr: number): Promise<number> {
    const req = new Request(AddressMapping.DviSelectOccupancy, 'ReadDviSelect');
    req.destination = addr;
    req.address = AddressMapping.DviSelectAddr;
    return decodeUIntLE(await this.connection.send(req));
  }

  // #4597
  async SetDviSelect(addr: number, bBroadcast: boolean, dviSelect: number): Promise<void> {
    const $data = encodeUIntLE(dviSelect, AddressMapping.DviSelectOccupancy);
    const req = new Request($data, bBroadcast, 'SetDviSelect');
    req.destination = addr;
    req.address = AddressMapping.DviSelectAddr;
    await this.connection.send(req);
  }

  // #4630
  async SetDviSelect_1(
    addr: number,
    bBroadcast: boolean,
    dviSelectMode: DviSelectModeEnum
  ): Promise<void> {
    const $data = encodeUIntLE(dviSelectMode, AddressMapping.DviSelectOccupancy);
    const req = new Request($data, bBroadcast, 'SetDviSelect_1');
    req.destination = addr;
    req.address = AddressMapping.DviSelectAddr;
    await this.connection.send(req);
  }

  // #4641
  async ReadSourceSingalState(addr: number): Promise<number> {
    const req = new Request(AddressMapping.SourceSingalStateOccupancy, 'ReadSourceSingalState');
    req.destination = addr;
    req.address = AddressMapping.SourceSingalStateAddr;
    return decodeUIntLE(await this.connection.send(req));
  }

  // #4661
  async ReadSelectSingalType(addr: number): Promise<number> {
    const req = new Request(AddressMapping.SelectSingalTypeOccupancy, 'ReadSelectSingalType');
    req.destination = addr;
    req.address = AddressMapping.SourceSelectSingalBitAddr;
    return decodeUIntLE(await this.connection.send(req));
  }

  // #4681
  async ReadDviWidth(addr: number, index: number): Promise<number> {
    const req = new Request(AddressMapping.DviWidthOccupancy, 'ReadDviWidth');
    req.destination = addr;
    req.address = AddressMapping.DviWidthAddr + AddressMapping.DviOccupancy * index;
    return decodeUIntLE(await this.connection.send(req));
  }

  // #4703
  async SetDviWidth(
    addr: number,
    bBroadcast: boolean,
    dviWidth: number,
    index: number
  ): Promise<void> {
    const $data = encodeUIntLE(dviWidth, AddressMapping.DviWidthOccupancy);
    const req = new Request($data, bBroadcast, 'SetDviWidth');
    req.destination = addr;
    req.address = AddressMapping.DviWidthAddr + AddressMapping.DviOccupancy * index;
    await this.connection.send(req);
  }

  // #4713
  async SetRealDviWidth(addr: number, bBroadcast: boolean, dviWidth: number): Promise<void> {
    const $data = encodeUIntLE(dviWidth, AddressMapping.RealDviWidthOccupancy);
    const req = new Request($data, bBroadcast, 'SetRealDviWidth');
    req.destination = addr;
    req.address = AddressMapping.RealDviWidthAddr;
    await this.connection.send(req);
  }

  // #4723
  async ReadDviHeight(addr: number, index: number): Promise<number> {
    const req = new Request(AddressMapping.DviHeightOccupancy, 'ReadDviHeight');
    req.destination = addr;
    req.address = AddressMapping.DviHeightAddr + AddressMapping.DviOccupancy * index;
    return decodeUIntLE(await this.connection.send(req));
  }

  // #4745
  async SetDviHeight(
    addr: number,
    bBroadcast: boolean,
    dvi0Height: number,
    index: number
  ): Promise<void> {
    const $data = encodeUIntLE(dvi0Height, AddressMapping.DviHeightOccupancy);
    const req = new Request($data, bBroadcast, 'SetDviHeight');
    req.destination = addr;
    req.address = AddressMapping.DviHeightAddr + AddressMapping.DviOccupancy * index;
    await this.connection.send(req);
  }

  // #4755
  async ReadDviOffsetX(addr: number, index: number): Promise<number> {
    const req = new Request(AddressMapping.DviOffsetXOccupancy, 'ReadDviOffsetX');
    req.destination = addr;
    req.address = AddressMapping.DviOffsetXAddr + AddressMapping.DviOccupancy * index;
    return decodeUIntLE(await this.connection.send(req));
  }

  // #4777
  async SetDviOffsetX(
    addr: number,
    bBroadcast: boolean,
    dviOffsetX: number,
    index: number
  ): Promise<void> {
    const $data = encodeUIntLE(dviOffsetX, AddressMapping.DviOffsetXOccupancy);
    const req = new Request($data, bBroadcast, 'SetDviOffsetX');
    req.destination = addr;
    req.address = AddressMapping.DviOffsetXAddr + AddressMapping.DviOccupancy * index;
    await this.connection.send(req);
  }

  // #4787
  async ReadDviOffsetY(addr: number, index: number): Promise<number> {
    const req = new Request(AddressMapping.DviOffsetYOccupancy, 'ReadDviOffsetY');
    req.destination = addr;
    req.address = AddressMapping.DviOffsetYAddr + AddressMapping.DviOccupancy * index;
    return decodeUIntLE(await this.connection.send(req));
  }

  // #4809
  async SetDviOffsetY(
    addr: number,
    bBroadcast: boolean,
    dviOffsetY: number,
    index: number
  ): Promise<void> {
    const $data = encodeUIntLE(dviOffsetY, AddressMapping.DviOffsetYOccupancy);
    const req = new Request($data, bBroadcast, 'SetDviOffsetY');
    req.destination = addr;
    req.address = AddressMapping.DviOffsetYAddr + AddressMapping.DviOccupancy * index;
    await this.connection.send(req);
  }

  // #4819
  async ReadDvi1Dvi0OffsetX(addr: number): Promise<number> {
    const req = new Request(AddressMapping.Dvi1Dvi0OffsetXOccupancy, 'ReadDvi1Dvi0OffsetX');
    req.destination = addr;
    req.address = AddressMapping.Dvi1Dvi0OffsetXAddr;
    return decodeUIntLE(await this.connection.send(req));
  }

  // #4839
  async SetDvi1Dvi0OffsetX(
    addr: number,
    bBroadcast: boolean,
    dvi1Dvi0OffsetX: number
  ): Promise<void> {
    const $data = encodeUIntLE(dvi1Dvi0OffsetX, AddressMapping.Dvi1Dvi0OffsetXOccupancy);
    const req = new Request($data, bBroadcast, 'SetDvi1Dvi0OffsetX');
    req.destination = addr;
    req.address = AddressMapping.Dvi1Dvi0OffsetXAddr;
    await this.connection.send(req);
  }

  // #4849
  async ReadDvi1Dvi0OffsetY(addr: number): Promise<number> {
    const req = new Request(AddressMapping.Dvi1Dvi0OffsetYOccupancy, 'ReadDvi1Dvi0OffsetY');
    req.destination = addr;
    req.address = AddressMapping.Dvi1Dvi0OffsetYAddr;
    return decodeUIntLE(await this.connection.send(req));
  }

  // #4869
  async SetDvi1Dvi0OffsetY(
    addr: number,
    bBroadcast: boolean,
    dvi1Dvi0OffsetY: number
  ): Promise<void> {
    const $data = encodeUIntLE(dvi1Dvi0OffsetY, AddressMapping.Dvi1Dvi0OffsetYOccupancy);
    const req = new Request($data, bBroadcast, 'SetDvi1Dvi0OffsetY');
    req.destination = addr;
    req.address = AddressMapping.Dvi1Dvi0OffsetYAddr;
    await this.connection.send(req);
  }

  // #4879
  async SetSenderCardSmartSetMode(
    addr: number,
    bBroadcast: boolean,
    data: number[] | Buffer
  ): Promise<void> {
    const req = new Request(data, bBroadcast, 'SetSenderCardSmartSetMode');
    req.destination = addr;
    req.address = AddressMapping.SenderCardSmartSetModeAddr;
    await this.connection.send(req);
  }

  // #4888
  async ReadPortEnable(addr: number, index: number): Promise<number> {
    const req = new Request(AddressMapping.PortEnableOccupancy, 'ReadPortEnable');
    req.destination = addr;
    req.address = 0;
    if (index >= AddressMapping.New32PortOccupancy) {
      req.address =
        AddressMapping.PortEnableNext32Addr +
        AddressMapping.PortOccupancy * (index - AddressMapping.New32PortOccupancy);
    } else if (index >= AddressMapping.New16PortOccupancy) {
      req.address =
        AddressMapping.PortEnableNext16Addr +
        AddressMapping.PortOccupancy * (index - AddressMapping.New16PortOccupancy);
    } else if (index >= AddressMapping.NewPortOccupancy) {
      req.address =
        AddressMapping.PortEnableNextAddr +
        AddressMapping.PortOccupancy * (index - AddressMapping.NewPortOccupancy);
    } else {
      req.address = AddressMapping.PortEnableAddr + AddressMapping.PortOccupancy * index;
    }
    return decodeUIntLE(await this.connection.send(req));
  }

  // #4938
  async SetPortEnable(
    addr: number,
    bBroadcast: boolean,
    portEnable: number,
    index: number
  ): Promise<void> {
    const $data = encodeUIntLE(portEnable, AddressMapping.PortEnableOccupancy);
    const req = new Request($data, bBroadcast, 'SetPortEnable');
    req.destination = addr;
    req.address = 0;
    if (index >= AddressMapping.New32PortOccupancy) {
      req.address =
        AddressMapping.PortEnableNext32Addr +
        AddressMapping.PortOccupancy * (index - AddressMapping.New32PortOccupancy);
    } else if (index >= AddressMapping.New16PortOccupancy) {
      req.address =
        AddressMapping.PortEnableNext16Addr +
        AddressMapping.PortOccupancy * (index - AddressMapping.New16PortOccupancy);
    } else if (index >= AddressMapping.NewPortOccupancy) {
      req.address =
        AddressMapping.PortEnableNextAddr +
        AddressMapping.PortOccupancy * (index - AddressMapping.NewPortOccupancy);
    } else {
      req.address = AddressMapping.PortEnableAddr + AddressMapping.PortOccupancy * index;
    }
    await this.connection.send(req);
  }

  // #4968
  async ReadNewPortEnable(addr: number, index: number): Promise<number> {
    const req = new Request(AddressMapping.PortEnableOccupancy, 'ReadNewPortEnable');
    req.destination = addr;
    req.address =
      AddressMapping.PortEnableNextAddr +
      AddressMapping.PortOccupancy * (index - AddressMapping.NewPortOccupancy);
    return decodeUIntLE(await this.connection.send(req));
  }

  // #4990
  async SetNewPortEnable(
    addr: number,
    bBroadcast: boolean,
    portEnable: number,
    index: number
  ): Promise<void> {
    const $data = encodeUIntLE(portEnable, AddressMapping.PortEnableOccupancy);
    const req = new Request($data, bBroadcast, 'SetNewPortEnable');
    req.destination = addr;
    req.address =
      AddressMapping.PortEnableNextAddr +
      AddressMapping.PortOccupancy * (index - AddressMapping.NewPortOccupancy);
    await this.connection.send(req);
  }

  // #5000
  async ReadAllPortEnable(addr: number): Promise<Buffer> {
    const req = new Request(AddressMapping.Sender_AllDataSpaceOccupancy, 'ReadAllPortEnable');
    req.destination = addr;
    req.address = AddressMapping.Sender_AllDataAddr;
    return (await this.connection.send(req)).data;
  }

  // #5036
  async SetPortEnable_1(
    addr: number,
    bBroadcast: boolean,
    portEnable: number[] | Buffer,
    portIndex: number
  ): Promise<void> {
    if (portEnable.length !== AddressMapping.MasterOrSlaveSetOccupancy)
      throw new TypeError(`Invalid buffer size: ${portEnable.length}`);
    const req = new Request(portEnable, bBroadcast, 'SetPortEnable_1');
    req.destination = addr;
    req.address = AddressMapping.PortEnableAddr;
    await this.connection.send(req);
  }

  // #5098
  async ReadPortWidth(addr: number, index: number): Promise<number> {
    const req = new Request(AddressMapping.PortWidthOccupancy, 'ReadPortWidth');
    req.destination = addr;
    req.address = 0;
    if (index >= AddressMapping.New32PortOccupancy) {
      req.address =
        AddressMapping.PortWidthNew32Addr +
        AddressMapping.PortOccupancy * (index - AddressMapping.New32PortOccupancy);
    } else if (index >= AddressMapping.New16PortOccupancy) {
      req.address =
        AddressMapping.PortWidthNew16Addr +
        AddressMapping.PortOccupancy * (index - AddressMapping.New16PortOccupancy);
    } else if (index >= AddressMapping.NewPortOccupancy) {
      req.address =
        AddressMapping.PortWidthNewAddr +
        AddressMapping.PortOccupancy * (index - AddressMapping.NewPortOccupancy);
    } else {
      req.address = AddressMapping.PortWidthAddr + AddressMapping.PortOccupancy * index;
    }
    return decodeUIntLE(await this.connection.send(req));
  }

  // #5148
  async SetPortWidth(
    addr: number,
    bBroadcast: boolean,
    portWidth: number,
    index: number
  ): Promise<void> {
    const $data = encodeUIntLE(portWidth, AddressMapping.PortWidthOccupancy);
    const req = new Request($data, bBroadcast, 'SetPortWidth');
    req.destination = addr;
    req.address = 0;
    if (index >= AddressMapping.New32PortOccupancy) {
      req.address =
        AddressMapping.PortWidthNew32Addr +
        AddressMapping.PortOccupancy * (index - AddressMapping.New32PortOccupancy);
    } else if (index >= AddressMapping.New16PortOccupancy) {
      req.address =
        AddressMapping.PortWidthNew16Addr +
        AddressMapping.PortOccupancy * (index - AddressMapping.New16PortOccupancy);
    } else if (index >= AddressMapping.NewPortOccupancy) {
      req.address =
        AddressMapping.PortWidthNewAddr +
        AddressMapping.PortOccupancy * (index - AddressMapping.NewPortOccupancy);
    } else {
      req.address = AddressMapping.PortWidthAddr + AddressMapping.PortOccupancy * index;
    }
    await this.connection.send(req);
  }

  // #5210
  async ReadAllPortWidth(addr: number): Promise<Buffer> {
    const req = new Request(AddressMapping.Sender_AllDataSpaceOccupancy, 'ReadAllPortWidth');
    req.destination = addr;
    req.address = AddressMapping.Sender_AllDataAddr;
    return (await this.connection.send(req)).data;
  }

  // #5246
  async ReadPortHeight(addr: number, index: number): Promise<number> {
    const req = new Request(AddressMapping.PortHeightOccupancy, 'ReadPortHeight');
    req.destination = addr;
    req.address = 0;
    if (index >= AddressMapping.New32PortOccupancy) {
      req.address =
        AddressMapping.PortHeightNew32Addr +
        AddressMapping.PortOccupancy * (index - AddressMapping.New32PortOccupancy);
    } else if (index >= AddressMapping.New16PortOccupancy) {
      req.address =
        AddressMapping.PortHeightNew16Addr +
        AddressMapping.PortOccupancy * (index - AddressMapping.New16PortOccupancy);
    } else if (index >= AddressMapping.NewPortOccupancy) {
      req.address =
        AddressMapping.PortHeightNewAddr +
        AddressMapping.PortOccupancy * (index - AddressMapping.NewPortOccupancy);
    } else {
      req.address = AddressMapping.PortHeightAddr + AddressMapping.PortOccupancy * index;
    }
    return decodeUIntLE(await this.connection.send(req));
  }

  // #5296
  async SetPortHeight(
    addr: number,
    bBroadcast: boolean,
    portHeight: number,
    index: number
  ): Promise<void> {
    const $data = encodeUIntLE(portHeight, AddressMapping.PortHeightOccupancy);
    const req = new Request($data, bBroadcast, 'SetPortHeight');
    req.destination = addr;
    req.address = 0;
    if (index >= AddressMapping.New32PortOccupancy) {
      req.address =
        AddressMapping.PortHeightNew32Addr +
        AddressMapping.PortOccupancy * (index - AddressMapping.New32PortOccupancy);
    } else if (index >= AddressMapping.New16PortOccupancy) {
      req.address =
        AddressMapping.PortHeightNew16Addr +
        AddressMapping.PortOccupancy * (index - AddressMapping.New16PortOccupancy);
    } else if (index >= AddressMapping.NewPortOccupancy) {
      req.address =
        AddressMapping.PortHeightNewAddr +
        AddressMapping.PortOccupancy * (index - AddressMapping.NewPortOccupancy);
    } else {
      req.address = AddressMapping.PortHeightAddr + AddressMapping.PortOccupancy * index;
    }
    await this.connection.send(req);
  }

  // #5358
  async ReadAllPortHeight(addr: number): Promise<Buffer> {
    const req = new Request(AddressMapping.Sender_AllDataSpaceOccupancy, 'ReadAllPortHeight');
    req.destination = addr;
    req.address = AddressMapping.Sender_AllDataAddr;
    return (await this.connection.send(req)).data;
  }

  // #5394
  async ReadPortOffsetX(addr: number, index: number): Promise<number> {
    const req = new Request(AddressMapping.PortOffsetXOccupancy, 'ReadPortOffsetX');
    req.destination = addr;
    req.address = 0;
    if (index >= AddressMapping.New32PortOccupancy) {
      req.address =
        AddressMapping.PortOffsetXNew32Addr +
        AddressMapping.PortOccupancy * (index - AddressMapping.New32PortOccupancy);
    } else if (index >= AddressMapping.New16PortOccupancy) {
      req.address =
        AddressMapping.PortOffsetXNew16Addr +
        AddressMapping.PortOccupancy * (index - AddressMapping.New16PortOccupancy);
    } else if (index >= AddressMapping.NewPortOccupancy) {
      req.address =
        AddressMapping.PortOffsetXNewAddr +
        AddressMapping.PortOccupancy * (index - AddressMapping.NewPortOccupancy);
    } else {
      req.address = AddressMapping.PortOffsetXAddr + AddressMapping.PortOccupancy * index;
    }
    return decodeUIntLE(await this.connection.send(req));
  }

  // #5444
  async SetPortOffsetX(
    addr: number,
    bBroadcast: boolean,
    portOffsetX: number,
    index: number
  ): Promise<void> {
    const $data = encodeUIntLE(portOffsetX, AddressMapping.PortOffsetXOccupancy);
    const req = new Request($data, bBroadcast, 'SetPortOffsetX');
    req.destination = addr;
    req.address = 0;
    if (index >= AddressMapping.New32PortOccupancy) {
      req.address =
        AddressMapping.PortOffsetXNew32Addr +
        AddressMapping.PortOccupancy * (index - AddressMapping.New32PortOccupancy);
    } else if (index >= AddressMapping.New16PortOccupancy) {
      req.address =
        AddressMapping.PortOffsetXNew16Addr +
        AddressMapping.PortOccupancy * (index - AddressMapping.New16PortOccupancy);
    } else if (index >= AddressMapping.NewPortOccupancy) {
      req.address =
        AddressMapping.PortOffsetXNewAddr +
        AddressMapping.PortOccupancy * (index - AddressMapping.NewPortOccupancy);
    } else {
      req.address = AddressMapping.PortOffsetXAddr + AddressMapping.PortOccupancy * index;
    }
    await this.connection.send(req);
  }

  // #5506
  async ReadAllPortOffsetX(addr: number, index: number): Promise<Buffer> {
    const req = new Request(AddressMapping.Sender_AllDataSpaceOccupancy, 'ReadAllPortOffsetX');
    req.destination = addr;
    req.address = AddressMapping.Sender_AllDataAddr + AddressMapping.PortOccupancy * index;
    return (await this.connection.send(req)).data;
  }

  // #5542
  async ReadPortOffsetY(addr: number, index: number): Promise<number> {
    const req = new Request(AddressMapping.PortOffsetYOccupancy, 'ReadPortOffsetY');
    req.destination = addr;
    req.address = 0;
    if (index >= AddressMapping.New32PortOccupancy) {
      req.address =
        AddressMapping.PortOffsetYNew32Addr +
        AddressMapping.PortOccupancy * (index - AddressMapping.New32PortOccupancy);
    } else if (index >= AddressMapping.New16PortOccupancy) {
      req.address =
        AddressMapping.PortOffsetYNew16Addr +
        AddressMapping.PortOccupancy * (index - AddressMapping.New16PortOccupancy);
    } else if (index >= AddressMapping.NewPortOccupancy) {
      req.address =
        AddressMapping.PortOffsetYNewAddr +
        AddressMapping.PortOccupancy * (index - AddressMapping.NewPortOccupancy);
    } else {
      req.address = AddressMapping.PortOffsetYAddr + AddressMapping.PortOccupancy * index;
    }
    return decodeUIntLE(await this.connection.send(req));
  }

  // #5592
  async SetPortOffsetY(
    addr: number,
    bBroadcast: boolean,
    portOffsetY: number,
    index: number
  ): Promise<void> {
    const $data = encodeUIntLE(portOffsetY, AddressMapping.PortOffsetYOccupancy);
    const req = new Request($data, bBroadcast, 'SetPortOffsetY');
    req.destination = addr;
    req.address = 0;
    if (index >= AddressMapping.New32PortOccupancy) {
      req.address =
        AddressMapping.PortOffsetYNew32Addr +
        AddressMapping.PortOccupancy * (index - AddressMapping.New32PortOccupancy);
    } else if (index >= AddressMapping.New16PortOccupancy) {
      req.address =
        AddressMapping.PortOffsetYNew16Addr +
        AddressMapping.PortOccupancy * (index - AddressMapping.New16PortOccupancy);
    } else if (index >= AddressMapping.NewPortOccupancy) {
      req.address =
        AddressMapping.PortOffsetYNewAddr +
        AddressMapping.PortOccupancy * (index - AddressMapping.NewPortOccupancy);
    } else {
      req.address = AddressMapping.PortOffsetYAddr + AddressMapping.PortOccupancy * index;
    }
    await this.connection.send(req);
  }

  // #5654
  async ReadAllPortOffsetY(addr: number): Promise<Buffer> {
    const req = new Request(AddressMapping.Sender_AllDataSpaceOccupancy, 'ReadAllPortOffsetY');
    req.destination = addr;
    req.address = AddressMapping.Sender_AllDataAddr;
    return (await this.connection.send(req)).data;
  }

  // #5690
  async SetFreeSenderPorts(
    senderAddr: number,
    bBroadcast: boolean,
    datas: number[] | Buffer,
    portInde: number,
    freeIndex: number
  ): Promise<void> {
    const req = new Request(datas, bBroadcast, 'SetFreeSenderPorts');
    req.destination = senderAddr;
    req.address = AddressMapping.SenderPortCardsAddr + portInde * 16384 + freeIndex * 16;
    await this.connection.send(req);
  }

  // #5699
  async SetSenderVideoEnclosingMode(
    senderindex: number,
    width: number,
    height: number
  ): Promise<void> {
    const req = new Request(
      [width % 256, width >>> 8, height % 256, height >>> 8],
      false,
      'SetSenderVideoEnclosingMode'
    );
    req.destination = senderindex;
    req.address = AddressMapping.SenderVideoEnclosingAddr;
    await this.connection.send(req);
  }

  // #5714
  async ReadScaleEn(addr: number): Promise<number> {
    const req = new Request(AddressMapping.DVIScaleEnOccupancy, 'ReadScaleEn');
    req.destination = addr;
    req.address = AddressMapping.DVIScaleEnAddr;
    return decodeUIntLE(await this.connection.send(req));
  }

  // #5737
  async SetScaleEn(addr: number, bBroadcast: boolean, isEnableScale: boolean): Promise<void> {
    const req = new Request(isEnableScale ? [88] : [255], bBroadcast, 'SetScaleEn');
    req.destination = addr;
    req.address = AddressMapping.DVIScaleEnAddr;
    await this.connection.send(req);
  }

  // #5755
  async ReadColScalePara(addr: number): Promise<number> {
    const req = new Request(AddressMapping.ColScaleParAOccupancy, 'ReadColScalePara');
    req.destination = addr;
    req.address = AddressMapping.ColScaleParaAddr;
    return decodeUIntLE(await this.connection.send(req));
  }

  // #5775
  async SetColScalePara(addr: number, bBroadcast: boolean, colScalePar: number): Promise<void> {
    const $data = encodeUIntLE(colScalePar, AddressMapping.ColScaleParAOccupancy);
    const req = new Request($data, bBroadcast, 'SetColScalePara');
    req.destination = addr;
    req.address = AddressMapping.ColScaleParaAddr;
    await this.connection.send(req);
  }

  // #5785
  async ReadEndColScalePos(addr: number): Promise<number> {
    const req = new Request(AddressMapping.EndColScalePosOccupancy, 'ReadEndColScalePos');
    req.destination = addr;
    req.address = AddressMapping.EndColScalePosAddr;
    return decodeUIntLE(await this.connection.send(req));
  }

  // #5805
  async SetEndColScalePos(
    addr: number,
    bBroadcast: boolean,
    endColScalePos: number
  ): Promise<void> {
    const $data = encodeUIntLE(endColScalePos, AddressMapping.ColScaleParAOccupancy);
    const req = new Request($data, bBroadcast, 'SetEndColScalePos');
    req.destination = addr;
    req.address = AddressMapping.EndColScalePosAddr;
    await this.connection.send(req);
  }

  // #5815
  async ReadRowScalePara(addr: number): Promise<number> {
    const req = new Request(AddressMapping.RowScaleParAOccupancy, 'ReadRowScalePara');
    req.destination = addr;
    req.address = AddressMapping.RowScaleParaAddr;
    return decodeUIntLE(await this.connection.send(req));
  }

  // #5835
  async SetRowScalePara(addr: number, bBroadcast: boolean, rowScalePar: number): Promise<void> {
    const $data = encodeUIntLE(rowScalePar, AddressMapping.ColScaleParAOccupancy);
    const req = new Request($data, bBroadcast, 'SetRowScalePara');
    req.destination = addr;
    req.address = AddressMapping.RowScaleParaAddr;
    await this.connection.send(req);
  }

  // #5845
  async ReadEndRowScalePos(addr: number): Promise<number> {
    const req = new Request(AddressMapping.EndRowScalePosOccupancy, 'ReadEndRowScalePos');
    req.destination = addr;
    req.address = AddressMapping.EndRowScalePosAddr;
    return decodeUIntLE(await this.connection.send(req));
  }

  // #5865
  async SetEndRowScalePos(
    addr: number,
    bBroadcast: boolean,
    endRowScalePos: number
  ): Promise<void> {
    const $data = encodeUIntLE(endRowScalePos, AddressMapping.EndRowScalePosOccupancy);
    const req = new Request($data, bBroadcast, 'SetEndRowScalePos');
    req.destination = addr;
    req.address = AddressMapping.EndRowScalePosAddr;
    await this.connection.send(req);
  }

  // #5875
  async ReadAllScaleInfo(addr: number): Promise<Buffer> {
    const req = new Request(AddressMapping.AllScaleInfoOccupancy, 'ReadAllScaleInfo');
    req.destination = addr;
    req.address = AddressMapping.AllScaleInfoAddr;
    return (await this.connection.send(req)).data;
  }

  SetAllScaleInfo = (): void => {
    throw new TypeError('Not implemented');
  };

  // #5944
  async WriteDviOf4KInfo(
    addr: number,
    bBroadcast: boolean,
    dviInfoBytes: number[] | Buffer
  ): Promise<void> {
    const req = new Request(dviInfoBytes, bBroadcast, 'WriteDviOf4KInfo');
    req.destination = addr;
    req.address = AddressMapping.DVIOf4KInfoAddr;
    await this.connection.send(req);
  }

  // #5953
  async ReadDviOf4KInfo(addr: number): Promise<Buffer> {
    const req = new Request(AddressMapping.DVIOf4KInfoOccupancy, 'ReadDviOf4KInfo');
    req.destination = addr;
    req.address = AddressMapping.DVIOf4KInfoAddr;
    return (await this.connection.send(req)).data;
  }

  WriteDviOf1600Info = (): void => {
    throw new TypeError('Not implemented');
  };

  // #6057
  async SetPortOfDVI(
    addr: number,
    bBroadcast: boolean,
    dviIndex: number,
    portIndex: number
  ): Promise<void> {
    const req = new Request([dviIndex], bBroadcast, 'SetPortOfDVI');
    req.destination = addr;
    req.address = 0;
    if (portIndex >= AddressMapping.New32PortOccupancy) {
      req.address =
        AddressMapping.DVIOfPortInfoNext32Addr +
        AddressMapping.DVIOfPortInfoNext32Occupancy *
          (portIndex - AddressMapping.New32PortOccupancy);
    } else {
      req.address = AddressMapping.DVIOfPortInfoAddr + portIndex;
    }
    await this.connection.send(req);
  }

  WriteDviOf1600OffestInfo = (): void => {
    throw new TypeError('Not implemented');
  };

  // #6102
  async ReadDviOf1600OffestInfo(addr: number): Promise<Buffer> {
    const req = new Request(16, 'ReadDviOf1600OffestInfo');
    req.destination = addr;
    req.address = AddressMapping.DVIOfOffsetInfoAddr;
    return (await this.connection.send(req)).data;
  }

  WriteDVIWHOf1600Info = (): void => {
    throw new TypeError('Not implemented');
  };

  // #6135
  async SetBackUpOrRestoreCmd(addr: number, bBroadcast: boolean, writeData: number): Promise<void> {
    const req = new Request([writeData], bBroadcast, 'SetBackUpOrRestoreCmd');
    req.destination = addr;
    req.address = AddressMapping.SetBackUpOrRestoreAddr;
    await this.connection.send(req);
  }

  // #6145
  async ReadBackUpFinishFlag(addr: number): Promise<number> {
    const req = new Request(AddressMapping.BackUpFinishFlagAddrOccupancy, 'ReadBackUpFinishFlag');
    req.destination = addr;
    req.address = AddressMapping.BackUpFinishFlagAddr;
    return decodeUIntLE(await this.connection.send(req));
  }

  // #6165
  async ReadBackUpFileHeader(addr: number): Promise<Buffer> {
    const req = new Request(AddressMapping.BackUpFileHeaderAddrOccupancy, 'ReadBackUpFileHeader');
    req.destination = addr;
    req.address = AddressMapping.BackUpFileHeaderAddr;
    return (await this.connection.send(req)).data;
  }

  // #6174
  async WriteBackUpFileHeader(
    addr: number,
    bBroadcast: boolean,
    writeData: number[] | Buffer
  ): Promise<void> {
    if (writeData.length !== AddressMapping.BackUpFileHeaderAddrOccupancy)
      throw new TypeError(`Invalid buffer size: ${writeData.length}`);
    const req = new Request(writeData, bBroadcast, 'WriteBackUpFileHeader');
    req.destination = addr;
    req.address = AddressMapping.BackUpFileHeaderAddr;
    await this.connection.send(req);
  }

  // #6183
  async SetRestoreFinishFlag(addr: number, bBroadcast: boolean, writeData: number): Promise<void> {
    const req = new Request([writeData], bBroadcast, 'SetRestoreFinishFlag');
    req.destination = addr;
    req.address = AddressMapping.RestoreFinishFlagAddr;
    await this.connection.send(req);
  }

  // #6193
  async ReadRestoreFinishFlag(addr: number, length: number): Promise<Buffer> {
    const req = new Request(length, 'ReadRestoreFinishFlag');
    req.destination = addr;
    req.address = AddressMapping.RestoreFinishFlagAddr;
    return (await this.connection.send(req)).data;
  }

  // #6213
  async ReadHWRestoreFinishFlag(addr: number, length: number): Promise<Buffer> {
    const req = new Request(length, 'ReadHWRestoreFinishFlag');
    req.destination = addr;
    req.address = AddressMapping.HWRestoreFinishFlagAddr;
    return (await this.connection.send(req)).data;
  }

  // #6233
  async ReadBackUpParamFromSender(addr: number, length: number): Promise<Buffer> {
    const req = new Request(length, 'ReadBackUpParamFromSender');
    req.destination = addr;
    req.address = AddressMapping.BackUpFileAddr;
    return (await this.connection.send(req)).data;
  }

  // #6242
  async RestoreSenderConfig(
    addr: number,
    bBroadcast: boolean,
    writeData: number[] | Buffer
  ): Promise<void> {
    const req = new Request(writeData, bBroadcast, 'RestoreSenderConfig');
    req.destination = addr;
    req.address = AddressMapping.BackUpFileAddr;
    await this.connection.send(req);
  }

  // #6251
  async ReadEthernetPortScannerX(
    addr: number,
    portIndex: number,
    scannerIndex: number
  ): Promise<number> {
    const req = new Request(
      AddressMapping.EthernetPortScannerXOccupancy,
      'ReadEthernetPortScannerX'
    );
    req.destination = addr;
    req.address =
      AddressMapping.EthernetPortOccupancy * portIndex +
      AddressMapping.EthernetPortScannerXAddr +
      (AddressMapping.EthernetPortScannerXOccupancy +
        AddressMapping.EthernetPortScannerYOccupancy) *
        scannerIndex +
      AddressMapping.EthernetPortScannerXOccupancy;
    return decodeUIntLE(await this.connection.send(req));
  }

  // #6275
  async SetEthernetPortScannerX(
    addr: number,
    bBroadcast: boolean,
    ethernetPortScannerX: number,
    portIndex: number,
    scannerIndex: number
  ): Promise<void> {
    const $data = encodeUIntLE(ethernetPortScannerX, AddressMapping.EthernetPortScannerXOccupancy);
    const req = new Request($data, bBroadcast, 'SetEthernetPortScannerX');
    req.destination = addr;
    req.address =
      AddressMapping.EthernetPortOccupancy * portIndex +
      AddressMapping.EthernetPortScannerXAddr +
      (AddressMapping.EthernetPortScannerXOccupancy +
        AddressMapping.EthernetPortScannerYOccupancy) *
        scannerIndex +
      AddressMapping.EthernetPortScannerXOccupancy;
    await this.connection.send(req);
  }

  // #6285
  async ReadEthernetPortScannerY(
    addr: number,
    portIndex: number,
    scannerIndex: number
  ): Promise<number> {
    const req = new Request(
      AddressMapping.EthernetPortScannerYOccupancy,
      'ReadEthernetPortScannerY'
    );
    req.destination = addr;
    req.address =
      AddressMapping.EthernetPortOccupancy * portIndex +
      AddressMapping.EthernetPortScannerYAddr +
      AddressMapping.EthernetPortScannerYOccupancy +
      (AddressMapping.EthernetPortScannerXOccupancy +
        AddressMapping.EthernetPortScannerYOccupancy) *
        scannerIndex;
    return decodeUIntLE(await this.connection.send(req));
  }

  // #6309
  async SetEthernetPortScannerY(
    addr: number,
    bBroadcast: boolean,
    ethernetPortScannerY: number,
    portIndex: number,
    scannerIndex: number
  ): Promise<void> {
    const $data = encodeUIntLE(ethernetPortScannerY, AddressMapping.EthernetPortScannerYOccupancy);
    const req = new Request($data, bBroadcast, 'SetEthernetPortScannerY');
    req.destination = addr;
    req.address =
      AddressMapping.EthernetPortOccupancy * portIndex +
      AddressMapping.EthernetPortScannerYAddr +
      AddressMapping.EthernetPortScannerYOccupancy +
      (AddressMapping.EthernetPortScannerXOccupancy +
        AddressMapping.EthernetPortScannerYOccupancy) *
        scannerIndex;
    await this.connection.send(req);
  }

  // #6319
  async ReadEthernetPortScannerXY(
    addr: number,
    portIndex: number,
    scannerIndex: number
  ): Promise<Buffer> {
    const req = new Request(
      AddressMapping.EthernetPortScannerXOccupancy + AddressMapping.EthernetPortScannerYOccupancy,
      'ReadEthernetPortScannerXY'
    );
    req.destination = addr;
    req.address =
      AddressMapping.EthernetPortOccupancy * portIndex +
      AddressMapping.EthernetPortScannerXAddr +
      (AddressMapping.EthernetPortScannerXOccupancy +
        AddressMapping.EthernetPortScannerYOccupancy) *
        scannerIndex;
    return (await this.connection.send(req)).data;
  }

  // #6346
  async SetEthernetPortScannerXY(
    addr: number,
    bBroadcast: boolean,
    ethernetPortScannerX: number,
    ethernetPortScannerY: number,
    portIndex: number,
    scannerIndex: number
  ): Promise<void> {
    const $data = encodeUIntLE(
      (ethernetPortScannerX << 16) + ethernetPortScannerY,
      AddressMapping.EthernetPortScannerXOccupancy + AddressMapping.EthernetPortScannerYOccupancy
    );
    const req = new Request($data, bBroadcast, 'SetEthernetPortScannerXY');
    req.destination = addr;
    req.address =
      AddressMapping.EthernetPortOccupancy * portIndex +
      AddressMapping.EthernetPortScannerXAddr +
      (AddressMapping.EthernetPortScannerXOccupancy +
        AddressMapping.EthernetPortScannerYOccupancy) *
        scannerIndex;
    await this.connection.send(req);
  }

  // #6393
  async ReadNumberOfCardOrScanBoardInPort(
    addr: number,
    portIndex: number,
    cardType: CardTypeEnum
  ): Promise<number> {
    const req = new Request(
      AddressMapping.NumberOfCardOrBoardInPortOccupancy,
      'ReadNumberOfCardOrScanBoardInPort'
    );
    req.destination = addr;
    req.address = 0;
    if (portIndex < AddressMapping.New16PortOccupancy) {
      req.address =
        AddressMapping.NumberOfCardOrBoardInPortAddr +
        portIndex * AddressMapping.NumOfCardAndBoardInPortOccupancy +
        cardType * AddressMapping.NumberOfCardOrBoardInPortOccupancy;
    } else {
      req.address =
        AddressMapping.NumberOfCardOrBoardInPort16Addr +
        portIndex * AddressMapping.NumOfCardAndBoardInPortOccupancy +
        cardType * AddressMapping.NumberOfCardOrBoardInPortOccupancy;
    }
    return decodeUIntLE(await this.connection.send(req));
  }

  // #6438
  async SetNumberOfCardOrScanBoardInPort(
    addr: number,
    bBroadcast: boolean,
    number: number,
    portIndex: number,
    cardType: CardTypeEnum
  ): Promise<void> {
    const $data = encodeUIntLE(number, AddressMapping.NumberOfCardOrBoardInPortOccupancy);
    const req = new Request($data, bBroadcast, 'SetNumberOfCardOrScanBoardInPort');
    req.destination = addr;
    req.address = 0;
    if (portIndex < AddressMapping.New16PortOccupancy) {
      req.address =
        AddressMapping.NumberOfCardOrBoardInPortAddr +
        portIndex * AddressMapping.NumOfCardAndBoardInPortOccupancy +
        cardType * AddressMapping.NumberOfCardOrBoardInPortOccupancy;
    } else {
      req.address =
        AddressMapping.NumberOfCardOrBoardInPort16Addr +
        portIndex * AddressMapping.NumOfCardAndBoardInPortOccupancy +
        cardType * AddressMapping.NumberOfCardOrBoardInPortOccupancy;
    }
    await this.connection.send(req);
  }

  // #6459
  async SetFreeVirtualNetworkPort(
    addr: number,
    bBroadcast: boolean,
    number: number,
    portIndex: number
  ): Promise<void> {
    const $data = encodeUIntLE(number, AddressMapping.NumberOfCardOrBoardInPortOccupancy);
    const req = new Request($data, bBroadcast, 'SetFreeVirtualNetworkPort');
    req.destination = addr;
    req.address = AddressMapping.FreeVirtualNetPortAddr + portIndex * 2;
    await this.connection.send(req);
  }

  // #6469
  async ReadVirtualEnable(addr: number): Promise<number> {
    const req = new Request(AddressMapping.VirtualEnableOccupancy, 'ReadVirtualEnable');
    req.destination = addr;
    req.address = AddressMapping.VirtualEnableAddr;
    return decodeUIntLE(await this.connection.send(req));
  }

  // #6496
  async SetVirtualEnable(
    addr: number,
    bBroadcast: boolean,
    virtualEnable: VirtualModeTypeEnum
  ): Promise<void> {
    const $data = encodeUIntLE(virtualEnable, AddressMapping.VirtualEnableOccupancy);
    const req = new Request($data, bBroadcast, 'SetVirtualEnable');
    req.destination = addr;
    req.address = AddressMapping.VirtualEnableAddr;
    await this.connection.send(req);
  }

  // #6506
  async ReadDisplayMode(addr: number): Promise<number> {
    const req = new Request(AddressMapping.DisplayModeOccupancy, 'ReadDisplayMode');
    req.destination = addr;
    req.address = AddressMapping.DisplayModeAddr;
    return decodeUIntLE(await this.connection.send(req));
  }

  // #6526
  async ReadHDEnable(addr: number): Promise<number> {
    const req = new Request(AddressMapping.HDEnableOccupancy, 'ReadHDEnable');
    req.destination = addr;
    req.address = AddressMapping.HDEnableAddr;
    return decodeUIntLE(await this.connection.send(req));
  }

  // #6555
  async SetHDEnable(addr: number, bBroadcast: boolean, hdEnable: HDEnableModeEnum): Promise<void> {
    const $data = encodeUIntLE(hdEnable, AddressMapping.HDEnableOccupancy);
    const req = new Request($data, bBroadcast, 'SetHDEnable');
    req.destination = addr;
    req.address = AddressMapping.HDEnableAddr;
    await this.connection.send(req);
  }

  // #6565
  async SetHDEnableEx(addr: number, bBroadcast: boolean, hdEnable: number): Promise<void> {
    const req = new Request([hdEnable], bBroadcast, 'SetHDEnableEx');
    req.destination = addr;
    req.address = AddressMapping.HDEnableAddr;
    await this.connection.send(req);
  }

  // #6575
  async ReadLoadMode(addr: number): Promise<number> {
    const req = new Request(AddressMapping.LoadModeOccupancy, 'ReadLoadMode');
    req.destination = addr;
    req.address = AddressMapping.LoadModeAddr;
    return decodeUIntLE(await this.connection.send(req));
  }

  // #6604
  async SetLoadMode(
    addr: number,
    bBroadcast: boolean,
    loadMode: SourceSelectLoadModeEnum
  ): Promise<void> {
    const $data = encodeUIntLE(loadMode, AddressMapping.LoadModeOccupancy);
    const req = new Request($data, bBroadcast, 'SetLoadMode');
    req.destination = addr;
    req.address = AddressMapping.LoadModeAddr;
    await this.connection.send(req);
  }

  // #6614
  async ReadMirrorMode(addr: number, isPreposition: boolean): Promise<number> {
    const req = new Request(AddressMapping.MirrorModeOccupancy, 'ReadMirrorMode');
    req.destination = addr;
    if (isPreposition) {
      req.address = AddressMapping.MirrorModeFirAddr;
    } else {
      req.address = AddressMapping.MirrorModeSecAddr;
    }
    return decodeUIntLE(await this.connection.send(req));
  }

  // #6644
  async SetMirrorMode(
    addr: number,
    bBroadcast: boolean,
    mirrorModeData: number,
    isPreposition: boolean
  ): Promise<void> {
    const req = new Request([mirrorModeData], bBroadcast, 'SetMirrorMode');
    req.destination = addr;
    if (isPreposition) {
      req.address = AddressMapping.MirrorModeFirAddr;
    } else {
      req.address = AddressMapping.MirrorModeSecAddr;
    }
    await this.connection.send(req);
  }

  // #6664
  async ReadLowDelayMode(addr: number): Promise<number> {
    const req = new Request(AddressMapping.LowDelayOccupancy, 'ReadLowDelayMode');
    req.destination = addr;
    req.address = AddressMapping.LowDelayAddr;
    return decodeUIntLE(await this.connection.send(req));
  }

  // #6693
  async SetLowDelayMode(
    addr: number,
    bBroadcast: boolean,
    lowDelayMode: LowDelayModeEnum
  ): Promise<void> {
    const $data = encodeUIntLE(lowDelayMode, AddressMapping.LoadModeOccupancy);
    const req = new Request($data, bBroadcast, 'SetLowDelayMode');
    req.destination = addr;
    req.address = AddressMapping.LowDelayAddr;
    await this.connection.send(req);
  }

  // #6703
  async ReadCabinetRotation(addr: number): Promise<number> {
    const req = new Request(AddressMapping.CabinetRotationOccupancy, 'ReadCabinetRotation');
    req.destination = addr;
    req.address = AddressMapping.CabinetRotationAddr;
    return decodeUIntLE(await this.connection.send(req));
  }

  // #6723
  async SetAutoScreen(addr: number, bBroadcast: boolean, data: number[] | Buffer): Promise<void> {
    if (data.length !== AddressMapping.AutoScreenSettingOccupancy)
      throw new TypeError(`Invalid buffer size: ${data.length}`);
    const req = new Request(data, bBroadcast, 'SetAutoScreen');
    req.destination = addr;
    req.address = AddressMapping.AutoScreenSettingAddr;
    await this.connection.send(req);
  }

  // #6732
  async ReadSender_McuProgramLength(addr: number): Promise<number> {
    const req = new Request(
      AddressMapping.Sender_McuProgramLengthOccupancy,
      'ReadSender_McuProgramLength'
    );
    req.destination = addr;
    req.address = AddressMapping.Sender_McuProgramLengthAddr;
    return decodeUIntLE(await this.connection.send(req));
  }

  // #6752
  async SetSender_McuProgramLength(
    addr: number,
    portAddr: number,
    scanBoardAddr: number,
    bBroadcast: boolean,
    sender_McuProgramLength: number
  ): Promise<void> {
    const $data = encodeUIntLE(
      sender_McuProgramLength,
      AddressMapping.Sender_McuProgramLengthOccupancy
    );
    const req = new Request($data, bBroadcast, 'SetSender_McuProgramLength');
    req.destination = addr;
    req.port = portAddr;
    req.rcvIndex = scanBoardAddr;
    req.address = AddressMapping.Sender_McuProgramLengthAddr;
    await this.connection.send(req);
  }

  // #6762
  async ReadSender_McuProgramEdition(addr: number): Promise<number> {
    const req = new Request(
      AddressMapping.Sender_McuProgramEditionOccupancy,
      'ReadSender_McuProgramEdition'
    );
    req.destination = addr;
    req.address = AddressMapping.Sender_McuProgramEditionAddr;
    return decodeUIntLE(await this.connection.send(req));
  }

  // #6782
  async SetSender_McuProgramEdition(
    addr: number,
    portAddr: number,
    scanBoardAddr: number,
    bBroadcast: boolean,
    sender_McuProgramEdition: number
  ): Promise<void> {
    const $data = encodeUIntLE(
      sender_McuProgramEdition,
      AddressMapping.Sender_McuProgramEditionOccupancy
    );
    const req = new Request($data, bBroadcast, 'SetSender_McuProgramEdition');
    req.destination = addr;
    req.port = portAddr;
    req.rcvIndex = scanBoardAddr;
    req.address = AddressMapping.Sender_McuProgramEditionAddr;
    await this.connection.send(req);
  }

  // #6792
  async ReadSender_McuProgramRemarks(addr: number): Promise<Buffer> {
    const req = new Request(
      AddressMapping.Sender_McuProgramRemarksOccupancy,
      'ReadSender_McuProgramRemarks'
    );
    req.destination = addr;
    req.address = AddressMapping.Sender_McuProgramRemarksAddr;
    return (await this.connection.send(req)).data;
  }

  // #6814
  async SetSender_McuProgramRemarks(
    addr: number,
    portAddr: number,
    scanBoardAddr: number,
    bBroadcast: boolean,
    sender_McuProgramRemarks: number[] | Buffer
  ): Promise<void> {
    if (sender_McuProgramRemarks.length !== AddressMapping.Sender_McuProgramRemarksOccupancy)
      throw new TypeError(`Invalid buffer size: ${sender_McuProgramRemarks.length}`);
    const req = new Request(sender_McuProgramRemarks, bBroadcast, 'SetSender_McuProgramRemarks');
    req.destination = addr;
    req.port = portAddr;
    req.rcvIndex = scanBoardAddr;
    req.address = AddressMapping.Sender_McuProgramRemarksAddr;
    await this.connection.send(req);
  }

  // #6852
  async ReadSender_McuProgramInfo(addr: number): Promise<Buffer> {
    const req = new Request(
      AddressMapping.Sender_McuProgramInfoOccupancy,
      'ReadSender_McuProgramInfo'
    );
    req.destination = addr;
    req.address = AddressMapping.Sender_McuProgramInfoAddr;
    return (await this.connection.send(req)).data;
  }

  // #6874
  async SetSender_McuProgramInfo(
    addr: number,
    portAddr: number,
    scanBoardAddr: number,
    bBroadcast: boolean,
    sender_McuProgramRemarks: number[] | Buffer
  ): Promise<void> {
    if (sender_McuProgramRemarks.length !== AddressMapping.Sender_McuProgramInfoOccupancy)
      throw new TypeError(`Invalid buffer size: ${sender_McuProgramRemarks.length}`);
    const req = new Request(sender_McuProgramRemarks, bBroadcast, 'SetSender_McuProgramInfo');
    req.destination = addr;
    req.port = portAddr;
    req.rcvIndex = scanBoardAddr;
    req.address = AddressMapping.Sender_McuProgramInfoAddr;
    await this.connection.send(req);
  }

  // #6883
  async SetSender_Reset(): Promise<void> {
    const req = new Request(Buffer.alloc(1), true, 'SetSender_Reset');
    req.destination = 255;
    req.port = 255;
    req.rcvIndex = 65535;
    req.address = AddressMapping.Sender_McuResetAddr;
    await this.connection.send(req);
  }

  // #6893
  async SetSender_Reset_1(addr: number, bBroadcast: boolean): Promise<void> {
    const req = new Request(Buffer.alloc(1), bBroadcast, 'SetSender_Reset_1');
    req.destination = addr;
    req.port = 255;
    req.rcvIndex = 65535;
    req.address = AddressMapping.Sender_McuResetAddr;
    await this.connection.send(req);
  }

  SetSender_EncryptHandShake = (): void => {
    throw new TypeError('Not implemented');
  };

  // #6912
  async SetSender_McuUpdateProgrammFinish(
    addr: number,
    bBroadcast: boolean,
    updateFinishData: number
  ): Promise<void> {
    const req = new Request([updateFinishData], bBroadcast, 'SetSender_McuUpdateProgrammFinish');
    req.destination = addr;
    req.port = 255;
    req.rcvIndex = 255;
    req.address = AddressMapping.Sender_McuUpdateProgrammFinishAddr;
    await this.connection.send(req);
  }

  // #6922
  async ReadSender_FPGAProgramLength(addr: number): Promise<number> {
    const req = new Request(
      AddressMapping.Sender_FPGAProgramLengthOccupancy,
      'ReadSender_FPGAProgramLength'
    );
    req.destination = addr;
    req.address = AddressMapping.Sender_FPGAProgramLengthAddr;
    return decodeUIntLE(await this.connection.send(req));
  }

  // #6942
  async SetSender_FPGAProgramLength(
    addr: number,
    portAddr: number,
    scanBoardAddr: number,
    bBroadcast: boolean,
    sender_FPGAProgramLength: number
  ): Promise<void> {
    const $data = encodeUIntLE(
      sender_FPGAProgramLength,
      AddressMapping.Sender_FPGAProgramLengthOccupancy
    );
    const req = new Request($data, bBroadcast, 'SetSender_FPGAProgramLength');
    req.destination = addr;
    req.port = portAddr;
    req.rcvIndex = scanBoardAddr;
    req.address = AddressMapping.Sender_FPGAProgramLengthAddr;
    await this.connection.send(req);
  }

  // #6952
  async ReadSender_FPGAProgramEdition(addr: number): Promise<number> {
    const req = new Request(
      AddressMapping.Sender_FPGAProgramEditionOccupancy,
      'ReadSender_FPGAProgramEdition'
    );
    req.destination = addr;
    req.address = AddressMapping.Sender_FPGAProgramEditionAddr;
    return decodeUIntLE(await this.connection.send(req));
  }

  // #6972
  async SetSender_FPGAProgramEdition(
    addr: number,
    portAddr: number,
    scanBoardAddr: number,
    bBroadcast: boolean,
    sender_FPGAProgramEdition: number
  ): Promise<void> {
    const $data = encodeUIntLE(
      sender_FPGAProgramEdition,
      AddressMapping.Scanner_FPGAProgramEditionOccupancy
    );
    const req = new Request($data, bBroadcast, 'SetSender_FPGAProgramEdition');
    req.destination = addr;
    req.port = portAddr;
    req.rcvIndex = scanBoardAddr;
    req.address = AddressMapping.Sender_FPGAProgramEditionAddr;
    await this.connection.send(req);
  }

  // #6982
  async ReadSender_FPGAProgramRemarks(addr: number): Promise<Buffer> {
    const req = new Request(
      AddressMapping.Sender_FPGAProgramRemarksOccupancy,
      'ReadSender_FPGAProgramRemarks'
    );
    req.destination = addr;
    req.address = AddressMapping.Sender_FPGAProgramRemarksAddr;
    return (await this.connection.send(req)).data;
  }

  // #7004
  async SetSender_FPGAProgramRemarks(
    addr: number,
    portAddr: number,
    scanBoardAddr: number,
    bBroadcast: boolean,
    sender_FPGAProgramRemarks: number[] | Buffer
  ): Promise<void> {
    if (sender_FPGAProgramRemarks.length !== AddressMapping.Sender_FPGAProgramRemarksOccupancy)
      throw new TypeError(`Invalid buffer size: ${sender_FPGAProgramRemarks.length}`);
    const req = new Request(sender_FPGAProgramRemarks, bBroadcast, 'SetSender_FPGAProgramRemarks');
    req.destination = addr;
    req.port = portAddr;
    req.rcvIndex = scanBoardAddr;
    req.address = AddressMapping.Sender_FPGAProgramRemarksAddr;
    await this.connection.send(req);
  }

  // #7042
  async ReadSender_FPGAProgramInfo(addr: number): Promise<Buffer> {
    const req = new Request(
      AddressMapping.Sender_FPGAProgramInfoOccupancy,
      'ReadSender_FPGAProgramInfo'
    );
    req.destination = addr;
    req.address = AddressMapping.Sender_FPGAProgramInfoAddr;
    return (await this.connection.send(req)).data;
  }

  // #7064
  async SetSender_FPGAProgramInfo(
    addr: number,
    portAddr: number,
    scanBoardAddr: number,
    bBroadcast: boolean,
    sender_FPGAProgramRemarks: number[] | Buffer
  ): Promise<void> {
    if (sender_FPGAProgramRemarks.length !== AddressMapping.Sender_FPGAProgramInfoOccupancy)
      throw new TypeError(`Invalid buffer size: ${sender_FPGAProgramRemarks.length}`);
    const req = new Request(sender_FPGAProgramRemarks, bBroadcast, 'SetSender_FPGAProgramInfo');
    req.destination = addr;
    req.port = portAddr;
    req.rcvIndex = scanBoardAddr;
    req.address = AddressMapping.Sender_FPGAProgramInfoAddr;
    await this.connection.send(req);
  }

  // #7073
  async ReadSender_SoftwareSpace(
    addr: number,
    dataLength: number,
    addrOffset: number
  ): Promise<Buffer> {
    const req = new Request(dataLength, 'ReadSender_SoftwareSpace');
    req.destination = addr;
    req.address = AddressMapping.Sender_SoftwareSpaceAddr + addrOffset;
    return (await this.connection.send(req)).data;
  }

  // #7099
  async SetSender_SoftwareSpace(
    addr: number,
    bBroadcast: boolean,
    sender_SoftwareSpace: number[] | Buffer,
    dataLength: number,
    addrOffset: number
  ): Promise<void> {
    if (sender_SoftwareSpace.length !== dataLength)
      throw new TypeError(`Invalid buffer size: ${sender_SoftwareSpace.length}`);
    const req = new Request(sender_SoftwareSpace, bBroadcast, 'SetSender_SoftwareSpace');
    req.destination = addr;
    req.address = AddressMapping.Sender_SoftwareSpaceAddr + addrOffset;
    await this.connection.send(req);
  }

  // #7138
  async ReadSender_EDIDSpace(addr: number): Promise<Buffer> {
    const req = new Request(AddressMapping.Sender_EDIDSpaceOccupancy, 'ReadSender_EDIDSpace');
    req.destination = addr;
    req.address = AddressMapping.Sender_EDIDSpaceAddr;
    return (await this.connection.send(req)).data;
  }

  // #7147
  async SetSender_C_ABL_ADDR(
    addr: number,
    portAddr: number,
    scanBoardAddr: number,
    bBroadcast: boolean,
    data: number[] | Buffer
  ): Promise<void> {
    const req = new Request(data, bBroadcast, 'SetSender_C_ABL_ADDR');
    req.destination = addr;
    req.port = portAddr;
    req.rcvIndex = scanBoardAddr;
    req.address = AddressMapping.C_ABL_ADDR;
    await this.connection.send(req);
  }

  // #7167
  async SetSender_EDIDSpace(
    addr: number,
    portAddr: number,
    scanBoardAddr: number,
    bBroadcast: boolean,
    Passward: number[] | Buffer
  ): Promise<void> {
    if (Passward.length !== AddressMapping.Sender_EDIDSpaceOccupancy)
      throw new TypeError(`Invalid buffer size: ${Passward.length}`);
    const req = new Request(Passward, bBroadcast, 'SetSender_EDIDSpace');
    req.destination = addr;
    req.port = portAddr;
    req.rcvIndex = scanBoardAddr;
    req.address = AddressMapping.Sender_EDIDSpaceAddr;
    await this.connection.send(req);
  }

  // #7176
  async ReadSender_EdidInterlacedFlag(addr: number): Promise<number> {
    const req = new Request(
      AddressMapping.EdidInterlacedFlagOccupancy,
      'ReadSender_EdidInterlacedFlag'
    );
    req.destination = addr;
    req.address = AddressMapping.EdidInterlacedFlagAddr;
    return decodeUIntLE(await this.connection.send(req));
  }

  // #7205
  async ReadSender_NewFrame(addr: number): Promise<number> {
    const req = new Request(AddressMapping.Sender_NewFrameOccupancy, 'ReadSender_NewFrame');
    req.destination = addr;
    req.address = AddressMapping.Sender_NewFrameAddr;
    return decodeUIntLE(await this.connection.send(req));
  }

  // #7214
  async ReadSender_ScreenConfigSpace(addr: number): Promise<Buffer> {
    const req = new Request(
      AddressMapping.Sender_ScreenConfigSpaceOccupancy,
      'ReadSender_ScreenConfigSpace'
    );
    req.destination = addr;
    req.address = AddressMapping.Sender_ScreenConfigSpaceAddr;
    return (await this.connection.send(req)).data;
  }

  // #7234
  async SetSender_ScreenConfigSpace(
    addr: number,
    bBroadcast: boolean,
    screenConfig: number[] | Buffer
  ): Promise<void> {
    if (screenConfig.length !== AddressMapping.Sender_ScreenConfigSpaceOccupancy)
      throw new TypeError(`Invalid buffer size: ${screenConfig.length}`);
    const req = new Request(screenConfig, bBroadcast, 'SetSender_ScreenConfigSpace');
    req.destination = addr;
    req.address = AddressMapping.Sender_ScreenConfigSpaceAddr;
    await this.connection.send(req);
  }

  // #7243
  async ReadSender_ScreenConfigFlagSpace(addr: number): Promise<number> {
    const req = new Request(
      AddressMapping.Sender_ScreenConfigFlagOccupancy,
      'ReadSender_ScreenConfigFlagSpace'
    );
    req.destination = addr;
    req.address = AddressMapping.Sender_ScreenConfigFlagAddr;
    return decodeUIntLE(await this.connection.send(req));
  }

  // #7263
  async SetSender_ScreenConfigFlagSpace(
    addr: number,
    bBroadcast: boolean,
    screenConfig: number[] | Buffer
  ): Promise<void> {
    if (screenConfig.length !== AddressMapping.Sender_ScreenConfigFlagOccupancy)
      throw new TypeError(`Invalid buffer size: ${screenConfig.length}`);
    const req = new Request(screenConfig, bBroadcast, 'SetSender_ScreenConfigFlagSpace');
    req.destination = addr;
    req.address = AddressMapping.Sender_ScreenConfigFlagAddr;
    await this.connection.send(req);
  }

  // #7272
  async ReadSender_RedundantStateSpace(addr: number): Promise<Buffer> {
    const req = new Request(
      AddressMapping.Sender_RedundantStateSpaceOccupancy,
      'ReadSender_RedundantStateSpace'
    );
    req.destination = addr;
    req.address = AddressMapping.Sender_RedundantStateSpaceAddr;
    return (await this.connection.send(req)).data;
  }

  // #7292
  async SetSender_RedundantStateSpace(
    addr: number,
    bBroadcast: boolean,
    redundantState: number[] | Buffer
  ): Promise<void> {
    if (redundantState.length !== AddressMapping.Sender_RedundantStateSpaceOccupancy)
      throw new TypeError(`Invalid buffer size: ${redundantState.length}`);
    const req = new Request(redundantState, bBroadcast, 'SetSender_RedundantStateSpace');
    req.destination = addr;
    req.address = AddressMapping.Sender_RedundantStateSpaceAddr;
    await this.connection.send(req);
  }

  // #7301
  async ReadSender_RedundantStateNewSpace(addr: number): Promise<Buffer> {
    const req = new Request(
      AddressMapping.Sender_RedundantStateSpaceOccupancy,
      'ReadSender_RedundantStateNewSpace'
    );
    req.destination = addr;
    req.address = AddressMapping.Sender_RedundantStateSpaceNewAddr;
    return (await this.connection.send(req)).data;
  }

  // #7321
  async SetSender_RedundantStateNewSpace(
    addr: number,
    bBroadcast: boolean,
    redundantState: number[] | Buffer
  ): Promise<void> {
    if (redundantState.length !== AddressMapping.Sender_RedundantStateSpaceOccupancy)
      throw new TypeError(`Invalid buffer size: ${redundantState.length}`);
    const req = new Request(redundantState, bBroadcast, 'SetSender_RedundantStateNewSpace');
    req.destination = addr;
    req.address = AddressMapping.Sender_RedundantStateSpaceNewAddr;
    await this.connection.send(req);
  }

  // #7330
  async ReadSender_RedundantStateSpaceAllData(addr: number): Promise<Buffer> {
    const req = new Request(
      AddressMapping.Sender_AllDataSpaceOccupancy,
      'ReadSender_RedundantStateSpaceAllData'
    );
    req.destination = addr;
    req.address = AddressMapping.Sender_AllDataAddr;
    return (await this.connection.send(req)).data;
  }

  // #7382
  async ReadSender_RedundantStateOver32SpaceAllData(addr: number): Promise<Buffer> {
    const req = new Request(
      AddressMapping.Sender_AllData32SpaceOccupancy,
      'ReadSender_RedundantStateOver32SpaceAllData'
    );
    req.destination = addr;
    req.address = AddressMapping.Sender_All32DataAddr;
    return (await this.connection.send(req)).data;
  }

  // #7402
  async ReadSender_Enable3DStateSpace(addr: number): Promise<number> {
    const req = new Request(AddressMapping.Enable3DOccupancy, 'ReadSender_Enable3DStateSpace');
    req.destination = addr;
    req.address = AddressMapping.Enable3DAddr;
    return decodeUIntLE(await this.connection.send(req));
  }

  // #7422
  async SetSender_Enable3DStateSpace(
    addr: number,
    bBroadcast: boolean,
    enable3DState: number
  ): Promise<void> {
    const req = new Request([enable3DState], bBroadcast, 'SetSender_Enable3DStateSpace');
    req.destination = addr;
    req.address = AddressMapping.Enable3DAddr;
    await this.connection.send(req);
  }

  // #7433
  async ReadSender_ThreeDPerSpace(addr: number): Promise<number> {
    const req = new Request(AddressMapping.ThreeDPerOccupancy, 'ReadSender_ThreeDPerSpace');
    req.destination = addr;
    req.address = AddressMapping.ThreeDPerAddr;
    return decodeUIntLE(await this.connection.send(req));
  }

  // #7453
  async SetSender_ThreeDPerSpace(
    addr: number,
    bBroadcast: boolean,
    enable3DState: number[] | Buffer
  ): Promise<void> {
    const req = new Request(enable3DState, bBroadcast, 'SetSender_ThreeDPerSpace');
    req.destination = addr;
    req.address = AddressMapping.ThreeDPerAddr;
    await this.connection.send(req);
  }

  // #7462
  async SetFlagEnableAccelerate(addr: number, bBroadcast: boolean, isOpen: boolean): Promise<void> {
    const req = new Request(isOpen ? [1] : [0], bBroadcast, 'SetFlagEnableAccelerate');
    req.destination = addr;
    req.address = AddressMapping.Sender_SetFlagForRemove3SecondAddr;
    await this.connection.send(req);
  }

  // #7480
  async ReadSender_OpticalWorkMode(addr: number): Promise<number> {
    const req = new Request(AddressMapping.OpticalWorkModeOccupancy, 'ReadSender_OpticalWorkMode');
    req.destination = addr;
    req.address = AddressMapping.OpticalWorkModeAddr;
    return decodeUIntLE(await this.connection.send(req));
  }

  // #7507
  async SetSender_OpticalWorkMode(
    addr: number,
    bBroadcast: boolean,
    opticalWorkMode: OpticalWorkModeEnum
  ): Promise<void> {
    const $data = encodeUIntLE(opticalWorkMode, AddressMapping.OpticalWorkModeOccupancy);
    const req = new Request($data, bBroadcast, 'SetSender_OpticalWorkMode');
    req.destination = addr;
    req.address = AddressMapping.OpticalWorkModeAddr;
    await this.connection.send(req);
  }

  // #7517
  async ReadSender_HDRState(addr: number): Promise<number> {
    const req = new Request(AddressMapping.HDREnableInfoOccupancy, 'ReadSender_HDRState');
    req.destination = addr;
    req.address = AddressMapping.HDRInfoAddr;
    return decodeUIntLE(await this.connection.send(req));
  }

  // #7537
  async ReadSender_HDRInfo(addr: number): Promise<number> {
    const req = new Request(AddressMapping.HDRInfoOccupancy, 'ReadSender_HDRInfo');
    req.destination = addr;
    req.address = AddressMapping.HDRInfoAddr;
    return decodeUIntLE(await this.connection.send(req));
  }

  // #7557
  async SetSender_HDRState(
    addr: number,
    bBroadcast: boolean,
    enableHDRState: boolean
  ): Promise<void> {
    const req = new Request(enableHDRState ? [88] : [0], bBroadcast, 'SetSender_HDRState');
    req.destination = addr;
    req.address = AddressMapping.HDRInfoAddr;
    await this.connection.send(req);
  }

  // #7575
  async ReadSender_HDR10MinLum(addr: number): Promise<number> {
    const req = new Request(AddressMapping.HDR10MinLumOccupancy, 'ReadSender_HDR10MinLum');
    req.destination = addr;
    req.address = AddressMapping.HDR10MinLum;
    return decodeUIntLE(await this.connection.send(req));
  }

  // #7595
  async SetSender_HDR10MinLum(
    addr: number,
    bBroadcast: boolean,
    HDR10MinLum: number
  ): Promise<void> {
    const req = new Request([HDR10MinLum], bBroadcast, 'SetSender_HDR10MinLum');
    req.destination = addr;
    req.address = AddressMapping.HDR10MinLum;
    await this.connection.send(req);
  }

  // #7606
  async SetSender_ScreenPeakLight(
    addr: number,
    bBroadcast: boolean,
    data: number[] | Buffer
  ): Promise<void> {
    if (data.length !== AddressMapping.HDRScreenPeakLightOccupancy)
      throw new TypeError(`Invalid buffer size: ${data.length}`);
    const req = new Request(data, bBroadcast, 'SetSender_ScreenPeakLight');
    req.destination = addr;
    req.address = AddressMapping.HDRScreenPeakLightAddr;
    await this.connection.send(req);
  }

  // #7615
  async SetSender_AmbientLight(
    addr: number,
    bBroadcast: boolean,
    HDRAmbientLight: number
  ): Promise<void> {
    const req = new Request([HDRAmbientLight], bBroadcast, 'SetSender_AmbientLight');
    req.destination = addr;
    req.address = AddressMapping.HDRAmbientLightAddr;
    await this.connection.send(req);
  }

  // #7626
  async SetSender_HLGModel(
    addr: number,
    bBroadcast: boolean,
    hLGModel: HLGModelEnum
  ): Promise<void> {
    const $data = encodeUIntLE(hLGModel, AddressMapping.HLGModelOccupancy);
    const req = new Request($data, bBroadcast, 'SetSender_HLGModel');
    req.destination = addr;
    req.address = AddressMapping.HLGModelAddr;
    await this.connection.send(req);
  }

  // #7654
  async ReadSender_HLGModel(addr: number): Promise<number> {
    const req = new Request(AddressMapping.HLGModelOccupancy, 'ReadSender_HLGModel');
    req.destination = addr;
    req.address = AddressMapping.HLGModelAddr;
    return decodeUIntLE(await this.connection.send(req));
  }

  // #7663
  async SetSender_GrayDepthAndBit(
    addr: number,
    bBroadcast: boolean,
    data: number[] | Buffer
  ): Promise<void> {
    if (data.length !== AddressMapping.Sender_GrayDepthAndBitOccupancy)
      throw new TypeError(`Invalid buffer size: ${data.length}`);
    const req = new Request(data, bBroadcast, 'SetSender_GrayDepthAndBit');
    req.destination = addr;
    req.address = AddressMapping.Sender_GrayDepthAndBitAddr;
    await this.connection.send(req);
  }

  // #7672
  async SetSender_SetHDRType(
    addr: number,
    bBroadcast: boolean,
    hDRType: HDRTypeEnum
  ): Promise<void> {
    const $data = encodeUIntLE(hDRType, AddressMapping.HDREnableInfoOccupancy);
    const req = new Request($data, bBroadcast, 'SetSender_SetHDRType');
    req.destination = addr;
    req.address = AddressMapping.HDRInfoAddr;
    await this.connection.send(req);
  }

  // #7682
  async ReadSender_IsSupportBackUpTestMode(addr: number): Promise<number> {
    const req = new Request(
      AddressMapping.IsSupportBackUpTestModeOccupancy,
      'ReadSender_IsSupportBackUpTestMode'
    );
    req.destination = addr;
    req.address = AddressMapping.IsSupportBackUpTestModeAddr;
    return decodeUIntLE(await this.connection.send(req));
  }

  // #7705
  async SetSender_BackUpTestMode(
    addr: number,
    bBroadcast: boolean,
    backUpTestMode: boolean
  ): Promise<void> {
    const req = new Request(backUpTestMode ? [1] : [0], bBroadcast, 'SetSender_BackUpTestMode');
    req.destination = addr;
    req.address = AddressMapping.BackUpTestModeAddr;
    await this.connection.send(req);
  }

  // #7723
  async ReadSender_ComplexCfgScreenFlagSpace(addr: number): Promise<number> {
    const req = new Request(
      AddressMapping.ComplexCfgScreenFlagOccupancy,
      'ReadSender_ComplexCfgScreenFlagSpace'
    );
    req.destination = addr;
    req.address = AddressMapping.ComplexCfgScreenFlagAddr;
    return decodeUIntLE(await this.connection.send(req));
  }

  // #7746
  async SetSender_ComplexCfgScreenFlagSpace(
    addr: number,
    bBroadcast: boolean,
    IsComplexCfgScreen: boolean
  ): Promise<void> {
    const req = new Request(
      IsComplexCfgScreen ? [1] : [0],
      bBroadcast,
      'SetSender_ComplexCfgScreenFlagSpace'
    );
    req.destination = addr;
    req.address = AddressMapping.ComplexCfgScreenFlagAddr;
    await this.connection.send(req);
  }

  // #7760
  async ReadSender_AuthorizeTime(addr: number): Promise<number> {
    const req = new Request(
      AddressMapping.Sender_AuthorizeTimeOccupancy,
      'ReadSender_AuthorizeTime'
    );
    req.destination = addr;
    req.address = AddressMapping.Sender_AuthorizeTimeAddr;
    return decodeUIntLE(await this.connection.send(req));
  }

  // #7781
  async SetSender_AuthorizeTime(
    addr: number,
    bBroadcast: boolean,
    authorizeTimeBytes: number[] | Buffer
  ): Promise<void> {
    if (authorizeTimeBytes.length !== AddressMapping.Sender_AuthorizeTimeOccupancy)
      throw new TypeError(`Invalid buffer size: ${authorizeTimeBytes.length}`);
    const req = new Request(authorizeTimeBytes, bBroadcast, 'SetSender_AuthorizeTime');
    req.destination = addr;
    req.address = AddressMapping.Sender_AuthorizeTimeAddr;
    await this.connection.send(req);
  }

  // #7790
  async ReadSender_AuthorizePassward(addr: number): Promise<Buffer> {
    const req = new Request(
      AddressMapping.Sender_AuthorizePasswardOccupancy,
      'ReadSender_AuthorizePassward'
    );
    req.destination = addr;
    req.address = AddressMapping.Sender_AuthorizePasswardAddr;
    return (await this.connection.send(req)).data;
  }

  // #7810
  async SetSender_AuthorizePassward(
    addr: number,
    bBroadcast: boolean,
    Passward: number[] | Buffer
  ): Promise<void> {
    if (Passward.length !== AddressMapping.Sender_AuthorizePasswardOccupancy)
      throw new TypeError(`Invalid buffer size: ${Passward.length}`);
    const req = new Request(Passward, bBroadcast, 'SetSender_AuthorizePassward');
    req.destination = addr;
    req.address = AddressMapping.Sender_AuthorizePasswardAddr;
    await this.connection.send(req);
  }

  // #7819
  async ReadSender_EnableProgramBright(addr: number): Promise<number> {
    const req = new Request(
      AddressMapping.Sender_EnableProgramBrightOccupancy,
      'ReadSender_EnableProgramBright'
    );
    req.destination = addr;
    req.address = AddressMapping.Sender_EnableProgramBrightAddr;
    return decodeUIntLE(await this.connection.send(req));
  }

  // #7842
  async SetSender_EnableProgramBright(
    addr: number,
    bBroadcast: boolean,
    isEnable: boolean
  ): Promise<void> {
    const req = new Request([isEnable ? 91 : 255], bBroadcast, 'SetSender_EnableProgramBright');
    req.destination = addr;
    req.address = AddressMapping.Sender_EnableProgramBrightAddr;
    await this.connection.send(req);
  }

  // #7853
  async SetSender_EnableProgramBright_1(
    addr: number,
    bBroadcast: boolean,
    data: number
  ): Promise<void> {
    const req = new Request([data], bBroadcast, 'SetSender_EnableProgramBright_1');
    req.destination = addr;
    req.address = AddressMapping.Sender_EnableProgramBrightAddr;
    await this.connection.send(req);
  }

  // #7864
  async ReadSender_HWProBrightSegemntCnt(addr: number): Promise<number> {
    const req = new Request(
      AddressMapping.Sender_BrightSegemntCntOccupancy,
      'ReadSender_HWProBrightSegemntCnt'
    );
    req.destination = addr;
    req.address = AddressMapping.Sender_BrightSegemntCntAddr;
    return decodeUIntLE(await this.connection.send(req));
  }

  // #7889
  async SetSender_HWProBrightSegemntCnt(
    addr: number,
    bBroadcast: boolean,
    segementCnt: number
  ): Promise<void> {
    const $data = encodeUIntLE(segementCnt, AddressMapping.Sender_BrightSegemntCntOccupancy);
    const req = new Request($data, bBroadcast, 'SetSender_HWProBrightSegemntCnt');
    req.destination = addr;
    req.address = AddressMapping.Sender_BrightSegemntCntAddr;
    await this.connection.send(req);
  }

  // #7900
  async ReadSender_EnablePartBrightOfHWPro(addr: number): Promise<number> {
    const req = new Request(
      AddressMapping.Sender_EnablePartOfBrightOccupancy,
      'ReadSender_EnablePartBrightOfHWPro'
    );
    req.destination = addr;
    req.address = AddressMapping.Sender_EnablePartOfBrightAddr;
    return decodeUIntLE(await this.connection.send(req));
  }

  // #7923
  async SetSender_EnablePartBrightOfHWPro(
    addr: number,
    bBroadcast: boolean,
    isEnable: boolean
  ): Promise<void> {
    const req = new Request([isEnable ? 91 : 255], bBroadcast, 'SetSender_EnablePartBrightOfHWPro');
    req.destination = addr;
    req.address = AddressMapping.Sender_EnablePartOfBrightAddr;
    await this.connection.send(req);
  }

  // #7934
  async ReadSender_EnableGammaOfHWPro(addr: number): Promise<number> {
    const req = new Request(
      AddressMapping.Sender_EnableGammaOccupancy,
      'ReadSender_EnableGammaOfHWPro'
    );
    req.destination = addr;
    req.address = AddressMapping.Sender_EnableGammaAddr;
    return decodeUIntLE(await this.connection.send(req));
  }

  // #7957
  async SetSender_EnableGammaOfHWPro(
    addr: number,
    bBroadcast: boolean,
    isEnable: boolean
  ): Promise<void> {
    const req = new Request([isEnable ? 91 : 255], bBroadcast, 'SetSender_EnableGammaOfHWPro');
    req.destination = addr;
    req.address = AddressMapping.Sender_EnableGammaAddr;
    await this.connection.send(req);
  }

  // #7968
  async ReadSender_EnableGainOfHWPro(addr: number): Promise<number> {
    const req = new Request(
      AddressMapping.Sender_EnableGainOccupancy,
      'ReadSender_EnableGainOfHWPro'
    );
    req.destination = addr;
    req.address = AddressMapping.Sender_EnableGainAddr;
    return decodeUIntLE(await this.connection.send(req));
  }

  // #7991
  async SetSender_EnableGainOfHWPro(
    addr: number,
    bBroadcast: boolean,
    isEnable: boolean
  ): Promise<void> {
    const req = new Request([isEnable ? 91 : 255], bBroadcast, 'SetSender_EnableGainOfHWPro');
    req.destination = addr;
    req.address = AddressMapping.Sender_EnableGainAddr;
    await this.connection.send(req);
  }

  // #8002
  async ReadSender_EnableAndSegementOfHWPro(addr: number): Promise<Buffer> {
    const req = new Request(
      AddressMapping.Sender_EnableAndSegemntOccupancy,
      'ReadSender_EnableAndSegementOfHWPro'
    );
    req.destination = addr;
    req.address = AddressMapping.Sender_EnableAndSegemntAddr;
    return (await this.connection.send(req)).data;
  }

  SetSender_EnableAndSegementOfHWPro = (): void => {
    throw new TypeError('Not implemented');
  };

  SetSender_HWProgramBrightInfo = (): void => {
    throw new TypeError('Not implemented');
  };

  SetSender_HWProgramAllCtrlInfo = (): void => {
    throw new TypeError('Not implemented');
  };

  // #8302
  async ReadSender_HWProgramAllInfo(addr: number): Promise<Buffer> {
    const req = new Request(
      AddressMapping.Sender_HWProgramAllInfoccupancy,
      'ReadSender_HWProgramAllInfo'
    );
    req.destination = addr;
    req.address = AddressMapping.Sender_HWProgramAllInfoAddr;
    return (await this.connection.send(req)).data;
  }

  // #8511
  async ReadSender_EnableSmartBright(addr: number, dataLength: number): Promise<Buffer> {
    const req = new Request(dataLength, 'ReadSender_EnableSmartBright');
    req.destination = addr;
    req.address = AddressMapping.Sender_EnableProgramBrightAddr;
    return (await this.connection.send(req)).data;
  }

  // #8520
  async SetSender_HWSmartBright(
    addr: number,
    bBoradcast: boolean,
    data: number[] | Buffer
  ): Promise<void> {
    const req = new Request(data, bBoradcast, 'SetSender_HWSmartBright');
    req.destination = addr;
    req.address = AddressMapping.Sender_EnableProgramBrightAddr;
    await this.connection.send(req);
  }

  // #8529
  async SetHWSmartBrightIsEnable(
    addr: number,
    bBoradcast: boolean,
    isEnable: boolean
  ): Promise<void> {
    const req = new Request(isEnable ? [1] : [0], bBoradcast, 'SetHWSmartBrightIsEnable');
    req.destination = addr;
    req.address = AddressMapping.Sender_EnableProgramBrightAddr + 12;
    await this.connection.send(req);
  }

  // #8547
  async ReadSender_HWBrightAdjustType(addr: number): Promise<number> {
    const req = new Request(
      AddressMapping.Sender_HWBrightAdjustTypeOccupancy,
      'ReadSender_HWBrightAdjustType'
    );
    req.destination = addr;
    req.address = AddressMapping.Sender_HWBrightAdjustTypeAddr;
    return decodeUIntLE(await this.connection.send(req));
  }

  // #8574
  async SetSender_HWBrightAdjustType(
    addr: number,
    bBroadcast: boolean,
    enableAutoData: HWBrightAdjustTypeEnum
  ): Promise<void> {
    const req = new Request(
      enableAutoData === HWBrightAdjustTypeEnum.HWAutoBright
        ? [125]
        : enableAutoData === HWBrightAdjustTypeEnum.HWProgram
          ? [91]
          : [255],
      bBroadcast,
      'SetSender_HWBrightAdjustType'
    );
    req.destination = addr;
    req.address = AddressMapping.Sender_HWBrightAdjustTypeAddr;
    await this.connection.send(req);
  }

  // #8597
  async ReadSender_EnableReadHWAutoBright(addr: number): Promise<number> {
    const req = new Request(
      AddressMapping.Sender_EnableHWAutoBrightOccupancy,
      'ReadSender_EnableReadHWAutoBright'
    );
    req.destination = addr;
    req.address = AddressMapping.Sender_EnableHWAutoBrightAddr;
    return decodeUIntLE(await this.connection.send(req));
  }

  // #8620
  async SetSender_EnableHWAutoBright(
    addr: number,
    bBroadcast: boolean,
    enableAutoData: boolean
  ): Promise<void> {
    const req = new Request(
      enableAutoData ? [125] : [255],
      bBroadcast,
      'SetSender_EnableHWAutoBright'
    );
    req.destination = addr;
    req.address = AddressMapping.Sender_EnableHWAutoBrightAddr;
    await this.connection.send(req);
  }

  // #8639
  async ReadSender_ReadHWAutoBright(addr: number): Promise<Buffer> {
    const req = new Request(
      AddressMapping.Sender_HWAutoBrightOccupancy,
      'ReadSender_ReadHWAutoBright'
    );
    req.destination = addr;
    req.address = AddressMapping.Sender_HWAutoBrightAddr;
    return (await this.connection.send(req)).data;
  }

  SetSender_WriteHWAutoBright = (): void => {
    throw new TypeError('Not implemented');
  };

  // #8670
  async ReadSender_EnableDVIEncrypt(addr: number): Promise<number> {
    const req = new Request(
      AddressMapping.Sender_EnableDVIEncryptOccupancy,
      'ReadSender_EnableDVIEncrypt'
    );
    req.destination = addr;
    req.address = AddressMapping.Sender_EnableDVIEncryptAddr;
    return decodeUIntLE(await this.connection.send(req));
  }

  // #8701
  async SetSender_EnableDVIEncrypt(
    addr: number,
    bBroadcast: boolean,
    encryptType: DVIEncryptTypeEnum
  ): Promise<void> {
    const req = new Request(
      encryptType === DVIEncryptTypeEnum.EnableEncrypt
        ? [72]
        : encryptType === DVIEncryptTypeEnum.DisableEncrypt
          ? [139]
          : encryptType === DVIEncryptTypeEnum.None
            ? [255]
            : [0],
      bBroadcast,
      'SetSender_EnableDVIEncrypt'
    );
    req.destination = addr;
    req.address = AddressMapping.Sender_EnableDVIEncryptAddr;
    await this.connection.send(req);
  }

  // #8723
  async Sender_UnLock(addr: number, bBroadcast: boolean, passWord: number): Promise<void> {
    const $data = encodeUIntLE(passWord, AddressMapping.Sender_UnLockOccupancy);
    const req = new Request($data, bBroadcast, 'Sender_UnLock');
    req.destination = addr;
    req.address = AddressMapping.Sender_UnLockAddr;
    await this.connection.send(req);
  }

  // #8733
  async Scaner_UnLock(addr: number, bBroadcast: boolean, passWord: number): Promise<void> {
    const $data = encodeUIntLE(passWord, AddressMapping.Scaner_UnLockOccupancy);
    const req = new Request($data, bBroadcast, 'Scaner_UnLock');
    req.destination = addr;
    req.address = AddressMapping.Scaner_UnLockAddr;
    await this.connection.send(req);
  }

  // #8743
  async ReadUseRecordInfo(addr: number, offaddr: number): Promise<Buffer> {
    const req = new Request(AddressMapping.UseRecordInfoOccupancy, 'ReadUseRecordInfo');
    req.destination = addr;
    req.address = AddressMapping.UseRecordInfoAddr + offaddr;
    return (await this.connection.send(req)).data;
  }

  // #8763
  async ReadSender_EncryptKeyLength(addr: number): Promise<number> {
    const req = new Request(
      AddressMapping.Sender_EncryptKeyLengthOccupancy,
      'ReadSender_EncryptKeyLength'
    );
    req.destination = addr;
    req.address = AddressMapping.Sender_EncryptKeyLengthAddr;
    return decodeUIntLE(await this.connection.send(req));
  }

  // #8783
  async SetSender_EncryptKeyLength(
    addr: number,
    bBroadcast: boolean,
    keyLength: number
  ): Promise<void> {
    const $data = encodeUIntLE(keyLength, AddressMapping.Sender_EncryptKeyLengthOccupancy);
    const req = new Request($data, bBroadcast, 'SetSender_EncryptKeyLength');
    req.destination = addr;
    req.address = AddressMapping.Sender_EncryptKeyLengthAddr;
    await this.connection.send(req);
  }

  // #8793
  async ReadSender_EncryptKey(addr: number): Promise<Buffer> {
    const req = new Request(AddressMapping.Sender_EncryptKeyOccupancy, 'ReadSender_EncryptKey');
    req.destination = addr;
    req.address = AddressMapping.Sender_EncryptKeyAddr;
    return (await this.connection.send(req)).data;
  }

  // #8813
  async SetSender_EncryptKey(
    addr: number,
    bBroadcast: boolean,
    key: number[] | Buffer
  ): Promise<void> {
    if (key.length !== AddressMapping.Sender_EncryptKeyOccupancy)
      throw new TypeError(`Invalid buffer size: ${key.length}`);
    const req = new Request(key, bBroadcast, 'SetSender_EncryptKey');
    req.destination = addr;
    req.address = AddressMapping.Sender_EncryptKeyAddr;
    await this.connection.send(req);
  }

  // #8822
  async ReadSender_EncryptKeyRegion(addr: number): Promise<Buffer> {
    const req = new Request(
      AddressMapping.Sender_EncryptKeyRegionOccupancy,
      'ReadSender_EncryptKeyRegion'
    );
    req.destination = addr;
    req.address = AddressMapping.Sender_EncryptKeyRegionAddr;
    return (await this.connection.send(req)).data;
  }

  SetSender_EncryptKeyRegion = (): void => {
    throw new TypeError('Not implemented');
  };

  // #8893
  async ReadSender_EncryptPassword(addr: number): Promise<Buffer> {
    const req = new Request(
      AddressMapping.Sender_EncryptPasswordOccupancy,
      'ReadSender_EncryptPassword'
    );
    req.destination = addr;
    req.address = AddressMapping.Sender_EncryptPasswordAddr;
    return (await this.connection.send(req)).data;
  }

  // #8913
  async SetSender_EncryptPassword(
    addr: number,
    bBroadcast: boolean,
    Passward: number[] | Buffer
  ): Promise<void> {
    if (Passward.length !== AddressMapping.Sender_EncryptPasswordOccupancy)
      throw new TypeError(`Invalid buffer size: ${Passward.length}`);
    const req = new Request(Passward, bBroadcast, 'SetSender_EncryptPassword');
    req.destination = addr;
    req.address = AddressMapping.Sender_EncryptPasswordAddr;
    await this.connection.send(req);
  }

  // #8922
  async ReadSender_DVIResolutionWidth(addr: number): Promise<number> {
    const req = new Request(
      AddressMapping.Sender_DVIWidthOccupancy,
      'ReadSender_DVIResolutionWidth'
    );
    req.destination = addr;
    req.address = AddressMapping.Sender_DVIWidthAddr;
    return decodeUIntLE(await this.connection.send(req));
  }

  // #8942
  async SetSender_DVIResolutionWidth(
    addr: number,
    bBroadcast: boolean,
    dviWidth: number
  ): Promise<void> {
    const $data = encodeUIntLE(dviWidth, AddressMapping.Sender_DVIWidthOccupancy);
    const req = new Request($data, bBroadcast, 'SetSender_DVIResolutionWidth');
    req.destination = addr;
    req.address = AddressMapping.Sender_DVIWidthAddr;
    await this.connection.send(req);
  }

  // #8952
  async ReadSender_DVIResolutionHeight(addr: number): Promise<number> {
    const req = new Request(
      AddressMapping.Sender_DVIHeightOccupancy,
      'ReadSender_DVIResolutionHeight'
    );
    req.destination = addr;
    req.address = AddressMapping.Sender_DVIHeightAddr;
    return decodeUIntLE(await this.connection.send(req));
  }

  // #8972
  async SetSender_DVIResolutionHeight(
    addr: number,
    bBroadcast: boolean,
    dviHeight: number
  ): Promise<void> {
    const $data = encodeUIntLE(dviHeight, AddressMapping.Sender_DVIWidthOccupancy);
    const req = new Request($data, bBroadcast, 'SetSender_DVIResolutionHeight');
    req.destination = addr;
    req.address = AddressMapping.Sender_DVIHeightAddr;
    await this.connection.send(req);
  }

  // #8982
  async ReadSender_DVIRows(addr: number): Promise<number> {
    const req = new Request(AddressMapping.Sender_DVIRowsOccupancy, 'ReadSender_DVIRows');
    req.destination = addr;
    req.address = AddressMapping.Sender_DVIRowsAddr;
    return decodeUIntLE(await this.connection.send(req));
  }

  // #9002
  async SetSender_DVIRows(addr: number, bBroadcast: boolean, dviRows: number): Promise<void> {
    const $data = encodeUIntLE(dviRows, AddressMapping.Sender_DVIRowsOccupancy);
    const req = new Request($data, bBroadcast, 'SetSender_DVIRows');
    req.destination = addr;
    req.address = AddressMapping.Sender_DVIRowsAddr;
    await this.connection.send(req);
  }

  // #9012
  async ReadSender_DVICols(addr: number): Promise<number> {
    const req = new Request(AddressMapping.Sender_DVIColsOccupancy, 'ReadSender_DVICols');
    req.destination = addr;
    req.address = AddressMapping.Sender_DVIColsAddr;
    return decodeUIntLE(await this.connection.send(req));
  }

  // #9032
  async SetSender_DVICols(addr: number, bBroadcast: boolean, dviCols: number): Promise<void> {
    const $data = encodeUIntLE(dviCols, AddressMapping.Sender_DVIColsOccupancy);
    const req = new Request($data, bBroadcast, 'SetSender_DVICols');
    req.destination = addr;
    req.address = AddressMapping.Sender_DVIColsAddr;
    await this.connection.send(req);
  }

  // #9042
  async ReadSender_EncryptAllInfo(addr: number): Promise<Buffer> {
    const req = new Request(
      AddressMapping.Sender_EncryptAllInfoOccupancy,
      'ReadSender_EncryptAllInfo'
    );
    req.destination = addr;
    req.address = AddressMapping.Sender_EncryptAllInfoAddr;
    return (await this.connection.send(req)).data;
  }

  SetSender_EncryptAllInfo = (): void => {
    throw new TypeError('Not implemented');
  };

  SetSender_ResetDVIEncrypt = (): void => {
    throw new TypeError('Not implemented');
  };

  // #9296
  async SetSender_10bitGammaValue(
    addr: number,
    bBroadcast: boolean,
    gammaValue: number
  ): Promise<void> {
    const req = new Request([gammaValue], bBroadcast, 'SetSender_10bitGammaValue');
    req.destination = addr;
    req.address = AddressMapping.Sender_10bitGammaValueAddr;
    await this.connection.send(req);
  }

  // #9305
  async ReadSender_10bitGammaValue(addr: number): Promise<number> {
    const req = new Request(
      AddressMapping.Sender_10bitGammaValueOccupancy,
      'ReadSender_10bitGammaValue'
    );
    req.destination = addr;
    req.address = AddressMapping.Sender_10bitGammaValueAddr;
    return decodeUIntLE(await this.connection.send(req));
  }

  // #9314
  async SetSender_12bitGammaValue(
    addr: number,
    bBroadcast: boolean,
    gammaValue: number
  ): Promise<void> {
    const req = new Request([gammaValue], bBroadcast, 'SetSender_12bitGammaValue');
    req.destination = addr;
    req.address = AddressMapping.Sender_12bitGammaValueAddr;
    await this.connection.send(req);
  }

  // #9323
  async ReadSender_12bitGammaValue(addr: number): Promise<number> {
    const req = new Request(
      AddressMapping.Sender_12bitGammaValueOccupancy,
      'ReadSender_12bitGammaValue'
    );
    req.destination = addr;
    req.address = AddressMapping.Sender_12bitGammaValueAddr;
    return decodeUIntLE(await this.connection.send(req));
  }

  // #9386
  async ReadDoorSwitchDetection(addr: number): Promise<number> {
    const req = new Request(AddressMapping.DoorSwitchDetectionOccupancy, 'ReadDoorSwitchDetection');
    req.destination = addr;
    req.address = AddressMapping.DoorSwitchDetectionAddr;
    return decodeUIntLE(await this.connection.send(req));
  }

  // #9405
  async SetDoorSwitchDetection(addr: number, bBroadcast: boolean, data: number): Promise<void> {
    const $data = encodeUIntLE(data, AddressMapping.IsDoorSwitchDetectionOccupancy);
    const req = new Request($data, bBroadcast, 'SetDoorSwitchDetection');
    req.destination = addr;
    req.address = AddressMapping.IsDoorSwitchDetectionAddr;
    await this.connection.send(req);
  }

  // #9415
  async SetShowNormal(addr: number, bBroadcast: boolean, data: number): Promise<void> {
    const $data = encodeUIntLE(data, AddressMapping.ShowNormalOccupancy);
    const req = new Request($data, bBroadcast, 'SetShowNormal');
    req.destination = addr;
    req.address = AddressMapping.ShowNormalAddr;
    await this.connection.send(req);
  }

  // #9425
  async SetLCDSwitch(
    addr: number,
    portAddr: number,
    scanBoardAddr: number,
    bBroadcast: boolean,
    tem: number
  ): Promise<void> {
    const $data = encodeUIntLE(tem, AddressMapping.LCDSwitchOccupancy);
    const req = new Request($data, bBroadcast, 'SetLCDSwitch');
    req.destination = addr;
    req.deviceType = 1;
    req.port = portAddr;
    req.rcvIndex = scanBoardAddr;
    req.address = AddressMapping.LCDSwitchAddr;
    await this.connection.send(req);
  }

  // #9436
  async ReadLCDSwitch(addr: number, portAddr: number, scanBoardAddr: number): Promise<number> {
    const req = new Request(AddressMapping.LCDSwitchOccupancy, 'ReadLCDSwitch');
    req.destination = addr;
    req.deviceType = 1;
    req.port = portAddr;
    req.rcvIndex = scanBoardAddr;
    req.address = AddressMapping.LCDSwitchAddr;
    return decodeUIntLE(await this.connection.send(req));
  }

  // #9456
  async SetWorkModeIn660Pro(addr: number, bBroadcast: boolean, data: number): Promise<void> {
    const req = new Request([data], bBroadcast, 'SetWorkModeIn660Pro');
    req.destination = addr;
    req.address = AddressMapping.WorkModeIn660ProAddr;
    await this.connection.send(req);
  }

  // #9467
  async ReadWorkModeIn660Pro(addr: number): Promise<number> {
    const req = new Request(AddressMapping.WorkModeIn660ProOccupancy, 'ReadWorkModeIn660Pro');
    req.destination = addr;
    req.address = AddressMapping.WorkModeIn660ProAddr;
    return decodeUIntLE(await this.connection.send(req));
  }

  // #9476
  async ReadVirtualMap(addr: number): Promise<number> {
    const req = new Request(AddressMapping.VirtualMapOccupancy, 'ReadVirtualMap');
    req.destination = addr;
    req.address = AddressMapping.VirtualMapAddr;
    return decodeUIntLE(await this.connection.send(req));
  }

  // #9496
  async SetVirtualMap(addr: number, bBroadcast: boolean, virtualMap: number): Promise<void> {
    const $data = encodeUIntLE(virtualMap, AddressMapping.VirtualMapOccupancy);
    const req = new Request($data, bBroadcast, 'SetVirtualMap');
    req.destination = addr;
    req.address = AddressMapping.VirtualMapAddr;
    await this.connection.send(req);
  }

  // #9506
  async Set660ConfigFileSendOver(addr: number, bBroadcast: boolean, data: number): Promise<void> {
    const $data = encodeUIntLE(data, AddressMapping.Sender660ConfigFileSendOverOccupancy);
    const req = new Request($data, bBroadcast, 'Set660ConfigFileSendOver');
    req.destination = addr;
    req.address = AddressMapping.Sender660ConfigFileSendOverAddr;
    await this.connection.send(req);
  }

  // #9516
  async ReadSender_VideoScalingMode(addr: number): Promise<number> {
    const req = new Request(
      AddressMapping.Sender_VideoScalingModeOccupancy,
      'ReadSender_VideoScalingMode'
    );
    req.destination = addr;
    req.address = AddressMapping.Sender_VideoScalingModeAddr;
    return decodeUIntLE(await this.connection.send(req));
  }

  // #9536
  async SetSender_VideoScalingMode(
    addr: number,
    bBoradcast: boolean,
    scalingMode: number
  ): Promise<void> {
    const req = new Request([scalingMode], bBoradcast, 'SetSender_VideoScalingMode');
    req.destination = addr;
    req.address = AddressMapping.Sender_VideoScalingModeAddr;
    await this.connection.send(req);
  }

  // #9546
  async ReadSender_VideoScreenOffset(addr: number): Promise<number> {
    const req = new Request(
      AddressMapping.Sender_VideoScreenOffsetOccupancy,
      'ReadSender_VideoScreenOffset'
    );
    req.destination = addr;
    req.address = AddressMapping.Sender_VideoScreenOffsetAddr;
    return decodeUIntLE(await this.connection.send(req));
  }

  // #9566
  async SetSender_VideoScreenOffset(
    addr: number,
    bBoradcast: boolean,
    data: number[] | Buffer
  ): Promise<void> {
    if (data.length !== AddressMapping.Sender_VideoScreenOffsetOccupancy)
      throw new TypeError(`Invalid buffer size: ${data.length}`);
    const req = new Request(data, bBoradcast, 'SetSender_VideoScreenOffset');
    req.destination = addr;
    req.address = AddressMapping.Sender_VideoScreenOffsetAddr;
    await this.connection.send(req);
  }

  // #9575
  async ReadSender_VideoInputCut(addr: number): Promise<Buffer> {
    const req = new Request(
      AddressMapping.Sender_VideoInputCutOccupancy,
      'ReadSender_VideoInputCut'
    );
    req.destination = addr;
    req.address = AddressMapping.Sender_VideoInputCutAddr;
    return (await this.connection.send(req)).data;
  }

  // #9595
  async SetSender_VideoInputCut(
    addr: number,
    bBoradcast: boolean,
    data: number[] | Buffer
  ): Promise<void> {
    if (data.length !== AddressMapping.Sender_VideoInputCutOccupancy)
      throw new TypeError(`Invalid buffer size: ${data.length}`);
    const req = new Request(data, bBoradcast, 'SetSender_VideoInputCut');
    req.destination = addr;
    req.address = AddressMapping.Sender_VideoInputCutAddr;
    await this.connection.send(req);
  }

  // #9604
  async ReadSender_VideoWindowRect(addr: number): Promise<Buffer> {
    const req = new Request(
      AddressMapping.Sender_VideoWindowRectOccupancy,
      'ReadSender_VideoWindowRect'
    );
    req.destination = addr;
    req.address = AddressMapping.Sender_VideoWindowRectAddr;
    return (await this.connection.send(req)).data;
  }

  // #9624
  async SetSender_VideoWindowRect(
    addr: number,
    bBoradcast: boolean,
    data: number[] | Buffer
  ): Promise<void> {
    if (data.length !== AddressMapping.Sender_VideoWindowRectOccupancy)
      throw new TypeError(`Invalid buffer size: ${data.length}`);
    const req = new Request(data, bBoradcast, 'SetSender_VideoWindowRect');
    req.destination = addr;
    req.address = AddressMapping.Sender_VideoWindowRectAddr;
    await this.connection.send(req);
  }

  // #9633
  async ReadSender_VideoMosaicData(addr: number): Promise<Buffer> {
    const req = new Request(
      AddressMapping.Sender_VideoMosaicOccupancy,
      'ReadSender_VideoMosaicData'
    );
    req.destination = addr;
    req.address = AddressMapping.Sender_VideoMosaicAddr;
    return (await this.connection.send(req)).data;
  }

  // #9653
  async SetSender_VideoMosaicData(
    addr: number,
    bBoradcast: boolean,
    data: number[] | Buffer
  ): Promise<void> {
    if (data.length !== AddressMapping.Sender_VideoMosaicOccupancy)
      throw new TypeError(`Invalid buffer size: ${data.length}`);
    const req = new Request(data, bBoradcast, 'SetSender_VideoMosaicData');
    req.destination = addr;
    req.address = AddressMapping.Sender_VideoMosaicAddr;
    await this.connection.send(req);
  }

  // #9662
  async ReadSender_InputVedioSource(addr: number): Promise<number> {
    const req = new Request(
      AddressMapping.Sender_InputVedioSourceOccupancy,
      'ReadSender_InputVedioSource'
    );
    req.destination = addr;
    req.address = AddressMapping.Sender_InputVedioSourceAddr;
    return decodeUIntLE(await this.connection.send(req));
  }

  // #9682
  async SetSender_InputVedioSource(addr: number, bBoradcast: boolean, data: number): Promise<void> {
    const req = new Request([data], bBoradcast, 'SetSender_InputVedioSource');
    req.destination = addr;
    req.address = AddressMapping.Sender_InputVedioSourceAddr;
    await this.connection.send(req);
  }

  // #9692
  async ReadSender_VideoInputSource(addr: number): Promise<Buffer> {
    const req = new Request(
      AddressMapping.Sender_VideoInputSourceOccupancy,
      'ReadSender_VideoInputSource'
    );
    req.destination = addr;
    req.address = AddressMapping.Sender_VideoInputSourceAddr;
    return (await this.connection.send(req)).data;
  }

  // #9712
  async SetSender_VideoInputSource(
    addr: number,
    bBoradcast: boolean,
    data: number[] | Buffer
  ): Promise<void> {
    if (data.length !== AddressMapping.Sender_VideoInputSourceOccupancy)
      throw new TypeError(`Invalid buffer size: ${data.length}`);
    const req = new Request(data, bBoradcast, 'SetSender_VideoInputSource');
    req.destination = addr;
    req.address = AddressMapping.Sender_VideoInputSourceAddr;
    await this.connection.send(req);
  }

  // #9721
  async ReadSender_VideoRealDvi(addr: number): Promise<Buffer> {
    const req = new Request(
      AddressMapping.Sender_VideoRealDviAddrOccupancy,
      'ReadSender_VideoRealDvi'
    );
    req.destination = addr;
    req.address = AddressMapping.Sender_VideoRealDviAddr;
    return (await this.connection.send(req)).data;
  }

  // #9741
  async ReadSender_EnableSyncAndTotalData(addr: number): Promise<Buffer> {
    const req = new Request(
      AddressMapping.Sender_EnableSyncAndTotalDataOccupancy,
      'ReadSender_EnableSyncAndTotalData'
    );
    req.destination = addr;
    req.address = AddressMapping.Sender_EnableSyncAndTotalDataAddr;
    return (await this.connection.send(req)).data;
  }

  // #9761
  async SetSender_EnableSyncAndTotalData(
    addr: number,
    bBoradcast: boolean,
    data: number[] | Buffer
  ): Promise<void> {
    if (data.length !== AddressMapping.Sender_EnableSyncAndTotalDataOccupancy)
      throw new TypeError(`Invalid buffer size: ${data.length}`);
    const req = new Request(data, bBoradcast, 'SetSender_EnableSyncAndTotalData');
    req.destination = addr;
    req.address = AddressMapping.Sender_EnableSyncAndTotalDataAddr;
    await this.connection.send(req);
  }

  // #9770
  async SetSoftToHWHeartbeatTime(
    addr: number,
    bBroadcast: boolean,
    data: number[] | Buffer
  ): Promise<void> {
    const req = new Request(data, bBroadcast, 'SetSoftToHWHeartbeatTime');
    req.destination = addr;
    req.address = 63;
    await this.connection.send(req);
  }

  // #9779
  async ReadSender_HardWareBackupInfos(addr: number, dataLength: number): Promise<Buffer> {
    const req = new Request(dataLength, 'ReadSender_HardWareBackupInfos');
    req.destination = addr;
    req.address = AddressMapping.Sender_HardWareBackupInfoAddr;
    return (await this.connection.send(req)).data;
  }

  // #9799
  async SetSender_HardWareBackupInfos(
    addr: number,
    bBoradcast: boolean,
    data: number[] | Buffer
  ): Promise<void> {
    const req = new Request(data, bBoradcast, 'SetSender_HardWareBackupInfos');
    req.destination = addr;
    req.address = AddressMapping.Sender_HardWareBackupInfoAddr;
    await this.connection.send(req);
  }

  // #9808
  async ReadSender_ScreenAdjustBrightFlag(addr: number): Promise<number> {
    const req = new Request(
      AddressMapping.BrightnessSyncAdjustFlagOccupancy,
      'ReadSender_ScreenAdjustBrightFlag'
    );
    req.destination = addr;
    req.address = AddressMapping.BrightnessSyncAdjustFlagAddr;
    return decodeUIntLE(await this.connection.send(req));
  }

  // #9832
  async SetSender_ScreenAdjustBrightCommand(
    addr: number,
    bBoradcast: boolean,
    data: number[] | Buffer
  ): Promise<void> {
    const req = new Request(data, bBoradcast, 'SetSender_ScreenAdjustBrightCommand');
    req.destination = addr;
    req.address = AddressMapping.Sender_ScreenAdjustBrightAddr;
    await this.connection.send(req);
  }

  // #9841
  async Read_EquipmentIP(addr: number): Promise<Buffer> {
    const req = new Request(AddressMapping.Sender_VideoEquipmentIPOccupancy, 'Read_EquipmentIP');
    req.destination = addr;
    req.address = AddressMapping.Sender_VideoEquipmentIPAddr;
    return (await this.connection.send(req)).data;
  }

  // #9850
  async Set_EquipmentIP(addr: number, bBoradcast: boolean, data: number[] | Buffer): Promise<void> {
    const req = new Request(data, bBoradcast, 'Set_EquipmentIP');
    req.destination = addr;
    req.address = AddressMapping.Sender_VideoEquipmentIPAddr;
    await this.connection.send(req);
  }

  // #9870
  async Read_VideoSourceState(addr: number): Promise<Buffer> {
    const req = new Request(
      AddressMapping.Sender_VideoSourceStateOccupancy,
      'Read_VideoSourceState'
    );
    req.destination = addr;
    req.address = AddressMapping.Sender_VideoSourceStateAddr;
    return (await this.connection.send(req)).data;
  }

  // #9890
  async ReadSender_HWScreenDisplayFlag(addr: number): Promise<number> {
    const req = new Request(
      AddressMapping.Sender_HWScreenDisplayFlagOccupancy,
      'ReadSender_HWScreenDisplayFlag'
    );
    req.destination = addr;
    req.address = AddressMapping.Sender_HWScreenDisplayBaseAddr;
    return decodeUIntLE(await this.connection.send(req));
  }

  // #9899
  async WriteSender_HWScreenDisplayInfo(
    addr: number,
    bBoradcast: boolean,
    data: number[] | Buffer
  ): Promise<void> {
    const req = new Request(data, bBoradcast, 'WriteSender_HWScreenDisplayInfo');
    req.destination = addr;
    req.address = AddressMapping.Sender_HWScreenDisplayBaseAddr;
    await this.connection.send(req);
  }

  // #9922
  async WriteSender_HWScreenData(
    addr: number,
    bBoradcast: boolean,
    data: number[] | Buffer
  ): Promise<void> {
    const req = new Request(data, bBoradcast, 'WriteSender_HWScreenData');
    req.destination = addr;
    req.address = AddressMapping.Sender_HWScreenDisplayDataAddr;
    await this.connection.send(req);
  }

  // #9931
  async ReadMasterOrSlaveState(addr: number): Promise<number> {
    const req = new Request(
      AddressMapping.MasterOrSlaveDeviceStateOccupancy,
      'ReadMasterOrSlaveState'
    );
    req.destination = addr;
    req.address = AddressMapping.MasterOrSlaveDeviceStateAddr;
    return decodeUIntLE(await this.connection.send(req));
  }

  // #9940
  async ReadSenderCPUIdData(addr: number): Promise<Buffer> {
    const req = new Request(12, 'ReadSenderCPUIdData');
    req.destination = addr;
    req.address = 32;
    return (await this.connection.send(req)).data;
  }

  // #9949
  async ReadSenderDVIStatus(addr: number): Promise<number> {
    const req = new Request(1, 'ReadSenderDVIStatus');
    req.destination = addr;
    req.address = 33554455;
    return decodeUIntLE(await this.connection.send(req));
  }

  SetMasterOrSlaveState = (): void => {
    throw new TypeError('Not implemented');
  };

  SetSender_AllFileLength = (): void => {
    throw new TypeError('Not implemented');
  };

  SetSender_CurSendFileLength = (): void => {
    throw new TypeError('Not implemented');
  };

  SetSender5C_FPGA = (): void => {
    throw new TypeError('Not implemented');
  };

  SetSender4C_FPGA = (): void => {
    throw new TypeError('Not implemented');
  };

  SetSender8028_FPGA = (): void => {
    throw new TypeError('Not implemented');
  };

  SetSender207_Mcu = (): void => {
    throw new TypeError('Not implemented');
  };

  SetSender_ImageFileData = (): void => {
    throw new TypeError('Not implemented');
  };

  SetSender_WordStockFileData = (): void => {
    throw new TypeError('Not implemented');
  };

  SetSender_WebpageFileData = (): void => {
    throw new TypeError('Not implemented');
  };

  // #10256
  async ReadSender_ImageProgramEdition(addr: number): Promise<number> {
    const req = new Request(
      AddressMapping.Sender_ImageProgramEditionOccupancy,
      'ReadSender_ImageProgramEdition'
    );
    req.destination = addr;
    req.address = AddressMapping.Sender_ImageProgramEditionAddr;
    return decodeUIntLE(await this.connection.send(req));
  }

  // #10265
  async ReadSender_ImageProgramTailEdition(addr: number): Promise<number> {
    const req = new Request(
      AddressMapping.Sender_ImageProgramTailEditionOccupancy,
      'ReadSender_ImageProgramTailEdition'
    );
    req.destination = addr;
    req.address = AddressMapping.Sender_ImageProgramTailEditAddr;
    return decodeUIntLE(await this.connection.send(req));
  }

  // #10274
  async ReadSender_WebProgramEdition(addr: number): Promise<number> {
    const req = new Request(
      AddressMapping.Sender_WebProgramEditionOccupancy,
      'ReadSender_WebProgramEdition'
    );
    req.destination = addr;
    req.address = AddressMapping.Sender_WebProgramEditAddr;
    return decodeUIntLE(await this.connection.send(req));
  }

  // #10283
  async ReadSender_WebProgramTailEdition(addr: number): Promise<number> {
    const req = new Request(
      AddressMapping.Sender_WebProgramTailEditionOccupancy,
      'ReadSender_WebProgramTailEdition'
    );
    req.destination = addr;
    req.address = AddressMapping.Sender_WebProgramTailEditAddr;
    return decodeUIntLE(await this.connection.send(req));
  }

  // #10292
  async ReadSender_WordStockProgramEdition(addr: number): Promise<number> {
    const req = new Request(
      AddressMapping.Sender_WordStockProgramEditionOccupancy,
      'ReadSender_WordStockProgramEdition'
    );
    req.destination = addr;
    req.address = AddressMapping.Sender_WordStockProgramEditAddr;
    return decodeUIntLE(await this.connection.send(req));
  }

  // #10301
  async ReadSender_WordStockProgramTailEdition(addr: number): Promise<number> {
    const req = new Request(
      AddressMapping.Sender_WordStockProgramTailEditionOccupancy,
      'ReadSender_WordStockProgramTailEdition'
    );
    req.destination = addr;
    req.address = AddressMapping.Sender_WordStockProgramTailEditAddr;
    return decodeUIntLE(await this.connection.send(req));
  }

  // #10310
  async ReadSender_V900IsInBoot(addr: number): Promise<number> {
    const req = new Request(AddressMapping.Sender_V900IsInBootOccupancy, 'ReadSender_V900IsInBoot');
    req.destination = addr;
    req.address = AddressMapping.Sender_V900IsInBootAddr;
    return decodeUIntLE(await this.connection.send(req));
  }

  WriteSourceBackupInfo = (): void => {
    throw new TypeError('Not implemented');
  };

  WriteSourceBackupInfoNew = (): void => {
    throw new TypeError('Not implemented');
  };

  // #10412
  async ReadSourceBackupInfo(addr: number, readLength: number): Promise<Buffer> {
    const req = new Request(readLength, 'ReadSourceBackupInfo');
    req.destination = addr;
    req.address = AddressMapping.SourceBackupAddr;
    return (await this.connection.send(req)).data;
  }

  // #10421
  async ReadDeviceTable(addr: number, readLen: number): Promise<Buffer> {
    const req = new Request(readLen, 'ReadDeviceTable');
    req.destination = addr;
    req.address = AddressMapping.DeviceTableAddr;
    return (await this.connection.send(req)).data;
  }

  // #10430
  async ReadSupportDeviceTableTag(addr: number): Promise<number> {
    const req = new Request(
      AddressMapping.SupportDeviceTableOccupancy,
      'ReadSupportDeviceTableTag'
    );
    req.destination = addr;
    req.address = AddressMapping.SupportDeviceTableAddr;
    return decodeUIntLE(await this.connection.send(req));
  }

  // #10439
  async ReadDeviceExtendType(addr: number): Promise<number> {
    const req = new Request(AddressMapping.DeviceExtendTypeOccupancy, 'ReadDeviceExtendType');
    req.destination = addr;
    req.address = AddressMapping.DeviceExtendTypeAddr;
    return decodeUIntLE(await this.connection.send(req));
  }

  // #10448
  async ReadResolutionExtend(addr: number): Promise<Buffer> {
    const req = new Request(
      AddressMapping.Sender_ResolutionExtendOccupancy,
      'ReadResolutionExtend'
    );
    req.destination = addr;
    req.address = AddressMapping.Sender_ResolutionExtendAddr;
    return (await this.connection.send(req)).data;
  }

  // #10468
  async ReadBlackScreenSleepParam(addr: number): Promise<number> {
    const req = new Request(
      AddressMapping.Sender_BlackScreenSleepLength,
      'ReadBlackScreenSleepParam'
    );
    req.destination = addr;
    req.address = AddressMapping.Sender_BlackScreenSleepAddr;
    return decodeUIntLE(await this.connection.send(req));
  }

  // #10477
  async SetBlackScreenSleepParam(
    addr: number,
    bBoradcast: boolean,
    data: number[] | Buffer
  ): Promise<void> {
    const req = new Request(data, bBoradcast, 'SetBlackScreenSleepParam');
    req.destination = addr;
    req.address = AddressMapping.Sender_BlackScreenSleepAddr;
    await this.connection.send(req);
  }

  // #10486
  async ReadToneValue(addr: number): Promise<number> {
    const req = new Request(AddressMapping.SenderToneResultOccupancy, 'ReadToneValue');
    req.destination = addr;
    req.address = AddressMapping.SenderToneResultddr;
    return decodeUIntLE(await this.connection.send(req));
  }

  // #10507
  async SetToneValue(addr: number, bBroadcast: boolean, dht: number): Promise<void> {
    const $data = encodeUIntLE(dht, AddressMapping.SenderToneResultOccupancy);
    const req = new Request($data, bBroadcast, 'SetToneValue');
    req.destination = addr;
    req.address = AddressMapping.SenderToneResultddr;
    await this.connection.send(req);
  }

  // #10518
  async ReadSaturationValue(addr: number): Promise<number> {
    const req = new Request(AddressMapping.SenderSaturationResultOccupancy, 'ReadSaturationValue');
    req.destination = addr;
    req.address = AddressMapping.SenderSaturationResultAddr;
    return decodeUIntLE(await this.connection.send(req));
  }

  // #10538
  async SetSaturationValue(addr: number, bBroadcast: boolean, dht: number): Promise<void> {
    const $data = encodeUIntLE(dht, AddressMapping.SenderSaturationResultOccupancy);
    const req = new Request($data, bBroadcast, 'SetSaturationValue');
    req.destination = addr;
    req.address = AddressMapping.SenderSaturationResultAddr;
    await this.connection.send(req);
  }

  // #10549
  async ReadContrastValue(addr: number): Promise<number> {
    const req = new Request(AddressMapping.SenderContrastResultOccupancy, 'ReadContrastValue');
    req.destination = addr;
    req.address = AddressMapping.SenderContrastResultAddr;
    return decodeUIntLE(await this.connection.send(req));
  }

  // #10569
  async SetContrastValue(addr: number, bBroadcast: boolean, dht: number): Promise<void> {
    const $data = encodeUIntLE(dht, AddressMapping.SenderContrastResultOccupancy);
    const req = new Request($data, bBroadcast, 'SetContrastValue');
    req.destination = addr;
    req.address = AddressMapping.SenderContrastResultAddr;
    await this.connection.send(req);
  }

  // #10580
  async GetDeviceLevel(addr: number): Promise<number> {
    const req = new Request(AddressMapping.SenderContrastResultOccupancy, 'GetDeviceLevel');
    req.destination = addr;
    req.address = AddressMapping.SenderLevelAddr;
    return decodeUIntLE(await this.connection.send(req));
  }

  // #10589
  async ReadBlankingTime5253Value(
    addr: number,
    portAddr: number,
    scanBoardAddr: number
  ): Promise<number> {
    const req = new Request(AddressMapping.BlankingTime5253Occupancy, 'ReadBlankingTime5253Value');
    req.destination = addr;
    req.deviceType = 1;
    req.port = portAddr;
    req.rcvIndex = scanBoardAddr;
    req.address = AddressMapping.BlankingTime5253Addr;
    return decodeUIntLE(await this.connection.send(req));
  }

  // #10611
  async SetBlankingTime5253Value(
    addr: number,
    portAddr: number,
    scanBoardAddr: number,
    bBroadcast: boolean,
    BlankingTime5253Value: number[] | Buffer
  ): Promise<void> {
    if (BlankingTime5253Value.length !== AddressMapping.BlankingTime5253Occupancy)
      throw new TypeError(`Invalid buffer size: ${BlankingTime5253Value.length}`);
    const req = new Request(BlankingTime5253Value, bBroadcast, 'SetBlankingTime5253Value');
    req.destination = addr;
    req.deviceType = 1;
    req.port = portAddr;
    req.rcvIndex = scanBoardAddr;
    req.address = AddressMapping.BlankingTime5253Addr;
    await this.connection.send(req);
  }

  // #10620
  async ReadLowAshCompensationOne5253Value(
    addr: number,
    portAddr: number,
    scanBoardAddr: number
  ): Promise<number> {
    const req = new Request(
      AddressMapping.LowAshCompensationOne5253Occupancy,
      'ReadLowAshCompensationOne5253Value'
    );
    req.destination = addr;
    req.deviceType = 1;
    req.port = portAddr;
    req.rcvIndex = scanBoardAddr;
    req.address = AddressMapping.LowAshCompensationOne5253Addr;
    return decodeUIntLE(await this.connection.send(req));
  }

  // #10640
  async SetLowAshCompensationOne5253Value(
    addr: number,
    portAddr: number,
    scanBoardAddr: number,
    bBroadcast: boolean,
    LowAshCompensationOne5253Value: number
  ): Promise<void> {
    const req = new Request(
      [LowAshCompensationOne5253Value],
      bBroadcast,
      'SetLowAshCompensationOne5253Value'
    );
    req.destination = addr;
    req.deviceType = 1;
    req.port = portAddr;
    req.rcvIndex = scanBoardAddr;
    req.address = AddressMapping.LowAshCompensationOne5253Addr;
    await this.connection.send(req);
  }

  // #10651
  async ReadLowAshCompensationTwo5253Value(
    addr: number,
    portAddr: number,
    scanBoardAddr: number
  ): Promise<number> {
    const req = new Request(
      AddressMapping.LowAshCompensationTwo5253Occupancy,
      'ReadLowAshCompensationTwo5253Value'
    );
    req.destination = addr;
    req.deviceType = 1;
    req.port = portAddr;
    req.rcvIndex = scanBoardAddr;
    req.address = AddressMapping.LowAshCompensationTwo5253Addr;
    return decodeUIntLE(await this.connection.send(req));
  }

  // #10671
  async SetLowAshCompensationTwo5253Value(
    addr: number,
    portAddr: number,
    scanBoardAddr: number,
    bBroadcast: boolean,
    LowAshCompensationTwo5253Value: number
  ): Promise<void> {
    const req = new Request(
      [LowAshCompensationTwo5253Value],
      bBroadcast,
      'SetLowAshCompensationTwo5253Value'
    );
    req.destination = addr;
    req.deviceType = 1;
    req.port = portAddr;
    req.rcvIndex = scanBoardAddr;
    req.address = AddressMapping.LowAshCompensationTwo5253Addr;
    await this.connection.send(req);
  }

  // #10682
  async SetConfigRegisterWrite7(
    addr: number,
    portAddr: number,
    scanBoardAddr: number,
    bBroadcast: boolean,
    data: number[] | Buffer
  ): Promise<void> {
    if (data.length !== AddressMapping.WriteConfigRegisterOccupancy7)
      throw new TypeError(`Invalid buffer size: ${data.length}`);
    const req = new Request(data, bBroadcast, 'SetConfigRegisterWrite7');
    req.destination = addr;
    req.deviceType = 1;
    req.port = portAddr;
    req.rcvIndex = scanBoardAddr;
    req.address = AddressMapping.ConfigRegisterWriteAddr7;
    await this.connection.send(req);
  }

  // #10691
  async ReadDeltaTValue(addr: number, portAddr: number, scanBoardAddr: number): Promise<number> {
    const req = new Request(AddressMapping.DeltaTOccupancy, 'ReadDeltaTValue');
    req.destination = addr;
    req.deviceType = 1;
    req.port = portAddr;
    req.rcvIndex = scanBoardAddr;
    req.address = AddressMapping.DeltaTAddr;
    return decodeUIntLE(await this.connection.send(req));
  }

  // #10711
  async SetDeltaTValue(
    addr: number,
    portAddr: number,
    scanBoardAddr: number,
    bBroadcast: boolean,
    deltaT: number
  ): Promise<void> {
    const req = new Request([deltaT], bBroadcast, 'SetDeltaTValue');
    req.destination = addr;
    req.deviceType = 1;
    req.port = portAddr;
    req.rcvIndex = scanBoardAddr;
    req.address = AddressMapping.DeltaTAddr;
    await this.connection.send(req);
  }

  // #10722
  async ReadDHTValue(addr: number, portAddr: number, scanBoardAddr: number): Promise<number> {
    const req = new Request(AddressMapping.DHTOccupancy, 'ReadDHTValue');
    req.destination = addr;
    req.deviceType = 1;
    req.port = portAddr;
    req.rcvIndex = scanBoardAddr;
    req.address = AddressMapping.DHTAddr;
    return decodeUIntLE(await this.connection.send(req));
  }

  // #10742
  async SetDHTValue(
    addr: number,
    portAddr: number,
    scanBoardAddr: number,
    bBroadcast: boolean,
    dht: number
  ): Promise<void> {
    const req = new Request([dht], bBroadcast, 'SetDHTValue');
    req.destination = addr;
    req.deviceType = 1;
    req.port = portAddr;
    req.rcvIndex = scanBoardAddr;
    req.address = AddressMapping.DHTAddr;
    await this.connection.send(req);
  }

  // #10753
  async WriteSUM2033GammaSwitchState(
    addr: number,
    portAddr: number,
    scanBoardAddr: number,
    bBroadcast: boolean,
    mutiChipRamA: number[] | Buffer
  ): Promise<void> {
    if (mutiChipRamA.length !== 0)
      throw new TypeError(`Invalid buffer size: ${mutiChipRamA.length}`);
    const req = new Request(mutiChipRamA, bBroadcast, 'WriteSUM2033GammaSwitchState');
    req.destination = addr;
    req.deviceType = 1;
    req.port = portAddr;
    req.rcvIndex = scanBoardAddr;
    req.address = AddressMapping.SUM2033WriteGammaSwitchStateAddr;
    await this.connection.send(req);
  }

  // #10777
  async ReadSUM2033GammaSwitchState(
    addr: number,
    portAddr: number,
    scanBoardAddr: number,
    readLength: number
  ): Promise<Buffer> {
    const req = new Request(readLength, 'ReadSUM2033GammaSwitchState');
    req.destination = addr;
    req.deviceType = 1;
    req.port = portAddr;
    req.rcvIndex = scanBoardAddr;
    req.address = AddressMapping.SUM2033WriteGammaSwitchStateAddr;
    return (await this.connection.send(req)).data;
  }

  // #10786
  async SetMBI5252ChannelState(
    addr: number,
    portAddr: number,
    scanBoardAddr: number,
    bBroadcast: boolean,
    mutiChipRamA: number[] | Buffer
  ): Promise<void> {
    if (mutiChipRamA.length !== 0)
      throw new TypeError(`Invalid buffer size: ${mutiChipRamA.length}`);
    const req = new Request(mutiChipRamA, bBroadcast, 'SetMBI5252ChannelState');
    req.destination = addr;
    req.deviceType = 1;
    req.port = portAddr;
    req.rcvIndex = scanBoardAddr;
    req.address = AddressMapping.MBI5252SetChannelStateAddr;
    await this.connection.send(req);
  }

  // #10797
  async SetMBI5252AutoResetState(
    addr: number,
    portAddr: number,
    scanBoardAddr: number,
    bBroadcast: boolean,
    mutiChipRamA: number[] | Buffer
  ): Promise<void> {
    if (mutiChipRamA.length !== 0)
      throw new TypeError(`Invalid buffer size: ${mutiChipRamA.length}`);
    const req = new Request(mutiChipRamA, bBroadcast, 'SetMBI5252AutoResetState');
    req.destination = addr;
    req.deviceType = 1;
    req.port = portAddr;
    req.rcvIndex = scanBoardAddr;
    req.address = AddressMapping.MBI5252SetResetStateAddr;
    await this.connection.send(req);
  }

  // #10808
  async SetMBI5252ManualReset(
    addr: number,
    portAddr: number,
    scanBoardAddr: number,
    bBroadcast: boolean
  ): Promise<void> {
    const req = new Request([1], bBroadcast, 'SetMBI5252ManualReset');
    req.destination = addr;
    req.deviceType = 1;
    req.port = portAddr;
    req.rcvIndex = scanBoardAddr;
    req.address = AddressMapping.MBI5252SetManualResetAddr;
    await this.connection.send(req);
  }

  // #10819
  async SetMBI5252AutoReset(
    addr: number,
    portAddr: number,
    scanBoardAddr: number,
    bBroadcast: boolean,
    mutiChipRamA: number[] | Buffer
  ): Promise<void> {
    if (mutiChipRamA.length !== 0)
      throw new TypeError(`Invalid buffer size: ${mutiChipRamA.length}`);
    const req = new Request(mutiChipRamA, bBroadcast, 'SetMBI5252AutoReset');
    req.destination = addr;
    req.deviceType = 1;
    req.port = portAddr;
    req.rcvIndex = scanBoardAddr;
    req.address = AddressMapping.MBI5252SetAutoResetAddr;
    await this.connection.send(req);
  }

  // #10830
  async SetMBI5252AutoResetTime(
    addr: number,
    portAddr: number,
    scanBoardAddr: number,
    bBroadcast: boolean,
    mutiChipRamA: number[] | Buffer
  ): Promise<void> {
    if (mutiChipRamA.length !== 0)
      throw new TypeError(`Invalid buffer size: ${mutiChipRamA.length}`);
    const req = new Request(mutiChipRamA, bBroadcast, 'SetMBI5252AutoResetTime');
    req.destination = addr;
    req.deviceType = 1;
    req.port = portAddr;
    req.rcvIndex = scanBoardAddr;
    req.address = AddressMapping.MBI5252SetAutoResetTimeAddr;
    await this.connection.send(req);
  }

  // #10841
  async ReadMBI5252AutoResetTime(
    addr: number,
    portAddr: number,
    scanBoardAddr: number
  ): Promise<Buffer> {
    const req = new Request(
      AddressMapping.MBI5252SetAutoResetTimeOccupancy,
      'ReadMBI5252AutoResetTime'
    );
    req.destination = addr;
    req.deviceType = 1;
    req.port = portAddr;
    req.rcvIndex = scanBoardAddr;
    req.address = AddressMapping.MBI5252SetAutoResetTimeAddr;
    return (await this.connection.send(req)).data;
  }

  // #10863
  async ReadScannerMouldeState(
    addr: number,
    portAddr: number,
    scanBoardAddr: number,
    readLength: number
  ): Promise<Buffer> {
    const req = new Request(readLength, 'ReadScannerMouldeState');
    req.destination = addr;
    req.deviceType = 1;
    req.port = portAddr;
    req.rcvIndex = scanBoardAddr;
    req.address = AddressMapping.SUM6060ReadMouldeStateAddr;
    return (await this.connection.send(req)).data;
  }

  // #10885
  async WriteScannerMouldeState(
    addr: number,
    portAddr: number,
    scanBoardAddr: number,
    bBroadcast: boolean,
    mutiChipRamA: number[] | Buffer
  ): Promise<void> {
    if (mutiChipRamA.length !== 0)
      throw new TypeError(`Invalid buffer size: ${mutiChipRamA.length}`);
    const req = new Request(mutiChipRamA, bBroadcast, 'WriteScannerMouldeState');
    req.destination = addr;
    req.deviceType = 1;
    req.port = portAddr;
    req.rcvIndex = scanBoardAddr;
    req.address = AddressMapping.SUM6060WriteMouldeStateAddr;
    await this.connection.send(req);
  }

  // #10896
  async ReadScannerRT5958TinyAfterglow(
    addr: number,
    portAddr: number,
    scanBoardAddr: number,
    readLength: number
  ): Promise<Buffer> {
    const req = new Request(readLength, 'ReadScannerRT5958TinyAfterglow');
    req.destination = addr;
    req.deviceType = 1;
    req.port = portAddr;
    req.rcvIndex = scanBoardAddr;
    req.address = AddressMapping.ReadRT5958TinyAfterglowAddr;
    return (await this.connection.send(req)).data;
  }

  // #10918
  async WriteScannerRT5958TinyAfterglow(
    addr: number,
    portAddr: number,
    scanBoardAddr: number,
    bBroadcast: boolean,
    mutiChipRamA: number[] | Buffer
  ): Promise<void> {
    if (mutiChipRamA.length !== 0)
      throw new TypeError(`Invalid buffer size: ${mutiChipRamA.length}`);
    const req = new Request(mutiChipRamA, bBroadcast, 'WriteScannerRT5958TinyAfterglow');
    req.destination = addr;
    req.deviceType = 1;
    req.port = portAddr;
    req.rcvIndex = scanBoardAddr;
    req.address = AddressMapping.ReadRT5958TinyAfterglowAddr;
    await this.connection.send(req);
  }

  // #10929
  async ReadScannerRT5958TinyLineFeed(
    addr: number,
    portAddr: number,
    scanBoardAddr: number,
    readLength: number
  ): Promise<Buffer> {
    const req = new Request(readLength, 'ReadScannerRT5958TinyLineFeed');
    req.destination = addr;
    req.deviceType = 1;
    req.port = portAddr;
    req.rcvIndex = scanBoardAddr;
    req.address = AddressMapping.ReadRT5958TinyLineFeedAddr;
    return (await this.connection.send(req)).data;
  }

  // #10951
  async WriteScannerRT5958TinyLineFeed(
    addr: number,
    portAddr: number,
    scanBoardAddr: number,
    bBroadcast: boolean,
    mutiChipRamA: number[] | Buffer
  ): Promise<void> {
    if (mutiChipRamA.length !== 0)
      throw new TypeError(`Invalid buffer size: ${mutiChipRamA.length}`);
    const req = new Request(mutiChipRamA, bBroadcast, 'WriteScannerRT5958TinyLineFeed');
    req.destination = addr;
    req.deviceType = 1;
    req.port = portAddr;
    req.rcvIndex = scanBoardAddr;
    req.address = AddressMapping.ReadRT5958TinyLineFeedAddr;
    await this.connection.send(req);
  }

  // #10962
  async ReadScanCardModle(addr: number, portAddr: number, scanBoardAddr: number): Promise<number> {
    const req = new Request(AddressMapping.ScanCardModleOccupancy, 'ReadScanCardModle');
    req.destination = addr;
    req.deviceType = 1;
    req.port = portAddr;
    req.rcvIndex = scanBoardAddr;
    req.address = AddressMapping.ScanCardModleAddr;
    return decodeUIntLE(await this.connection.send(req));
  }

  // #10982
  async ReadA4ScanCardModle(
    addr: number,
    portAddr: number,
    scanBoardAddr: number
  ): Promise<number> {
    const req = new Request(AddressMapping.A4ScanCardModleOccupancy, 'ReadA4ScanCardModle');
    req.destination = addr;
    req.deviceType = 1;
    req.port = portAddr;
    req.rcvIndex = scanBoardAddr;
    req.address = AddressMapping.A4ScanCardModleAddr;
    return decodeUIntLE(await this.connection.send(req));
  }

  // #10991
  async ReadScanCardGoldenFPGAProgramVerion(
    addr: number,
    portAddr: number,
    scanBoardAddr: number
  ): Promise<number> {
    const req = new Request(
      AddressMapping.ScanCardGoldenFPGAProgramVerionOccupancy,
      'ReadScanCardGoldenFPGAProgramVerion'
    );
    req.destination = addr;
    req.deviceType = 1;
    req.port = portAddr;
    req.rcvIndex = scanBoardAddr;
    req.address = AddressMapping.ScanCardGoldenFPGAProgramVerionAddr;
    return decodeUIntLE(await this.connection.send(req));
  }

  // #11011
  async SetRealPhysicalGroup(
    addr: number,
    portAddr: number,
    scanBoardAddr: number,
    bBroadcast: boolean,
    realPhysical: number
  ): Promise<void> {
    const req = new Request([realPhysical], bBroadcast, 'SetRealPhysicalGroup');
    req.destination = addr;
    req.deviceType = 1;
    req.port = portAddr;
    req.rcvIndex = scanBoardAddr;
    req.address = AddressMapping.RealPhysicalGroupNumAddr;
    await this.connection.send(req);
  }

  // #11021
  async SetIrregularCabinetRealGroup(
    addr: number,
    portAddr: number,
    scanBoardAddr: number,
    bBroadcast: boolean,
    data: number[] | Buffer
  ): Promise<void> {
    const req = new Request(data, bBroadcast, 'SetIrregularCabinetRealGroup');
    req.destination = addr;
    req.deviceType = 1;
    req.port = portAddr;
    req.rcvIndex = scanBoardAddr;
    req.address = AddressMapping.IrRegular_RealPhysicalGroupsAddr;
    await this.connection.send(req);
  }

  // #11030
  async ReadIrregularCabinetRealGroup(
    addr: number,
    portAddr: number,
    scanBoardAddr: number,
    dataLength: number
  ): Promise<Buffer> {
    const req = new Request(dataLength, 'ReadIrregularCabinetRealGroup');
    req.destination = addr;
    req.deviceType = 1;
    req.port = portAddr;
    req.rcvIndex = scanBoardAddr;
    req.address = AddressMapping.IrRegular_RealPhysicalGroupsAddr;
    return (await this.connection.send(req)).data;
  }

  // #11039
  async SetIrregularCabinetDataGroupOutputInfo(
    addr: number,
    portAddr: number,
    scanBoardAddr: number,
    bBroadcast: boolean,
    data: number[] | Buffer
  ): Promise<void> {
    const req = new Request(data, bBroadcast, 'SetIrregularCabinetDataGroupOutputInfo');
    req.destination = addr;
    req.deviceType = 1;
    req.port = portAddr;
    req.rcvIndex = scanBoardAddr;
    req.address = AddressMapping.IrRegular_DataGroupOutputInfoAddr;
    await this.connection.send(req);
  }

  // #11048
  async ReadIrregularCabinetDataGroupOutputInfo(
    addr: number,
    portAddr: number,
    scanBoardAddr: number,
    dataLength: number
  ): Promise<Buffer> {
    const req = new Request(dataLength, 'ReadIrregularCabinetDataGroupOutputInfo');
    req.destination = addr;
    req.deviceType = 1;
    req.port = portAddr;
    req.rcvIndex = scanBoardAddr;
    req.address = AddressMapping.IrRegular_DataGroupOutputInfoAddr;
    return (await this.connection.send(req)).data;
  }

  // #11057
  async SetCabinetData64GroupOutputInfo(
    addr: number,
    portAddr: number,
    scanBoardAddr: number,
    bBroadcast: boolean,
    data: number[] | Buffer
  ): Promise<void> {
    const req = new Request(data, bBroadcast, 'SetCabinetData64GroupOutputInfo');
    req.destination = addr;
    req.deviceType = 1;
    req.port = portAddr;
    req.rcvIndex = scanBoardAddr;
    req.address = AddressMapping.Data64GroupOutputInfoAddr;
    await this.connection.send(req);
  }

  // #11066
  async SetRemoveChipChannelData(
    addr: number,
    portAddr: number,
    scanBoardAddr: number,
    bBroadcast: boolean,
    data: number[] | Buffer
  ): Promise<void> {
    const req = new Request(data, bBroadcast, 'SetRemoveChipChannelData');
    req.destination = addr;
    req.deviceType = 1;
    req.port = portAddr;
    req.rcvIndex = scanBoardAddr;
    req.address = AddressMapping.Module_RemoveChipChannelAddr;
    await this.connection.send(req);
  }

  // #11075
  async ReadRemoveChipChannelData(
    addr: number,
    portAddr: number,
    scanBoardAddr: number,
    dataLength: number
  ): Promise<Buffer> {
    const req = new Request(dataLength, 'ReadRemoveChipChannelData');
    req.destination = addr;
    req.deviceType = 1;
    req.port = portAddr;
    req.rcvIndex = scanBoardAddr;
    req.address = AddressMapping.Module_RemoveChipChannelAddr;
    return (await this.connection.send(req)).data;
  }

  // #11084
  async SetScannerDehumidPara(
    addr: number,
    portAddr: number,
    scanBoardAddr: number,
    bBroadcast: boolean,
    data: number[] | Buffer
  ): Promise<void> {
    if (data.length !== AddressMapping.DehumidParaAddrOccupancy)
      throw new TypeError(`Invalid buffer size: ${data.length}`);
    const req = new Request(data, bBroadcast, 'SetScannerDehumidPara');
    req.destination = addr;
    req.deviceType = 1;
    req.port = portAddr;
    req.rcvIndex = scanBoardAddr;
    req.address = AddressMapping.DehumidParaAddr;
    await this.connection.send(req);
  }

  // #11093
  async ReadScannerDehumidPara(
    addr: number,
    portAddr: number,
    scanBoardAddr: number
  ): Promise<number> {
    const req = new Request(AddressMapping.DehumidParaAddrOccupancy, 'ReadScannerDehumidPara');
    req.destination = addr;
    req.deviceType = 1;
    req.port = portAddr;
    req.rcvIndex = scanBoardAddr;
    req.address = AddressMapping.DehumidParaAddr;
    return decodeUIntLE(await this.connection.send(req));
  }

  // #11102
  async SetDehumidAdjustTime(
    addr: number,
    portAddr: number,
    scanBoardAddr: number,
    bBroadcast: boolean,
    data: number[] | Buffer
  ): Promise<void> {
    if (data.length !== AddressMapping.DehumidAdjustTimeOccupancy)
      throw new TypeError(`Invalid buffer size: ${data.length}`);
    const req = new Request(data, bBroadcast, 'SetDehumidAdjustTime');
    req.destination = addr;
    req.deviceType = 1;
    req.port = portAddr;
    req.rcvIndex = scanBoardAddr;
    req.address = AddressMapping.DehumidAdjustTimeAddr;
    await this.connection.send(req);
  }

  // #11111
  async ReadDehumidAdjustTime(
    addr: number,
    portAddr: number,
    scanBoardAddr: number
  ): Promise<number> {
    const req = new Request(AddressMapping.DehumidAdjustTimeOccupancy, 'ReadDehumidAdjustTime');
    req.destination = addr;
    req.deviceType = 1;
    req.port = portAddr;
    req.rcvIndex = scanBoardAddr;
    req.address = AddressMapping.DehumidAdjustTimeAddr;
    return decodeUIntLE(await this.connection.send(req));
  }

  // #11120
  async SetScreenEncrypt(
    addr: number,
    portAddr: number,
    scanBoardAddr: number,
    bBroadcast: boolean,
    screenEncrypt: number
  ): Promise<void> {
    const $data = encodeUIntLE(screenEncrypt, AddressMapping.ScreenEncryptOccupancy);
    const req = new Request($data, bBroadcast, 'SetScreenEncrypt');
    req.destination = addr;
    req.deviceType = 1;
    req.port = portAddr;
    req.rcvIndex = scanBoardAddr;
    req.address = AddressMapping.ScreenEncryptAddr;
    await this.connection.send(req);
  }

  // #11130
  async SetScreenDecrypt(
    addr: number,
    portAddr: number,
    scanBoardAddr: number,
    bBroadcast: boolean,
    screenDecrypt: number
  ): Promise<void> {
    const $data = encodeUIntLE(screenDecrypt, AddressMapping.ScreenDecryptOccupancy);
    const req = new Request($data, bBroadcast, 'SetScreenDecrypt');
    req.destination = addr;
    req.deviceType = 1;
    req.port = portAddr;
    req.rcvIndex = scanBoardAddr;
    req.address = AddressMapping.ScreenDecryptAddr;
    await this.connection.send(req);
  }

  // #11140
  async SetCoefficientStore2SpiFlash(
    addr: number,
    portAddr: number,
    scanBoardAddr: number,
    bBroadcast: boolean,
    coefficientStore2SpiFlash: number
  ): Promise<void> {
    const $data = encodeUIntLE(
      coefficientStore2SpiFlash,
      AddressMapping.CoefficientStore2SpiFlashOccupancy
    );
    const req = new Request($data, bBroadcast, 'SetCoefficientStore2SpiFlash');
    req.destination = addr;
    req.deviceType = 1;
    req.port = portAddr;
    req.rcvIndex = scanBoardAddr;
    req.address = AddressMapping.CoefficientStore2SpiFlashAddr;
    await this.connection.send(req);
  }

  // #11151
  async SaveBrightDarkLineFixCoefsToFlash(
    addr: number,
    portAddr: number,
    scanBoardAddr: number,
    bBroadcast: boolean,
    coefficientStore2SpiFlash: number
  ): Promise<void> {
    const $data = encodeUIntLE(
      coefficientStore2SpiFlash,
      AddressMapping.CoefficientStore2SpiFlashOccupancy
    );
    const req = new Request($data, bBroadcast, 'SaveBrightDarkLineFixCoefsToFlash');
    req.destination = addr;
    req.deviceType = 1;
    req.port = portAddr;
    req.rcvIndex = scanBoardAddr;
    req.address = AddressMapping.CoefficientStore2SpiFlashAddr;
    await this.connection.send(req);
  }

  // #11162
  async RecoveryCoefficientStore2SpiFlash(
    addr: number,
    portAddr: number,
    scanBoardAddr: number,
    bBroadcast: boolean,
    coefficientStore2SpiFlash: number
  ): Promise<void> {
    const $data = encodeUIntLE(
      coefficientStore2SpiFlash,
      AddressMapping.CoefficientStore2SpiFlashOccupancy
    );
    const req = new Request($data, bBroadcast, 'RecoveryCoefficientStore2SpiFlash');
    req.destination = addr;
    req.deviceType = 1;
    req.port = portAddr;
    req.rcvIndex = scanBoardAddr;
    req.address = AddressMapping.RecoveryCoefficientStore2SpiFlashAddr;
    await this.connection.send(req);
  }

  // #11173
  async SetCoefficientStore2IIcFlash(
    addr: number,
    portAddr: number,
    scanBoardAddr: number,
    bBroadcast: boolean,
    coefficientStore2IIcFlash: number
  ): Promise<void> {
    const $data = encodeUIntLE(
      coefficientStore2IIcFlash,
      AddressMapping.CoefficientStore2IIcFlashOccupancy
    );
    const req = new Request($data, bBroadcast, 'SetCoefficientStore2IIcFlash');
    req.destination = addr;
    req.deviceType = 1;
    req.port = portAddr;
    req.rcvIndex = scanBoardAddr;
    req.address = AddressMapping.CoefficientStore2IIcFlashAddr;
    await this.connection.send(req);
  }

  // #11184
  async SetCoefficientReloadFromSpiFlash(
    addr: number,
    portAddr: number,
    scanBoardAddr: number,
    bBroadcast: boolean,
    coefficientReloadFromSpiFlash: number
  ): Promise<void> {
    const $data = encodeUIntLE(
      coefficientReloadFromSpiFlash,
      AddressMapping.CoefficientReloadFromSpiFlashOccupancy
    );
    const req = new Request($data, bBroadcast, 'SetCoefficientReloadFromSpiFlash');
    req.destination = addr;
    req.deviceType = 1;
    req.port = portAddr;
    req.rcvIndex = scanBoardAddr;
    req.address = AddressMapping.CoefficientReloadFromSpiFlashAddr;
    await this.connection.send(req);
  }

  // #11195
  async SetCheckModuleFlashCmd(
    addr: number,
    portAddr: number,
    scanBoardAddr: number,
    bBroadcast: boolean,
    checkModuleFlashCmd: number
  ): Promise<void> {
    const $data = encodeUIntLE(checkModuleFlashCmd, AddressMapping.CheckModuleFlashCmdOccupancy);
    const req = new Request($data, bBroadcast, 'SetCheckModuleFlashCmd');
    req.destination = addr;
    req.deviceType = 1;
    req.port = portAddr;
    req.rcvIndex = scanBoardAddr;
    req.address = AddressMapping.CheckModuleFlashCmdAddr;
    await this.connection.send(req);
  }

  // #11206
  async ReadCheckModuleFlashResult(
    addr: number,
    portAddr: number,
    scanBoardAddr: number
  ): Promise<Buffer> {
    const req = new Request(
      AddressMapping.CheckModuleFlashResultOccupancy,
      'ReadCheckModuleFlashResult'
    );
    req.destination = addr;
    req.deviceType = 1;
    req.port = portAddr;
    req.rcvIndex = scanBoardAddr;
    req.address = AddressMapping.CheckModuleFlashResultAddr;
    return (await this.connection.send(req)).data;
  }

  // #11215
  async ReadCheckModuleFlashResult_1(
    addr: number,
    portAddr: number,
    scanBoardAddr: number,
    readDataLength: number
  ): Promise<Buffer> {
    const req = new Request(readDataLength, 'ReadCheckModuleFlashResult_1');
    req.destination = addr;
    req.deviceType = 1;
    req.port = portAddr;
    req.rcvIndex = scanBoardAddr;
    req.address = AddressMapping.CheckModuleFlashResultAddr + 16;
    return (await this.connection.send(req)).data;
  }

  SetCheckModuleFlashResult = (): void => {
    throw new TypeError('Not implemented');
  };

  // #11296
  async SetUpdateCorrectionCoefficientCmd(
    addr: number,
    portAddr: number,
    scanBoardAddr: number,
    bBroadcast: boolean,
    valueFlag: number
  ): Promise<void> {
    const $data = encodeUIntLE(valueFlag, AddressMapping.UpdateCorrectionCoefficientCmdOccupancy);
    const req = new Request($data, bBroadcast, 'SetUpdateCorrectionCoefficientCmd');
    req.destination = addr;
    req.deviceType = 1;
    req.port = portAddr;
    req.rcvIndex = scanBoardAddr;
    req.address = AddressMapping.UpdateCorrectionCoefficientCmdAddr;
    await this.connection.send(req);
  }

  // #11306
  async GetScanerFunctionTable(Sender: number, portAddr: number, Scan: number): Promise<Buffer> {
    const req = new Request(AddressMapping.ScannerFunctionTableOccupancy, 'GetScanerFunctionTable');
    req.destination = Sender;
    req.deviceType = 1;
    req.port = portAddr;
    req.rcvIndex = Scan;
    req.address = AddressMapping.ScannerFunctionTableAddr;
    return (await this.connection.send(req)).data;
  }

  // #11315
  async GetGrayCoefficientEN(Sender: number, portAddr: number, Scan: number): Promise<number> {
    const req = new Request(AddressMapping.GrayCoefficientENAddrOccupancy, 'GetGrayCoefficientEN');
    req.destination = Sender;
    req.deviceType = 1;
    req.port = portAddr;
    req.rcvIndex = Scan;
    req.address = AddressMapping.GrayCoefficientENAddr;
    return decodeUIntLE(await this.connection.send(req));
  }

  // #11324
  async SetGrayCoefficientEN(
    Sender: number,
    portAddr: number,
    scanBoardAddr: number,
    bBroadcast: boolean,
    data: number
  ): Promise<void> {
    const req = new Request([data], bBroadcast, 'SetGrayCoefficientEN');
    req.destination = Sender;
    req.deviceType = 1;
    req.port = portAddr;
    req.rcvIndex = scanBoardAddr;
    req.address = AddressMapping.GrayCoefficientENAddr;
    await this.connection.send(req);
  }

  // #11333
  async SetMaskOpreation(
    Sender: number,
    portAddr: number,
    scanBoardAddr: number,
    bBroadcast: boolean,
    data: number[] | Buffer
  ): Promise<void> {
    const req = new Request(data, bBroadcast, 'SetMaskOpreation');
    req.destination = Sender;
    req.deviceType = 1;
    req.port = portAddr;
    req.rcvIndex = scanBoardAddr;
    req.address = AddressMapping.MaskAddr;
    await this.connection.send(req);
  }

  // #11342
  async GetScannerSpiSpeedAdjust(Sender: number, portAddr: number, Scan: number): Promise<number> {
    const req = new Request(
      AddressMapping.ScannerSpiSpeedAdjustOccupancy,
      'GetScannerSpiSpeedAdjust'
    );
    req.destination = Sender;
    req.deviceType = 1;
    req.port = portAddr;
    req.rcvIndex = Scan;
    req.address = AddressMapping.ScannerSpiSpeedAdjustAddr;
    return decodeUIntLE(await this.connection.send(req));
  }

  // #11351
  async SetScannerSpiSpeedAdjust(
    Sender: number,
    portAddr: number,
    scanBoardAddr: number,
    bBroadcast: boolean,
    speed: number[] | Buffer
  ): Promise<void> {
    if (speed.length !== AddressMapping.ScannerSpiSpeedAdjustOccupancy)
      throw new TypeError(`Invalid buffer size: ${speed.length}`);
    const req = new Request(speed, bBroadcast, 'SetScannerSpiSpeedAdjust');
    req.destination = Sender;
    req.deviceType = 1;
    req.port = portAddr;
    req.rcvIndex = scanBoardAddr;
    req.address = AddressMapping.ScannerSpiSpeedAdjustAddr;
    await this.connection.send(req);
  }

  // #11360
  async SetSoftwareCoefficientAccelerateFlag(
    Sender: number,
    portAddr: number,
    scanBoardAddr: number,
    bBroadcast: boolean,
    Is3x3: boolean
  ): Promise<void> {
    const req = new Request(Is3x3 ? [2] : [0], bBroadcast, 'SetSoftwareCoefficientAccelerateFlag');
    req.destination = Sender;
    req.deviceType = 1;
    req.port = portAddr;
    req.rcvIndex = scanBoardAddr;
    req.address = AddressMapping.SoftwareCoefficientAccelerateFlag;
    await this.connection.send(req);
  }

  // #11378
  async ModuleOperCmd(
    addr: number,
    portAddr: number,
    scanBoardAddr: number,
    bBroadcast: boolean,
    data: number[] | Buffer
  ): Promise<void> {
    if (data.length !== AddressMapping.ModuleOperCmdOccupancy)
      throw new TypeError(`Invalid buffer size: ${data.length}`);
    const req = new Request(data, bBroadcast, 'ModuleOperCmd');
    req.destination = addr;
    req.deviceType = 1;
    req.port = portAddr;
    req.rcvIndex = scanBoardAddr;
    req.address = AddressMapping.ModuleOperCmdAddr;
    await this.connection.send(req);
  }

  // #11387
  async ReadLightPlankFlashTopology(
    addr: number,
    portAddr: number,
    scanBoardAddr: number
  ): Promise<Buffer> {
    const req = new Request(
      AddressMapping.LightPlankFlashTopologyOccupancy,
      'ReadLightPlankFlashTopology'
    );
    req.destination = addr;
    req.deviceType = 1;
    req.port = portAddr;
    req.rcvIndex = scanBoardAddr;
    req.address = AddressMapping.LightPlankFlashTopologyAddr;
    return (await this.connection.send(req)).data;
  }

  // #11407
  async SetLightPlankFlashTopology(
    addr: number,
    portAddr: number,
    scanBoardAddr: number,
    bBroadcast: boolean,
    LightPlankFlashTopologyBytes: number[] | Buffer
  ): Promise<void> {
    const req = new Request(LightPlankFlashTopologyBytes, bBroadcast, 'SetLightPlankFlashTopology');
    req.destination = addr;
    req.deviceType = 1;
    req.port = portAddr;
    req.rcvIndex = scanBoardAddr;
    req.address = AddressMapping.LightPlankFlashTopologyAddr;
    await this.connection.send(req);
  }

  // #11416
  async ReadLightPlankFlashTopology1(
    addr: number,
    portAddr: number,
    scanBoardAddr: number
  ): Promise<Buffer> {
    const req = new Request(
      AddressMapping.LightPlankFlashTopologyOccupancy1,
      'ReadLightPlankFlashTopology1'
    );
    req.destination = addr;
    req.deviceType = 1;
    req.port = portAddr;
    req.rcvIndex = scanBoardAddr;
    req.address = AddressMapping.LightPlankFlashTopologyAddr1;
    return (await this.connection.send(req)).data;
  }

  // #11425
  async SetLightPlankFlashTopology1(
    addr: number,
    portAddr: number,
    scanBoardAddr: number,
    bBroadcast: boolean,
    LightPlankFlashTopologyBytes: number[] | Buffer
  ): Promise<void> {
    const req = new Request(
      LightPlankFlashTopologyBytes,
      bBroadcast,
      'SetLightPlankFlashTopology1'
    );
    req.destination = addr;
    req.deviceType = 1;
    req.port = portAddr;
    req.rcvIndex = scanBoardAddr;
    req.address = AddressMapping.LightPlankFlashTopologyAddr1;
    await this.connection.send(req);
  }

  // #11434
  async SetCoefficientReloadFromIIcFlash(
    addr: number,
    portAddr: number,
    scanBoardAddr: number,
    bBroadcast: boolean,
    coefficientReloadFromIIcFlash: number
  ): Promise<void> {
    const $data = encodeUIntLE(
      coefficientReloadFromIIcFlash,
      AddressMapping.CoefficientReloadFromIIcFlashOccupancy
    );
    const req = new Request($data, bBroadcast, 'SetCoefficientReloadFromIIcFlash');
    req.destination = addr;
    req.deviceType = 1;
    req.port = portAddr;
    req.rcvIndex = scanBoardAddr;
    req.address = AddressMapping.CoefficientReloadFromIIcFlashAddr;
    await this.connection.send(req);
  }

  // #11445
  async SetCoefficientInSpiFlashErase(
    addr: number,
    portAddr: number,
    scanBoardAddr: number,
    bBroadcast: boolean,
    coefficientInSpiFlashErase: number
  ): Promise<void> {
    const $data = encodeUIntLE(
      coefficientInSpiFlashErase,
      AddressMapping.CoefficientInSpiFlashEraseOccupancy
    );
    const req = new Request($data, bBroadcast, 'SetCoefficientInSpiFlashErase');
    req.destination = addr;
    req.deviceType = 1;
    req.port = portAddr;
    req.rcvIndex = scanBoardAddr;
    req.address = AddressMapping.CoefficientInSpiFlashEraseAddr;
    await this.connection.send(req);
  }

  // #11456
  async SetBrightDarkLineCoefsErase(
    addr: number,
    portAddr: number,
    scanBoardAddr: number,
    bBroadcast: boolean,
    coefficientErase: number
  ): Promise<void> {
    const $data = encodeUIntLE(
      coefficientErase,
      AddressMapping.BrightDarkLineCoefsInSpiFlashEraseOccupancy
    );
    const req = new Request($data, bBroadcast, 'SetBrightDarkLineCoefsErase');
    req.destination = addr;
    req.deviceType = 1;
    req.port = portAddr;
    req.rcvIndex = scanBoardAddr;
    req.address = AddressMapping.BrightDarkLineCoefsInSpiFlashEraseAddr;
    await this.connection.send(req);
  }

  // #11467
  async ReadBrightDarkLineFixState(
    addr: number,
    portAddr: number,
    scanBoardAddr: number
  ): Promise<number> {
    const req = new Request(
      AddressMapping.BrightDarkLineFixStateOccupancy,
      'ReadBrightDarkLineFixState'
    );
    req.destination = addr;
    req.deviceType = 1;
    req.port = portAddr;
    req.rcvIndex = scanBoardAddr;
    req.address = AddressMapping.BrightDarkLineFixStateAddr;
    return decodeUIntLE(await this.connection.send(req));
  }

  // #11476
  async ReadCorrectionState(
    addr: number,
    portAddr: number,
    scanBoardAddr: number
  ): Promise<number> {
    const req = new Request(AddressMapping.BrightDarkLineFixStateOccupancy, 'ReadCorrectionState');
    req.destination = addr;
    req.deviceType = 1;
    req.port = portAddr;
    req.rcvIndex = scanBoardAddr;
    req.address = AddressMapping.CorrectionOnAddr;
    return decodeUIntLE(await this.connection.send(req));
  }

  // #11485
  async SetLowlumCoefficientErase(
    addr: number,
    portAddr: number,
    scanBoardAddr: number,
    bBroadcast: boolean,
    coefficientErase: number[] | Buffer
  ): Promise<void> {
    const req = new Request(coefficientErase, bBroadcast, 'SetLowlumCoefficientErase');
    req.destination = addr;
    req.deviceType = 1;
    req.port = portAddr;
    req.rcvIndex = scanBoardAddr;
    req.address = AddressMapping.CoefficientInIIcFlashEraseAddr;
    await this.connection.send(req);
  }

  // #11494
  async SetCoefficientInIIcFlashErase(
    addr: number,
    portAddr: number,
    scanBoardAddr: number,
    bBroadcast: boolean,
    coefficientInIIcFlashErase: number
  ): Promise<void> {
    const $data = encodeUIntLE(
      coefficientInIIcFlashErase,
      AddressMapping.CoefficientInIIcFlashEraseOccupancy
    );
    const req = new Request($data, bBroadcast, 'SetCoefficientInIIcFlashErase');
    req.destination = addr;
    req.deviceType = 1;
    req.port = portAddr;
    req.rcvIndex = scanBoardAddr;
    req.address = AddressMapping.CoefficientInIIcFlashEraseAddr;
    await this.connection.send(req);
  }

  // #11505
  async SetRebootGoldenFPGAProgram(
    addr: number,
    portAddr: number,
    scanBoardAddr: number,
    bBroadcast: boolean,
    rebootGoldenFPGAProgram: number
  ): Promise<void> {
    const $data = encodeUIntLE(
      rebootGoldenFPGAProgram,
      AddressMapping.RebootGoldenFPGAProgramOccupancy
    );
    const req = new Request($data, bBroadcast, 'SetRebootGoldenFPGAProgram');
    req.destination = addr;
    req.deviceType = 1;
    req.port = portAddr;
    req.rcvIndex = scanBoardAddr;
    req.address = AddressMapping.RebootGoldenFPGAProgramAddr;
    await this.connection.send(req);
  }

  // #11516
  async SetRebootWorkFPGAProgram(
    addr: number,
    portAddr: number,
    scanBoardAddr: number,
    bBroadcast: boolean,
    rebootWorkFPGAProgram: number
  ): Promise<void> {
    const $data = encodeUIntLE(
      rebootWorkFPGAProgram,
      AddressMapping.RebootWorkFPGAProgramOccupancy
    );
    const req = new Request($data, bBroadcast, 'SetRebootWorkFPGAProgram');
    req.destination = addr;
    req.deviceType = 1;
    req.port = portAddr;
    req.rcvIndex = scanBoardAddr;
    req.address = AddressMapping.RebootWorkFPGAProgramAddr;
    await this.connection.send(req);
  }

  // #11527
  async SetFPGAWorkProgramStore(
    addr: number,
    portAddr: number,
    scanBoardAddr: number,
    bBroadcast: boolean,
    FPGAWorkProgramStore: number
  ): Promise<void> {
    const $data = encodeUIntLE(FPGAWorkProgramStore, AddressMapping.FPGAWorkProgramStoreOccupancy);
    const req = new Request($data, bBroadcast, 'SetFPGAWorkProgramStore');
    req.destination = addr;
    req.deviceType = 1;
    req.port = portAddr;
    req.rcvIndex = scanBoardAddr;
    req.address = AddressMapping.FPGAWorkProgramStoreAddr;
    await this.connection.send(req);
  }

  // #11538
  async SetRebootWorkMCUProgram(
    addr: number,
    portAddr: number,
    scanBoardAddr: number,
    bBroadcast: boolean,
    rebootWorkMCUProgram: number
  ): Promise<void> {
    const $data = encodeUIntLE(rebootWorkMCUProgram, AddressMapping.RebootWorkMCUProgramOccupancy);
    const req = new Request($data, bBroadcast, 'SetRebootWorkMCUProgram');
    req.destination = addr;
    req.deviceType = 1;
    req.port = portAddr;
    req.rcvIndex = scanBoardAddr;
    req.address = AddressMapping.RebootWorkMCUProgramAddr;
    await this.connection.send(req);
  }

  // #11549
  async SetMCUWorkProgramStore(
    addr: number,
    portAddr: number,
    scanBoardAddr: number,
    bBroadcast: boolean,
    MCUWorkProgramStore: number
  ): Promise<void> {
    const $data = encodeUIntLE(MCUWorkProgramStore, AddressMapping.MCUWorkProgramStoreOccupancy);
    const req = new Request($data, bBroadcast, 'SetMCUWorkProgramStore');
    req.destination = addr;
    req.deviceType = 1;
    req.port = portAddr;
    req.rcvIndex = scanBoardAddr;
    req.address = AddressMapping.MCUWorkProgramStoreAddr;
    await this.connection.send(req);
  }

  // #11560
  async SetFPGAGoldenProgramStore(
    addr: number,
    portAddr: number,
    scanBoardAddr: number,
    bBroadcast: boolean,
    FPGAGoldenProgramStore: number
  ): Promise<void> {
    const $data = encodeUIntLE(
      FPGAGoldenProgramStore,
      AddressMapping.FPGAGoldenProgramStoreOccupancy
    );
    const req = new Request($data, bBroadcast, 'SetFPGAGoldenProgramStore');
    req.destination = addr;
    req.deviceType = 1;
    req.port = portAddr;
    req.rcvIndex = scanBoardAddr;
    req.address = AddressMapping.FPGAGoldenProgramStoreAddr;
    await this.connection.send(req);
  }

  // #11571
  async SetParameterReloadFromSpiFlash(
    addr: number,
    portAddr: number,
    scanBoardAddr: number,
    bBroadcast: boolean,
    parameterReloadFromSpiFlash: number
  ): Promise<void> {
    const $data = encodeUIntLE(
      parameterReloadFromSpiFlash,
      AddressMapping.ParameterReloadFromSpiFlashOccupancy
    );
    const req = new Request($data, bBroadcast, 'SetParameterReloadFromSpiFlash');
    req.destination = addr;
    req.deviceType = 1;
    req.port = portAddr;
    req.rcvIndex = scanBoardAddr;
    req.address = AddressMapping.ParameterReloadFromSpiFlashAddr;
    await this.connection.send(req);
  }

  // #11582
  async SetParameterStore2SpiFlash(
    addr: number,
    portAddr: number,
    scanBoardAddr: number,
    bBroadcast: boolean,
    parameterStore2SpiFlash: number
  ): Promise<void> {
    const $data = encodeUIntLE(
      parameterStore2SpiFlash,
      AddressMapping.ParameterStore2SpiFlashOccupancy
    );
    const req = new Request($data, bBroadcast, 'SetParameterStore2SpiFlash');
    req.destination = addr;
    req.deviceType = 1;
    req.port = portAddr;
    req.rcvIndex = scanBoardAddr;
    req.address = AddressMapping.ParameterStore2SpiFlashAddr;
    await this.connection.send(req);
  }

  // #11593
  async SetParameterSender3D(
    addr: number,
    portAddr: number,
    scanBoardAddr: number,
    bBroadcast: boolean,
    parameterSender3D: number
  ): Promise<void> {
    const $data = encodeUIntLE(parameterSender3D, AddressMapping.ParameterStore2SpiFlashOccupancy);
    const req = new Request($data, bBroadcast, 'SetParameterSender3D');
    req.destination = addr;
    req.deviceType = 4;
    req.port = portAddr;
    req.rcvIndex = scanBoardAddr;
    req.address = AddressMapping.ParameterStore2SpiFlashAddr;
    await this.connection.send(req);
  }

  // #11604
  async SetParameterCorrectCoefficientComponent(
    addr: number,
    portAddr: number,
    scanBoardAddr: number,
    bBroadcast: boolean,
    parameterChromaOrBrightness: number
  ): Promise<void> {
    const $data = encodeUIntLE(
      parameterChromaOrBrightness,
      AddressMapping.CorrectCoefficientComponentOccupancy
    );
    const req = new Request($data, bBroadcast, 'SetParameterCorrectCoefficientComponent');
    req.destination = addr;
    req.deviceType = 1;
    req.port = portAddr;
    req.rcvIndex = scanBoardAddr;
    req.address = AddressMapping.CorrectCoefficientComponent;
    await this.connection.send(req);
  }

  // #11615
  async SetRecaculateParameter(
    addr: number,
    portAddr: number,
    scanBoardAddr: number,
    bBroadcast: boolean,
    recaculateParameter: number
  ): Promise<void> {
    const $data = encodeUIntLE(recaculateParameter, AddressMapping.RecaculateParameterOccupancy);
    const req = new Request($data, bBroadcast, 'SetRecaculateParameter');
    req.destination = addr;
    req.deviceType = 1;
    req.port = portAddr;
    req.rcvIndex = scanBoardAddr;
    req.address = AddressMapping.RecaculateParameterAddr;
    await this.connection.send(req);
  }

  // #11625
  async SetGenLinearScanBoardRunLineTable(
    addr: number,
    portAddr: number,
    scanBoardAddr: number,
    bBroadcast: boolean,
    genLinearTable: number
  ): Promise<void> {
    const $data = encodeUIntLE(
      genLinearTable,
      AddressMapping.GenLinearScanBoardRunLineTableOccupancy
    );
    const req = new Request($data, bBroadcast, 'SetGenLinearScanBoardRunLineTable');
    req.destination = addr;
    req.deviceType = 1;
    req.port = portAddr;
    req.rcvIndex = scanBoardAddr;
    req.address = AddressMapping.GenLinearScanBoardRunLineTableAddr;
    await this.connection.send(req);
  }

  // #11635
  async SetCoefficienceFromDvi(
    addr: number,
    portAddr: number,
    scanBoardAddr: number,
    bBroadcast: boolean,
    coefficienceFromDvi: number
  ): Promise<void> {
    const $data = encodeUIntLE(
      coefficienceFromDvi,
      AddressMapping.WriteCoefficienceFromDviOccupancy
    );
    const req = new Request($data, bBroadcast, 'SetCoefficienceFromDvi');
    req.destination = addr;
    req.deviceType = 1;
    req.port = portAddr;
    req.rcvIndex = scanBoardAddr;
    req.address = AddressMapping.WriteCoefficienceFromDviAddr;
    await this.connection.send(req);
  }

  // #11645
  async SetCoefficienceFromDviCommon(
    addr: number,
    portAddr: number,
    scanBoardAddr: number,
    bBroadcast: boolean
  ): Promise<void> {
    const req = new Request([1], bBroadcast, 'SetCoefficienceFromDviCommon');
    req.destination = addr;
    req.deviceType = 1;
    req.port = portAddr;
    req.rcvIndex = scanBoardAddr;
    req.address = AddressMapping.WriteCommonCoefficienceFromDviAddr;
    await this.connection.send(req);
  }

  // #11655
  async SaveCoefficienceCommon(
    addr: number,
    portAddr: number,
    scanBoardAddr: number,
    bBroadcast: boolean,
    val: number
  ): Promise<void> {
    const req = new Request([val], bBroadcast, 'SaveCoefficienceCommon');
    req.destination = addr;
    req.deviceType = 1;
    req.port = portAddr;
    req.rcvIndex = scanBoardAddr;
    req.address = AddressMapping.SaveCommonCoefficienceAddr;
    await this.connection.send(req);
  }

  // #11665
  async SetStoreStartingLogoImage(
    addr: number,
    portAddr: number,
    scanBoardAddr: number,
    bBroadcast: boolean,
    storeStartingLogoImage: number
  ): Promise<void> {
    const $data = encodeUIntLE(
      storeStartingLogoImage,
      AddressMapping.StoreStartingLogoImageOccupancy
    );
    const req = new Request($data, bBroadcast, 'SetStoreStartingLogoImage');
    req.destination = addr;
    req.deviceType = 1;
    req.port = portAddr;
    req.rcvIndex = scanBoardAddr;
    req.address = AddressMapping.StoreStartingLogoImageAddr;
    await this.connection.send(req);
  }

  // #11675
  async SetStoreNoSignalLogoImage(
    addr: number,
    portAddr: number,
    scanBoardAddr: number,
    bBroadcast: boolean,
    storeNoSignalLogoImage: number
  ): Promise<void> {
    const $data = encodeUIntLE(
      storeNoSignalLogoImage,
      AddressMapping.StoreNoSignalLogoImageOccupancy
    );
    const req = new Request($data, bBroadcast, 'SetStoreNoSignalLogoImage');
    req.destination = addr;
    req.deviceType = 1;
    req.port = portAddr;
    req.rcvIndex = scanBoardAddr;
    req.address = AddressMapping.StoreNoSignalLogoImageAddr;
    await this.connection.send(req);
  }

  // #11685
  async SetStartLedCheck(
    addr: number,
    portAddr: number,
    scanBoardAddr: number,
    bBroadcast: boolean,
    startLedCheck: number
  ): Promise<void> {
    const $data = encodeUIntLE(startLedCheck, AddressMapping.StartLedCheckOccupancy);
    const req = new Request($data, bBroadcast, 'SetStartLedCheck');
    req.destination = addr;
    req.deviceType = 1;
    req.port = portAddr;
    req.rcvIndex = scanBoardAddr;
    req.address = AddressMapping.StartLedCheckAddr;
    await this.connection.send(req);
  }

  // #11695
  async SetReadColorCoef(
    addr: number,
    portAddr: number,
    scanBoardAddr: number,
    bBroadcast: boolean,
    val: number
  ): Promise<void> {
    const req = new Request([val], bBroadcast, 'SetReadColorCoef');
    req.destination = addr;
    req.deviceType = 1;
    req.port = portAddr;
    req.rcvIndex = scanBoardAddr;
    req.address = AddressMapping.SetReadColorCoefAddr;
    await this.connection.send(req);
  }

  // #11705
  async SetConfigRegister(
    addr: number,
    portAddr: number,
    scanBoardAddr: number,
    bBroadcast: boolean,
    data: number[] | Buffer
  ): Promise<void> {
    if (data.length !== AddressMapping.WriteConfigRegisterOccupancy)
      throw new TypeError(`Invalid buffer size: ${data.length}`);
    const req = new Request(data, bBroadcast, 'SetConfigRegister');
    req.destination = addr;
    req.deviceType = 1;
    req.port = portAddr;
    req.rcvIndex = scanBoardAddr;
    req.address = AddressMapping.WriteConfigRegisterAddr;
    await this.connection.send(req);
  }

  // #11714
  async SetConfigRegister2017(
    addr: number,
    portAddr: number,
    scanBoardAddr: number,
    bBroadcast: boolean,
    data: number[] | Buffer
  ): Promise<void> {
    if (data.length !== AddressMapping.WriteConfigRegisterOccupancy2017TD)
      throw new TypeError(`Invalid buffer size: ${data.length}`);
    const req = new Request(data, bBroadcast, 'SetConfigRegister2017');
    req.destination = addr;
    req.deviceType = 1;
    req.port = portAddr;
    req.rcvIndex = scanBoardAddr;
    req.address = AddressMapping.WriteConfigRegisterAddr2017TD;
    await this.connection.send(req);
  }

  // #11723
  async SetConfigRegisterFor2200(
    addr: number,
    portAddr: number,
    scanBoardAddr: number,
    bBroadcast: boolean,
    data: number[] | Buffer
  ): Promise<void> {
    const req = new Request(data, bBroadcast, 'SetConfigRegisterFor2200');
    req.destination = addr;
    req.deviceType = 1;
    req.port = portAddr;
    req.rcvIndex = scanBoardAddr;
    req.address = AddressMapping.WriteConfigRegisterAddrFor2200;
    await this.connection.send(req);
  }

  // #11736
  async Read2200RegisterData(
    addr: number,
    portAddr: number,
    scanBoardAddr: number
  ): Promise<Buffer> {
    const req = new Request(
      AddressMapping.WriteConfigRegisterOccupancyFor2200,
      'Read2200RegisterData'
    );
    req.destination = addr;
    req.deviceType = 1;
    req.port = portAddr;
    req.rcvIndex = scanBoardAddr;
    req.address = AddressMapping.WriteConfigRegisterAddrFor2200;
    return (await this.connection.send(req)).data;
  }

  // #11745
  async SetConfigRegisterFor2020(
    addr: number,
    portAddr: number,
    scanBoardAddr: number,
    bBroadcast: boolean,
    data: number[] | Buffer
  ): Promise<void> {
    if (data.length !== 1) throw new TypeError(`Invalid buffer size: ${data.length}`);
    const req = new Request(data, bBroadcast, 'SetConfigRegisterFor2020');
    req.destination = addr;
    req.deviceType = 1;
    req.port = portAddr;
    req.rcvIndex = scanBoardAddr;
    req.address = AddressMapping.WriteConfigRegisterAddrFor2020;
    await this.connection.send(req);
  }

  // #11754
  async Set5359RegAddress(
    addr: number,
    portAddr: number,
    scanBoardAddr: number,
    bBroadcast: boolean,
    data: number[] | Buffer
  ): Promise<void> {
    const req = new Request(data, bBroadcast, 'Set5359RegAddress');
    req.destination = addr;
    req.deviceType = 1;
    req.port = portAddr;
    req.rcvIndex = scanBoardAddr;
    req.address = AddressMapping.Register5359Addres;
    await this.connection.send(req);
  }

  // #11763
  async Read5359RegAddress(
    addr: number,
    portAddr: number,
    scanBoardAddr: number,
    dataLength: number
  ): Promise<Buffer> {
    const req = new Request(dataLength, 'Read5359RegAddress');
    req.destination = addr;
    req.deviceType = 1;
    req.port = portAddr;
    req.rcvIndex = scanBoardAddr;
    req.address = AddressMapping.Register5359Addres;
    return (await this.connection.send(req)).data;
  }

  // #11772
  async Write6867RegData(
    addr: number,
    portAddr: number,
    scanBoardAddr: number,
    bBroadcast: boolean,
    data: number[] | Buffer
  ): Promise<void> {
    const req = new Request(data, bBroadcast, 'Write6867RegData');
    req.destination = addr;
    req.deviceType = 1;
    req.port = portAddr;
    req.rcvIndex = scanBoardAddr;
    req.address = AddressMapping.Register6867RegAddress;
    await this.connection.send(req);
  }

  // #11781
  async Read6867RegData(
    addr: number,
    portAddr: number,
    scanBoardAddr: number,
    dataLength: number
  ): Promise<Buffer> {
    const req = new Request(dataLength, 'Read6867RegData');
    req.destination = addr;
    req.deviceType = 1;
    req.port = portAddr;
    req.rcvIndex = scanBoardAddr;
    req.address = AddressMapping.Register6867RegAddress;
    return (await this.connection.send(req)).data;
  }

  // #11790
  async SetAreaCoefsOperate(
    addr: number,
    portAddr: number,
    scanBoardAddr: number,
    bBroadcast: boolean,
    data: number[] | Buffer
  ): Promise<void> {
    if (data.length !== AddressMapping.AreaCoefsOperateOccupancy)
      throw new TypeError(`Invalid buffer size: ${data.length}`);
    const req = new Request(data, bBroadcast, 'SetAreaCoefsOperate');
    req.destination = addr;
    req.deviceType = 1;
    req.port = portAddr;
    req.rcvIndex = scanBoardAddr;
    req.address = AddressMapping.AreaCoefsOperateAddr;
    await this.connection.send(req);
  }

  // #11799
  async SetConfigRegisterWriteType2(
    addr: number,
    portAddr: number,
    scanBoardAddr: number,
    bBroadcast: boolean,
    data: number[] | Buffer
  ): Promise<void> {
    const req = new Request(data, bBroadcast, 'SetConfigRegisterWriteType2');
    req.destination = addr;
    req.deviceType = 1;
    req.port = portAddr;
    req.rcvIndex = scanBoardAddr;
    req.address = AddressMapping.ConfigRegisterWriteType2Addr;
    await this.connection.send(req);
  }

  // #11813
  async SetConfigRegisterWrite3(
    addr: number,
    portAddr: number,
    scanBoardAddr: number,
    bBroadcast: boolean,
    data: number[] | Buffer
  ): Promise<void> {
    if (data.length !== AddressMapping.ConfigRegisterWrite3Occupancy)
      throw new TypeError(`Invalid buffer size: ${data.length}`);
    const req = new Request(data, bBroadcast, 'SetConfigRegisterWrite3');
    req.destination = addr;
    req.deviceType = 1;
    req.port = portAddr;
    req.rcvIndex = scanBoardAddr;
    req.address = AddressMapping.ConfigRegisterWrite3Addr;
    await this.connection.send(req);
  }

  // #11822
  async SetIntialRegConfigData(
    addr: number,
    portAddr: number,
    scanBoardAddr: number,
    bBroadcast: boolean,
    data: number[] | Buffer
  ): Promise<void> {
    if (data.length !== AddressMapping.IntialRegConfigOccupancy)
      throw new TypeError(`Invalid buffer size: ${data.length}`);
    const req = new Request(data, bBroadcast, 'SetIntialRegConfigData');
    req.destination = addr;
    req.deviceType = 1;
    req.port = portAddr;
    req.rcvIndex = scanBoardAddr;
    req.address = AddressMapping.IntialRegConfigAddr;
    await this.connection.send(req);
  }

  // #11831
  async SetUseColorAdjustMatrix(
    addr: number,
    portAddr: number,
    scanBoardAddr: number,
    bBroadcast: boolean,
    isEnableClrMatrix: boolean
  ): Promise<void> {
    const req = new Request(isEnableClrMatrix ? [5] : [255], bBroadcast, 'SetUseColorAdjustMatrix');
    req.destination = addr;
    req.deviceType = 1;
    req.port = portAddr;
    req.rcvIndex = scanBoardAddr;
    req.address = AddressMapping.UseColorAdjustMatrixAddr;
    await this.connection.send(req);
  }

  // #11849
  async ReadConfigRegiste3rRead(
    addr: number,
    portAddr: number,
    scanBoardAddr: number
  ): Promise<Buffer> {
    const req = new Request(AddressMapping.Config3RegisterOccupancy, 'ReadConfigRegiste3rRead');
    req.destination = addr;
    req.deviceType = 1;
    req.port = portAddr;
    req.rcvIndex = scanBoardAddr;
    req.address = AddressMapping.Config3RegisterWriteAddr;
    return (await this.connection.send(req)).data;
  }

  // #11869
  async SetConfigRegisterWrite4(
    addr: number,
    portAddr: number,
    scanBoardAddr: number,
    bBroadcast: boolean,
    data: number[] | Buffer
  ): Promise<void> {
    if (data.length !== AddressMapping.Config3RegisterOccupancy)
      throw new TypeError(`Invalid buffer size: ${data.length}`);
    const req = new Request(data, bBroadcast, 'SetConfigRegisterWrite4');
    req.destination = addr;
    req.deviceType = 1;
    req.port = portAddr;
    req.rcvIndex = scanBoardAddr;
    req.address = AddressMapping.Config3RegisterWriteAddr;
    await this.connection.send(req);
  }

  // #11878
  async SetConfigRegisterWrite4_1(
    addr: number,
    portAddr: number,
    scanBoardAddr: number,
    bBroadcast: boolean,
    data: number[] | Buffer
  ): Promise<void> {
    if (data.length !== AddressMapping.Config3RegisterOccupancy)
      throw new TypeError(`Invalid buffer size: ${data.length}`);
    const req = new Request(data, bBroadcast, 'SetConfigRegisterWrite4_1');
    req.destination = addr;
    req.deviceType = 1;
    req.port = portAddr;
    req.rcvIndex = scanBoardAddr;
    req.address = AddressMapping.ConfigRegisterWriteAddr4;
    await this.connection.send(req);
  }

  // #11886
  async SetConfigRegisterWrite5(
    addr: number,
    portAddr: number,
    scanBoardAddr: number,
    bBroadcast: boolean,
    data: number[] | Buffer
  ): Promise<void> {
    if (data.length !== AddressMapping.Config3RegisterOccupancy)
      throw new TypeError(`Invalid buffer size: ${data.length}`);
    const req = new Request(data, bBroadcast, 'SetConfigRegisterWrite5');
    req.destination = addr;
    req.deviceType = 1;
    req.port = portAddr;
    req.rcvIndex = scanBoardAddr;
    req.address = AddressMapping.ConfigRegisterWriteAddr5;
    await this.connection.send(req);
  }

  // #11894
  async SetConfigRegisterWrite6(
    addr: number,
    portAddr: number,
    scanBoardAddr: number,
    bBroadcast: boolean,
    data: number[] | Buffer
  ): Promise<void> {
    if (data.length !== AddressMapping.Config3RegisterOccupancy)
      throw new TypeError(`Invalid buffer size: ${data.length}`);
    const req = new Request(data, bBroadcast, 'SetConfigRegisterWrite6');
    req.destination = addr;
    req.deviceType = 1;
    req.port = portAddr;
    req.rcvIndex = scanBoardAddr;
    req.address = AddressMapping.ConfigRegisterWriteAddr6;
    await this.connection.send(req);
  }

  // #11902
  async SetConfigSpecialRegisterWrite(
    addr: number,
    portAddr: number,
    scanBoardAddr: number,
    bBroadcast: boolean,
    data: number[] | Buffer
  ): Promise<void> {
    if (data.length !== AddressMapping.ConfigSpecialRegisterOccupancy)
      throw new TypeError(`Invalid buffer size: ${data.length}`);
    const req = new Request(data, bBroadcast, 'SetConfigSpecialRegisterWrite');
    req.destination = addr;
    req.deviceType = 1;
    req.port = portAddr;
    req.rcvIndex = scanBoardAddr;
    req.address = AddressMapping.ConfigSpecialRegisterAddr;
    await this.connection.send(req);
  }

  // #11911
  async Set2055RegisterWrite(
    addr: number,
    portAddr: number,
    scanBoardAddr: number,
    bBroadcast: boolean,
    data: number[] | Buffer
  ): Promise<void> {
    if (data.length !== AddressMapping.Config2055RegisterOccupancy)
      throw new TypeError(`Invalid buffer size: ${data.length}`);
    const req = new Request(data, bBroadcast, 'Set2055RegisterWrite');
    req.destination = addr;
    req.deviceType = 1;
    req.port = portAddr;
    req.rcvIndex = scanBoardAddr;
    req.address = AddressMapping.Config2055RegisterAddr;
    await this.connection.send(req);
  }

  // #11920
  async Read2055RegisterData(
    addr: number,
    portAddr: number,
    scanBoardAddr: number
  ): Promise<Buffer> {
    const req = new Request(AddressMapping.Config2055RegisterOccupancy, 'Read2055RegisterData');
    req.destination = addr;
    req.deviceType = 1;
    req.port = portAddr;
    req.rcvIndex = scanBoardAddr;
    req.address = AddressMapping.Config2055RegisterAddr;
    return (await this.connection.send(req)).data;
  }

  // #11941
  async Set2055UnitRegisterWrite(
    addr: number,
    portAddr: number,
    scanBoardAddr: number,
    bBroadcast: boolean,
    data: number[] | Buffer,
    unit: number
  ): Promise<void> {
    if (data.length !== AddressMapping.Config2055UnitRegisterOccupancy)
      throw new TypeError(`Invalid buffer size: ${data.length}`);
    const req = new Request(data, bBroadcast, 'Set2055UnitRegisterWrite');
    req.destination = addr;
    req.deviceType = 1;
    req.port = portAddr;
    req.rcvIndex = scanBoardAddr;
    req.address = AddressMapping.Config2055RegisterAddr + unit * 8;
    await this.connection.send(req);
  }

  // #11951
  async Read2055UnitRegisterData(
    addr: number,
    portAddr: number,
    scanBoardAddr: number,
    unit: number
  ): Promise<Buffer> {
    const req = new Request(
      AddressMapping.Config2055UnitRegisterOccupancy,
      'Read2055UnitRegisterData'
    );
    req.destination = addr;
    req.deviceType = 1;
    req.port = portAddr;
    req.rcvIndex = scanBoardAddr;
    req.address = AddressMapping.Config2055RegisterAddr + unit * 8;
    return (await this.connection.send(req)).data;
  }

  // #11994
  async ReadWheelReadingCureParameterToFactoryAreaData(
    addr: number,
    portAddr: number,
    scanBoardAddr: number
  ): Promise<number> {
    const req = new Request(
      AddressMapping.GeneralPurposeRegisterOccupancy,
      'ReadWheelReadingCureParameterToFactoryAreaData'
    );
    req.destination = addr;
    req.deviceType = 1;
    req.port = portAddr;
    req.rcvIndex = scanBoardAddr;
    req.address = AddressMapping.GeneralPurposeRegisterAddr;
    return decodeUIntLE(await this.connection.send(req));
  }

  // #12015
  async ReadOnePackageSBParameters(
    addr: number,
    portAddr: number,
    scanBoardAddr: number
  ): Promise<Buffer> {
    const req = new Request(MaxValueInfo.MAX_PARAMETER_TABLE_LEN, 'ReadOnePackageSBParameters');
    req.destination = addr;
    req.deviceType = 1;
    req.port = portAddr;
    req.rcvIndex = scanBoardAddr;
    req.address = 33554432;
    return (await this.connection.send(req)).data;
  }

  // #12025
  async ReadOnePackageSBParameters_1(
    addr: number,
    portAddr: number,
    scanBoardAddr: number,
    dataLength: number
  ): Promise<Buffer> {
    const req = new Request(dataLength, 'ReadOnePackageSBParameters_1');
    req.destination = addr;
    req.deviceType = 1;
    req.port = portAddr;
    req.rcvIndex = scanBoardAddr;
    req.address = 33554432;
    return (await this.connection.send(req)).data;
  }

  // #12059
  async SetOnePackageSBParameters(
    addr: number,
    portAddr: number,
    scanBoardAddr: number,
    bBroadcast: boolean,
    data: number[] | Buffer
  ): Promise<void> {
    if (data.length !== MaxValueInfo.MAX_PARAMETER_TABLE_LEN)
      throw new TypeError(`Invalid buffer size: ${data.length}`);
    const req = new Request(data, bBroadcast, 'SetOnePackageSBParameters');
    req.destination = addr;
    req.deviceType = 1;
    req.port = portAddr;
    req.rcvIndex = scanBoardAddr;
    req.address = 0;
    await this.connection.send(req);
  }

  // #12069
  async ReadLowAshCompensation(
    addr: number,
    portAddr: number,
    scanBoardAddr: number
  ): Promise<Buffer> {
    const req = new Request(AddressMapping.LowAshCompensationOccupancy, 'ReadLowAshCompensation');
    req.destination = addr;
    req.deviceType = 1;
    req.port = portAddr;
    req.rcvIndex = scanBoardAddr;
    req.address = AddressMapping.LowAshCompensationAddr;
    return (await this.connection.send(req)).data;
  }

  // #12090
  async SetLowAshCompensation(
    addr: number,
    portAddr: number,
    scanBoardAddr: number,
    bBroadcast: boolean,
    data: number[] | Buffer
  ): Promise<void> {
    if (data.length !== AddressMapping.LowAshCompensationOccupancy)
      throw new TypeError(`Invalid buffer size: ${data.length}`);
    const req = new Request(data, bBroadcast, 'SetLowAshCompensation');
    req.destination = addr;
    req.deviceType = 1;
    req.port = portAddr;
    req.rcvIndex = scanBoardAddr;
    req.address = AddressMapping.LowAshCompensationAddr;
    await this.connection.send(req);
  }

  // #12099
  async ReadReduceHighContrast(
    addr: number,
    portAddr: number,
    scanBoardAddr: number
  ): Promise<number> {
    const req = new Request(AddressMapping.ReduceHighContrastOccupancy, 'ReadReduceHighContrast');
    req.destination = addr;
    req.deviceType = 1;
    req.port = portAddr;
    req.rcvIndex = scanBoardAddr;
    req.address = AddressMapping.ReduceHighContrastAddr;
    return decodeUIntLE(await this.connection.send(req));
  }

  // #12120
  async SetReduceHighContrast(
    addr: number,
    portAddr: number,
    scanBoardAddr: number,
    bBroadcast: boolean,
    reduceHighData: number
  ): Promise<void> {
    const $data = encodeUIntLE(reduceHighData, AddressMapping.ReduceHighContrastOccupancy);
    const req = new Request($data, bBroadcast, 'SetReduceHighContrast');
    req.destination = addr;
    req.deviceType = 1;
    req.port = portAddr;
    req.rcvIndex = scanBoardAddr;
    req.address = AddressMapping.ReduceHighContrastAddr;
    await this.connection.send(req);
  }

  // #12142
  async SetEnSwipErrorPoint(
    addr: number,
    portAddr: number,
    scanBoardAddr: number,
    bBroadcast: boolean,
    data: number[] | Buffer
  ): Promise<void> {
    if (data.length !== AddressMapping.EnSwipErrorPointOccupancy)
      throw new TypeError(`Invalid buffer size: ${data.length}`);
    const req = new Request(data, bBroadcast, 'SetEnSwipErrorPoint');
    req.destination = addr;
    req.deviceType = 1;
    req.port = portAddr;
    req.rcvIndex = scanBoardAddr;
    req.address = AddressMapping.EnSwipErrorPointAddr;
    await this.connection.send(req);
  }

  // #12151
  async Set16259EnSwipErrorPoint(
    addr: number,
    portAddr: number,
    scanBoardAddr: number,
    bBroadcast: boolean,
    data: number[] | Buffer
  ): Promise<void> {
    if (data.length !== AddressMapping.ErrorPoint16259Occupancy)
      throw new TypeError(`Invalid buffer size: ${data.length}`);
    const req = new Request(data, bBroadcast, 'Set16259EnSwipErrorPoint');
    req.destination = addr;
    req.deviceType = 1;
    req.port = portAddr;
    req.rcvIndex = scanBoardAddr;
    req.address = AddressMapping.ErrorPoint16259Addr;
    await this.connection.send(req);
  }

  // #12160
  async ReadGamma(addr: number, portAddr: number, scanBoardAddr: number): Promise<number> {
    const req = new Request(AddressMapping.GammaOccupancy, 'ReadGamma');
    req.destination = addr;
    req.deviceType = 1;
    req.port = portAddr;
    req.rcvIndex = scanBoardAddr;
    req.address = AddressMapping.GammaAddr;
    return decodeUIntLE(await this.connection.send(req));
  }

  // #12180
  async SetGamma(
    addr: number,
    portAddr: number,
    scanBoardAddr: number,
    bBroadcast: boolean,
    gamma: number
  ): Promise<void> {
    const $data = encodeUIntLE(gamma, AddressMapping.GammaOccupancy);
    const req = new Request($data, bBroadcast, 'SetGamma');
    req.destination = addr;
    req.deviceType = 1;
    req.port = portAddr;
    req.rcvIndex = scanBoardAddr;
    req.address = AddressMapping.GammaAddr;
    await this.connection.send(req);
  }

  // #12190
  async SetLowGrayPull(
    addr: number,
    portAddr: number,
    scanBoardAddr: number,
    bBroadcast: boolean,
    data: number
  ): Promise<void> {
    const req = new Request([data], bBroadcast, 'SetLowGrayPull');
    req.destination = addr;
    req.deviceType = 1;
    req.port = portAddr;
    req.rcvIndex = scanBoardAddr;
    req.address = AddressMapping.ScannerLowGrayAddr;
    await this.connection.send(req);
  }

  // #12199
  async GetLowGrayPull(addr: number, portAddr: number, scanBoardAddr: number): Promise<number> {
    const req = new Request(AddressMapping.ScannerLowGreyOccupancy, 'GetLowGrayPull');
    req.destination = addr;
    req.deviceType = 1;
    req.port = portAddr;
    req.rcvIndex = scanBoardAddr;
    req.address = AddressMapping.ScannerLowGrayAddr;
    return decodeUIntLE(await this.connection.send(req));
  }

  // #12208
  async SetSenderConrectionMode(addr: number, bBroadcast: boolean, isOpen: boolean): Promise<void> {
    const req = new Request(isOpen ? [168] : [0], bBroadcast, 'SetSenderConrectionMode');
    req.destination = addr;
    req.address = AddressMapping.SenderCorrectionModeAddr;
    await this.connection.send(req);
  }

  // #12224
  async SetScanConrectionMode(
    addr: number,
    portAddr: number,
    scanBoardAddr: number,
    bBroadcast: boolean,
    isOpen: boolean
  ): Promise<void> {
    const req = new Request(isOpen ? [85] : [170], bBroadcast, 'SetScanConrectionMode');
    req.destination = addr;
    req.deviceType = 1;
    req.port = portAddr;
    req.rcvIndex = scanBoardAddr;
    req.address = AddressMapping.ScannerCorrectionModeAddr;
    await this.connection.send(req);
  }

  // #12240
  async ReadGrayBit(addr: number, portAddr: number, scanBoardAddr: number): Promise<number> {
    const req = new Request(AddressMapping.GrayBitOccupancy, 'ReadGrayBit');
    req.destination = addr;
    req.deviceType = 1;
    req.port = portAddr;
    req.rcvIndex = scanBoardAddr;
    req.address = AddressMapping.GrayBitAddr;
    return decodeUIntLE(await this.connection.send(req));
  }

  // #12260
  async SetGrayBit(
    addr: number,
    portAddr: number,
    scanBoardAddr: number,
    bBroadcast: boolean,
    grayBit: number
  ): Promise<void> {
    const $data = encodeUIntLE(grayBit, AddressMapping.GrayBitOccupancy);
    const req = new Request($data, bBroadcast, 'SetGrayBit');
    req.destination = addr;
    req.deviceType = 1;
    req.port = portAddr;
    req.rcvIndex = scanBoardAddr;
    req.address = AddressMapping.GrayBitAddr;
    await this.connection.send(req);
  }

  // #12270
  async ReadUCS512CDisplayMode(
    addr: number,
    portAddr: number,
    scanBoardAddr: number
  ): Promise<number> {
    const req = new Request(AddressMapping.GrayBitOccupancy, 'ReadUCS512CDisplayMode');
    req.destination = addr;
    req.deviceType = 1;
    req.port = portAddr;
    req.rcvIndex = scanBoardAddr;
    req.address = AddressMapping.UCS512CDisplayModeAddr;
    return decodeUIntLE(await this.connection.send(req));
  }

  // #12290
  async SetUCS512CDisplayMode(
    addr: number,
    portAddr: number,
    scanBoardAddr: number,
    bBroadcast: boolean,
    displayMode: number
  ): Promise<void> {
    const $data = encodeUIntLE(displayMode, AddressMapping.GrayBitOccupancy);
    const req = new Request($data, bBroadcast, 'SetUCS512CDisplayMode');
    req.destination = addr;
    req.deviceType = 1;
    req.port = portAddr;
    req.rcvIndex = scanBoardAddr;
    req.address = AddressMapping.UCS512CDisplayModeAddr;
    await this.connection.send(req);
  }

  // #12300
  async ReadGlobalBrightness(
    addr: number,
    portAddr: number,
    scanBoardAddr: number
  ): Promise<number> {
    const req = new Request(AddressMapping.GlobalBrightnessOccupancy, 'ReadGlobalBrightness');
    req.destination = addr;
    req.deviceType = 1;
    req.port = portAddr;
    req.rcvIndex = scanBoardAddr;
    req.address = AddressMapping.GlobalBrightnessAddr;
    return decodeUIntLE(await this.connection.send(req));
  }

  // #12331
  async SetGlobalBrightness(
    addr: number,
    portAddr: number,
    scanBoardAddr: number,
    bBroadcast: boolean,
    globalBrightness: number
  ): Promise<void> {
    const $data = encodeUIntLE(globalBrightness, AddressMapping.GlobalBrightnessOccupancy);
    const req = new Request($data, bBroadcast, 'SetGlobalBrightness');
    req.destination = addr;
    req.deviceType = 1;
    req.port = portAddr;
    req.rcvIndex = scanBoardAddr;
    req.address = AddressMapping.GlobalBrightnessAddr;
    await this.connection.send(req);
  }

  // #12341
  async SetAdaptiveFourSystemGlobalBrightness(
    addr: number,
    portAddr: number,
    scanBoardAddr: number,
    bBroadcast: boolean,
    data: number[] | Buffer
  ): Promise<void> {
    if (data.length !== AddressMapping.FourSystemAdaptiveBrightnessOccupancy)
      throw new TypeError(`Invalid buffer size: ${data.length}`);
    const req = new Request(data, bBroadcast, 'SetAdaptiveFourSystemGlobalBrightness');
    req.destination = addr;
    req.deviceType = 1;
    req.port = portAddr;
    req.rcvIndex = scanBoardAddr;
    req.address = AddressMapping.FourSystemAdaptiveBrightnessAddr;
    await this.connection.send(req);
  }

  // #12350
  async SetGlobalBrightnessOf2053(
    addr: number,
    portAddr: number,
    scanBoardAddr: number,
    bBroadcast: boolean,
    globalBrightness: number
  ): Promise<void> {
    const $data = encodeUIntLE(globalBrightness, AddressMapping.GlobalBrightnessOf2053Occupancy);
    const req = new Request($data, bBroadcast, 'SetGlobalBrightnessOf2053');
    req.destination = addr;
    req.deviceType = 1;
    req.port = portAddr;
    req.rcvIndex = scanBoardAddr;
    req.address = AddressMapping.GlobalBrightnessOf2053Addr;
    await this.connection.send(req);
  }

  // #12360
  async ReadRedBrightness(addr: number, portAddr: number, scanBoardAddr: number): Promise<number> {
    const req = new Request(AddressMapping.RedBrightnessOccupancy, 'ReadRedBrightness');
    req.destination = addr;
    req.deviceType = 1;
    req.port = portAddr;
    req.rcvIndex = scanBoardAddr;
    req.address = AddressMapping.RedBrightnessAddr;
    return decodeUIntLE(await this.connection.send(req));
  }

  // #12380
  async SetRedBrightness(
    addr: number,
    portAddr: number,
    scanBoardAddr: number,
    bBroadcast: boolean,
    redBrightness: number
  ): Promise<void> {
    const $data = encodeUIntLE(redBrightness, AddressMapping.RedBrightnessOccupancy);
    const req = new Request($data, bBroadcast, 'SetRedBrightness');
    req.destination = addr;
    req.deviceType = 1;
    req.port = portAddr;
    req.rcvIndex = scanBoardAddr;
    req.address = AddressMapping.RedBrightnessAddr;
    await this.connection.send(req);
  }

  // #12390
  async ReadGreenBrightness(
    addr: number,
    portAddr: number,
    scanBoardAddr: number
  ): Promise<number> {
    const req = new Request(AddressMapping.GreenBrightnessOccupancy, 'ReadGreenBrightness');
    req.destination = addr;
    req.deviceType = 1;
    req.port = portAddr;
    req.rcvIndex = scanBoardAddr;
    req.address = AddressMapping.GreenBrightnessAddr;
    return decodeUIntLE(await this.connection.send(req));
  }

  // #12410
  async SetGreenBrightness(
    addr: number,
    portAddr: number,
    scanBoardAddr: number,
    bBroadcast: boolean,
    greenBrightness: number
  ): Promise<void> {
    const $data = encodeUIntLE(greenBrightness, AddressMapping.GreenBrightnessOccupancy);
    const req = new Request($data, bBroadcast, 'SetGreenBrightness');
    req.destination = addr;
    req.deviceType = 1;
    req.port = portAddr;
    req.rcvIndex = scanBoardAddr;
    req.address = AddressMapping.GreenBrightnessAddr;
    await this.connection.send(req);
  }

  // #12426
  async ReadBlueBrightness(addr: number, portAddr: number, scanBoardAddr: number): Promise<number> {
    const req = new Request(AddressMapping.BlueBrightnessOccupancy, 'ReadBlueBrightness');
    req.destination = addr;
    req.deviceType = 1;
    req.port = portAddr;
    req.rcvIndex = scanBoardAddr;
    req.address = AddressMapping.BlueBrightnessAddr;
    return decodeUIntLE(await this.connection.send(req));
  }

  // #12446
  async SetBlueBrightness(
    addr: number,
    portAddr: number,
    scanBoardAddr: number,
    bBroadcast: boolean,
    blueBrightness: number
  ): Promise<void> {
    const $data = encodeUIntLE(blueBrightness, AddressMapping.BlueBrightnessOccupancy);
    const req = new Request($data, bBroadcast, 'SetBlueBrightness');
    req.destination = addr;
    req.deviceType = 1;
    req.port = portAddr;
    req.rcvIndex = scanBoardAddr;
    req.address = AddressMapping.BlueBrightnessAddr;
    await this.connection.send(req);
  }

  // #12456
  async ReadVRedBrightness(addr: number, portAddr: number, scanBoardAddr: number): Promise<number> {
    const req = new Request(AddressMapping.VRedBrightnessOccupancy, 'ReadVRedBrightness');
    req.destination = addr;
    req.deviceType = 1;
    req.port = portAddr;
    req.rcvIndex = scanBoardAddr;
    req.address = AddressMapping.VRedBrightnessAddr;
    return decodeUIntLE(await this.connection.send(req));
  }

  // #12476
  async SetVRedBrightness(
    addr: number,
    portAddr: number,
    scanBoardAddr: number,
    bBroadcast: boolean,
    vRedBrightness: number
  ): Promise<void> {
    const $data = encodeUIntLE(vRedBrightness, AddressMapping.VRedBrightnessOccupancy);
    const req = new Request($data, bBroadcast, 'SetVRedBrightness');
    req.destination = addr;
    req.deviceType = 1;
    req.port = portAddr;
    req.rcvIndex = scanBoardAddr;
    req.address = AddressMapping.VRedBrightnessAddr;
    await this.connection.send(req);
  }

  // #12486
  async ReadScreenDriveType(
    addr: number,
    portAddr: number,
    scanBoardAddr: number
  ): Promise<number> {
    const req = new Request(AddressMapping.ScreenDriveTypeOccupancy, 'ReadScreenDriveType');
    req.destination = addr;
    req.deviceType = 1;
    req.port = portAddr;
    req.rcvIndex = scanBoardAddr;
    req.address = AddressMapping.ScreenDriveTypeAddr;
    return decodeUIntLE(await this.connection.send(req));
  }

  // #12514
  async SetScreenDriveType(
    addr: number,
    portAddr: number,
    scanBoardAddr: number,
    bBroadcast: boolean,
    driverType: ScreenDriveTypeEnum
  ): Promise<void> {
    const $data = encodeUIntLE(driverType, AddressMapping.ScreenDriveTypeOccupancy);
    const req = new Request($data, bBroadcast, 'SetScreenDriveType');
    req.destination = addr;
    req.deviceType = 1;
    req.port = portAddr;
    req.rcvIndex = scanBoardAddr;
    req.address = AddressMapping.ScreenDriveTypeAddr;
    await this.connection.send(req);
  }

  // #12524
  async ReadAllBrightnessInfo(
    addr: number,
    portAddr: number,
    scanBoardAddr: number
  ): Promise<Buffer> {
    const req = new Request(AddressMapping.AllBrightnessInfoOccupancy, 'ReadAllBrightnessInfo');
    req.destination = addr;
    req.deviceType = 1;
    req.port = portAddr;
    req.rcvIndex = scanBoardAddr;
    req.address = AddressMapping.AllBrightnessInfoAddr;
    return (await this.connection.send(req)).data;
  }

  // #12557
  async ReadRGBBrightness(addr: number, portAddr: number, scanBoardAddr: number): Promise<number> {
    const req = new Request(AddressMapping.RGBBrightnessOccupancy, 'ReadRGBBrightness');
    req.destination = addr;
    req.deviceType = 1;
    req.port = portAddr;
    req.rcvIndex = scanBoardAddr;
    req.address = AddressMapping.RGBBrightnessAddr;
    return decodeUIntLE(await this.connection.send(req));
  }

  // #12587
  async SetRGBBrightness(
    addr: number,
    portAddr: number,
    scanBoardAddr: number,
    bBroadcast: boolean,
    redBrightness: number,
    greenBrightness: number,
    blueBrightness: number,
    vRedBrightness: number
  ): Promise<void> {
    const req = new Request(
      [redBrightness, greenBrightness, blueBrightness, vRedBrightness],
      bBroadcast,
      'SetRGBBrightness'
    );
    req.destination = addr;
    req.deviceType = 1;
    req.port = portAddr;
    req.rcvIndex = scanBoardAddr;
    req.address = AddressMapping.RGBBrightnessAddr;
    await this.connection.send(req);
  }

  // #12601
  async ReadDclkHighRatio(addr: number, portAddr: number, scanBoardAddr: number): Promise<number> {
    const req = new Request(AddressMapping.DclkHighRatioOccupancy, 'ReadDclkHighRatio');
    req.destination = addr;
    req.deviceType = 1;
    req.port = portAddr;
    req.rcvIndex = scanBoardAddr;
    req.address = AddressMapping.DclkHighRatioAddr;
    return decodeUIntLE(await this.connection.send(req));
  }

  // #12621
  async SetDclkHighRatio(
    addr: number,
    portAddr: number,
    scanBoardAddr: number,
    bBroadcast: boolean,
    dclkHighRatio: number
  ): Promise<void> {
    const $data = encodeUIntLE(dclkHighRatio, AddressMapping.DclkHighRatioOccupancy);
    const req = new Request($data, bBroadcast, 'SetDclkHighRatio');
    req.destination = addr;
    req.deviceType = 1;
    req.port = portAddr;
    req.rcvIndex = scanBoardAddr;
    req.address = AddressMapping.DclkHighRatioAddr;
    await this.connection.send(req);
  }

  // #12631
  async ReadDataDirection(addr: number, portAddr: number, scanBoardAddr: number): Promise<number> {
    const req = new Request(AddressMapping.DataDirectionOccupancy, 'ReadDataDirection');
    req.destination = addr;
    req.deviceType = 1;
    req.port = portAddr;
    req.rcvIndex = scanBoardAddr;
    req.address = AddressMapping.DataDirectionAddr;
    return decodeUIntLE(await this.connection.send(req));
  }

  // #12658
  async SetDataDirection(
    addr: number,
    portAddr: number,
    scanBoardAddr: number,
    bBroadcast: boolean,
    dataDriection: DataDirectionTypeEnum
  ): Promise<void> {
    const $data = encodeUIntLE(dataDriection, AddressMapping.DataDirectionOccupancy);
    const req = new Request($data, bBroadcast, 'SetDataDirection');
    req.destination = addr;
    req.deviceType = 1;
    req.port = portAddr;
    req.rcvIndex = scanBoardAddr;
    req.address = AddressMapping.DataDirectionAddr;
    await this.connection.send(req);
  }

  // #12668
  async ReadModuleWidth(addr: number, portAddr: number, scanBoardAddr: number): Promise<number> {
    const req = new Request(AddressMapping.ModuleWidthOccupancy, 'ReadModuleWidth');
    req.destination = addr;
    req.deviceType = 1;
    req.port = portAddr;
    req.rcvIndex = scanBoardAddr;
    req.address = AddressMapping.ModuleWidthAddr;
    return decodeUIntLE(await this.connection.send(req));
  }

  // #12688
  async SetModuleWidth(
    addr: number,
    portAddr: number,
    scanBoardAddr: number,
    bBroadcast: boolean,
    moduleWidth: number
  ): Promise<void> {
    const $data = encodeUIntLE(moduleWidth, AddressMapping.ModuleWidthOccupancy);
    const req = new Request($data, bBroadcast, 'SetModuleWidth');
    req.destination = addr;
    req.deviceType = 1;
    req.port = portAddr;
    req.rcvIndex = scanBoardAddr;
    req.address = AddressMapping.ModuleWidthAddr;
    await this.connection.send(req);
  }

  // #12698
  async SetScanSwitchMode(
    addr: number,
    portAddr: number,
    scanBoardAddr: number,
    bBroadcast: boolean,
    switchMode: number
  ): Promise<void> {
    const $data = encodeUIntLE(switchMode, AddressMapping.SwitchModeOccupancy);
    const req = new Request($data, bBroadcast, 'SetScanSwitchMode');
    req.destination = addr;
    req.deviceType = 1;
    req.port = portAddr;
    req.rcvIndex = scanBoardAddr;
    req.address = AddressMapping.SwitchModeAddr;
    await this.connection.send(req);
  }

  // #12708
  async ReadModuleHeight(addr: number, portAddr: number, scanBoardAddr: number): Promise<number> {
    const req = new Request(AddressMapping.ModuleHeightOccupancy, 'ReadModuleHeight');
    req.destination = addr;
    req.deviceType = 1;
    req.port = portAddr;
    req.rcvIndex = scanBoardAddr;
    req.address = AddressMapping.ModuleHeightAddr;
    return decodeUIntLE(await this.connection.send(req));
  }

  // #12728
  async SetModuleHeight(
    addr: number,
    portAddr: number,
    scanBoardAddr: number,
    bBroadcast: boolean,
    moduleHeight: number
  ): Promise<void> {
    const $data = encodeUIntLE(moduleHeight, AddressMapping.ModuleHeightOccupancy);
    const req = new Request($data, bBroadcast, 'SetModuleHeight');
    req.destination = addr;
    req.deviceType = 1;
    req.port = portAddr;
    req.rcvIndex = scanBoardAddr;
    req.address = AddressMapping.ModuleHeightAddr;
    await this.connection.send(req);
  }

  // #12738
  async ReadModuleWidthAndHeigth(
    addr: number,
    portAddr: number,
    scanBoardAddr: number
  ): Promise<number> {
    const req = new Request(
      AddressMapping.ModuleWidthAndHeightOccupancy,
      'ReadModuleWidthAndHeigth'
    );
    req.destination = addr;
    req.deviceType = 1;
    req.port = portAddr;
    req.rcvIndex = scanBoardAddr;
    req.address = AddressMapping.ModuleWidthAddr;
    return decodeUIntLE(await this.connection.send(req));
  }

  // #12761
  async ReadDriverType(addr: number, portAddr: number, scanBoardAddr: number): Promise<number> {
    const req = new Request(AddressMapping.DriverTypeOccupancy, 'ReadDriverType');
    req.destination = addr;
    req.deviceType = 1;
    req.port = portAddr;
    req.rcvIndex = scanBoardAddr;
    req.address = AddressMapping.DriverTypeAddr;
    return decodeUIntLE(await this.connection.send(req));
  }

  // #12788
  async SetDriverType(
    addr: number,
    portAddr: number,
    scanBoardAddr: number,
    bBroadcast: boolean,
    driverType: ChipTypeEnum
  ): Promise<void> {
    const $data = encodeUIntLE(driverType, AddressMapping.DriverTypeOccupancy);
    const req = new Request($data, bBroadcast, 'SetDriverType');
    req.destination = addr;
    req.deviceType = 1;
    req.port = portAddr;
    req.rcvIndex = scanBoardAddr;
    req.address = AddressMapping.DriverTypeAddr;
    await this.connection.send(req);
  }

  // #12798
  async ReadDriverType2Byte(
    addr: number,
    portAddr: number,
    scanBoardAddr: number
  ): Promise<number> {
    const req = new Request(AddressMapping.DriverTypeOccupancy2Byte, 'ReadDriverType2Byte');
    req.destination = addr;
    req.deviceType = 1;
    req.port = portAddr;
    req.rcvIndex = scanBoardAddr;
    req.address = AddressMapping.DriverTypeAddr2Byte;
    return decodeUIntLE(await this.connection.send(req));
  }

  // #12819
  async SetDriverType2Byte(
    addr: number,
    portAddr: number,
    scanBoardAddr: number,
    bBroadcast: boolean,
    driverType2Byte: number
  ): Promise<void> {
    const $data = encodeUIntLE(driverType2Byte, AddressMapping.DriverTypeOccupancy);
    const req = new Request($data, bBroadcast, 'SetDriverType2Byte');
    req.destination = addr;
    req.deviceType = 1;
    req.port = portAddr;
    req.rcvIndex = scanBoardAddr;
    req.address = AddressMapping.DriverTypeAddr2Byte;
    await this.connection.send(req);
  }

  // #12829
  async ReadScanMode(addr: number, portAddr: number, scanBoardAddr: number): Promise<number> {
    const req = new Request(AddressMapping.ScanModeOccupancy, 'ReadScanMode');
    req.destination = addr;
    req.deviceType = 1;
    req.port = portAddr;
    req.rcvIndex = scanBoardAddr;
    req.address = AddressMapping.ScanModeAddr;
    return decodeUIntLE(await this.connection.send(req));
  }

  // #12856
  async SetScanMode(
    addr: number,
    portAddr: number,
    scanBoardAddr: number,
    bBroadcast: boolean,
    scanMode: ScanTypeEnum
  ): Promise<void> {
    const $data = encodeUIntLE(scanMode, AddressMapping.ScanModeOccupancy);
    const req = new Request($data, bBroadcast, 'SetScanMode');
    req.destination = addr;
    req.deviceType = 1;
    req.port = portAddr;
    req.rcvIndex = scanBoardAddr;
    req.address = AddressMapping.ScanModeAddr;
    await this.connection.send(req);
  }

  // #12866
  async ReadOEPority(addr: number, portAddr: number, scanBoardAddr: number): Promise<number> {
    const req = new Request(AddressMapping.OEPorityOccupancy, 'ReadOEPority');
    req.destination = addr;
    req.deviceType = 1;
    req.port = portAddr;
    req.rcvIndex = scanBoardAddr;
    req.address = AddressMapping.OEPorityAddr;
    return decodeUIntLE(await this.connection.send(req));
  }

  // #12893
  async SetOEPority(
    addr: number,
    portAddr: number,
    scanBoardAddr: number,
    bBroadcast: boolean,
    oEPority: OEPolarityTypeEnum
  ): Promise<void> {
    const $data = encodeUIntLE(oEPority, AddressMapping.OEPorityOccupancy);
    const req = new Request($data, bBroadcast, 'SetOEPority');
    req.destination = addr;
    req.deviceType = 1;
    req.port = portAddr;
    req.rcvIndex = scanBoardAddr;
    req.address = AddressMapping.OEPorityAddr;
    await this.connection.send(req);
  }

  // #12903
  async ReadDecodeType(addr: number, portAddr: number, scanBoardAddr: number): Promise<number> {
    const req = new Request(AddressMapping.DecodeTypeOccupancy, 'ReadDecodeType');
    req.destination = addr;
    req.deviceType = 1;
    req.port = portAddr;
    req.rcvIndex = scanBoardAddr;
    req.address = AddressMapping.DecodeTypeAddr;
    return decodeUIntLE(await this.connection.send(req));
  }

  // #12930
  async SetDecodeType(
    addr: number,
    portAddr: number,
    scanBoardAddr: number,
    bBroadcast: boolean,
    decodeType: DecodeTypeEnum
  ): Promise<void> {
    const $data = encodeUIntLE(decodeType, AddressMapping.DecodeTypeOccupancy);
    const req = new Request($data, bBroadcast, 'SetDecodeType');
    req.destination = addr;
    req.deviceType = 1;
    req.port = portAddr;
    req.rcvIndex = scanBoardAddr;
    req.address = AddressMapping.DecodeTypeAddr;
    await this.connection.send(req);
  }

  // #12940
  async ReadGroupNumInModule(
    addr: number,
    portAddr: number,
    scanBoardAddr: number
  ): Promise<number> {
    const req = new Request(AddressMapping.GroupNumInModuleOccupancy, 'ReadGroupNumInModule');
    req.destination = addr;
    req.deviceType = 1;
    req.port = portAddr;
    req.rcvIndex = scanBoardAddr;
    req.address = AddressMapping.GroupNumInModuleAddr;
    return decodeUIntLE(await this.connection.send(req));
  }

  // #12960
  async SetGroupNumInModule(
    addr: number,
    portAddr: number,
    scanBoardAddr: number,
    bBroadcast: boolean,
    groupNumInModule: number
  ): Promise<void> {
    const $data = encodeUIntLE(groupNumInModule, AddressMapping.GroupNumInModuleOccupancy);
    const req = new Request($data, bBroadcast, 'SetGroupNumInModule');
    req.destination = addr;
    req.deviceType = 1;
    req.port = portAddr;
    req.rcvIndex = scanBoardAddr;
    req.address = AddressMapping.GroupNumInModuleAddr;
    await this.connection.send(req);
  }

  // #12970
  async ReadDataGroupSequence(
    addr: number,
    portAddr: number,
    scanBoardAddr: number
  ): Promise<number> {
    const req = new Request(AddressMapping.DataGroupSequenceOccupancy, 'ReadDataGroupSequence');
    req.destination = addr;
    req.deviceType = 1;
    req.port = portAddr;
    req.rcvIndex = scanBoardAddr;
    req.address = AddressMapping.DataGroupSequenceAddr;
    return decodeUIntLE(await this.connection.send(req));
  }

  SetDataGroupSequence = (): void => {
    throw new TypeError('Not implemented');
  };

  // #13013
  async ReadModuelCols(addr: number, portAddr: number, scanBoardAddr: number): Promise<number> {
    const req = new Request(AddressMapping.ModuleColsOccupancy, 'ReadModuelCols');
    req.destination = addr;
    req.deviceType = 1;
    req.port = portAddr;
    req.rcvIndex = scanBoardAddr;
    req.address = AddressMapping.ModuleColsAddr;
    return decodeUIntLE(await this.connection.send(req));
  }

  // #13033
  async SetModuelCols(
    addr: number,
    portAddr: number,
    scanBoardAddr: number,
    bBroadcast: boolean,
    moduleCols: number
  ): Promise<void> {
    const $data = encodeUIntLE(moduleCols, AddressMapping.ModuleColsOccupancy);
    const req = new Request($data, bBroadcast, 'SetModuelCols');
    req.destination = addr;
    req.deviceType = 1;
    req.port = portAddr;
    req.rcvIndex = scanBoardAddr;
    req.address = AddressMapping.ModuleColsAddr;
    await this.connection.send(req);
  }

  // #13043
  async ReadModuelRows(addr: number, portAddr: number, scanBoardAddr: number): Promise<number> {
    const req = new Request(AddressMapping.ModuleRowsOccupancy, 'ReadModuelRows');
    req.destination = addr;
    req.deviceType = 1;
    req.port = portAddr;
    req.rcvIndex = scanBoardAddr;
    req.address = AddressMapping.ModuleRowsAddr;
    return decodeUIntLE(await this.connection.send(req));
  }

  // #13063
  async SetModuelRows(
    addr: number,
    portAddr: number,
    scanBoardAddr: number,
    bBroadcast: boolean,
    moduleRows: number
  ): Promise<void> {
    const $data = encodeUIntLE(moduleRows, AddressMapping.ModuleRowsOccupancy);
    const req = new Request($data, bBroadcast, 'SetModuelRows');
    req.destination = addr;
    req.deviceType = 1;
    req.port = portAddr;
    req.rcvIndex = scanBoardAddr;
    req.address = AddressMapping.ModuleRowsAddr;
    await this.connection.send(req);
  }

  // #13073
  async ReadControlWidth(addr: number, portAddr: number, scanBoardAddr: number): Promise<number> {
    const req = new Request(AddressMapping.ControlWidthOccupancy, 'ReadControlWidth');
    req.destination = addr;
    req.deviceType = 1;
    req.port = portAddr;
    req.rcvIndex = scanBoardAddr;
    req.address = AddressMapping.ControlWidthAddr;
    return decodeUIntLE(await this.connection.send(req));
  }

  // #13093
  async SetControlWidth(
    addr: number,
    portAddr: number,
    scanBoardAddr: number,
    bBroadcast: boolean,
    controlWidth: number
  ): Promise<void> {
    const $data = encodeUIntLE(controlWidth, AddressMapping.ControlWidthOccupancy);
    const req = new Request($data, bBroadcast, 'SetControlWidth');
    req.destination = addr;
    req.deviceType = 1;
    req.port = portAddr;
    req.rcvIndex = scanBoardAddr;
    req.address = AddressMapping.ControlWidthAddr;
    await this.connection.send(req);
  }

  // #13103
  async ReadControlHeight(addr: number, portAddr: number, scanBoardAddr: number): Promise<number> {
    const req = new Request(AddressMapping.ControlHeightOccupancy, 'ReadControlHeight');
    req.destination = addr;
    req.deviceType = 1;
    req.port = portAddr;
    req.rcvIndex = scanBoardAddr;
    req.address = AddressMapping.ControlHeightAddr;
    return decodeUIntLE(await this.connection.send(req));
  }

  // #13123
  async SetControlHeight(
    addr: number,
    portAddr: number,
    scanBoardAddr: number,
    bBroadcast: boolean,
    controlHeight: number
  ): Promise<void> {
    const $data = encodeUIntLE(controlHeight, AddressMapping.ControlHeightOccupancy);
    const req = new Request($data, bBroadcast, 'SetControlHeight');
    req.destination = addr;
    req.deviceType = 1;
    req.port = portAddr;
    req.rcvIndex = scanBoardAddr;
    req.address = AddressMapping.ControlHeightAddr;
    await this.connection.send(req);
  }

  // #13133
  async ReadPhysicalTotalDataGroupNum(
    addr: number,
    portAddr: number,
    scanBoardAddr: number
  ): Promise<number> {
    const req = new Request(
      AddressMapping.PhysicalTotalDataGroupNumOccupancy,
      'ReadPhysicalTotalDataGroupNum'
    );
    req.destination = addr;
    req.deviceType = 1;
    req.port = portAddr;
    req.rcvIndex = scanBoardAddr;
    req.address = AddressMapping.PhysicalTotalDataGroupNumAddr;
    return decodeUIntLE(await this.connection.send(req));
  }

  // #13153
  async SetPhysicalTotalDataGroupNum(
    addr: number,
    portAddr: number,
    scanBoardAddr: number,
    bBroadcast: boolean,
    totalDataGroupNum: number
  ): Promise<void> {
    const $data = encodeUIntLE(
      totalDataGroupNum,
      AddressMapping.PhysicalTotalDataGroupNumOccupancy
    );
    const req = new Request($data, bBroadcast, 'SetPhysicalTotalDataGroupNum');
    req.destination = addr;
    req.deviceType = 1;
    req.port = portAddr;
    req.rcvIndex = scanBoardAddr;
    req.address = AddressMapping.PhysicalTotalDataGroupNumAddr;
    await this.connection.send(req);
  }

  // #13163
  async ReadICNumber(addr: number, portAddr: number, scanBoardAddr: number): Promise<number> {
    const req = new Request(AddressMapping.ICNumberOccupancy, 'ReadICNumber');
    req.destination = addr;
    req.deviceType = 1;
    req.port = portAddr;
    req.rcvIndex = scanBoardAddr;
    req.address = AddressMapping.ICNumberAddr;
    return decodeUIntLE(await this.connection.send(req));
  }

  // #13183
  async SetICNumber(
    addr: number,
    portAddr: number,
    scanBoardAddr: number,
    bBroadcast: boolean,
    iCNumber: number
  ): Promise<void> {
    const $data = encodeUIntLE(iCNumber, AddressMapping.ICNumberOccupancy);
    const req = new Request($data, bBroadcast, 'SetICNumber');
    req.destination = addr;
    req.deviceType = 1;
    req.port = portAddr;
    req.rcvIndex = scanBoardAddr;
    req.address = AddressMapping.ICNumberAddr;
    await this.connection.send(req);
  }

  // #13193
  async ReadHalfFreqSetMode(
    addr: number,
    portAddr: number,
    scanBoardAddr: number
  ): Promise<number> {
    const req = new Request(AddressMapping.HalfFreqSetModeOccupancy, 'ReadHalfFreqSetMode');
    req.destination = addr;
    req.deviceType = 1;
    req.port = portAddr;
    req.rcvIndex = scanBoardAddr;
    req.address = AddressMapping.HalfFreqSetModeAddr;
    return decodeUIntLE(await this.connection.send(req));
  }

  // #13213
  async SetHalfFreqSetMode(
    addr: number,
    portAddr: number,
    scanBoardAddr: number,
    bBroadcast: boolean,
    totalDataGroupNum: number
  ): Promise<void> {
    const $data = encodeUIntLE(
      totalDataGroupNum,
      AddressMapping.PhysicalTotalDataGroupNumOccupancy
    );
    const req = new Request($data, bBroadcast, 'SetHalfFreqSetMode');
    req.destination = addr;
    req.deviceType = 1;
    req.port = portAddr;
    req.rcvIndex = scanBoardAddr;
    req.address = AddressMapping.HalfFreqSetModeAddr;
    await this.connection.send(req);
  }

  // #13223
  async ReadCascadeDiretion(
    addr: number,
    portAddr: number,
    scanBoardAddr: number
  ): Promise<number> {
    const req = new Request(AddressMapping.CascadeDiretionOccupancy, 'ReadCascadeDiretion');
    req.destination = addr;
    req.deviceType = 1;
    req.port = portAddr;
    req.rcvIndex = scanBoardAddr;
    req.address = AddressMapping.CascadeDiretionAddr;
    return decodeUIntLE(await this.connection.send(req));
  }

  // #13250
  async SetCascadeDiretion(
    addr: number,
    portAddr: number,
    scanBoardAddr: number,
    bBroadcast: boolean,
    cascadeDiretion: ModuleCascadeDiretionEnum
  ): Promise<void> {
    const $data = encodeUIntLE(cascadeDiretion, AddressMapping.CascadeDiretionOccupancy);
    const req = new Request($data, bBroadcast, 'SetCascadeDiretion');
    req.destination = addr;
    req.deviceType = 1;
    req.port = portAddr;
    req.rcvIndex = scanBoardAddr;
    req.address = AddressMapping.CascadeDiretionAddr;
    await this.connection.send(req);
  }

  // #13260
  async ReadTotalPointInTable(
    addr: number,
    portAddr: number,
    scanBoardAddr: number
  ): Promise<number> {
    const req = new Request(AddressMapping.TotalPointInTableOccupancy, 'ReadTotalPointInTable');
    req.destination = addr;
    req.deviceType = 1;
    req.port = portAddr;
    req.rcvIndex = scanBoardAddr;
    req.address = AddressMapping.TotalPointInTableAddr;
    return decodeUIntLE(await this.connection.send(req));
  }

  // #13280
  async SetTotalPointInTable(
    addr: number,
    portAddr: number,
    scanBoardAddr: number,
    bBroadcast: boolean,
    totalPointInTable: number
  ): Promise<void> {
    const $data = encodeUIntLE(totalPointInTable, AddressMapping.TotalPointInTableOccupancy);
    const req = new Request($data, bBroadcast, 'SetTotalPointInTable');
    req.destination = addr;
    req.deviceType = 1;
    req.port = portAddr;
    req.rcvIndex = scanBoardAddr;
    req.address = AddressMapping.TotalPointInTableAddr;
    await this.connection.send(req);
  }

  // #13290
  async ReadPointNumPerDrive(
    addr: number,
    portAddr: number,
    scanBoardAddr: number
  ): Promise<number> {
    const req = new Request(AddressMapping.PointNumPerDriveOccupancy, 'ReadPointNumPerDrive');
    req.destination = addr;
    req.deviceType = 1;
    req.port = portAddr;
    req.rcvIndex = scanBoardAddr;
    req.address = AddressMapping.PointNumPerDriveAddr;
    return decodeUIntLE(await this.connection.send(req));
  }

  // #13310
  async SetPointNumPerDrive(
    addr: number,
    portAddr: number,
    scanBoardAddr: number,
    bBroadcast: boolean,
    pointNumPerDrive: number
  ): Promise<void> {
    const $data = encodeUIntLE(pointNumPerDrive, AddressMapping.PointNumPerDriveOccupancy);
    const req = new Request($data, bBroadcast, 'SetPointNumPerDrive');
    req.destination = addr;
    req.deviceType = 1;
    req.port = portAddr;
    req.rcvIndex = scanBoardAddr;
    req.address = AddressMapping.PointNumPerDriveAddr;
    await this.connection.send(req);
  }

  // #13320
  async ReadIrregularScreenDrive(
    addr: number,
    portAddr: number,
    scanBoardAddr: number
  ): Promise<number> {
    const req = new Request(
      AddressMapping.IrregularScreenDriveOccupancy,
      'ReadIrregularScreenDrive'
    );
    req.destination = addr;
    req.deviceType = 1;
    req.port = portAddr;
    req.rcvIndex = scanBoardAddr;
    req.address = AddressMapping.IrregularScreenDriveAddr;
    return decodeUIntLE(await this.connection.send(req));
  }

  // #13348
  async SetIrregularScreenDrive(
    addr: number,
    portAddr: number,
    scanBoardAddr: number,
    bBroadcast: boolean,
    isIrregularScreenDrive: boolean
  ): Promise<void> {
    const req = new Request(
      isIrregularScreenDrive ? [1] : [0],
      bBroadcast,
      'SetIrregularScreenDrive'
    );
    req.destination = addr;
    req.deviceType = 1;
    req.port = portAddr;
    req.rcvIndex = scanBoardAddr;
    req.address = AddressMapping.IrregularScreenDriveAddr;
    await this.connection.send(req);
  }

  // #13366
  async ReadLogicalTotalDataGroupNum(
    addr: number,
    portAddr: number,
    scanBoardAddr: number
  ): Promise<number> {
    const req = new Request(
      AddressMapping.LogicalTotalDataGroupNumOccupancy,
      'ReadLogicalTotalDataGroupNum'
    );
    req.destination = addr;
    req.deviceType = 1;
    req.port = portAddr;
    req.rcvIndex = scanBoardAddr;
    req.address = AddressMapping.LogicalTotalDataGroupNumAddr;
    return decodeUIntLE(await this.connection.send(req));
  }

  // #13386
  async SetLogicalTotalDataGroupNum(
    addr: number,
    portAddr: number,
    scanBoardAddr: number,
    bBroadcast: boolean,
    logicalDataGroupNum: number
  ): Promise<void> {
    const $data = encodeUIntLE(
      logicalDataGroupNum,
      AddressMapping.LogicalTotalDataGroupNumOccupancy
    );
    const req = new Request($data, bBroadcast, 'SetLogicalTotalDataGroupNum');
    req.destination = addr;
    req.deviceType = 1;
    req.port = portAddr;
    req.rcvIndex = scanBoardAddr;
    req.address = AddressMapping.LogicalTotalDataGroupNumAddr;
    await this.connection.send(req);
  }

  // #13396
  async ReadDriverFucntion(addr: number, portAddr: number, scanBoardAddr: number): Promise<number> {
    const req = new Request(AddressMapping.DriverFucntionOccupancy, 'ReadDriverFucntion');
    req.destination = addr;
    req.deviceType = 1;
    req.port = portAddr;
    req.rcvIndex = scanBoardAddr;
    req.address = AddressMapping.DriverFucntionAddr;
    return decodeUIntLE(await this.connection.send(req));
  }

  // #13416
  async SetDriverFucntion(
    addr: number,
    portAddr: number,
    scanBoardAddr: number,
    bBroadcast: boolean,
    driverFunc: number
  ): Promise<void> {
    const $data = encodeUIntLE(driverFunc, AddressMapping.DriverFucntionOccupancy);
    const req = new Request($data, bBroadcast, 'SetDriverFucntion');
    req.destination = addr;
    req.deviceType = 1;
    req.port = portAddr;
    req.rcvIndex = scanBoardAddr;
    req.address = AddressMapping.DriverFucntionAddr;
    await this.connection.send(req);
  }

  // #13426
  async ReadDExtendMode(addr: number, portAddr: number, scanBoardAddr: number): Promise<number> {
    const req = new Request(AddressMapping.DExtendModeOccupancy, 'ReadDExtendMode');
    req.destination = addr;
    req.deviceType = 1;
    req.port = portAddr;
    req.rcvIndex = scanBoardAddr;
    req.address = AddressMapping.DExtendModeAddr;
    return decodeUIntLE(await this.connection.send(req));
  }

  // #13446
  async SetDExtendMode(
    addr: number,
    portAddr: number,
    scanBoardAddr: number,
    bBroadcast: boolean,
    extendMode: number
  ): Promise<void> {
    const $data = encodeUIntLE(extendMode, AddressMapping.DExtendModeOccupancy);
    const req = new Request($data, bBroadcast, 'SetDExtendMode');
    req.destination = addr;
    req.deviceType = 1;
    req.port = portAddr;
    req.rcvIndex = scanBoardAddr;
    req.address = AddressMapping.DExtendModeAddr;
    await this.connection.send(req);
  }

  // #13456
  async ReadGrayDepth(addr: number, portAddr: number, scanBoardAddr: number): Promise<number> {
    const req = new Request(AddressMapping.GrayDepthOccupancy, 'ReadGrayDepth');
    req.destination = addr;
    req.deviceType = 1;
    req.port = portAddr;
    req.rcvIndex = scanBoardAddr;
    req.address = AddressMapping.GrayDepthAddr;
    return decodeUIntLE(await this.connection.send(req));
  }

  // #13476
  async SetGrayDepth(
    addr: number,
    portAddr: number,
    scanBoardAddr: number,
    bBroadcast: boolean,
    grayDepth: number
  ): Promise<void> {
    const $data = encodeUIntLE(grayDepth, AddressMapping.GrayDepthOccupancy);
    const req = new Request($data, bBroadcast, 'SetGrayDepth');
    req.destination = addr;
    req.deviceType = 1;
    req.port = portAddr;
    req.rcvIndex = scanBoardAddr;
    req.address = AddressMapping.GrayDepthAddr;
    await this.connection.send(req);
  }

  // #13486
  async ReadGrayMode(addr: number, portAddr: number, scanBoardAddr: number): Promise<number> {
    const req = new Request(AddressMapping.GrayModeOccupancy, 'ReadGrayMode');
    req.destination = addr;
    req.deviceType = 1;
    req.port = portAddr;
    req.rcvIndex = scanBoardAddr;
    req.address = AddressMapping.GrayModeAddr;
    return decodeUIntLE(await this.connection.send(req));
  }

  // #13524
  async SetGrayMode(
    addr: number,
    portAddr: number,
    scanBoardAddr: number,
    bBroadcast: boolean,
    grayRealize: GrayRealizeTypeEnum,
    grayMode: GrayModeTypeEnum
  ): Promise<void> {
    const $data = encodeUIntLE((grayRealize << 4) + grayMode, AddressMapping.GrayModeOccupancy);
    const req = new Request($data, bBroadcast, 'SetGrayMode');
    req.destination = addr;
    req.deviceType = 1;
    req.port = portAddr;
    req.rcvIndex = scanBoardAddr;
    req.address = AddressMapping.GrayModeAddr;
    await this.connection.send(req);
  }

  // #13535
  async ReadRefNumPerVs(addr: number, portAddr: number, scanBoardAddr: number): Promise<number> {
    const req = new Request(AddressMapping.RefNumPerVsOccupancy, 'ReadRefNumPerVs');
    req.destination = addr;
    req.deviceType = 1;
    req.port = portAddr;
    req.rcvIndex = scanBoardAddr;
    req.address = AddressMapping.RefNumPerVsAddr;
    return decodeUIntLE(await this.connection.send(req));
  }

  // #13555
  async SetRefNumPerVs(
    addr: number,
    portAddr: number,
    scanBoardAddr: number,
    bBroadcast: boolean,
    refNumPerVs: number
  ): Promise<void> {
    const $data = encodeUIntLE(refNumPerVs, AddressMapping.RefNumPerVsOccupancy);
    const req = new Request($data, bBroadcast, 'SetRefNumPerVs');
    req.destination = addr;
    req.deviceType = 1;
    req.port = portAddr;
    req.rcvIndex = scanBoardAddr;
    req.address = AddressMapping.RefNumPerVsAddr;
    await this.connection.send(req);
  }

  // #13567
  async ReadGhostRemoveMode(
    addr: number,
    portAddr: number,
    scanBoardAddr: number
  ): Promise<number> {
    const req = new Request(AddressMapping.GhostRemoveModeOccupancy, 'ReadGhostRemoveMode');
    req.destination = addr;
    req.deviceType = 1;
    req.port = portAddr;
    req.rcvIndex = scanBoardAddr;
    req.address = AddressMapping.GhostRemoveModeAddr;
    return decodeUIntLE(await this.connection.send(req));
  }

  // #13594
  async SetGhostRemoveMode(
    addr: number,
    portAddr: number,
    scanBoardAddr: number,
    bBroadcast: boolean,
    ghostRemoveMode: GhostRemoveModeTypeEnum
  ): Promise<void> {
    const $data = encodeUIntLE(ghostRemoveMode, AddressMapping.GhostRemoveModeOccupancy);
    const req = new Request($data, bBroadcast, 'SetGhostRemoveMode');
    req.destination = addr;
    req.deviceType = 1;
    req.port = portAddr;
    req.rcvIndex = scanBoardAddr;
    req.address = AddressMapping.GhostRemoveModeAddr;
    await this.connection.send(req);
  }

  // #13604
  async ReadBlankUnitNumPerScan(
    addr: number,
    portAddr: number,
    scanBoardAddr: number
  ): Promise<number> {
    const req = new Request(AddressMapping.BlankUnitNumPerScanOccupancy, 'ReadBlankUnitNumPerScan');
    req.destination = addr;
    req.deviceType = 1;
    req.port = portAddr;
    req.rcvIndex = scanBoardAddr;
    req.address = AddressMapping.BlankUnitNumPerScanAddr;
    return decodeUIntLE(await this.connection.send(req));
  }

  // #13624
  async SetBlankUnitNumPerScan(
    addr: number,
    portAddr: number,
    scanBoardAddr: number,
    bBroadcast: boolean,
    blankUnitNumPerScan: number
  ): Promise<void> {
    const $data = encodeUIntLE(blankUnitNumPerScan, AddressMapping.BlankUnitNumPerScanOccupancy);
    const req = new Request($data, bBroadcast, 'SetBlankUnitNumPerScan');
    req.destination = addr;
    req.deviceType = 1;
    req.port = portAddr;
    req.rcvIndex = scanBoardAddr;
    req.address = AddressMapping.BlankUnitNumPerScanAddr;
    await this.connection.send(req);
  }

  // #13634
  async ReadRowChangePoint(addr: number, portAddr: number, scanBoardAddr: number): Promise<number> {
    const req = new Request(AddressMapping.RowChangePointOccupancy, 'ReadRowChangePoint');
    req.destination = addr;
    req.deviceType = 1;
    req.port = portAddr;
    req.rcvIndex = scanBoardAddr;
    req.address = AddressMapping.RowChangePointAddr;
    return decodeUIntLE(await this.connection.send(req));
  }

  // #13654
  async SetRowChangePoint(
    addr: number,
    portAddr: number,
    scanBoardAddr: number,
    bBroadcast: boolean,
    rowChangePoint: number
  ): Promise<void> {
    const $data = encodeUIntLE(rowChangePoint, AddressMapping.RowChangePointOccupancy);
    const req = new Request($data, bBroadcast, 'SetRowChangePoint');
    req.destination = addr;
    req.deviceType = 1;
    req.port = portAddr;
    req.rcvIndex = scanBoardAddr;
    req.address = AddressMapping.RowChangePointAddr;
    await this.connection.send(req);
  }

  // #13664
  async ReadABCDRollOver(addr: number, portAddr: number, scanBoardAddr: number): Promise<number> {
    const req = new Request(AddressMapping.ABCDRollOverOccupancy, 'ReadABCDRollOver');
    req.destination = addr;
    req.deviceType = 1;
    req.port = portAddr;
    req.rcvIndex = scanBoardAddr;
    req.address = AddressMapping.ABCDRollOverAddr;
    return decodeUIntLE(await this.connection.send(req));
  }

  // #13696
  async SetABCDRollOver(
    addr: number,
    portAddr: number,
    scanBoardAddr: number,
    bBroadcast: boolean,
    isRollOver: boolean
  ): Promise<void> {
    const req = new Request(!isRollOver ? Buffer.alloc(1) : [1], bBroadcast, 'SetABCDRollOver');
    req.destination = addr;
    req.deviceType = 1;
    req.port = portAddr;
    req.rcvIndex = scanBoardAddr;
    req.address = AddressMapping.ABCDRollOverAddr;
    await this.connection.send(req);
  }

  SetABCDRollOver_1 = (): void => {
    throw new TypeError('Not implemented');
  };

  // #13746
  async ReadGclkNumPerScan(addr: number, portAddr: number, scanBoardAddr: number): Promise<number> {
    const req = new Request(AddressMapping.GclkNumPerScanOccupancy, 'ReadGclkNumPerScan');
    req.destination = addr;
    req.deviceType = 1;
    req.port = portAddr;
    req.rcvIndex = scanBoardAddr;
    req.address = AddressMapping.GclkNumPerScanAddr;
    return decodeUIntLE(await this.connection.send(req));
  }

  // #13766
  async SetGclkNumPerScan(
    addr: number,
    portAddr: number,
    scanBoardAddr: number,
    bBroadcast: boolean,
    gclkNumPerScan: number
  ): Promise<void> {
    const $data = encodeUIntLE(gclkNumPerScan, AddressMapping.GclkNumPerScanOccupancy);
    const req = new Request($data, bBroadcast, 'SetGclkNumPerScan');
    req.destination = addr;
    req.deviceType = 1;
    req.port = portAddr;
    req.rcvIndex = scanBoardAddr;
    req.address = AddressMapping.GclkNumPerScanAddr;
    await this.connection.send(req);
  }

  // #13776
  async ReadLightTimePerSubFieldRatio(
    addr: number,
    portAddr: number,
    scanBoardAddr: number
  ): Promise<number> {
    const req = new Request(
      AddressMapping.LightTimePerSubFieldRatioOccupancy,
      'ReadLightTimePerSubFieldRatio'
    );
    req.destination = addr;
    req.deviceType = 1;
    req.port = portAddr;
    req.rcvIndex = scanBoardAddr;
    req.address = AddressMapping.LightTimePerSubFieldRatioAddr;
    return decodeUIntLE(await this.connection.send(req));
  }

  // #13796
  async SetLightTimePerSubFieldRatio(
    addr: number,
    portAddr: number,
    scanBoardAddr: number,
    bBroadcast: boolean,
    lightTimePerSubFieldRatio: number
  ): Promise<void> {
    const $data = encodeUIntLE(
      lightTimePerSubFieldRatio,
      AddressMapping.LightTimePerSubFieldRatioOccupancy
    );
    const req = new Request($data, bBroadcast, 'SetLightTimePerSubFieldRatio');
    req.destination = addr;
    req.deviceType = 1;
    req.port = portAddr;
    req.rcvIndex = scanBoardAddr;
    req.address = AddressMapping.LightTimePerSubFieldRatioAddr;
    await this.connection.send(req);
  }

  // #13806
  async ReadShiftUnitNumPerSubField(
    addr: number,
    portAddr: number,
    scanBoardAddr: number
  ): Promise<number> {
    const req = new Request(
      AddressMapping.ShiftUnitNumPerSubFieldOccupancy,
      'ReadShiftUnitNumPerSubField'
    );
    req.destination = addr;
    req.deviceType = 1;
    req.port = portAddr;
    req.rcvIndex = scanBoardAddr;
    req.address = AddressMapping.ShiftUnitNumPerSubFieldAddr;
    return decodeUIntLE(await this.connection.send(req));
  }

  // #13826
  async SetShiftUnitNumPerSubField(
    addr: number,
    portAddr: number,
    scanBoardAddr: number,
    bBroadcast: boolean,
    shiftUnitNumPerSubField: number
  ): Promise<void> {
    const $data = encodeUIntLE(
      shiftUnitNumPerSubField,
      AddressMapping.ShiftUnitNumPerSubFieldOccupancy
    );
    const req = new Request($data, bBroadcast, 'SetShiftUnitNumPerSubField');
    req.destination = addr;
    req.deviceType = 1;
    req.port = portAddr;
    req.rcvIndex = scanBoardAddr;
    req.address = AddressMapping.ShiftUnitNumPerSubFieldAddr;
    await this.connection.send(req);
  }

  // #13836
  async ReadTotalLightCdfResault(
    addr: number,
    portAddr: number,
    scanBoardAddr: number
  ): Promise<number> {
    const req = new Request(
      AddressMapping.ScannerTotalLightCdfResaultOccupancy,
      'ReadTotalLightCdfResault'
    );
    req.destination = addr;
    req.deviceType = 1;
    req.port = portAddr;
    req.rcvIndex = scanBoardAddr;
    req.address = AddressMapping.ScannerTotalLightCdfResaultddr;
    return decodeUIntLE(await this.connection.send(req));
  }

  // #13856
  async SetTotalLightCdfResault(
    addr: number,
    portAddr: number,
    scanBoardAddr: number,
    bBroadcast: boolean,
    TotalLightCdfResault: number
  ): Promise<void> {
    const $data = encodeUIntLE(
      TotalLightCdfResault,
      AddressMapping.ScannerTotalLightCdfResaultOccupancy
    );
    const req = new Request($data, bBroadcast, 'SetTotalLightCdfResault');
    req.destination = addr;
    req.deviceType = 1;
    req.port = portAddr;
    req.rcvIndex = scanBoardAddr;
    req.address = AddressMapping.ScannerTotalLightCdfResaultddr;
    await this.connection.send(req);
  }

  // #13866
  async ReadTotalUnitNumPerSubField(
    addr: number,
    portAddr: number,
    scanBoardAddr: number
  ): Promise<number> {
    const req = new Request(
      AddressMapping.TotalUnitNumPerSubFieldOccupancy,
      'ReadTotalUnitNumPerSubField'
    );
    req.destination = addr;
    req.deviceType = 1;
    req.port = portAddr;
    req.rcvIndex = scanBoardAddr;
    req.address = AddressMapping.TotalUnitNumPerSubFieldAddr;
    return decodeUIntLE(await this.connection.send(req));
  }

  // #13886
  async SetTotalUnitNumPerSubField(
    addr: number,
    portAddr: number,
    scanBoardAddr: number,
    bBroadcast: boolean,
    totalUnitNumPerSubField: number
  ): Promise<void> {
    const $data = encodeUIntLE(
      totalUnitNumPerSubField,
      AddressMapping.TotalUnitNumPerSubFieldOccupancy
    );
    const req = new Request($data, bBroadcast, 'SetTotalUnitNumPerSubField');
    req.destination = addr;
    req.deviceType = 1;
    req.port = portAddr;
    req.rcvIndex = scanBoardAddr;
    req.address = AddressMapping.TotalUnitNumPerSubFieldAddr;
    await this.connection.send(req);
  }

  // #13896
  async ReadLightTimePerSubField(
    addr: number,
    portAddr: number,
    scanBoardAddr: number
  ): Promise<number> {
    const req = new Request(
      AddressMapping.LightTimePerSubFieldOccupancy,
      'ReadLightTimePerSubField'
    );
    req.destination = addr;
    req.deviceType = 1;
    req.port = portAddr;
    req.rcvIndex = scanBoardAddr;
    req.address = AddressMapping.LightTimePerSubFieldAddr;
    return decodeUIntLE(await this.connection.send(req));
  }

  // #13916
  async SetLightTimePerSubField(
    addr: number,
    portAddr: number,
    scanBoardAddr: number,
    bBroadcast: boolean,
    lightTimePerSubField: number
  ): Promise<void> {
    const $data = encodeUIntLE(lightTimePerSubField, AddressMapping.LightTimePerSubFieldOccupancy);
    const req = new Request($data, bBroadcast, 'SetLightTimePerSubField');
    req.destination = addr;
    req.deviceType = 1;
    req.port = portAddr;
    req.rcvIndex = scanBoardAddr;
    req.address = AddressMapping.LightTimePerSubFieldAddr;
    await this.connection.send(req);
  }

  // #13926
  async ReadDclkUnitCycle(addr: number, portAddr: number, scanBoardAddr: number): Promise<number> {
    const req = new Request(AddressMapping.DclkUnitCycleOccupancy, 'ReadDclkUnitCycle');
    req.destination = addr;
    req.deviceType = 1;
    req.port = portAddr;
    req.rcvIndex = scanBoardAddr;
    req.address = AddressMapping.DclkUnitCycleAddr;
    return decodeUIntLE(await this.connection.send(req));
  }

  // #13946
  async SetDclkUnitCycle(
    addr: number,
    portAddr: number,
    scanBoardAddr: number,
    bBroadcast: boolean,
    dclkUnitCycle: number
  ): Promise<void> {
    const $data = encodeUIntLE(dclkUnitCycle, AddressMapping.DclkUnitCycleOccupancy);
    const req = new Request($data, bBroadcast, 'SetDclkUnitCycle');
    req.destination = addr;
    req.deviceType = 1;
    req.port = portAddr;
    req.rcvIndex = scanBoardAddr;
    req.address = AddressMapping.DclkUnitCycleAddr;
    await this.connection.send(req);
  }

  // #13956
  async ReadDclkPhase(addr: number, portAddr: number, scanBoardAddr: number): Promise<number> {
    const req = new Request(AddressMapping.DclkPhaseOccupancy, 'ReadDclkPhase');
    req.destination = addr;
    req.deviceType = 1;
    req.port = portAddr;
    req.rcvIndex = scanBoardAddr;
    req.address = AddressMapping.DclkPhaseAddr;
    return decodeUIntLE(await this.connection.send(req));
  }

  // #13976
  async SetDclkPhase(
    addr: number,
    portAddr: number,
    scanBoardAddr: number,
    bBroadcast: boolean,
    dclkPhase: number
  ): Promise<void> {
    const $data = encodeUIntLE(dclkPhase, AddressMapping.DclkPhaseOccupancy);
    const req = new Request($data, bBroadcast, 'SetDclkPhase');
    req.destination = addr;
    req.deviceType = 1;
    req.port = portAddr;
    req.rcvIndex = scanBoardAddr;
    req.address = AddressMapping.DclkPhaseAddr;
    await this.connection.send(req);
  }

  // #13986
  async ReadDclkHigh(addr: number, portAddr: number, scanBoardAddr: number): Promise<number> {
    const req = new Request(AddressMapping.DclkHighOccupancy, 'ReadDclkHigh');
    req.destination = addr;
    req.deviceType = 1;
    req.port = portAddr;
    req.rcvIndex = scanBoardAddr;
    req.address = AddressMapping.DclkHighAddr;
    return decodeUIntLE(await this.connection.send(req));
  }

  // #14006
  async SetDclkHigh(
    addr: number,
    portAddr: number,
    scanBoardAddr: number,
    bBroadcast: boolean,
    dclkHigh: number
  ): Promise<void> {
    const $data = encodeUIntLE(dclkHigh, AddressMapping.DclkHighOccupancy);
    const req = new Request($data, bBroadcast, 'SetDclkHigh');
    req.destination = addr;
    req.deviceType = 1;
    req.port = portAddr;
    req.rcvIndex = scanBoardAddr;
    req.address = AddressMapping.DclkHighAddr;
    await this.connection.send(req);
  }

  // #14016
  async ReadGclkUnitCycle(addr: number, portAddr: number, scanBoardAddr: number): Promise<number> {
    const req = new Request(AddressMapping.GclkUnitCycleOccupancy, 'ReadGclkUnitCycle');
    req.destination = addr;
    req.deviceType = 1;
    req.port = portAddr;
    req.rcvIndex = scanBoardAddr;
    req.address = AddressMapping.GclkUnitCycleAddr;
    return decodeUIntLE(await this.connection.send(req));
  }

  // #14036
  async SetGclkUnitCycle(
    addr: number,
    portAddr: number,
    scanBoardAddr: number,
    bBroadcast: boolean,
    gclkUnitCycle: number
  ): Promise<void> {
    const $data = encodeUIntLE(gclkUnitCycle, AddressMapping.GclkUnitCycleOccupancy);
    const req = new Request($data, bBroadcast, 'SetGclkUnitCycle');
    req.destination = addr;
    req.deviceType = 1;
    req.port = portAddr;
    req.rcvIndex = scanBoardAddr;
    req.address = AddressMapping.GclkUnitCycleAddr;
    await this.connection.send(req);
  }

  // #14046
  async ReadGclkPhase(addr: number, portAddr: number, scanBoardAddr: number): Promise<number> {
    const req = new Request(AddressMapping.GclkPhaseOccupancy, 'ReadGclkPhase');
    req.destination = addr;
    req.deviceType = 1;
    req.port = portAddr;
    req.rcvIndex = scanBoardAddr;
    req.address = AddressMapping.GclkPhaseAddr;
    return decodeUIntLE(await this.connection.send(req));
  }

  // #14066
  async SetGclkPhase(
    addr: number,
    portAddr: number,
    scanBoardAddr: number,
    bBroadcast: boolean,
    gclkPhase: number
  ): Promise<void> {
    const $data = encodeUIntLE(gclkPhase, AddressMapping.GclkPhaseOccupancy);
    const req = new Request($data, bBroadcast, 'SetGclkPhase');
    req.destination = addr;
    req.deviceType = 1;
    req.port = portAddr;
    req.rcvIndex = scanBoardAddr;
    req.address = AddressMapping.GclkPhaseAddr;
    await this.connection.send(req);
  }

  // #14076
  async ReadGclkHigh(addr: number, portAddr: number, scanBoardAddr: number): Promise<number> {
    const req = new Request(AddressMapping.GclkHighOccupancy, 'ReadGclkHigh');
    req.destination = addr;
    req.deviceType = 1;
    req.port = portAddr;
    req.rcvIndex = scanBoardAddr;
    req.address = AddressMapping.GclkHighAddr;
    return decodeUIntLE(await this.connection.send(req));
  }

  // #14096
  async SetGclkHigh(
    addr: number,
    portAddr: number,
    scanBoardAddr: number,
    bBroadcast: boolean,
    gclkHigh: number
  ): Promise<void> {
    const $data = encodeUIntLE(gclkHigh, AddressMapping.GclkHighOccupancy);
    const req = new Request($data, bBroadcast, 'SetGclkHigh');
    req.destination = addr;
    req.deviceType = 1;
    req.port = portAddr;
    req.rcvIndex = scanBoardAddr;
    req.address = AddressMapping.GclkHighAddr;
    await this.connection.send(req);
  }

  // #14106
  async ReadSubField(addr: number, portAddr: number, scanBoardAddr: number): Promise<Buffer> {
    const req = new Request(
      AddressMapping.PartNumPerRefOccupancy +
        AddressMapping.SubFieldNum * AddressMapping.SubFieldOccupancy,
      'ReadSubField'
    );
    req.destination = addr;
    req.deviceType = 1;
    req.port = portAddr;
    req.rcvIndex = scanBoardAddr;
    req.address = AddressMapping.PartNumPerRefAddr;
    return (await this.connection.send(req)).data;
  }

  SetSubField = (): void => {
    throw new TypeError('Not implemented');
  };

  // #14152
  async ReadRowsCtrlByDataGroup(
    addr: number,
    portAddr: number,
    scanBoardAddr: number
  ): Promise<Buffer> {
    const req = new Request(
      AddressMapping.RowsCtrlByDataGroupOccupancy * AddressMapping.RowsCtrlByDataGroupNum,
      'ReadRowsCtrlByDataGroup'
    );
    req.destination = addr;
    req.deviceType = 1;
    req.port = portAddr;
    req.rcvIndex = scanBoardAddr;
    req.address = AddressMapping.RowsCtrlByDataGroupAddr;
    return (await this.connection.send(req)).data;
  }

  // #14172
  async SetRowsCtrlByDataGroup(
    addr: number,
    portAddr: number,
    scanBoardAddr: number,
    bBroadcast: boolean,
    countCtrlByDataGroup: number[] | Buffer
  ): Promise<void> {
    if (
      countCtrlByDataGroup.length !==
      AddressMapping.RowsCtrlByDataGroupOccupancy * AddressMapping.RowsCtrlByDataGroupNum
    )
      throw new TypeError(`Invalid buffer size: ${countCtrlByDataGroup.length}`);
    const req = new Request(countCtrlByDataGroup, bBroadcast, 'SetRowsCtrlByDataGroup');
    req.destination = addr;
    req.deviceType = 1;
    req.port = portAddr;
    req.rcvIndex = scanBoardAddr;
    req.address = AddressMapping.RowsCtrlByDataGroupAddr;
    await this.connection.send(req);
  }

  // #14187
  async ReadTotalGclkUnitNumPerScan(
    addr: number,
    portAddr: number,
    scanBoardAddr: number
  ): Promise<number> {
    const req = new Request(
      AddressMapping.TotalGclkUnitNumPerScanOccupancy,
      'ReadTotalGclkUnitNumPerScan'
    );
    req.destination = addr;
    req.deviceType = 1;
    req.port = portAddr;
    req.rcvIndex = scanBoardAddr;
    req.address = AddressMapping.TotalGclkUnitNumPerScanAddr;
    return decodeUIntLE(await this.connection.send(req));
  }

  // #14207
  async SetTotalGclkUnitNumPerScan(
    addr: number,
    portAddr: number,
    scanBoardAddr: number,
    bBroadcast: boolean,
    totalGclk: number
  ): Promise<void> {
    const $data = encodeUIntLE(totalGclk, AddressMapping.TotalGclkUnitNumPerScanOccupancy);
    const req = new Request($data, bBroadcast, 'SetTotalGclkUnitNumPerScan');
    req.destination = addr;
    req.deviceType = 1;
    req.port = portAddr;
    req.rcvIndex = scanBoardAddr;
    req.address = AddressMapping.TotalGclkUnitNumPerScanAddr;
    await this.connection.send(req);
  }

  // #14217
  async ReadCorrectionOn(addr: number, portAddr: number, scanBoardAddr: number): Promise<number> {
    const req = new Request(AddressMapping.CorrectionOnOccupancy, 'ReadCorrectionOn');
    req.destination = addr;
    req.deviceType = 1;
    req.port = portAddr;
    req.rcvIndex = scanBoardAddr;
    req.address = AddressMapping.CorrectionOnAddr;
    return decodeUIntLE(await this.connection.send(req));
  }

  // #14226
  async SetCorrectionOnROELine(
    addr: number,
    portAddr: number,
    scanBoardAddr: number,
    bBroadcast: boolean,
    correctionInfo: number[] | Buffer
  ): Promise<void> {
    if (correctionInfo.length !== AddressMapping.CorrectionOnOccupancy)
      throw new TypeError(`Invalid buffer size: ${correctionInfo.length}`);
    const req = new Request(correctionInfo, bBroadcast, 'SetCorrectionOnROELine');
    req.destination = addr;
    req.deviceType = 1;
    req.port = portAddr;
    req.rcvIndex = scanBoardAddr;
    req.address = AddressMapping.CorrectionOnAddr;
    await this.connection.send(req);
  }

  // #14288
  async SetCorrectionOnEx(
    addr: number,
    portAddr: number,
    scanBoardAddr: number,
    bBroadcast: boolean,
    bCorrectionOn: boolean
  ): Promise<void> {
    const req = new Request(bCorrectionOn ? [5] : [0], bBroadcast, 'SetCorrectionOnEx');
    req.destination = addr;
    req.deviceType = 1;
    req.port = portAddr;
    req.rcvIndex = scanBoardAddr;
    req.address = AddressMapping.CorrectionOnExAddr;
    await this.connection.send(req);
  }

  // #14307
  async SetCorrectionOn(
    addr: number,
    portAddr: number,
    scanBoardAddr: number,
    bBroadcast: boolean,
    bCorrectionOn: boolean
  ): Promise<void> {
    const req = new Request(bCorrectionOn ? [1] : [0], bBroadcast, 'SetCorrectionOn');
    req.destination = addr;
    req.deviceType = 1;
    req.port = portAddr;
    req.rcvIndex = scanBoardAddr;
    req.address = AddressMapping.CorrectionOnAddr;
    await this.connection.send(req);
  }

  // #14326
  async SetCorrectionOn_1(
    addr: number,
    portAddr: number,
    scanBoardAddr: number,
    bBroadcast: boolean,
    isOpenCorrect: boolean,
    type: CorrectTypeEnum,
    retainClrInfo: boolean
  ): Promise<void> {
    const req = new Request(
      [0, 0 | (isOpenCorrect ? 1 : 0), 0 | (type << 1), 0 | (!retainClrInfo ? 4 : 0)],
      bBroadcast,
      'SetCorrectionOn_1'
    );
    req.destination = addr;
    req.deviceType = 1;
    req.port = portAddr;
    req.rcvIndex = scanBoardAddr;
    req.address = AddressMapping.CorrectionOnAddr;
    await this.connection.send(req);
  }

  // #14340
  async SetCorrectionOn_2(
    addr: number,
    portAddr: number,
    scanBoardAddr: number,
    bBroadcast: boolean,
    data: number
  ): Promise<void> {
    const req = new Request([data], bBroadcast, 'SetCorrectionOn_2');
    req.destination = addr;
    req.deviceType = 1;
    req.port = portAddr;
    req.rcvIndex = scanBoardAddr;
    req.address = AddressMapping.CorrectionOnAddr;
    await this.connection.send(req);
  }

  SetLowlumCorrectionOn = (): void => {
    throw new TypeError('Not implemented');
  };

  // #14362
  async SetCorrectionOnROE(
    addr: number,
    portAddr: number,
    scanBoardAddr: number,
    bBroadcast: boolean,
    isOpenCorrect: boolean,
    type: CorrectTypeEnum,
    retainClrInfo: boolean
  ): Promise<void> {
    const req = new Request(
      isOpenCorrect
        ? [0 | 128]
        : [0, 0 | (isOpenCorrect ? 1 : 0), 0 | (type << 1), 0 | (!retainClrInfo ? 4 : 0)],
      bBroadcast,
      'SetCorrectionOnROE'
    );
    req.destination = addr;
    req.deviceType = 1;
    req.port = portAddr;
    req.rcvIndex = scanBoardAddr;
    req.address = AddressMapping.CorrectionOnAddr;
    await this.connection.send(req);
  }

  // #14380
  async SetCorrectionOnROELine_1(
    addr: number,
    portAddr: number,
    scanBoardAddr: number,
    bBroadcast: boolean,
    isOpenCorrect: boolean,
    type: CorrectTypeEnum,
    retainClrInfo: boolean
  ): Promise<void> {
    const req = new Request(
      isOpenCorrect
        ? [0 | 64]
        : [0, 0 | (isOpenCorrect ? 1 : 0), 0 | (type << 1), 0 | (!retainClrInfo ? 4 : 0)],
      bBroadcast,
      'SetCorrectionOnROELine_1'
    );
    req.destination = addr;
    req.deviceType = 1;
    req.port = portAddr;
    req.rcvIndex = scanBoardAddr;
    req.address = AddressMapping.CorrectionOnAddr;
    await this.connection.send(req);
  }

  // #14398
  async SetBrightDarkLineFixState(
    addr: number,
    portAddr: number,
    scanBoardAddr: number,
    bBroadcast: boolean,
    stateByte: number
  ): Promise<void> {
    const req = new Request([stateByte], bBroadcast, 'SetBrightDarkLineFixState');
    req.destination = addr;
    req.deviceType = 1;
    req.port = portAddr;
    req.rcvIndex = scanBoardAddr;
    req.address = AddressMapping.BrightDarkLineFixStateAddr;
    await this.connection.send(req);
  }

  SetBrightDarkLineFixStateEx = (): void => {
    throw new TypeError('Not implemented');
  };

  // #14421
  async ReadCoefficientSource(
    addr: number,
    portAddr: number,
    scanBoardAddr: number
  ): Promise<number> {
    const req = new Request(AddressMapping.CoefficientSourceOccupancy, 'ReadCoefficientSource');
    req.destination = addr;
    req.deviceType = 1;
    req.port = portAddr;
    req.rcvIndex = scanBoardAddr;
    req.address = AddressMapping.CoefficientSourceAddr;
    return decodeUIntLE(await this.connection.send(req));
  }

  // #14448
  async SetCoefficientSource(
    addr: number,
    portAddr: number,
    scanBoardAddr: number,
    bBroadcast: boolean,
    coefficienceSource: CoefficientSourceTypeEnum
  ): Promise<void> {
    const $data = encodeUIntLE(coefficienceSource, AddressMapping.CoefficientSourceOccupancy);
    const req = new Request($data, bBroadcast, 'SetCoefficientSource');
    req.destination = addr;
    req.deviceType = 1;
    req.port = portAddr;
    req.rcvIndex = scanBoardAddr;
    req.address = AddressMapping.CoefficientSourceAddr;
    await this.connection.send(req);
  }

  // #14458
  async ReadShowLastFrameWhenCableNotConected(
    addr: number,
    portAddr: number,
    scanBoardAddr: number
  ): Promise<number> {
    const req = new Request(
      AddressMapping.ShowLastFrameWhenCableNotConectedOccupancy,
      'ReadShowLastFrameWhenCableNotConected'
    );
    req.destination = addr;
    req.deviceType = 1;
    req.port = portAddr;
    req.rcvIndex = scanBoardAddr;
    req.address = AddressMapping.ShowLastFrameWhenCableNotConectedAddr;
    return decodeUIntLE(await this.connection.send(req));
  }

  // #14485
  async SetShowLastFrameWhenCableNotConected(
    addr: number,
    portAddr: number,
    scanBoardAddr: number,
    bBroadcast: boolean,
    showMode: ShowTypeWhenPortDisconnectedEnum
  ): Promise<void> {
    const $data = encodeUIntLE(showMode, AddressMapping.ShowLastFrameWhenCableNotConectedOccupancy);
    const req = new Request($data, bBroadcast, 'SetShowLastFrameWhenCableNotConected');
    req.destination = addr;
    req.deviceType = 1;
    req.port = portAddr;
    req.rcvIndex = scanBoardAddr;
    req.address = AddressMapping.ShowLastFrameWhenCableNotConectedAddr;
    await this.connection.send(req);
  }

  // #14495
  async ReadDisplayModeWhenNoSignal(
    addr: number,
    portAddr: number,
    scanBoardAddr: number
  ): Promise<number> {
    const req = new Request(
      AddressMapping.ShowLastFrameWhenCableNotConectedOccupancy,
      'ReadDisplayModeWhenNoSignal'
    );
    req.destination = addr;
    req.deviceType = 1;
    req.port = portAddr;
    req.rcvIndex = scanBoardAddr;
    req.address = AddressMapping.ShowLastFrameWhenCableNotConectedAddr;
    return decodeUIntLE(await this.connection.send(req));
  }

  SetDisplayModeWhenNoSignal = (): void => {
    throw new TypeError('Not implemented');
  };

  // #14542
  async ReadABCDCode(addr: number, portAddr: number, scanBoardAddr: number): Promise<Buffer> {
    const req = new Request(AddressMapping.ABCDCodeOccupancy, 'ReadABCDCode');
    req.destination = addr;
    req.deviceType = 1;
    req.port = portAddr;
    req.rcvIndex = scanBoardAddr;
    req.address = AddressMapping.ABCDCodeAddr;
    return (await this.connection.send(req)).data;
  }

  SetABCDCode = (): void => {
    throw new TypeError('Not implemented');
  };

  // #14589
  async ReadLineBias(addr: number, portAddr: number, scanBoardAddr: number): Promise<number> {
    const req = new Request(AddressMapping.LineBiasOccupancy, 'ReadLineBias');
    req.destination = addr;
    req.deviceType = 1;
    req.port = portAddr;
    req.rcvIndex = scanBoardAddr;
    req.address = AddressMapping.LineBiasAddr;
    return decodeUIntLE(await this.connection.send(req));
  }

  // #14609
  async SetLineBias(
    addr: number,
    portAddr: number,
    scanBoardAddr: number,
    bBroadcast: boolean,
    lineBias: number
  ): Promise<void> {
    const $data = encodeUIntLE(lineBias, AddressMapping.LineBiasOccupancy);
    const req = new Request($data, bBroadcast, 'SetLineBias');
    req.destination = addr;
    req.deviceType = 1;
    req.port = portAddr;
    req.rcvIndex = scanBoardAddr;
    req.address = AddressMapping.LineBiasAddr;
    await this.connection.send(req);
  }

  // #14619
  async ReadRgbCode(addr: number, portAddr: number, scanBoardAddr: number): Promise<number> {
    const req = new Request(AddressMapping.RgbCodeOccupancy, 'ReadRgbCode');
    req.destination = addr;
    req.deviceType = 1;
    req.port = portAddr;
    req.rcvIndex = scanBoardAddr;
    req.address = AddressMapping.RgbCodeAddr;
    return decodeUIntLE(await this.connection.send(req));
  }

  // #14646
  async SetRgbCode(
    addr: number,
    portAddr: number,
    scanBoardAddr: number,
    bBroadcast: boolean,
    red: number,
    green: number,
    blue: number,
    virtualRed: number
  ): Promise<void> {
    const $data = encodeUIntLE(
      red | (green << 2) | (blue << 4) | (virtualRed << 6),
      AddressMapping.RgbCodeOccupancy
    );
    const req = new Request($data, bBroadcast, 'SetRgbCode');
    req.destination = addr;
    req.deviceType = 1;
    req.port = portAddr;
    req.rcvIndex = scanBoardAddr;
    req.address = AddressMapping.RgbCodeAddr;
    await this.connection.send(req);
  }

  // #14657
  async ReadRgain(addr: number, portAddr: number, scanBoardAddr: number): Promise<number> {
    const req = new Request(AddressMapping.RgainOccupancy, 'ReadRgain');
    req.destination = addr;
    req.deviceType = 1;
    req.port = portAddr;
    req.rcvIndex = scanBoardAddr;
    req.address = AddressMapping.RgainAddr;
    return decodeUIntLE(await this.connection.send(req));
  }

  // #14677
  async SetRgain(
    addr: number,
    portAddr: number,
    scanBoardAddr: number,
    bBroadcast: boolean,
    rgain: number
  ): Promise<void> {
    const $data = encodeUIntLE(rgain, AddressMapping.RgainOccupancy);
    const req = new Request($data, bBroadcast, 'SetRgain');
    req.destination = addr;
    req.deviceType = 1;
    req.port = portAddr;
    req.rcvIndex = scanBoardAddr;
    req.address = AddressMapping.RgainAddr;
    await this.connection.send(req);
  }

  // #14687
  async ReadGgain(addr: number, portAddr: number, scanBoardAddr: number): Promise<number> {
    const req = new Request(AddressMapping.GgainOccupancy, 'ReadGgain');
    req.destination = addr;
    req.deviceType = 1;
    req.port = portAddr;
    req.rcvIndex = scanBoardAddr;
    req.address = AddressMapping.GgainAddr;
    return decodeUIntLE(await this.connection.send(req));
  }

  // #14707
  async SetGgain(
    addr: number,
    portAddr: number,
    scanBoardAddr: number,
    bBroadcast: boolean,
    ggain: number
  ): Promise<void> {
    const $data = encodeUIntLE(ggain, AddressMapping.GgainOccupancy);
    const req = new Request($data, bBroadcast, 'SetGgain');
    req.destination = addr;
    req.deviceType = 1;
    req.port = portAddr;
    req.rcvIndex = scanBoardAddr;
    req.address = AddressMapping.GgainAddr;
    await this.connection.send(req);
  }

  // #14717
  async ReadBgain(addr: number, portAddr: number, scanBoardAddr: number): Promise<number> {
    const req = new Request(AddressMapping.BgainOccupancy, 'ReadBgain');
    req.destination = addr;
    req.deviceType = 1;
    req.port = portAddr;
    req.rcvIndex = scanBoardAddr;
    req.address = AddressMapping.BgainAddr;
    return decodeUIntLE(await this.connection.send(req));
  }

  // #14737
  async SetBgain(
    addr: number,
    portAddr: number,
    scanBoardAddr: number,
    bBroadcast: boolean,
    bgain: number
  ): Promise<void> {
    const $data = encodeUIntLE(bgain, AddressMapping.BgainOccupancy);
    const req = new Request($data, bBroadcast, 'SetBgain');
    req.destination = addr;
    req.deviceType = 1;
    req.port = portAddr;
    req.rcvIndex = scanBoardAddr;
    req.address = AddressMapping.BgainAddr;
    await this.connection.send(req);
  }

  // #14747
  async ReadVRgain(addr: number, portAddr: number, scanBoardAddr: number): Promise<number> {
    const req = new Request(AddressMapping.VRgainOccupancy, 'ReadVRgain');
    req.destination = addr;
    req.deviceType = 1;
    req.port = portAddr;
    req.rcvIndex = scanBoardAddr;
    req.address = AddressMapping.VRgainAddr;
    return decodeUIntLE(await this.connection.send(req));
  }

  // #14767
  async SetVRgain(
    addr: number,
    portAddr: number,
    scanBoardAddr: number,
    bBroadcast: boolean,
    vRgain: number
  ): Promise<void> {
    const $data = encodeUIntLE(vRgain, AddressMapping.VRgainOccupancy);
    const req = new Request($data, bBroadcast, 'SetVRgain');
    req.destination = addr;
    req.deviceType = 1;
    req.port = portAddr;
    req.rcvIndex = scanBoardAddr;
    req.address = AddressMapping.VRgainAddr;
    await this.connection.send(req);
  }

  // #14777
  async ReadThreshold(addr: number, portAddr: number, scanBoardAddr: number): Promise<number> {
    const req = new Request(AddressMapping.ThresholdOccupancy, 'ReadThreshold');
    req.destination = addr;
    req.deviceType = 1;
    req.port = portAddr;
    req.rcvIndex = scanBoardAddr;
    req.address = AddressMapping.ThresholdAddr;
    return decodeUIntLE(await this.connection.send(req));
  }

  // #14797
  async SetThreshold(
    addr: number,
    portAddr: number,
    scanBoardAddr: number,
    bBroadcast: boolean,
    threshold: number
  ): Promise<void> {
    const $data = encodeUIntLE(threshold, AddressMapping.ThresholdOccupancy);
    const req = new Request($data, bBroadcast, 'SetThreshold');
    req.destination = addr;
    req.deviceType = 1;
    req.port = portAddr;
    req.rcvIndex = scanBoardAddr;
    req.address = AddressMapping.ThresholdAddr;
    await this.connection.send(req);
  }

  // #14807
  async ReadSymmetricalOutputMode(
    addr: number,
    portAddr: number,
    scanBoardAddr: number
  ): Promise<number> {
    const req = new Request(
      AddressMapping.SymmetricalOutputModeOccupancy,
      'ReadSymmetricalOutputMode'
    );
    req.destination = addr;
    req.deviceType = 1;
    req.port = portAddr;
    req.rcvIndex = scanBoardAddr;
    req.address = AddressMapping.SymmetricalOutputModeAddr;
    return decodeUIntLE(await this.connection.send(req));
  }

  // #14827
  async SetSymmetricalOutputMode(
    addr: number,
    portAddr: number,
    scanBoardAddr: number,
    bBroadcast: boolean,
    outPutMode: number
  ): Promise<void> {
    const $data = encodeUIntLE(outPutMode, AddressMapping.SymmetricalOutputModeOccupancy);
    const req = new Request($data, bBroadcast, 'SetSymmetricalOutputMode');
    req.destination = addr;
    req.deviceType = 1;
    req.port = portAddr;
    req.rcvIndex = scanBoardAddr;
    req.address = AddressMapping.SymmetricalOutputModeAddr;
    await this.connection.send(req);
  }

  // #14837
  async ReadColorMatrix(addr: number, portAddr: number, scanBoardAddr: number): Promise<Buffer> {
    const req = new Request(
      AddressMapping.ColorMatrixOccupancy * AddressMapping.ColorMatrixNum,
      'ReadColorMatrix'
    );
    req.destination = addr;
    req.deviceType = 1;
    req.port = portAddr;
    req.rcvIndex = scanBoardAddr;
    req.address = AddressMapping.ColorMatrixAddr;
    return (await this.connection.send(req)).data;
  }

  SetColorMatrix = (): void => {
    throw new TypeError('Not implemented');
  };

  // #14885
  async ReadStartPositionOfDataGroup(
    addr: number,
    portAddr: number,
    scanBoardAddr: number
  ): Promise<Buffer> {
    const req = new Request(
      AddressMapping.StartPositionOfDataGroupOccupancy * AddressMapping.StartPositionOfDataGroupNum,
      'ReadStartPositionOfDataGroup'
    );
    req.destination = addr;
    req.deviceType = 1;
    req.port = portAddr;
    req.rcvIndex = scanBoardAddr;
    req.address = AddressMapping.StartPositionOfDataGroupAddr;
    return (await this.connection.send(req)).data;
  }

  // #14911
  async SetStartPositionOfDataGroup(
    addr: number,
    portAddr: number,
    scanBoardAddr: number,
    bBroadcast: boolean,
    startPositionOfDataGroup: number[] | Buffer
  ): Promise<void> {
    if (
      startPositionOfDataGroup.length !==
      AddressMapping.StartPositionOfDataGroupOccupancy * AddressMapping.StartPositionOfDataGroupNum
    )
      throw new TypeError(`Invalid buffer size: ${startPositionOfDataGroup.length}`);
    const req = new Request(startPositionOfDataGroup, bBroadcast, 'SetStartPositionOfDataGroup');
    req.destination = addr;
    req.deviceType = 1;
    req.port = portAddr;
    req.rcvIndex = scanBoardAddr;
    req.address = AddressMapping.StartPositionOfDataGroupAddr;
    await this.connection.send(req);
  }

  // #14924
  async ReadCabinetSerialNum(
    addr: number,
    portAddr: number,
    scanBoardAddr: number
  ): Promise<number> {
    const req = new Request(AddressMapping.CabinetSerialNumOccupancy, 'ReadCabinetSerialNum');
    req.destination = addr;
    req.deviceType = 1;
    req.port = portAddr;
    req.rcvIndex = scanBoardAddr;
    req.address = AddressMapping.CabinetSerialNumAddr;
    return decodeUIntLE(await this.connection.send(req));
  }

  // #14944
  async SetvCabinetSerialNum(
    addr: number,
    portAddr: number,
    scanBoardAddr: number,
    bBroadcast: boolean,
    cabinetSerialNum: number
  ): Promise<void> {
    const $data = encodeUIntLE(cabinetSerialNum, AddressMapping.CabinetSerialNumOccupancy);
    const req = new Request($data, bBroadcast, 'SetvCabinetSerialNum');
    req.destination = addr;
    req.deviceType = 1;
    req.port = portAddr;
    req.rcvIndex = scanBoardAddr;
    req.address = AddressMapping.CabinetSerialNumAddr;
    await this.connection.send(req);
  }

  // #14954
  async ReadConfigRegister(addr: number, portAddr: number, scanBoardAddr: number): Promise<Buffer> {
    const req = new Request(AddressMapping.ReadConfigRegisterOccupancy, 'ReadConfigRegister');
    req.destination = addr;
    req.deviceType = 1;
    req.port = portAddr;
    req.rcvIndex = scanBoardAddr;
    req.address = AddressMapping.ReadConfigRegisterAddr;
    return (await this.connection.send(req)).data;
  }

  // #14974
  async ReadMbi5042GrayEnhanced(
    addr: number,
    portAddr: number,
    scanBoardAddr: number
  ): Promise<number> {
    const req = new Request(AddressMapping.Mbi5042GrayEnhancedOccupancy, 'ReadMbi5042GrayEnhanced');
    req.destination = addr;
    req.deviceType = 1;
    req.port = portAddr;
    req.rcvIndex = scanBoardAddr;
    req.address = AddressMapping.Mbi5042GrayEnhancedAddr;
    return decodeUIntLE(await this.connection.send(req));
  }

  // #14997
  async SetMbi5042GrayEnhanced(
    addr: number,
    portAddr: number,
    scanBoardAddr: number,
    bBroadcast: boolean,
    isEnable: boolean
  ): Promise<void> {
    const req = new Request(isEnable ? [5] : [255], bBroadcast, 'SetMbi5042GrayEnhanced');
    req.destination = addr;
    req.deviceType = 1;
    req.port = portAddr;
    req.rcvIndex = scanBoardAddr;
    req.address = AddressMapping.Mbi5042GrayEnhancedAddr;
    await this.connection.send(req);
  }

  // #15015
  async ReadNoCorrectionThreshold(
    addr: number,
    portAddr: number,
    scanBoardAddr: number
  ): Promise<Buffer> {
    const req = new Request(
      AddressMapping.NoCorrectionThresholdOccupancy,
      'ReadNoCorrectionThreshold'
    );
    req.destination = addr;
    req.deviceType = 1;
    req.port = portAddr;
    req.rcvIndex = scanBoardAddr;
    req.address = AddressMapping.NoCorrectionThresholdAddr;
    return (await this.connection.send(req)).data;
  }

  SetNoCorrectionThreshold = (): void => {
    throw new TypeError('Not implemented');
  };

  // #15064
  async ReadNoCorrectionAttenuation(
    addr: number,
    portAddr: number,
    scanBoardAddr: number
  ): Promise<Buffer> {
    const req = new Request(
      AddressMapping.NoCorrectionAttenuationOccupancy,
      'ReadNoCorrectionAttenuation'
    );
    req.destination = addr;
    req.deviceType = 1;
    req.port = portAddr;
    req.rcvIndex = scanBoardAddr;
    req.address = AddressMapping.NoCorrectionAttenuationAddr;
    return (await this.connection.send(req)).data;
  }

  SetNoCorrectionAttenuation = (): void => {
    throw new TypeError('Not implemented');
  };

  // #15113
  async ReadCtrlEndPoint(addr: number, portAddr: number, scanBoardAddr: number): Promise<number> {
    const req = new Request(AddressMapping.CtrlEndPointOccupancy, 'ReadCtrlEndPoint');
    req.destination = addr;
    req.deviceType = 1;
    req.port = portAddr;
    req.rcvIndex = scanBoardAddr;
    req.address = AddressMapping.CtrlEndPointAddr;
    return decodeUIntLE(await this.connection.send(req));
  }

  // #15133
  async SetCtrlEndPoint(
    addr: number,
    portAddr: number,
    scanBoardAddr: number,
    bBroadcast: boolean,
    ctrlEndPoint: number
  ): Promise<void> {
    const $data = encodeUIntLE(ctrlEndPoint, AddressMapping.CtrlEndPointOccupancy);
    const req = new Request($data, bBroadcast, 'SetCtrlEndPoint');
    req.destination = addr;
    req.deviceType = 1;
    req.port = portAddr;
    req.rcvIndex = scanBoardAddr;
    req.address = AddressMapping.CtrlEndPointAddr;
    await this.connection.send(req);
  }

  // #15143
  async ReadLocalStartX(addr: number, portAddr: number, scanBoardAddr: number): Promise<number> {
    const req = new Request(AddressMapping.LocalStartXOccupancy, 'ReadLocalStartX');
    req.destination = addr;
    req.deviceType = 1;
    req.port = portAddr;
    req.rcvIndex = scanBoardAddr;
    req.address = AddressMapping.LocalStartXAddr;
    return decodeUIntLE(await this.connection.send(req));
  }

  // #15163
  async ReadLocalStartY(addr: number, portAddr: number, scanBoardAddr: number): Promise<number> {
    const req = new Request(AddressMapping.LocalStartYOccupancy, 'ReadLocalStartY');
    req.destination = addr;
    req.deviceType = 1;
    req.port = portAddr;
    req.rcvIndex = scanBoardAddr;
    req.address = AddressMapping.LocalStartYAddr;
    return decodeUIntLE(await this.connection.send(req));
  }

  // #15183
  async ReadNewOERamEnable(addr: number, portAddr: number, scanBoardAddr: number): Promise<number> {
    const req = new Request(AddressMapping.NewOERamEnableOccupancy, 'ReadNewOERamEnable');
    req.destination = addr;
    req.deviceType = 1;
    req.port = portAddr;
    req.rcvIndex = scanBoardAddr;
    req.address = AddressMapping.NewOERamEnableAddr;
    return decodeUIntLE(await this.connection.send(req));
  }

  // #15203
  async SetNewOERamEnable(
    addr: number,
    portAddr: number,
    scanBoardAddr: number,
    bBroadcast: boolean,
    newOERamEnable: number
  ): Promise<void> {
    const $data = encodeUIntLE(newOERamEnable, AddressMapping.NewOERamEnableOccupancy);
    const req = new Request($data, bBroadcast, 'SetNewOERamEnable');
    req.destination = addr;
    req.deviceType = 1;
    req.port = portAddr;
    req.rcvIndex = scanBoardAddr;
    req.address = AddressMapping.NewOERamEnableAddr;
    await this.connection.send(req);
  }

  SetNewOERamEnable_1 = (): void => {
    throw new TypeError('Not implemented');
  };

  // #15262
  async ReadLowGrayCompensation(
    addr: number,
    portAddr: number,
    scanBoardAddr: number
  ): Promise<number> {
    const req = new Request(AddressMapping.LowGrayCompensationOccupancy, 'ReadLowGrayCompensation');
    req.destination = addr;
    req.deviceType = 1;
    req.port = portAddr;
    req.rcvIndex = scanBoardAddr;
    req.address = AddressMapping.LowGrayCompensationAddr;
    return decodeUIntLE(await this.connection.send(req));
  }

  // #15282
  async SetLowGrayCompensation(
    addr: number,
    portAddr: number,
    scanBoardAddr: number,
    bBroadcast: boolean,
    lowGrayCpt: number
  ): Promise<void> {
    const $data = encodeUIntLE(lowGrayCpt, AddressMapping.LowGrayCompensationOccupancy);
    const req = new Request($data, bBroadcast, 'SetLowGrayCompensation');
    req.destination = addr;
    req.deviceType = 1;
    req.port = portAddr;
    req.rcvIndex = scanBoardAddr;
    req.address = AddressMapping.LowGrayCompensationAddr;
    await this.connection.send(req);
  }

  // #15292
  async ReadAddrExtend(addr: number, portAddr: number, scanBoardAddr: number): Promise<number> {
    const req = new Request(AddressMapping.AddrExtendOccupancy, 'ReadAddrExtend');
    req.destination = addr;
    req.deviceType = 1;
    req.port = portAddr;
    req.rcvIndex = scanBoardAddr;
    req.address = AddressMapping.AddrExtendAddr;
    return decodeUIntLE(await this.connection.send(req));
  }

  // #15312
  async SetAddrExtend(
    addr: number,
    portAddr: number,
    scanBoardAddr: number,
    bBroadcast: boolean,
    addrExtend: number
  ): Promise<void> {
    const $data = encodeUIntLE(addrExtend, AddressMapping.AddrExtendOccupancy);
    const req = new Request($data, bBroadcast, 'SetAddrExtend');
    req.destination = addr;
    req.deviceType = 1;
    req.port = portAddr;
    req.rcvIndex = scanBoardAddr;
    req.address = AddressMapping.AddrExtendAddr;
    await this.connection.send(req);
  }

  // #15322
  async ReadTwentyDataGroup(
    addr: number,
    portAddr: number,
    scanBoardAddr: number
  ): Promise<number> {
    const req = new Request(AddressMapping.TwentyDataGroupOccupancy, 'ReadTwentyDataGroup');
    req.destination = addr;
    req.deviceType = 1;
    req.port = portAddr;
    req.rcvIndex = scanBoardAddr;
    req.address = AddressMapping.TwentyDataGroupAddr;
    return decodeUIntLE(await this.connection.send(req));
  }

  // #15345
  async SetTwentyDataGroup(
    addr: number,
    portAddr: number,
    scanBoardAddr: number,
    bBroadcast: boolean,
    isEanbleTwentyDataGroup: boolean
  ): Promise<void> {
    const req = new Request(isEanbleTwentyDataGroup ? [5] : [0], bBroadcast, 'SetTwentyDataGroup');
    req.destination = addr;
    req.deviceType = 1;
    req.port = portAddr;
    req.rcvIndex = scanBoardAddr;
    req.address = AddressMapping.TwentyDataGroupAddr;
    await this.connection.send(req);
  }

  // #15363
  async ReadGroupSwapEn(addr: number, portAddr: number, scanBoardAddr: number): Promise<number> {
    const req = new Request(AddressMapping.GroupSwapEnOccupancy, 'ReadGroupSwapEn');
    req.destination = addr;
    req.deviceType = 1;
    req.port = portAddr;
    req.rcvIndex = scanBoardAddr;
    req.address = AddressMapping.GroupSwapEnAddr;
    return decodeUIntLE(await this.connection.send(req));
  }

  // #15386
  async SetGroupSwapEn(
    addr: number,
    portAddr: number,
    scanBoardAddr: number,
    bBroadcast: boolean,
    isEnableGroupSwapEn: boolean
  ): Promise<void> {
    const req = new Request(isEnableGroupSwapEn ? [5] : [0], bBroadcast, 'SetGroupSwapEn');
    req.destination = addr;
    req.deviceType = 1;
    req.port = portAddr;
    req.rcvIndex = scanBoardAddr;
    req.address = AddressMapping.GroupSwapEnAddr;
    await this.connection.send(req);
  }

  // #15404
  async ReadGroupSwapInfo(addr: number, portAddr: number, scanBoardAddr: number): Promise<Buffer> {
    const req = new Request(AddressMapping.GroupSwapInfoOccupancy, 'ReadGroupSwapInfo');
    req.destination = addr;
    req.deviceType = 1;
    req.port = portAddr;
    req.rcvIndex = scanBoardAddr;
    req.address = AddressMapping.GroupSwapInfoAddr;
    return (await this.connection.send(req)).data;
  }

  // #15424
  async SetGroupSwapInfo(
    addr: number,
    portAddr: number,
    scanBoardAddr: number,
    bBroadcast: boolean,
    groupSwapInfo: number[] | Buffer
  ): Promise<void> {
    if (groupSwapInfo.length !== AddressMapping.GroupSwapInfoOccupancy)
      throw new TypeError(`Invalid buffer size: ${groupSwapInfo.length}`);
    const req = new Request(groupSwapInfo, bBroadcast, 'SetGroupSwapInfo');
    req.destination = addr;
    req.deviceType = 1;
    req.port = portAddr;
    req.rcvIndex = scanBoardAddr;
    req.address = AddressMapping.GroupSwapInfoAddr;
    await this.connection.send(req);
  }

  // #15433
  async ReadSerialColorNum(addr: number, portAddr: number, scanBoardAddr: number): Promise<number> {
    const req = new Request(AddressMapping.SerialColorNumOccupancy, 'ReadSerialColorNum');
    req.destination = addr;
    req.deviceType = 1;
    req.port = portAddr;
    req.rcvIndex = scanBoardAddr;
    req.address = AddressMapping.SerialColorNumAddr;
    return decodeUIntLE(await this.connection.send(req));
  }

  // #15453
  async SetSerialColorNum(
    addr: number,
    portAddr: number,
    scanBoardAddr: number,
    bBroadcast: boolean,
    serialColorNum: number
  ): Promise<void> {
    const $data = encodeUIntLE(serialColorNum, AddressMapping.SerialColorNumOccupancy);
    const req = new Request($data, bBroadcast, 'SetSerialColorNum');
    req.destination = addr;
    req.deviceType = 1;
    req.port = portAddr;
    req.rcvIndex = scanBoardAddr;
    req.address = AddressMapping.SerialColorNumAddr;
    await this.connection.send(req);
  }

  // #15463
  async ReadSerialDotsNumPerColor(
    addr: number,
    portAddr: number,
    scanBoardAddr: number
  ): Promise<number> {
    const req = new Request(
      AddressMapping.SerialDotsNumPerColorOccupancy,
      'ReadSerialDotsNumPerColor'
    );
    req.destination = addr;
    req.deviceType = 1;
    req.port = portAddr;
    req.rcvIndex = scanBoardAddr;
    req.address = AddressMapping.SerialDotsNumPerColorAddr;
    return decodeUIntLE(await this.connection.send(req));
  }

  // #15483
  async SetSerialDotsNumPerColor(
    addr: number,
    portAddr: number,
    scanBoardAddr: number,
    bBroadcast: boolean,
    serialDotsNumPerColor: number
  ): Promise<void> {
    const $data = encodeUIntLE(
      serialDotsNumPerColor,
      AddressMapping.SerialDotsNumPerColorOccupancy
    );
    const req = new Request($data, bBroadcast, 'SetSerialDotsNumPerColor');
    req.destination = addr;
    req.deviceType = 1;
    req.port = portAddr;
    req.rcvIndex = scanBoardAddr;
    req.address = AddressMapping.SerialDotsNumPerColorAddr;
    await this.connection.send(req);
  }

  // #15493
  async ReadSerialRGBCode(addr: number, portAddr: number, scanBoardAddr: number): Promise<number> {
    const req = new Request(AddressMapping.SerialRGBCodeOccupancy, 'ReadSerialRGBCode');
    req.destination = addr;
    req.deviceType = 1;
    req.port = portAddr;
    req.rcvIndex = scanBoardAddr;
    req.address = AddressMapping.SerialRGBCodeAddr;
    return decodeUIntLE(await this.connection.send(req));
  }

  // #15520
  async SetSerialRGBCode(
    addr: number,
    portAddr: number,
    scanBoardAddr: number,
    bBroadcast: boolean,
    red: number,
    green: number,
    blue: number,
    virtualRed: number
  ): Promise<void> {
    const $data = encodeUIntLE(
      red | (green << 2) | (blue << 4) | (virtualRed << 6),
      AddressMapping.SerialRGBCodeOccupancy
    );
    const req = new Request($data, bBroadcast, 'SetSerialRGBCode');
    req.destination = addr;
    req.deviceType = 1;
    req.port = portAddr;
    req.rcvIndex = scanBoardAddr;
    req.address = AddressMapping.SerialRGBCodeAddr;
    await this.connection.send(req);
  }

  // #15531
  async ReadTVCardDVI0Width(
    addr: number,
    portAddr: number,
    scanBoardAddr: number
  ): Promise<number> {
    const req = new Request(AddressMapping.TVCardDVI0WidthOccupancy, 'ReadTVCardDVI0Width');
    req.destination = addr;
    req.deviceType = 1;
    req.port = portAddr;
    req.rcvIndex = scanBoardAddr;
    req.address = AddressMapping.TVCardDVI0WidthAddr;
    return decodeUIntLE(await this.connection.send(req));
  }

  // #15551
  async SetTVCardDVI0Width(
    addr: number,
    portAddr: number,
    scanBoardAddr: number,
    bBroadcast: boolean,
    dviWidth: number
  ): Promise<void> {
    const $data = encodeUIntLE(dviWidth, AddressMapping.TVCardDVI0WidthOccupancy);
    const req = new Request($data, bBroadcast, 'SetTVCardDVI0Width');
    req.destination = addr;
    req.deviceType = 1;
    req.port = portAddr;
    req.rcvIndex = scanBoardAddr;
    req.address = AddressMapping.TVCardDVI0WidthAddr;
    await this.connection.send(req);
  }

  // #15561
  async ReadTVCardDVI0Height(
    addr: number,
    portAddr: number,
    scanBoardAddr: number
  ): Promise<number> {
    const req = new Request(AddressMapping.TVCardDVI0HeightOccupancy, 'ReadTVCardDVI0Height');
    req.destination = addr;
    req.deviceType = 1;
    req.port = portAddr;
    req.rcvIndex = scanBoardAddr;
    req.address = AddressMapping.TVCardDVI0HeightAddr;
    return decodeUIntLE(await this.connection.send(req));
  }

  // #15581
  async SetTVCardDVI0Height(
    addr: number,
    portAddr: number,
    scanBoardAddr: number,
    bBroadcast: boolean,
    dviHeight: number
  ): Promise<void> {
    const $data = encodeUIntLE(dviHeight, AddressMapping.TVCardDVI0HeightOccupancy);
    const req = new Request($data, bBroadcast, 'SetTVCardDVI0Height');
    req.destination = addr;
    req.deviceType = 1;
    req.port = portAddr;
    req.rcvIndex = scanBoardAddr;
    req.address = AddressMapping.TVCardDVI0HeightAddr;
    await this.connection.send(req);
  }

  // #15591
  async ReadTVCardDVI0OffsetX(
    addr: number,
    portAddr: number,
    scanBoardAddr: number
  ): Promise<number> {
    const req = new Request(AddressMapping.TVCardDVI0OffsetXOccupancy, 'ReadTVCardDVI0OffsetX');
    req.destination = addr;
    req.deviceType = 1;
    req.port = portAddr;
    req.rcvIndex = scanBoardAddr;
    req.address = AddressMapping.TVCardDVI0OffsetXAddr;
    return decodeUIntLE(await this.connection.send(req));
  }

  // #15611
  async SetTVCardDVI0OffsetX(
    addr: number,
    portAddr: number,
    scanBoardAddr: number,
    bBroadcast: boolean,
    dviOffsetX: number
  ): Promise<void> {
    const $data = encodeUIntLE(dviOffsetX, AddressMapping.TVCardDVI0OffsetXOccupancy);
    const req = new Request($data, bBroadcast, 'SetTVCardDVI0OffsetX');
    req.destination = addr;
    req.deviceType = 1;
    req.port = portAddr;
    req.rcvIndex = scanBoardAddr;
    req.address = AddressMapping.TVCardDVI0OffsetXAddr;
    await this.connection.send(req);
  }

  // #15621
  async ReadTVCardDVI0OffsetY(
    addr: number,
    portAddr: number,
    scanBoardAddr: number
  ): Promise<number> {
    const req = new Request(AddressMapping.TVCardDVI0OffsetYOccupancy, 'ReadTVCardDVI0OffsetY');
    req.destination = addr;
    req.deviceType = 1;
    req.port = portAddr;
    req.rcvIndex = scanBoardAddr;
    req.address = AddressMapping.TVCardDVI0OffsetYAddr;
    return decodeUIntLE(await this.connection.send(req));
  }

  // #15641
  async SetTVCardDVI0OffsetY(
    addr: number,
    portAddr: number,
    scanBoardAddr: number,
    bBroadcast: boolean,
    dviOffsetY: number
  ): Promise<void> {
    const $data = encodeUIntLE(dviOffsetY, AddressMapping.TVCardDVI0OffsetYOccupancy);
    const req = new Request($data, bBroadcast, 'SetTVCardDVI0OffsetY');
    req.destination = addr;
    req.deviceType = 1;
    req.port = portAddr;
    req.rcvIndex = scanBoardAddr;
    req.address = AddressMapping.TVCardDVI0OffsetYAddr;
    await this.connection.send(req);
  }

  // #15651
  async ReadLogicShiftUnitNumPerSubField(
    addr: number,
    portAddr: number,
    scanBoardAddr: number
  ): Promise<number> {
    const req = new Request(
      AddressMapping.LogicShiftUnitNumPerSubFieldOccupancy,
      'ReadLogicShiftUnitNumPerSubField'
    );
    req.destination = addr;
    req.deviceType = 1;
    req.port = portAddr;
    req.rcvIndex = scanBoardAddr;
    req.address = AddressMapping.LogicShiftUnitNumPerSubFieldAddr;
    return decodeUIntLE(await this.connection.send(req));
  }

  // #15671
  async SetLogicShiftUnitNumPerSubField(
    addr: number,
    portAddr: number,
    scanBoardAddr: number,
    bBroadcast: boolean,
    ShiftUnitNum: number
  ): Promise<void> {
    const $data = encodeUIntLE(ShiftUnitNum, AddressMapping.LogicShiftUnitNumPerSubFieldOccupancy);
    const req = new Request($data, bBroadcast, 'SetLogicShiftUnitNumPerSubField');
    req.destination = addr;
    req.deviceType = 1;
    req.port = portAddr;
    req.rcvIndex = scanBoardAddr;
    req.address = AddressMapping.LogicShiftUnitNumPerSubFieldAddr;
    await this.connection.send(req);
  }

  // #15681
  async ReadDviEncyptEn(addr: number, portAddr: number, scanBoardAddr: number): Promise<number> {
    const req = new Request(AddressMapping.DviEncyptEnOccupancy, 'ReadDviEncyptEn');
    req.destination = addr;
    req.deviceType = 1;
    req.port = portAddr;
    req.rcvIndex = scanBoardAddr;
    req.address = AddressMapping.DviEncyptEnAddr;
    return decodeUIntLE(await this.connection.send(req));
  }

  // #15704
  async SetDviEncyptEn(
    addr: number,
    portAddr: number,
    scanBoardAddr: number,
    bBroadcast: boolean,
    isDviEncypt: boolean
  ): Promise<void> {
    const req = new Request(isDviEncypt ? [5] : [255], bBroadcast, 'SetDviEncyptEn');
    req.destination = addr;
    req.deviceType = 1;
    req.port = portAddr;
    req.rcvIndex = scanBoardAddr;
    req.address = AddressMapping.DviEncyptEnAddr;
    await this.connection.send(req);
  }

  // #15722
  async ReadPCMacAddr(addr: number, portAddr: number, scanBoardAddr: number): Promise<Buffer> {
    const req = new Request(AddressMapping.PCMacAddrOccupancy, 'ReadPCMacAddr');
    req.destination = addr;
    req.deviceType = 1;
    req.port = portAddr;
    req.rcvIndex = scanBoardAddr;
    req.address = AddressMapping.PCMacAddrAddr;
    return (await this.connection.send(req)).data;
  }

  // #15743
  async SetPCMacAddr(
    addr: number,
    portAddr: number,
    scanBoardAddr: number,
    bBroadcast: boolean,
    sendCardSn: number[] | Buffer
  ): Promise<void> {
    if (sendCardSn.length !== AddressMapping.PCMacAddrOccupancy)
      throw new TypeError(`Invalid buffer size: ${sendCardSn.length}`);
    const req = new Request(sendCardSn, bBroadcast, 'SetPCMacAddr');
    req.destination = addr;
    req.deviceType = 1;
    req.port = portAddr;
    req.rcvIndex = scanBoardAddr;
    req.address = AddressMapping.PCMacAddrAddr;
    await this.connection.send(req);
  }

  SetDVIEncryptAllInfo = (): void => {
    throw new TypeError('Not implemented');
  };

  ResetDVIEncryptAllInfo = (): void => {
    throw new TypeError('Not implemented');
  };

  // #15787
  async ReadKillMode(addr: number, portAddr: number, scanBoardAddr: number): Promise<number> {
    const req = new Request(AddressMapping.KillModeOccupancy, 'ReadKillMode');
    req.destination = addr;
    req.deviceType = 1;
    req.port = portAddr;
    req.rcvIndex = scanBoardAddr;
    req.address = AddressMapping.KillModeAddr;
    return decodeUIntLE(await this.connection.send(req));
  }

  // #15807
  async SetKillMode(
    addr: number,
    portAddr: number,
    scanBoardAddr: number,
    bBroadcast: boolean,
    killMode: number
  ): Promise<void> {
    const $data = encodeUIntLE(killMode, AddressMapping.KillModeOccupancy);
    const req = new Request($data, bBroadcast, 'SetKillMode');
    req.destination = addr;
    req.deviceType = 1;
    req.port = portAddr;
    req.rcvIndex = scanBoardAddr;
    req.address = AddressMapping.KillModeAddr;
    await this.connection.send(req);
  }

  // #15817
  async ReadSelfTestMode(addr: number, portAddr: number, scanBoardAddr: number): Promise<number> {
    const req = new Request(AddressMapping.SelfTestModeOccupancy, 'ReadSelfTestMode');
    req.destination = addr;
    req.deviceType = 1;
    req.port = portAddr;
    req.rcvIndex = scanBoardAddr;
    req.address = AddressMapping.SelfTestModeAddr;
    return decodeUIntLE(await this.connection.send(req));
  }

  // #15844
  async SetSelfTestMode(
    addr: number,
    portAddr: number,
    scanBoardAddr: number,
    bBroadcast: boolean,
    selfTestMode: TestModeEnum
  ): Promise<void> {
    const $data = encodeUIntLE(selfTestMode, AddressMapping.SelfTestModeOccupancy);
    const req = new Request($data, bBroadcast, 'SetSelfTestMode');
    req.destination = addr;
    req.deviceType = 1;
    req.port = portAddr;
    req.rcvIndex = scanBoardAddr;
    req.address = AddressMapping.SelfTestModeAddr;
    await this.connection.send(req);
  }

  // #15855
  async ReadLockMode(addr: number, portAddr: number, scanBoardAddr: number): Promise<number> {
    const req = new Request(AddressMapping.LockModeOccupancy, 'ReadLockMode');
    req.destination = addr;
    req.deviceType = 1;
    req.port = portAddr;
    req.rcvIndex = scanBoardAddr;
    req.address = AddressMapping.LockModeAddr;
    return decodeUIntLE(await this.connection.send(req));
  }

  // #15875
  async SetLockMode(
    addr: number,
    portAddr: number,
    scanBoardAddr: number,
    bBroadcast: boolean,
    lockMode: number
  ): Promise<void> {
    const $data = encodeUIntLE(lockMode, AddressMapping.LockModeOccupancy);
    const req = new Request($data, bBroadcast, 'SetLockMode');
    req.destination = addr;
    req.deviceType = 1;
    req.port = portAddr;
    req.rcvIndex = scanBoardAddr;
    req.address = AddressMapping.LockModeAddr;
    await this.connection.send(req);
  }

  // #15886
  async SetTemprature(
    addr: number,
    portAddr: number,
    scanBoardAddr: number,
    bBroadcast: boolean,
    tem: number
  ): Promise<void> {
    const $data = encodeUIntLE(tem, AddressMapping.TempratureOccupancy);
    const req = new Request($data, bBroadcast, 'SetTemprature');
    req.destination = addr;
    req.deviceType = 1;
    req.port = portAddr;
    req.rcvIndex = scanBoardAddr;
    req.address = AddressMapping.TempratureAddr;
    await this.connection.send(req);
  }

  // #15897
  async ReadTemprature(addr: number, portAddr: number, scanBoardAddr: number): Promise<number> {
    const req = new Request(AddressMapping.TempratureOccupancy, 'ReadTemprature');
    req.destination = addr;
    req.deviceType = 1;
    req.port = portAddr;
    req.rcvIndex = scanBoardAddr;
    req.address = AddressMapping.TempratureAddr;
    return decodeUIntLE(await this.connection.send(req));
  }

  // #15917
  async Set5pinControlLight(
    addr: number,
    portAddr: number,
    scanBoardAddr: number,
    bBroadcast: boolean,
    tem: number
  ): Promise<void> {
    const $data = encodeUIntLE(tem, AddressMapping.ControlLightOccupancy);
    const req = new Request($data, bBroadcast, 'Set5pinControlLight');
    req.destination = addr;
    req.deviceType = 1;
    req.port = portAddr;
    req.rcvIndex = scanBoardAddr;
    req.address = AddressMapping.ControlLightAddr;
    await this.connection.send(req);
  }

  // #15928
  async Read5pinControlLight(
    addr: number,
    portAddr: number,
    scanBoardAddr: number
  ): Promise<number> {
    const req = new Request(AddressMapping.ControlLightOccupancy, 'Read5pinControlLight');
    req.destination = addr;
    req.deviceType = 1;
    req.port = portAddr;
    req.rcvIndex = scanBoardAddr;
    req.address = AddressMapping.ControlLightAddr;
    return decodeUIntLE(await this.connection.send(req));
  }

  // #15948
  async ReadScreenEncrypt(addr: number, portAddr: number, scanBoardAddr: number): Promise<number> {
    const req = new Request(AddressMapping.ScreenEncryptedOccupancy, 'ReadScreenEncrypt');
    req.destination = addr;
    req.deviceType = 1;
    req.port = portAddr;
    req.rcvIndex = scanBoardAddr;
    req.address = AddressMapping.ScreenEncryptedAddr;
    return decodeUIntLE(await this.connection.send(req));
  }

  // #15968
  async ReadSmartSetMode(addr: number, portAddr: number, scanBoardAddr: number): Promise<number> {
    const req = new Request(AddressMapping.SmartSetModeOccupancy, 'ReadSmartSetMode');
    req.destination = addr;
    req.deviceType = 1;
    req.port = portAddr;
    req.rcvIndex = scanBoardAddr;
    req.address = AddressMapping.SmartSetModeAddr;
    return decodeUIntLE(await this.connection.send(req));
  }

  // #15994
  async SetSmartSetMode(
    addr: number,
    portAddr: number,
    scanBoardAddr: number,
    bBroadcast: boolean,
    smartMode: SmartSetModeEnum
  ): Promise<void> {
    const $data = encodeUIntLE(smartMode, AddressMapping.SmartSetModeOccupancy);
    const req = new Request($data, bBroadcast, 'SetSmartSetMode');
    req.destination = addr;
    req.deviceType = 1;
    req.port = portAddr;
    req.rcvIndex = scanBoardAddr;
    req.address = AddressMapping.SmartSetModeAddr;
    await this.connection.send(req);
  }

  // #16005
  async SetSmartSetMode_1(
    addr: number,
    portAddr: number,
    scanBoardAddr: number,
    bBroadcast: boolean,
    smartMode: number
  ): Promise<void> {
    const $data = encodeUIntLE(smartMode, AddressMapping.SmartSetModeOccupancy);
    const req = new Request($data, bBroadcast, 'SetSmartSetMode_1');
    req.destination = addr;
    req.deviceType = 1;
    req.port = portAddr;
    req.rcvIndex = scanBoardAddr;
    req.address = AddressMapping.SmartSetModeAddr;
    await this.connection.send(req);
  }

  // #16016
  async ReadAverMatrix(addr: number, portAddr: number, scanBoardAddr: number): Promise<Buffer> {
    const req = new Request(AddressMapping.AverMatrixOccupancy, 'ReadAverMatrix');
    req.destination = addr;
    req.deviceType = 1;
    req.port = portAddr;
    req.rcvIndex = scanBoardAddr;
    req.address = AddressMapping.AverMatrixAddr;
    return (await this.connection.send(req)).data;
  }

  // #16036
  async ReadColorAdjustEnable(
    addr: number,
    portAddr: number,
    scanBoardAddr: number
  ): Promise<number> {
    const req = new Request(AddressMapping.ColorAdjustEnableOccupancy, 'ReadColorAdjustEnable');
    req.destination = addr;
    req.deviceType = 1;
    req.port = portAddr;
    req.rcvIndex = scanBoardAddr;
    req.address = AddressMapping.ColorAdjustEnableAddr;
    return decodeUIntLE(await this.connection.send(req));
  }

  // #16059
  async SetColorAdjustEnable(
    addr: number,
    portAddr: number,
    scanBoardAddr: number,
    bBroadcast: boolean,
    isEnable: boolean
  ): Promise<void> {
    const req = new Request(isEnable ? [2] : [255], bBroadcast, 'SetColorAdjustEnable');
    req.destination = addr;
    req.deviceType = 1;
    req.port = portAddr;
    req.rcvIndex = scanBoardAddr;
    req.address = AddressMapping.ColorAdjustEnableAddr;
    await this.connection.send(req);
  }

  // #16078
  async ReadAdjustMatrixAndEnable(
    addr: number,
    portAddr: number,
    scanBoardAddr: number
  ): Promise<number> {
    const req = new Request(AddressMapping.ColorAdjustEnableOccupancy, 'ReadAdjustMatrixAndEnable');
    req.destination = addr;
    req.deviceType = 1;
    req.port = portAddr;
    req.rcvIndex = scanBoardAddr;
    req.address = AddressMapping.ColorAdjustMatrixAndEnableAddr;
    return decodeUIntLE(await this.connection.send(req));
  }

  SetColorAdjustMatrixAndEnable = (): void => {
    throw new TypeError('Not implemented');
  };

  // #16124
  async SetColorAdjustMatrixAndEnableNew(
    addr: number,
    portAddr: number,
    scanBoardAddr: number,
    bBroadcast: boolean,
    isEnable: boolean
  ): Promise<void> {
    const req = new Request(isEnable ? [4] : [0], bBroadcast, 'SetColorAdjustMatrixAndEnableNew');
    req.destination = addr;
    req.deviceType = 1;
    req.port = portAddr;
    req.rcvIndex = scanBoardAddr;
    req.address = AddressMapping.ColorAdjustMatrixAndEnableAddr;
    await this.connection.send(req);
  }

  // #16138
  async SetColorAdjustMatrixAndDataNew(
    addr: number,
    portAddr: number,
    scanBoardAddr: number,
    bBroadcast: boolean,
    byteData: number
  ): Promise<void> {
    const req = new Request([byteData], bBroadcast, 'SetColorAdjustMatrixAndDataNew');
    req.destination = addr;
    req.deviceType = 1;
    req.port = portAddr;
    req.rcvIndex = scanBoardAddr;
    req.address = AddressMapping.ColorAdjustMatrixAndEnableAddr;
    await this.connection.send(req);
  }

  // #16148
  async ReadScaleInfo(addr: number, portAddr: number, scanBoardAddr: number): Promise<number> {
    const req = new Request(AddressMapping.ScaleInfoOccupancy, 'ReadScaleInfo');
    req.destination = addr;
    req.deviceType = 1;
    req.port = portAddr;
    req.rcvIndex = scanBoardAddr;
    req.address = AddressMapping.ScaleInfoAddr;
    return decodeUIntLE(await this.connection.send(req));
  }

  // #16168
  async SetScaleInfo(
    addr: number,
    portAddr: number,
    scanBoardAddr: number,
    bBroadcast: boolean,
    scaleInfo: number
  ): Promise<void> {
    const $data = encodeUIntLE(scaleInfo, AddressMapping.ScaleInfoOccupancy);
    const req = new Request($data, bBroadcast, 'SetScaleInfo');
    req.destination = addr;
    req.deviceType = 1;
    req.port = portAddr;
    req.rcvIndex = scanBoardAddr;
    req.address = AddressMapping.ScaleInfoAddr;
    await this.connection.send(req);
  }

  SetNcpInfo = (): void => {
    throw new TypeError('Not implemented');
  };

  // #16188
  async SetScanerDirectModeEnable(
    addr: number,
    portAddr: number,
    scanBoardAddr: number,
    broadcast: boolean,
    enable: boolean
  ): Promise<void> {
    const req = new Request(enable ? [5] : [0], broadcast, 'SetScanerDirectModeEnable');
    req.destination = addr;
    req.deviceType = 1;
    req.port = portAddr;
    req.rcvIndex = scanBoardAddr;
    req.address = AddressMapping.ScannderDirectModeEnableAddr;
    await this.connection.send(req);
  }

  // #16206
  async ReadScanerDirectModeEnable(
    addr: number,
    portAddr: number,
    scanBoardAddr: number
  ): Promise<number> {
    const req = new Request(
      AddressMapping.ScannerDirectModeEnableOccupancy,
      'ReadScanerDirectModeEnable'
    );
    req.destination = addr;
    req.deviceType = 1;
    req.port = portAddr;
    req.rcvIndex = scanBoardAddr;
    req.address = AddressMapping.ScannderDirectModeEnableAddr;
    return decodeUIntLE(await this.connection.send(req));
  }

  // #16229
  async ReadTotalLightCdfRes(
    addr: number,
    portAddr: number,
    scanBoardAddr: number
  ): Promise<number> {
    const req = new Request(AddressMapping.TotalLightCdfResOccupancy, 'ReadTotalLightCdfRes');
    req.destination = addr;
    req.deviceType = 1;
    req.port = portAddr;
    req.rcvIndex = scanBoardAddr;
    req.address = AddressMapping.TotalLightCdfResAddr;
    return decodeUIntLE(await this.connection.send(req));
  }

  // #16249
  async SetTotalLightCdfRes(
    addr: number,
    portAddr: number,
    scanBoardAddr: number,
    bBroadcast: boolean,
    totalLightCdfRes: number
  ): Promise<void> {
    const $data = encodeUIntLE(totalLightCdfRes, AddressMapping.TotalLightCdfResOccupancy);
    const req = new Request($data, bBroadcast, 'SetTotalLightCdfRes');
    req.destination = addr;
    req.deviceType = 1;
    req.port = portAddr;
    req.rcvIndex = scanBoardAddr;
    req.address = AddressMapping.TotalLightCdfResAddr;
    await this.connection.send(req);
  }

  // #16292
  async ReadModuleScanSequenceInfo(
    addr: number,
    portAddr: number,
    scanBoardAddr: number
  ): Promise<Buffer> {
    const req = new Request(
      AddressMapping.Module_ScanSequenceInfoOccupancy,
      'ReadModuleScanSequenceInfo'
    );
    req.destination = addr;
    req.deviceType = 1;
    req.port = portAddr;
    req.rcvIndex = scanBoardAddr;
    req.address = AddressMapping.Module_ScanSequenceInfoAddr;
    return (await this.connection.send(req)).data;
  }

  // #16301
  async SetModuleScanSequenceInfo(
    addr: number,
    portAddr: number,
    scanBoardAddr: number,
    bBroadcast: boolean,
    scanSequenceInfo: number[] | Buffer
  ): Promise<void> {
    const req = new Request(scanSequenceInfo, bBroadcast, 'SetModuleScanSequenceInfo');
    req.destination = addr;
    req.deviceType = 1;
    req.port = portAddr;
    req.rcvIndex = scanBoardAddr;
    req.address = AddressMapping.Module_ScanSequenceInfoAddr;
    await this.connection.send(req);
  }

  // #16310
  async ReadScannerFunctionConfig(
    addr: number,
    portAddr: number,
    scanBoardAddr: number
  ): Promise<Buffer> {
    const req = new Request(
      AddressMapping.ScanBoardFunctionConfigOccupancy,
      'ReadScannerFunctionConfig'
    );
    req.destination = addr;
    req.deviceType = 1;
    req.port = portAddr;
    req.rcvIndex = scanBoardAddr;
    req.address = AddressMapping.ScanBoardFunctionConfigAddr;
    return (await this.connection.send(req)).data;
  }

  SetSender_ModuleFileData = (): void => {
    throw new TypeError('Not implemented');
  };

  // #16367
  async ReadModule_McuProgramLength(
    addr: number,
    portAddr: number,
    scanBoardAddr: number
  ): Promise<number> {
    const req = new Request(
      AddressMapping.Scanner_McuProgramLengthOccupancy,
      'ReadModule_McuProgramLength'
    );
    req.destination = addr;
    req.deviceType = 1;
    req.port = portAddr;
    req.rcvIndex = scanBoardAddr;
    req.address = AddressMapping.Module_McuProgramLengthAddr;
    return decodeUIntLE(await this.connection.send(req));
  }

  // #16387
  async ReadModule_McuProgramEdition(
    addr: number,
    portAddr: number,
    scanBoardAddr: number
  ): Promise<number> {
    const req = new Request(
      AddressMapping.Module_McuProgramEditionOccupancy,
      'ReadModule_McuProgramEdition'
    );
    req.destination = addr;
    req.deviceType = 1;
    req.port = portAddr;
    req.rcvIndex = scanBoardAddr;
    req.address = AddressMapping.Module_McuProgramEditionAddr;
    return decodeUIntLE(await this.connection.send(req));
  }

  // #16407
  async ReadModule_McuProgramRemarks(
    addr: number,
    portAddr: number,
    scanBoardAddr: number
  ): Promise<Buffer> {
    const req = new Request(
      AddressMapping.Module_McuProgramRemarksOccupancy,
      'ReadModule_McuProgramRemarks'
    );
    req.destination = addr;
    req.deviceType = 1;
    req.port = portAddr;
    req.rcvIndex = scanBoardAddr;
    req.address = AddressMapping.Module_McuProgramRemarksAddr;
    return (await this.connection.send(req)).data;
  }

  // #16520
  async SetRedGammaTableData(
    addr: number,
    portAddr: number,
    scanBoardAddr: number,
    bBroadcast: boolean,
    data: number[] | Buffer,
    is22Bit: boolean
  ): Promise<void> {
    const req = new Request(data, bBroadcast, 'SetRedGammaTableData');
    req.destination = addr;
    req.deviceType = 1;
    req.port = portAddr;
    req.rcvIndex = scanBoardAddr;
    req.address = AddressMapping.RedGammaTableAddr;
    if (is22Bit) {
      req.address = AddressMapping.RedGammaTableAddr_22bit;
    }
    await this.connection.send(req);
  }

  // #16681
  async SetExtendRedGammaTableData(
    addr: number,
    portAddr: number,
    scanBoardAddr: number,
    bBroadcast: boolean,
    data: number[] | Buffer,
    is22Bit: boolean
  ): Promise<void> {
    const req = new Request(data, bBroadcast, 'SetExtendRedGammaTableData');
    req.destination = addr;
    req.deviceType = 1;
    req.port = portAddr;
    req.rcvIndex = scanBoardAddr;
    req.address = AddressMapping.ExtendRedGammaTableAddr;
    if (is22Bit) {
      req.address = AddressMapping.ExtendRedGammaTableAddr_22bit;
    }
    await this.connection.send(req);
  }

  SetByteOETable = (): void => {
    throw new TypeError('Not implemented');
  };

  // #16936
  async WriteCorrectionDataToScan(
    addr: number,
    portAddr: number,
    scanBoardAddr: number,
    bBroadcast: boolean,
    data: number[] | Buffer,
    length: number,
    registerAddr: number
  ): Promise<void> {
    if (data.length !== length) throw new TypeError(`Invalid buffer size: ${data.length}`);
    const req = new Request(data, bBroadcast, 'WriteCorrectionDataToScan');
    req.destination = addr;
    req.deviceType = 1;
    req.port = portAddr;
    req.rcvIndex = scanBoardAddr;
    req.address = registerAddr;
    await this.connection.send(req);
  }

  // #16945
  async ReadCorrectionDataToScan(
    addr: number,
    portAddr: number,
    scanBoardAddr: number,
    readLength: number,
    registerAddr: number
  ): Promise<Buffer> {
    const req = new Request(readLength, 'ReadCorrectionDataToScan');
    req.destination = addr;
    req.deviceType = 1;
    req.port = portAddr;
    req.rcvIndex = scanBoardAddr;
    req.address = registerAddr;
    return (await this.connection.send(req)).data;
  }

  WriteSwitchCommand = (): void => {
    throw new TypeError('Not implemented');
  };

  // #16981
  async ReadScanerBurningProgramPackage(
    addr: number,
    portAddr: number,
    scanBoardAddr: number,
    readLength: number
  ): Promise<Buffer> {
    const req = new Request(readLength, 'ReadScanerBurningProgramPackage');
    req.destination = addr;
    req.deviceType = 1;
    req.port = portAddr;
    req.rcvIndex = scanBoardAddr;
    req.address = 0;
    return (await this.connection.send(req)).data;
  }

  // #17070
  async ReadScanner_FPGAProgramLength(
    addr: number,
    portAddr: number,
    scanBoardAddr: number
  ): Promise<number> {
    const req = new Request(
      AddressMapping.Scanner_FPGAProgramLengthOccupancy,
      'ReadScanner_FPGAProgramLength'
    );
    req.destination = addr;
    req.deviceType = 1;
    req.port = portAddr;
    req.rcvIndex = scanBoardAddr;
    req.address = AddressMapping.Scanner_FPGAProgramLengthAddr;
    return decodeUIntLE(await this.connection.send(req));
  }

  // #17090
  async SetScanner_FPGAProgramLength(
    addr: number,
    portAddr: number,
    scanBoardAddr: number,
    bBroadcast: boolean,
    scanner_FPGAProgramLength: number
  ): Promise<void> {
    const $data = encodeUIntLE(
      scanner_FPGAProgramLength,
      AddressMapping.Scanner_FPGAProgramLengthOccupancy
    );
    const req = new Request($data, bBroadcast, 'SetScanner_FPGAProgramLength');
    req.destination = addr;
    req.deviceType = 1;
    req.port = portAddr;
    req.rcvIndex = scanBoardAddr;
    req.address = AddressMapping.Scanner_FPGAProgramLengthAddr;
    await this.connection.send(req);
  }

  // #17100
  async ReadScanner_FPGAProgramEdition(
    addr: number,
    portAddr: number,
    scanBoardAddr: number
  ): Promise<number> {
    const req = new Request(
      AddressMapping.Scanner_FPGAProgramEditionOccupancy,
      'ReadScanner_FPGAProgramEdition'
    );
    req.destination = addr;
    req.deviceType = 1;
    req.port = portAddr;
    req.rcvIndex = scanBoardAddr;
    req.address = AddressMapping.Scanner_FPGAProgramEditionAddr;
    return decodeUIntLE(await this.connection.send(req));
  }

  // #17120
  async SetScanner_FPGAProgramEdition(
    addr: number,
    portAddr: number,
    scanBoardAddr: number,
    bBroadcast: boolean,
    scanner_FPGAProgramEdition: number
  ): Promise<void> {
    const $data = encodeUIntLE(
      scanner_FPGAProgramEdition,
      AddressMapping.Scanner_FPGAProgramEditionOccupancy
    );
    const req = new Request($data, bBroadcast, 'SetScanner_FPGAProgramEdition');
    req.destination = addr;
    req.deviceType = 1;
    req.port = portAddr;
    req.rcvIndex = scanBoardAddr;
    req.address = AddressMapping.Scanner_FPGAProgramEditionAddr;
    await this.connection.send(req);
  }

  // #17130
  async ReadScanner_FPGAProgramRemarks(
    addr: number,
    portAddr: number,
    scanBoardAddr: number
  ): Promise<Buffer> {
    const req = new Request(
      AddressMapping.Scanner_FPGAProgramRemarksOccupancy,
      'ReadScanner_FPGAProgramRemarks'
    );
    req.destination = addr;
    req.deviceType = 1;
    req.port = portAddr;
    req.rcvIndex = scanBoardAddr;
    req.address = AddressMapping.Scanner_FPGAProgramRemarksAddr;
    return (await this.connection.send(req)).data;
  }

  // #17152
  async SetScanner_FPGAProgramRemarks(
    addr: number,
    portAddr: number,
    scanBoardAddr: number,
    bBroadcast: boolean,
    scanner_FPGAProgramRemarks: number[] | Buffer
  ): Promise<void> {
    if (scanner_FPGAProgramRemarks.length !== AddressMapping.Scanner_FPGAProgramRemarksOccupancy)
      throw new TypeError(`Invalid buffer size: ${scanner_FPGAProgramRemarks.length}`);
    const req = new Request(
      scanner_FPGAProgramRemarks,
      bBroadcast,
      'SetScanner_FPGAProgramRemarks'
    );
    req.destination = addr;
    req.deviceType = 1;
    req.port = portAddr;
    req.rcvIndex = scanBoardAddr;
    req.address = AddressMapping.Scanner_FPGAProgramRemarksAddr;
    await this.connection.send(req);
  }

  // #17190
  async ReadScanner_FPGAProgramInfo(
    addr: number,
    portAddr: number,
    scanBoardAddr: number
  ): Promise<Buffer> {
    const req = new Request(
      AddressMapping.Scanner_FPGAProgramInfoOccupancy,
      'ReadScanner_FPGAProgramInfo'
    );
    req.destination = addr;
    req.deviceType = 1;
    req.port = portAddr;
    req.rcvIndex = scanBoardAddr;
    req.address = AddressMapping.Scanner_FPGAProgramInfoAddr;
    return (await this.connection.send(req)).data;
  }

  // #17212
  async SetScanner_FPGAProgramInfo(
    addr: number,
    portAddr: number,
    scanBoardAddr: number,
    bBroadcast: boolean,
    scanner_FPGAProgramRemarks: number[] | Buffer
  ): Promise<void> {
    if (scanner_FPGAProgramRemarks.length !== AddressMapping.Scanner_FPGAProgramInfoOccupancy)
      throw new TypeError(`Invalid buffer size: ${scanner_FPGAProgramRemarks.length}`);
    const req = new Request(scanner_FPGAProgramRemarks, bBroadcast, 'SetScanner_FPGAProgramInfo');
    req.destination = addr;
    req.deviceType = 1;
    req.port = portAddr;
    req.rcvIndex = scanBoardAddr;
    req.address = AddressMapping.Scanner_FPGAProgramInfoAddr;
    await this.connection.send(req);
  }

  // #17221
  async ReadSender3D_FPGAProgramInfo(
    addr: number,
    portAddr: number,
    scanBoardAddr: number
  ): Promise<Buffer> {
    const req = new Request(
      AddressMapping.Sender3D_FPGAProgramInfoOccupancy,
      'ReadSender3D_FPGAProgramInfo'
    );
    req.destination = addr;
    req.deviceType = 4;
    req.port = portAddr;
    req.rcvIndex = scanBoardAddr;
    req.address = AddressMapping.Sender3D_FPGAProgramInfoAddr;
    return (await this.connection.send(req)).data;
  }

  // #17243
  async ReadSender3D_McuProgramInfo(
    addr: number,
    portAddr: number,
    scanBoardAddr: number
  ): Promise<Buffer> {
    const req = new Request(
      AddressMapping.Sender3D_McuProgramInfoOccupancy,
      'ReadSender3D_McuProgramInfo'
    );
    req.destination = addr;
    req.deviceType = 4;
    req.port = portAddr;
    req.rcvIndex = scanBoardAddr;
    req.address = AddressMapping.Sender3D_McuProgramInfoAddr;
    return (await this.connection.send(req)).data;
  }

  SetSender_ScannerFPGAFileData = (): void => {
    throw new TypeError('Not implemented');
  };

  // #17291
  async ReadScanner_McuProgram(
    addr: number,
    portAddr: number,
    scanBoardAddr: number,
    readLength: number
  ): Promise<Buffer> {
    const req = new Request(readLength, 'ReadScanner_McuProgram');
    req.destination = addr;
    req.deviceType = 1;
    req.port = portAddr;
    req.rcvIndex = scanBoardAddr;
    req.address = AddressMapping.Scanner_McuProgramLengthAddr;
    return (await this.connection.send(req)).data;
  }

  // #17300
  async ReadScanner_McuProgramLength(
    addr: number,
    portAddr: number,
    scanBoardAddr: number
  ): Promise<number> {
    const req = new Request(
      AddressMapping.Scanner_McuProgramLengthOccupancy,
      'ReadScanner_McuProgramLength'
    );
    req.destination = addr;
    req.deviceType = 1;
    req.port = portAddr;
    req.rcvIndex = scanBoardAddr;
    req.address = AddressMapping.Scanner_McuProgramLengthAddr;
    return decodeUIntLE(await this.connection.send(req));
  }

  // #17320
  async SetScanner_McuProgramLength(
    addr: number,
    portAddr: number,
    scanBoardAddr: number,
    bBroadcast: boolean,
    scanner_McuProgramLength: number
  ): Promise<void> {
    const $data = encodeUIntLE(
      scanner_McuProgramLength,
      AddressMapping.Scanner_McuProgramLengthOccupancy
    );
    const req = new Request($data, bBroadcast, 'SetScanner_McuProgramLength');
    req.destination = addr;
    req.deviceType = 1;
    req.port = portAddr;
    req.rcvIndex = scanBoardAddr;
    req.address = AddressMapping.Scanner_McuProgramLengthAddr;
    await this.connection.send(req);
  }

  // #17330
  async ReadScanner_McuProgramEdition(
    addr: number,
    portAddr: number,
    scanBoardAddr: number
  ): Promise<number> {
    const req = new Request(
      AddressMapping.Scanner_McuProgramEditionOccupancy,
      'ReadScanner_McuProgramEdition'
    );
    req.destination = addr;
    req.deviceType = 1;
    req.port = portAddr;
    req.rcvIndex = scanBoardAddr;
    req.address = AddressMapping.Scanner_McuProgramEditionAddr;
    return decodeUIntLE(await this.connection.send(req));
  }

  // #17350
  async SetScanner_McuProgramEdition(
    addr: number,
    portAddr: number,
    scanBoardAddr: number,
    bBroadcast: boolean,
    scanner_McuProgramEdition: number
  ): Promise<void> {
    const $data = encodeUIntLE(
      scanner_McuProgramEdition,
      AddressMapping.Scanner_McuProgramEditionOccupancy
    );
    const req = new Request($data, bBroadcast, 'SetScanner_McuProgramEdition');
    req.destination = addr;
    req.deviceType = 1;
    req.port = portAddr;
    req.rcvIndex = scanBoardAddr;
    req.address = AddressMapping.Scanner_McuProgramEditionAddr;
    await this.connection.send(req);
  }

  // #17360
  async ReadScanner_McuProgramRemarks(
    addr: number,
    portAddr: number,
    scanBoardAddr: number
  ): Promise<Buffer> {
    const req = new Request(
      AddressMapping.Scanner_McuProgramRemarksOccupancy,
      'ReadScanner_McuProgramRemarks'
    );
    req.destination = addr;
    req.deviceType = 1;
    req.port = portAddr;
    req.rcvIndex = scanBoardAddr;
    req.address = AddressMapping.Scanner_McuProgramRemarksAddr;
    return (await this.connection.send(req)).data;
  }

  // #17382
  async SetScanner_McuProgramRemarks(
    addr: number,
    portAddr: number,
    scanBoardAddr: number,
    bBroadcast: boolean,
    scanner_McuProgramRemarks: number[] | Buffer
  ): Promise<void> {
    if (scanner_McuProgramRemarks.length !== AddressMapping.Scanner_McuProgramRemarksOccupancy)
      throw new TypeError(`Invalid buffer size: ${scanner_McuProgramRemarks.length}`);
    const req = new Request(scanner_McuProgramRemarks, bBroadcast, 'SetScanner_McuProgramRemarks');
    req.destination = addr;
    req.deviceType = 1;
    req.port = portAddr;
    req.rcvIndex = scanBoardAddr;
    req.address = AddressMapping.Scanner_McuProgramRemarksAddr;
    await this.connection.send(req);
  }

  SetSender_ScannerMcuFileData = (): void => {
    throw new TypeError('Not implemented');
  };

  // #17446
  async ReadScanner_McuProgramInfo(
    addr: number,
    portAddr: number,
    scanBoardAddr: number
  ): Promise<Buffer> {
    const req = new Request(
      AddressMapping.Scanner_McuProgramInfoOccupancy,
      'ReadScanner_McuProgramInfo'
    );
    req.destination = addr;
    req.deviceType = 1;
    req.port = portAddr;
    req.rcvIndex = scanBoardAddr;
    req.address = AddressMapping.Scanner_McuProgramInfoAddr;
    return (await this.connection.send(req)).data;
  }

  // #17468
  async SetScanner_McuProgramInfo(
    addr: number,
    portAddr: number,
    scanBoardAddr: number,
    bBroadcast: boolean,
    scanner_McuProgramRemarks: number[] | Buffer
  ): Promise<void> {
    if (scanner_McuProgramRemarks.length !== AddressMapping.Scanner_McuProgramInfoOccupancy)
      throw new TypeError(`Invalid buffer size: ${scanner_McuProgramRemarks.length}`);
    const req = new Request(scanner_McuProgramRemarks, bBroadcast, 'SetScanner_McuProgramInfo');
    req.destination = addr;
    req.deviceType = 1;
    req.port = portAddr;
    req.rcvIndex = scanBoardAddr;
    req.address = AddressMapping.Scanner_McuProgramInfoAddr;
    await this.connection.send(req);
  }

  // #17477
  async ReadTempInfoOfScanCard(
    addr: number,
    portAddr: number,
    scanBoardAddr: number
  ): Promise<number> {
    const req = new Request(
      AddressMapping.Scanner_TempInfoOfScanCardOccupancy,
      'ReadTempInfoOfScanCard'
    );
    req.destination = addr;
    req.deviceType = 1;
    req.port = portAddr;
    req.rcvIndex = scanBoardAddr;
    req.address = AddressMapping.Scanner_TempInfoOfScanCardhAddr;
    return decodeUIntLE(await this.connection.send(req));
  }

  // #17506
  async ReadHumiOfScanCard(addr: number, portAddr: number, scanBoardAddr: number): Promise<number> {
    const req = new Request(AddressMapping.Scanner_HumiOfScanCardOccupancy, 'ReadHumiOfScanCard');
    req.destination = addr;
    req.deviceType = 1;
    req.port = portAddr;
    req.rcvIndex = scanBoardAddr;
    req.address = AddressMapping.Scanner_HumiOfScanCardAddr;
    return decodeUIntLE(await this.connection.send(req));
  }

  // #17529
  async ReadVoltageOfScanCard(
    addr: number,
    portAddr: number,
    scanBoardAddr: number
  ): Promise<number> {
    const req = new Request(
      AddressMapping.Scanner_VoltageOfScanCardOccupancy,
      'ReadVoltageOfScanCard'
    );
    req.destination = addr;
    req.deviceType = 1;
    req.port = portAddr;
    req.rcvIndex = scanBoardAddr;
    req.address = AddressMapping.Scanner_VoltageOfScanCardAddr;
    return decodeUIntLE(await this.connection.send(req));
  }

  // #17552
  async ReadAttachedMonitorCardExist(
    addr: number,
    portAddr: number,
    scanBoardAddr: number
  ): Promise<number> {
    const req = new Request(
      AddressMapping.AttachedMonitorCardExistOccupancy,
      'ReadAttachedMonitorCardExist'
    );
    req.destination = addr;
    req.deviceType = 1;
    req.port = portAddr;
    req.rcvIndex = scanBoardAddr;
    req.address = AddressMapping.AttachedMonitorCardExistAddr;
    return decodeUIntLE(await this.connection.send(req));
  }

  // #17581
  async ReadAttachedMonitorCardModle(
    addr: number,
    portAddr: number,
    scanBoardAddr: number
  ): Promise<number> {
    const req = new Request(
      AddressMapping.AttachedMonitorCardModleOccupancy,
      'ReadAttachedMonitorCardModle'
    );
    req.destination = addr;
    req.deviceType = 1;
    req.port = portAddr;
    req.rcvIndex = scanBoardAddr;
    req.address = AddressMapping.AttachedMonitorCardModleAddr;
    return decodeUIntLE(await this.connection.send(req));
  }

  // #17601
  async ReadAttachedMonitorCardProgramVersion(
    addr: number,
    portAddr: number,
    scanBoardAddr: number
  ): Promise<number> {
    const req = new Request(
      AddressMapping.AttachedMonitorCardProgramVersionOccupancy,
      'ReadAttachedMonitorCardProgramVersion'
    );
    req.destination = addr;
    req.deviceType = 1;
    req.port = portAddr;
    req.rcvIndex = scanBoardAddr;
    req.address = AddressMapping.AttachedMonitorCardProgramVersionAddr;
    return decodeUIntLE(await this.connection.send(req));
  }

  // #17621
  async ReadTempInfoOfMonitorCard(
    addr: number,
    portAddr: number,
    scanBoardAddr: number
  ): Promise<number> {
    const req = new Request(
      AddressMapping.Scanner_TempInfoOfMonitorCardOccupancy,
      'ReadTempInfoOfMonitorCard'
    );
    req.destination = addr;
    req.deviceType = 1;
    req.port = portAddr;
    req.rcvIndex = scanBoardAddr;
    req.address = AddressMapping.Scanner_TempInfoOfMonitorCardAddr;
    return decodeUIntLE(await this.connection.send(req));
  }

  // #17650
  async ReadHumiOfMonitorCard(
    addr: number,
    portAddr: number,
    scanBoardAddr: number
  ): Promise<number> {
    const req = new Request(
      AddressMapping.Scanner_HumiOfMonitorCardOccupancy,
      'ReadHumiOfMonitorCard'
    );
    req.destination = addr;
    req.deviceType = 1;
    req.port = portAddr;
    req.rcvIndex = scanBoardAddr;
    req.address = AddressMapping.Scanner_HumiOfMonitorCardAddr;
    return decodeUIntLE(await this.connection.send(req));
  }

  // #17673
  async ReadSmokeWarningOfMonitorCard(
    addr: number,
    portAddr: number,
    scanBoardAddr: number
  ): Promise<number> {
    const req = new Request(
      AddressMapping.Scanner_SmokeWarningOfMonitorCardOccupancy,
      'ReadSmokeWarningOfMonitorCard'
    );
    req.destination = addr;
    req.deviceType = 1;
    req.port = portAddr;
    req.rcvIndex = scanBoardAddr;
    req.address = AddressMapping.Scanner_SmokeWarningOfMonitorCardAddr;
    return decodeUIntLE(await this.connection.send(req));
  }

  // #17705
  async ReadFanSpeedOfMonitorCard(
    addr: number,
    portAddr: number,
    scanBoardAddr: number,
    readCountOfFan: number,
    beginIdnexOfFan: number
  ): Promise<Buffer> {
    const req = new Request(
      AddressMapping.Scanner_FanSpeedOfMonitorCardOccupancy * readCountOfFan,
      'ReadFanSpeedOfMonitorCard'
    );
    req.destination = addr;
    req.deviceType = 1;
    req.port = portAddr;
    req.rcvIndex = scanBoardAddr;
    req.address =
      AddressMapping.Scanner_FanSpeedOfMonitorCardAddr +
      AddressMapping.Scanner_FanSpeedOfMonitorCardOccupancy * beginIdnexOfFan;
    return (await this.connection.send(req)).data;
  }

  // #17733
  async ReadVoltageOfMonitorCard(
    addr: number,
    portAddr: number,
    scanBoardAddr: number,
    readCountOfValtage: number,
    beginIdnexOfValtage: number
  ): Promise<Buffer> {
    const req = new Request(
      AddressMapping.Scanner_VoltageOfMonitorCardOccupancy * readCountOfValtage,
      'ReadVoltageOfMonitorCard'
    );
    req.destination = addr;
    req.deviceType = 1;
    req.port = portAddr;
    req.rcvIndex = scanBoardAddr;
    req.address =
      AddressMapping.Scanner_VoltageOfMonitorCardAddr +
      AddressMapping.Scanner_VoltageOfMonitorCardOccupancy * beginIdnexOfValtage;
    return (await this.connection.send(req)).data;
  }

  // #17761
  async ReadAllStatus(addr: number, portAddr: number, scanBoardAddr: number): Promise<Buffer> {
    const req = new Request(AddressMapping.Scanner_AllMonitorDataOccupancy, 'ReadAllStatus');
    req.destination = addr;
    req.deviceType = 1;
    req.port = portAddr;
    req.rcvIndex = scanBoardAddr;
    req.address = AddressMapping.Scanner_AllMonitorDataAddr;
    return (await this.connection.send(req)).data;
  }

  // #17770
  async ReadAllStatus_1(
    addr: number,
    portAddr: number,
    scanBoardAddr: number,
    readLength: number
  ): Promise<Buffer> {
    const req = new Request(readLength, 'ReadAllStatus_1');
    req.destination = addr;
    req.deviceType = 1;
    req.port = portAddr;
    req.rcvIndex = scanBoardAddr;
    req.address = AddressMapping.Scanner_AllMonitorDataAddr;
    return (await this.connection.send(req)).data;
  }

  // #17779
  async ReadAllModuelStatus(
    addr: number,
    portAddr: number,
    scanBoardAddr: number,
    readLength: number
  ): Promise<Buffer> {
    const req = new Request(readLength, 'ReadAllModuelStatus');
    req.destination = addr;
    req.deviceType = 1;
    req.port = portAddr;
    req.rcvIndex = scanBoardAddr;
    req.address = AddressMapping.Scanner_AllMonitorModuelDataAddr;
    return (await this.connection.send(req)).data;
  }

  // #17918
  async ReadHubMonitorStatus(
    addr: number,
    portAddr: number,
    scanBoardAddr: number
  ): Promise<Buffer> {
    const req = new Request(AddressMapping.Scanner_HubMonitorDataOccupancy, 'ReadHubMonitorStatus');
    req.destination = addr;
    req.deviceType = 1;
    req.port = portAddr;
    req.rcvIndex = scanBoardAddr;
    req.address = AddressMapping.Scanner_HubMonitorAllDataAddr;
    return (await this.connection.send(req)).data;
  }

  // #17927
  async ReadHubMonitorStatus_1(
    addr: number,
    portAddr: number,
    scanBoardAddr: number,
    readLength: number
  ): Promise<Buffer> {
    const req = new Request(readLength, 'ReadHubMonitorStatus_1');
    req.destination = addr;
    req.deviceType = 1;
    req.port = portAddr;
    req.rcvIndex = scanBoardAddr;
    req.address = AddressMapping.Scanner_HubMonitorAllDataAddr;
    return (await this.connection.send(req)).data;
  }

  // #18049
  async ReadAutoCorrectUpload(
    addr: number,
    portAddr: number,
    scanBoardAddr: number
  ): Promise<number> {
    const req = new Request(AddressMapping.AutoCorrectUploadOccupancy, 'ReadAutoCorrectUpload');
    req.destination = addr;
    req.deviceType = 1;
    req.port = portAddr;
    req.rcvIndex = scanBoardAddr;
    req.address = AddressMapping.AutoCorrectUploadAddr;
    return decodeUIntLE(await this.connection.send(req));
  }

  // #18076
  async SetAutoCorrectUpload(
    addr: number,
    portAddr: number,
    scanBoardAddr: number,
    bBroadcast: boolean,
    AutoCorrect: boolean
  ): Promise<void> {
    const req = new Request(AutoCorrect ? [85] : [5], bBroadcast, 'SetAutoCorrectUpload');
    req.destination = addr;
    req.deviceType = 1;
    req.port = portAddr;
    req.rcvIndex = scanBoardAddr;
    req.address = AddressMapping.AutoCorrectUploadAddr;
    await this.connection.send(req);
  }

  // #18094
  async ReadScanCardAllStatus(
    addr: number,
    portAddr: number,
    scanBoardAddr: number
  ): Promise<number> {
    const req = new Request(
      AddressMapping.Scanner_ScanCardAllStatusOccupancy,
      'ReadScanCardAllStatus'
    );
    req.destination = addr;
    req.deviceType = 1;
    req.port = portAddr;
    req.rcvIndex = scanBoardAddr;
    req.address = AddressMapping.Scanner_ScanCardAllStatusAddr;
    return decodeUIntLE(await this.connection.send(req));
  }

  // #18137
  async ReadScanner_MutiChipRamA(
    addr: number,
    portAddr: number,
    scanBoardAddr: number,
    readLength: number
  ): Promise<Buffer> {
    const req = new Request(readLength, 'ReadScanner_MutiChipRamA');
    req.destination = addr;
    req.deviceType = 1;
    req.port = portAddr;
    req.rcvIndex = scanBoardAddr;
    req.address = AddressMapping.Scanner_MutiChipRamAAddr;
    return (await this.connection.send(req)).data;
  }

  // #18159
  async SetScanner_MutiChipRamA(
    addr: number,
    portAddr: number,
    scanBoardAddr: number,
    bBroadcast: boolean,
    mutiChipRamA: number[] | Buffer
  ): Promise<void> {
    if (mutiChipRamA.length !== 0)
      throw new TypeError(`Invalid buffer size: ${mutiChipRamA.length}`);
    const req = new Request(mutiChipRamA, bBroadcast, 'SetScanner_MutiChipRamA');
    req.destination = addr;
    req.deviceType = 1;
    req.port = portAddr;
    req.rcvIndex = scanBoardAddr;
    req.address = AddressMapping.Scanner_MutiChipRamAAddr;
    await this.connection.send(req);
  }

  // #18199
  async ReadScanner_MutiChipRamB(
    addr: number,
    portAddr: number,
    scanBoardAddr: number,
    readLength: number
  ): Promise<Buffer> {
    const req = new Request(readLength, 'ReadScanner_MutiChipRamB');
    req.destination = addr;
    req.deviceType = 1;
    req.port = portAddr;
    req.rcvIndex = scanBoardAddr;
    req.address = AddressMapping.Scanner_MutiChipRamBAddr;
    return (await this.connection.send(req)).data;
  }

  // #18221
  async SetScanner_MutiChipRamB(
    addr: number,
    portAddr: number,
    scanBoardAddr: number,
    bBroadcast: boolean,
    mutiChipRamB: number[] | Buffer
  ): Promise<void> {
    if (mutiChipRamB.length !== 0)
      throw new TypeError(`Invalid buffer size: ${mutiChipRamB.length}`);
    const req = new Request(mutiChipRamB, bBroadcast, 'SetScanner_MutiChipRamB');
    req.destination = addr;
    req.deviceType = 1;
    req.port = portAddr;
    req.rcvIndex = scanBoardAddr;
    req.address = AddressMapping.Scanner_MutiChipRamBAddr;
    await this.connection.send(req);
  }

  // #18261
  async ReadScanner_MutiChipRamC(
    addr: number,
    portAddr: number,
    scanBoardAddr: number,
    readLength: number
  ): Promise<Buffer> {
    const req = new Request(readLength, 'ReadScanner_MutiChipRamC');
    req.destination = addr;
    req.deviceType = 1;
    req.port = portAddr;
    req.rcvIndex = scanBoardAddr;
    req.address = AddressMapping.Scanner_MutiChipRamCAddr;
    return (await this.connection.send(req)).data;
  }

  // #18283
  async SetScanner_MutiChipRamC(
    addr: number,
    portAddr: number,
    scanBoardAddr: number,
    bBroadcast: boolean,
    mutiChipRamC: number[] | Buffer
  ): Promise<void> {
    if (mutiChipRamC.length !== 0)
      throw new TypeError(`Invalid buffer size: ${mutiChipRamC.length}`);
    const req = new Request(mutiChipRamC, bBroadcast, 'SetScanner_MutiChipRamC');
    req.destination = addr;
    req.deviceType = 1;
    req.port = portAddr;
    req.rcvIndex = scanBoardAddr;
    req.address = AddressMapping.Scanner_MutiChipRamCAddr;
    await this.connection.send(req);
  }

  // #18294
  async SetScanner_MutiChipRamD(
    addr: number,
    portAddr: number,
    scanBoardAddr: number,
    bBroadcast: boolean,
    mutiChipRamD: number[] | Buffer
  ): Promise<void> {
    if (mutiChipRamD.length !== 0)
      throw new TypeError(`Invalid buffer size: ${mutiChipRamD.length}`);
    const req = new Request(mutiChipRamD, bBroadcast, 'SetScanner_MutiChipRamD');
    req.destination = addr;
    req.deviceType = 1;
    req.port = portAddr;
    req.rcvIndex = scanBoardAddr;
    req.address = AddressMapping.Scanner_MutiChipRamDAddr;
    await this.connection.send(req);
  }

  // #18334
  async SetScanner_MutiChipICRamA(
    addr: number,
    portAddr: number,
    scanBoardAddr: number,
    bBroadcast: boolean,
    mutiChipRamA: number[] | Buffer
  ): Promise<void> {
    if (mutiChipRamA.length !== 0)
      throw new TypeError(`Invalid buffer size: ${mutiChipRamA.length}`);
    const req = new Request(mutiChipRamA, bBroadcast, 'SetScanner_MutiChipICRamA');
    req.destination = addr;
    req.deviceType = 1;
    req.port = portAddr;
    req.rcvIndex = scanBoardAddr;
    req.address = AddressMapping.Scanner_MutiChipICRamAAddr;
    await this.connection.send(req);
  }

  // #18345
  async SetScanner_MutiChipICRamD(
    addr: number,
    portAddr: number,
    scanBoardAddr: number,
    bBroadcast: boolean,
    mutiChipRamD: number[] | Buffer
  ): Promise<void> {
    if (mutiChipRamD.length !== 0)
      throw new TypeError(`Invalid buffer size: ${mutiChipRamD.length}`);
    const req = new Request(mutiChipRamD, bBroadcast, 'SetScanner_MutiChipICRamD');
    req.destination = addr;
    req.deviceType = 1;
    req.port = portAddr;
    req.rcvIndex = scanBoardAddr;
    req.address = AddressMapping.Scanner_MutiChipICRamDAddr;
    await this.connection.send(req);
  }

  // #18356
  async Set2038SBlankOptimizationLevel1(
    addr: number,
    portAddr: number,
    scanBoardAddr: number,
    bBroadcast: boolean,
    blankLevelValue: number
  ): Promise<void> {
    const req = new Request([blankLevelValue], bBroadcast, 'Set2038SBlankOptimizationLevel1');
    req.destination = addr;
    req.deviceType = 1;
    req.port = portAddr;
    req.rcvIndex = scanBoardAddr;
    req.address = AddressMapping.Scanner_2038SBlankOptimizationLevelAddr1;
    await this.connection.send(req);
  }

  // #18367
  async Read2038SBlankOptimizationLevel1(
    addr: number,
    portAddr: number,
    scanBoardAddr: number
  ): Promise<number> {
    const req = new Request(
      AddressMapping.LowAshCompensationOne5253Occupancy,
      'Read2038SBlankOptimizationLevel1'
    );
    req.destination = addr;
    req.deviceType = 1;
    req.port = portAddr;
    req.rcvIndex = scanBoardAddr;
    req.address = AddressMapping.Scanner_2038SBlankOptimizationLevelAddr1;
    return decodeUIntLE(await this.connection.send(req));
  }

  // #18387
  async Set2038SBlankOptimizationLevel2(
    addr: number,
    portAddr: number,
    scanBoardAddr: number,
    bBroadcast: boolean,
    blankLevelValue: number
  ): Promise<void> {
    const req = new Request([blankLevelValue], bBroadcast, 'Set2038SBlankOptimizationLevel2');
    req.destination = addr;
    req.deviceType = 1;
    req.port = portAddr;
    req.rcvIndex = scanBoardAddr;
    req.address = AddressMapping.Scanner_2038SBlankOptimizationLevelAddr2;
    await this.connection.send(req);
  }

  // #18398
  async Read2038SBlankOptimizationLevel2(
    addr: number,
    portAddr: number,
    scanBoardAddr: number
  ): Promise<number> {
    const req = new Request(
      AddressMapping.Scanner_BlankOptimizationLevelOccupancy,
      'Read2038SBlankOptimizationLevel2'
    );
    req.destination = addr;
    req.deviceType = 1;
    req.port = portAddr;
    req.rcvIndex = scanBoardAddr;
    req.address = AddressMapping.Scanner_2038SBlankOptimizationLevelAddr2;
    return decodeUIntLE(await this.connection.send(req));
  }

  // #18418
  async Set2038SPhotoBlankOptimizationLevel1(
    addr: number,
    portAddr: number,
    scanBoardAddr: number,
    bBroadcast: boolean,
    blankLevelValue: number
  ): Promise<void> {
    const req = new Request([blankLevelValue], bBroadcast, 'Set2038SPhotoBlankOptimizationLevel1');
    req.destination = addr;
    req.deviceType = 1;
    req.port = portAddr;
    req.rcvIndex = scanBoardAddr;
    req.address = AddressMapping.Scanner_2038SPhotoBlankOptimizationLevelAddr1;
    await this.connection.send(req);
  }

  // #18429
  async Set2038SPhotoBlankOptimizationLevel2(
    addr: number,
    portAddr: number,
    scanBoardAddr: number,
    bBroadcast: boolean,
    blankLevelValue: number
  ): Promise<void> {
    const req = new Request([blankLevelValue], bBroadcast, 'Set2038SPhotoBlankOptimizationLevel2');
    req.destination = addr;
    req.deviceType = 1;
    req.port = portAddr;
    req.rcvIndex = scanBoardAddr;
    req.address = AddressMapping.Scanner_2038SPhotoBlankOptimizationLevelAddr2;
    await this.connection.send(req);
  }

  // #18440
  async Set9868ABlankOptimizationLevel1(
    addr: number,
    portAddr: number,
    scanBoardAddr: number,
    bBroadcast: boolean,
    blankLevelValue: number
  ): Promise<void> {
    const req = new Request([blankLevelValue], bBroadcast, 'Set9868ABlankOptimizationLevel1');
    req.destination = addr;
    req.deviceType = 1;
    req.port = portAddr;
    req.rcvIndex = scanBoardAddr;
    req.address = AddressMapping.Scanner_9868ABlankOptimizationLevelAddr1;
    await this.connection.send(req);
  }

  // #18451
  async Read9868ABlankOptimizationLevel1(
    addr: number,
    portAddr: number,
    scanBoardAddr: number
  ): Promise<number> {
    const req = new Request(
      AddressMapping.Scanner_BlankOptimizationLevelOccupancy,
      'Read9868ABlankOptimizationLevel1'
    );
    req.destination = addr;
    req.deviceType = 1;
    req.port = portAddr;
    req.rcvIndex = scanBoardAddr;
    req.address = AddressMapping.Scanner_9868ABlankOptimizationLevelAddr1;
    return decodeUIntLE(await this.connection.send(req));
  }

  // #18471
  async Set9868ABlankOptimizationLevel2(
    addr: number,
    portAddr: number,
    scanBoardAddr: number,
    bBroadcast: boolean,
    blankLevelValue: number
  ): Promise<void> {
    const req = new Request([blankLevelValue], bBroadcast, 'Set9868ABlankOptimizationLevel2');
    req.destination = addr;
    req.deviceType = 1;
    req.port = portAddr;
    req.rcvIndex = scanBoardAddr;
    req.address = AddressMapping.Scanner_9868ABlankOptimizationLevelAddr2;
    await this.connection.send(req);
  }

  // #18482
  async Read9868ABlankOptimizationLevel2(
    addr: number,
    portAddr: number,
    scanBoardAddr: number
  ): Promise<number> {
    const req = new Request(
      AddressMapping.Scanner_BlankOptimizationLevelOccupancy,
      'Read9868ABlankOptimizationLevel2'
    );
    req.destination = addr;
    req.deviceType = 1;
    req.port = portAddr;
    req.rcvIndex = scanBoardAddr;
    req.address = AddressMapping.Scanner_9868ABlankOptimizationLevelAddr2;
    return decodeUIntLE(await this.connection.send(req));
  }

  // #18502
  async Set9868APhotoBlankOptimizationLevel1(
    addr: number,
    portAddr: number,
    scanBoardAddr: number,
    bBroadcast: boolean,
    blankLevelValue: number
  ): Promise<void> {
    const req = new Request([blankLevelValue], bBroadcast, 'Set9868APhotoBlankOptimizationLevel1');
    req.destination = addr;
    req.deviceType = 1;
    req.port = portAddr;
    req.rcvIndex = scanBoardAddr;
    req.address = AddressMapping.Scanner_9868APhotoBlankOptimizationLevelAddr1;
    await this.connection.send(req);
  }

  // #18513
  async Set9868APhotoBlankOptimizationLevel2(
    addr: number,
    portAddr: number,
    scanBoardAddr: number,
    bBroadcast: boolean,
    blankLevelValue: number
  ): Promise<void> {
    const req = new Request([blankLevelValue], bBroadcast, 'Set9868APhotoBlankOptimizationLevel2');
    req.destination = addr;
    req.deviceType = 1;
    req.port = portAddr;
    req.rcvIndex = scanBoardAddr;
    req.address = AddressMapping.Scanner_9868APhotoBlankOptimizationLevelAddr2;
    await this.connection.send(req);
  }

  // #18524
  async ReadScanner_NewOETable(
    addr: number,
    portAddr: number,
    scanBoardAddr: number
  ): Promise<Buffer> {
    const req = new Request(AddressMapping.NewOETableOccupancy, 'ReadScanner_NewOETable');
    req.destination = addr;
    req.deviceType = 1;
    req.port = portAddr;
    req.rcvIndex = scanBoardAddr;
    req.address = AddressMapping.NewOETableAddr;
    return (await this.connection.send(req)).data;
  }

  // #18544
  async SetScanner_NewOETable(
    addr: number,
    portAddr: number,
    scanBoardAddr: number,
    bBroadcast: boolean,
    newOETable: number[] | Buffer
  ): Promise<void> {
    if (newOETable.length !== AddressMapping.NewOETableOccupancy)
      throw new TypeError(`Invalid buffer size: ${newOETable.length}`);
    const req = new Request(newOETable, bBroadcast, 'SetScanner_NewOETable');
    req.destination = addr;
    req.deviceType = 1;
    req.port = portAddr;
    req.rcvIndex = scanBoardAddr;
    req.address = AddressMapping.NewOETableAddr;
    await this.connection.send(req);
  }

  // #18558
  async ReadScanner_NewOEHighTable(
    addr: number,
    portAddr: number,
    scanBoardAddr: number
  ): Promise<Buffer> {
    const req = new Request(AddressMapping.NewOEHighTableOccupancy, 'ReadScanner_NewOEHighTable');
    req.destination = addr;
    req.deviceType = 1;
    req.port = portAddr;
    req.rcvIndex = scanBoardAddr;
    req.address = AddressMapping.NewOEHighTableAddr;
    return (await this.connection.send(req)).data;
  }

  // #18578
  async SetScanner_NewOEHighTable(
    addr: number,
    portAddr: number,
    scanBoardAddr: number,
    bBroadcast: boolean,
    newOETable: number[] | Buffer
  ): Promise<void> {
    if (newOETable.length !== AddressMapping.NewOEHighTableOccupancy)
      throw new TypeError(`Invalid buffer size: ${newOETable.length}`);
    const req = new Request(newOETable, bBroadcast, 'SetScanner_NewOEHighTable');
    req.destination = addr;
    req.deviceType = 1;
    req.port = portAddr;
    req.rcvIndex = scanBoardAddr;
    req.address = AddressMapping.NewOEHighTableAddr;
    await this.connection.send(req);
  }

  // #18587
  async ReadScanner_ColorRestore(
    addr: number,
    portAddr: number,
    scanBoardAddr: number
  ): Promise<Buffer> {
    const req = new Request(AddressMapping.ColorRestoreOccupancy, 'ReadScanner_ColorRestore');
    req.destination = addr;
    req.deviceType = 1;
    req.port = portAddr;
    req.rcvIndex = scanBoardAddr;
    req.address = AddressMapping.ColorRestoreAddr;
    return (await this.connection.send(req)).data;
  }

  // #18607
  async SetScanner_ColorRestore(
    addr: number,
    portAddr: number,
    scanBoardAddr: number,
    bBroadcast: boolean,
    colorRestore: number[] | Buffer
  ): Promise<void> {
    if (colorRestore.length !== AddressMapping.ColorRestoreOccupancy)
      throw new TypeError(`Invalid buffer size: ${colorRestore.length}`);
    const req = new Request(colorRestore, bBroadcast, 'SetScanner_ColorRestore');
    req.destination = addr;
    req.deviceType = 1;
    req.port = portAddr;
    req.rcvIndex = scanBoardAddr;
    req.address = AddressMapping.ColorRestoreAddr;
    await this.connection.send(req);
  }

  // #18616
  async SetScanner_DMFirst(
    addr: number,
    portAddr: number,
    scanBoardAddr: number,
    bBroadcast: boolean,
    DMFirst: number[] | Buffer
  ): Promise<void> {
    if (DMFirst.length !== 0) throw new TypeError(`Invalid buffer size: ${DMFirst.length}`);
    const req = new Request(DMFirst, bBroadcast, 'SetScanner_DMFirst');
    req.destination = addr;
    req.deviceType = 1;
    req.port = portAddr;
    req.rcvIndex = scanBoardAddr;
    req.address = AddressMapping.Scanner_DmFirstAddr;
    await this.connection.send(req);
  }

  // #18626
  async SetScanner_DMPM(
    addr: number,
    portAddr: number,
    scanBoardAddr: number,
    bBroadcast: boolean,
    DMPM: number[] | Buffer
  ): Promise<void> {
    if (DMPM.length !== 0) throw new TypeError(`Invalid buffer size: ${DMPM.length}`);
    const req = new Request(DMPM, bBroadcast, 'SetScanner_DMPM');
    req.destination = addr;
    req.deviceType = 1;
    req.port = portAddr;
    req.rcvIndex = scanBoardAddr;
    req.address = AddressMapping.Scanner_DmPMAAddr;
    await this.connection.send(req);
  }

  // #18636
  async SetScanner_DMSecond(
    addr: number,
    portAddr: number,
    scanBoardAddr: number,
    bBroadcast: boolean,
    DMSecond: number[] | Buffer
  ): Promise<void> {
    if (DMSecond.length !== 0) throw new TypeError(`Invalid buffer size: ${DMSecond.length}`);
    const req = new Request(DMSecond, bBroadcast, 'SetScanner_DMSecond');
    req.destination = addr;
    req.deviceType = 1;
    req.port = portAddr;
    req.rcvIndex = scanBoardAddr;
    req.address = AddressMapping.Scanner_DmSecondAddr;
    await this.connection.send(req);
  }

  // #18646
  async SetScanner_DMThird(
    addr: number,
    portAddr: number,
    scanBoardAddr: number,
    bBroadcast: boolean,
    DMThird: number[] | Buffer
  ): Promise<void> {
    if (DMThird.length !== 0) throw new TypeError(`Invalid buffer size: ${DMThird.length}`);
    const req = new Request(DMThird, bBroadcast, 'SetScanner_DMThird');
    req.destination = addr;
    req.deviceType = 1;
    req.port = portAddr;
    req.rcvIndex = scanBoardAddr;
    req.address = AddressMapping.Scanner_DmThirdAAddr;
    await this.connection.send(req);
  }

  // #18668
  async SetScanner_OE(
    addr: number,
    portAddr: number,
    scanBoardAddr: number,
    bBroadcast: boolean,
    DMThird: number[] | Buffer
  ): Promise<void> {
    if (DMThird.length !== 0) throw new TypeError(`Invalid buffer size: ${DMThird.length}`);
    const req = new Request(DMThird, bBroadcast, 'SetScanner_OE');
    req.destination = addr;
    req.deviceType = 1;
    req.port = portAddr;
    req.rcvIndex = scanBoardAddr;
    req.address = AddressMapping.Scanner_OEAAddr;
    await this.connection.send(req);
  }

  // #18690
  async SetScanner_DMWSP(
    addr: number,
    portAddr: number,
    scanBoardAddr: number,
    bBroadcast: boolean,
    DMWSP: number[] | Buffer
  ): Promise<void> {
    if (DMWSP.length !== 0) throw new TypeError(`Invalid buffer size: ${DMWSP.length}`);
    const req = new Request(DMWSP, bBroadcast, 'SetScanner_DMWSP');
    req.destination = addr;
    req.deviceType = 1;
    req.port = portAddr;
    req.rcvIndex = scanBoardAddr;
    req.address = AddressMapping.Scanner_DmWSPAAddr;
    await this.connection.send(req);
  }

  // #18765
  async ReadScanner_DMFirst(
    addr: number,
    portAddr: number,
    scanBoardAddr: number,
    readLength: number
  ): Promise<Buffer> {
    const req = new Request(readLength, 'ReadScanner_DMFirst');
    req.destination = addr;
    req.deviceType = 1;
    req.port = portAddr;
    req.rcvIndex = scanBoardAddr;
    req.address = AddressMapping.Scanner_DmFirstAddr;
    return (await this.connection.send(req)).data;
  }

  // #18773
  async ReadScanner_DMPM(
    addr: number,
    portAddr: number,
    scanBoardAddr: number,
    readLength: number
  ): Promise<Buffer> {
    const req = new Request(readLength, 'ReadScanner_DMPM');
    req.destination = addr;
    req.deviceType = 1;
    req.port = portAddr;
    req.rcvIndex = scanBoardAddr;
    req.address = AddressMapping.Scanner_DmPMAAddr;
    return (await this.connection.send(req)).data;
  }

  // #18781
  async ReadScanner_DMSecond(
    addr: number,
    portAddr: number,
    scanBoardAddr: number,
    readLength: number
  ): Promise<Buffer> {
    const req = new Request(readLength, 'ReadScanner_DMSecond');
    req.destination = addr;
    req.deviceType = 1;
    req.port = portAddr;
    req.rcvIndex = scanBoardAddr;
    req.address = AddressMapping.Scanner_DmSecondAddr;
    return (await this.connection.send(req)).data;
  }

  // #18789
  async ReadScanner_DMThird(
    addr: number,
    portAddr: number,
    scanBoardAddr: number,
    readLength: number
  ): Promise<Buffer> {
    const req = new Request(readLength, 'ReadScanner_DMThird');
    req.destination = addr;
    req.deviceType = 1;
    req.port = portAddr;
    req.rcvIndex = scanBoardAddr;
    req.address = AddressMapping.Scanner_DmThirdAAddr;
    return (await this.connection.send(req)).data;
  }

  // #18797
  async ReadScanner_DMWSP(
    addr: number,
    portAddr: number,
    scanBoardAddr: number,
    readLength: number
  ): Promise<Buffer> {
    const req = new Request(readLength, 'ReadScanner_DMWSP');
    req.destination = addr;
    req.deviceType = 1;
    req.port = portAddr;
    req.rcvIndex = scanBoardAddr;
    req.address = AddressMapping.Scanner_DmWSPAAddr;
    return (await this.connection.send(req)).data;
  }

  // #18805
  async ReadScanner_LowGrayCodeTable(
    addr: number,
    portAddr: number,
    scanBoardAddr: number
  ): Promise<Buffer> {
    const req = new Request(
      AddressMapping.LowGrayCodeTableOccupancy,
      'ReadScanner_LowGrayCodeTable'
    );
    req.destination = addr;
    req.deviceType = 1;
    req.port = portAddr;
    req.rcvIndex = scanBoardAddr;
    req.address = AddressMapping.LowGrayCodeTableAddr;
    return (await this.connection.send(req)).data;
  }

  // #18825
  async SetScanner_LowGrayCodeTable(
    addr: number,
    portAddr: number,
    scanBoardAddr: number,
    bBroadcast: boolean,
    lowGrayCodeTable: number[] | Buffer
  ): Promise<void> {
    if (lowGrayCodeTable.length !== AddressMapping.LowGrayCodeTableOccupancy)
      throw new TypeError(`Invalid buffer size: ${lowGrayCodeTable.length}`);
    const req = new Request(lowGrayCodeTable, bBroadcast, 'SetScanner_LowGrayCodeTable');
    req.destination = addr;
    req.deviceType = 1;
    req.port = portAddr;
    req.rcvIndex = scanBoardAddr;
    req.address = AddressMapping.LowGrayCodeTableAddr;
    await this.connection.send(req);
  }

  // #18834
  async SetScanner_AutoRefreshRate(
    addr: number,
    portAddr: number,
    scanBoardAddr: number,
    bBroadcast: boolean,
    autoRefreshRateData: number[] | Buffer
  ): Promise<void> {
    const req = new Request(autoRefreshRateData, bBroadcast, 'SetScanner_AutoRefreshRate');
    req.destination = addr;
    req.deviceType = 1;
    req.port = portAddr;
    req.rcvIndex = scanBoardAddr;
    req.address = AddressMapping.AutoRefreshRateAddr;
    await this.connection.send(req);
  }

  // #18843
  async ReadSingleChipMicyocoSpaceAuto(
    addr: number,
    portAddr: number,
    scanBoardAddr: number
  ): Promise<Buffer> {
    const req = new Request(
      AddressMapping.SingleChipMicyocoSpaceAutoOccupancy,
      'ReadSingleChipMicyocoSpaceAuto'
    );
    req.destination = addr;
    req.deviceType = 1;
    req.port = portAddr;
    req.rcvIndex = scanBoardAddr;
    req.address = AddressMapping.SingleChipMicyocoSpaceAutoAddr;
    return (await this.connection.send(req)).data;
  }

  // #18867
  async ReadSingleChipMicyocoSpace(
    addr: number,
    portAddr: number,
    scanBoardAddr: number
  ): Promise<number> {
    const req = new Request(
      AddressMapping.SingleChipMicyocoSpaceOccupancy,
      'ReadSingleChipMicyocoSpace'
    );
    req.destination = addr;
    req.deviceType = 1;
    req.port = portAddr;
    req.rcvIndex = scanBoardAddr;
    req.address = AddressMapping.SingleChipMicyocoSpaceAddr;
    return decodeUIntLE(await this.connection.send(req));
  }

  // #18887
  async SetSingleChipMicyocoSpace(
    addr: number,
    portAddr: number,
    scanBoardAddr: number,
    bBroadcast: boolean,
    singleChipMicyocoSpace: number
  ): Promise<void> {
    const $data = encodeUIntLE(
      singleChipMicyocoSpace,
      AddressMapping.ConnectRelayTemperatureOccupancy
    );
    const req = new Request($data, bBroadcast, 'SetSingleChipMicyocoSpace');
    req.destination = addr;
    req.deviceType = 1;
    req.port = portAddr;
    req.rcvIndex = scanBoardAddr;
    req.address = AddressMapping.SingleChipMicyocoSpaceAddr;
    await this.connection.send(req);
  }

  // #18897
  async ReadConnectRelayTemperature(
    addr: number,
    portAddr: number,
    scanBoardAddr: number
  ): Promise<number> {
    const req = new Request(
      AddressMapping.ConnectRelayTemperatureOccupancy,
      'ReadConnectRelayTemperature'
    );
    req.destination = addr;
    req.deviceType = 1;
    req.port = portAddr;
    req.rcvIndex = scanBoardAddr;
    req.address = AddressMapping.ConnectRelayTemperatureAddr;
    return decodeUIntLE(await this.connection.send(req));
  }

  SetConnectRelayTemperature = (): void => {
    throw new TypeError('Not implemented');
  };

  // #18930
  async ReadDisConnectRelayTemperature(
    addr: number,
    portAddr: number,
    scanBoardAddr: number
  ): Promise<number> {
    const req = new Request(
      AddressMapping.DisConnectRelayTemperatureOccupancy,
      'ReadDisConnectRelayTemperature'
    );
    req.destination = addr;
    req.deviceType = 1;
    req.port = portAddr;
    req.rcvIndex = scanBoardAddr;
    req.address = AddressMapping.DisConnectRelayTemperatureAddr;
    return decodeUIntLE(await this.connection.send(req));
  }

  SetDisConnectRelayTemperature = (): void => {
    throw new TypeError('Not implemented');
  };

  // #18963
  async ReadFanSpeedGearCircuitInfo(
    addr: number,
    portAddr: number,
    scanBoardAddr: number
  ): Promise<number> {
    const req = new Request(AddressMapping.FanSpeedGearOccupancy, 'ReadFanSpeedGearCircuitInfo');
    req.destination = addr;
    req.deviceType = 1;
    req.port = portAddr;
    req.rcvIndex = scanBoardAddr;
    req.address = AddressMapping.FanSpeedGearAddr;
    return decodeUIntLE(await this.connection.send(req));
  }

  // #18984
  async ReadScannerRecordTime(
    addr: number,
    portAddr: number,
    scanBoardAddr: number
  ): Promise<number> {
    const req = new Request(AddressMapping.ScannerRecordTimeOccupancy, 'ReadScannerRecordTime');
    req.destination = addr;
    req.deviceType = 1;
    req.port = portAddr;
    req.rcvIndex = scanBoardAddr;
    req.address = AddressMapping.ScannerRecordTimeAddr;
    return decodeUIntLE(await this.connection.send(req));
  }

  // #19004
  async SetScannerRecordTime(
    addr: number,
    portAddr: number,
    scanBoardAddr: number,
    bBroadcast: boolean
  ): Promise<void> {
    const $data = encodeUIntLE(0, AddressMapping.ScannerRecordTimeOccupancy);
    const req = new Request($data, bBroadcast, 'SetScannerRecordTime');
    req.destination = addr;
    req.deviceType = 1;
    req.port = portAddr;
    req.rcvIndex = scanBoardAddr;
    req.address = AddressMapping.ScannerRecordTimeAddr;
    await this.connection.send(req);
  }

  // #19014
  async ReadPowerWorkState(
    addr: number,
    portAddr: number,
    scanBoardAddr: number,
    powerBackNumber: number
  ): Promise<Buffer> {
    const req = new Request(powerBackNumber, 'ReadPowerWorkState');
    req.destination = addr;
    req.deviceType = 1;
    req.port = portAddr;
    req.rcvIndex = scanBoardAddr;
    req.address = AddressMapping.PowerWorkStateAddr;
    return (await this.connection.send(req)).data;
  }

  // #19034
  async ReadScannerDigitalTubeSwitch(
    addr: number,
    portAddr: number,
    scanBoardAddr: number
  ): Promise<number> {
    const req = new Request(
      AddressMapping.ScannerDigitalTubeSwitchOccupancy,
      'ReadScannerDigitalTubeSwitch'
    );
    req.destination = addr;
    req.deviceType = 1;
    req.port = portAddr;
    req.rcvIndex = scanBoardAddr;
    req.address = AddressMapping.ScannerDigitalTubeSwitchAddr;
    return decodeUIntLE(await this.connection.send(req));
  }

  // #19057
  async SetScannerDigitalTubeSwitch(
    addr: number,
    portAddr: number,
    scanBoardAddr: number,
    bBroadcast: boolean,
    isOpen: boolean
  ): Promise<void> {
    const req = new Request(isOpen ? [22] : [0], bBroadcast, 'SetScannerDigitalTubeSwitch');
    req.destination = addr;
    req.deviceType = 1;
    req.port = portAddr;
    req.rcvIndex = scanBoardAddr;
    req.address = AddressMapping.ScannerDigitalTubeSwitchAddr;
    await this.connection.send(req);
  }

  // #19071
  async ReadConfigFileID(addr: number, portAddr: number, scanBoardAddr: number): Promise<number> {
    const req = new Request(AddressMapping.ScannerConfigFileIDOccupancy, 'ReadConfigFileID');
    req.destination = addr;
    req.deviceType = 1;
    req.port = portAddr;
    req.rcvIndex = scanBoardAddr;
    req.address = AddressMapping.ScannerConfigFileIDAddr;
    return decodeUIntLE(await this.connection.send(req));
  }

  // #19091
  async SetConfigFileID(
    addr: number,
    portAddr: number,
    scanBoardAddr: number,
    bBroadcast: boolean,
    configFileID: number
  ): Promise<void> {
    const $data = encodeUIntLE(configFileID, AddressMapping.ScannerConfigFileIDOccupancy);
    const req = new Request($data, bBroadcast, 'SetConfigFileID');
    req.destination = addr;
    req.deviceType = 1;
    req.port = portAddr;
    req.rcvIndex = scanBoardAddr;
    req.address = AddressMapping.ScannerConfigFileIDAddr;
    await this.connection.send(req);
  }

  // #19101
  async ReadScannerIrCabientCfg(
    addr: number,
    portAddr: number,
    scanBoardAddr: number
  ): Promise<Buffer> {
    const req = new Request(
      AddressMapping.ScannerIrCanbinetCfgOccupancy,
      'ReadScannerIrCabientCfg'
    );
    req.destination = addr;
    req.deviceType = 1;
    req.port = portAddr;
    req.rcvIndex = scanBoardAddr;
    req.address = AddressMapping.ScannerIrCanbinetCfgAddr;
    return (await this.connection.send(req)).data;
  }

  // #19122
  async SetScannerIrCabientCfg(
    addr: number,
    portAddr: number,
    scanBoardAddr: number,
    bBroadcast: boolean,
    data: number[] | Buffer
  ): Promise<void> {
    const req = new Request(data, bBroadcast, 'SetScannerIrCabientCfg');
    req.destination = addr;
    req.deviceType = 1;
    req.port = portAddr;
    req.rcvIndex = scanBoardAddr;
    req.address = AddressMapping.ScannerIrCanbinetCfgAddr;
    await this.connection.send(req);
  }

  // #19131
  async ReadScannerCabinetID(
    addr: number,
    portAddr: number,
    scanBoardAddr: number
  ): Promise<Buffer> {
    const req = new Request(AddressMapping.ScannerCabinetIDOccupancy, 'ReadScannerCabinetID');
    req.destination = addr;
    req.deviceType = 1;
    req.port = portAddr;
    req.rcvIndex = scanBoardAddr;
    req.address = AddressMapping.ScannerCabinetIDAddr;
    return (await this.connection.send(req)).data;
  }

  SetScannerCabinetID = (): void => {
    throw new TypeError('Not implemented');
  };

  // #19199
  async ReadScannerCabinetCorrectLocationSize(
    addr: number,
    portAddr: number,
    scanBoardAddr: number
  ): Promise<Buffer> {
    const req = new Request(
      AddressMapping.ScannerCabinetCorrectLocationSizeOccupancy,
      'ReadScannerCabinetCorrectLocationSize'
    );
    req.destination = addr;
    req.deviceType = 1;
    req.port = portAddr;
    req.rcvIndex = scanBoardAddr;
    req.address = AddressMapping.ScannerCabinetCorrectLocationSizeAddr;
    return (await this.connection.send(req)).data;
  }

  SetScannerCabinetCorrectLocationSize = (): void => {
    throw new TypeError('Not implemented');
  };

  // #19260
  async ReadSpecialFrameRate(
    addr: number,
    portAddr: number,
    scanBoardAddr: number
  ): Promise<number> {
    const req = new Request(AddressMapping.SpecialFrameRateOccupancy, 'ReadSpecialFrameRate');
    req.destination = addr;
    req.deviceType = 1;
    req.port = portAddr;
    req.rcvIndex = scanBoardAddr;
    req.address = AddressMapping.SpecialFrameRateAddr;
    return decodeUIntLE(await this.connection.send(req));
  }

  SetSpecialFrameRate = (): void => {
    throw new TypeError('Not implemented');
  };

  // #19292
  async ReadMoudleNumber(addr: number, portAddr: number, scanBoardAddr: number): Promise<number> {
    const req = new Request(AddressMapping.ScannerMoudleNumberOccupancy, 'ReadMoudleNumber');
    req.destination = addr;
    req.deviceType = 1;
    req.port = portAddr;
    req.rcvIndex = scanBoardAddr;
    req.address = AddressMapping.ScanneMoudleNumberAddr;
    return decodeUIntLE(await this.connection.send(req));
  }

  // #19313
  async SetMoudleNumber(
    addr: number,
    portAddr: number,
    scanBoardAddr: number,
    bBroadcast: boolean,
    MoudleNumber: number
  ): Promise<void> {
    const $data = encodeUIntLE(MoudleNumber, AddressMapping.ScannerMoudleNumberOccupancy);
    const req = new Request($data, bBroadcast, 'SetMoudleNumber');
    req.destination = addr;
    req.deviceType = 1;
    req.port = portAddr;
    req.rcvIndex = scanBoardAddr;
    req.address = AddressMapping.ScanneMoudleNumberAddr;
    await this.connection.send(req);
  }

  // #19323
  async ReadDoubleCardSpace(
    addr: number,
    portAddr: number,
    scanBoardAddr: number
  ): Promise<number> {
    const req = new Request(
      AddressMapping.DoubleModelCardSpaceCardSpaceOccupancy,
      'ReadDoubleCardSpace'
    );
    req.destination = addr;
    req.deviceType = 1;
    req.port = portAddr;
    req.rcvIndex = scanBoardAddr;
    req.address = AddressMapping.DoubleModelCardSpaceCardSpace;
    return decodeUIntLE(await this.connection.send(req));
  }

  // #19343
  async SetScannerRecordCmd(
    addr: number,
    portAddr: number,
    scanBoardAddr: number,
    bBroadcast: boolean,
    bStartRecord: boolean
  ): Promise<void> {
    const req = new Request(bStartRecord ? [1] : [0], bBroadcast, 'SetScannerRecordCmd');
    req.destination = addr;
    req.deviceType = 1;
    req.port = portAddr;
    req.rcvIndex = scanBoardAddr;
    req.address = AddressMapping.DoubleModelCardSpaceRecordCmd;
    await this.connection.send(req);
  }

  // #19361
  async ReadDoubleCardRecordCmd(
    addr: number,
    portAddr: number,
    scanBoardAddr: number
  ): Promise<number> {
    const req = new Request(
      AddressMapping.DoubleModelCardSpaceRecordCmdOccupancy,
      'ReadDoubleCardRecordCmd'
    );
    req.destination = addr;
    req.deviceType = 1;
    req.port = portAddr;
    req.rcvIndex = scanBoardAddr;
    req.address = AddressMapping.DoubleModelCardSpaceRecordCmd;
    return decodeUIntLE(await this.connection.send(req));
  }

  // #19381
  async ReadDoubleCardEaraseState(
    addr: number,
    portAddr: number,
    scanBoardAddr: number
  ): Promise<number> {
    const req = new Request(
      AddressMapping.DoubleModelCardSpaceEaraseStateOccupancy,
      'ReadDoubleCardEaraseState'
    );
    req.destination = addr;
    req.deviceType = 1;
    req.port = portAddr;
    req.rcvIndex = scanBoardAddr;
    req.address = AddressMapping.DoubleModelCardSpaceEaraseState;
    return decodeUIntLE(await this.connection.send(req));
  }

  // #19410
  async SetDoubleCardEaraseState(
    addr: number,
    portAddr: number,
    scanBoardAddr: number,
    bBroadcast: boolean,
    EaraseTag: number
  ): Promise<void> {
    const $data = encodeUIntLE(
      EaraseTag,
      AddressMapping.DoubleModelCardSpaceNandFlashEaraseOccupancy
    );
    const req = new Request($data, bBroadcast, 'SetDoubleCardEaraseState');
    req.destination = addr;
    req.deviceType = 1;
    req.port = portAddr;
    req.rcvIndex = scanBoardAddr;
    req.address = AddressMapping.DoubleModelCardSpaceNandFlashEarase;
    await this.connection.send(req);
  }

  // #19420
  async ReadDoubleEaraseStateCmd(
    addr: number,
    portAddr: number,
    scanBoardAddr: number
  ): Promise<number> {
    const req = new Request(
      AddressMapping.DoubleModelCardSpaceNandFlashEaraseOccupancy,
      'ReadDoubleEaraseStateCmd'
    );
    req.destination = addr;
    req.deviceType = 1;
    req.port = portAddr;
    req.rcvIndex = scanBoardAddr;
    req.address = AddressMapping.DoubleModelCardSpaceNandFlashEarase;
    return decodeUIntLE(await this.connection.send(req));
  }

  // #19440
  async ReadDoubleModelFrameRate(
    addr: number,
    portAddr: number,
    scanBoardAddr: number
  ): Promise<number> {
    const req = new Request(
      AddressMapping.DoubleModelCardSpaceRecordFreOccupancy,
      'ReadDoubleModelFrameRate'
    );
    req.destination = addr;
    req.deviceType = 1;
    req.port = portAddr;
    req.rcvIndex = scanBoardAddr;
    req.address = AddressMapping.DoubleModelCardSpaceRecordFre;
    return decodeUIntLE(await this.connection.send(req));
  }

  // #19460
  async SetScannerFrameRate(
    addr: number,
    portAddr: number,
    scanBoardAddr: number,
    bBroadcast: boolean,
    frameRate: number
  ): Promise<void> {
    const $data = encodeUIntLE(frameRate, AddressMapping.DoubleModelCardSpaceRecordFreOccupancy);
    const req = new Request($data, bBroadcast, 'SetScannerFrameRate');
    req.destination = addr;
    req.deviceType = 1;
    req.port = portAddr;
    req.rcvIndex = scanBoardAddr;
    req.address = AddressMapping.DoubleModelCardSpaceRecordFre;
    await this.connection.send(req);
  }

  // #19470
  async ReadModuleConfigInfo(
    addr: number,
    portAddr: number,
    scanBoardAddr: number,
    readLength: number
  ): Promise<Buffer> {
    const req = new Request(readLength, 'ReadModuleConfigInfo');
    req.destination = addr;
    req.deviceType = 1;
    req.port = portAddr;
    req.rcvIndex = scanBoardAddr;
    req.address = AddressMapping.ModuleConfigInfoAddr;
    return (await this.connection.send(req)).data;
  }

  // #19492
  async SetModuleConfigInfo(
    addr: number,
    portAddr: number,
    scanBoardAddr: number,
    bBroadcast: boolean,
    data: number[] | Buffer
  ): Promise<void> {
    const req = new Request(data, bBroadcast, 'SetModuleConfigInfo');
    req.destination = addr;
    req.deviceType = 1;
    req.port = portAddr;
    req.rcvIndex = scanBoardAddr;
    req.address = AddressMapping.ModuleConfigInfoAddr;
    await this.connection.send(req);
  }

  // #19501
  async ExtendModuleOperCmd(
    addr: number,
    portAddr: number,
    scanBoardAddr: number,
    bBroadcast: boolean,
    data: number[] | Buffer,
    length: number
  ): Promise<void> {
    if (data.length !== length) throw new TypeError(`Invalid buffer size: ${data.length}`);
    const req = new Request(data, bBroadcast, 'ExtendModuleOperCmd');
    req.destination = addr;
    req.deviceType = 1;
    req.port = portAddr;
    req.rcvIndex = scanBoardAddr;
    req.address = AddressMapping.ModuleOperCmdAddr;
    await this.connection.send(req);
  }

  // #19510
  async ReadExtendModuleConfigInfo(
    addr: number,
    portAddr: number,
    scanBoardAddr: number,
    readLength: number
  ): Promise<Buffer> {
    const req = new Request(readLength, 'ReadExtendModuleConfigInfo');
    req.destination = addr;
    req.deviceType = 1;
    req.port = portAddr;
    req.rcvIndex = scanBoardAddr;
    req.address = AddressMapping.ModuleConfigInfoAddr;
    return (await this.connection.send(req)).data;
  }

  // #19532
  async ReadScannerBacklightSwitch(
    addr: number,
    portAddr: number,
    scanBoardAddr: number
  ): Promise<number> {
    const req = new Request(
      AddressMapping.ScannerBacklightSwitchOccupancy,
      'ReadScannerBacklightSwitch'
    );
    req.destination = addr;
    req.deviceType = 1;
    req.port = portAddr;
    req.rcvIndex = scanBoardAddr;
    req.address = AddressMapping.ScannerBacklightSwitchAddr;
    return decodeUIntLE(await this.connection.send(req));
  }

  // #19555
  async SetScannerBacklightSwitch(
    addr: number,
    portAddr: number,
    scanBoardAddr: number,
    bBroadcast: boolean,
    isOpen: boolean
  ): Promise<void> {
    const req = new Request(isOpen ? [22] : [0], bBroadcast, 'SetScannerBacklightSwitch');
    req.destination = addr;
    req.deviceType = 1;
    req.port = portAddr;
    req.rcvIndex = scanBoardAddr;
    req.address = AddressMapping.ScannerBacklightSwitchAddr;
    await this.connection.send(req);
  }

  // #19569
  async ReadBitErrorRateData(
    addr: number,
    portAddr: number,
    scanBoardAddr: number
  ): Promise<Buffer> {
    const req = new Request(AddressMapping.BitErrorRateOccupancy, 'ReadBitErrorRateData');
    req.destination = addr;
    req.deviceType = 1;
    req.port = portAddr;
    req.rcvIndex = scanBoardAddr;
    req.address = AddressMapping.BitErrorRateAddr;
    return (await this.connection.send(req)).data;
  }

  // #19593
  async WriteBitErrorRateClearData(
    addr: number,
    portAddr: number,
    scanBoardAddr: number,
    bBroadcast: boolean
  ): Promise<void> {
    const req = new Request([5], bBroadcast, 'WriteBitErrorRateClearData');
    req.destination = addr;
    req.deviceType = 1;
    req.port = portAddr;
    req.rcvIndex = scanBoardAddr;
    req.address = AddressMapping.BitErrorRateClearAddr;
    await this.connection.send(req);
  }

  // #19603
  async WriteScanerSlavaFlashToSdram(
    addr: number,
    portAddr: number,
    scanBoardAddr: number,
    bBroadcast: boolean
  ): Promise<void> {
    const req = new Request([134], bBroadcast, 'WriteScanerSlavaFlashToSdram');
    req.destination = addr;
    req.deviceType = 1;
    req.port = portAddr;
    req.rcvIndex = scanBoardAddr;
    req.address = AddressMapping.ScannerSlavaFlashToSdramAddr;
    await this.connection.send(req);
  }

  // #19613
  async WriteScanerSdramToSlaveFlash(
    addr: number,
    portAddr: number,
    scanBoardAddr: number,
    bBroadcast: boolean
  ): Promise<void> {
    const req = new Request([133], bBroadcast, 'WriteScanerSdramToSlaveFlash');
    req.destination = addr;
    req.deviceType = 1;
    req.port = portAddr;
    req.rcvIndex = scanBoardAddr;
    req.address = AddressMapping.ScannerSdramToSlaveFlash;
    await this.connection.send(req);
  }

  // #19623
  async MoveCorrectionFromSlaveFlashToSdram(
    addr: number,
    portAddr: number,
    scanBoardAddr: number,
    bBroadcast: boolean,
    coef: CoefTypeEnum
  ): Promise<void> {
    const req = new Request(
      coef === CoefTypeEnum.MultiLayer ? Buffer.alloc(1) : [5],
      bBroadcast,
      'MoveCorrectionFromSlaveFlashToSdram'
    );
    req.destination = addr;
    req.deviceType = 1;
    req.port = portAddr;
    req.rcvIndex = scanBoardAddr;
    req.address =
      coef === CoefTypeEnum.MultiLayer
        ? AddressMapping.Correction_FactoryAddr_MultiLayer
        : AddressMapping.Correction_FactoryAddr;
    await this.connection.send(req);
  }

  // #19634
  async ReadScannerState(addr: number, portAddr: number, scanBoardAddr: number): Promise<Buffer> {
    const req = new Request(AddressMapping.ScannerStateBaseOccupancy, 'ReadScannerState');
    req.destination = addr;
    req.deviceType = 1;
    req.port = portAddr;
    req.rcvIndex = scanBoardAddr;
    req.address = AddressMapping.ScannerStateBaseAddr;
    return (await this.connection.send(req)).data;
  }

  // #19643
  async MoveCorrectionFromMasterFlashToSdram(
    addr: number,
    portAddr: number,
    scanBoardAddr: number,
    bBroadcast: boolean,
    coef: CoefTypeEnum
  ): Promise<void> {
    const req = new Request(Buffer.alloc(1), bBroadcast, 'MoveCorrectionFromMasterFlashToSdram');
    req.destination = addr;
    req.deviceType = 1;
    req.port = portAddr;
    req.rcvIndex = scanBoardAddr;
    req.address =
      coef === CoefTypeEnum.MultiLayer
        ? AddressMapping.Correction_ApplicationAddr_MultiLayer
        : AddressMapping.Correction_ApplicationAddr;
    await this.connection.send(req);
  }

  // #19654
  async MoveCorrectionFromSdramToSlaveFlash(
    addr: number,
    portAddr: number,
    scanBoardAddr: number,
    bBroadcast: boolean,
    coef: CoefTypeEnum
  ): Promise<void> {
    const req = new Request(
      coef === CoefTypeEnum.MultiLayer ? Buffer.alloc(1) : [5],
      bBroadcast,
      'MoveCorrectionFromSdramToSlaveFlash'
    );
    req.destination = addr;
    req.deviceType = 1;
    req.port = portAddr;
    req.rcvIndex = scanBoardAddr;
    req.address =
      coef === CoefTypeEnum.MultiLayer
        ? AddressMapping.Correction_SolidificationAddr_MultiLayer
        : AddressMapping.Correction_SolidificationAddr;
    await this.connection.send(req);
  }

  // #19665
  async MoveCorrectionFromSdramToMasterFlash(
    addr: number,
    portAddr: number,
    scanBoardAddr: number,
    bBroadcast: boolean,
    coef: CoefTypeEnum
  ): Promise<void> {
    const req = new Request(Buffer.alloc(1), bBroadcast, 'MoveCorrectionFromSdramToMasterFlash');
    req.destination = addr;
    req.deviceType = 1;
    req.port = portAddr;
    req.rcvIndex = scanBoardAddr;
    req.address =
      coef === CoefTypeEnum.MultiLayer
        ? AddressMapping.Correction_RestitutionAddr_MultiLayer
        : AddressMapping.Correction_RestitutionAddr;
    await this.connection.send(req);
  }

  // #19676
  async WriteMappingFrontToScaner(
    addr: number,
    portAddr: number,
    scanBoardAddr: number,
    bBroadcast: boolean,
    data: number[] | Buffer,
    dataLength: number
  ): Promise<void> {
    const req = new Request(data, bBroadcast, 'WriteMappingFrontToScaner');
    req.destination = addr;
    req.deviceType = 1;
    req.port = portAddr;
    req.rcvIndex = scanBoardAddr;
    req.address = AddressMapping.WriteScannerMappingFrontAddr;
    await this.connection.send(req);
  }

  WriteScanerMapping = (): void => {
    throw new TypeError('Not implemented');
  };

  // #19696
  async SaveScannerFontLibToFlash(
    addr: number,
    portAddr: number,
    scanBoardAddr: number,
    bBroadcast: boolean
  ): Promise<void> {
    const req = new Request([5], bBroadcast, 'SaveScannerFontLibToFlash');
    req.destination = addr;
    req.deviceType = 1;
    req.port = portAddr;
    req.rcvIndex = scanBoardAddr;
    req.address = AddressMapping.SaveScannerFontLibAddr;
    await this.connection.send(req);
  }

  // #19706
  async WriteScannerResetEn(
    addr: number,
    portAddr: number,
    scanBoardAddr: number,
    bBroadcast: boolean,
    isOpen: boolean,
    length: number
  ): Promise<void> {
    const $data = encodeUIntLE(!isOpen ? 4 : 5, AddressMapping.ResetEnPointOccupancy);
    const req = new Request($data, bBroadcast, 'WriteScannerResetEn');
    req.destination = addr;
    req.deviceType = 1;
    req.port = portAddr;
    req.rcvIndex = scanBoardAddr;
    req.address = AddressMapping.ScannerResetEnAddr;
    await this.connection.send(req);
  }

  // #19719
  async ReadScannerResetEn(addr: number, portAddr: number, scanBoardAddr: number): Promise<number> {
    const req = new Request(AddressMapping.ResetEnPointOccupancy, 'ReadScannerResetEn');
    req.destination = addr;
    req.deviceType = 1;
    req.port = portAddr;
    req.rcvIndex = scanBoardAddr;
    req.address = AddressMapping.ScannerResetEnAddr;
    return decodeUIntLE(await this.connection.send(req));
  }

  // #19739
  async WriteScannerResetCycleNum(
    addr: number,
    portAddr: number,
    scanBoardAddr: number,
    bBroadcast: boolean,
    cycleNum: number,
    length: number
  ): Promise<void> {
    const $data = encodeUIntLE(cycleNum, AddressMapping.ResetCycleNumPointOccupancy);
    const req = new Request($data, bBroadcast, 'WriteScannerResetCycleNum');
    req.destination = addr;
    req.deviceType = 1;
    req.port = portAddr;
    req.rcvIndex = scanBoardAddr;
    req.address = AddressMapping.ScannerResetCycleNumAddr;
    await this.connection.send(req);
  }

  // #19750
  async ReadScannerResetCycleNum(
    addr: number,
    portAddr: number,
    scanBoardAddr: number
  ): Promise<number> {
    const req = new Request(AddressMapping.ResetCycleNumPointOccupancy, 'ReadScannerResetCycleNum');
    req.destination = addr;
    req.deviceType = 1;
    req.port = portAddr;
    req.rcvIndex = scanBoardAddr;
    req.address = AddressMapping.ScannerResetCycleNumAddr;
    return decodeUIntLE(await this.connection.send(req));
  }

  // #19770
  async WriteScannerResetCommand(
    addr: number,
    portAddr: number,
    scanBoardAddr: number,
    bBroadcast: boolean,
    resetType: ResetAndSwitchCommandTypeEnum
  ): Promise<void> {
    const req = new Request([resetType], bBroadcast, 'WriteScannerResetCommand');
    req.destination = addr;
    req.deviceType = 1;
    req.port = portAddr;
    req.rcvIndex = scanBoardAddr;
    req.address = AddressMapping.ScannerResetAndSwitchAddr;
    await this.connection.send(req);
  }

  // #19780
  async Switch2053IP(
    addr: number,
    portAddr: number,
    scanBoardAddr: number,
    bBroadcast: boolean,
    switchIP2053Enable: boolean
  ): Promise<void> {
    const $data = encodeUIntLE(!switchIP2053Enable ? 5 : 0, AddressMapping.SwitchIP2053Occupancy);
    const req = new Request($data, bBroadcast, 'Switch2053IP');
    req.destination = addr;
    req.deviceType = 1;
    req.port = portAddr;
    req.rcvIndex = scanBoardAddr;
    req.address = AddressMapping.SwitchIP2053Addr;
    await this.connection.send(req);
  }

  // #19795
  async SwitchAutoOrManualLinearTable(
    addr: number,
    portAddr: number,
    scanBoardAddr: number,
    bBroadcast: boolean,
    switchAutoOrManualEnable: boolean
  ): Promise<void> {
    const $data = encodeUIntLE(
      switchAutoOrManualEnable ? 1 : 0,
      AddressMapping.SwitchAutoOrManualLinearTableOccupancy
    );
    const req = new Request($data, bBroadcast, 'SwitchAutoOrManualLinearTable');
    req.destination = addr;
    req.deviceType = 1;
    req.port = portAddr;
    req.rcvIndex = scanBoardAddr;
    req.address = AddressMapping.SwitchAutoOrManualLinearTableAddr;
    await this.connection.send(req);
  }

  // #19807
  async StartAutoLinearTable(
    addr: number,
    portAddr: number,
    scanBoardAddr: number,
    bBroadcast: boolean
  ): Promise<void> {
    const $data = encodeUIntLE(1, AddressMapping.StartAutoLinearTableOccupancy);
    const req = new Request($data, bBroadcast, 'StartAutoLinearTable');
    req.destination = addr;
    req.deviceType = 1;
    req.port = portAddr;
    req.rcvIndex = scanBoardAddr;
    req.address = AddressMapping.StartAutoLinearTableAddr;
    await this.connection.send(req);
  }

  // #19818
  async SetSpecialParam(
    addr: number,
    portAddr: number,
    scanBoardAddr: number,
    bBroadcast: boolean,
    rowChangePoint: number
  ): Promise<void> {
    const $data = encodeUIntLE(rowChangePoint, AddressMapping.RowChangePointOccupancy);
    const req = new Request($data, bBroadcast, 'SetSpecialParam');
    req.destination = addr;
    req.deviceType = 1;
    req.port = portAddr;
    req.rcvIndex = scanBoardAddr;
    req.address = AddressMapping.StartAutoLinearTableAddr;
    await this.connection.send(req);
  }

  // #19828
  async ReadGammaMaxValue2053(
    addr: number,
    portAddr: number,
    scanBoardAddr: number
  ): Promise<number> {
    const req = new Request(AddressMapping.GammaMaxValue2053Occupancy, 'ReadGammaMaxValue2053');
    req.destination = addr;
    req.deviceType = 1;
    req.port = portAddr;
    req.rcvIndex = scanBoardAddr;
    req.address = AddressMapping.GammaMaxValue2053Addr;
    return decodeUIntLE(await this.connection.send(req));
  }

  SetGammaMaxValue2053 = (): void => {
    throw new TypeError('Not implemented');
  };

  // #19864
  async ReadGammaMaxValue(addr: number, portAddr: number, scanBoardAddr: number): Promise<number> {
    const req = new Request(AddressMapping.GammaMaxValue2053Occupancy, 'ReadGammaMaxValue');
    req.destination = addr;
    req.deviceType = 1;
    req.port = portAddr;
    req.rcvIndex = scanBoardAddr;
    req.address = AddressMapping.GammaMaxValue2053Addr;
    return decodeUIntLE(await this.connection.send(req));
  }

  // #19873
  async SetGammaMaxValue(
    addr: number,
    portAddr: number,
    scanBoardAddr: number,
    bBroadcast: boolean,
    GammaMaxValue2053: number
  ): Promise<void> {
    const $data = encodeUIntLE(GammaMaxValue2053, AddressMapping.GammaMaxValue2053Occupancy);
    const req = new Request($data, bBroadcast, 'SetGammaMaxValue');
    req.destination = addr;
    req.deviceType = 1;
    req.port = portAddr;
    req.rcvIndex = scanBoardAddr;
    req.address = AddressMapping.GammaMaxValue2053Addr;
    await this.connection.send(req);
  }

  // #19883
  async ReadEnhancedMode2053(
    addr: number,
    portAddr: number,
    scanBoardAddr: number
  ): Promise<number> {
    const req = new Request(AddressMapping.EnhancedMode2053Occupancy, 'ReadEnhancedMode2053');
    req.destination = addr;
    req.deviceType = 1;
    req.port = portAddr;
    req.rcvIndex = scanBoardAddr;
    req.address = AddressMapping.EnhancedMode2053Addr;
    return decodeUIntLE(await this.connection.send(req));
  }

  SetEnhancedMode2053 = (): void => {
    throw new TypeError('Not implemented');
  };

  // #19936
  async SetScanBoardDataTo2000(
    addr: number,
    portIndex: number,
    scanIndex: number,
    data: number[] | Buffer,
    length: number
  ): Promise<void> {
    if (data.length !== length) throw new TypeError(`Invalid buffer size: ${data.length}`);
    const req = new Request(data, false, 'SetScanBoardDataTo2000');
    req.destination = addr;
    req.deviceType = 1;
    req.port = portIndex;
    req.rcvIndex = scanIndex;
    req.address = AddressMapping.SDKReadOrWriteAddr;
    await this.connection.send(req);
  }

  // #19945
  async ReadScanBoardDataTo2000(
    addr: number,
    portAddr: number,
    scanBoardAddr: number,
    length: number
  ): Promise<Buffer> {
    const req = new Request(length, 'ReadScanBoardDataTo2000');
    req.destination = addr;
    req.deviceType = 1;
    req.port = portAddr;
    req.rcvIndex = scanBoardAddr;
    req.address = AddressMapping.SDKReadOrWriteAddr;
    return (await this.connection.send(req)).data;
  }

  // #19954
  async SetScanBoardDataTo2500(
    addr: number,
    portIndex: number,
    scanIndex: number,
    data: number[] | Buffer,
    length: number
  ): Promise<void> {
    if (data.length !== length) throw new TypeError(`Invalid buffer size: ${data.length}`);
    const req = new Request(data, false, 'SetScanBoardDataTo2500');
    req.destination = addr;
    req.deviceType = 1;
    req.port = portIndex;
    req.rcvIndex = scanIndex;
    req.address = AddressMapping.SDKNewReadOrWriteAddr;
    await this.connection.send(req);
  }

  // #19963
  async ReadScanBoardDataTo2500(
    addr: number,
    portAddr: number,
    scanBoardAddr: number,
    length: number
  ): Promise<Buffer> {
    const req = new Request(length, 'ReadScanBoardDataTo2500');
    req.destination = addr;
    req.deviceType = 1;
    req.port = portAddr;
    req.rcvIndex = scanBoardAddr;
    req.address = AddressMapping.SDKNewReadOrWriteAddr;
    return (await this.connection.send(req)).data;
  }

  // #19972
  async ReadABCDESignalDelay(
    addr: number,
    portAddr: number,
    scanBoardAddr: number
  ): Promise<number> {
    const req = new Request(AddressMapping.ABCDESignalDelayOccupancy, 'ReadABCDESignalDelay');
    req.destination = addr;
    req.deviceType = 1;
    req.port = portAddr;
    req.rcvIndex = scanBoardAddr;
    req.address = AddressMapping.ABCDESignalDelayAddr;
    return decodeUIntLE(await this.connection.send(req));
  }

  // #20010
  async SetABCDESignalDelay(
    addr: number,
    portAddr: number,
    scanBoardAddr: number,
    bBroadcast: boolean,
    ABCDESignalDelay: number
  ): Promise<void> {
    const req = new Request([ABCDESignalDelay], bBroadcast, 'SetABCDESignalDelay');
    req.destination = addr;
    req.deviceType = 1;
    req.port = portAddr;
    req.rcvIndex = scanBoardAddr;
    req.address = AddressMapping.ABCDESignalDelayAddr;
    await this.connection.send(req);
  }

  // #20020
  async ReadScannerColorSupportInfo(
    addr: number,
    portAddr: number,
    scanBoardAddr: number
  ): Promise<number> {
    const req = new Request(
      AddressMapping.ScannerColorSupportInfoOccupancy,
      'ReadScannerColorSupportInfo'
    );
    req.destination = addr;
    req.deviceType = 1;
    req.port = portAddr;
    req.rcvIndex = scanBoardAddr;
    req.address = AddressMapping.ScannerColorSupportInfoAddr;
    return decodeUIntLE(await this.connection.send(req));
  }

  // #20040
  async SetScannerRGBColor(
    addr: number,
    portAddr: number,
    scanBoardAddr: number,
    bBroadcast: boolean,
    data: number[] | Buffer
  ): Promise<void> {
    const req = new Request(data, bBroadcast, 'SetScannerRGBColor');
    req.destination = addr;
    req.deviceType = 1;
    req.port = portAddr;
    req.rcvIndex = scanBoardAddr;
    req.address = AddressMapping.ScannerRGBColorAddr;
    await this.connection.send(req);
  }

  SetScanner18bitGrayScale = (): void => {
    throw new TypeError('Not implemented');
  };

  SetScanner18bitWhiteGrayScale = (): void => {
    throw new TypeError('Not implemented');
  };

  SetScannerGrayScale = (): void => {
    throw new TypeError('Not implemented');
  };

  SetScannerWhiteGrayScale = (): void => {
    throw new TypeError('Not implemented');
  };

  SetScanner22bitGrayScale = (): void => {
    throw new TypeError('Not implemented');
  };

  SetScannerGrayScaleCoef = (): void => {
    throw new TypeError('Not implemented');
  };

  // #20265
  async ReadScannerGrayScaleCoef(
    addr: number,
    portAddr: number,
    scanBoardAddr: number
  ): Promise<Buffer> {
    const req = new Request(
      AddressMapping.ScannerGrayScaleBlueCoefOccupancy,
      'ReadScannerGrayScaleCoef'
    );
    req.destination = addr;
    req.deviceType = 1;
    req.port = portAddr;
    req.rcvIndex = scanBoardAddr;
    req.address = AddressMapping.Scanner_GrayScaleRedCoefAddr;
    return (await this.connection.send(req)).data;
  }

  // #20293
  async SetMagnitudes(
    addr: number,
    portAddr: number,
    scanBoardAddr: number,
    bBroadcast: boolean,
    data: number[] | Buffer
  ): Promise<void> {
    const req = new Request(data, bBroadcast, 'SetMagnitudes');
    req.destination = addr;
    req.deviceType = 1;
    req.port = portAddr;
    req.rcvIndex = scanBoardAddr;
    req.address = AddressMapping.MagnitudesAddr;
    await this.connection.send(req);
  }

  // #20302
  async ReadMagnitudes(addr: number, portAddr: number, scanBoardAddr: number): Promise<Buffer> {
    const req = new Request(AddressMapping.MagnitudesAddrOccupancy, 'ReadMagnitudes');
    req.destination = addr;
    req.deviceType = 1;
    req.port = portAddr;
    req.rcvIndex = scanBoardAddr;
    req.address = AddressMapping.MagnitudesAddr;
    return (await this.connection.send(req)).data;
  }

  // #20311
  async ReadScannerColorInfo(
    addr: number,
    portAddr: number,
    scanBoardAddr: number
  ): Promise<number> {
    const req = new Request(AddressMapping.ScannerColorInfoOccupancy, 'ReadScannerColorInfo');
    req.destination = addr;
    req.deviceType = 1;
    req.port = portAddr;
    req.rcvIndex = scanBoardAddr;
    req.address = AddressMapping.ScannerColorInfoAddr;
    return decodeUIntLE(await this.connection.send(req));
  }

  // #20331
  async SetScannerColorInfo(
    addr: number,
    portAddr: number,
    scanBoardAddr: number,
    bBroadcast: boolean,
    data: number[] | Buffer
  ): Promise<void> {
    const req = new Request(data, bBroadcast, 'SetScannerColorInfo');
    req.destination = addr;
    req.deviceType = 1;
    req.port = portAddr;
    req.rcvIndex = scanBoardAddr;
    req.address = AddressMapping.ScannerColorInfoAddr;
    await this.connection.send(req);
  }

  // #20340
  async SetColorAdjustMatrixType(
    addr: number,
    portAddr: number,
    scanBoardAddr: number,
    bBroadcast: boolean,
    data: number[] | Buffer
  ): Promise<void> {
    const req = new Request(data, bBroadcast, 'SetColorAdjustMatrixType');
    req.destination = addr;
    req.deviceType = 1;
    req.port = portAddr;
    req.rcvIndex = scanBoardAddr;
    req.address = AddressMapping.ColorAdjustMatrixTypeAddr;
    await this.connection.send(req);
  }

  // #20349
  async ReadColorAdjustMatrixType(
    addr: number,
    portAddr: number,
    scanBoardAddr: number
  ): Promise<number> {
    const req = new Request(AddressMapping.ScannerColorInfoOccupancy, 'ReadColorAdjustMatrixType');
    req.destination = addr;
    req.deviceType = 1;
    req.port = portAddr;
    req.rcvIndex = scanBoardAddr;
    req.address = AddressMapping.ColorAdjustMatrixTypeAddr;
    return decodeUIntLE(await this.connection.send(req));
  }

  // #20358
  async ReadColorManageCoefData(
    addr: number,
    portAddr: number,
    scanBoardAddr: number
  ): Promise<Buffer> {
    const req = new Request(AddressMapping.ColorManageInfoAddrOccupancy, 'ReadColorManageCoefData');
    req.destination = addr;
    req.deviceType = 1;
    req.port = portAddr;
    req.rcvIndex = scanBoardAddr;
    req.address = AddressMapping.ColorManageInfoAddr;
    return (await this.connection.send(req)).data;
  }

  // #20378
  async SetScanner_ColorManageCoefData(
    addr: number,
    portAddr: number,
    scanBoardAddr: number,
    bBroadcast: boolean,
    colorRestore: number[] | Buffer
  ): Promise<void> {
    const req = new Request(colorRestore, bBroadcast, 'SetScanner_ColorManageCoefData');
    req.destination = addr;
    req.deviceType = 1;
    req.port = portAddr;
    req.rcvIndex = scanBoardAddr;
    req.address = AddressMapping.ColorManageInfoAddr;
    await this.connection.send(req);
  }

  // #20387
  async ReadMGCoefData(addr: number, portAddr: number, scanBoardAddr: number): Promise<Buffer> {
    const req = new Request(256, 'ReadMGCoefData');
    req.destination = addr;
    req.deviceType = 1;
    req.port = portAddr;
    req.rcvIndex = scanBoardAddr;
    req.address = AddressMapping.MagicGrayLutAddr;
    return (await this.connection.send(req)).data;
  }

  SetScanner_MGCoefData = (): void => {
    throw new TypeError('Not implemented');
  };

  // #20451
  async ReadMGParmData(addr: number, portAddr: number, scanBoardAddr: number): Promise<number> {
    const req = new Request(AddressMapping.MGParmccupancy, 'ReadMGParmData');
    req.destination = addr;
    req.deviceType = 1;
    req.port = portAddr;
    req.rcvIndex = scanBoardAddr;
    req.address = AddressMapping.MGParmAddr;
    return decodeUIntLE(await this.connection.send(req));
  }

  // #20471
  async SetScanner_MGParmData(
    addr: number,
    portAddr: number,
    scanBoardAddr: number,
    bBroadcast: boolean,
    data: number[] | Buffer
  ): Promise<void> {
    const req = new Request(data, bBroadcast, 'SetScanner_MGParmData');
    req.destination = addr;
    req.deviceType = 1;
    req.port = portAddr;
    req.rcvIndex = scanBoardAddr;
    req.address = AddressMapping.MGParmAddr;
    await this.connection.send(req);
  }

  // #20480
  async ReadMGEnParmData(addr: number, portAddr: number, scanBoardAddr: number): Promise<number> {
    const req = new Request(AddressMapping.MGEnParmccupancy, 'ReadMGEnParmData');
    req.destination = addr;
    req.deviceType = 1;
    req.port = portAddr;
    req.rcvIndex = scanBoardAddr;
    req.address = AddressMapping.MGEnParmAddr;
    return decodeUIntLE(await this.connection.send(req));
  }

  // #20500
  async SetScanner_MGEnParmData(
    addr: number,
    portAddr: number,
    scanBoardAddr: number,
    bBroadcast: boolean,
    data: number
  ): Promise<void> {
    const req = new Request([data], bBroadcast, 'SetScanner_MGEnParmData');
    req.destination = addr;
    req.deviceType = 1;
    req.port = portAddr;
    req.rcvIndex = scanBoardAddr;
    req.address = AddressMapping.MGEnParmAddr;
    await this.connection.send(req);
  }

  // #20509
  async ReadScanner18BitEnable(
    addr: number,
    portAddr: number,
    scanBoardAddr: number
  ): Promise<number> {
    const req = new Request(AddressMapping.Scanner18BitEnableOccupancy, 'ReadScanner18BitEnable');
    req.destination = addr;
    req.deviceType = 1;
    req.port = portAddr;
    req.rcvIndex = scanBoardAddr;
    req.address = AddressMapping.Scanner18BitEnableAddr;
    return decodeUIntLE(await this.connection.send(req));
  }

  // #20518
  async GetSannerFunctionList(
    addr: number,
    portAddr: number,
    scanBoardAddr: number
  ): Promise<Buffer> {
    const req = new Request(AddressMapping.ScannerFunctionTableOccupancy1, 'GetSannerFunctionList');
    req.destination = addr;
    req.deviceType = 1;
    req.port = portAddr;
    req.rcvIndex = scanBoardAddr;
    req.address = AddressMapping.ScannerFunctionTableAddr;
    return (await this.connection.send(req)).data;
  }

  // #20541
  async SetScanner18BitEnable(
    addr: number,
    portAddr: number,
    scanBoardAddr: number,
    bBroadcast: boolean,
    enable: boolean
  ): Promise<void> {
    const req = new Request(enable ? [5] : [0], bBroadcast, 'SetScanner18BitEnable');
    req.destination = addr;
    req.deviceType = 1;
    req.port = portAddr;
    req.rcvIndex = scanBoardAddr;
    req.address = AddressMapping.Scanner18BitEnableAddr;
    await this.connection.send(req);
  }

  // #20559
  async SetScannerxBitEnable(
    addr: number,
    portAddr: number,
    scanBoardAddr: number,
    bBroadcast: boolean,
    da: number
  ): Promise<void> {
    const req = new Request([da], bBroadcast, 'SetScannerxBitEnable');
    req.destination = addr;
    req.deviceType = 1;
    req.port = portAddr;
    req.rcvIndex = scanBoardAddr;
    req.address = AddressMapping.Scanner22bitEnableAddr;
    await this.connection.send(req);
  }

  // #20569
  async SetScannerxBit1d8(
    addr: number,
    portAddr: number,
    scanBoardAddr: number,
    bBroadcast: boolean,
    da: number[] | Buffer
  ): Promise<void> {
    const req = new Request(da, bBroadcast, 'SetScannerxBit1d8');
    req.destination = addr;
    req.deviceType = 1;
    req.port = portAddr;
    req.rcvIndex = scanBoardAddr;
    req.address = AddressMapping.ScannerxbitTwinkleOptiAddr;
    await this.connection.send(req);
  }

  // #20578
  async SetScannerxBit1d9(
    addr: number,
    portAddr: number,
    scanBoardAddr: number,
    bBroadcast: boolean,
    da: number[] | Buffer
  ): Promise<void> {
    const req = new Request(da, bBroadcast, 'SetScannerxBit1d9');
    req.destination = addr;
    req.deviceType = 1;
    req.port = portAddr;
    req.rcvIndex = scanBoardAddr;
    req.address = AddressMapping.ScannerxbitOptiAddr;
    await this.connection.send(req);
  }

  // #20587
  async ReadClearViewInfo(addr: number, portAddr: number, scanBoardAddr: number): Promise<Buffer> {
    const req = new Request(AddressMapping.ScannerClearViewOccupancy, 'ReadClearViewInfo');
    req.destination = addr;
    req.deviceType = 1;
    req.port = portAddr;
    req.rcvIndex = scanBoardAddr;
    req.address = AddressMapping.ScannerClearViewAddr;
    return (await this.connection.send(req)).data;
  }

  SetClearViewInfo = (): void => {
    throw new TypeError('Not implemented');
  };

  // #20649
  async ReadClearViewEnableInfo(
    addr: number,
    portAddr: number,
    scanBoardAddr: number
  ): Promise<number> {
    const req = new Request(AddressMapping.ScannerClearViewEnable, 'ReadClearViewEnableInfo');
    req.destination = addr;
    req.deviceType = 1;
    req.port = portAddr;
    req.rcvIndex = scanBoardAddr;
    req.address = AddressMapping.ScannerClearViewAddr;
    return decodeUIntLE(await this.connection.send(req));
  }

  // #20672
  async SetClearViewEnableInfo(
    addr: number,
    portAddr: number,
    scanBoardAddr: number,
    bBroadcast: boolean,
    enable: boolean
  ): Promise<void> {
    const req = new Request(enable ? [5] : [0], bBroadcast, 'SetClearViewEnableInfo');
    req.destination = addr;
    req.deviceType = 1;
    req.port = portAddr;
    req.rcvIndex = scanBoardAddr;
    req.address = AddressMapping.ScannerClearViewAddr;
    await this.connection.send(req);
  }

  // #20690
  async Set2038SDelayTime(
    addr: number,
    portAddr: number,
    scanBoardAddr: number,
    bBroadcast: boolean,
    delayTime: number
  ): Promise<void> {
    const $data = encodeUIntLE(delayTime, AddressMapping.DelayTimeOccupancy);
    const req = new Request($data, bBroadcast, 'Set2038SDelayTime');
    req.destination = addr;
    req.deviceType = 1;
    req.port = portAddr;
    req.rcvIndex = scanBoardAddr;
    req.address = AddressMapping.DelayTimeAddr;
    await this.connection.send(req);
  }

  // #20700
  async Read2038SDelayTime(addr: number, portAddr: number, scanBoardAddr: number): Promise<number> {
    const req = new Request(AddressMapping.DelayTimeOccupancy, 'Read2038SDelayTime');
    req.destination = addr;
    req.deviceType = 1;
    req.port = portAddr;
    req.rcvIndex = scanBoardAddr;
    req.address = AddressMapping.DelayTimeAddr;
    return decodeUIntLE(await this.connection.send(req));
  }

  // #20720
  async SetCustomGammaConfigInfo(
    addr: number,
    portAddr: number,
    scanBoardAddr: number,
    bBroadcast: boolean,
    customGammaConfigInfo: number
  ): Promise<void> {
    const $data = encodeUIntLE(customGammaConfigInfo, AddressMapping.GammaConfigInfoOccupancy);
    const req = new Request($data, bBroadcast, 'SetCustomGammaConfigInfo');
    req.destination = addr;
    req.deviceType = 1;
    req.port = portAddr;
    req.rcvIndex = scanBoardAddr;
    req.address = AddressMapping.CustomGammaConfigInfoAddr;
    await this.connection.send(req);
  }

  // #20730
  async ReadCustomGammaConfigInfo(
    addr: number,
    portAddr: number,
    scanBoardAddr: number
  ): Promise<number> {
    const req = new Request(AddressMapping.DelayTimeOccupancy, 'ReadCustomGammaConfigInfo');
    req.destination = addr;
    req.deviceType = 1;
    req.port = portAddr;
    req.rcvIndex = scanBoardAddr;
    req.address = AddressMapping.CustomGammaConfigInfoAddr;
    return decodeUIntLE(await this.connection.send(req));
  }

  // #20739
  async WriteScannerDoubleLock(
    addr: number,
    portAddr: number,
    scanBoardAddr: number,
    bBroadcast: boolean,
    data: number[] | Buffer
  ): Promise<void> {
    if (data.length !== 1) throw new TypeError(`Invalid buffer size: ${data.length}`);
    const req = new Request(data, bBroadcast, 'WriteScannerDoubleLock');
    req.destination = addr;
    req.deviceType = 1;
    req.port = portAddr;
    req.rcvIndex = scanBoardAddr;
    req.address = AddressMapping.ScannerDoubleLockAddr;
    await this.connection.send(req);
  }

  // #20748
  async ReadScannerDoubleLock(
    addr: number,
    portAddr: number,
    scanBoardAddr: number
  ): Promise<number> {
    const req = new Request(AddressMapping.DoubleLockPointOccupancy, 'ReadScannerDoubleLock');
    req.destination = addr;
    req.deviceType = 1;
    req.port = portAddr;
    req.rcvIndex = scanBoardAddr;
    req.address = AddressMapping.ScannerDoubleLockAddr;
    return decodeUIntLE(await this.connection.send(req));
  }

  // #20768
  async ReadScannerLowDelayEnable(
    addr: number,
    portAddr: number,
    scanBoardAddr: number
  ): Promise<number> {
    const req = new Request(
      AddressMapping.ScannerLowDelayEnableOccupancy,
      'ReadScannerLowDelayEnable'
    );
    req.destination = addr;
    req.deviceType = 1;
    req.port = portAddr;
    req.rcvIndex = scanBoardAddr;
    req.address = AddressMapping.ScannerLowDelayEnableAddr;
    return decodeUIntLE(await this.connection.send(req));
  }

  // #20795
  async SetScannerLowDelayEnable(
    addr: number,
    portAddr: number,
    scanBoardAddr: number,
    bBroadcast: boolean,
    lowDelayEnable: boolean
  ): Promise<void> {
    const req = new Request(lowDelayEnable ? [85] : [0], bBroadcast, 'SetScannerLowDelayEnable');
    req.destination = addr;
    req.deviceType = 1;
    req.port = portAddr;
    req.rcvIndex = scanBoardAddr;
    req.address = AddressMapping.ScannerLowDelayEnableAddr;
    await this.connection.send(req);
  }

  // #20813
  async ReadSenderLowDelayEnable(addr: number): Promise<number> {
    const req = new Request(AddressMapping.LowDelayOccupancy, 'ReadSenderLowDelayEnable');
    req.destination = addr;
    req.address = AddressMapping.LowDelayAddr;
    return decodeUIntLE(await this.connection.send(req));
  }

  // #20840
  async SetSenderLowDelayEnable(
    addr: number,
    bBroadcast: boolean,
    enableLowDelay: boolean
  ): Promise<void> {
    const req = new Request(enableLowDelay ? [120] : [0], bBroadcast, 'SetSenderLowDelayEnable');
    req.destination = addr;
    req.address = AddressMapping.LowDelayAddr;
    await this.connection.send(req);
  }

  // #20858
  async FuncCard_ReadCompanyID(addr: number): Promise<number> {
    const req = new Request(AddressMapping.FuncCard_CompanyIDOccupancy, 'FuncCard_ReadCompanyID');
    req.destination = addr;
    req.address = AddressMapping.FuncCard_CompanyIDAddr;
    return decodeUIntLE(await this.connection.send(req));
  }

  // #20867
  async FuncCard_ReadCompanyID_1(
    addr: number,
    portAddr: number,
    funcCardAddr: number
  ): Promise<number> {
    const req = new Request(AddressMapping.FuncCard_CompanyIDOccupancy, 'FuncCard_ReadCompanyID_1');
    req.destination = addr;
    req.deviceType = 2;
    req.port = portAddr;
    req.rcvIndex = funcCardAddr;
    req.address = AddressMapping.FuncCard_CompanyIDAddr;
    return decodeUIntLE(await this.connection.send(req));
  }

  // #20887
  async FuncCard_ReadFuncCardModle(addr: number): Promise<number> {
    const req = new Request(AddressMapping.FuncCard_ModleOccupancy, 'FuncCard_ReadFuncCardModle');
    req.destination = addr;
    req.address = AddressMapping.FuncCard_ModleAddr;
    return decodeUIntLE(await this.connection.send(req));
  }

  // #20896
  async FuncCard_ReadFuncCardModle_1(
    addr: number,
    portAddr: number,
    funcCardAddr: number
  ): Promise<number> {
    const req = new Request(AddressMapping.FuncCard_ModleOccupancy, 'FuncCard_ReadFuncCardModle_1');
    req.destination = addr;
    req.deviceType = 2;
    req.port = portAddr;
    req.rcvIndex = funcCardAddr;
    req.address = AddressMapping.FuncCard_ModleAddr;
    return decodeUIntLE(await this.connection.send(req));
  }

  // #20916
  async FuncCard_ReadGoldenFPGAVersion(addr: number): Promise<number> {
    const req = new Request(
      AddressMapping.FuncCard_GoldenFPGAVersionOccupancy,
      'FuncCard_ReadGoldenFPGAVersion'
    );
    req.destination = addr;
    req.address = AddressMapping.FuncCard_GoldenFPGAVersionAddr;
    return decodeUIntLE(await this.connection.send(req));
  }

  // #20925
  async FuncCard_ReadGoldenFPGAVersion_1(
    addr: number,
    portAddr: number,
    funcCardAddr: number
  ): Promise<number> {
    const req = new Request(
      AddressMapping.FuncCard_GoldenFPGAVersionOccupancy,
      'FuncCard_ReadGoldenFPGAVersion_1'
    );
    req.destination = addr;
    req.deviceType = 2;
    req.port = portAddr;
    req.rcvIndex = funcCardAddr;
    req.address = AddressMapping.FuncCard_GoldenFPGAVersionAddr;
    return decodeUIntLE(await this.connection.send(req));
  }

  // #20945
  async FuncCard_ReadIsMonitorCardExist(addr: number): Promise<number> {
    const req = new Request(
      AddressMapping.FuncCard_IsMonitorCardExistOccupancy,
      'FuncCard_ReadIsMonitorCardExist'
    );
    req.destination = addr;
    req.address = AddressMapping.FuncCard_IsMonitorCardExistAddr;
    return decodeUIntLE(await this.connection.send(req));
  }

  // #20954
  async FuncCard_ReadIsMonitorCardExist_1(
    addr: number,
    portAddr: number,
    funcCardAddr: number
  ): Promise<number> {
    const req = new Request(
      AddressMapping.FuncCard_IsMonitorCardExistOccupancy,
      'FuncCard_ReadIsMonitorCardExist_1'
    );
    req.destination = addr;
    req.deviceType = 2;
    req.port = portAddr;
    req.rcvIndex = funcCardAddr;
    req.address = AddressMapping.FuncCard_IsMonitorCardExistAddr;
    return decodeUIntLE(await this.connection.send(req));
  }

  // #20986
  async FuncCard_ReadMonitorCardModle(addr: number): Promise<number> {
    const req = new Request(
      AddressMapping.FuncCard_MonitorCardModleOccupancy,
      'FuncCard_ReadMonitorCardModle'
    );
    req.destination = addr;
    req.address = AddressMapping.FuncCard_MonitorCardModleAddr;
    return decodeUIntLE(await this.connection.send(req));
  }

  // #20995
  async FuncCard_ReadMonitorCardModle_1(
    addr: number,
    portAddr: number,
    funcCardAddr: number
  ): Promise<number> {
    const req = new Request(
      AddressMapping.FuncCard_MonitorCardModleOccupancy,
      'FuncCard_ReadMonitorCardModle_1'
    );
    req.destination = addr;
    req.deviceType = 2;
    req.port = portAddr;
    req.rcvIndex = funcCardAddr;
    req.address = AddressMapping.FuncCard_MonitorCardModleAddr;
    return decodeUIntLE(await this.connection.send(req));
  }

  // #21015
  async FuncCard_ReadMonitorFPGAVersion(addr: number): Promise<number> {
    const req = new Request(
      AddressMapping.FuncCard_MonitorFPGAVersionOccupancy,
      'FuncCard_ReadMonitorFPGAVersion'
    );
    req.destination = addr;
    req.address = AddressMapping.FuncCard_MonitorFPGAVersionAddr;
    return decodeUIntLE(await this.connection.send(req));
  }

  // #21024
  async FuncCard_ReadMonitorFPGAVersion_1(
    addr: number,
    portAddr: number,
    funcCardAddr: number
  ): Promise<number> {
    const req = new Request(
      AddressMapping.FuncCard_MonitorFPGAVersionOccupancy,
      'FuncCard_ReadMonitorFPGAVersion_1'
    );
    req.destination = addr;
    req.deviceType = 2;
    req.port = portAddr;
    req.rcvIndex = funcCardAddr;
    req.address = AddressMapping.FuncCard_MonitorFPGAVersionAddr;
    return decodeUIntLE(await this.connection.send(req));
  }

  // #21044
  async FuncCard_ReadFuncCardFPGALength(addr: number): Promise<number> {
    const req = new Request(
      AddressMapping.FuncCard_FPGALengthOccupancy,
      'FuncCard_ReadFuncCardFPGALength'
    );
    req.destination = addr;
    req.address = AddressMapping.FuncCard_FPGALengthAddr;
    return decodeUIntLE(await this.connection.send(req));
  }

  // #21053
  async FuncCard_ReadFuncCardFPGALength_1(
    addr: number,
    portAddr: number,
    funcCardAddr: number
  ): Promise<number> {
    const req = new Request(
      AddressMapping.FuncCard_FPGALengthOccupancy,
      'FuncCard_ReadFuncCardFPGALength_1'
    );
    req.destination = addr;
    req.deviceType = 2;
    req.port = portAddr;
    req.rcvIndex = funcCardAddr;
    req.address = AddressMapping.FuncCard_FPGALengthAddr;
    return decodeUIntLE(await this.connection.send(req));
  }

  // #21073
  async FuncCard_SetFuncCardFPGALength(
    addr: number,
    bBroadcast: boolean,
    fpgaLength: number
  ): Promise<void> {
    const $data = encodeUIntLE(fpgaLength, AddressMapping.FuncCard_FPGALengthOccupancy);
    const req = new Request($data, bBroadcast, 'FuncCard_SetFuncCardFPGALength');
    req.destination = addr;
    req.address = AddressMapping.FuncCard_FPGALengthAddr;
    await this.connection.send(req);
  }

  // #21083
  async FuncCard_SetFuncCardFPGALength_1(
    addr: number,
    portAddr: number,
    funcCardAddr: number,
    bBroadcast: boolean,
    fpgaLength: number
  ): Promise<void> {
    const $data = encodeUIntLE(fpgaLength, AddressMapping.FuncCard_FPGALengthOccupancy);
    const req = new Request($data, bBroadcast, 'FuncCard_SetFuncCardFPGALength_1');
    req.destination = addr;
    req.deviceType = 2;
    req.port = portAddr;
    req.rcvIndex = funcCardAddr;
    req.address = AddressMapping.FuncCard_FPGALengthAddr;
    await this.connection.send(req);
  }

  // #21093
  async FuncCard_ReadFuncCardFPGAVersion(addr: number): Promise<number> {
    const req = new Request(
      AddressMapping.FuncCard_FPGAVersionOccupancy,
      'FuncCard_ReadFuncCardFPGAVersion'
    );
    req.destination = addr;
    req.address = AddressMapping.FuncCard_FPGAVersionAddr;
    return decodeUIntLE(await this.connection.send(req));
  }

  // #21102
  async FuncCard_ReadFuncCardFPGAVersion_1(
    addr: number,
    portAddr: number,
    funcCardAddr: number
  ): Promise<number> {
    const req = new Request(
      AddressMapping.FuncCard_FPGAVersionOccupancy,
      'FuncCard_ReadFuncCardFPGAVersion_1'
    );
    req.destination = addr;
    req.deviceType = 2;
    req.port = portAddr;
    req.rcvIndex = funcCardAddr;
    req.address = AddressMapping.FuncCard_FPGAVersionAddr;
    return decodeUIntLE(await this.connection.send(req));
  }

  // #21122
  async FuncCard_SetFuncCardFPGAVersion(
    addr: number,
    bBroadcast: boolean,
    fpgaVersion: number
  ): Promise<void> {
    const $data = encodeUIntLE(fpgaVersion, AddressMapping.FuncCard_FPGAVersionOccupancy);
    const req = new Request($data, bBroadcast, 'FuncCard_SetFuncCardFPGAVersion');
    req.destination = addr;
    req.address = AddressMapping.FuncCard_FPGAVersionAddr;
    await this.connection.send(req);
  }

  // #21132
  async FuncCard_SetFuncCardFPGAVersion_1(
    addr: number,
    portAddr: number,
    funcCardAddr: number,
    bBroadcast: boolean,
    fpgaVersion: number
  ): Promise<void> {
    const $data = encodeUIntLE(fpgaVersion, AddressMapping.FuncCard_FPGAVersionOccupancy);
    const req = new Request($data, bBroadcast, 'FuncCard_SetFuncCardFPGAVersion_1');
    req.destination = addr;
    req.deviceType = 2;
    req.port = portAddr;
    req.rcvIndex = funcCardAddr;
    req.address = AddressMapping.FuncCard_FPGAVersionAddr;
    await this.connection.send(req);
  }

  // #21142
  async FuncCard_ReadFuncCardFPGADescription(addr: number): Promise<Buffer> {
    const req = new Request(
      AddressMapping.FuncCard_FPGADescriptionnOccupancy,
      'FuncCard_ReadFuncCardFPGADescription'
    );
    req.destination = addr;
    req.address = AddressMapping.FuncCard_FPGADescriptionAddr;
    return (await this.connection.send(req)).data;
  }

  // #21151
  async FuncCard_ReadFuncCardFPGADescription_1(
    addr: number,
    portAddr: number,
    funcCardAddr: number
  ): Promise<Buffer> {
    const req = new Request(
      AddressMapping.FuncCard_FPGADescriptionnOccupancy,
      'FuncCard_ReadFuncCardFPGADescription_1'
    );
    req.destination = addr;
    req.deviceType = 2;
    req.port = portAddr;
    req.rcvIndex = funcCardAddr;
    req.address = AddressMapping.FuncCard_FPGADescriptionAddr;
    return (await this.connection.send(req)).data;
  }

  // #21173
  async FuncCard_SetFuncCardFPGADescription(
    addr: number,
    bBroadcast: boolean,
    funcCard_FPGADescription: number[] | Buffer
  ): Promise<void> {
    if (funcCard_FPGADescription.length !== AddressMapping.FuncCard_FPGADescriptionnOccupancy)
      throw new TypeError(`Invalid buffer size: ${funcCard_FPGADescription.length}`);
    const req = new Request(
      funcCard_FPGADescription,
      bBroadcast,
      'FuncCard_SetFuncCardFPGADescription'
    );
    req.destination = addr;
    req.address = AddressMapping.FuncCard_FPGADescriptionAddr;
    await this.connection.send(req);
  }

  // #21182
  async FuncCard_SetFuncCardFPGADescription_1(
    addr: number,
    portAddr: number,
    funcCardAddr: number,
    bBroadcast: boolean,
    funcCard_FPGADescription: number[] | Buffer
  ): Promise<void> {
    if (funcCard_FPGADescription.length !== AddressMapping.FuncCard_FPGADescriptionnOccupancy)
      throw new TypeError(`Invalid buffer size: ${funcCard_FPGADescription.length}`);
    const req = new Request(
      funcCard_FPGADescription,
      bBroadcast,
      'FuncCard_SetFuncCardFPGADescription_1'
    );
    req.destination = addr;
    req.deviceType = 2;
    req.port = portAddr;
    req.rcvIndex = funcCardAddr;
    req.address = AddressMapping.FuncCard_FPGADescriptionAddr;
    await this.connection.send(req);
  }

  // #21238
  async FuncCard_SetFPGAData(
    addr: number,
    portAddr: number,
    funcCardAddr: number,
    bBroadcast: boolean,
    data: number[] | Buffer,
    offset: number
  ): Promise<void> {
    const req = new Request(data, bBroadcast, 'FuncCard_SetFPGAData');
    req.destination = addr;
    req.deviceType = 2;
    req.port = portAddr;
    req.rcvIndex = funcCardAddr;
    req.address = AddressMapping.FuncCard_FPGALengthAddr + offset;
    await this.connection.send(req);
  }

  // #21247
  async FuncCard_ReadFuncCardMCULength(addr: number): Promise<number> {
    const req = new Request(
      AddressMapping.FuncCard_MCUProgramLengthOccupancy,
      'FuncCard_ReadFuncCardMCULength'
    );
    req.destination = addr;
    req.address = AddressMapping.FuncCard_MCUProgramLengthAddr;
    return decodeUIntLE(await this.connection.send(req));
  }

  // #21256
  async FuncCard_ReadFuncCardMCULength_1(
    addr: number,
    portAddr: number,
    funcCardAddr: number
  ): Promise<number> {
    const req = new Request(
      AddressMapping.FuncCard_MCUProgramLengthOccupancy,
      'FuncCard_ReadFuncCardMCULength_1'
    );
    req.destination = addr;
    req.deviceType = 2;
    req.port = portAddr;
    req.rcvIndex = funcCardAddr;
    req.address = AddressMapping.FuncCard_MCUProgramLengthAddr;
    return decodeUIntLE(await this.connection.send(req));
  }

  // #21276
  async FuncCard_SetFuncCardMCULength(
    addr: number,
    bBroadcast: boolean,
    mcuLength: number
  ): Promise<void> {
    const $data = encodeUIntLE(mcuLength, AddressMapping.FuncCard_MCUProgramLengthOccupancy);
    const req = new Request($data, bBroadcast, 'FuncCard_SetFuncCardMCULength');
    req.destination = addr;
    req.address = AddressMapping.FuncCard_MCUProgramLengthAddr;
    await this.connection.send(req);
  }

  // #21286
  async FuncCard_SetFuncCardMCULength_1(
    addr: number,
    portAddr: number,
    funcCardAddr: number,
    bBroadcast: boolean,
    mcuLength: number
  ): Promise<void> {
    const $data = encodeUIntLE(mcuLength, AddressMapping.FuncCard_MCUProgramLengthOccupancy);
    const req = new Request($data, bBroadcast, 'FuncCard_SetFuncCardMCULength_1');
    req.destination = addr;
    req.deviceType = 2;
    req.port = portAddr;
    req.rcvIndex = funcCardAddr;
    req.address = AddressMapping.FuncCard_MCUProgramLengthAddr;
    await this.connection.send(req);
  }

  // #21296
  async FuncCard_ReadFuncCardMCUVersion(addr: number): Promise<number> {
    const req = new Request(
      AddressMapping.FuncCard_MCUVersionOccupancy,
      'FuncCard_ReadFuncCardMCUVersion'
    );
    req.destination = addr;
    req.address = AddressMapping.FuncCard_MCUVersionAddr;
    return decodeUIntLE(await this.connection.send(req));
  }

  // #21305
  async FuncCard_ReadFuncCardMCUVersion_1(
    addr: number,
    portAddr: number,
    funcCardAddr: number
  ): Promise<number> {
    const req = new Request(
      AddressMapping.FuncCard_MCUVersionOccupancy,
      'FuncCard_ReadFuncCardMCUVersion_1'
    );
    req.destination = addr;
    req.deviceType = 2;
    req.port = portAddr;
    req.rcvIndex = funcCardAddr;
    req.address = AddressMapping.FuncCard_MCUVersionAddr;
    return decodeUIntLE(await this.connection.send(req));
  }

  // #21325
  async FuncCard_SetFuncCardMCUVersion(
    addr: number,
    bBroadcast: boolean,
    mcuVersion: number
  ): Promise<void> {
    const $data = encodeUIntLE(mcuVersion, AddressMapping.FuncCard_MCUVersionOccupancy);
    const req = new Request($data, bBroadcast, 'FuncCard_SetFuncCardMCUVersion');
    req.destination = addr;
    req.address = AddressMapping.FuncCard_MCUVersionAddr;
    await this.connection.send(req);
  }

  // #21335
  async FuncCard_SetFuncCardMCUVersion_1(
    addr: number,
    portAddr: number,
    funcCardAddr: number,
    bBroadcast: boolean,
    mcuVersion: number
  ): Promise<void> {
    const $data = encodeUIntLE(mcuVersion, AddressMapping.FuncCard_MCUVersionOccupancy);
    const req = new Request($data, bBroadcast, 'FuncCard_SetFuncCardMCUVersion_1');
    req.destination = addr;
    req.deviceType = 2;
    req.port = portAddr;
    req.rcvIndex = funcCardAddr;
    req.address = AddressMapping.FuncCard_MCUVersionAddr;
    await this.connection.send(req);
  }

  // #21345
  async FuncCard_ReadFuncCardMCUDescription(addr: number): Promise<Buffer> {
    const req = new Request(
      AddressMapping.FuncCard_MCUDescriptionOccupancy,
      'FuncCard_ReadFuncCardMCUDescription'
    );
    req.destination = addr;
    req.address = AddressMapping.FuncCard_MCUDescriptionAddr;
    return (await this.connection.send(req)).data;
  }

  // #21354
  async FuncCard_ReadFuncCardMCUDescription_1(
    addr: number,
    portAddr: number,
    funcCardAddr: number
  ): Promise<Buffer> {
    const req = new Request(
      AddressMapping.FuncCard_MCUDescriptionOccupancy,
      'FuncCard_ReadFuncCardMCUDescription_1'
    );
    req.destination = addr;
    req.deviceType = 2;
    req.port = portAddr;
    req.rcvIndex = funcCardAddr;
    req.address = AddressMapping.FuncCard_MCUDescriptionAddr;
    return (await this.connection.send(req)).data;
  }

  // #21376
  async FuncCard_SetFuncCardMCUDescription(
    addr: number,
    bBroadcast: boolean,
    funcCard_MCUDescription: number[] | Buffer
  ): Promise<void> {
    if (funcCard_MCUDescription.length !== AddressMapping.FuncCard_MCUDescriptionOccupancy)
      throw new TypeError(`Invalid buffer size: ${funcCard_MCUDescription.length}`);
    const req = new Request(
      funcCard_MCUDescription,
      bBroadcast,
      'FuncCard_SetFuncCardMCUDescription'
    );
    req.destination = addr;
    req.address = AddressMapping.FuncCard_MCUDescriptionAddr;
    await this.connection.send(req);
  }

  // #21385
  async FuncCard_SetFuncCardMCUDescription_1(
    addr: number,
    portAddr: number,
    funcCardAddr: number,
    bBroadcast: boolean,
    mcuDescription: number[] | Buffer
  ): Promise<void> {
    if (mcuDescription.length !== AddressMapping.FuncCard_MCUDescriptionOccupancy)
      throw new TypeError(`Invalid buffer size: ${mcuDescription.length}`);
    const req = new Request(mcuDescription, bBroadcast, 'FuncCard_SetFuncCardMCUDescription_1');
    req.destination = addr;
    req.deviceType = 2;
    req.port = portAddr;
    req.rcvIndex = funcCardAddr;
    req.address = AddressMapping.FuncCard_MCUDescriptionAddr;
    await this.connection.send(req);
  }

  // #21441
  async FuncCard_SetRebootBootFpgaProgram(
    addr: number,
    bBroadcast: boolean,
    funcCardModle: number
  ): Promise<void> {
    const $data = encodeUIntLE(
      funcCardModle,
      AddressMapping.FuncCard_RebootBootFpgaProgramOccupancy
    );
    const req = new Request($data, bBroadcast, 'FuncCard_SetRebootBootFpgaProgram');
    req.destination = addr;
    req.address = AddressMapping.FuncCard_RebootBootFpgaProgramAddr;
    await this.connection.send(req);
  }

  // #21451
  async FuncCard_SetRebootBootFpgaProgram_1(
    addr: number,
    portAddr: number,
    funcCardAddr: number,
    bBroadcast: boolean,
    funcCardModle: number
  ): Promise<void> {
    const $data = encodeUIntLE(
      funcCardModle,
      AddressMapping.FuncCard_RebootBootFpgaProgramOccupancy
    );
    const req = new Request($data, bBroadcast, 'FuncCard_SetRebootBootFpgaProgram_1');
    req.destination = addr;
    req.deviceType = 2;
    req.port = portAddr;
    req.rcvIndex = funcCardAddr;
    req.address = AddressMapping.FuncCard_RebootBootFpgaProgramAddr;
    await this.connection.send(req);
  }

  // #21461
  async FuncCard_SetRebootAppFpgaProgram(
    addr: number,
    bBroadcast: boolean,
    funcCardModle: number
  ): Promise<void> {
    const $data = encodeUIntLE(
      funcCardModle,
      AddressMapping.FuncCard_RebootAppFpgaProgramOccupancy
    );
    const req = new Request($data, bBroadcast, 'FuncCard_SetRebootAppFpgaProgram');
    req.destination = addr;
    req.address = AddressMapping.FuncCard_RebootAppFpgaProgramAddr;
    await this.connection.send(req);
  }

  // #21471
  async FuncCard_SetRebootAppFpgaProgram_1(
    addr: number,
    portAddr: number,
    funcCardAddr: number,
    bBroadcast: boolean,
    funcCardModle: number
  ): Promise<void> {
    const $data = encodeUIntLE(
      funcCardModle,
      AddressMapping.FuncCard_RebootAppFpgaProgramOccupancy
    );
    const req = new Request($data, bBroadcast, 'FuncCard_SetRebootAppFpgaProgram_1');
    req.destination = addr;
    req.deviceType = 2;
    req.port = portAddr;
    req.rcvIndex = funcCardAddr;
    req.address = AddressMapping.FuncCard_RebootAppFpgaProgramAddr;
    await this.connection.send(req);
  }

  // #21481
  async FuncCard_SetStoreFpgaBootProgram(
    addr: number,
    bBroadcast: boolean,
    funcCardModle: number
  ): Promise<void> {
    const $data = encodeUIntLE(
      funcCardModle,
      AddressMapping.FuncCard_StoreFpgaBootProgramOccupancy
    );
    const req = new Request($data, bBroadcast, 'FuncCard_SetStoreFpgaBootProgram');
    req.destination = addr;
    req.address = AddressMapping.FuncCard_StoreFpgaBootProgramAddr;
    await this.connection.send(req);
  }

  // #21491
  async FuncCard_SetStoreFpgaBootProgram_1(
    addr: number,
    portAddr: number,
    funcCardAddr: number,
    bBroadcast: boolean,
    funcCardModle: number
  ): Promise<void> {
    const $data = encodeUIntLE(
      funcCardModle,
      AddressMapping.FuncCard_StoreFpgaBootProgramOccupancy
    );
    const req = new Request($data, bBroadcast, 'FuncCard_SetStoreFpgaBootProgram_1');
    req.destination = addr;
    req.deviceType = 2;
    req.port = portAddr;
    req.rcvIndex = funcCardAddr;
    req.address = AddressMapping.FuncCard_StoreFpgaBootProgramAddr;
    await this.connection.send(req);
  }

  // #21501
  async FuncCard_SetStoreFpgaAppProgram(
    addr: number,
    bBroadcast: boolean,
    funcCardModle: number
  ): Promise<void> {
    const $data = encodeUIntLE(funcCardModle, AddressMapping.FuncCard_StoreFpgaAppProgramOccupancy);
    const req = new Request($data, bBroadcast, 'FuncCard_SetStoreFpgaAppProgram');
    req.destination = addr;
    req.address = AddressMapping.FuncCard_StoreFpgaAppProgramAddr;
    await this.connection.send(req);
  }

  // #21511
  async FuncCard_SetStoreFpgaAppProgram_1(
    addr: number,
    portAddr: number,
    funcCardAddr: number,
    bBroadcast: boolean,
    funcCardModle: number
  ): Promise<void> {
    const $data = encodeUIntLE(funcCardModle, AddressMapping.FuncCard_StoreFpgaAppProgramOccupancy);
    const req = new Request($data, bBroadcast, 'FuncCard_SetStoreFpgaAppProgram_1');
    req.destination = addr;
    req.deviceType = 2;
    req.port = portAddr;
    req.rcvIndex = funcCardAddr;
    req.address = AddressMapping.FuncCard_StoreFpgaAppProgramAddr;
    await this.connection.send(req);
  }

  // #21521
  async FuncCard_ReadTempInfoOfFuncCard(addr: number): Promise<number> {
    const req = new Request(
      AddressMapping.FuncCard_TempInfoOfFuncCardOccupancy,
      'FuncCard_ReadTempInfoOfFuncCard'
    );
    req.destination = addr;
    req.address = AddressMapping.FuncCard_TempInfoOfFuncCardAddr;
    return decodeUIntLE(await this.connection.send(req));
  }

  // #21530
  async FuncCard_ReadTempInfoOfFuncCard_1(
    addr: number,
    portAddr: number,
    funcCardAddr: number
  ): Promise<number> {
    const req = new Request(
      AddressMapping.FuncCard_TempInfoOfFuncCardOccupancy,
      'FuncCard_ReadTempInfoOfFuncCard_1'
    );
    req.destination = addr;
    req.deviceType = 2;
    req.port = portAddr;
    req.rcvIndex = funcCardAddr;
    req.address = AddressMapping.FuncCard_TempInfoOfFuncCardAddr;
    return decodeUIntLE(await this.connection.send(req));
  }

  // #21559
  async FuncCard_ReadHumiOfFuncCard(addr: number): Promise<number> {
    const req = new Request(
      AddressMapping.FuncCard_HumidityOfFuncCardOccupancy,
      'FuncCard_ReadHumiOfFuncCard'
    );
    req.destination = addr;
    req.address = AddressMapping.FuncCard_HumidityOfFuncCardAddr;
    return decodeUIntLE(await this.connection.send(req));
  }

  // #21568
  async FuncCard_ReadHumiOfFuncCard_1(
    addr: number,
    portAddr: number,
    funcCardAddr: number
  ): Promise<number> {
    const req = new Request(
      AddressMapping.FuncCard_HumidityOfFuncCardOccupancy,
      'FuncCard_ReadHumiOfFuncCard_1'
    );
    req.destination = addr;
    req.deviceType = 2;
    req.port = portAddr;
    req.rcvIndex = funcCardAddr;
    req.address = AddressMapping.FuncCard_HumidityOfFuncCardAddr;
    return decodeUIntLE(await this.connection.send(req));
  }

  // #21591
  async FuncCard_ReadVoltageOfFuncCard(addr: number): Promise<number> {
    const req = new Request(
      AddressMapping.FuncCard_VoltageOfFuncCardOccupancy,
      'FuncCard_ReadVoltageOfFuncCard'
    );
    req.destination = addr;
    req.address = AddressMapping.FuncCard_VoltageOfFuncCardAddr;
    return decodeUIntLE(await this.connection.send(req));
  }

  // #21600
  async FuncCard_ReadVoltageOfFuncCard_1(
    addr: number,
    portAddr: number,
    funcCardAddr: number
  ): Promise<number> {
    const req = new Request(
      AddressMapping.FuncCard_VoltageOfFuncCardOccupancy,
      'FuncCard_ReadVoltageOfFuncCard_1'
    );
    req.destination = addr;
    req.deviceType = 2;
    req.port = portAddr;
    req.rcvIndex = funcCardAddr;
    req.address = AddressMapping.FuncCard_VoltageOfFuncCardAddr;
    return decodeUIntLE(await this.connection.send(req));
  }

  // #21623
  async FuncCard_ReadLinkStateOfMonitorCard(addr: number): Promise<number> {
    const req = new Request(
      AddressMapping.FuncCard_LinkStateOfMonitorCardOccupancy,
      'FuncCard_ReadLinkStateOfMonitorCard'
    );
    req.destination = addr;
    req.address = AddressMapping.FuncCard_LinkStateOfMonitorCardAddr;
    return decodeUIntLE(await this.connection.send(req));
  }

  // #21632
  async FuncCard_ReadLinkStateOfMonitorCard_1(
    addr: number,
    portAddr: number,
    funcCardAddr: number
  ): Promise<number> {
    const req = new Request(
      AddressMapping.FuncCard_LinkStateOfMonitorCardOccupancy,
      'FuncCard_ReadLinkStateOfMonitorCard_1'
    );
    req.destination = addr;
    req.deviceType = 2;
    req.port = portAddr;
    req.rcvIndex = funcCardAddr;
    req.address = AddressMapping.FuncCard_LinkStateOfMonitorCardAddr;
    return decodeUIntLE(await this.connection.send(req));
  }

  // #21657
  async FuncCard_ReadTempInfoOfMonitorCard(addr: number): Promise<number> {
    const req = new Request(
      AddressMapping.FuncCard_TempInfoOfMonitorCardOccupancy,
      'FuncCard_ReadTempInfoOfMonitorCard'
    );
    req.destination = addr;
    req.address = AddressMapping.FuncCard_TempInfoOfMonitorCardAddr;
    return decodeUIntLE(await this.connection.send(req));
  }

  // #21666
  async FuncCard_ReadTempInfoOfMonitorCard_1(
    addr: number,
    portAddr: number,
    funcCardAddr: number
  ): Promise<number> {
    const req = new Request(
      AddressMapping.FuncCard_TempInfoOfMonitorCardOccupancy,
      'FuncCard_ReadTempInfoOfMonitorCard_1'
    );
    req.destination = addr;
    req.deviceType = 2;
    req.port = portAddr;
    req.rcvIndex = funcCardAddr;
    req.address = AddressMapping.FuncCard_TempInfoOfMonitorCardAddr;
    return decodeUIntLE(await this.connection.send(req));
  }

  // #21695
  async FuncCard_ReadHumiOfMonitorCard(addr: number): Promise<number> {
    const req = new Request(
      AddressMapping.FuncCard_HumiOfMonitorCardOccupancy,
      'FuncCard_ReadHumiOfMonitorCard'
    );
    req.destination = addr;
    req.address = AddressMapping.FuncCard_HumiOfMonitorCardAddr;
    return decodeUIntLE(await this.connection.send(req));
  }

  // #21704
  async FuncCard_ReadHumiOfMonitorCard_1(
    addr: number,
    portAddr: number,
    funcCardAddr: number
  ): Promise<number> {
    const req = new Request(
      AddressMapping.FuncCard_HumiOfMonitorCardOccupancy,
      'FuncCard_ReadHumiOfMonitorCard_1'
    );
    req.destination = addr;
    req.deviceType = 2;
    req.port = portAddr;
    req.rcvIndex = funcCardAddr;
    req.address = AddressMapping.FuncCard_HumiOfMonitorCardAddr;
    return decodeUIntLE(await this.connection.send(req));
  }

  // #21727
  async FuncCard_ReadSmokeWarningOfMonitorCard(addr: number): Promise<number> {
    const req = new Request(
      AddressMapping.FuncCard_SmokeWarningOfMonitorCardOccupancy,
      'FuncCard_ReadSmokeWarningOfMonitorCard'
    );
    req.destination = addr;
    req.address = AddressMapping.FuncCard_SmokeWarningOfMonitorCardAddr;
    return decodeUIntLE(await this.connection.send(req));
  }

  // #21736
  async FuncCard_ReadSmokeWarningOfMonitorCard_1(
    addr: number,
    portAddr: number,
    funcCardAddr: number
  ): Promise<number> {
    const req = new Request(
      AddressMapping.FuncCard_SmokeWarningOfMonitorCardOccupancy,
      'FuncCard_ReadSmokeWarningOfMonitorCard_1'
    );
    req.destination = addr;
    req.deviceType = 2;
    req.port = portAddr;
    req.rcvIndex = funcCardAddr;
    req.address = AddressMapping.FuncCard_SmokeWarningOfMonitorCardAddr;
    return decodeUIntLE(await this.connection.send(req));
  }

  // #21768
  async FuncCard_ReadFanSpeedOfMonitorCard(
    addr: number,
    readCountOfFan: number,
    beginIdnexOfFan: number
  ): Promise<Buffer> {
    const req = new Request(
      AddressMapping.FuncCard_FanSpeedOfMonitorCardOccupancy * readCountOfFan,
      'FuncCard_ReadFanSpeedOfMonitorCard'
    );
    req.destination = addr;
    req.address =
      AddressMapping.FuncCard_FanSpeedOfMonitorCardAddr +
      AddressMapping.FuncCard_FanSpeedOfMonitorCardOccupancy * beginIdnexOfFan;
    return (await this.connection.send(req)).data;
  }

  // #21781
  async FuncCard_ReadFanSpeedOfMonitorCard_1(
    addr: number,
    portAddr: number,
    funcCardAddr: number,
    readCountOfFan: number,
    beginIdnexOfFan: number
  ): Promise<Buffer> {
    const req = new Request(
      AddressMapping.FuncCard_FanSpeedOfMonitorCardOccupancy * readCountOfFan,
      'FuncCard_ReadFanSpeedOfMonitorCard_1'
    );
    req.destination = addr;
    req.deviceType = 2;
    req.port = portAddr;
    req.rcvIndex = funcCardAddr;
    req.address =
      AddressMapping.FuncCard_FanSpeedOfMonitorCardAddr +
      AddressMapping.FuncCard_FanSpeedOfMonitorCardOccupancy * beginIdnexOfFan;
    return (await this.connection.send(req)).data;
  }

  // #21813
  async FuncCard_ReadVoltageOfMonitorCard(
    addr: number,
    readCountOfValtage: number,
    beginIdnexOfValtage: number
  ): Promise<Buffer> {
    const req = new Request(
      AddressMapping.FuncCard_VoltageOfMonitorCardOccupancy * readCountOfValtage,
      'FuncCard_ReadVoltageOfMonitorCard'
    );
    req.destination = addr;
    req.address =
      AddressMapping.FuncCard_VoltageOfMonitorCardAddr +
      AddressMapping.FuncCard_VoltageOfMonitorCardOccupancy * beginIdnexOfValtage;
    return (await this.connection.send(req)).data;
  }

  // #21826
  async FuncCard_ReadVoltageOfMonitorCard_1(
    addr: number,
    portAddr: number,
    funcCardAddr: number,
    readCountOfValtage: number,
    beginIdnexOfValtage: number
  ): Promise<Buffer> {
    const req = new Request(
      AddressMapping.FuncCard_VoltageOfMonitorCardOccupancy * readCountOfValtage,
      'FuncCard_ReadVoltageOfMonitorCard_1'
    );
    req.destination = addr;
    req.deviceType = 2;
    req.port = portAddr;
    req.rcvIndex = funcCardAddr;
    req.address =
      AddressMapping.FuncCard_VoltageOfMonitorCardAddr +
      AddressMapping.FuncCard_VoltageOfMonitorCardOccupancy * beginIdnexOfValtage;
    return (await this.connection.send(req)).data;
  }

  // #21858
  async FuncCard_ReadFuncCardAllStatus(addr: number): Promise<number> {
    const req = new Request(
      AddressMapping.FuncCard_FuncCardAllStatusOccupancy,
      'FuncCard_ReadFuncCardAllStatus'
    );
    req.destination = addr;
    req.address = AddressMapping.FuncCard_FuncCardAllStatusAddr;
    return decodeUIntLE(await this.connection.send(req));
  }

  // #21867
  async FuncCard_ReadFuncCardAllStatus_1(
    addr: number,
    portAddr: number,
    funcCardAddr: number
  ): Promise<number> {
    const req = new Request(
      AddressMapping.FuncCard_FuncCardAllStatusOccupancy,
      'FuncCard_ReadFuncCardAllStatus_1'
    );
    req.destination = addr;
    req.deviceType = 2;
    req.port = portAddr;
    req.rcvIndex = funcCardAddr;
    req.address = AddressMapping.FuncCard_FuncCardAllStatusAddr;
    return decodeUIntLE(await this.connection.send(req));
  }

  // #21910
  async FuncCard_ReadMonitorCardAllInfo(addr: number): Promise<Buffer> {
    const req = new Request(
      AddressMapping.FuncCard_MonitorCardAllInfoOccupancy,
      'FuncCard_ReadMonitorCardAllInfo'
    );
    req.destination = addr;
    req.address = AddressMapping.FuncCard_MonitorCardAllInfoAddr;
    return (await this.connection.send(req)).data;
  }

  // #21919
  async FuncCard_ReadMonitorCardAllInfo_1(
    addr: number,
    portAddr: number,
    funcCardAddr: number
  ): Promise<Buffer> {
    const req = new Request(
      AddressMapping.FuncCard_MonitorCardAllInfoOccupancy,
      'FuncCard_ReadMonitorCardAllInfo_1'
    );
    req.destination = addr;
    req.deviceType = 2;
    req.port = portAddr;
    req.rcvIndex = funcCardAddr;
    req.address = AddressMapping.FuncCard_MonitorCardAllInfoAddr;
    return (await this.connection.send(req)).data;
  }

  // #22002
  async FuncCard_ReadMonitorCardAllStatus(addr: number): Promise<Buffer> {
    const req = new Request(
      AddressMapping.FuncCard_MonitorCardAllStatusOccupancy,
      'FuncCard_ReadMonitorCardAllStatus'
    );
    req.destination = addr;
    req.address = AddressMapping.FuncCard_MonitorCardAllStatusAddr;
    return (await this.connection.send(req)).data;
  }

  // #22011
  async FuncCard_ReadMonitorCardAllStatus_1(
    addr: number,
    portAddr: number,
    funcCardAddr: number
  ): Promise<Buffer> {
    const req = new Request(
      AddressMapping.FuncCard_MonitorCardAllStatusOccupancy,
      'FuncCard_ReadMonitorCardAllStatus_1'
    );
    req.destination = addr;
    req.deviceType = 2;
    req.port = portAddr;
    req.rcvIndex = funcCardAddr;
    req.address = AddressMapping.FuncCard_MonitorCardAllStatusAddr;
    return (await this.connection.send(req)).data;
  }

  // #22083
  async FuncCard_ReadTimeOnFuncCard(addr: number): Promise<Buffer> {
    const req = new Request(
      AddressMapping.FuncCard_TimeOnFuncCardOccupancy,
      'FuncCard_ReadTimeOnFuncCard'
    );
    req.destination = addr;
    req.address = AddressMapping.FuncCard_TimeOnFuncCardAddr;
    return (await this.connection.send(req)).data;
  }

  // #22092
  async FuncCard_ReadTimeOnFuncCard_1(
    addr: number,
    portAddr: number,
    funcCardAddr: number
  ): Promise<Buffer> {
    const req = new Request(
      AddressMapping.FuncCard_TimeOnFuncCardOccupancy,
      'FuncCard_ReadTimeOnFuncCard_1'
    );
    req.destination = addr;
    req.deviceType = 2;
    req.port = portAddr;
    req.rcvIndex = funcCardAddr;
    req.address = AddressMapping.FuncCard_TimeOnFuncCardAddr;
    return (await this.connection.send(req)).data;
  }

  FuncCard_SetTimeOnFuncCard = (): void => {
    throw new TypeError('Not implemented');
  };

  FuncCard_SetTimeOnFuncCard_1 = (): void => {
    throw new TypeError('Not implemented');
  };

  // #22140
  async FuncCard_ReadPowerPortCtrl(addr: number, powerIndex: number): Promise<number> {
    const req = new Request(
      AddressMapping.FuncCard_PowerPortCtrlOccupancy,
      'FuncCard_ReadPowerPortCtrl'
    );
    req.destination = addr;
    req.address =
      AddressMapping.FuncCard_PowerPortCtrlAddr +
      powerIndex * AddressMapping.FuncCard_PowerPortCtrlOccupancy;
    return decodeUIntLE(await this.connection.send(req));
  }

  // #22149
  async FuncCard_ReadPowerPortCtrl_1(
    addr: number,
    portAddr: number,
    funcCardAddr: number,
    powerIndex: number
  ): Promise<number> {
    const req = new Request(
      AddressMapping.FuncCard_PowerPortCtrlOccupancy,
      'FuncCard_ReadPowerPortCtrl_1'
    );
    req.destination = addr;
    req.deviceType = 2;
    req.port = portAddr;
    req.rcvIndex = funcCardAddr;
    req.address =
      AddressMapping.FuncCard_PowerPortCtrlAddr +
      powerIndex * AddressMapping.FuncCard_PowerPortCtrlOccupancy;
    return decodeUIntLE(await this.connection.send(req));
  }

  // #22177
  async FuncCard_SetPowerPortCtrl(
    addr: number,
    bBroadcast: boolean,
    powerCtrlMode: PowerOperateTypeEnum,
    powerIndex: number
  ): Promise<void> {
    const $data = encodeUIntLE(powerCtrlMode, AddressMapping.FuncCard_PowerPortCtrlOccupancy);
    const req = new Request($data, bBroadcast, 'FuncCard_SetPowerPortCtrl');
    req.destination = addr;
    req.address =
      AddressMapping.FuncCard_PowerPortCtrlAddr +
      powerIndex * AddressMapping.FuncCard_PowerPortCtrlOccupancy;
    await this.connection.send(req);
  }

  // #22187
  async FuncCard_SetPowerPortCtrl_1(
    addr: number,
    portAddr: number,
    funcCardAddr: number,
    bBroadcast: boolean,
    powerCtrlMode: PowerOperateTypeEnum,
    powerIndex: number
  ): Promise<void> {
    const $data = encodeUIntLE(powerCtrlMode, AddressMapping.FuncCard_PowerPortCtrlOccupancy);
    const req = new Request($data, bBroadcast, 'FuncCard_SetPowerPortCtrl_1');
    req.destination = addr;
    req.deviceType = 2;
    req.port = portAddr;
    req.rcvIndex = funcCardAddr;
    req.address =
      AddressMapping.FuncCard_PowerPortCtrlAddr +
      powerIndex * AddressMapping.FuncCard_PowerPortCtrlOccupancy;
    await this.connection.send(req);
  }

  // #22197
  async FuncCard_ReadAllPowerPortCtrl(addr: number): Promise<Buffer> {
    const req = new Request(
      AddressMapping.FuncCard_PowerPortCtrlOccupancy * AddressMapping.FuncCard_PowerPortCtrlNum,
      'FuncCard_ReadAllPowerPortCtrl'
    );
    req.destination = addr;
    req.address = AddressMapping.FuncCard_PowerPortCtrlAddr;
    return (await this.connection.send(req)).data;
  }

  // #22206
  async FuncCard_ReadAllPowerPortCtrl_1(
    addr: number,
    portAddr: number,
    funcCardAddr: number
  ): Promise<Buffer> {
    const req = new Request(
      AddressMapping.FuncCard_PowerPortCtrlOccupancy * AddressMapping.FuncCard_PowerPortCtrlNum,
      'FuncCard_ReadAllPowerPortCtrl_1'
    );
    req.destination = addr;
    req.deviceType = 2;
    req.port = portAddr;
    req.rcvIndex = funcCardAddr;
    req.address = AddressMapping.FuncCard_PowerPortCtrlAddr;
    return (await this.connection.send(req)).data;
  }

  FuncCard_SetAllPowerPortCtrl = (): void => {
    throw new TypeError('Not implemented');
  };

  FuncCard_SetAllPowerPortCtrl_1 = (): void => {
    throw new TypeError('Not implemented');
  };

  // #22258
  async FuncCard_ReadPowerOperTime(addr: number): Promise<Buffer> {
    const req = new Request(
      AddressMapping.FuncCard_OperPowerOccupancy,
      'FuncCard_ReadPowerOperTime'
    );
    req.destination = addr;
    req.address = AddressMapping.FuncCard_PowerOperTimeAddr;
    return (await this.connection.send(req)).data;
  }

  // #22267
  async FuncCard_ReadPowerOperTime_1(
    addr: number,
    portAddr: number,
    funcCardAddr: number
  ): Promise<Buffer> {
    const req = new Request(
      AddressMapping.FuncCard_OperPowerOccupancy,
      'FuncCard_ReadPowerOperTime_1'
    );
    req.destination = addr;
    req.deviceType = 2;
    req.port = portAddr;
    req.rcvIndex = funcCardAddr;
    req.address = AddressMapping.FuncCard_PowerOperTimeAddr;
    return (await this.connection.send(req)).data;
  }

  FuncCard_SetPowerOperTime = (): void => {
    throw new TypeError('Not implemented');
  };

  FuncCard_SetPowerOperTime_1 = (): void => {
    throw new TypeError('Not implemented');
  };

  // #22330
  async FuncCard_ReadPowerCtrlMode(addr: number): Promise<number> {
    const req = new Request(
      AddressMapping.FuncCard_PowerCtrlModeOccupancy,
      'FuncCard_ReadPowerCtrlMode'
    );
    req.destination = addr;
    req.address = AddressMapping.FuncCard_PowerCtrlModeAddr;
    return decodeUIntLE(await this.connection.send(req));
  }

  // #22339
  async FuncCard_ReadPowerCtrlMode_1(
    addr: number,
    portAddr: number,
    funcCardAddr: number
  ): Promise<number> {
    const req = new Request(
      AddressMapping.FuncCard_PowerCtrlModeOccupancy,
      'FuncCard_ReadPowerCtrlMode_1'
    );
    req.destination = addr;
    req.deviceType = 2;
    req.port = portAddr;
    req.rcvIndex = funcCardAddr;
    req.address = AddressMapping.FuncCard_PowerCtrlModeAddr;
    return decodeUIntLE(await this.connection.send(req));
  }

  // #22367
  async FuncCard_SetPowerCtrlMode(
    addr: number,
    bBroadcast: boolean,
    powerCtrlMode: PowerCtrlModeEnum
  ): Promise<void> {
    const $data = encodeUIntLE(powerCtrlMode, AddressMapping.FuncCard_PowerCtrlModeOccupancy);
    const req = new Request($data, bBroadcast, 'FuncCard_SetPowerCtrlMode');
    req.destination = addr;
    req.address = AddressMapping.FuncCard_PowerCtrlModeAddr;
    await this.connection.send(req);
  }

  // #22377
  async FuncCard_SetPowerCtrlMode_1(
    addr: number,
    portAddr: number,
    funcCardAddr: number,
    bBroadcast: boolean,
    powerCtrlMode: PowerCtrlModeEnum
  ): Promise<void> {
    const $data = encodeUIntLE(powerCtrlMode, AddressMapping.FuncCard_PowerCtrlModeOccupancy);
    const req = new Request($data, bBroadcast, 'FuncCard_SetPowerCtrlMode_1');
    req.destination = addr;
    req.deviceType = 2;
    req.port = portAddr;
    req.rcvIndex = funcCardAddr;
    req.address = AddressMapping.FuncCard_PowerCtrlModeAddr;
    await this.connection.send(req);
  }

  // #22387
  async FuncCard_ReadDelayTime(addr: number): Promise<number> {
    const req = new Request(AddressMapping.FuncCard_DelayTimeOccupancy, 'FuncCard_ReadDelayTime');
    req.destination = addr;
    req.address = AddressMapping.FuncCard_DelayTimeAddr;
    return decodeUIntLE(await this.connection.send(req));
  }

  // #22396
  async FuncCard_ReadDelayTime_1(
    addr: number,
    portAddr: number,
    funcCardAddr: number
  ): Promise<number> {
    const req = new Request(AddressMapping.FuncCard_DelayTimeOccupancy, 'FuncCard_ReadDelayTime_1');
    req.destination = addr;
    req.deviceType = 2;
    req.port = portAddr;
    req.rcvIndex = funcCardAddr;
    req.address = AddressMapping.FuncCard_DelayTimeAddr;
    return decodeUIntLE(await this.connection.send(req));
  }

  // #22416
  async FuncCard_SetDelayTime(addr: number, bBroadcast: boolean, delayTime: number): Promise<void> {
    const $data = encodeUIntLE(delayTime, AddressMapping.FuncCard_DelayTimeOccupancy);
    const req = new Request($data, bBroadcast, 'FuncCard_SetDelayTime');
    req.destination = addr;
    req.address = AddressMapping.FuncCard_DelayTimeAddr;
    await this.connection.send(req);
  }

  // #22426
  async FuncCard_SetDelayTime_1(
    addr: number,
    portAddr: number,
    funcCardAddr: number,
    bBroadcast: boolean,
    delayTime: number
  ): Promise<void> {
    const $data = encodeUIntLE(delayTime, AddressMapping.FuncCard_DelayTimeOccupancy);
    const req = new Request($data, bBroadcast, 'FuncCard_SetDelayTime_1');
    req.destination = addr;
    req.deviceType = 2;
    req.port = portAddr;
    req.rcvIndex = funcCardAddr;
    req.address = AddressMapping.FuncCard_DelayTimeAddr;
    await this.connection.send(req);
  }

  // #22436
  async FuncCard_ReadPowerPortCtrlTotal(addr: number): Promise<number> {
    const req = new Request(
      AddressMapping.FuncCard_PowerPortCtrlTotalOccupancy,
      'FuncCard_ReadPowerPortCtrlTotal'
    );
    req.destination = addr;
    req.address = AddressMapping.FuncCard_PowerPortCtrlTotalAddr;
    return decodeUIntLE(await this.connection.send(req));
  }

  // #22445
  async FuncCard_ReadPowerPortCtrlTotal_1(
    addr: number,
    portAddr: number,
    funcCardAddr: number
  ): Promise<number> {
    const req = new Request(
      AddressMapping.FuncCard_PowerPortCtrlTotalOccupancy,
      'FuncCard_ReadPowerPortCtrlTotal_1'
    );
    req.destination = addr;
    req.deviceType = 2;
    req.port = portAddr;
    req.rcvIndex = funcCardAddr;
    req.address = AddressMapping.FuncCard_PowerPortCtrlTotalAddr;
    return decodeUIntLE(await this.connection.send(req));
  }

  // #22473
  async FuncCard_SetPowerPortCtrlTotal(
    addr: number,
    bBroadcast: boolean,
    operType: PowerOperateTypeEnum
  ): Promise<void> {
    const $data = encodeUIntLE(operType, AddressMapping.FuncCard_PowerPortCtrlTotalOccupancy);
    const req = new Request($data, bBroadcast, 'FuncCard_SetPowerPortCtrlTotal');
    req.destination = addr;
    req.address = AddressMapping.FuncCard_PowerPortCtrlTotalAddr;
    await this.connection.send(req);
  }

  // #22483
  async FuncCard_SetPowerPortCtrlTotal_1(
    addr: number,
    portAddr: number,
    funcCardAddr: number,
    bBroadcast: boolean,
    operType: PowerOperateTypeEnum
  ): Promise<void> {
    const $data = encodeUIntLE(operType, AddressMapping.FuncCard_PowerPortCtrlTotalOccupancy);
    const req = new Request($data, bBroadcast, 'FuncCard_SetPowerPortCtrlTotal_1');
    req.destination = addr;
    req.deviceType = 2;
    req.port = portAddr;
    req.rcvIndex = funcCardAddr;
    req.address = AddressMapping.FuncCard_PowerPortCtrlTotalAddr;
    await this.connection.send(req);
  }

  // #22493
  async FuncCard_ReadOutDeviceValue(addr: number): Promise<Buffer> {
    const req = new Request(
      AddressMapping.FuncCard_ReadOutDeviceOccupancy,
      'FuncCard_ReadOutDeviceValue'
    );
    req.destination = addr;
    req.address = AddressMapping.FuncCard_ReadOutDeviceAddr;
    return (await this.connection.send(req)).data;
  }

  // #22502
  async FuncCard_ReadOutDeviceValue_1(
    addr: number,
    portAddr: number,
    funcCardAddr: number
  ): Promise<Buffer> {
    const req = new Request(
      AddressMapping.FuncCard_ReadOutDeviceOccupancy,
      'FuncCard_ReadOutDeviceValue_1'
    );
    req.destination = addr;
    req.deviceType = 2;
    req.port = portAddr;
    req.rcvIndex = funcCardAddr;
    req.address = AddressMapping.FuncCard_ReadOutDeviceAddr;
    return (await this.connection.send(req)).data;
  }

  // #22511
  async FuncCard_ReadOutDeviceValue_2(addr: number, dataLength: number): Promise<Buffer> {
    const req = new Request(dataLength, 'FuncCard_ReadOutDeviceValue_2');
    req.destination = addr;
    req.address = AddressMapping.FuncCard_ReadOutDeviceAddr;
    return (await this.connection.send(req)).data;
  }

  // #22520
  async FuncCard_ReadOutDeviceValue_3(
    addr: number,
    portAddr: number,
    funcCardAddr: number,
    dataLength: number
  ): Promise<Buffer> {
    const req = new Request(dataLength, 'FuncCard_ReadOutDeviceValue_3');
    req.destination = addr;
    req.deviceType = 2;
    req.port = portAddr;
    req.rcvIndex = funcCardAddr;
    req.address = AddressMapping.FuncCard_ReadOutDeviceAddr;
    return (await this.connection.send(req)).data;
  }

  // #22561
  async FuncCard_ReadOutTAndHumValue(addr: number): Promise<Buffer> {
    const req = new Request(
      AddressMapping.FuncCard_ReadTemAndHumOccupancy,
      'FuncCard_ReadOutTAndHumValue'
    );
    req.destination = addr;
    req.address = AddressMapping.FuncCard_ReadOutDeviceAddr;
    return (await this.connection.send(req)).data;
  }

  // #22570
  async FuncCard_ReadOutTAndHumValue_1(
    addr: number,
    portAddr: number,
    funcCardAddr: number
  ): Promise<Buffer> {
    const req = new Request(
      AddressMapping.FuncCard_ReadTemAndHumOccupancy,
      'FuncCard_ReadOutTAndHumValue_1'
    );
    req.destination = addr;
    req.deviceType = 2;
    req.port = portAddr;
    req.rcvIndex = funcCardAddr;
    req.address = AddressMapping.FuncCard_ReadOutDeviceAddr;
    return (await this.connection.send(req)).data;
  }

  FuncCard_SetOutDevice = (): void => {
    throw new TypeError('Not implemented');
  };

  FuncCard_SetOutDevice_1 = (): void => {
    throw new TypeError('Not implemented');
  };

  // #22686
  async FuncCard_SetOutDevice_2(
    addr: number,
    bBroadcast: boolean,
    outDeviceAddr: number,
    baudType: BaudRateTypeEnum,
    otherDeviceProtocol: number[] | Buffer
  ): Promise<void> {
    const $data = makeOutDeviceBytes(outDeviceAddr, baudType, otherDeviceProtocol);
    const req = new Request($data, bBroadcast, 'FuncCard_SetOutDevice_2');
    req.destination = addr;
    req.address = AddressMapping.FuncCard_WriteOutDeviceAddr;
    await this.connection.send(req);
  }

  // #22700
  async FuncCard_SetOutDevice_3(
    addr: number,
    portAddr: number,
    funcCardAddr: number,
    bBroadcast: boolean,
    outDeviceAddr: number,
    baudType: BaudRateTypeEnum,
    otherDeviceProtocol: number[] | Buffer
  ): Promise<void> {
    const $data = makeOutDeviceBytes(outDeviceAddr, baudType, otherDeviceProtocol);
    const req = new Request($data, bBroadcast, 'FuncCard_SetOutDevice_3');
    req.destination = addr;
    req.deviceType = 2;
    req.port = portAddr;
    req.rcvIndex = funcCardAddr;
    req.address = AddressMapping.FuncCard_WriteOutDeviceAddr;
    await this.connection.send(req);
  }

  FuncCard_SaveToHWOutDevice = (): void => {
    throw new TypeError('Not implemented');
  };

  FuncCard_SaveToHWOutDevice_1 = (): void => {
    throw new TypeError('Not implemented');
  };

  // #22734
  async FuncCard_ReadAudioFrequency(addr: number): Promise<number> {
    const req = new Request(
      AddressMapping.FuncCard_AudioFrequencyOccupancy,
      'FuncCard_ReadAudioFrequency'
    );
    req.destination = addr;
    req.address = AddressMapping.FuncCard_AudioFrequencyAddr;
    return decodeUIntLE(await this.connection.send(req));
  }

  // #22743
  async FuncCard_ReadAudioFrequency_1(
    addr: number,
    portAddr: number,
    funcCardAddr: number
  ): Promise<number> {
    const req = new Request(
      AddressMapping.FuncCard_AudioFrequencyOccupancy,
      'FuncCard_ReadAudioFrequency_1'
    );
    req.destination = addr;
    req.deviceType = 2;
    req.port = portAddr;
    req.rcvIndex = funcCardAddr;
    req.address = AddressMapping.FuncCard_AudioFrequencyAddr;
    return decodeUIntLE(await this.connection.send(req));
  }

  // #22772
  async FuncCard_SetAudioFrequency(
    addr: number,
    bBroadcast: boolean,
    freMode: AudioFrequencyModeEnum
  ): Promise<void> {
    const req = new Request([freMode], bBroadcast, 'FuncCard_SetAudioFrequency');
    req.destination = addr;
    req.address = AddressMapping.FuncCard_AudioFrequencyAddr;
    await this.connection.send(req);
  }

  // #22783
  async FuncCard_SetAudioFrequency_1(
    addr: number,
    portAddr: number,
    funcCardAddr: number,
    bBroadcast: boolean,
    freMode: AudioFrequencyModeEnum
  ): Promise<void> {
    const req = new Request([freMode], bBroadcast, 'FuncCard_SetAudioFrequency_1');
    req.destination = addr;
    req.deviceType = 2;
    req.port = portAddr;
    req.rcvIndex = funcCardAddr;
    req.address = AddressMapping.FuncCard_AudioFrequencyAddr;
    await this.connection.send(req);
  }

  // #22794
  async ReadVirtualFrameRate(addr: number): Promise<number> {
    const req = new Request(AddressMapping.VirtualFrameRateOccupancy, 'ReadVirtualFrameRate');
    req.destination = addr;
    req.address = AddressMapping.VirtualFrameRateAddr;
    return decodeUIntLE(await this.connection.send(req));
  }

  // #22814
  async SetVirtualFrameRate(
    addr: number,
    bBroadcast: boolean,
    virtualFrameRate: number
  ): Promise<void> {
    const $data = encodeUIntLE(virtualFrameRate, AddressMapping.VirtualFrameRateOccupancy);
    const req = new Request($data, bBroadcast, 'SetVirtualFrameRate');
    req.destination = addr;
    req.address = AddressMapping.VirtualFrameRateAddr;
    await this.connection.send(req);
  }

  // #22824
  async ReadVirtualCaptureEnable(addr: number): Promise<number> {
    const req = new Request(
      AddressMapping.VirtualCaptureEnableOccupancy,
      'ReadVirtualCaptureEnable'
    );
    req.destination = addr;
    req.address = AddressMapping.VirtualCaptureEnableAddr;
    return decodeUIntLE(await this.connection.send(req));
  }

  // #22852
  async SetVirtualCaptureEnable(
    addr: number,
    bBroadcast: boolean,
    virtualCaptureEnable: boolean
  ): Promise<void> {
    const $data = encodeUIntLE(
      virtualCaptureEnable ? 5 : 0,
      AddressMapping.VirtualCaptureEnableOccupancy
    );
    const req = new Request($data, bBroadcast, 'SetVirtualCaptureEnable');
    req.destination = addr;
    req.address = AddressMapping.VirtualCaptureEnableAddr;
    await this.connection.send(req);
  }

  // #22867
  async ReadVirtualImageDataSource(addr: number): Promise<number> {
    const req = new Request(
      AddressMapping.VirtualImageDataSourceOccupancy,
      'ReadVirtualImageDataSource'
    );
    req.destination = addr;
    req.address = AddressMapping.VirtualImageDataSourceAddr;
    return decodeUIntLE(await this.connection.send(req));
  }

  // #22887
  async SetVirtualImageDataSource(
    addr: number,
    bBroadcast: boolean,
    virtuaImageDataSource: number
  ): Promise<void> {
    const $data = encodeUIntLE(
      virtuaImageDataSource,
      AddressMapping.VirtualImageDataSourceOccupancy
    );
    const req = new Request($data, bBroadcast, 'SetVirtualImageDataSource');
    req.destination = addr;
    req.address = AddressMapping.VirtualImageDataSourceAddr;
    await this.connection.send(req);
  }

  // #22897
  async ReadVirtualSendDataEnable(addr: number): Promise<number> {
    const req = new Request(AddressMapping.VirtualSendEnableOccupancy, 'ReadVirtualSendDataEnable');
    req.destination = addr;
    req.address = AddressMapping.VirtualSendEnableAddr;
    return decodeUIntLE(await this.connection.send(req));
  }

  // #22925
  async SetVirtualSendEnable(
    addr: number,
    bBroadcast: boolean,
    virtualSendEnable: boolean
  ): Promise<void> {
    const $data = encodeUIntLE(
      virtualSendEnable ? 5 : 0,
      AddressMapping.VirtualSendEnableOccupancy
    );
    const req = new Request($data, bBroadcast, 'SetVirtualSendEnable');
    req.destination = addr;
    req.address = AddressMapping.VirtualSendEnableAddr;
    await this.connection.send(req);
  }

  // #22940
  async ReadWindowBmpTimeoutSet(addr: number): Promise<number> {
    const req = new Request(
      AddressMapping.VirtualWindowBmpTimeoutSetOccupancy,
      'ReadWindowBmpTimeoutSet'
    );
    req.destination = addr;
    req.address = AddressMapping.VirtualWindowBmpTimeoutSetAddr;
    return decodeUIntLE(await this.connection.send(req));
  }

  // #22960
  async SetVirtualWindowBmpTimeoutSet(
    addr: number,
    bBroadcast: boolean,
    virtuaWindowBmpTimeoutSet: number
  ): Promise<void> {
    const $data = encodeUIntLE(
      virtuaWindowBmpTimeoutSet,
      AddressMapping.VirtualWindowBmpTimeoutSetOccupancy
    );
    const req = new Request($data, bBroadcast, 'SetVirtualWindowBmpTimeoutSet');
    req.destination = addr;
    req.address = AddressMapping.VirtualWindowBmpTimeoutSetAddr;
    await this.connection.send(req);
  }

  // #22970
  async ReadSender_DistributeEnable(addr: number): Promise<number> {
    const req = new Request(
      AddressMapping.DistributeEnableOccupancy,
      'ReadSender_DistributeEnable'
    );
    req.destination = addr;
    req.address = AddressMapping.DistributeEnableAddr;
    return decodeUIntLE(await this.connection.send(req));
  }

  // #22993
  async SetSender_DistributeEnable(
    addr: number,
    bBroadcast: boolean,
    functionType: ModulationModeTypeEnum
  ): Promise<void> {
    const req = new Request(
      functionType === ModulationModeTypeEnum.TwoToFour ||
      functionType === ModulationModeTypeEnum.OneToEight
        ? [137]
        : functionType === ModulationModeTypeEnum.NoDistributor
          ? [255]
          : [0],
      bBroadcast,
      'SetSender_DistributeEnable'
    );
    req.destination = addr;
    req.address = AddressMapping.DistributeEnableAddr;
    await this.connection.send(req);
  }

  // #23013
  async ReadSender_DistributePortSeting(addr: number): Promise<number> {
    const req = new Request(
      AddressMapping.DistributePortSetingAddrOccupancy,
      'ReadSender_DistributePortSeting'
    );
    req.destination = addr;
    req.address = AddressMapping.DistributePortSetingAddr;
    return decodeUIntLE(await this.connection.send(req));
  }

  // #23035
  async SetSender_DistributePortSeting(
    addr: number,
    bBroadcast: boolean,
    dataValue: number[] | Buffer
  ): Promise<void> {
    if (dataValue.length !== AddressMapping.DistributePortSetingAddrOccupancy)
      throw new TypeError(`Invalid buffer size: ${dataValue.length}`);
    const req = new Request(dataValue, bBroadcast, 'SetSender_DistributePortSeting');
    req.destination = addr;
    req.address = AddressMapping.DistributePortSetingAddr;
    await this.connection.send(req);
  }

  // #23044
  async ReadSaveDistributeParameters(
    addr: number,
    portAddr: number,
    distributeAddr: number
  ): Promise<number> {
    const req = new Request(
      AddressMapping.SaveDistributeParameterOccupancy,
      'ReadSaveDistributeParameters'
    );
    req.destination = addr;
    req.deviceType = 3;
    req.port = portAddr;
    req.rcvIndex = distributeAddr;
    req.address = AddressMapping.SaveDistributeParameterAddr;
    return decodeUIntLE(await this.connection.send(req));
  }

  // #23064
  async SetSaveDistributeParameters(
    addr: number,
    portAddr: number,
    distributeAddr: number,
    bBroadcast: boolean,
    saveSendCardsParameters: number
  ): Promise<void> {
    const req = new Request([saveSendCardsParameters], bBroadcast, 'SetSaveDistributeParameters');
    req.destination = addr;
    req.deviceType = 3;
    req.port = portAddr;
    req.rcvIndex = distributeAddr;
    req.address = AddressMapping.SaveDistributeParameterAddr;
    await this.connection.send(req);
  }

  // #23075
  async ReadDistributeReturnFactoryValues(
    addr: number,
    portAddr: number,
    distributeAddr: number
  ): Promise<number> {
    const req = new Request(
      AddressMapping.DistributeReturnFactoryOccupancy,
      'ReadDistributeReturnFactoryValues'
    );
    req.destination = addr;
    req.deviceType = 3;
    req.port = portAddr;
    req.rcvIndex = distributeAddr;
    req.address = AddressMapping.DistributeReturnFactoryValuesAddr;
    return decodeUIntLE(await this.connection.send(req));
  }

  // #23095
  async SetDistributeReturnFactoryValues(
    addr: number,
    portAddr: number,
    distributeAddr: number,
    bBroadcast: boolean,
    returnFactoryValues: number
  ): Promise<void> {
    const $data = encodeUIntLE(
      returnFactoryValues,
      AddressMapping.DistributeReturnFactoryOccupancy
    );
    const req = new Request($data, bBroadcast, 'SetDistributeReturnFactoryValues');
    req.destination = addr;
    req.deviceType = 3;
    req.port = portAddr;
    req.rcvIndex = distributeAddr;
    req.address = AddressMapping.DistributeReturnFactoryValuesAddr;
    await this.connection.send(req);
  }

  // #23106
  async Distribute_ReadCompanyID(
    addr: number,
    portAddr: number,
    distributeAddr: number
  ): Promise<number> {
    const req = new Request(
      AddressMapping.Distribute_CompanyIDOccupancy,
      'Distribute_ReadCompanyID'
    );
    req.destination = addr;
    req.deviceType = 3;
    req.port = portAddr;
    req.rcvIndex = distributeAddr;
    req.address = AddressMapping.Distribute_CompanyIDAddr;
    return decodeUIntLE(await this.connection.send(req));
  }

  // #23126
  async Distribute_ReadDistributeModle(
    addr: number,
    portAddr: number,
    distributeAddr: number
  ): Promise<number> {
    const req = new Request(
      AddressMapping.Distribute_ModleOccupancy,
      'Distribute_ReadDistributeModle'
    );
    req.destination = addr;
    req.deviceType = 3;
    req.port = portAddr;
    req.rcvIndex = distributeAddr;
    req.address = AddressMapping.Distribute_ModleAddr;
    return decodeUIntLE(await this.connection.send(req));
  }

  // #23146
  async Distribute_ReadGoldenFPGAVersion(
    addr: number,
    portAddr: number,
    distributeAddr: number
  ): Promise<number> {
    const req = new Request(
      AddressMapping.Distribute_GoldenFPGAVersionOccupancy,
      'Distribute_ReadGoldenFPGAVersion'
    );
    req.destination = addr;
    req.deviceType = 3;
    req.port = portAddr;
    req.rcvIndex = distributeAddr;
    req.address = AddressMapping.Distribute_GoldenFPGAVersionAddr;
    return decodeUIntLE(await this.connection.send(req));
  }

  // #23166
  async Distribute_ReadDistributeFPGALength(
    addr: number,
    portAddr: number,
    distributeAddr: number
  ): Promise<number> {
    const req = new Request(
      AddressMapping.Distribute_FPGALengthOccupancy,
      'Distribute_ReadDistributeFPGALength'
    );
    req.destination = addr;
    req.deviceType = 3;
    req.port = portAddr;
    req.rcvIndex = distributeAddr;
    req.address = AddressMapping.Distribute_FPGALengthAddr;
    return decodeUIntLE(await this.connection.send(req));
  }

  // #23186
  async Distribute_SetDistributeFPGALength(
    addr: number,
    portAddr: number,
    distributAddr: number,
    bBroadcast: boolean,
    fpgaLength: number
  ): Promise<void> {
    const $data = encodeUIntLE(fpgaLength, AddressMapping.Distribute_FPGALengthOccupancy);
    const req = new Request($data, bBroadcast, 'Distribute_SetDistributeFPGALength');
    req.destination = addr;
    req.deviceType = 3;
    req.port = portAddr;
    req.rcvIndex = distributAddr;
    req.address = AddressMapping.Distribute_FPGALengthAddr;
    await this.connection.send(req);
  }

  // #23196
  async Distribute_ReadFuncCardFPGAVersion(
    addr: number,
    portAddr: number,
    distributeAddr: number
  ): Promise<number> {
    const req = new Request(
      AddressMapping.Distribute_FPGAVersionOccupancy,
      'Distribute_ReadFuncCardFPGAVersion'
    );
    req.destination = addr;
    req.deviceType = 3;
    req.port = portAddr;
    req.rcvIndex = distributeAddr;
    req.address = AddressMapping.Distribute_FPGAVersionAddr;
    return decodeUIntLE(await this.connection.send(req));
  }

  // #23216
  async Distribute_SetFuncCardFPGAVersion(
    addr: number,
    portAddr: number,
    distributeAddr: number,
    bBroadcast: boolean,
    fpgaVersion: number
  ): Promise<void> {
    const $data = encodeUIntLE(fpgaVersion, AddressMapping.Distribute_FPGAVersionOccupancy);
    const req = new Request($data, bBroadcast, 'Distribute_SetFuncCardFPGAVersion');
    req.destination = addr;
    req.deviceType = 3;
    req.port = portAddr;
    req.rcvIndex = distributeAddr;
    req.address = AddressMapping.Distribute_FPGAVersionAddr;
    await this.connection.send(req);
  }

  // #23226
  async Distribute_ReadDistributeFPGADescription(
    addr: number,
    portAddr: number,
    distributeAddr: number
  ): Promise<Buffer> {
    const req = new Request(
      AddressMapping.Distribute_FPGADescriptionnOccupancy,
      'Distribute_ReadDistributeFPGADescription'
    );
    req.destination = addr;
    req.deviceType = 3;
    req.port = portAddr;
    req.rcvIndex = distributeAddr;
    req.address = AddressMapping.Distribute_FPGADescriptionAddr;
    return (await this.connection.send(req)).data;
  }

  // #23248
  async Distribute_SetFuncCardFPGADescription(
    addr: number,
    portAddr: number,
    distributeAddr: number,
    bBroadcast: boolean,
    distribute_FPGADescription: number[] | Buffer
  ): Promise<void> {
    if (distribute_FPGADescription.length !== AddressMapping.Distribute_FPGADescriptionnOccupancy)
      throw new TypeError(`Invalid buffer size: ${distribute_FPGADescription.length}`);
    const req = new Request(
      distribute_FPGADescription,
      bBroadcast,
      'Distribute_SetFuncCardFPGADescription'
    );
    req.destination = addr;
    req.deviceType = 3;
    req.port = portAddr;
    req.rcvIndex = distributeAddr;
    req.address = AddressMapping.Distribute_FPGADescriptionAddr;
    await this.connection.send(req);
  }

  // #23286
  async Distribute_ReadDistributeMCULength(
    addr: number,
    portAddr: number,
    distributeAddr: number
  ): Promise<number> {
    const req = new Request(
      AddressMapping.Distribute_MCUProgramLengthOccupancy,
      'Distribute_ReadDistributeMCULength'
    );
    req.destination = addr;
    req.deviceType = 3;
    req.port = portAddr;
    req.rcvIndex = distributeAddr;
    req.address = AddressMapping.Distribute_MCUProgramLengthAddr;
    return decodeUIntLE(await this.connection.send(req));
  }

  // #23306
  async Distribute_SetDistributeMCULength(
    addr: number,
    portAddr: number,
    distributeAddr: number,
    bBroadcast: boolean,
    mcuLength: number
  ): Promise<void> {
    const $data = encodeUIntLE(mcuLength, AddressMapping.Distribute_MCUProgramLengthOccupancy);
    const req = new Request($data, bBroadcast, 'Distribute_SetDistributeMCULength');
    req.destination = addr;
    req.deviceType = 3;
    req.port = portAddr;
    req.rcvIndex = distributeAddr;
    req.address = AddressMapping.Distribute_MCUProgramLengthAddr;
    await this.connection.send(req);
  }

  // #23316
  async Distribute_ReadDistributeMCUVersion(
    addr: number,
    portAddr: number,
    distributeAddr: number
  ): Promise<number> {
    const req = new Request(
      AddressMapping.Distribute_MCUVersionOccupancy,
      'Distribute_ReadDistributeMCUVersion'
    );
    req.destination = addr;
    req.deviceType = 3;
    req.port = portAddr;
    req.rcvIndex = distributeAddr;
    req.address = AddressMapping.Distribute_MCUVersionAddr;
    return decodeUIntLE(await this.connection.send(req));
  }

  // #23336
  async Distribute_SetDistributeMCUVersion(
    addr: number,
    portAddr: number,
    distributeAddr: number,
    bBroadcast: boolean,
    mcuVersion: number
  ): Promise<void> {
    const $data = encodeUIntLE(mcuVersion, AddressMapping.Distribute_MCUVersionOccupancy);
    const req = new Request($data, bBroadcast, 'Distribute_SetDistributeMCUVersion');
    req.destination = addr;
    req.deviceType = 3;
    req.port = portAddr;
    req.rcvIndex = distributeAddr;
    req.address = AddressMapping.Distribute_MCUVersionAddr;
    await this.connection.send(req);
  }

  // #23346
  async Distribute_ReadDistributeMCUDescription(
    addr: number,
    portAddr: number,
    distributeAddr: number
  ): Promise<Buffer> {
    const req = new Request(
      AddressMapping.Distribute_MCUDescriptionOccupancy,
      'Distribute_ReadDistributeMCUDescription'
    );
    req.destination = addr;
    req.deviceType = 3;
    req.port = portAddr;
    req.rcvIndex = distributeAddr;
    req.address = AddressMapping.Distribute_MCUDescriptionAddr;
    return (await this.connection.send(req)).data;
  }

  // #23368
  async Distribute_SetDistributeMCUDescription(
    addr: number,
    portAddr: number,
    distributeAddr: number,
    bBroadcast: boolean,
    mcuDescription: number[] | Buffer
  ): Promise<void> {
    if (mcuDescription.length !== AddressMapping.Distribute_MCUDescriptionOccupancy)
      throw new TypeError(`Invalid buffer size: ${mcuDescription.length}`);
    const req = new Request(mcuDescription, bBroadcast, 'Distribute_SetDistributeMCUDescription');
    req.destination = addr;
    req.deviceType = 3;
    req.port = portAddr;
    req.rcvIndex = distributeAddr;
    req.address = AddressMapping.Distribute_MCUDescriptionAddr;
    await this.connection.send(req);
  }

  // #23406
  async Distribute_SetRebootBootFpgaProgram(
    addr: number,
    portAddr: number,
    distributeAddr: number,
    bBroadcast: boolean,
    funcCardModle: number
  ): Promise<void> {
    const $data = encodeUIntLE(
      funcCardModle,
      AddressMapping.Distribute_RebootBootFpgaProgramOccupancy
    );
    const req = new Request($data, bBroadcast, 'Distribute_SetRebootBootFpgaProgram');
    req.destination = addr;
    req.deviceType = 3;
    req.port = portAddr;
    req.rcvIndex = distributeAddr;
    req.address = AddressMapping.Distribute_RebootBootFpgaProgramAddr;
    await this.connection.send(req);
  }

  // #23416
  async Distribute_SetRebootAppFpgaProgram(
    addr: number,
    portAddr: number,
    distributeAddr: number,
    bBroadcast: boolean,
    distributeModle: number
  ): Promise<void> {
    const $data = encodeUIntLE(
      distributeModle,
      AddressMapping.Distribute_RebootAppFpgaProgramOccupancy
    );
    const req = new Request($data, bBroadcast, 'Distribute_SetRebootAppFpgaProgram');
    req.destination = addr;
    req.deviceType = 3;
    req.port = portAddr;
    req.rcvIndex = distributeAddr;
    req.address = AddressMapping.Distribute_RebootAppFpgaProgramAddr;
    await this.connection.send(req);
  }

  // #23426
  async Distribute_SetStoreFpgaBootProgram(
    addr: number,
    portAddr: number,
    distributeAddr: number,
    bBroadcast: boolean,
    funcCardModle: number
  ): Promise<void> {
    const $data = encodeUIntLE(
      funcCardModle,
      AddressMapping.Distribute_StoreFpgaBootProgramOccupancy
    );
    const req = new Request($data, bBroadcast, 'Distribute_SetStoreFpgaBootProgram');
    req.destination = addr;
    req.deviceType = 3;
    req.port = portAddr;
    req.rcvIndex = distributeAddr;
    req.address = AddressMapping.Distribute_StoreFpgaBootProgramAddr;
    await this.connection.send(req);
  }

  // #23436
  async Distribute_SetStoreFpgaAppProgram(
    addr: number,
    portAddr: number,
    distributeAddr: number,
    bBroadcast: boolean,
    distributeModle: number
  ): Promise<void> {
    const $data = encodeUIntLE(
      distributeModle,
      AddressMapping.Distribute_StoreFpgaAppProgramOccupancy
    );
    const req = new Request($data, bBroadcast, 'Distribute_SetStoreFpgaAppProgram');
    req.destination = addr;
    req.deviceType = 3;
    req.port = portAddr;
    req.rcvIndex = distributeAddr;
    req.address = AddressMapping.Distribute_StoreFpgaAppProgramAddr;
    await this.connection.send(req);
  }

  // #23446
  async ReadDistributeEthernetPortScannerX(
    addr: number,
    portAddr: number,
    distributeAddr: number,
    portIndex: number,
    scannerIndex: number
  ): Promise<number> {
    const req = new Request(
      AddressMapping.DistributeEthernetPortScannerXOccupancy,
      'ReadDistributeEthernetPortScannerX'
    );
    req.destination = addr;
    req.deviceType = 3;
    req.port = portAddr;
    req.rcvIndex = distributeAddr;
    req.address =
      AddressMapping.DistributeEthernetPortOccupancy * portIndex +
      AddressMapping.DistributeEthernetPortScannerXAddr +
      (AddressMapping.DistributeEthernetPortScannerXOccupancy +
        AddressMapping.DistributeEthernetPortScannerYOccupancy) *
        scannerIndex +
      AddressMapping.DistributeEthernetPortScannerXOccupancy;
    return decodeUIntLE(await this.connection.send(req));
  }

  // #23470
  async SetDistributeEthernetPortScannerX(
    addr: number,
    portAddr: number,
    distributeAddr: number,
    bBroadcast: boolean,
    ethernetPortScannerX: number,
    portIndex: number,
    scannerIndex: number
  ): Promise<void> {
    const $data = encodeUIntLE(
      ethernetPortScannerX,
      AddressMapping.DistributeEthernetPortScannerXOccupancy
    );
    const req = new Request($data, bBroadcast, 'SetDistributeEthernetPortScannerX');
    req.destination = addr;
    req.deviceType = 3;
    req.port = portAddr;
    req.rcvIndex = distributeAddr;
    req.address =
      AddressMapping.DistributeEthernetPortOccupancy * portIndex +
      AddressMapping.DistributeEthernetPortScannerXAddr +
      (AddressMapping.DistributeEthernetPortScannerXOccupancy +
        AddressMapping.DistributeEthernetPortScannerYOccupancy) *
        scannerIndex +
      AddressMapping.DistributeEthernetPortScannerXOccupancy;
    await this.connection.send(req);
  }

  // #23480
  async ReadDistributeEthernetPortScannerY(
    addr: number,
    portAddr: number,
    distributeAddr: number,
    portIndex: number,
    scannerIndex: number
  ): Promise<number> {
    const req = new Request(
      AddressMapping.DistributeEthernetPortScannerYOccupancy,
      'ReadDistributeEthernetPortScannerY'
    );
    req.destination = addr;
    req.deviceType = 3;
    req.port = portAddr;
    req.rcvIndex = distributeAddr;
    req.address =
      AddressMapping.DistributeEthernetPortOccupancy * portIndex +
      AddressMapping.DistributeEthernetPortScannerYAddr +
      AddressMapping.DistributeEthernetPortScannerYOccupancy +
      (AddressMapping.DistributeEthernetPortScannerXOccupancy +
        AddressMapping.DistributeEthernetPortScannerYOccupancy) *
        scannerIndex;
    return decodeUIntLE(await this.connection.send(req));
  }

  // #23504
  async SetDistributeEthernetPortScannerY(
    addr: number,
    portAddr: number,
    distributeAddr: number,
    bBroadcast: boolean,
    ethernetPortScannerY: number,
    portIndex: number,
    scannerIndex: number
  ): Promise<void> {
    const $data = encodeUIntLE(
      ethernetPortScannerY,
      AddressMapping.DistributeEthernetPortScannerYOccupancy
    );
    const req = new Request($data, bBroadcast, 'SetDistributeEthernetPortScannerY');
    req.destination = addr;
    req.deviceType = 3;
    req.port = portAddr;
    req.rcvIndex = distributeAddr;
    req.address =
      AddressMapping.DistributeEthernetPortOccupancy * portIndex +
      AddressMapping.DistributeEthernetPortScannerYAddr +
      AddressMapping.DistributeEthernetPortScannerYOccupancy +
      (AddressMapping.DistributeEthernetPortScannerXOccupancy +
        AddressMapping.DistributeEthernetPortScannerYOccupancy) *
        scannerIndex;
    await this.connection.send(req);
  }

  // #23514
  async ReadDistributeEthernetPortScannerXY(
    addr: number,
    portAddr: number,
    distributeAddr: number,
    portIndex: number,
    scannerIndex: number
  ): Promise<Buffer> {
    const req = new Request(
      AddressMapping.DistributeEthernetPortScannerXOccupancy +
        AddressMapping.DistributeEthernetPortScannerYOccupancy,
      'ReadDistributeEthernetPortScannerXY'
    );
    req.destination = addr;
    req.deviceType = 3;
    req.port = portAddr;
    req.rcvIndex = distributeAddr;
    req.address =
      AddressMapping.DistributeEthernetPortOccupancy * portIndex +
      AddressMapping.DistributeEthernetPortScannerXAddr +
      (AddressMapping.DistributeEthernetPortScannerXOccupancy +
        AddressMapping.DistributeEthernetPortScannerYOccupancy) *
        scannerIndex;
    return (await this.connection.send(req)).data;
  }

  // #23541
  async SetDistributeEthernetPortScannerXY(
    addr: number,
    portAddr: number,
    distributeAddr: number,
    bBroadcast: boolean,
    ethernetPortScannerX: number,
    ethernetPortScannerY: number,
    portIndex: number,
    scannerIndex: number
  ): Promise<void> {
    const $data = encodeUIntLE(
      (ethernetPortScannerX << 16) + ethernetPortScannerY,
      AddressMapping.DistributeEthernetPortScannerXOccupancy +
        AddressMapping.DistributeEthernetPortScannerYOccupancy
    );
    const req = new Request($data, bBroadcast, 'SetDistributeEthernetPortScannerXY');
    req.destination = addr;
    req.deviceType = 3;
    req.port = portAddr;
    req.rcvIndex = distributeAddr;
    req.address =
      AddressMapping.DistributeEthernetPortOccupancy * portIndex +
      AddressMapping.DistributeEthernetPortScannerXAddr +
      (AddressMapping.DistributeEthernetPortScannerXOccupancy +
        AddressMapping.DistributeEthernetPortScannerYOccupancy) *
        scannerIndex;
    await this.connection.send(req);
  }

  // #23588
  async ReadDistributeNumberOfCardOrScanBoardInPort(
    addr: number,
    portAddr: number,
    distributeAddr: number,
    portIndex: number,
    cardType: CardTypeEnum
  ): Promise<number> {
    const req = new Request(
      AddressMapping.DistributeNumberOfCardOrBoardInPortOccupancy,
      'ReadDistributeNumberOfCardOrScanBoardInPort'
    );
    req.destination = addr;
    req.deviceType = 3;
    req.port = portAddr;
    req.rcvIndex = distributeAddr;
    req.address = 0;
    if (portIndex > 3) {
      req.address =
        AddressMapping.DistributeNumberOfCardOrBoardInPortAddr +
        AddressMapping.DistributePortAddr +
        portIndex * AddressMapping.DistributeNumOfCardAndBoardInPortOccupancy +
        cardType * AddressMapping.DistributeNumberOfCardOrBoardInPortOccupancy;
    } else {
      req.address =
        AddressMapping.DistributeNumberOfCardOrBoardInPortAddr +
        portIndex * AddressMapping.DistributeNumOfCardAndBoardInPortOccupancy +
        cardType * AddressMapping.DistributeNumberOfCardOrBoardInPortOccupancy;
    }
    return decodeUIntLE(await this.connection.send(req));
  }

  // #23631
  async SetDistributeNumberOfCardOrScanBoardInPort(
    addr: number,
    portAddr: number,
    distributeAddr: number,
    bBroadcast: boolean,
    number: number,
    portIndex: number,
    cardType: CardTypeEnum
  ): Promise<void> {
    const $data = encodeUIntLE(number, AddressMapping.DistributeNumberOfCardOrBoardInPortOccupancy);
    const req = new Request($data, bBroadcast, 'SetDistributeNumberOfCardOrScanBoardInPort');
    req.destination = addr;
    req.deviceType = 3;
    req.port = portAddr;
    req.rcvIndex = distributeAddr;
    req.address = 0;
    if (portIndex > 3) {
      req.address =
        AddressMapping.DistributeNumberOfCardOrBoardInPortAddr +
        AddressMapping.DistributePortAddr +
        portIndex * AddressMapping.DistributeNumOfCardAndBoardInPortOccupancy +
        cardType * AddressMapping.DistributeNumberOfCardOrBoardInPortOccupancy;
    } else {
      req.address =
        AddressMapping.DistributeNumberOfCardOrBoardInPortAddr +
        portIndex * AddressMapping.DistributeNumOfCardAndBoardInPortOccupancy +
        cardType * AddressMapping.DistributeNumberOfCardOrBoardInPortOccupancy;
    }
    await this.connection.send(req);
  }

  WriteGroupSwapInfo = (): void => {
    throw new TypeError('Not implemented');
  };

  // #23943
  async ReadGroupSwapInfo_1(
    addr: number,
    portAddr: number,
    scanBoardAddr: number,
    readLength: number
  ): Promise<Buffer> {
    const req = new Request(readLength, 'ReadGroupSwapInfo_1');
    req.destination = addr;
    req.deviceType = 1;
    req.port = portAddr;
    req.rcvIndex = scanBoardAddr;
    req.address = AddressMapping.GroupSwapInfoAndEnAddr;
    return (await this.connection.send(req)).data;
  }

  WriteMonitorDataSwapInfo = (): void => {
    throw new TypeError('Not implemented');
  };

  // #24000
  async ReadMonitorDataSwapInfo(
    addr: number,
    portAddr: number,
    scanBoardAddr: number,
    readLength: number
  ): Promise<Buffer> {
    const req = new Request(readLength, 'ReadMonitorDataSwapInfo');
    req.destination = addr;
    req.deviceType = 1;
    req.port = portAddr;
    req.rcvIndex = scanBoardAddr;
    req.address = AddressMapping.MonitorGroupSwapInfoAndEnAddr;
    return (await this.connection.send(req)).data;
  }

  // #24009
  async WriteFirstGroupRegistorGain(
    addr: number,
    portAddr: number,
    scanBoardAddr: number,
    bBroadcast: boolean,
    data: number[] | Buffer
  ): Promise<void> {
    if (data.length !== AddressMapping.FirstGroupRegistorGainOccupancy)
      throw new TypeError(`Invalid buffer size: ${data.length}`);
    const req = new Request(data, bBroadcast, 'WriteFirstGroupRegistorGain');
    req.destination = addr;
    req.deviceType = 1;
    req.port = portAddr;
    req.rcvIndex = scanBoardAddr;
    req.address = AddressMapping.FirstGroupRegistorGainAddr;
    await this.connection.send(req);
  }

  // #24018
  async WriteSecondGroupRegistorGain(
    addr: number,
    portAddr: number,
    scanBoardAddr: number,
    bBroadcast: boolean,
    data: number[] | Buffer
  ): Promise<void> {
    if (data.length !== AddressMapping.SecondGroupRegistorGainOccupancy)
      throw new TypeError(`Invalid buffer size: ${data.length}`);
    const req = new Request(data, bBroadcast, 'WriteSecondGroupRegistorGain');
    req.destination = addr;
    req.deviceType = 1;
    req.port = portAddr;
    req.rcvIndex = scanBoardAddr;
    req.address = AddressMapping.SecondGroupRegistorGainAddr;
    await this.connection.send(req);
  }

  // #24027
  async WriteThirdGroupRegistorGain(
    addr: number,
    portAddr: number,
    scanBoardAddr: number,
    bBroadcast: boolean,
    data: number[] | Buffer
  ): Promise<void> {
    if (data.length !== AddressMapping.ThirdGroupRegistorGainOccupancy)
      throw new TypeError(`Invalid buffer size: ${data.length}`);
    const req = new Request(data, bBroadcast, 'WriteThirdGroupRegistorGain');
    req.destination = addr;
    req.deviceType = 1;
    req.port = portAddr;
    req.rcvIndex = scanBoardAddr;
    req.address = AddressMapping.ThirdGroupRegistorGainAddr;
    await this.connection.send(req);
  }

  // #24036
  async WriteFourthGroupRegistorGain(
    addr: number,
    portAddr: number,
    scanBoardAddr: number,
    bBroadcast: boolean,
    data: number[] | Buffer
  ): Promise<void> {
    if (data.length !== AddressMapping.FourthGroupRegistorGainOccupancy)
      throw new TypeError(`Invalid buffer size: ${data.length}`);
    const req = new Request(data, bBroadcast, 'WriteFourthGroupRegistorGain');
    req.destination = addr;
    req.deviceType = 1;
    req.port = portAddr;
    req.rcvIndex = scanBoardAddr;
    req.address = AddressMapping.FourthGroupRegistorGainAddr;
    await this.connection.send(req);
  }

  // #24045
  async WriteFifthGroupRegistorGain(
    addr: number,
    portAddr: number,
    scanBoardAddr: number,
    bBroadcast: boolean,
    data: number[] | Buffer
  ): Promise<void> {
    if (data.length !== AddressMapping.FifthGroupRegistorGainOccupancy)
      throw new TypeError(`Invalid buffer size: ${data.length}`);
    const req = new Request(data, bBroadcast, 'WriteFifthGroupRegistorGain');
    req.destination = addr;
    req.deviceType = 1;
    req.port = portAddr;
    req.rcvIndex = scanBoardAddr;
    req.address = AddressMapping.FifthGroupRegistorGainAddr;
    await this.connection.send(req);
  }

  // #24054
  async WriteSixthGroupRegistorGain(
    addr: number,
    portAddr: number,
    scanBoardAddr: number,
    bBroadcast: boolean,
    data: number[] | Buffer
  ): Promise<void> {
    if (data.length !== AddressMapping.SixthGroupRegistorGainOccupancy)
      throw new TypeError(`Invalid buffer size: ${data.length}`);
    const req = new Request(data, bBroadcast, 'WriteSixthGroupRegistorGain');
    req.destination = addr;
    req.deviceType = 1;
    req.port = portAddr;
    req.rcvIndex = scanBoardAddr;
    req.address = AddressMapping.SixthGroupRegistorGainAddr;
    await this.connection.send(req);
  }

  // #24063
  async WriteSeventhGroupRegistorGain(
    addr: number,
    portAddr: number,
    scanBoardAddr: number,
    bBroadcast: boolean,
    data: number[] | Buffer
  ): Promise<void> {
    if (data.length !== AddressMapping.SeventhGroupRegistorGainOccupancy)
      throw new TypeError(`Invalid buffer size: ${data.length}`);
    const req = new Request(data, bBroadcast, 'WriteSeventhGroupRegistorGain');
    req.destination = addr;
    req.deviceType = 1;
    req.port = portAddr;
    req.rcvIndex = scanBoardAddr;
    req.address = AddressMapping.SeventhGroupRegistorGainAddr;
    await this.connection.send(req);
  }

  // #24072
  async WriteFirstGroupRegistorRGBGain(
    addr: number,
    portAddr: number,
    scanBoardAddr: number,
    bBroadcast: boolean,
    data: number[] | Buffer
  ): Promise<void> {
    if (data.length !== AddressMapping.FirstGroupRegistorRGBGainOccupancy)
      throw new TypeError(`Invalid buffer size: ${data.length}`);
    const req = new Request(data, bBroadcast, 'WriteFirstGroupRegistorRGBGain');
    req.destination = addr;
    req.deviceType = 1;
    req.port = portAddr;
    req.rcvIndex = scanBoardAddr;
    req.address = AddressMapping.FirstGroupRegistorGainAddr;
    await this.connection.send(req);
  }

  // #24081
  async WriteSecGroupRegistorRGBGain(
    addr: number,
    portAddr: number,
    scanBoardAddr: number,
    bBroadcast: boolean,
    data: number[] | Buffer
  ): Promise<void> {
    if (data.length !== AddressMapping.SecondGroupRegistorRGBGainOccupancy)
      throw new TypeError(`Invalid buffer size: ${data.length}`);
    const req = new Request(data, bBroadcast, 'WriteSecGroupRegistorRGBGain');
    req.destination = addr;
    req.deviceType = 1;
    req.port = portAddr;
    req.rcvIndex = scanBoardAddr;
    req.address = AddressMapping.SecondGroupRegistorGainAddr;
    await this.connection.send(req);
  }

  // #24090
  async WriteRotateAngleInfo(
    addr: number,
    portAddr: number,
    scanBoardAddr: number,
    bBroadcast: boolean,
    data: number[] | Buffer
  ): Promise<void> {
    if (data.length !== AddressMapping.RotateAngleOccupancy)
      throw new TypeError(`Invalid buffer size: ${data.length}`);
    const req = new Request(data, bBroadcast, 'WriteRotateAngleInfo');
    req.destination = addr;
    req.deviceType = 1;
    req.port = portAddr;
    req.rcvIndex = scanBoardAddr;
    req.address = AddressMapping.RotateAngleAddr;
    await this.connection.send(req);
  }

  // #24112
  async ReadRotateAngle(addr: number, portAddr: number, scanBoardAddr: number): Promise<number> {
    const req = new Request(AddressMapping.RotateAngleOccupancy, 'ReadRotateAngle');
    req.destination = addr;
    req.deviceType = 1;
    req.port = portAddr;
    req.rcvIndex = scanBoardAddr;
    req.address = AddressMapping.RotateAngleAddr;
    return decodeUIntLE(await this.connection.send(req));
  }

  // #24121
  async WriteCabinetInfo(
    addr: number,
    portAddr: number,
    scanBoardAddr: number,
    bBroadcast: boolean,
    data: number[] | Buffer
  ): Promise<void> {
    if (data.length !== AddressMapping.CabinetOccupancy)
      throw new TypeError(`Invalid buffer size: ${data.length}`);
    const req = new Request(data, bBroadcast, 'WriteCabinetInfo');
    req.destination = addr;
    req.deviceType = 1;
    req.port = portAddr;
    req.rcvIndex = scanBoardAddr;
    req.address = AddressMapping.CabinetAddr;
    await this.connection.send(req);
  }

  // #24141
  async ReadCabinetInfo(addr: number, portAddr: number, scanBoardAddr: number): Promise<Buffer> {
    const req = new Request(AddressMapping.CabinetOccupancy, 'ReadCabinetInfo');
    req.destination = addr;
    req.deviceType = 1;
    req.port = portAddr;
    req.rcvIndex = scanBoardAddr;
    req.address = AddressMapping.CabinetAddr;
    return (await this.connection.send(req)).data;
  }

  // #24150
  async WriteSaveCabinetInfo(
    addr: number,
    portAddr: number,
    scanBoardAddr: number,
    bBroadcast: boolean,
    data: number[] | Buffer
  ): Promise<void> {
    if (data.length !== AddressMapping.FlashCabinetOccupancy)
      throw new TypeError(`Invalid buffer size: ${data.length}`);
    const req = new Request(data, bBroadcast, 'WriteSaveCabinetInfo');
    req.destination = addr;
    req.deviceType = 1;
    req.port = portAddr;
    req.rcvIndex = scanBoardAddr;
    req.address = AddressMapping.FlashCabinetAddr;
    await this.connection.send(req);
  }

  // #24159
  async WriteBrightPriorityMode(
    addr: number,
    portAddr: number,
    scanBoardAddr: number,
    bBroadcast: boolean,
    data: number[] | Buffer
  ): Promise<void> {
    if (data.length !== AddressMapping.BrightPriorityModeOccupancy)
      throw new TypeError(`Invalid buffer size: ${data.length}`);
    const req = new Request(data, bBroadcast, 'WriteBrightPriorityMode');
    req.destination = addr;
    req.deviceType = 1;
    req.port = portAddr;
    req.rcvIndex = scanBoardAddr;
    req.address = AddressMapping.BrightPriorityModeAddr;
    await this.connection.send(req);
  }

  // #24181
  async ReadBrightnessModel(
    addr: number,
    portAddr: number,
    scanBoardAddr: number
  ): Promise<number> {
    const req = new Request(AddressMapping.BrightnessModelOccupancy, 'ReadBrightnessModel');
    req.destination = addr;
    req.deviceType = 1;
    req.port = portAddr;
    req.rcvIndex = scanBoardAddr;
    req.address = AddressMapping.BrightnessModelAddr;
    return decodeUIntLE(await this.connection.send(req));
  }

  // #24201
  async SetBrightnessModel(
    addr: number,
    portAddr: number,
    scanBoardAddr: number,
    bBroadcast: boolean,
    brightnessmodel: number
  ): Promise<void> {
    const $data = encodeUIntLE(brightnessmodel, AddressMapping.BrightnessModelOccupancy);
    const req = new Request($data, bBroadcast, 'SetBrightnessModel');
    req.destination = addr;
    req.deviceType = 1;
    req.port = portAddr;
    req.rcvIndex = scanBoardAddr;
    req.address = AddressMapping.BrightnessModelAddr;
    await this.connection.send(req);
  }

  // #24211
  async ReadStandbyMode(addr: number, portAddr: number, scanBoardAddr: number): Promise<number> {
    const req = new Request(AddressMapping.StandbyModeOccupancy, 'ReadStandbyMode');
    req.destination = addr;
    req.deviceType = 1;
    req.port = portAddr;
    req.rcvIndex = scanBoardAddr;
    req.address = AddressMapping.StandbyModeAddr;
    return decodeUIntLE(await this.connection.send(req));
  }

  // #24240
  async SetStandbyMode(
    addr: number,
    portAddr: number,
    scanBoardAddr: number,
    bBroadcast: boolean,
    standbyMode: StandbyModeEnum
  ): Promise<void> {
    const req = new Request([standbyMode], bBroadcast, 'SetStandbyMode');
    req.destination = addr;
    req.deviceType = 1;
    req.port = portAddr;
    req.rcvIndex = scanBoardAddr;
    req.address = AddressMapping.StandbyModeAddr;
    await this.connection.send(req);
  }

  // #24250
  async ReadScannerFunctionInfo(
    addr: number,
    portAddr: number,
    scanBoardAddr: number
  ): Promise<Buffer> {
    const req = new Request(AddressMapping.ScanCardFunctionOccupancy, 'ReadScannerFunctionInfo');
    req.destination = addr;
    req.deviceType = 1;
    req.port = portAddr;
    req.rcvIndex = scanBoardAddr;
    req.address = AddressMapping.ScanCardFunctionAddr;
    return (await this.connection.send(req)).data;
  }

  // #24259
  async WriteLowCoef(
    addr: number,
    portAddr: number,
    scanBoardAddr: number,
    bBroadcast: boolean,
    data: number[] | Buffer
  ): Promise<void> {
    if (data.length !== AddressMapping.CoefAddrOccupancy)
      throw new TypeError(`Invalid buffer size: ${data.length}`);
    const req = new Request(data, bBroadcast, 'WriteLowCoef');
    req.destination = addr;
    req.deviceType = 1;
    req.port = portAddr;
    req.rcvIndex = scanBoardAddr;
    req.address = AddressMapping.CoefLowAddr;
    await this.connection.send(req);
  }

  // #24268
  async WriteHighCoef(
    addr: number,
    portAddr: number,
    scanBoardAddr: number,
    bBroadcast: boolean,
    data: number[] | Buffer
  ): Promise<void> {
    if (data.length !== AddressMapping.CoefAddrOccupancy)
      throw new TypeError(`Invalid buffer size: ${data.length}`);
    const req = new Request(data, bBroadcast, 'WriteHighCoef');
    req.destination = addr;
    req.deviceType = 1;
    req.port = portAddr;
    req.rcvIndex = scanBoardAddr;
    req.address = AddressMapping.CoefHighAddr;
    await this.connection.send(req);
  }

  // #24277
  async SetXbitGammaMode(
    addr: number,
    portAddr: number,
    scanBoardAddr: number,
    bBroadcast: boolean,
    data: number
  ): Promise<void> {
    const req = new Request([data], bBroadcast, 'SetXbitGammaMode');
    req.destination = addr;
    req.deviceType = 1;
    req.port = portAddr;
    req.rcvIndex = scanBoardAddr;
    req.address = AddressMapping.XbitGammaModeAddr;
    await this.connection.send(req);
  }

  SendFunctionToHW = (): void => {
    throw new TypeError('Not implemented');
  };

  SaveFunctionToHW = (): void => {
    throw new TypeError('Not implemented');
  };

  // #24536
  async ReadScanerCountOfSenderCard(addr: number): Promise<Buffer> {
    const req = new Request(
      AddressMapping.ScanCardCountOfSenderOccupancy,
      'ReadScanerCountOfSenderCard'
    );
    req.destination = addr;
    req.address = AddressMapping.ReadScanCardCountOfSenderAddr;
    return (await this.connection.send(req)).data;
  }

  // #24546
  async WriteSenderCardToGetScanerCount(
    addr: number,
    portAddr: number,
    scanBoardAddr: number,
    bBroadcast: boolean
  ): Promise<void> {
    const req = new Request([1], bBroadcast, 'WriteSenderCardToGetScanerCount');
    req.destination = addr;
    req.port = portAddr;
    req.rcvIndex = scanBoardAddr;
    req.address = AddressMapping.ScanCardCountOfSenderAddr;
    await this.connection.send(req);
  }
}
