# @novastar/screen

<!-- cspell:ignore Configurator RCCB reseiving -->

Go to [API](https://sarakusha.github.io/novastar/modules/_novastar_screen.html) documentation.

## Installation:

Using npm:

```bash
$ npm install --save @novastar/screen@latest
```

or yarn:

```bash
$ yarn add @novastar/screen@next
```

## NovaLCT configuration files

`@novastar/screen` can inspect and decode current NovaLCT cabinet (`.ncp`)
packages. Use `loadNcpConfigInfo` for metadata only, or `loadNcpConfig` to
extract the available cabinets, original RCCB binaries and register-write sequences:

```ts
import { loadNcpConfig, loadNcpConfigInfo, sendNcpCabinetConfig } from '@novastar/screen';

const ncp = loadNcpConfigInfo('cabinet.ncp');
const decoded = await loadNcpConfig('cabinet.ncp');
console.log(decoded.cabinets[0].binary); // device-local Taurus ScreenService input
console.log(decoded.cabinets[0].firmware?.info); // model, package version and MCU/FPGA files
await sendNcpCabinetConfig(
  session,
  decoded.cabinets[0],
  {
    sender: 0,
    port: 0,
    receivingCard: 0,
  },
  {
    allReceivingCards: true,
    readinessTargets: [
      { sender: 0, port: 0, receivingCard: 0 },
      { sender: 0, port: 1, receivingCard: 0 },
    ],
  },
);
```

NovaLCT screen topology (`.scr`) files can be decoded separately. They describe the screens,
receiving-card regions, sender ports, connection order and offsets, but do not contain the cabinet
scan configuration from an NCP:

```ts
import { loadScreenConfig } from '@novastar/screen';

const topology = loadScreenConfig('screen.scr');
console.log(topology.screens);
```

`sendNcpCabinetConfig` requires an explicit receiving-card address for readiness polling. By default
it writes only to that address. Set `allReceivingCards` to reproduce NovaLCT's **All Rv Cards** mode:
parameter writes use the broadcast address, while readiness polling still uses the explicit card.
Pass `readinessTargets` to verify every known receiving card after commands that require polling.
The connection should use 512-byte request chunks to match NovaLCT. The sender honors the command
delays and receiving-card readiness polling encoded in the RCCB; these waits are required for
configurations that contain large mapping tables. Progress callbacks include both parameter and
byte counts and fire after every transport chunk.

It does not flash firmware or multi-mode files embedded in an NCP. When
firmware is present, `decodeNcpConfig` validates its receiving-card model ID and listed files and
exposes both the original ZIP data and parsed metadata as `cabinet.firmware`. Applying that archive
to hardware remains the transport client's responsibility.

## Usage:

```ts
import ScreenConfigurator from '@novastar/screen';
// const ScreenConfigurator = require('@novastar/screen').default

import { findNetDevices, net } from '@novastar/net';
import { findSendingCards, serial } from '@novastar/serial';

async function main() {
  // net
  const [address] = await findNetDevices();
  if (!address) return;
  const session = net.open(address);

  // serial
  const [port] = await findSendingCards();
  const session = await serial.open(port.path);

  const ctrl = new ScreenConfigurator(session);
  await ctrl.reload();
  // Get input DVI signal status
  const hasDVISignalIn = await ctrl.ReadHasDVISignalIn();
  // Request the brightness of the first receiving card on the screen.
  const firstCardBrightness = await ctrl.ReadFirstBrightness();
  for await (let brightness of ctrl.ReadBrightness()) {
    // Request the brightness of all reseiving cards on the screen using a generator.
  }
  // Write the specified brightness value to all receiving cards.
  await ctrl.WriteBrightness(80);
}
```
