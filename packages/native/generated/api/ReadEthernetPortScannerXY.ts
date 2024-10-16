import { Packet, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    ReadEthernetPortScannerXY(
      addr: number,
      portIndex: number,
      scannerIndex: number
    ): Promise<Buffer>;
    tryReadEthernetPortScannerXY(
      addr: number,
      portIndex: number,
      scannerIndex: number
    ): Promise<Packet | null>;
  }
}
export default function createReadEthernetPortScannerXY(
  addr: number,
  portIndex: number,
  scannerIndex: number
): Request {
  const req = new Request(
    AddressMapping.EthernetPortScannerXOccupancy + AddressMapping.EthernetPortScannerYOccupancy,
    'ReadEthernetPortScannerXY'
  );
  req.destination = addr;
  req.address =
    AddressMapping.EthernetPortOccupancy * portIndex +
    AddressMapping.EthernetPortScannerXAddr +
    (AddressMapping.EthernetPortScannerXOccupancy + AddressMapping.EthernetPortScannerYOccupancy) *
      scannerIndex;
  return req;
}
Session.prototype.ReadEthernetPortScannerXY = async function ReadEthernetPortScannerXY(
  this: Session,
  addr: number,
  portIndex: number,
  scannerIndex: number
): Promise<Buffer> {
  const req = createReadEthernetPortScannerXY(addr, portIndex, scannerIndex);
  return (await this.connection.send(req)).data;
};
Session.prototype.tryReadEthernetPortScannerXY = async function tryReadEthernetPortScannerXY(
  this: Session,
  addr: number,
  portIndex: number,
  scannerIndex: number
): Promise<Packet | null> {
  const req = createReadEthernetPortScannerXY(addr, portIndex, scannerIndex);
  return this.connection.trySend(req);
};
