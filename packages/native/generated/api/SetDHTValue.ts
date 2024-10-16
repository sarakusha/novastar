import { ErrorType, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    SetDHTValue(
      addr: number,
      portAddr: number,
      scanBoardAddr: number,
      bBroadcast: boolean,
      dht: number
    ): Promise<void>;
    trySetDHTValue(
      addr: number,
      portAddr: number,
      scanBoardAddr: number,
      dht: number
    ): Promise<ErrorType | null>;
  }
}
export default function createSetDHTValue<Broadcast extends boolean>(
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  bBroadcast: Broadcast,
  dht: number
): Request<Broadcast> {
  const req = new Request([dht], bBroadcast, 'SetDHTValue');
  req.destination = addr;
  req.deviceType = 1;
  req.port = portAddr;
  req.rcvIndex = scanBoardAddr;
  req.address = AddressMapping.DHTAddr;
  return req;
}
Session.prototype.SetDHTValue = async function SetDHTValue(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  bBroadcast: boolean,
  dht: number
): Promise<void> {
  const req = createSetDHTValue(addr, portAddr, scanBoardAddr, bBroadcast, dht);
  await this.connection.send(req);
};
Session.prototype.trySetDHTValue = async function trySetDHTValue(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  dht: number
): Promise<ErrorType | null> {
  const req = createSetDHTValue(addr, portAddr, scanBoardAddr, false, dht);
  return (await this.connection.trySend(req))?.ack ?? null;
};
