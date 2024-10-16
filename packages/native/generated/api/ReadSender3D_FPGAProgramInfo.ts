import { Packet, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    ReadSender3D_FPGAProgramInfo(
      addr: number,
      portAddr: number,
      scanBoardAddr: number
    ): Promise<Buffer>;
    tryReadSender3D_FPGAProgramInfo(
      addr: number,
      portAddr: number,
      scanBoardAddr: number
    ): Promise<Packet | null>;
  }
}
export default function createReadSender3D_FPGAProgramInfo(
  addr: number,
  portAddr: number,
  scanBoardAddr: number
): Request {
  const req = new Request(
    AddressMapping.Sender3D_FPGAProgramInfoOccupancy,
    'ReadSender3D_FPGAProgramInfo'
  );
  req.destination = addr;
  req.deviceType = 4;
  req.port = portAddr;
  req.rcvIndex = scanBoardAddr;
  req.address = AddressMapping.Sender3D_FPGAProgramInfoAddr;
  return req;
}
Session.prototype.ReadSender3D_FPGAProgramInfo = async function ReadSender3D_FPGAProgramInfo(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number
): Promise<Buffer> {
  const req = createReadSender3D_FPGAProgramInfo(addr, portAddr, scanBoardAddr);
  return (await this.connection.send(req)).data;
};
Session.prototype.tryReadSender3D_FPGAProgramInfo = async function tryReadSender3D_FPGAProgramInfo(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number
): Promise<Packet | null> {
  const req = createReadSender3D_FPGAProgramInfo(addr, portAddr, scanBoardAddr);
  return this.connection.trySend(req);
};
