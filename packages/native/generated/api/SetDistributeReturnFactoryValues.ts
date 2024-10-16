import { encodeUIntLE, ErrorType, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    SetDistributeReturnFactoryValues(
      addr: number,
      portAddr: number,
      distributeAddr: number,
      bBroadcast: boolean,
      returnFactoryValues: number
    ): Promise<void>;
    trySetDistributeReturnFactoryValues(
      addr: number,
      portAddr: number,
      distributeAddr: number,
      returnFactoryValues: number
    ): Promise<ErrorType | null>;
  }
}
export default function createSetDistributeReturnFactoryValues<Broadcast extends boolean>(
  addr: number,
  portAddr: number,
  distributeAddr: number,
  bBroadcast: Broadcast,
  returnFactoryValues: number
): Request<Broadcast> {
  const $data = encodeUIntLE(returnFactoryValues, AddressMapping.DistributeReturnFactoryOccupancy);
  const req = new Request($data, bBroadcast, 'SetDistributeReturnFactoryValues');
  req.destination = addr;
  req.deviceType = 3;
  req.port = portAddr;
  req.rcvIndex = distributeAddr;
  req.address = AddressMapping.DistributeReturnFactoryValuesAddr;
  return req;
}
Session.prototype.SetDistributeReturnFactoryValues =
  async function SetDistributeReturnFactoryValues(
    this: Session,
    addr: number,
    portAddr: number,
    distributeAddr: number,
    bBroadcast: boolean,
    returnFactoryValues: number
  ): Promise<void> {
    const req = createSetDistributeReturnFactoryValues(
      addr,
      portAddr,
      distributeAddr,
      bBroadcast,
      returnFactoryValues
    );
    await this.connection.send(req);
  };
Session.prototype.trySetDistributeReturnFactoryValues =
  async function trySetDistributeReturnFactoryValues(
    this: Session,
    addr: number,
    portAddr: number,
    distributeAddr: number,
    returnFactoryValues: number
  ): Promise<ErrorType | null> {
    const req = createSetDistributeReturnFactoryValues(
      addr,
      portAddr,
      distributeAddr,
      false,
      returnFactoryValues
    );
    return (await this.connection.trySend(req))?.ack ?? null;
  };
