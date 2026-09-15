import Zip from 'adm-zip';
import { Uint8ArrayReader, Uint8ArrayWriter, ZipWriter } from '@zip.js/zip.js';

import {
  decodeNcpConfig,
  decodeReceivingCardFirmware,
  inspectNcpConfig,
  rewriteNcpDataGroupOrder,
} from './NcpConfig';
import { getNcpDataGroupMapping } from './NcpDataGroupMapping';
import { crc16 } from './common';

const encryptedZip = async (
  files: ReadonlyMap<string, Buffer>,
  password?: string,
): Promise<Buffer> => {
  const output = new Uint8ArrayWriter();
  const writer = new ZipWriter(output);
  for (const [filename, data] of files) {
    await writer.add(
      filename,
      new Uint8ArrayReader(data),
      password ? { password, encryptionStrength: 3 } : undefined,
    );
  }
  return Buffer.from(await writer.close());
};

const scannerRecord = (address: number, values: readonly number[]): Buffer => {
  const data = Buffer.from(values);
  const record = Buffer.alloc(32 + data.length);
  record.writeUInt32LE(record.length, 0);
  record.writeUInt16LE(1, 4);
  record.writeUInt32LE(address, 6);
  record.writeUInt32LE(data.length, 10);
  data.copy(record, 32);
  return record;
};

const pointTable = (values: readonly number[]): Buffer => {
  const data = Buffer.alloc(values.length * 4);
  values.forEach((value, index) => data.writeUInt32LE(value, index * 4));
  return data;
};

const scannerBinary = (mapping: readonly number[]): Buffer => {
  const scanBoardData = Buffer.alloc(252);
  scanBoardData[251] = 0x10;
  const records = Buffer.concat([
    scannerRecord(0x0200_0000, scanBoardData),
    scannerRecord(0x0400_0000, pointTable([10, 11, 12, 13, 14])),
    scannerRecord(0x2800_0000, mapping),
  ]);
  const binary = Buffer.alloc(64 + records.length);
  binary.write('RCCB', 0, 'ascii');
  binary.writeUInt32LE(binary.length, 4);
  binary.writeUInt16LE(1001, 10);
  records.copy(binary, 64);
  binary.writeUInt16LE(crc16(records, 0x5555), 8);
  return binary;
};

const ncpArchive = async (): Promise<Buffer> => {
  const cfg = await encryptedZip(
    new Map([
      [
        'config.json',
        Buffer.from(
          JSON.stringify({
            baseInfo: { cardModel: 'A10s Pro' },
            files: [{ fileName: 'cabinet.bin' }],
          }),
        ),
      ],
      ['cabinet.bin', scannerBinary([0, 1, 0xff, 2, 3])],
      ['untouched.txt', Buffer.from('keep me')],
    ]),
  );
  const payload = await encryptedZip(
    new Map([
      [
        'manifest.json',
        Buffer.from(
          JSON.stringify({
            formatVersion: 2,
            cabinetPackage: {
              description: { packName: 'fixture' },
              cabinets: [{ name: 'cabinet', cfgName: 'cabinet.cfg' }],
            },
          }),
        ),
      ],
      ['cabinet.cfg', cfg],
      ['package-untouched.txt', Buffer.from('keep me too')],
    ]),
    '*^Tm!{>6v8=&',
  );
  return encryptedZip(new Map([['package', payload]]), 'N0@|,[)9.$eP');
};

const firmwareArchive = (): Buffer => {
  const zip = new Zip();
  zip.addFile(
    'Config.xml',
    Buffer.from(`<?xml version="1.0"?>
      <DataPackage>
        <DeviceTypes>Scanner</DeviceTypes>
        <ModuleID>18434</ModuleID>
        <Version>1.3.16.114</Version>
        <FileInfo>
          <FileLabel>MCU</FileLabel><Version>1.3.10.72</Version>
          <Remark>MCU build</Remark><FileName>mcu.dat</FileName>
        </FileInfo>
        <FileInfo>
          <FileLabel>FPGA</FileLabel><Version>1.3.10.72</Version>
          <Remark>FPGA build</Remark><FileName>fpga.dat</FileName>
        </FileInfo>
      </DataPackage>`),
  );
  zip.addFile('Data_A10s.ini', Buffer.from('{"BasicInfo":{"Type":"A10s Pro"}}'));
  zip.addFile('mcu.dat', Buffer.from('mcu'));
  zip.addFile('fpga.dat', Buffer.from('fpga'));
  return zip.toBuffer();
};

describe('public NovaLCT configuration API', () => {
  it('inspects an opaque NCP container without decoding its payload', () => {
    const zip = new Zip();
    zip.addFile('package', Buffer.from('opaque payload'));

    expect(inspectNcpConfig(zip.toBuffer())).toMatchObject({
      packageName: 'package',
      packageSize: 14,
      encrypted: false,
    });
  });

  it('rejects invalid NCP data', () => {
    expect(() => inspectNcpConfig(Buffer.from('not an ncp'))).toThrow();
  });

  it('rejects an NCP container whose payload is not an archive', async () => {
    const zip = new Zip();
    zip.addFile('package', Buffer.from('opaque payload'));

    await expect(decodeNcpConfig(zip.toBuffer())).rejects.toThrow();
  });

  it('decodes receiving-card firmware metadata and verifies its files', async () => {
    await expect(decodeReceivingCardFirmware(firmwareArchive(), 'Data_A10s.zip')).resolves.toEqual({
      filename: 'Data_A10s.zip',
      version: '1.3.16.114',
      model: 'A10s Pro',
      modelId: 18434,
      files: [
        {
          label: 'MCU',
          filename: 'mcu.dat',
          version: '1.3.10.72',
          remark: 'MCU build',
        },
        {
          label: 'FPGA',
          filename: 'fpga.dat',
          version: '1.3.10.72',
          remark: 'FPGA build',
        },
      ],
    });
  });

  it('rewrites a DATA group order into a new encrypted, decodable NCP', async () => {
    const source = await ncpArchive();
    const rewritten = await rewriteNcpDataGroupOrder(source, 0, [1, 0]);

    expect(rewritten).not.toEqual(source);
    expect(inspectNcpConfig(rewritten).encrypted).toBe(true);
    const decoded = await decodeNcpConfig(rewritten);
    expect(getNcpDataGroupMapping(decoded.cabinets[0])?.blocks).toMatchObject([
      { physicalStart: 0, logicalGroups: [2, 3] },
      { physicalStart: 3, logicalGroups: [0, 1] },
    ]);
    expect(
      decoded.cabinets[0].parameters.find(({ address }) => address === 0x0400_0000)?.data,
    ).toEqual(pointTable([13, 14, 12, 10, 11]));
  });
});
