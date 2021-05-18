/* eslint-disable no-bitwise */
import { Duplex } from 'stream';

import Struct from 'typed-struct';

import Connection from './Connection';
import { Calibration, DeviceType, DisplayMode } from './Packet';
import Request from './Request';

const toByte = (value: number): number => Math.max(Math.min(value, 255), 0);

const toBytes = (...values: number[]): number[] => values.map(toByte);

export type BrightnessRGBV = {
  overall: number;
  red: number;
  green: number;
  blue: number;
  vRed: number;
};

const RedundantStatus = new Struct('RedundantStatus')
  .Bits8({ port1: [0, 2], port2: [2, 2], port3: [4, 2], port4: [6, 2] })
  .compile();

// noinspection JSUnusedGlobalSymbols
export default class Session<S extends Duplex> {
  constructor(readonly connection: Connection<S>) {}

  get isConnected(): boolean {
    return this.connection.isConnected;
  }

  close(): boolean {
    if (!this.connection.isConnected) return false;
    this.connection.close();
    return true;
  }

  private checkConnection() {
    if (!this.isConnected) throw new Error('Connection closed');
  }

  async hasDVISignalIn(): Promise<boolean> {
    this.checkConnection();
    const req = new Request(1);
    req.deviceType = DeviceType.SendingCard;
    req.address = 0x02000017;
    const {
      data: [value],
    } = await this.connection.send(req);
    return !!value;
  }

  async getBrightness(port = 0): Promise<number> {
    this.checkConnection();
    const req = new Request(1);
    req.deviceType = DeviceType.ReceivingCard;
    req.address = 0x02000001;
    req.port = port;
    const {
      data: [value],
    } = await this.connection.send(req);
    return value;
  }

  async getBrightnessRGBV(port = 0): Promise<BrightnessRGBV> {
    this.checkConnection();
    const req = new Request(5);
    req.deviceType = DeviceType.ReceivingCard;
    req.address = 0x02000001;
    req.port = port;
    const {
      data: [overall, red, green, blue, vRed],
    } = await this.connection.send(req);
    return { overall, red, green, blue, vRed };
  }

  async setBrightness(value: number, port = 0): Promise<number> {
    this.checkConnection();
    const brightness = toByte(value);
    const req = new Request([brightness], true);
    req.address = 0x02000001;
    req.deviceType = DeviceType.ReceivingCard;
    req.port = port;
    await this.connection.send(req);
    return brightness;
  }

  async setBrightnessRGBV(
    { overall, red = 255, green = 255, blue = 255, vRed = 255 }: BrightnessRGBV,
    port = 0
  ): Promise<number> {
    this.checkConnection();
    const data = toBytes(overall, red, green, blue, vRed);
    const req = new Request(data, true);
    req.address = 0x02000001;
    req.port = port;
    await this.connection.send(req);
    return data[0];
  }

  async resetSendingCardToFactory(): Promise<void> {
    this.checkConnection();
    const req = new Request([1]);
    req.deviceType = DeviceType.SendingCard;
    req.address = 0x01000002;
    await this.connection.send(req);
  }

  async setGammaValue(value: number, port = 0): Promise<number> {
    this.checkConnection();
    const gamma = (value * 10) & 0xff;
    const req = new Request([gamma], true);
    req.port = port;
    req.address = 0x02000000;
    await this.connection.send(req);
    return gamma;
  }

  async getGammaValue(port = 0): Promise<number> {
    this.checkConnection();
    const req = new Request(1);
    req.deviceType = DeviceType.ReceivingCard;
    req.address = 0x02000000;
    req.port = port;
    const {
      data: [value],
    } = await this.connection.send(req);
    return value / 10;
  }

  async getSendingCardVersion(): Promise<string> {
    this.checkConnection();
    const req = new Request(4);
    req.deviceType = DeviceType.SendingCard;
    req.address = 0x04100004;
    const { data } = await this.connection.send(req);
    return data.join('.');
  }

