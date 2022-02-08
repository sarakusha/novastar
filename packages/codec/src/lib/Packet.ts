/* eslint-disable @typescript-eslint/no-empty-interface */
// noinspection JSUnusedGlobalSymbols

import Struct, { ExtractType, typed } from 'typed-struct';

/**
 * Destination device type
 */
export enum DeviceType {
  /**
   * Devices connected to the COM/USB port
   */
  SendingCard,
  ReceivingCard,
  FunctionCard,
}

/**
 * I/O operation type
 */
export enum IO {
  Read,
  Write,
}

/**
 * Operation result code
 */
export enum ErrorType {
  Succeeded,
  Timeout,
  RequestError,
  AcknowledgeError,
  InvalidCommand,
}

/*
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
*/

/**
 * Request header
 */
export const REQUEST = 0xaa55;

/**
 * Response header
 */
export const RESPONSE = 0x55aa;

/**
 * For a request, this is the source (sender) address; for a response, the destination address
 */
export const COMPUTER = 0xfe;

/**
 * @function Constructor for creating and processing binary packages used when communicating with novastar devices
 * @see {@link Packet}
 * @see {@link https://sarakusha.github.io/typed-struct/interfaces/StructConstructor.html}
 */
export const Packet = new Struct('Packet')
  .UInt16LE('head', typed<typeof REQUEST | typeof RESPONSE>())
  .UInt8('ack', typed<ErrorType>())
  .UInt8('serno')
  .UInt8('source')
  .UInt8('destination')
  .UInt8('deviceType', typed<DeviceType>())
  .UInt8('port')
  .UInt16LE('rcvIndex')
  .UInt8('io', typed<IO>())
  .seek(1)
  .UInt32LE('address')
  .UInt16LE('length')
  .Buffer('data')
  .CRC16LE('crc', {
    calc: raw => raw.reduce((crc, val) => (crc + val) % 0x10000, 0x5555),
    start: 2,
  })
  .compile();

/**
 * @typedef Packet
 * @property head - [REQUEST](#REQUEST) - for requests and [RESPONSE](#RESPONSE) for responses
 * @property ack - always `0` for request and result code for response
 * @property serno - sequential number of the request, and the corresponding response (set automatically)
 * @property source - source address, always [COMPUTER](#COMPUTER) for request
 * @property destination - destination address, usually `0` for request
 * @property deviceType - target device type
 * @property port - port number
 * @property rcvIndex - receiving card index
 * @property io - I/O operation type
 * @property address - register unit address
 * @property length - length of data requested when reading or length of data sent when writing
 * @property data - data sent on write or empty buffer on read
 * @property crc - cyclic redundancy check
 */
export interface Packet extends ExtractType<typeof Packet, false> {}

/**
 * [[Packet]] type guard
 * @param packet
 */
export function isPacket(packet: unknown): packet is Packet {
  return packet instanceof Packet;
}
