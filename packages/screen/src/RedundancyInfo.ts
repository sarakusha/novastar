import { makeStruct } from '@novastar/native/build/main/common';
import { SenderRedundancyInfo } from '@novastar/native/build/main/generated/SenderRedundancyInfo';
import Struct, { ExtractType } from 'typed-struct';

import { crc } from './common';

export const ReduFlag = 'REDU';
export const ReduDataVer = 1001;

const RedundancyItem = new Struct('RedundancyItem')
  .UInt32LE('MasterSenderIndex')
  .UInt32LE('MasterPortIndex')
  .UInt32LE('SlaveSenderIndex')
  .UInt32LE('SlavePortIndex')
  .compile();

export const RedundancyInfo = new Struct('RedundancyInfo')
  .String('header', ReduFlag.length, 'ascii')
  .UInt16LE('version')
  .UInt16LE('crc')
  .UInt16LE('length')
  .StructArray('items', RedundancyItem)
  .compile();

export type RedundancyInfo = ExtractType<typeof RedundancyInfo, false>;

const dataOffset = RedundancyInfo.getOffsetOf('crc') + 2;

export const decodeRedundancyInfo = (data: Buffer): Required<SenderRedundancyInfo>[] => {
  const { crc: crcInfo, items } = new RedundancyInfo(data).toJSON();
  if (crc(data.slice(dataOffset), 0) !== crcInfo) throw new Error('Invalid RedundancyInfo crc');
  return items.map(item => makeStruct(SenderRedundancyInfo, item));
};

export const encodeRedundancyInfo = (
  reduList: ReadonlyArray<Required<SenderRedundancyInfo>>
): Buffer => {
  const length = reduList.length * RedundancyItem.baseSize;
  const info = new RedundancyInfo(RedundancyInfo.baseSize + length);
  info.header = ReduFlag;
  info.version = ReduDataVer;
  info.length = length;
  reduList.forEach((item, index) => {
    Object.assign(info.items[index], item);
  });
  const raw = RedundancyInfo.raw(info);
  info.crc = crc(raw.slice(dataOffset), 0);
  return raw;
};
