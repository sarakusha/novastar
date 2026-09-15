import path from 'path';

import { compress, decompress } from '@sarakusha/lzma';

import { pack, unpack } from './common';
import { loadScanBoardConfig, loadScreenConfig, loadSystemConfig } from './configs';

describe('cfg', () => {
  it('SCFG', async () => {
    const pathname = path.resolve(__dirname, '../../../cfg/20210917.scfg');
    const config = await loadSystemConfig(pathname);
    expect(config.SacnBdProp.ConfigFileVersion).toBeDefined();
  });
  it('RCFG', async () => {
    const pathname = path.resolve(__dirname, '../../../cfg/Q8_ICND2153_40x40.rcfgx');
    const [cfg, params] = loadScanBoardConfig(pathname);
    expect(cfg.ConfigFileVersion).toBeDefined();
    expect(params.length).toBeGreaterThan(0);
  });
  it('SCR', () => {
    const pathname = path.resolve(__dirname, '../../../cfg/test.scr');
    const cfg = loadScreenConfig(pathname);
    expect(cfg.screens.length).toBeGreaterThan(0);
  });
  it('lzma', async () => {
    const test = Buffer.from('test');
    const [props, data] = await pack(test);
    expect(await unpack(props, test.length, data)).toBe(test.toString());
  });
  it('lzma1', async () => {
    const comp = Buffer.from(
      'XQAAAAGyAAAAAAAAAAA9iIZmU1QGVf8V9Mv+v+O8UymTDbCapeUd9rlC85hQex5rzjVoQImDsO/ZzvjM7WsM3c/oqt3BF6stB8FgqwQmIZZOAgz+yeM/IBrIMF+NG7FynSKTPIaTDG3tEvKP2t8dDdEUEyevx7XawjvaFRS35LYWSTrrZWJCHsPlHzUFGsciodlcSJSkJCL6T1YA',
      'base64',
    );
    const src =
      '{"SectionFormat":[{"FileType":"ScreenDataType","Addr":83894272,"SrcLength":2523,"DestLength":374,"CheckSum":3368,"Version":"1001","DecompressProps":"]\\u0000\\u0000\\u0000\\u0001"}]}';
    const [props, packed] = await pack(src);
    const lzma1 = await new Promise<Buffer>((resolve, reject) => {
      compress(src, 8, (res, err) => (res ? resolve(Buffer.from(res)) : reject(err)));
    });
    const unpacked = await unpack(comp.slice(0, 5), src.length, comp.slice(13));
    const uncomp = await new Promise<string>((resolve, reject) => {
      decompress(lzma1, (res, err) => (res ? resolve(Buffer.from(res).toString()) : reject(err)));
    });
    expect(uncomp).toBe(src);
    expect(unpacked).toBe(src);
    expect(lzma1.slice(13)).toEqual(packed);
  });
});
