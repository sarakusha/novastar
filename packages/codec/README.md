# @novastar/codec

Core API for communication with devices using *NovaStar* protocol.

Go to [API](https://sarakusha.github.io/novastar/modules/_novastar_codec.html) documentation.

## Installation

Using npm:

```bash
npm install --save @novastar/codec@next
```

or yarn:

```bash
yarn add @novastar/codec@next
```

## Usage

1. First, we need to create a connection, for this we need a stream
   (it can be a serial port or TCP socket)

```ts
import { connect, Socket } from 'net';
import SerialPort from 'serialport';
import { Request, Connection, DeviceType } from '@novastar/codec';

let connection;

// TCP socket
const socket = connect(5200, () => {
  connection = new Connection(socket);
})

// Serial port
const port = new SerialPort('COM11', { baudRate: 115200 }, () => {
  connection = new Connection(port);
})
```

It is recommended to use packages [@novastar/serial](https://www.npmjs.com/package/@novastar/serial) and [@novastar/net](https://www.npmjs.com/package/@novastar/net). They will contain helper methods to find connected devices

2. Using this connection you can send requests to devices (Sending cards/Receiving cards/Function cards)
   and receive responses

```ts
// Create a request to read a single byte
const readReq = new Request(1);
readReq.deviceType = DeviceType.ReceivingCard;
readReq.address = 0x02000001;
readReq.port = 0;
const { data: [value] } = await connection.send(readReq);
console.log(`Brightness on the first receiving card connected to 0 port is ${value}`);

// And this way you can write data to the device
const writeReq = new Request([255]);
writeReq.deviceType = DeviceType.ReceivingCard;
writeReq.address = 0x02000001;
await connection.send(writeReq);
```

3. Or you can create a session that implements some API methods.
   Since the native API contains more than 1000 methods, not all of which you will use,
   you can include the methods you need. See [@novastar/native](https://www.npmjs.com/package/@novastar/native) for details.

```ts
import { Session } from '@novastar/codec';
import '@novastar/native/build/main/generated/api/ReadGlobalBrightness';
import '@novastar/native/build/main/generated/api/SetGlobalBrightness';

const session = new Session(connection);
const screenIndex = 0;
const portIndex = 0;
const receivingCardIndex = 0;
// If `broadcast` is `true`, then there is no need to wait for an answer.
const broadcast = false;
const newBrightness = 255;
const currentBrightness = await session.ReadGlobalBrightness(screenIndex, portIndex, receivingCardIndex);
await session.SetGlobalBrightness(screenIndex, portIndex, receivingCardIndex, broadcast, newBrightness);
```

4. Close the connection

```ts
connection.close() // or session.close()
```
