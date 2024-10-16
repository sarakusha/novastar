import { encodeUIntLE, ErrorType, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    SetLightTimePerSubField(
      addr: number,
      portAddr: number,
      scanBoardAddr: number,
      bBroadcast: boolean,
      lightTimePerSubField: number
    ): Promise<void>;
    trySetLightTimePerSubField(
      addr: number,
      portAddr: number,
      scanBoardAddr: number,
      lightTimePerSubField: number
    ): Promise<ErrorType | null>;
  }
}
export default function createSetLightTimePerSubField<Broadcast extends boolean>(
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  bBroadcast: Broadcast,
  lightTimePerSubField: number
): Request<Broadcast> {
  const $data = encodeUIntLE(lightTimePerSubField, AddressMapping.LightTimePerSubFieldOccupancy);
  const req = new Request($data, bBroadcast, 'SetLightTimePerSubField');
  req.destination = addr;
  req.deviceType = 1;
  req.port = portAddr;
  req.rcvIndex = scanBoardAddr;
  req.address = AddressMapping.LightTimePerSubFieldAddr;
  return req;
}
Session.prototype.SetLightTimePerSubField = async function SetLightTimePerSubField(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  bBroadcast: boolean,
  lightTimePerSubField: number
): Promise<void> {
  const req = createSetLightTimePerSubField(
    addr,
    portAddr,
    scanBoardAddr,
    bBroadcast,
    lightTimePerSubField
  );
  await this.connection.send(req);
};
Session.prototype.trySetLightTimePerSubField = async function trySetLightTimePerSubField(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  lightTimePerSubField: number
): Promise<ErrorType | null> {
  const req = createSetLightTimePerSubField(
    addr,
    portAddr,
    scanBoardAddr,
    false,
    lightTimePerSubField
  );
  return (await this.connection.trySend(req))?.ack ?? null;
};
