import Struct, { ExtractType } from 'typed-struct';

import { ScanBdRecordNoSendParams, SendParam } from './ScanBdRecordNoSendParams';
import { crc } from './common';
import findKnownAddresses from './findKnownAddresses';

export const ScannerBinDataFlag = 'RCCB';

/**
 * RCCB
 */
export const ScannerBinData = new Struct('ScannerBinData')
  .String('header', 'ascii', ScannerBinDataFlag.length)
  .UInt32LE('length')
  .UInt16LE('crc')
  .UInt16LE('version', 1001)
  .seek(52)
  .Buffer('data')
  .compile();

export type ScannerBinData = ExtractType<typeof ScannerBinData, false>;

export const decodeScannerBinData = (buffer: Buffer): SendParam[] => {
  const { header, crc: binCrc, length, data } = new ScannerBinData(buffer);
  if (header !== ScannerBinDataFlag) throw new Error('Invalid ScannerBinData header');
  if (length !== buffer.length) throw new Error('Invalid ScannerBinData length');
  if (crc(data, 0x5555) !== binCrc) throw new Error('Invalid ScannerBinData CRC');
  const params: SendParam[] = [];
  const dataLength = length - ScannerBinData.baseSize;
  for (let offset = 0; offset < dataLength; ) {
    const {
      address,
      data: paramData,
      delay,
      size,
    } = new ScanBdRecordNoSendParams(data.slice(offset));
    const name = findKnownAddresses(address);
    params.push({
      address,
      data: Buffer.from(paramData.slice(0, size)),
      delay,
      name,
    });
    offset += size;
  }
  return params;
};
