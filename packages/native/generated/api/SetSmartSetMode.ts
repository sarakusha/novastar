import { encodeUIntLE, ErrorType, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';
import { SmartSetModeEnum } from '../SmartSetMode';

declare module '@novastar/codec' {
  interface API {
    SetSmartSetMode(
      addr: number,
      portAddr: number,
      scanBoardAddr: number,
      bBroadcast: boolean,
      smartMode: SmartSetModeEnum
    ): Promise<void>;
    trySetSmartSetMode(
      addr: number,
      portAddr: number,
      scanBoardAddr: number,
      smartMode: SmartSetModeEnum
    ): Promise<ErrorType | null>;
  }
}
export default function createSetSmartSetMode<Broadcast extends boolean>(
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  bBroadcast: Broadcast,
  smartMode: SmartSetModeEnum
): Request<Broadcast> {
  const $data = encodeUIntLE(smartMode, AddressMapping.SmartSetModeOccupancy);
  const req = new Request($data, bBroadcast, 'SetSmartSetMode');
  req.destination = addr;
  req.deviceType = 1;
  req.port = portAddr;
  req.rcvIndex = scanBoardAddr;
  req.address = AddressMapping.SmartSetModeAddr;
  return req;
}
Session.prototype.SetSmartSetMode = async function SetSmartSetMode(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  bBroadcast: boolean,
  smartMode: SmartSetModeEnum
): Promise<void> {
  const req = createSetSmartSetMode(addr, portAddr, scanBoardAddr, bBroadcast, smartMode);
  await this.connection.send(req);
};
Session.prototype.trySetSmartSetMode = async function trySetSmartSetMode(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  smartMode: SmartSetModeEnum
): Promise<ErrorType | null> {
  const req = createSetSmartSetMode(addr, portAddr, scanBoardAddr, false, smartMode);
  return (await this.connection.trySend(req))?.ack ?? null;
};