  async getModel(deviceType: DeviceType, port = 0, rcvIndex = 0): Promise<string> {
    this.checkConnection();
    const req = new Request(2);
    req.deviceType = deviceType;
    req.address = deviceType === DeviceType.ReceivingCard ? 0 : 2;
    req.port = port;
    req.rcvIndex = rcvIndex;
    const { data } = await this.connection.send(req);
    const value = data.readUInt16LE();
    const unknown = `Unknown ${DeviceType[deviceType]} (${value.toString(16).padStart(4, '0')}h)`;
    const deviceModel = (expectedType: DeviceType, model: string): string =>
      deviceType === expectedType ? model : unknown;
    switch (value) {
      case 0x0101:
        return deviceModel(DeviceType.SendingCard, 'MCTRL 500');
      case 0x0001:
        return deviceModel(DeviceType.SendingCard, 'MSD/MCTRL 300');
      case 0x1101:
        return deviceModel(DeviceType.SendingCard, 'MSD/MCTRL 600/610');
      case 0x8101:
        return deviceModel(DeviceType.FunctionCard, 'MFN 300');
      case 0x4101:
        return deviceModel(DeviceType.ReceivingCard, 'ReceivingCard');
      case 0x4510:
        return deviceModel(DeviceType.ReceivingCard, 'MRV 328');
      default:
        return unknown;
    }
  }

  async getAutobrightnessMode(): Promise<boolean> {
    this.checkConnection();
    const req = new Request(1);
    req.deviceType = DeviceType.SendingCard;
    req.address = 0x0a000000;
    const {
      data: [mode],
    } = await this.connection.send(req);
    return mode === 0x7d;
  }

  async setAutobrightnessMode(value = true): Promise<void> {
    this.checkConnection();
    const req = new Request([value ? 0x7d : 0xff]);
    req.deviceType = DeviceType.SendingCard;
    req.address = 0x0a000000;
    await this.connection.send(req);
  }

  async checkRedundantStatus(): Promise<
    readonly [port1: boolean, port2: boolean, port3: boolean, port4: boolean]
  > {
    this.checkConnection();
    const req = new Request(1);
    req.deviceType = DeviceType.SendingCard;
    req.address = 0x0200001e;
    const { data } = await this.connection.send(req);
    const { port1, port2, port3, port4 } = new RedundantStatus(data);
    return [port1 === 2, port2 === 2, port3 === 2, port4 === 2];
  }

  async setDisplayMode(mode: DisplayMode, port = 0): Promise<void> {
    this.checkConnection();
    const req = new Request([toByte(mode)], true);
    req.address = 0x02000101;
    req.port = port;
    await this.connection.send(req);
  }

  async getDisplayMode(port = 0, rcvIndex = 0): Promise<DisplayMode> {
    this.checkConnection();
    const req = new Request(1);
    req.deviceType = DeviceType.ReceivingCard;
    req.address = 0x02000101;
    req.port = port;
    req.rcvIndex = rcvIndex;
    const {
      data: [mode],
    } = await this.connection.send(req);
    return mode;
  }

  async getCalibrationMode(port = 0, rcvIndex = 0): Promise<{ isOn: boolean; type: Calibration }> {
    this.checkConnection();
    const req = new Request(1);
    req.deviceType = DeviceType.ReceivingCard;
    req.address = 0x02000051;
    req.port = port;
    req.rcvIndex = rcvIndex;
    const {
      data: [calibration],
    } = await this.connection.send(req);
    return { isOn: Boolean(calibration && 1), type: (calibration >>> 1) & 1 };
  }

  async setCalibrationMode(isOn: boolean, type = Calibration.Color, port = 0): Promise<void> {
    this.checkConnection();
    const req = new Request([(isOn ? 1 : 0) | ((type << 1) & 2)], true);
    req.address = 0x02000051;
    req.port = port;
    await this.connection.send(req);
  }

  async save(port = 0xff): Promise<void> {
    this.checkConnection();
    const req = new Request([0x11], true);
    req.address = 0x01000011;
    req.port = port;
    await this.connection.send(req);
  }
}
