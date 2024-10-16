import { encodeUIntLE, ErrorType, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    SetSymmetricalOutputMode(
      addr: number,
      portAddr: number,
      scanBoardAddr: number,
      bBroadcast: boolean,
      outPutMode: number
    ): Promise<void>;
    trySetSymmetricalOutputMode(
      addr: number,
      portAddr: number,
      scanBoardAddr: number,
      outPutMode: number
    ): Promise<ErrorType | null>;
  }
}
export default function createSetSymmetricalOutputMode<Broadcast extends boolean>(
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  bBroadcast: Broadcast,
  outPutMode: number
): Request<Broadcast> {
  const $data = encodeUIntLE(outPutMode, AddressMapping.SymmetricalOutputModeOccupancy);
  const req = new Request($data, bBroadcast, 'SetSymmetricalOutputMode');
  req.destination = addr;
  req.deviceType = 1;
  req.port = portAddr;
  req.rcvIndex = scanBoardAddr;
  req.address = AddressMapping.SymmetricalOutputModeAddr;
  return req;
}
Session.prototype.SetSymmetricalOutputMode = async function SetSymmetricalOutputMode(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  bBroadcast: boolean,
  outPutMode: number
): Promise<void> {
  const req = createSetSymmetricalOutputMode(addr, portAddr, scanBoardAddr, bBroadcast, outPutMode);
  await this.connection.send(req);
};
Session.prototype.trySetSymmetricalOutputMode = async function trySetSymmetricalOutputMode(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  outPutMode: number
): Promise<ErrorType | null> {
  const req = createSetSymmetricalOutputMode(addr, portAddr, scanBoardAddr, false, outPutMode);
  return (await this.connection.trySend(req))?.ack ?? null;
};
