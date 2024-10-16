import { ErrorType, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    SetScanner_MGEnParmData(
      addr: number,
      portAddr: number,
      scanBoardAddr: number,
      bBroadcast: boolean,
      data: number
    ): Promise<void>;
    trySetScanner_MGEnParmData(
      addr: number,
      portAddr: number,
      scanBoardAddr: number,
      data: number
    ): Promise<ErrorType | null>;
  }
}
export default function createSetScanner_MGEnParmData<Broadcast extends boolean>(
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  bBroadcast: Broadcast,
  data: number
): Request<Broadcast> {
  const req = new Request([data], bBroadcast, 'SetScanner_MGEnParmData');
  req.destination = addr;
  req.deviceType = 1;
  req.port = portAddr;
  req.rcvIndex = scanBoardAddr;
  req.address = AddressMapping.MGEnParmAddr;
  return req;
}
Session.prototype.SetScanner_MGEnParmData = async function SetScanner_MGEnParmData(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  bBroadcast: boolean,
  data: number
): Promise<void> {
  const req = createSetScanner_MGEnParmData(addr, portAddr, scanBoardAddr, bBroadcast, data);
  await this.connection.send(req);
};
Session.prototype.trySetScanner_MGEnParmData = async function trySetScanner_MGEnParmData(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  data: number
): Promise<ErrorType | null> {
  const req = createSetScanner_MGEnParmData(addr, portAddr, scanBoardAddr, false, data);
  return (await this.connection.trySend(req))?.ack ?? null;
};
