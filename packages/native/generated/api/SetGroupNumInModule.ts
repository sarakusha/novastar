import { encodeUIntLE, ErrorType, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    SetGroupNumInModule(
      addr: number,
      portAddr: number,
      scanBoardAddr: number,
      bBroadcast: boolean,
      groupNumInModule: number
    ): Promise<void>;
    trySetGroupNumInModule(
      addr: number,
      portAddr: number,
      scanBoardAddr: number,
      groupNumInModule: number
    ): Promise<ErrorType | null>;
  }
}
export default function createSetGroupNumInModule<Broadcast extends boolean>(
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  bBroadcast: Broadcast,
  groupNumInModule: number
): Request<Broadcast> {
  const $data = encodeUIntLE(groupNumInModule, AddressMapping.GroupNumInModuleOccupancy);
  const req = new Request($data, bBroadcast, 'SetGroupNumInModule');
  req.destination = addr;
  req.deviceType = 1;
  req.port = portAddr;
  req.rcvIndex = scanBoardAddr;
  req.address = AddressMapping.GroupNumInModuleAddr;
  return req;
}
Session.prototype.SetGroupNumInModule = async function SetGroupNumInModule(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  bBroadcast: boolean,
  groupNumInModule: number
): Promise<void> {
  const req = createSetGroupNumInModule(
    addr,
    portAddr,
    scanBoardAddr,
    bBroadcast,
    groupNumInModule
  );
  await this.connection.send(req);
};
Session.prototype.trySetGroupNumInModule = async function trySetGroupNumInModule(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  groupNumInModule: number
): Promise<ErrorType | null> {
  const req = createSetGroupNumInModule(addr, portAddr, scanBoardAddr, false, groupNumInModule);
  return (await this.connection.trySend(req))?.ack ?? null;
};
