import { encodeUIntLE, ErrorType, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    SetEthernetPortScannerXY(
      addr: number,
      bBroadcast: boolean,
      ethernetPortScannerX: number,
      ethernetPortScannerY: number,
      portIndex: number,
      scannerIndex: number
    ): Promise<void>;
    trySetEthernetPortScannerXY(
      addr: number,
      ethernetPortScannerX: number,
      ethernetPortScannerY: number,
      portIndex: number,
      scannerIndex: number
    ): Promise<ErrorType | null>;
  }
}
export default function createSetEthernetPortScannerXY<Broadcast extends boolean>(
  addr: number,
  bBroadcast: Broadcast,
  ethernetPortScannerX: number,
  ethernetPortScannerY: number,
  portIndex: number,
  scannerIndex: number
): Request<Broadcast> {
  const $data = encodeUIntLE(
    (ethernetPortScannerX << 16) + ethernetPortScannerY,
    AddressMapping.EthernetPortScannerXOccupancy + AddressMapping.EthernetPortScannerYOccupancy
  );
  const req = new Request($data, bBroadcast, 'SetEthernetPortScannerXY');
  req.destination = addr;
  req.address =
    AddressMapping.EthernetPortOccupancy * portIndex +
    AddressMapping.EthernetPortScannerXAddr +
    (AddressMapping.EthernetPortScannerXOccupancy + AddressMapping.EthernetPortScannerYOccupancy) *
      scannerIndex;
  return req;
}
Session.prototype.SetEthernetPortScannerXY = async function SetEthernetPortScannerXY(
  this: Session,
  addr: number,
  bBroadcast: boolean,
  ethernetPortScannerX: number,
  ethernetPortScannerY: number,
  portIndex: number,
  scannerIndex: number
): Promise<void> {
  const req = createSetEthernetPortScannerXY(
    addr,
    bBroadcast,
    ethernetPortScannerX,
    ethernetPortScannerY,
    portIndex,
    scannerIndex
  );
  await this.connection.send(req);
};
Session.prototype.trySetEthernetPortScannerXY = async function trySetEthernetPortScannerXY(
  this: Session,
  addr: number,
  ethernetPortScannerX: number,
  ethernetPortScannerY: number,
  portIndex: number,
  scannerIndex: number
): Promise<ErrorType | null> {
  const req = createSetEthernetPortScannerXY(
    addr,
    false,
    ethernetPortScannerX,
    ethernetPortScannerY,
    portIndex,
    scannerIndex
  );
  return (await this.connection.trySend(req))?.ack ?? null;
};
