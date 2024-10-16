import { decodeUIntLE, Packet, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    ReadDoubleEaraseStateCmd(
      addr: number,
      portAddr: number,
      scanBoardAddr: number
    ): Promise<number>;
    tryReadDoubleEaraseStateCmd(
      addr: number,
      portAddr: number,
      scanBoardAddr: number
    ): Promise<Packet | null>;
  }
}
export default function createReadDoubleEaraseStateCmd(
  addr: number,
  portAddr: number,
  scanBoardAddr: number
): Request {
  const req = new Request(
    AddressMapping.DoubleModelCardSpaceNandFlashEaraseOccupancy,
    'ReadDoubleEaraseStateCmd'
  );
  req.destination = addr;
  req.deviceType = 1;
  req.port = portAddr;
  req.rcvIndex = scanBoardAddr;
  req.address = AddressMapping.DoubleModelCardSpaceNandFlashEarase;
  return req;
}
Session.prototype.ReadDoubleEaraseStateCmd = async function ReadDoubleEaraseStateCmd(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number
): Promise<number> {
  const req = createReadDoubleEaraseStateCmd(addr, portAddr, scanBoardAddr);
  return decodeUIntLE(await this.connection.send(req));
};
Session.prototype.tryReadDoubleEaraseStateCmd = async function tryReadDoubleEaraseStateCmd(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number
): Promise<Packet | null> {
  const req = createReadDoubleEaraseStateCmd(addr, portAddr, scanBoardAddr);
  return this.connection.trySend(req);
};
