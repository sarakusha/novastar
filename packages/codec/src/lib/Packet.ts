// noinspection JSUnusedGlobalSymbols

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

export const Packet = new Struct('Packet')
  .UInt16LE('head', typed<typeof REQUEST | typeof RESPONSE>())
  .UInt8('ack', typed<ErrorType>())
  .UInt8(['serialNumber', 'serno'])
  .UInt8(['sourceAddress', 'source'])
  .UInt8(['destinationAddress', 'destination'])
  .UInt8('deviceType', typed<DeviceType>())
  .UInt8(['portAddress', 'port'])
  .UInt16LE(['boardAddress', 'rcvIndex'])
  .UInt8(['code', 'io'], typed<IO>())
  .seek(1)
  .UInt32LE(['registerUnitAddress', 'address'])
  .UInt16LE('length')
  .Buffer('data')
  .CRC16LE('crc')
  .compile();

export type Packet = ExtractType<typeof Packet>;

export const getCrc = (raw: Buffer): number =>
  raw.slice(2, -2).reduce((crc, val) => crc + val, 0x5555);
