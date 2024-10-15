import { ExtractType, Struct } from 'typed-struct';

export const SoftwareSpaceHeaderFlag = 'NSSD';
export const SoftwareSpaceHeaderVersion = 1001;

export const ParamSize = 7;

export const SoftwareSpaceHeader = new Struct('SoftwareSpaceHeader')
  .String('header', 4, 'ascii')
  .UInt16LE('crc') // 4
  .UInt16LE('version') // 6
  .UInt16LE('paramSize') // 8
  .UInt16LE('paramCRC') // 10
  .UInt32LE('compressedSize') // 12
  .UInt32LE('fileInfoSize') // 16
  .UInt16LE('fileInfoCRC') // 20
  // .back(0)
  // .seek(512)
  .compile();

export type SoftwareSpaceHeader = ExtractType<typeof SoftwareSpaceHeader, false>;
