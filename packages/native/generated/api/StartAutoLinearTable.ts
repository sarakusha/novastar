import { encodeUIntLE, ErrorType, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    StartAutoLinearTable(
      addr: number,
      portAddr: number,
      scanBoardAddr: number,
      bBroadcast: boolean
    ): Promise<void>;
    tryStartAutoLinearTable(
      addr: number,
      portAddr: number,
      scanBoardAddr: number
    ): Promise<ErrorType | null>;
  }
}
export default function createStartAutoLinearTable<Broadcast extends boolean>(
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  bBroadcast: Broadcast
): Request<Broadcast> {
  const $data = encodeUIntLE(1, AddressMapping.StartAutoLinearTableOccupancy);
  const req = new Request($data, bBroadcast, 'StartAutoLinearTable');
  req.destination = addr;
  req.deviceType = 1;
  req.port = portAddr;
  req.rcvIndex = scanBoardAddr;
  req.address = AddressMapping.StartAutoLinearTableAddr;
  return req;
}
Session.prototype.StartAutoLinearTable = async function StartAutoLinearTable(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  bBroadcast: boolean
): Promise<void> {
  const req = createStartAutoLinearTable(addr, portAddr, scanBoardAddr, bBroadcast);
  await this.connection.send(req);
};
Session.prototype.tryStartAutoLinearTable = async function tryStartAutoLinearTable(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number
): Promise<ErrorType | null> {
  const req = createStartAutoLinearTable(addr, portAddr, scanBoardAddr, false);
  return (await this.connection.trySend(req))?.ack ?? null;
};
