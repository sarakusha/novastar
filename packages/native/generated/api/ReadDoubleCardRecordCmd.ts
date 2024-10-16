import { decodeUIntLE, Packet, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    ReadDoubleCardRecordCmd(addr: number, portAddr: number, scanBoardAddr: number): Promise<number>;
    tryReadDoubleCardRecordCmd(
      addr: number,
      portAddr: number,
      scanBoardAddr: number
    ): Promise<Packet | null>;
  }
}
export default function createReadDoubleCardRecordCmd(
  addr: number,
  portAddr: number,
  scanBoardAddr: number
): Request {
  const req = new Request(
    AddressMapping.DoubleModelCardSpaceRecordCmdOccupancy,
    'ReadDoubleCardRecordCmd'
  );
  req.destination = addr;
  req.deviceType = 1;
  req.port = portAddr;
  req.rcvIndex = scanBoardAddr;
  req.address = AddressMapping.DoubleModelCardSpaceRecordCmd;
  return req;
}
Session.prototype.ReadDoubleCardRecordCmd = async function ReadDoubleCardRecordCmd(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number
): Promise<number> {
  const req = createReadDoubleCardRecordCmd(addr, portAddr, scanBoardAddr);
  return decodeUIntLE(await this.connection.send(req));
};
Session.prototype.tryReadDoubleCardRecordCmd = async function tryReadDoubleCardRecordCmd(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number
): Promise<Packet | null> {
  const req = createReadDoubleCardRecordCmd(addr, portAddr, scanBoardAddr);
  return this.connection.trySend(req);
};
