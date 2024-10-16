import { encodeUIntLE, ErrorType, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    SetDistributeEthernetPortScannerX(
      addr: number,
      portAddr: number,
      distributeAddr: number,
      bBroadcast: boolean,
      ethernetPortScannerX: number,
      portIndex: number,
      scannerIndex: number
    ): Promise<void>;
    trySetDistributeEthernetPortScannerX(
      addr: number,
      portAddr: number,
      distributeAddr: number,
      ethernetPortScannerX: number,
      portIndex: number,
      scannerIndex: number
    ): Promise<ErrorType | null>;
  }
}
export default function createSetDistributeEthernetPortScannerX<Broadcast extends boolean>(
  addr: number,
  portAddr: number,
  distributeAddr: number,
  bBroadcast: Broadcast,
  ethernetPortScannerX: number,
  portIndex: number,
  scannerIndex: number
): Request<Broadcast> {
  const $data = encodeUIntLE(
    ethernetPortScannerX,
    AddressMapping.DistributeEthernetPortScannerXOccupancy
  );
  const req = new Request($data, bBroadcast, 'SetDistributeEthernetPortScannerX');
  req.destination = addr;
  req.deviceType = 3;
  req.port = portAddr;
  req.rcvIndex = distributeAddr;
  req.address =
    AddressMapping.DistributeEthernetPortOccupancy * portIndex +
    AddressMapping.DistributeEthernetPortScannerXAddr +
    (AddressMapping.DistributeEthernetPortScannerXOccupancy +
      AddressMapping.DistributeEthernetPortScannerYOccupancy) *
      scannerIndex +
    AddressMapping.DistributeEthernetPortScannerXOccupancy;
  return req;
}
Session.prototype.SetDistributeEthernetPortScannerX =
  async function SetDistributeEthernetPortScannerX(
    this: Session,
    addr: number,
    portAddr: number,
    distributeAddr: number,
    bBroadcast: boolean,
    ethernetPortScannerX: number,
    portIndex: number,
    scannerIndex: number
  ): Promise<void> {
    const req = createSetDistributeEthernetPortScannerX(
      addr,
      portAddr,
      distributeAddr,
      bBroadcast,
      ethernetPortScannerX,
      portIndex,
      scannerIndex
    );
    await this.connection.send(req);
  };
Session.prototype.trySetDistributeEthernetPortScannerX =
  async function trySetDistributeEthernetPortScannerX(
    this: Session,
    addr: number,
    portAddr: number,
    distributeAddr: number,
    ethernetPortScannerX: number,
    portIndex: number,
    scannerIndex: number
  ): Promise<ErrorType | null> {
    const req = createSetDistributeEthernetPortScannerX(
      addr,
      portAddr,
      distributeAddr,
      false,
      ethernetPortScannerX,
      portIndex,
      scannerIndex
    );
    return (await this.connection.trySend(req))?.ack ?? null;
  };
