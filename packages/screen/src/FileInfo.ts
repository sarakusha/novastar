// noinspection SpellCheckingInspection

import * as t from 'io-ts';

export const ScreenFileType = 'ScreenDataType';
export const ScreenFileVersion = '1001';
export const FILE_COMPRESS_AREA_START_ADDR = 0x500_2000;

/**
 * Nova.LCT.GigabitSystem.CommonInfoAccessor.dll
 *
 * Nova.LCT.GigabitSystem.CommonInfoAccessor::FileInfoObject
 */
export const FileInfoObject = t.type({
  FileType: t.string,
  Addr: t.number,
  SrcLength: t.number,
  DestLength: t.number,
  CheckSum: t.number,
  Version: t.string,
  DecompressProps: t.string,
});

/**
 * Nova.LCT.GigabitSystem.CommonInfoAccessor::FileObject
 */
// export type FileObject = {
//   FileType: typeof ScreenFileType;
//   Version: typeof ScreenFileVersion;
//   Data: Buffer;
// }

export type FileInfoObject = t.TypeOf<typeof FileInfoObject>;

export const FileInfoObjectList = t.type({
  SectionFormat: t.array(FileInfoObject),
});

export type FileInfoObjectList = t.TypeOf<typeof FileInfoObjectList>;
