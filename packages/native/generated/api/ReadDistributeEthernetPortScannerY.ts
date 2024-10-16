import { decodeUIntLE, Packet, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    ReadDistributeEthernetPortScannerY(
      addr: number,
      portAddr: number,
      distributeAddr: number,
      portIndex: number,
      scannerIndex: number
    ): Promise<number>;
    tryReadDistributeEthernetPortScannerY(
      addr: number,
      portAddr: number,
      distributeAddr: number,
      portIndex: number,
      scannerIndex: number
    ): Promise<Packet | null>;
  }
}
export default function createReadDistributeEthernetPortScannerY(
  addr: number,
  portAddr: number,
  distributeAddr: number,
  portIndex: number,
  scannerIndex: number
): Request {
  const req = new Request(
    AddressMapping.DistributeEthernetPortScannerYOccupancy,
    'ReadDistributeEthernetPortScannerY'
  );
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
Session.prototype.ReadDistributeEthernetPortScannerY =
  async function ReadDistributeEthernetPortScannerY(
    this: Session,
    addr: number,
    portAddr: number,
    distributeAddr: number,
    portIndex: number,
    scannerIndex: number
  ): Promise<number> {
    const req = createReadDistributeEthernetPortScannerY(
      addr,
      portAddr,
      distributeAddr,
      portIndex,
      scannerIndex
    );
    return decodeUIntLE(await this.connection.send(req));
  };
Session.prototype.tryReadDistributeEthernetPortScannerY =
  async function tryReadDistributeEthernetPortScannerY(
    this: Session,
    addr: number,
    portAddr: number,
    distributeAddr: number,
    portIndex: number,
    scannerIndex: number
  ): Promise<Packet | null> {
    const req = createReadDistributeEthernetPortScannerY(
      addr,
      portAddr,
      distributeAddr,
      portIndex,
      scannerIndex
    );
    return this.connection.trySend(req);
  };
