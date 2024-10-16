import { encodeUIntLE, ErrorType, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    SetTotalLightCdfResault(
      addr: number,
      portAddr: number,
      scanBoardAddr: number,
      bBroadcast: boolean,
      TotalLightCdfResault: number
    ): Promise<void>;
    trySetTotalLightCdfResault(
      addr: number,
      portAddr: number,
      scanBoardAddr: number,
      TotalLightCdfResault: number
    ): Promise<ErrorType | null>;
  }
}
export default function createSetTotalLightCdfResault<Broadcast extends boolean>(
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  bBroadcast: Broadcast,
  TotalLightCdfResault: number
): Request<Broadcast> {
  const $data = encodeUIntLE(
    TotalLightCdfResault,
    AddressMapping.ScannerTotalLightCdfResaultOccupancy
  );
  const req = new Request($data, bBroadcast, 'SetTotalLightCdfResault');
  req.destination = addr;
  req.deviceType = 1;
  req.port = portAddr;
  req.rcvIndex = scanBoardAddr;
  req.address = AddressMapping.ScannerTotalLightCdfResaultddr;
  return req;
}
Session.prototype.SetTotalLightCdfResault = async function SetTotalLightCdfResault(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  bBroadcast: boolean,
  TotalLightCdfResault: number
): Promise<void> {
  const req = createSetTotalLightCdfResault(
    addr,
    portAddr,
    scanBoardAddr,
    bBroadcast,
    TotalLightCdfResault
  );
  await this.connection.send(req);
};
Session.prototype.trySetTotalLightCdfResault = async function trySetTotalLightCdfResault(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  TotalLightCdfResault: number
): Promise<ErrorType | null> {
  const req = createSetTotalLightCdfResault(
    addr,
    portAddr,
    scanBoardAddr,
    false,
    TotalLightCdfResault
  );
  return (await this.connection.trySend(req))?.ack ?? null;
};
