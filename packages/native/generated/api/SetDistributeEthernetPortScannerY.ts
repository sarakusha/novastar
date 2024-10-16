import { encodeUIntLE, ErrorType, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    SetDistributeEthernetPortScannerY(
      addr: number,
      portAddr: number,
      distributeAddr: number,
      bBroadcast: boolean,
      ethernetPortScannerY: number,
      portIndex: number,
      scannerIndex: number
    ): Promise<void>;
    trySetDistributeEthernetPortScannerY(
      addr: number,
      portAddr: number,
      distributeAddr: number,
      ethernetPortScannerY: number,
      portIndex: number,
      scannerIndex: number
    ): Promise<ErrorType | null>;
  }
}
export default function createSetDistributeEthernetPortScannerY<Broadcast extends boolean>(
  addr: number,
  portAddr: number,
  distributeAddr: number,
  bBroadcast: Broadcast,
  ethernetPortScannerY: number,
  portIndex: number,
  scannerIndex: number
): Request<Broadcast> {
  const $data = encodeUIntLE(
    ethernetPortScannerY,
    AddressMapping.DistributeEthernetPortScannerYOccupancy
  );
  const req = new Request($data, bBroadcast, 'SetDistributeEthernetPortScannerY');
  req.destination = addr;
  req.deviceType = 3;
  req.port = portAddr;
  req.rcvIndex = distributeAddr;
  req.address =
    AddressMapping.DistributeEthernetPortOccupancy * portIndex +
    AddressMapping.DistributeEthernetPortScannerYAddr +
    AddressMapping.DistributeEthernetPortScannerYOccupancy +
    (AddressMapping.DistributeEthernetPortScannerXOccupancy +
      AddressMapping.DistributeEthernetPortScannerYOccupancy) *
      scannerIndex;
  return req;
}
Session.prototype.SetDistributeEthernetPortScannerY =
  async function SetDistributeEthernetPortScannerY(
    this: Session,
    addr: number,
    portAddr: number,
    distributeAddr: number,
    bBroadcast: boolean,
    ethernetPortScannerY: number,
    portIndex: number,
    scannerIndex: number
  ): Promise<void> {
    const req = createSetDistributeEthernetPortScannerY(
      addr,
      portAddr,
      distributeAddr,
      bBroadcast,
      ethernetPortScannerY,
      portIndex,
      scannerIndex
    );
    await this.connection.send(req);
  };
Session.prototype.trySetDistributeEthernetPortScannerY =
  async function trySetDistributeEthernetPortScannerY(
    this: Session,
    addr: number,
    portAddr: number,
    distributeAddr: number,
    ethernetPortScannerY: number,
    portIndex: number,
    scannerIndex: number
  ): Promise<ErrorType | null> {
    const req = createSetDistributeEthernetPortScannerY(
      addr,
      portAddr,
      distributeAddr,
      false,
      ethernetPortScannerY,
      portIndex,
      scannerIndex
    );
    return (await this.connection.trySend(req))?.ack ?? null;
  };
