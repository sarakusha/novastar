import Zip from 'adm-zip';

import { decodeNcpConfig, decodeReceivingCardFirmware, inspectNcpConfig } from './NcpConfig';

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
});
