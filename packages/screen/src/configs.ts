import fs from 'fs';

import type { GraphicsDVIPortInfo } from '@novastar/native/GraphicsDVIPortInfo';
import { ScanBoardProperty } from '@novastar/native/ScanBoardProperty';
import { SystemParameterConfig } from '@novastar/native/SystemParameterConfig';
import Zip from 'adm-zip';
import debugFactory from 'debug';
import { X2jOptionsOptional, XMLParser } from 'fast-xml-parser';
import { isLeft } from 'fp-ts/Either';
import * as t from 'io-ts';
import { PathReporter } from 'io-ts/PathReporter';

import { decodeGraphicsDVIPortInfo } from './DVIInfo';
import { DviScreenConfigInfo, DviScreenInfoFlag } from './DviScreenConfigInfo';
import { SendParam } from './ScanBdRecordNoSendParams';
import { decodeScannerBinData } from './ScannerBinData';
import { decodeScreenAdjustInfo } from './ScreenAdjustInfo';
import { decodeScreenInfo, ScreenInfo } from './ScreenInfo';
import { crc16 } from './common';

const debug = debugFactory('novastar:config');

const options: X2jOptionsOptional = {
  ignoreAttributes: false,
  parseTagValue: false,
};

const parser = new XMLParser(options);

const makeCfgParser =
  <C extends t.Mixed>(codec: C) =>
  (data: Buffer): t.TypeOf<C> => {
    const cfg = parser.parse(data);
    const { decode } = t.exact(t.type({ [codec.name]: codec }));
    const res = decode(cfg);
    if (isLeft(res)) {
      throw new TypeError(PathReporter.report(res)[0]);
    }
    return res.right[codec.name];
  };

const systemParameterParser = makeCfgParser(SystemParameterConfig);

const scanboardParser = makeCfgParser(ScanBoardProperty);

/**
 * *.scfg
 * @param pathname
 */
export const loadSystemConfig = (pathname: string): SystemParameterConfig => {
  const data = fs.readFileSync(pathname);
  return systemParameterParser(data);
};

/**
 * *.rcfgx
 * @param pathname
 */
export const loadScanBoardConfig = (
  pathname: string
): readonly [ScanBoardProperty, SendParam[]] => {
  const zip = new Zip(pathname);
  const [xmlData, binData] = zip.getEntries().map(entry => zip.readFile(entry));
  if (!xmlData) throw new Error('Invalid archive');
  const xml = scanboardParser(xmlData);
  const params: SendParam[] = binData ? decodeScannerBinData(binData) : [];
  return [xml, params];
};

type ScrConfig = ScreenInfo & {
  dviVersion: number;
  dviInfo: GraphicsDVIPortInfo;
};

/**
 * @param buffer
 */
export const decodeScreenConfig = (buffer: Buffer): ScrConfig => {
  const {
    crc: crcInfo,
    dviInfoLength,
    screenInfoLength,
    adjustInfoLength,
    data,
    header,
  } = new DviScreenConfigInfo(buffer);
  if (header !== DviScreenInfoFlag) throw new TypeError('Invalid DSCI header');
  const size = DviScreenConfigInfo.baseSize + dviInfoLength + screenInfoLength + adjustInfoLength;
  if (buffer.length < size) throw new Error('Invalid buffer length');
  if (
    crc16(buffer.slice(DviScreenConfigInfo.getOffsetOf('crc') + 2, size - adjustInfoLength), 0) !==
    crcInfo
  )
    throw new TypeError('Invalid CRC');
  const [dviInfo, dviVersion] = decodeGraphicsDVIPortInfo(data.slice(0, dviInfoLength));
  debug(`dviInfo: ${JSON.stringify(dviInfo)}`);
  debug(`dviVersion: ${dviVersion}`);
  const screenInfo = decodeScreenInfo(data.slice(dviInfoLength, dviInfoLength + screenInfoLength));
  const adjustInfo = decodeScreenAdjustInfo(
    data.slice(
      dviInfoLength + screenInfoLength,
      dviInfoLength + screenInfoLength + adjustInfoLength
    )
  );
  if (adjustInfo.length > 0) {
    if (adjustInfo.length !== screenInfo.screens.length)
      throw new Error('Invalid adjust info count');
    screenInfo.screens = screenInfo.screens.map(({ ScrAdjustParams, ...props }, index) => ({
      ScrAdjustParams: adjustInfo[index],
      ...props,
    }));
  }
  if (size + 11 < buffer.length) {
  }
  return {
    ...screenInfo,
    dviVersion,
    dviInfo,
  };
};

/**
 * *.scr
 * @param pathname
 */
export const loadScreenConfig = (pathname: string): ScrConfig =>
  decodeScreenConfig(fs.readFileSync(pathname));
