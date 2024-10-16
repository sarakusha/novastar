import { decodeUIntLE, Packet, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    ReadEthernetPortScannerY(
      addr: number,
      portIndex: number,
      scannerIndex: number
    ): Promise<number>;
    tryReadEthernetPortScannerY(
      addr: number,
      portIndex: number,
      scannerIndex: number
    ): Promise<Packet | null>;
  }
}
export default function createReadEthernetPortScannerY(
  addr: number,
  portIndex: number,
  scannerIndex: number
): Request {
  const req = new Request(AddressMapping.EthernetPortScannerYOccupancy, 'ReadEthernetPortScannerY');
  req.destination = addr;
  req.address =
    AddressMapping.EthernetPortOccupancy * portIndex +
    AddressMapping.EthernetPortScannerYAddr +
    AddressMapping.EthernetPortScannerYOccupancy +
    (AddressMapping.EthernetPortScannerXOccupancy + AddressMapping.EthernetPortScannerYOccupancy) *
      scannerIndex;
  return req;
}
Session.prototype.ReadEthernetPortScannerY = async function ReadEthernetPortScannerY(
  this: Session,
  addr: number,
  portIndex: number,
  scannerIndex: number
): Promise<number> {
  const req = createReadEthernetPortScannerY(addr, portIndex, scannerIndex);
  return decodeUIntLE(await this.connection.send(req));
};
Session.prototype.tryReadEthernetPortScannerY = async function tryReadEthernetPortScannerY(
  this: Session,
  addr: number,
  portIndex: number,
  scannerIndex: number
): Promise<Packet | null> {
  const req = createReadEthernetPortScannerY(addr, portIndex, scannerIndex);
  return this.connection.trySend(req);
};
