import { Packet, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    ReadDistributeEthernetPortScannerXY(
      addr: number,
      portAddr: number,
      distributeAddr: number,
      portIndex: number,
      scannerIndex: number
    ): Promise<Buffer>;
    tryReadDistributeEthernetPortScannerXY(
      addr: number,
      portAddr: number,
      distributeAddr: number,
      portIndex: number,
      scannerIndex: number
    ): Promise<Packet | null>;
  }
}
export default function createReadDistributeEthernetPortScannerXY(
  addr: number,
  portAddr: number,
  distributeAddr: number,
  portIndex: number,
  scannerIndex: number
): Request {
  const req = new Request(
    AddressMapping.DistributeEthernetPortScannerXOccupancy +
      AddressMapping.DistributeEthernetPortScannerYOccupancy,
    'ReadDistributeEthernetPortScannerXY'
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
      scannerIndex;
  return req;
}
Session.prototype.ReadDistributeEthernetPortScannerXY =
  async function ReadDistributeEthernetPortScannerXY(
    this: Session,
    addr: number,
    portAddr: number,
    distributeAddr: number,
    portIndex: number,
    scannerIndex: number
  ): Promise<Buffer> {
    const req = createReadDistributeEthernetPortScannerXY(
      addr,
      portAddr,
      distributeAddr,
      portIndex,
      scannerIndex
    );
    return (await this.connection.send(req)).data;
  };
Session.prototype.tryReadDistributeEthernetPortScannerXY =
  async function tryReadDistributeEthernetPortScannerXY(
    this: Session,
    addr: number,
    portAddr: number,
    distributeAddr: number,
    portIndex: number,
    scannerIndex: number
  ): Promise<Packet | null> {
    const req = createReadDistributeEthernetPortScannerXY(
      addr,
      portAddr,
      distributeAddr,
      portIndex,
      scannerIndex
    );
    return this.connection.trySend(req);
  };
