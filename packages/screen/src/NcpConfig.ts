import fs from 'fs';

import { Uint8ArrayReader, Uint8ArrayWriter, ZipReader } from '@zip.js/zip.js';
import Zip from 'adm-zip';
import { XMLParser } from 'fast-xml-parser';

import { decodeScannerBinData } from './ScannerBinData';
import type { SendParam } from './ScanBdRecordNoSendParams';

// cspell:ignore RCCB

const outerPassword = 'N0@|,[)9.$eP';
const packagePassword = '*^Tm!{>6v8=&';
const maxFirmwareSize = 64 * 1024 * 1024;

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
  firmware?: NcpReceivingCardFirmware;
  baseInfo: NcpCabinetBaseInfo;
  /** Original RCCB binary accepted by Taurus ScreenService. */
  binary: Buffer;
  /** Register writes extracted from the cabinet RCCB binary. */
  parameters: SendParam[];
}

export interface ReceivingCardFirmwareFile {
  label: string;
  filename: string;
  version?: string;
  remark?: string;
}

export interface ReceivingCardFirmwareInfo {
  filename: string;
  version?: string;
  model?: string;
  modelId: number;
  files: ReceivingCardFirmwareFile[];
}

export interface NcpReceivingCardFirmware {
  data: Buffer;
  info: ReceivingCardFirmwareInfo;
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

const stringValue = (value: unknown): string | undefined => {
  if (typeof value === 'string') return value || undefined;
  if (typeof value === 'number' && Number.isFinite(value)) return String(value);
  return undefined;
};

const nonNegativeInteger = (value: unknown): number | undefined => {
  const parsed = typeof value === 'number' ? value : Number.parseInt(String(value), 10);
  return Number.isInteger(parsed) && parsed >= 0 ? parsed : undefined;
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

const findFile = (files: Map<string, Buffer>, filename: string): Buffer | undefined => {
  const normalized = filename.replaceAll('\\', '/');
  const exact = files.get(normalized);
  if (exact) return exact;
  const basename = normalized.split('/').at(-1)?.toLowerCase();
  return [...files].find(([name]) => name.split('/').at(-1)?.toLowerCase() === basename)?.[1];
};

const firmwareFiles = (value: unknown): ReceivingCardFirmwareFile[] => {
  const entries = Array.isArray(value) ? value : value === undefined ? [] : [value];
  return entries.flatMap((entry) => {
    const file = asObject(entry, 'Invalid receiving-card firmware file entry');
    const filename = stringValue(file.FileName);
    const label = stringValue(file.FileLabel);
    return filename && label
      ? [
          {
            label,
            filename,
            version: stringValue(file.Version),
            remark: stringValue(file.Remark),
          },
        ]
      : [];
  });
};

/** Inspect and validate a NovaStar receiving-card firmware ZIP archive. */
export const decodeReceivingCardFirmware = async (
  data: Buffer,
  filename = 'firmware.zip',
): Promise<ReceivingCardFirmwareInfo> => {
  if (data.byteLength > maxFirmwareSize) {
    throw new RangeError(`Receiving-card firmware is too large: ${data.byteLength} bytes`);
  }
  const files = await unzip(data);
  const config = findFile(files, 'Config.xml');
  if (!config) throw new TypeError('Receiving-card firmware Config.xml is missing');
  const parsed = new XMLParser({ ignoreAttributes: false, parseTagValue: false }).parse(
    config.toString('utf8'),
  );
  const root = asObject(
    asObject(parsed, 'Invalid firmware XML').DataPackage,
    'Invalid firmware XML',
  );
  if (stringValue(root.DeviceTypes) !== 'Scanner') {
    throw new TypeError('Firmware is not intended for receiving cards');
  }
  const configBasic =
    typeof root.BasicInfo === 'object' && root.BasicInfo !== null && !Array.isArray(root.BasicInfo)
      ? asObject(root.BasicInfo, 'Invalid receiving-card firmware model')
      : undefined;
  const iniEntry = [...files].find(([name]) => name.toLowerCase().endsWith('.ini'))?.[1];
  const ini = iniEntry
    ? asObject(JSON.parse(iniEntry.toString('utf8')), 'Invalid receiving-card firmware INI')
    : undefined;
  const iniBasic =
    ini &&
    typeof ini.BasicInfo === 'object' &&
    ini.BasicInfo !== null &&
    !Array.isArray(ini.BasicInfo)
      ? asObject(ini.BasicInfo, 'Invalid receiving-card firmware INI model')
      : undefined;
  const modelId = nonNegativeInteger(root.ModuleID);
  const result: ReceivingCardFirmwareInfo = {
    filename,
    version: stringValue(root.Version),
    model: stringValue(configBasic?.Type) ?? stringValue(iniBasic?.Type),
    modelId: modelId ?? 0,
    files: firmwareFiles(root.FileInfo),
  };
  if (!modelId || !result.files.length) {
    throw new TypeError('Receiving-card firmware metadata is incomplete');
  }
  for (const file of result.files) {
    if (!findFile(files, file.filename)) {
      throw new TypeError(`Receiving-card firmware file is missing: ${file.filename}`);
    }
  }
  return result;
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
      const firmwareFile =
        typeof cabinet.firmwareFile === 'string' ? cabinet.firmwareFile : undefined;
      const firmwareData = firmwareFile ? findFile(packageFiles, firmwareFile) : undefined;
      if (firmwareFile && !firmwareData) {
        throw new TypeError(`NCP firmware file is missing: ${firmwareFile}`);
      }
      return {
        name: cabinet.name,
        revision: typeof cabinet.revision === 'number' ? cabinet.revision : undefined,
        firmwareFile,
        firmware:
          firmwareFile && firmwareData
            ? {
                data: firmwareData,
                info: await decodeReceivingCardFirmware(firmwareData, firmwareFile),
              }
            : undefined,
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
