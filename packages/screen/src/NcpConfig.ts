import fs from 'fs';

import { Uint8ArrayReader, Uint8ArrayWriter, ZipReader } from '@zip.js/zip.js';
import Zip from 'adm-zip';

import { decodeScannerBinData } from './ScannerBinData';
import type { SendParam } from './ScanBdRecordNoSendParams';

// cspell:ignore RCCB

const outerPassword = 'N0@|,[)9.$eP';
const packagePassword = '*^Tm!{>6v8=&';

export interface NcpConfigInfo {
  packageName: string;
  packageSize: number;
  compressedSize: number;
  encrypted: boolean;
}

export interface NcpCabinetBaseInfo {
  name?: string;
  manufacture?: string;
  cardModel?: string;
  firmwareVersion?: string;
  icType?: string;
  refreshRate?: number;
  scanType?: number;
  [key: string]: unknown;
}

export interface NcpCabinetConfig {
  name: string;
  revision?: number;
  firmwareFile?: string;
  baseInfo: NcpCabinetBaseInfo;
  /** Original RCCB binary accepted by Taurus ScreenService. */
  binary: Buffer;
  /** Register writes extracted from the cabinet RCCB binary. */
  parameters: SendParam[];
}

export interface NcpConfig {
  formatVersion?: number;
  packageName?: string;
  cabinets: NcpCabinetConfig[];
}

type JsonObject = Record<string, unknown>;

const asObject = (value: unknown, message: string): JsonObject => {
  if (typeof value !== 'object' || value === null || Array.isArray(value))
    throw new TypeError(message);
  return value as JsonObject;
};

const unzip = async (buffer: Buffer, password?: string): Promise<Map<string, Buffer>> => {
  const reader = new ZipReader(new Uint8ArrayReader(buffer));
  try {
    const result = new Map<string, Buffer>();
    for (const entry of await reader.getEntries()) {
      if (entry.directory) continue;
      const data = await entry.getData(new Uint8ArrayWriter(), password ? { password } : undefined);
      result.set(entry.filename.replaceAll('\\', '/'), Buffer.from(data));
    }
    return result;
  } finally {
    await reader.close();
  }
};

/** Inspect an NCP container without decrypting it. */
export const inspectNcpConfig = (buffer: Buffer): NcpConfigInfo => {
  const entries = new Zip(buffer).getEntries().filter((entry) => !entry.isDirectory);
  if (entries.length !== 1 || entries[0]?.entryName !== 'package') {
    throw new TypeError('Invalid NCP container');
  }
  const [entry] = entries;
  return {
    packageName: entry.entryName,
    packageSize: entry.header.size,
    compressedSize: entry.header.compressedSize,
    encrypted: (entry.header.flags & 1) !== 0,
  };
};

/** Decode a current NovaLCT NCP package into cabinet register-write sequences. */
export const decodeNcpConfig = async (buffer: Buffer): Promise<NcpConfig> => {
  inspectNcpConfig(buffer);
  const outer = await unzip(buffer, outerPassword);
  const payload = outer.get('package');
  if (!payload) throw new TypeError('Invalid NCP package entry');
  const packageFiles = await unzip(payload, packagePassword);
  const manifestData = packageFiles.get('manifest.json');
  if (!manifestData) throw new TypeError('NCP manifest is missing');
  const manifest = asObject(JSON.parse(manifestData.toString('utf8')), 'Invalid NCP manifest');
  const cabinetPackage = asObject(manifest.cabinetPackage, 'Invalid NCP cabinet package');
  const description = asObject(cabinetPackage.description, 'Invalid NCP description');
  if (!Array.isArray(cabinetPackage.cabinets)) throw new TypeError('Invalid NCP cabinet list');

  const cabinets = await Promise.all(
    cabinetPackage.cabinets.map(async (value): Promise<NcpCabinetConfig> => {
      const cabinet = asObject(value, 'Invalid NCP cabinet');
      if (typeof cabinet.name !== 'string' || typeof cabinet.cfgName !== 'string') {
        throw new TypeError('Invalid NCP cabinet identity');
      }
      const cfgArchive = packageFiles.get(cabinet.cfgName);
      if (!cfgArchive) throw new TypeError(`NCP cabinet file is missing: ${cabinet.cfgName}`);
      const cfgFiles = await unzip(cfgArchive);
      const cfgData = cfgFiles.get('config.json');
      if (!cfgData) throw new TypeError(`NCP cabinet manifest is missing: ${cabinet.name}`);
      const cfg = asObject(JSON.parse(cfgData.toString('utf8')), 'Invalid NCP cabinet manifest');
      if (!Array.isArray(cfg.files)) throw new TypeError('Invalid NCP cabinet file list');
      const binDescriptor = cfg.files
        .map((item) => asObject(item, 'Invalid NCP cabinet file'))
        .find(({ fileName }) => typeof fileName === 'string' && fileName.endsWith('.bin'));
      if (!binDescriptor || typeof binDescriptor.fileName !== 'string') {
        throw new TypeError(`NCP cabinet binary is missing: ${cabinet.name}`);
      }
      const binary = cfgFiles.get(binDescriptor.fileName);
      if (!binary) throw new TypeError(`NCP cabinet binary is missing: ${cabinet.name}`);
      return {
        name: cabinet.name,
        revision: typeof cabinet.revision === 'number' ? cabinet.revision : undefined,
        firmwareFile: typeof cabinet.firmwareFile === 'string' ? cabinet.firmwareFile : undefined,
        baseInfo: asObject(cfg.baseInfo, 'Invalid NCP cabinet base info'),
        binary,
        parameters: decodeScannerBinData(binary),
      };
    }),
  );
  return {
    formatVersion: typeof manifest.formatVersion === 'number' ? manifest.formatVersion : undefined,
    packageName: typeof description.packName === 'string' ? description.packName : undefined,
    cabinets,
  };
};

export const loadNcpConfigInfo = (pathname: string): NcpConfigInfo =>
  inspectNcpConfig(fs.readFileSync(pathname));

export const loadNcpConfig = (pathname: string): Promise<NcpConfig> =>
  decodeNcpConfig(fs.readFileSync(pathname));
