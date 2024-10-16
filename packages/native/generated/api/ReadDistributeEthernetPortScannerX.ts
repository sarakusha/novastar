import { decodeUIntLE, Packet, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    ReadDistributeEthernetPortScannerX(
      addr: number,
      portAddr: number,
      distributeAddr: number,
      portIndex: number,
      scannerIndex: number
    ): Promise<number>;
    tryReadDistributeEthernetPortScannerX(
      addr: number,
      portAddr: number,
      distributeAddr: number,
      portIndex: number,
      scannerIndex: number
    ): Promise<Packet | null>;
  }
}
export default function createReadDistributeEthernetPortScannerX(
  addr: number,
  portAddr: number,
  distributeAddr: number,
  portIndex: number,
  scannerIndex: number
): Request {
  const req = new Request(
    AddressMapping.DistributeEthernetPortScannerXOccupancy,
    'ReadDistributeEthernetPortScannerX'
  );
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
Session.prototype.ReadDistributeEthernetPortScannerX =
  async function ReadDistributeEthernetPortScannerX(
    this: Session,
    addr: number,
    portAddr: number,
    distributeAddr: number,
    portIndex: number,
    scannerIndex: number
  ): Promise<number> {
    const req = createReadDistributeEthernetPortScannerX(
      addr,
      portAddr,
      distributeAddr,
      portIndex,
      scannerIndex
    );
    return decodeUIntLE(await this.connection.send(req));
  };
Session.prototype.tryReadDistributeEthernetPortScannerX =
  async function tryReadDistributeEthernetPortScannerX(
    this: Session,
    addr: number,
    portAddr: number,
    distributeAddr: number,
    portIndex: number,
    scannerIndex: number
  ): Promise<Packet | null> {
    const req = createReadDistributeEthernetPortScannerX(
      addr,
      portAddr,
      distributeAddr,
      portIndex,
      scannerIndex
    );
    return this.connection.trySend(req);
  };
