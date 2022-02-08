# @novastar/serial

Serial binding for [@novastar/codec](https://www.npmjs.com/package/@novastar/codec).

Go to [API](https://sarakusha.github.io/novastar/modules/_novastar_serial.html) documentation.

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
import { Request } from '@novastar/codec';
import serial, { findSendingCards } from '@novastar/serial';

const [port] = await findSendingCards();
const session = await serial.open(port.path);
const readReq = new Request(1);
readReq.deviceType = DeviceType.ReceivingCard;
readReq.address = 0x02000001;
readReq.port = 0;
const { data: [value] } = await session.connection.send(readReq);

// Close all serial sessions
serial.release();
```

The search for connected devices is carried out by the VID/PID pair.
At the initial stage, it contains a pair for [MCTRL300](https://www.novastar.tech/products/controller/mctrl300/): ['10c4', 'ea60'].
Using the [API](https://sarakusha.github.io/novastar/modules/_novastar_serial.html), you can change the list of known devices.
