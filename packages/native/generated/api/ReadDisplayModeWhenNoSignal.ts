import { decodeUIntLE, Packet, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    ReadDisplayModeWhenNoSignal(
      addr: number,
      portAddr: number,
      scanBoardAddr: number
    ): Promise<number>;
    tryReadDisplayModeWhenNoSignal(
      addr: number,
      portAddr: number,
      scanBoardAddr: number
    ): Promise<Packet | null>;
  }
}
export default function createReadDisplayModeWhenNoSignal(
  addr: number,
  portAddr: number,
  scanBoardAddr: number
): Request {
  const req = new Request(
    AddressMapping.ShowLastFrameWhenCableNotConectedOccupancy,
    'ReadDisplayModeWhenNoSignal'
  );
  req.destination = addr;
  req.deviceType = 1;
  req.port = portAddr;
  req.rcvIndex = scanBoardAddr;
  req.address = AddressMapping.ShowLastFrameWhenCableNotConectedAddr;
  return req;
}
Session.prototype.ReadDisplayModeWhenNoSignal = async function ReadDisplayModeWhenNoSignal(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number
): Promise<number> {
  const req = createReadDisplayModeWhenNoSignal(addr, portAddr, scanBoardAddr);
  return decodeUIntLE(await this.connection.send(req));
};
Session.prototype.tryReadDisplayModeWhenNoSignal = async function tryReadDisplayModeWhenNoSignal(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number
): Promise<Packet | null> {
  const req = createReadDisplayModeWhenNoSignal(addr, portAddr, scanBoardAddr);
  return this.connection.trySend(req);
};
