import { encodeUIntLE, ErrorType, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    SetDistributeEthernetPortScannerXY(
      addr: number,
      portAddr: number,
      distributeAddr: number,
      bBroadcast: boolean,
      ethernetPortScannerX: number,
      ethernetPortScannerY: number,
      portIndex: number,
      scannerIndex: number
    ): Promise<void>;
    trySetDistributeEthernetPortScannerXY(
      addr: number,
      portAddr: number,
      distributeAddr: number,
      ethernetPortScannerX: number,
      ethernetPortScannerY: number,
      portIndex: number,
      scannerIndex: number
    ): Promise<ErrorType | null>;
  }
}
export default function createSetDistributeEthernetPortScannerXY<Broadcast extends boolean>(
  addr: number,
  portAddr: number,
  distributeAddr: number,
  bBroadcast: Broadcast,
  ethernetPortScannerX: number,
  ethernetPortScannerY: number,
  portIndex: number,
  scannerIndex: number
): Request<Broadcast> {
  const $data = encodeUIntLE(
    (ethernetPortScannerX << 16) + ethernetPortScannerY,
    AddressMapping.DistributeEthernetPortScannerXOccupancy +
      AddressMapping.DistributeEthernetPortScannerYOccupancy
  );
  const req = new Request($data, bBroadcast, 'SetDistributeEthernetPortScannerXY');
  req.destination = addr;
  req.deviceType = 3;
  req.port = portAddr;
  req.rcvIndex = distributeAddr;
  req.address =
    AddressMapping.DistributeEthernetPortOccupancy * portIndex +
    AddressMapping.DistributeEthernetPortScannerXAddr +
    (AddressMapping.DistributeEthernetPortScannerXOccupancy +
      AddressMapping.DistributeEthernetPortScannerYOccupancy) *
      scannerIndex;
  return req;
}
Session.prototype.SetDistributeEthernetPortScannerXY =
  async function SetDistributeEthernetPortScannerXY(
    this: Session,
    addr: number,
    portAddr: number,
    distributeAddr: number,
    bBroadcast: boolean,
    ethernetPortScannerX: number,
    ethernetPortScannerY: number,
    portIndex: number,
    scannerIndex: number
  ): Promise<void> {
    const req = createSetDistributeEthernetPortScannerXY(
      addr,
      portAddr,
      distributeAddr,
      bBroadcast,
      ethernetPortScannerX,
      ethernetPortScannerY,
      portIndex,
      scannerIndex
    );
    await this.connection.send(req);
  };
Session.prototype.trySetDistributeEthernetPortScannerXY =
  async function trySetDistributeEthernetPortScannerXY(
    this: Session,
    addr: number,
    portAddr: number,
    distributeAddr: number,
    ethernetPortScannerX: number,
    ethernetPortScannerY: number,
    portIndex: number,
    scannerIndex: number
  ): Promise<ErrorType | null> {
    const req = createSetDistributeEthernetPortScannerXY(
      addr,
      portAddr,
      distributeAddr,
      false,
      ethernetPortScannerX,
      ethernetPortScannerY,
      portIndex,
      scannerIndex
    );
    return (await this.connection.trySend(req))?.ack ?? null;
  };
