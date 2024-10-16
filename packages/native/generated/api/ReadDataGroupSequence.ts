import { decodeUIntLE, Packet, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    ReadDataGroupSequence(addr: number, portAddr: number, scanBoardAddr: number): Promise<number>;
    tryReadDataGroupSequence(
      addr: number,
      portAddr: number,
      scanBoardAddr: number
    ): Promise<Packet | null>;
  }
}
export default function createReadDataGroupSequence(
  addr: number,
  portAddr: number,
  scanBoardAddr: number
): Request {
  const req = new Request(AddressMapping.DataGroupSequenceOccupancy, 'ReadDataGroupSequence');
  req.destination = addr;
  req.deviceType = 1;
  req.port = portAddr;
  req.rcvIndex = scanBoardAddr;
  req.address = AddressMapping.DataGroupSequenceAddr;
  return req;
}
Session.prototype.ReadDataGroupSequence = async function ReadDataGroupSequence(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number
): Promise<number> {
  const req = createReadDataGroupSequence(addr, portAddr, scanBoardAddr);
  return decodeUIntLE(await this.connection.send(req));
};
Session.prototype.tryReadDataGroupSequence = async function tryReadDataGroupSequence(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number
): Promise<Packet | null> {
  const req = createReadDataGroupSequence(addr, portAddr, scanBoardAddr);
  return this.connection.trySend(req);
};
