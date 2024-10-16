import { ErrorType, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    SetScanner_DMWSP(
      addr: number,
      portAddr: number,
      scanBoardAddr: number,
      bBroadcast: boolean,
      DMWSP: number[] | Buffer
    ): Promise<void>;
    trySetScanner_DMWSP(
      addr: number,
      portAddr: number,
      scanBoardAddr: number,
      DMWSP: number[] | Buffer
    ): Promise<ErrorType | null>;
  }
}
export default function createSetScanner_DMWSP<Broadcast extends boolean>(
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  bBroadcast: Broadcast,
  DMWSP: number[] | Buffer
): Request<Broadcast> {
  if (DMWSP.length !== 0) throw new TypeError(`Invalid buffer size: ${DMWSP.length}`);
  const req = new Request(DMWSP, bBroadcast, 'SetScanner_DMWSP');
  req.destination = addr;
  req.deviceType = 1;
  req.port = portAddr;
  req.rcvIndex = scanBoardAddr;
  req.address = AddressMapping.Scanner_DmWSPAAddr;
  return req;
}
Session.prototype.SetScanner_DMWSP = async function SetScanner_DMWSP(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  bBroadcast: boolean,
  DMWSP: number[] | Buffer
): Promise<void> {
  const req = createSetScanner_DMWSP(addr, portAddr, scanBoardAddr, bBroadcast, DMWSP);
  await this.connection.send(req);
};
Session.prototype.trySetScanner_DMWSP = async function trySetScanner_DMWSP(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  DMWSP: number[] | Buffer
): Promise<ErrorType | null> {
  const req = createSetScanner_DMWSP(addr, portAddr, scanBoardAddr, false, DMWSP);
  return (await this.connection.trySend(req))?.ack ?? null;
};
