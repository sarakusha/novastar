# @novastar/screen

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

`@novastar/screen` can inspect NovaLCT cabinet (`.ncp`) packages without
decrypting or modifying their payload. Use `loadNcpConfigInfo` with a file path
or `inspectNcpConfig` when the file is already available as a `Buffer`:

```ts
import { inspectNcpConfig, loadNcpConfigInfo } from '@novastar/screen';

const ncp = loadNcpConfigInfo('cabinet.ncp');

// Inspect a file that has already been uploaded to the application.
const uploadedNcp = inspectNcpConfig(ncpBuffer);
```

NCP payloads are encrypted by NovaLCT, so inspection validates only the outer
container and leaves the payload untouched. These functions do not write to
connected hardware.

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
