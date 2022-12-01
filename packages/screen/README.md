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
## Usage:

```ts
import ScreenConfigurator from '@novastar/screen/ScreenConfigurator';
import net, { findNetDevices } from '@novastar/net';
import serial, { findSendingCards } from '@novastar/serial';

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
