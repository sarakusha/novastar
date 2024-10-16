import { decodeUIntLE, Packet, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    ReadSingleChipMicyocoSpace(
      addr: number,
      portAddr: number,
      scanBoardAddr: number
    ): Promise<number>;
    tryReadSingleChipMicyocoSpace(
      addr: number,
      portAddr: number,
      scanBoardAddr: number
    ): Promise<Packet | null>;
  }
}
export default function createReadSingleChipMicyocoSpace(
  addr: number,
  portAddr: number,
  scanBoardAddr: number
): Request {
  const req = new Request(
    AddressMapping.SingleChipMicyocoSpaceOccupancy,
    'ReadSingleChipMicyocoSpace'
  );
  req.destination = addr;
  req.deviceType = 1;
  req.port = portAddr;
  req.rcvIndex = scanBoardAddr;
  req.address = AddressMapping.SingleChipMicyocoSpaceAddr;
  return req;
}
Session.prototype.ReadSingleChipMicyocoSpace = async function ReadSingleChipMicyocoSpace(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number
): Promise<number> {
  const req = createReadSingleChipMicyocoSpace(addr, portAddr, scanBoardAddr);
  return decodeUIntLE(await this.connection.send(req));
};
Session.prototype.tryReadSingleChipMicyocoSpace = async function tryReadSingleChipMicyocoSpace(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number
): Promise<Packet | null> {
  const req = createReadSingleChipMicyocoSpace(addr, portAddr, scanBoardAddr);
  return this.connection.trySend(req);
};
