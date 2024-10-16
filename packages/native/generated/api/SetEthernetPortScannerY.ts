import { encodeUIntLE, ErrorType, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    SetEthernetPortScannerY(
      addr: number,
      bBroadcast: boolean,
      ethernetPortScannerY: number,
      portIndex: number,
      scannerIndex: number
    ): Promise<void>;
    trySetEthernetPortScannerY(
      addr: number,
      ethernetPortScannerY: number,
      portIndex: number,
      scannerIndex: number
    ): Promise<ErrorType | null>;
  }
}
export default function createSetEthernetPortScannerY<Broadcast extends boolean>(
  addr: number,
  bBroadcast: Broadcast,
  ethernetPortScannerY: number,
  portIndex: number,
  scannerIndex: number
): Request<Broadcast> {
  const $data = encodeUIntLE(ethernetPortScannerY, AddressMapping.EthernetPortScannerYOccupancy);
  const req = new Request($data, bBroadcast, 'SetEthernetPortScannerY');
  req.destination = addr;
  req.address =
    AddressMapping.EthernetPortOccupancy * portIndex +
    AddressMapping.EthernetPortScannerYAddr +
    AddressMapping.EthernetPortScannerYOccupancy +
    (AddressMapping.EthernetPortScannerXOccupancy + AddressMapping.EthernetPortScannerYOccupancy) *
      scannerIndex;
  return req;
}
Session.prototype.SetEthernetPortScannerY = async function SetEthernetPortScannerY(
  this: Session,
  addr: number,
  bBroadcast: boolean,
  ethernetPortScannerY: number,
  portIndex: number,
  scannerIndex: number
): Promise<void> {
  const req = createSetEthernetPortScannerY(
    addr,
    bBroadcast,
    ethernetPortScannerY,
    portIndex,
    scannerIndex
  );
  await this.connection.send(req);
};
Session.prototype.trySetEthernetPortScannerY = async function trySetEthernetPortScannerY(
  this: Session,
  addr: number,
  ethernetPortScannerY: number,
  portIndex: number,
  scannerIndex: number
): Promise<ErrorType | null> {
  const req = createSetEthernetPortScannerY(
    addr,
    false,
    ethernetPortScannerY,
    portIndex,
    scannerIndex
  );
  return (await this.connection.trySend(req))?.ack ?? null;
};
