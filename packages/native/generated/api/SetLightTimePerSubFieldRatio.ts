import { encodeUIntLE, ErrorType, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    SetLightTimePerSubFieldRatio(
      addr: number,
      portAddr: number,
      scanBoardAddr: number,
      bBroadcast: boolean,
      lightTimePerSubFieldRatio: number
    ): Promise<void>;
    trySetLightTimePerSubFieldRatio(
      addr: number,
      portAddr: number,
      scanBoardAddr: number,
      lightTimePerSubFieldRatio: number
    ): Promise<ErrorType | null>;
  }
}
export default function createSetLightTimePerSubFieldRatio<Broadcast extends boolean>(
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  bBroadcast: Broadcast,
  lightTimePerSubFieldRatio: number
): Request<Broadcast> {
  const $data = encodeUIntLE(
    lightTimePerSubFieldRatio,
    AddressMapping.LightTimePerSubFieldRatioOccupancy
  );
  const req = new Request($data, bBroadcast, 'SetLightTimePerSubFieldRatio');
  req.destination = addr;
  req.deviceType = 1;
  req.port = portAddr;
  req.rcvIndex = scanBoardAddr;
  req.address = AddressMapping.LightTimePerSubFieldRatioAddr;
  return req;
}
Session.prototype.SetLightTimePerSubFieldRatio = async function SetLightTimePerSubFieldRatio(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  bBroadcast: boolean,
  lightTimePerSubFieldRatio: number
): Promise<void> {
  const req = createSetLightTimePerSubFieldRatio(
    addr,
    portAddr,
    scanBoardAddr,
    bBroadcast,
    lightTimePerSubFieldRatio
  );
  await this.connection.send(req);
};
Session.prototype.trySetLightTimePerSubFieldRatio = async function trySetLightTimePerSubFieldRatio(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  lightTimePerSubFieldRatio: number
): Promise<ErrorType | null> {
  const req = createSetLightTimePerSubFieldRatio(
    addr,
    portAddr,
    scanBoardAddr,
    false,
    lightTimePerSubFieldRatio
  );
  return (await this.connection.trySend(req))?.ack ?? null;
};
