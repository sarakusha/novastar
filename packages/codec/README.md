# @novastar/codec

Codec for control and monitoring of controllers manufactured by NovaStar.

## Installation

Using npm:

```bash
$ npm install --save @novastar/codec@next
```
or yarn:

```bash
$ yarn add @novastar/codec@next
```

## Usage

1. First, we need to create a connection, for this we need a stream
   (it can be a serial port or TCP socket, for serial see [@novastar/serial](https://www.npmjs.com/package/@novastar/serial))
   
```ts
import { connect, Socket } from 'net';
import { Request, Connection, DeviceType, Session, DisplayMode } from '@novastar/codec';
import SerialPort from 'serialport';

let connection;

const socket = connect(5200, () => {
  connection = new Connection(socket);
})

// or

const port = new SerialPort('COM11', { baudRate: 115200 }, () => {
  connection = new Connection(port);
})
```

2. Using this connection you can send requests to devices (Sending cards/Receiving cards/Function cards)
   and receive responses
```ts
const req = new Request(1);
req.deviceType = DeviceType.ReceivingCard;
req.address = 0x02000001;
req.port = 0;
const { data: [value] } = await connection.send(req);
console.log(`Brightness on the first receiving card connected to 0 port is ${value}`);
```
3. Or you can create a session that implements some API methods

```ts
const session = new Session(connection);
// Note that all operations are asynchronous,
// you should not start the next operation
// without waiting for the previous one to complete.
const brightness = await session.getBrightness(0);
await session.setDisplayMode(DisplayMode.Blue);
```

4. Close the connection
```ts
connection.close() // or session.close()
```

## API
```ts
/**
 * Destination device type
 */
export enum DeviceType {
  /**
   * Devices connected to the COM/USB port
   */
  SendingCard,
  ReceivingCard,
  FunctionCard,
}

export enum IO {
  Read,
  Write,
}

export enum ErrorType {
  Succeeded,
  Timeout,
  RequestError,
  AcknowledgeError,
  InvalidCommand,
}

export enum DisplayMode {
  Video,
  Red = 2,
  Green,
  Blue,
  White,
  HorizonLine,
  VerticalLine,
  InclineLine,
  Grayscale,
  Loop,
}

export enum Calibration {
  Color,
  Brightness,
}

export const REQUEST = 0xaa55;

export const RESPONSE = 0x55aa;

export const COMPUTER = 0xfe;

```

### Packet

Properties:
* `head` - must be `REQUEST` or `RESPONSE`
* `ack` - result of the operation (for the request is always 0), type: `ErrorType`
* `serno` or `serialNumber` - sequential number of the request,
  and the corresponding response (set automatically)
* `sourceAddress` or `source` - source address (must be `COMPUTER` for requests)
* `destinationAddress` or `destination` - destination address (must be `COMPUTER` for responses)
* `deviceType` - destination device type for requests and source type for responses , type: `DeviceType`
* `portAddress` or `port` - output port address of the sending card
* `boardAddress` or `rcvIndex` - index of the receiving card
* `code` or `io` - operation type: read or write, type: `IO`
* `registerUnitAddress` or `address` - register address
* `length` - length of transmitted/requested `data`
* `data` - transmitted/requested data
* `crc` - check sum (set automatically)
