import { decodeUIntLE, Packet, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    ReadDistributeReturnFactoryValues(
      addr: number,
      portAddr: number,
      distributeAddr: number
    ): Promise<number>;
    tryReadDistributeReturnFactoryValues(
      addr: number,
      portAddr: number,
      distributeAddr: number
    ): Promise<Packet | null>;
  }
}
export default function createReadDistributeReturnFactoryValues(
  addr: number,
  portAddr: number,
  distributeAddr: number
): Request {
  const req = new Request(
    AddressMapping.DistributeReturnFactoryOccupancy,
    'ReadDistributeReturnFactoryValues'
  );
  req.destination = addr;
  req.deviceType = 3;
  req.port = portAddr;
  req.rcvIndex = distributeAddr;
  req.address = AddressMapping.DistributeReturnFactoryValuesAddr;
  return req;
}
Session.prototype.ReadDistributeReturnFactoryValues =
  async function ReadDistributeReturnFactoryValues(
    this: Session,
    addr: number,
    portAddr: number,
    distributeAddr: number
  ): Promise<number> {
    const req = createReadDistributeReturnFactoryValues(addr, portAddr, distributeAddr);
    return decodeUIntLE(await this.connection.send(req));
  };
Session.prototype.tryReadDistributeReturnFactoryValues =
  async function tryReadDistributeReturnFactoryValues(
    this: Session,
    addr: number,
    portAddr: number,
    distributeAddr: number
  ): Promise<Packet | null> {
    const req = createReadDistributeReturnFactoryValues(addr, portAddr, distributeAddr);
    return this.connection.trySend(req);
  };
