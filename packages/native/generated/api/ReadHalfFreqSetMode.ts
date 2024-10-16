import { decodeUIntLE, Packet, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    ReadHalfFreqSetMode(addr: number, portAddr: number, scanBoardAddr: number): Promise<number>;
    tryReadHalfFreqSetMode(
      addr: number,
      portAddr: number,
      scanBoardAddr: number
    ): Promise<Packet | null>;
  }
}
export default function createReadHalfFreqSetMode(
  addr: number,
  portAddr: number,
  scanBoardAddr: number
): Request {
  const req = new Request(AddressMapping.HalfFreqSetModeOccupancy, 'ReadHalfFreqSetMode');
  req.destination = addr;
  req.deviceType = 1;
  req.port = portAddr;
  req.rcvIndex = scanBoardAddr;
  req.address = AddressMapping.HalfFreqSetModeAddr;
  return req;
}
Session.prototype.ReadHalfFreqSetMode = async function ReadHalfFreqSetMode(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number
): Promise<number> {
  const req = createReadHalfFreqSetMode(addr, portAddr, scanBoardAddr);
  return decodeUIntLE(await this.connection.send(req));
};
Session.prototype.tryReadHalfFreqSetMode = async function tryReadHalfFreqSetMode(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number
): Promise<Packet | null> {
  const req = createReadHalfFreqSetMode(addr, portAddr, scanBoardAddr);
  return this.connection.trySend(req);
};
