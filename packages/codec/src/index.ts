import { Buffer } from 'buffer';
import { Packet } from './Packet';

export * from './Packet';
export { default as Request } from './Request';
export * from './Session';
export { default as Connection } from './Connection';
export type { ConnectionEvents } from './Connection';
export { default as ResponseError } from './ResponseError';
export { default as TimeoutError } from './TimeoutError';
export { default as ConnectionClosedError } from './ConnectionClosedError';
export * from './helper';

/**
 * Converts a `data` property of type `Buffer` of length 1, 2, or 4 bytes to an unsigned integer.
 * @param data - Buffer 1, 2 or 4 bytes long to convert
 */
export const decodeUIntLE = ({ data }: Packet): number => {
  switch (data.length) {
    case 1:
      return data.readUInt8();
    case 2:
      return data.readUInt16LE();
    case 4:
      return data.readUInt32LE();
    default:
      throw new TypeError(`Invalid buffer length: ${data.length}`);
  }
};

/**
 * Stores a non-negative number in a buffer of the specified length
 * @param value - Non-negative integer
 * @param size - Buffer size (1, 2, 4 bytes)
 */
export const encodeUIntLE = (value: number, size: number): Buffer => {
  const buffer = Buffer.alloc(size);
  switch (size) {
    case 1:
      buffer.writeUInt8(value);
      break;
    case 2:
      buffer.writeUInt16LE(value);
      break;
    case 4:
      buffer.writeUInt32LE(value);
      break;
    default:
      throw new TypeError(`Invalid buffer size: ${size}`);
  }
  return buffer;
};
