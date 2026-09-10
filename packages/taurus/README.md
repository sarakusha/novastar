# @novastar/taurus

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
await client.login({sn: player.sn, password: process.env.TAURUS_PASSWORD!});

console.log(await client.getEnvironmentBrightness());
console.log(await client.getBrightness());
await client.setBrightness(50); // volatile by default; does not write flash

client.close();
```

The device password is never discovered or stored by the library. Pass it explicitly at login.
TLS certificate validation defaults to off because Taurus devices use a self-signed certificate;
set `rejectUnauthorized` and `ca` when the device has a trusted certificate.

Discovery sends the binary Taurus search request to UDP port 16601. Legacy NovaStar discovery on
UDP port 3800 only returns an `rpProMI:` marker and does not contain the serial number required for
login. The register protocol on TCP port 5200 remains available separately through `@novastar/net`.
