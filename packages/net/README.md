# @novastar/net

Net binding for [@novastar/codec](https://www.npmjs.com/package/@novastar/codec).

Go to [API](https://sarakusha.github.io/novastar/modules/_novastar_net.html) documentation.

## Installation

Using npm:

```bash
$ npm install --save @novastar/net@next
```
or yarn:

```bash
$ yarn add @novastar/net@next
```

## Usage:

```ts
import net, { findNetDevices } from '@novastar/net';

const [address] = await findNetDevices();
if (address) {
  session = net.open(address);
}

const writeReq = new Request([255]);
writeReq.deviceType = DeviceType.ReceivingCard;
writeReq.address = 0x02000001;
await session.connection.send(writeReq);

// Close all network sessions
net.release();
```
