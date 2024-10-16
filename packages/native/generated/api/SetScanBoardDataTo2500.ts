import { ErrorType, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    SetScanBoardDataTo2500(
      addr: number,
      portIndex: number,
      scanIndex: number,
      data: number[] | Buffer,
      length: number
    ): Promise<void>;
    trySetScanBoardDataTo2500(
      addr: number,
      portIndex: number,
      scanIndex: number,
      data: number[] | Buffer,
      length: number
    ): Promise<ErrorType | null>;
  }
}
export default function createSetScanBoardDataTo2500(
  addr: number,
  portIndex: number,
  scanIndex: number,
  data: number[] | Buffer,
  length: number
): Request {
  if (data.length !== length) throw new TypeError(`Invalid buffer size: ${data.length}`);
  const req = new Request(data, false, 'SetScanBoardDataTo2500');
  req.destination = addr;
  req.deviceType = 1;
  req.port = portIndex;
  req.rcvIndex = scanIndex;
  req.address = AddressMapping.SDKNewReadOrWriteAddr;
  return req;
}
Session.prototype.SetScanBoardDataTo2500 = async function SetScanBoardDataTo2500(
  this: Session,
  addr: number,
  portIndex: number,
  scanIndex: number,
  data: number[] | Buffer,
  length: number
): Promise<void> {
  const req = createSetScanBoardDataTo2500(addr, portIndex, scanIndex, data, length);
  await this.connection.send(req);
};
Session.prototype.trySetScanBoardDataTo2500 = async function trySetScanBoardDataTo2500(
  this: Session,
  addr: number,
  portIndex: number,
  scanIndex: number,
  data: number[] | Buffer,
  length: number
): Promise<ErrorType | null> {
  const req = createSetScanBoardDataTo2500(addr, portIndex, scanIndex, data, length);
  return (await this.connection.trySend(req))?.ack ?? null;
};
