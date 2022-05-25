import { ScreenAdjustParams } from '@novastar/native/ScreenAdjustParams';
import { makeStruct } from '@novastar/native/common';
import Struct from 'typed-struct';

const ScreenAdjustParam = new Struct('ScreenAdjustParam')
  .UInt8('ScreenXZoomType')
  .UInt8('ScreenXScale')
  .UInt8('ScreenYZoomType')
  .UInt8('ScreenYScale')
  .UInt8('VirtualMap')
  .String('ScreenName', 20)
  .UInt8('ThreeD')
  .back(0)
  .seek(40)
  .compile();

const ScreenAdjustParamOld = new Struct('ScreenAdjustParamOld')
  .UInt8('ScreenXZoomType')
  .UInt8('ScreenXScale')
  .UInt8('ScreenYZoomType')
  .UInt8('ScreenYScale')
  .UInt8('VirtualMap')
  .String('ScreenName', 20)
  .UInt8('ThreeD')
  .back(0)
  .seek(41)
  .compile();

const ScreenAdjustInfo = new Struct('ScreenAdjustInfo')
  .UInt16LE('version')
  .back(0)
  .seek(132)
  .UInt8('count')
  .StructArray('oldParams', ScreenAdjustParamOld)
  .back()
  .StructArray('params', ScreenAdjustParam)
  .compile();

// eslint-disable-next-line import/prefer-default-export
export function decodeScreenAdjustInfo(buffer: Buffer): Required<ScreenAdjustParams>[] {
  const info = new ScreenAdjustInfo(buffer).toJSON();
  const { version, count } = info;
  const paramSize = version <= 1001 ? ScreenAdjustParamOld.baseSize : ScreenAdjustParam.baseSize;
  const length = count * paramSize + ScreenAdjustInfo.baseSize;
  if (buffer.length < length) throw new Error('Invalid adjust length');
  const params = version <= 1001 ? info.oldParams : info.params;
  if (params.length !== count) throw new TypeError('Wrong number of adjust parameters');
  return params.map(param => makeStruct(ScreenAdjustParams, param));
}
