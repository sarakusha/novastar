import { ExtractType, Struct } from 'typed-struct';

export const ScanBdRecordNoSendParams = new Struct('ScanBdRecordNoSendParams')
  .UInt32LE('size')
  .UInt16LE('num', 1)
  .UInt32LE('address')
  .UInt32LE('length')
  .UInt16LE('delay')
  .seek(16)
  .Buffer('data')
  .compile();

export type ScanBdRecordNoSendParams = ExtractType<typeof ScanBdRecordNoSendParams, false>;

export type SendParam = Pick<ScanBdRecordNoSendParams, 'address' | 'data' | 'delay'> & {
  name?: string;
};
