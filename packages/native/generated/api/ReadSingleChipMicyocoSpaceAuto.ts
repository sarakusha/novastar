import { Packet, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    ReadSingleChipMicyocoSpaceAuto(
      addr: number,
      portAddr: number,
      scanBoardAddr: number
    ): Promise<Buffer>;
    tryReadSingleChipMicyocoSpaceAuto(
      addr: number,
      portAddr: number,
      scanBoardAddr: number
    ): Promise<Packet | null>;
  }
}
export default function createReadSingleChipMicyocoSpaceAuto(
  addr: number,
  portAddr: number,
  scanBoardAddr: number
): Request {
  const req = new Request(
    AddressMapping.SingleChipMicyocoSpaceAutoOccupancy,
    'ReadSingleChipMicyocoSpaceAuto'
  );
  req.destination = addr;
  req.deviceType = 1;
  req.port = portAddr;
  req.rcvIndex = scanBoardAddr;
  req.address = AddressMapping.SingleChipMicyocoSpaceAutoAddr;
  return req;
}
Session.prototype.ReadSingleChipMicyocoSpaceAuto = async function ReadSingleChipMicyocoSpaceAuto(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number
): Promise<Buffer> {
  const req = createReadSingleChipMicyocoSpaceAuto(addr, portAddr, scanBoardAddr);
  return (await this.connection.send(req)).data;
};
Session.prototype.tryReadSingleChipMicyocoSpaceAuto =
  async function tryReadSingleChipMicyocoSpaceAuto(
    this: Session,
    addr: number,
    portAddr: number,
    scanBoardAddr: number
  ): Promise<Packet | null> {
    const req = createReadSingleChipMicyocoSpaceAuto(addr, portAddr, scanBoardAddr);
    return this.connection.trySend(req);
  };
