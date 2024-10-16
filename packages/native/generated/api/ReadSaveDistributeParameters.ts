import { decodeUIntLE, Packet, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    ReadSaveDistributeParameters(
      addr: number,
      portAddr: number,
      distributeAddr: number
    ): Promise<number>;
    tryReadSaveDistributeParameters(
      addr: number,
      portAddr: number,
      distributeAddr: number
    ): Promise<Packet | null>;
  }
}
export default function createReadSaveDistributeParameters(
  addr: number,
  portAddr: number,
  distributeAddr: number
): Request {
  const req = new Request(
    AddressMapping.SaveDistributeParameterOccupancy,
    'ReadSaveDistributeParameters'
  );
  req.destination = addr;
  req.deviceType = 3;
  req.port = portAddr;
  req.rcvIndex = distributeAddr;
  req.address = AddressMapping.SaveDistributeParameterAddr;
  return req;
}
Session.prototype.ReadSaveDistributeParameters = async function ReadSaveDistributeParameters(
  this: Session,
  addr: number,
  portAddr: number,
  distributeAddr: number
): Promise<number> {
  const req = createReadSaveDistributeParameters(addr, portAddr, distributeAddr);
  return decodeUIntLE(await this.connection.send(req));
};
Session.prototype.tryReadSaveDistributeParameters = async function tryReadSaveDistributeParameters(
  this: Session,
  addr: number,
  portAddr: number,
  distributeAddr: number
): Promise<Packet | null> {
  const req = createReadSaveDistributeParameters(addr, portAddr, distributeAddr);
  return this.connection.trySend(req);
};
