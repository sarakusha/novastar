/* eslint-disable no-bitwise,no-param-reassign */
import { ExtractType, Struct } from 'typed-struct';

export const AutoRefreshRate = new Struct('AutoRefreshRate')
  .UInt16LE('TotalUnitNum')
  .UInt16LE('TotalGclkUnitNumPerScan')
  .Custom(
    'RefNumPerVs',
    2,
    (_, buf) => buf[0] + (buf[1] << 7),
    (_, buf, value) => {
      buf.writeUInt16LE(value);
      buf[1] <<= 1;
      return true;
    }
  )
  .UInt8('GCLKRate')
  .Custom(
    'IsEnableTranCntNum',
    1,
    (_, buf) => buf[0] === 85,
    (_, buf, value) => {
      buf[0] = value ? 85 : 0;
      return true;
    }
  )
  .UInt8('M1TranCntNum')
  .UInt8('M2TranCntNum')
  .UInt16LE('LightTime')
  .UInt16LE('LightTimeNum2')
  .compile();

export type AutoRefreshRate = ExtractType<typeof AutoRefreshRate, false>;
