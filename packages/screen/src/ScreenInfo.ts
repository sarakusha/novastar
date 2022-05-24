import { LEDDisplyTypeEnum } from '@novastar/native/lib/generated/LEDDisplyType';
import ScreenInfoRelativeAddress from '@novastar/native/lib/generated/ScreenInfoRelativeAddress';
import debugFactory from 'debug';

import { decodeComplexLEDDisplayInfo } from './ComplexScreen';
import { decodeSimpleLEDDisplayInfo } from './SimpleSingleScreen';
import { decodeStandardLEDDisplayInfo } from './StandardScreen';
import { crc16, LEDDisplayInfo } from './common';

const debug = debugFactory('novastar:ScreenInfo');
const ScreenDataNewVer = 1005;

export type DVI1600Info = {
  si: number;
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  x3: number;
  y3: number;
  x4: number;
  y4: number;
};

function decodeDVI1600Info(data: Buffer): DVI1600Info | undefined {
  const StartAddressIndex = 28;
  const scrCrc = data.readUInt16LE(ScreenInfoRelativeAddress.SCREEN_HEADERINFO_CRC);
  if (crc16(data.slice(ScreenInfoRelativeAddress.SCREEN_HEADERINFO_RESERVED), 0) !== scrCrc)
    throw new TypeError('Invalid CRC');
  const screenCount = data.readUInt8(ScreenInfoRelativeAddress.SCREEN_HEADERINFO_SCREENCOUNT);
  const typeOffset =
    ScreenInfoRelativeAddress.SCREEN_HEADERINFO_SCREENLENINFOADDR + screenCount * 4;
  if (data.length < typeOffset + 1) throw new Error('Invalid length');
  const dviExtendsPos = data.readUInt32LE(StartAddressIndex);
  let dviExtends: DVI1600Info | undefined;
  if (dviExtendsPos < data.length) {
    const offset = dviExtendsPos + 2;
    const dviExtendsLength = data.readUInt16LE(dviExtendsPos);
    dviExtends = JSON.parse(data.slice(offset, offset + dviExtendsLength).toString());
  }
  debug(`dviExtends: ${JSON.stringify(dviExtends)}`);
  return dviExtends;
}

export type ScreenInfo = {
  screens: LEDDisplayInfo[];
  version: number;
  dviExtends?: DVI1600Info;
};

/**
 * SoftWareSpaceAnalyser:443
 * @param data
 */
export function decodeScreenInfo(data: Buffer): ScreenInfo {
  if (
    crc16(data.slice(ScreenInfoRelativeAddress.SCREEN_HEADERINFO_RESERVED), 0) !==
    data.readUInt16LE(ScreenInfoRelativeAddress.SCREEN_HEADERINFO_CRC)
  )
    throw new Error('Invalid screen info crc');
  if (data.length < ScreenInfoRelativeAddress.SCREEN_HEADERINFO_SCREENLENINFOADDR)
    throw new Error('Invalid length of screen info');
  const version = data.readUInt16LE(ScreenInfoRelativeAddress.SCREEN_HEADERINFO_VERSION);
  debug(`version: ${version}`);
  const dviExtends = version === ScreenDataNewVer + 1 ? decodeDVI1600Info(data) : undefined;
  const screenCount = data.readUInt8(ScreenInfoRelativeAddress.SCREEN_HEADERINFO_SCREENCOUNT);
  debug(`screenCount: ${screenCount}`);
  let screenDataPos =
    screenCount * 4 + ScreenInfoRelativeAddress.SCREEN_HEADERINFO_SCREENLENINFOADDR;
  if (data.length < screenDataPos) throw new Error('Invalid length of screen info');
  const screens: LEDDisplayInfo[] = [];
  for (let i = 0; i < screenCount; i += 1) {
    const length = data.readUInt32LE(
      ScreenInfoRelativeAddress.SCREEN_HEADERINFO_SCREENLENINFOADDR + 4 * i
    );
    const type = data.readUInt8(screenDataPos);
    debug(`[${i}]; type: ${type}; length: ${length}`);
    switch (type) {
      case LEDDisplyTypeEnum.SimpleSingleType:
        screens.push(decodeSimpleLEDDisplayInfo(data.slice(screenDataPos, screenDataPos + length)));
        break;
      case LEDDisplyTypeEnum.StandardType:
        screens.push(
          decodeStandardLEDDisplayInfo(data.slice(screenDataPos, screenDataPos + length))
        );
        break;
      case LEDDisplyTypeEnum.ComplexType:
        screens.push(
          decodeComplexLEDDisplayInfo(data.slice(screenDataPos, screenDataPos + length))
        );
        break;
      default:
        throw new TypeError('Invalid led display type');
    }
    screenDataPos += length;
  }
  return {
    version,
    screens,
    dviExtends,
  };
}
