import Zip from 'adm-zip';

import { decodeNcpConfig, inspectNcpConfig } from './NcpConfig';

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
});
