import { ErrorType, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    SetScanner_DMPM(
      addr: number,
      portAddr: number,
      scanBoardAddr: number,
      bBroadcast: boolean,
      DMPM: number[] | Buffer
    ): Promise<void>;
    trySetScanner_DMPM(
      addr: number,
      portAddr: number,
      scanBoardAddr: number,
      DMPM: number[] | Buffer
    ): Promise<ErrorType | null>;
  }
}
export default function createSetScanner_DMPM<Broadcast extends boolean>(
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  bBroadcast: Broadcast,
  DMPM: number[] | Buffer
): Request<Broadcast> {
  if (DMPM.length !== 0) throw new TypeError(`Invalid buffer size: ${DMPM.length}`);
  const req = new Request(DMPM, bBroadcast, 'SetScanner_DMPM');
  req.destination = addr;
  req.deviceType = 1;
  req.port = portAddr;
  req.rcvIndex = scanBoardAddr;
  req.address = AddressMapping.Scanner_DmPMAAddr;
  return req;
}
Session.prototype.SetScanner_DMPM = async function SetScanner_DMPM(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  bBroadcast: boolean,
  DMPM: number[] | Buffer
): Promise<void> {
  const req = createSetScanner_DMPM(addr, portAddr, scanBoardAddr, bBroadcast, DMPM);
  await this.connection.send(req);
};
Session.prototype.trySetScanner_DMPM = async function trySetScanner_DMPM(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  DMPM: number[] | Buffer
): Promise<ErrorType | null> {
  const req = createSetScanner_DMPM(addr, portAddr, scanBoardAddr, false, DMPM);
  return (await this.connection.trySend(req))?.ack ?? null;
};
