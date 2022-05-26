import path from 'path';
import { inspect } from 'util';

import { compress, decompress } from '@sarakusha/lzma';
import { X2jOptionsOptional, XMLParser } from 'fast-xml-parser';

import { pack, toHex, unpack } from './common';
import { loadScanBoardConfig, loadScreenConfig, loadSystemConfig } from './configs';

const options: X2jOptionsOptional = {
  ignoreAttributes: false,
  parseTagValue: false,
};
const parser = new XMLParser(options);

const extractErrorMsg = (msg: string): string => {
  const pos = msg.indexOf(':');
  if (pos === -1) return msg;
  const slash = msg.lastIndexOf('/');
  return `${msg.slice(0, pos)} | ${msg.slice(slash)}`;
};

describe('cfg', () => {
  it('SCFG', async () => {
    // const xml = fs.readFileSync(path.resolve(__dirname, '../../../cfg/20210917.scfg'));
    // const cfg = parser.parse(xml);
    // console.log(inspect(cfg.SystemParameterConfig.SacnBdProp.ConfigFileVersion, false, null))
    // const res = SystemParameterConfig.decode(cfg.SystemParameterConfig);
    // if (isLeft(res)) {
    //   const [first] = PathReporter.report(res);
    //   // const [last] = lines.slice(-1);
    //   console.error(first);
    //   // console.error(extractErrorMsg(first));
    // } else {
    //   console.log(inspect(res.right, false, null));
    // }
    const pathname = path.resolve(__dirname, '../../../cfg/20210917.scfg');
    console.log(inspect(await loadSystemConfig(pathname), false, null));
  });
  it('RCFG', async () => {
    const pathname = path.resolve(__dirname, '../../../cfg/Q8_ICND2153_40x40.rcfgx');
    const [cfg, params] = loadScanBoardConfig(pathname);
    console.log({
      cfg,
      params: params.map(({ address, data, name }) => ({
        address: toHex(address),
        length: data.length,
        data,
        name,
      })),
    });
  });
  it('SCR', () => {
    const pathname = path.resolve(__dirname, '../../../cfg/test.scr');
    const cfg = loadScreenConfig(pathname);
    console.log(inspect(cfg, false, null));
  });
  it('lzma', async () => {
    const test = Buffer.from('test');
    const [props, data] = await pack(test);
    console.log({ props, data });
    expect(await unpack(props, test.length, data)).toBe(test.toString());
  });
  it('lzma1', async () => {
    const comp = Buffer.from(
      'XQAAAAGyAAAAAAAAAAA9iIZmU1QGVf8V9Mv+v+O8UymTDbCapeUd9rlC85hQex5rzjVoQImDsO/ZzvjM7WsM3c/oqt3BF6stB8FgqwQmIZZOAgz+yeM/IBrIMF+NG7FynSKTPIaTDG3tEvKP2t8dDdEUEyevx7XawjvaFRS35LYWSTrrZWJCHsPlHzUFGsciodlcSJSkJCL6T1YA',
      'base64'
    );
    const src =
      '{"SectionFormat":[{"FileType":"ScreenDataType","Addr":83894272,"SrcLength":2523,"DestLength":374,"CheckSum":3368,"Version":"1001","DecompressProps":"]\\u0000\\u0000\\u0000\\u0001"}]}';
    const [props, packed] = await pack(src);
    const lzma1 = await new Promise<Buffer>((resolve, reject) => {
      compress(src, 8, (res, err) => (res ? resolve(Buffer.from(res)) : reject(err)));
    });
    console.log({ srcLength: src.length });
    const unpacked = await unpack(comp.slice(0, 5), src.length, comp.slice(13));
    const uncomp = await new Promise<string>((resolve, reject) => {
      decompress(lzma1, (res, err) => (res ? resolve(Buffer.from(res).toString()) : reject(err)));
    });
    console.log({
      uncomp,
      unpacked,
      // pack: packed,
      // comp: comp.slice(13),
      lzma: lzma1.slice(0, 13),
    });
    // const unpacked = await decompress(packed);
    // expect(packed.length).toBe(comp.length);
    expect(lzma1.slice(13)).toEqual(packed);
  });
});
