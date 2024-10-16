import { encodeUIntLE, ErrorType, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    SetSmartSetMode_1(
      addr: number,
      portAddr: number,
      scanBoardAddr: number,
      bBroadcast: boolean,
      smartMode: number
    ): Promise<void>;
    trySetSmartSetMode_1(
      addr: number,
      portAddr: number,
      scanBoardAddr: number,
      smartMode: number
    ): Promise<ErrorType | null>;
  }
}
export default function createSetSmartSetMode_1<Broadcast extends boolean>(
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  bBroadcast: Broadcast,
  smartMode: number
): Request<Broadcast> {
  const $data = encodeUIntLE(smartMode, AddressMapping.SmartSetModeOccupancy);
  const req = new Request($data, bBroadcast, 'SetSmartSetMode_1');
  req.destination = addr;
  req.deviceType = 1;
  req.port = portAddr;
  req.rcvIndex = scanBoardAddr;
  req.address = AddressMapping.SmartSetModeAddr;
  return req;
}
Session.prototype.SetSmartSetMode_1 = async function SetSmartSetMode_1(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  bBroadcast: boolean,
  smartMode: number
): Promise<void> {
  const req = createSetSmartSetMode_1(addr, portAddr, scanBoardAddr, bBroadcast, smartMode);
  await this.connection.send(req);
};
Session.prototype.trySetSmartSetMode_1 = async function trySetSmartSetMode_1(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  smartMode: number
): Promise<ErrorType | null> {
  const req = createSetSmartSetMode_1(addr, portAddr, scanBoardAddr, false, smartMode);
  return (await this.connection.trySend(req))?.ack ?? null;
};
