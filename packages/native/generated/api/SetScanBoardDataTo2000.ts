import { ErrorType, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    SetScanBoardDataTo2000(
      addr: number,
      portIndex: number,
      scanIndex: number,
      data: number[] | Buffer,
      length: number
    ): Promise<void>;
    trySetScanBoardDataTo2000(
      addr: number,
      portIndex: number,
      scanIndex: number,
      data: number[] | Buffer,
      length: number
    ): Promise<ErrorType | null>;
  }
}
export default function createSetScanBoardDataTo2000(
  addr: number,
  portIndex: number,
  scanIndex: number,
  data: number[] | Buffer,
  length: number
): Request {
  if (data.length !== length) throw new TypeError(`Invalid buffer size: ${data.length}`);
  const req = new Request(data, false, 'SetScanBoardDataTo2000');
  req.destination = addr;
  req.deviceType = 1;
  req.port = portIndex;
  req.rcvIndex = scanIndex;
  req.address = AddressMapping.SDKReadOrWriteAddr;
  return req;
}
Session.prototype.SetScanBoardDataTo2000 = async function SetScanBoardDataTo2000(
  this: Session,
  addr: number,
  portIndex: number,
  scanIndex: number,
  data: number[] | Buffer,
  length: number
): Promise<void> {
  const req = createSetScanBoardDataTo2000(addr, portIndex, scanIndex, data, length);
  await this.connection.send(req);
};
Session.prototype.trySetScanBoardDataTo2000 = async function trySetScanBoardDataTo2000(
  this: Session,
  addr: number,
  portIndex: number,
  scanIndex: number,
  data: number[] | Buffer,
  length: number
): Promise<ErrorType | null> {
  const req = createSetScanBoardDataTo2000(addr, portIndex, scanIndex, data, length);
  return (await this.connection.trySend(req))?.ack ?? null;
};
