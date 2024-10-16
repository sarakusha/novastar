import { Packet, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    GetScanerFunctionTable(Sender: number, portAddr: number, Scan: number): Promise<Buffer>;
    tryGetScanerFunctionTable(
      Sender: number,
      portAddr: number,
      Scan: number
    ): Promise<Packet | null>;
  }
}
export default function createGetScanerFunctionTable(
  Sender: number,
  portAddr: number,
  Scan: number
): Request {
  const req = new Request(AddressMapping.ScannerFunctionTableOccupancy, 'GetScanerFunctionTable');
  req.destination = Sender;
  req.deviceType = 1;
  req.port = portAddr;
  req.rcvIndex = Scan;
  req.address = AddressMapping.ScannerFunctionTableAddr;
  return req;
}
Session.prototype.GetScanerFunctionTable = async function GetScanerFunctionTable(
  this: Session,
  Sender: number,
  portAddr: number,
  Scan: number
): Promise<Buffer> {
  const req = createGetScanerFunctionTable(Sender, portAddr, Scan);
  return (await this.connection.send(req)).data;
};
Session.prototype.tryGetScanerFunctionTable = async function tryGetScanerFunctionTable(
  this: Session,
  Sender: number,
  portAddr: number,
  Scan: number
): Promise<Packet | null> {
  const req = createGetScanerFunctionTable(Sender, portAddr, Scan);
  return this.connection.trySend(req);
};
