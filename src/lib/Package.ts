// noinspection JSUnusedGlobalSymbols

// eslint-disable-next-line import/no-extraneous-dependencies
import Struct, { ExtractType, typed } from 'typed-struct';

export enum DeviceType {
  SendingCard,
  ReceivingCard,
  FunctionCard,
}

export enum IO {
  Read,
  Write,
}

export enum ErrorType {
  Succeeded,
  Timeout,
  RequestError,
  AcknowledgeError,
  InvalidCommand,
}

export enum DisplayMode {
  Video,
  Red = 2,
  Green,
  Blue,
  White,
  HorizonLine,
  VerticalLine,
  InclineLine,
  Grayscale,
  Loop,
}

export enum Calibration {
  Color,
  Brightness,
}

export const REQUEST = 0xaa55;

export const RESPONSE = 0x55aa;

export const COMPUTER = 0xfe;

// noinspection TypeScriptValidateJSTypes
const packageStruct = new Struct('Package')
  .UInt16LE('head', typed<typeof REQUEST | typeof RESPONSE>())
  .UInt8('ack', typed<ErrorType>())
  .UInt8(['serialNumber', 'serno'])
  .UInt8(['sourceAddress', 'source'])
  .UInt8(['destinationAddress', 'destination'])
  .UInt8('deviceType', typed<DeviceType>())
  .UInt8(['portAddress', 'port'])
  .UInt16LE(['boardAddress', 'rcvIndex'])
  .UInt8(['code', 'io'], typed<IO>())
  .skip(1)
  .UInt32LE(['registerUnitAddress', 'address'])
  .UInt16LE('length')
  .Buffer('data', -2)
  .CRC16LE('crc');

export const lengthOffset = packageStruct.getOffsetOf('length');

export const [Package, PACKAGE_SIZE] = packageStruct.compile();

export type Package = ExtractType<typeof Package>;

export const getCrc = (raw: Buffer): number =>
  raw.slice(2, -2).reduce((crc, val) => crc + val, 0x5555);
