import { Buffer } from 'buffer';

export * from './lib/Packet';
export { default as Request } from './lib/Request';
export * from './lib/Session';
export { default as Connection } from './lib/Connection';
export type { ConnectionEvents } from './lib/Connection';
export { default as ResponseError } from './lib/ResponseError';
export { default as TimeoutError } from './lib/TimeoutError';
export { default as ConnectionClosedError } from './lib/ConnectionClosedError';
export * from './lib/helper';

/**
 * Converts a `data` property of type `Buffer` of length 1, 2, or 4 bytes to an unsigned integer.
 * @param {{data: Buffer}} data - @see Packet
 * @returns {number}
 */
export const decodeUIntLE = ({ data }: { data: Buffer }): number => {
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
 * @param value
 * @param size
 */
export const encodeUIntLE = (value: number, size: 1 | 2 | 4): Buffer => {
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
