import * as t from 'io-ts';
/**
 * Codec for interface {@link ScanBoardVersionInfo}
 * @category Codecs
 * @see Automatically generated from ../decompiled/Nova.LCT.GigabitSystem.DataClass.decompiled.cs:38543
 */
export const ScanBoardVersionInfo = t.partial(
  {
    ScanBoardName: t.string, // #38546
    ProgramVersion: t.string, // #38548
  },
  'ScanBoardVersionInfo'
);
export interface ScanBoardVersionInfo extends t.TypeOf<typeof ScanBoardVersionInfo> {}
