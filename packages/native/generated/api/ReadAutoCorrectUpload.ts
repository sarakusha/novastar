import { decodeUIntLE, Packet, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    ReadAutoCorrectUpload(addr: number, portAddr: number, scanBoardAddr: number): Promise<number>;
    tryReadAutoCorrectUpload(
      addr: number,
      portAddr: number,
      scanBoardAddr: number
    ): Promise<Packet | null>;
  }
}
export default function createReadAutoCorrectUpload(
  addr: number,
  portAddr: number,
  scanBoardAddr: number
): Request {
  const req = new Request(AddressMapping.AutoCorrectUploadOccupancy, 'ReadAutoCorrectUpload');
  req.destination = addr;
  req.deviceType = 1;
  req.port = portAddr;
  req.rcvIndex = scanBoardAddr;
  req.address = AddressMapping.AutoCorrectUploadAddr;
  return req;
}
Session.prototype.ReadAutoCorrectUpload = async function ReadAutoCorrectUpload(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number
): Promise<number> {
  const req = createReadAutoCorrectUpload(addr, portAddr, scanBoardAddr);
  return decodeUIntLE(await this.connection.send(req));
};
Session.prototype.tryReadAutoCorrectUpload = async function tryReadAutoCorrectUpload(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number
): Promise<Packet | null> {
  const req = createReadAutoCorrectUpload(addr, portAddr, scanBoardAddr);
  return this.connection.trySend(req);
};
