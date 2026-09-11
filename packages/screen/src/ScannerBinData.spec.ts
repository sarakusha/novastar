// cspell:ignore RCCB
import { decodeScannerBinData, ScannerBinData } from './ScannerBinData';
import { crc16 } from './common';

describe('decodeScannerBinData', () => {
  it('uses the payload length rather than the complete record size', () => {
    const record = Buffer.alloc(35);
    record.writeUInt32LE(record.length, 0);
    record.writeUInt16LE(1, 4);
    record.writeUInt32LE(0x0200_0100, 6);
    record.writeUInt32LE(3, 10);
    record.writeUInt16LE(50, 14);
    record.writeUInt16LE(1_000, 16);
    record.writeUInt16LE(25, 18);
    Buffer.from([1, 2, 3]).copy(record, 32);
    const binary = Buffer.alloc(ScannerBinData.baseSize + record.length);
    binary.write('RCCB');
    binary.writeUInt32LE(binary.length, 4);
    binary.writeUInt16LE(1001, 10);
    record.copy(binary, ScannerBinData.baseSize);
    binary.writeUInt16LE(crc16(record, 0x5555), 8);

    expect(decodeScannerBinData(binary)).toEqual([
      expect.objectContaining({
        address: 0x0200_0100,
        data: Buffer.from([1, 2, 3]),
        delay: 50,
        pollingTime: 1_000,
        pollingWaitTime: 25,
      }),
    ]);
  });
});
