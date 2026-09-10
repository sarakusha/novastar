import fs from 'fs';

import Zip from 'adm-zip';

export interface NcpConfigInfo {
  /** NCP payload entry name. Current NovaLCT packages use `package`. */
  packageName: string;
  packageSize: number;
  compressedSize: number;
  encrypted: boolean;
}

/**
 * Inspect a NovaLCT cabinet configuration package (*.ncp).
 *
 * NCP payloads are normally encrypted by NovaLCT. This function deliberately
 * treats the payload as opaque and only validates the outer container, so the
 * original bytes can later be forwarded to compatible hardware unchanged.
 */
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

/** Inspect a NovaLCT cabinet configuration package (*.ncp) from disk. */
export const loadNcpConfigInfo = (pathname: string): NcpConfigInfo =>
  inspectNcpConfig(fs.readFileSync(pathname));
