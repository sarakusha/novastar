import { decodeUIntLE, Packet, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    GetScannerSpiSpeedAdjust(Sender: number, portAddr: number, Scan: number): Promise<number>;
    tryGetScannerSpiSpeedAdjust(
      Sender: number,
      portAddr: number,
      Scan: number
    ): Promise<Packet | null>;
  }
}
export default function createGetScannerSpiSpeedAdjust(
  Sender: number,
  portAddr: number,
  Scan: number
): Request {
  const req = new Request(
    AddressMapping.ScannerSpiSpeedAdjustOccupancy,
    'GetScannerSpiSpeedAdjust'
  );
  req.destination = Sender;
  req.deviceType = 1;
  req.port = portAddr;
  req.rcvIndex = Scan;
  req.address = AddressMapping.ScannerSpiSpeedAdjustAddr;
  return req;
}
Session.prototype.GetScannerSpiSpeedAdjust = async function GetScannerSpiSpeedAdjust(
  this: Session,
  Sender: number,
  portAddr: number,
  Scan: number
): Promise<number> {
  const req = createGetScannerSpiSpeedAdjust(Sender, portAddr, Scan);
  return decodeUIntLE(await this.connection.send(req));
};
Session.prototype.tryGetScannerSpiSpeedAdjust = async function tryGetScannerSpiSpeedAdjust(
  this: Session,
  Sender: number,
  portAddr: number,
  Scan: number
): Promise<Packet | null> {
  const req = createGetScannerSpiSpeedAdjust(Sender, portAddr, Scan);
  return this.connection.trySend(req);
};
