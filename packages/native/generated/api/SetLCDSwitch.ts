import { encodeUIntLE, ErrorType, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    SetLCDSwitch(
      addr: number,
      portAddr: number,
      scanBoardAddr: number,
      bBroadcast: boolean,
      tem: number
    ): Promise<void>;
    trySetLCDSwitch(
      addr: number,
      portAddr: number,
      scanBoardAddr: number,
      tem: number
    ): Promise<ErrorType | null>;
  }
}
export default function createSetLCDSwitch<Broadcast extends boolean>(
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  bBroadcast: Broadcast,
  tem: number
): Request<Broadcast> {
  const $data = encodeUIntLE(tem, AddressMapping.LCDSwitchOccupancy);
  const req = new Request($data, bBroadcast, 'SetLCDSwitch');
  req.destination = addr;
  req.deviceType = 1;
  req.port = portAddr;
  req.rcvIndex = scanBoardAddr;
  req.address = AddressMapping.LCDSwitchAddr;
  return req;
}
Session.prototype.SetLCDSwitch = async function SetLCDSwitch(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  bBroadcast: boolean,
  tem: number
): Promise<void> {
  const req = createSetLCDSwitch(addr, portAddr, scanBoardAddr, bBroadcast, tem);
  await this.connection.send(req);
};
Session.prototype.trySetLCDSwitch = async function trySetLCDSwitch(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  tem: number
): Promise<ErrorType | null> {
  const req = createSetLCDSwitch(addr, portAddr, scanBoardAddr, false, tem);
  return (await this.connection.trySend(req))?.ack ?? null;
};
