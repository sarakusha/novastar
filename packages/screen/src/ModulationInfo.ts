import { ModulationModeTypeEnum } from '@novastar/native/ModulationModeType';
import { SenderModulationInfo } from '@novastar/native/SenderModulationInfo';
import { makeStruct } from '@novastar/native/common';
import { Struct, typed } from 'typed-struct';

import { crc16 } from './common';

export const SenderModulationFlag = 'SSPE';
export const SenderModulationDataVer = 1002;

const ModulationMode = new Struct('ModulationMode')
  .UInt8('mode', typed<ModulationModeTypeEnum>())
  .back(0)
  .seek(128)
  .compile();

const ModulationInfo = new Struct('ModulationInfo')
  .UInt8('portIndex')
  .back(0)
  .seek(128)
  .StructArray('modes', ModulationMode)
  .compile();

export const ModulationInfoHeader = new Struct('ModulationInfoHeader')
  .String('header', {
    encoding: 'ascii',
    length: SenderModulationFlag.length,
  })
  .UInt16LE('version')
  .UInt16LE('crc')
  .UInt16LE('length')
  .UInt8('count')
  .back(0)
  .seek(256)
  .Buffer('data')
  .compile();

const useDistributor = [ModulationModeTypeEnum.OneToEight, ModulationModeTypeEnum.TwoToFour];

export const decodeModulationInfo = (buf: Buffer): Required<SenderModulationInfo>[] => {
  const header = new ModulationInfoHeader(buf);
  if (crc16(buf.slice(ModulationInfoHeader.getOffsetOf('crc') + 2), 0) !== header.crc)
    throw new Error('Invalid ModulationInfoHeader crc');
  const result: Required<SenderModulationInfo>[] = [];
  for (
    let SenderIndex = 0, offset = 0;
    SenderIndex < header.count && offset < header.length;
    SenderIndex += 1
  ) {
    const portIndex = header.data[offset];
    const length = ModulationInfo.baseSize + ModulationMode.baseSize * portIndex;
    const info = new ModulationInfo(header.data.slice(offset, offset + length)).toJSON();
    const modes = info.modes.map(({ mode }) => mode);
    result.push(
      makeStruct(SenderModulationInfo, {
        SenderIndex,
        PortIndex: info.portIndex,
        ModulationModeTypeInfoList: modes,
        IsUseDistributor: modes.some(mode => useDistributor.includes(mode)),
      })
    );
    offset += length;
  }
  return result;
};

export const encodeModulationInfo = (
  modulations: ReadonlyArray<Required<SenderModulationInfo>>
): Buffer => {
  const length = modulations.reduce(
    (acc, item) =>
      acc +
      ModulationInfo.baseSize +
      item.ModulationModeTypeInfoList.length * ModulationMode.baseSize,
    0
  );
  const infoHeader = new ModulationInfoHeader(ModulationInfoHeader.baseSize + length);
  infoHeader.length = length;
  infoHeader.version = SenderModulationDataVer;
  infoHeader.count = modulations.length;
  for (let index = 0, offset = 0; index < modulations.length; index += 1) {
    const { ModulationModeTypeInfoList } = modulations[index];
    const size =
      ModulationInfo.baseSize + ModulationMode.baseSize * ModulationModeTypeInfoList.length;
    const info = new ModulationInfo(infoHeader.data.slice(offset, offset + size));
    info.portIndex = ModulationModeTypeInfoList.length;
    ModulationModeTypeInfoList.forEach((mode, i) => {
      info.modes[i].mode = mode;
    });
    offset += size;
  }
  const raw = ModulationInfoHeader.raw(infoHeader);
  infoHeader.crc = crc16(raw.slice(ModulationInfoHeader.getOffsetOf('crc') + 2), 0);
  return raw;
};
