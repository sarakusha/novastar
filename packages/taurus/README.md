# @novastar/taurus

<!-- cspell:ignore EDID EPSV GMIB RCCB RNDIS rcfgx sdcard -->

Node.js client for the high-level management protocol used by NovaStar Taurus multimedia players.
It complements the register protocol on TCP port 5200: this package connects to the player service
on TCP port 16606 (TLS when privacy mode is enabled).

```ts
import { discoverTaurusPlayers, TaurusClient, uploadTaurusFile } from '@novastar/taurus';

const [player] = await discoverTaurusPlayers();
const client = await TaurusClient.connect({
  host: player.address,
  port: player.tcpPort,
  privacy: player.privacy,
});
await client.login({ sn: player.sn, password: process.env.TAURUS_PASSWORD! });

console.log(await client.getEnvironmentBrightness());
console.log(await client.getBrightness());
await client.setBrightness(50); // volatile by default; does not write flash

// Force the HDMI input (ViPlex "Manual / HDMI", synchronous playback).
await client.setSynchronousMode();

// Or allow an automatic fallback to the internal player when HDMI disappears.
await client.setSynchronousMode({ fallbackToInternal: true });

console.log(await client.getVideoConfiguration()); // mode, source, scaling and X/Y offset
await client.setVideoOffset({ x: 0, y: 0 });
await client.setVideoScaling(false);
console.log(await client.getCurrentVideoSource());
console.log(await client.getVideoSources()); // signal state and supported resolutions
console.log(await client.getHdmiInputResolution());
await client.setHdmiInputResolution({ width: 1920, height: 1080, frameRate: 60 });

// Physical LED canvas; this is independent of the HDMI/Android resolution.
console.log(await client.getLedScreenSize());
console.log(await client.getLedScreenConfiguration()); // offsets and receiving-card regions

// Apply an RCCB extracted from NCP after uploading it to the player.
const ftpPassword = await client.getFtpPassword();
await uploadTaurusFile({
  host: player.address,
  port: player.ftpPort,
  password: ftpPassword,
  remotePath: '/sdcard/gmib/cabinet.bin',
  data: cabinet.binary,
});
await client.applyReceivingCardConfiguration([
  {
    filePath: '/mnt/sdcard/gmib/cabinet.bin',
    md5: '0123456789abcdef0123456789abcdef',
    port: 0,
    receivingCard: 0,
  },
]);
console.log(await client.getReceivingCardConfigProgress());

// Firmware ZIPs embedded in an NCP can be uploaded through the same FTP service.
console.log(await client.getReceivingCardVersion({ port: 0, receivingCard: 0 }));
await client.applyReceivingCardFirmware(
  '/mnt/sdcard/gmib/Data_A10s.zip',
  [{ port: 0, receivingCard: 0 }],
  { onProgress: console.log },
);

// Return to the internal Taurus player (asynchronous playback).
await client.setAsynchronousMode();

client.close();
```

`setSynchronousMode()` uses manual HDMI selection by default, so a disappearing HDMI signal does
not silently switch the screen back to stored content. Pass `fallbackToInternal: true` to use the
ViPlex "HDMI preferred" policy. `setVideoConfiguration()` performs a read-modify-write and preserves
the existing source schedule while changing only the requested mode, source, scaling or offset.

The HDMI input resolution is the EDID mode Taurus advertises to the connected source (for example,
GMIB). Choose a value reported for HDMI by `getVideoSources()`; unsupported modes are rejected by
the player. It is not the physical LED screen size. Use `getLedScreenSize()` for the physical pixel
dimensions, or `getLedScreenConfiguration()` when the configured offsets and receiving-card layout
are also needed. A complete configuration can be written back with `setLedScreenConfiguration()`.
This replaces the receiving-card topology, so start from a configuration read from the same player
and change it only when the complete new layout is known.

`getFtpPassword()` reads the file-transfer password over the authenticated management connection.
`uploadTaurusFile()` then uploads through the regular Taurus FTP port over LAN or USB RNDIS, so ADB
is not required. FTP paths are relative to the Taurus `/mnt` directory: for example,
`/sdcard/gmib/cabinet.bin` is passed to ScreenService as `/mnt/sdcard/gmib/cabinet.bin`.

`applyReceivingCardConfiguration()` uses the Taurus ScreenService path and accepts a device-local
`.bin` or `.rcfgx` file plus its MD5. Targets are explicit and zero-based (`port` and
`receivingCard`). The call starts an asynchronous operation; poll
`getReceivingCardConfigProgress()` until it reports `Completed` or `Failed`.

`getReceivingCardVersion()` and `getReceivingCardVersions()` return the detailed receiving-card
model ID together with the live FPGA and MCU versions reported by monitoring. Firmware targets are
explicit and zero-based. `applyReceivingCardFirmware()` performs the long-running ScreenService
request and polls `getReceivingCardFirmwareProgress()` concurrently, reporting the current card,
file and overall percentage. These operations use only the authenticated management connection and
FTP; ADB is not required.

The device password is never discovered or stored by the library. Pass it explicitly at login.
TLS certificate validation defaults to off because Taurus devices use a self-signed certificate;
set `rejectUnauthorized` and `ca` when the device has a trusted certificate.

Discovery sends the binary Taurus search request to UDP port 16601. Legacy NovaStar discovery on
UDP port 3800 only returns an `rpProMI:` marker and does not contain the serial number required for
login. The register protocol on TCP port 5200 remains available separately through `@novastar/net`.

## Calibration from LED modules

After `login`, use `client.inspectReceivingCardCalibration(targets)` to inspect module flash.
Use `client.loadReceivingCardCalibration(targets, { allowPartial, onProgress })` to load normal
coefficients from module flash and persist them in receiving-card SPI flash. Targets use zero-based
`port` and `receivingCard` indices. The client validates the current topology and card availability,
checks every target before loading, waits for readiness after each phase, and maintains the
management session while using a private TCP/5200 connection. No USB or ADB connection is required.

Missing modules block loading unless `allowPartial: true` is explicitly supplied; a card with no
modules always fails. A partial set does not guarantee calibration of the complete cabinet.
The operation replaces receiving-card coefficients, never module flash. Apply suitable cabinet
parameters first. Low-brightness and multilayer tables are not included. Do not interrupt power.
Avoid concurrent configuration or firmware operations on the same player.
