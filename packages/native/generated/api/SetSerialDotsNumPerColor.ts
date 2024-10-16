import { encodeUIntLE, ErrorType, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    SetSerialDotsNumPerColor(
      addr: number,
      portAddr: number,
      scanBoardAddr: number,
      bBroadcast: boolean,
      serialDotsNumPerColor: number
    ): Promise<void>;
    trySetSerialDotsNumPerColor(
      addr: number,
      portAddr: number,
      scanBoardAddr: number,
      serialDotsNumPerColor: number
    ): Promise<ErrorType | null>;
  }
}
export default function createSetSerialDotsNumPerColor<Broadcast extends boolean>(
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  bBroadcast: Broadcast,
  serialDotsNumPerColor: number
): Request<Broadcast> {
  const $data = encodeUIntLE(serialDotsNumPerColor, AddressMapping.SerialDotsNumPerColorOccupancy);
  const req = new Request($data, bBroadcast, 'SetSerialDotsNumPerColor');
  req.destination = addr;
  req.deviceType = 1;
  req.port = portAddr;
  req.rcvIndex = scanBoardAddr;
  req.address = AddressMapping.SerialDotsNumPerColorAddr;
  return req;
}
Session.prototype.SetSerialDotsNumPerColor = async function SetSerialDotsNumPerColor(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  bBroadcast: boolean,
  serialDotsNumPerColor: number
): Promise<void> {
  const req = createSetSerialDotsNumPerColor(
    addr,
    portAddr,
    scanBoardAddr,
    bBroadcast,
    serialDotsNumPerColor
  );
  await this.connection.send(req);
};
Session.prototype.trySetSerialDotsNumPerColor = async function trySetSerialDotsNumPerColor(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  serialDotsNumPerColor: number
): Promise<ErrorType | null> {
  const req = createSetSerialDotsNumPerColor(
    addr,
    portAddr,
    scanBoardAddr,
    false,
    serialDotsNumPerColor
  );
  return (await this.connection.trySend(req))?.ack ?? null;
};
