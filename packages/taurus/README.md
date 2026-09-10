# @novastar/taurus

<!-- cspell:ignore EDID GMIB -->

Node.js client for the high-level management protocol used by NovaStar Taurus multimedia players.
It complements the register protocol on TCP port 5200: this package connects to the player service
on TCP port 16606 (TLS when privacy mode is enabled).

```ts
import { discoverTaurusPlayers, TaurusClient } from '@novastar/taurus';

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

The device password is never discovered or stored by the library. Pass it explicitly at login.
TLS certificate validation defaults to off because Taurus devices use a self-signed certificate;
set `rejectUnauthorized` and `ca` when the device has a trusted certificate.

Discovery sends the binary Taurus search request to UDP port 16601. Legacy NovaStar discovery on
UDP port 3800 only returns an `rpProMI:` marker and does not contain the serial number required for
login. The register protocol on TCP port 5200 remains available separately through `@novastar/net`.
