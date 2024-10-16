import { encodeUIntLE, ErrorType, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    SetEthernetPortScannerX(
      addr: number,
      bBroadcast: boolean,
      ethernetPortScannerX: number,
      portIndex: number,
      scannerIndex: number
    ): Promise<void>;
    trySetEthernetPortScannerX(
      addr: number,
      ethernetPortScannerX: number,
      portIndex: number,
      scannerIndex: number
    ): Promise<ErrorType | null>;
  }
}
export default function createSetEthernetPortScannerX<Broadcast extends boolean>(
  addr: number,
  bBroadcast: Broadcast,
  ethernetPortScannerX: number,
  portIndex: number,
  scannerIndex: number
): Request<Broadcast> {
  const $data = encodeUIntLE(ethernetPortScannerX, AddressMapping.EthernetPortScannerXOccupancy);
  const req = new Request($data, bBroadcast, 'SetEthernetPortScannerX');
  req.destination = addr;
  req.address =
    AddressMapping.EthernetPortOccupancy * portIndex +
    AddressMapping.EthernetPortScannerXAddr +
    (AddressMapping.EthernetPortScannerXOccupancy + AddressMapping.EthernetPortScannerYOccupancy) *
      scannerIndex +
    AddressMapping.EthernetPortScannerXOccupancy;
  return req;
}
Session.prototype.SetEthernetPortScannerX = async function SetEthernetPortScannerX(
  this: Session,
  addr: number,
  bBroadcast: boolean,
  ethernetPortScannerX: number,
  portIndex: number,
  scannerIndex: number
): Promise<void> {
  const req = createSetEthernetPortScannerX(
    addr,
    bBroadcast,
    ethernetPortScannerX,
    portIndex,
    scannerIndex
  );
  await this.connection.send(req);
};
Session.prototype.trySetEthernetPortScannerX = async function trySetEthernetPortScannerX(
  this: Session,
  addr: number,
  ethernetPortScannerX: number,
  portIndex: number,
  scannerIndex: number
): Promise<ErrorType | null> {
  const req = createSetEthernetPortScannerX(
    addr,
    false,
    ethernetPortScannerX,
    portIndex,
    scannerIndex
  );
  return (await this.connection.trySend(req))?.ack ?? null;
};
