import { decodeUIntLE, Packet, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    ReadEthernetPortScannerX(
      addr: number,
      portIndex: number,
      scannerIndex: number
    ): Promise<number>;
    tryReadEthernetPortScannerX(
      addr: number,
      portIndex: number,
      scannerIndex: number
    ): Promise<Packet | null>;
  }
}
export default function createReadEthernetPortScannerX(
  addr: number,
  portIndex: number,
  scannerIndex: number
): Request {
  const req = new Request(AddressMapping.EthernetPortScannerXOccupancy, 'ReadEthernetPortScannerX');
  req.destination = addr;
  req.address =
    AddressMapping.EthernetPortOccupancy * portIndex +
    AddressMapping.EthernetPortScannerXAddr +
    (AddressMapping.EthernetPortScannerXOccupancy + AddressMapping.EthernetPortScannerYOccupancy) *
      scannerIndex +
    AddressMapping.EthernetPortScannerXOccupancy;
  return req;
}
Session.prototype.ReadEthernetPortScannerX = async function ReadEthernetPortScannerX(
  this: Session,
  addr: number,
  portIndex: number,
  scannerIndex: number
): Promise<number> {
  const req = createReadEthernetPortScannerX(addr, portIndex, scannerIndex);
  return decodeUIntLE(await this.connection.send(req));
};
Session.prototype.tryReadEthernetPortScannerX = async function tryReadEthernetPortScannerX(
  this: Session,
  addr: number,
  portIndex: number,
  scannerIndex: number
): Promise<Packet | null> {
  const req = createReadEthernetPortScannerX(addr, portIndex, scannerIndex);
  return this.connection.trySend(req);
};
