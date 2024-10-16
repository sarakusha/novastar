import { decodeUIntLE, Packet, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    ReadShowLastFrameWhenCableNotConected(
      addr: number,
      portAddr: number,
      scanBoardAddr: number
    ): Promise<number>;
    tryReadShowLastFrameWhenCableNotConected(
      addr: number,
      portAddr: number,
      scanBoardAddr: number
    ): Promise<Packet | null>;
  }
}
export default function createReadShowLastFrameWhenCableNotConected(
  addr: number,
  portAddr: number,
  scanBoardAddr: number
): Request {
  const req = new Request(
    AddressMapping.ShowLastFrameWhenCableNotConectedOccupancy,
    'ReadShowLastFrameWhenCableNotConected'
  );
  req.destination = addr;
  req.deviceType = 1;
  req.port = portAddr;
  req.rcvIndex = scanBoardAddr;
  req.address = AddressMapping.ShowLastFrameWhenCableNotConectedAddr;
  return req;
}
Session.prototype.ReadShowLastFrameWhenCableNotConected =
  async function ReadShowLastFrameWhenCableNotConected(
    this: Session,
    addr: number,
    portAddr: number,
    scanBoardAddr: number
  ): Promise<number> {
    const req = createReadShowLastFrameWhenCableNotConected(addr, portAddr, scanBoardAddr);
    return decodeUIntLE(await this.connection.send(req));
  };
Session.prototype.tryReadShowLastFrameWhenCableNotConected =
  async function tryReadShowLastFrameWhenCableNotConected(
    this: Session,
    addr: number,
    portAddr: number,
    scanBoardAddr: number
  ): Promise<Packet | null> {
    const req = createReadShowLastFrameWhenCableNotConected(addr, portAddr, scanBoardAddr);
    return this.connection.trySend(req);
  };
