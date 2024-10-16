import { decodeUIntLE, Packet, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    ReadVoltageOfScanCard(addr: number, portAddr: number, scanBoardAddr: number): Promise<number>;
    tryReadVoltageOfScanCard(
      addr: number,
      portAddr: number,
      scanBoardAddr: number
    ): Promise<Packet | null>;
  }
}
export default function createReadVoltageOfScanCard(
  addr: number,
  portAddr: number,
  scanBoardAddr: number
): Request {
  const req = new Request(
    AddressMapping.Scanner_VoltageOfScanCardOccupancy,
    'ReadVoltageOfScanCard'
  );
  req.destination = addr;
  req.deviceType = 1;
  req.port = portAddr;
  req.rcvIndex = scanBoardAddr;
  req.address = AddressMapping.Scanner_VoltageOfScanCardAddr;
  return req;
}
Session.prototype.ReadVoltageOfScanCard = async function ReadVoltageOfScanCard(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number
): Promise<number> {
  const req = createReadVoltageOfScanCard(addr, portAddr, scanBoardAddr);
  return decodeUIntLE(await this.connection.send(req));
};
Session.prototype.tryReadVoltageOfScanCard = async function tryReadVoltageOfScanCard(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number
): Promise<Packet | null> {
  const req = createReadVoltageOfScanCard(addr, portAddr, scanBoardAddr);
  return this.connection.trySend(req);
};
