import { ExtractType, Struct } from 'typed-struct';


export const DviScreenInfoFlag = 'DSCI';
/**
 * DSCI
 */
export const DviScreenConfigInfo = new Struct('DviScreenConfigInfo')
  .String('header', DviScreenInfoFlag.length, 'ascii')
  .UInt16LE('crc')
  .UInt32LE('dviInfoLength')
  .UInt32LE('screenInfoLength')
  .UInt16LE('adjustInfoLength')
  // .Struct('modulationInfo', ModulationInfo)
  .back(0)
  .seek(54)
  .Buffer('data')
  .compile();

export type DviScreenConfigInfo = ExtractType<typeof DviScreenConfigInfo>;
