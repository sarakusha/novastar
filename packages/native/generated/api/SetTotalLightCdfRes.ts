import { encodeUIntLE, ErrorType, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    SetTotalLightCdfRes(
      addr: number,
      portAddr: number,
      scanBoardAddr: number,
      bBroadcast: boolean,
      totalLightCdfRes: number
    ): Promise<void>;
    trySetTotalLightCdfRes(
      addr: number,
      portAddr: number,
      scanBoardAddr: number,
      totalLightCdfRes: number
    ): Promise<ErrorType | null>;
  }
}
export default function createSetTotalLightCdfRes<Broadcast extends boolean>(
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  bBroadcast: Broadcast,
  totalLightCdfRes: number
): Request<Broadcast> {
  const $data = encodeUIntLE(totalLightCdfRes, AddressMapping.TotalLightCdfResOccupancy);
  const req = new Request($data, bBroadcast, 'SetTotalLightCdfRes');
  req.destination = addr;
  req.deviceType = 1;
  req.port = portAddr;
  req.rcvIndex = scanBoardAddr;
  req.address = AddressMapping.TotalLightCdfResAddr;
  return req;
}
Session.prototype.SetTotalLightCdfRes = async function SetTotalLightCdfRes(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  bBroadcast: boolean,
  totalLightCdfRes: number
): Promise<void> {
  const req = createSetTotalLightCdfRes(
    addr,
    portAddr,
    scanBoardAddr,
    bBroadcast,
    totalLightCdfRes
  );
  await this.connection.send(req);
};
Session.prototype.trySetTotalLightCdfRes = async function trySetTotalLightCdfRes(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  totalLightCdfRes: number
): Promise<ErrorType | null> {
  const req = createSetTotalLightCdfRes(addr, portAddr, scanBoardAddr, false, totalLightCdfRes);
  return (await this.connection.trySend(req))?.ack ?? null;
};
