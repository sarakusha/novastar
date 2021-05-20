# @novastar/serial

Serial binding for [@novastar/codec](https://www.npmjs.com/package/@novastar/codec).

## Installation

Using npm:

```bash
$ npm install --save @novastar/serial@next
```
or yarn:

```bash
$ yarn add @novastar/serial@next
```

## Usage:

```ts
import serial from '@novastar/serial';

// ...

// You can specify an array of vendor id and product id pairs
// to find suitable devices
const knownDevices: KnownDevices = [
  ['10c4', 'ea60'], // MCTRL300
];
const [port] = await serial.findSendingCards(knownDevices);
const session = await serial.open(port.path);
const brightness = await session.getBrightness();
session.close();

```
