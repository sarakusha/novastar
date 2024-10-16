import { decodeUIntLE, Packet, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    ReadBrightDarkLineFixState(
      addr: number,
      portAddr: number,
      scanBoardAddr: number
    ): Promise<number>;
    tryReadBrightDarkLineFixState(
      addr: number,
      portAddr: number,
      scanBoardAddr: number
    ): Promise<Packet | null>;
  }
}
export default function createReadBrightDarkLineFixState(
  addr: number,
  portAddr: number,
  scanBoardAddr: number
): Request {
  const req = new Request(
    AddressMapping.BrightDarkLineFixStateOccupancy,
    'ReadBrightDarkLineFixState'
  );
  req.destination = addr;
  req.deviceType = 1;
  req.port = portAddr;
  req.rcvIndex = scanBoardAddr;
  req.address = AddressMapping.BrightDarkLineFixStateAddr;
  return req;
}
Session.prototype.ReadBrightDarkLineFixState = async function ReadBrightDarkLineFixState(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number
): Promise<number> {
  const req = createReadBrightDarkLineFixState(addr, portAddr, scanBoardAddr);
  return decodeUIntLE(await this.connection.send(req));
};
Session.prototype.tryReadBrightDarkLineFixState = async function tryReadBrightDarkLineFixState(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number
): Promise<Packet | null> {
  const req = createReadBrightDarkLineFixState(addr, portAddr, scanBoardAddr);
  return this.connection.trySend(req);
};
