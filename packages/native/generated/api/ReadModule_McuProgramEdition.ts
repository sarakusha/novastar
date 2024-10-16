import { decodeUIntLE, Packet, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    ReadModule_McuProgramEdition(
      addr: number,
      portAddr: number,
      scanBoardAddr: number
    ): Promise<number>;
    tryReadModule_McuProgramEdition(
      addr: number,
      portAddr: number,
      scanBoardAddr: number
    ): Promise<Packet | null>;
  }
}
export default function createReadModule_McuProgramEdition(
  addr: number,
  portAddr: number,
  scanBoardAddr: number
): Request {
  const req = new Request(
    AddressMapping.Module_McuProgramEditionOccupancy,
    'ReadModule_McuProgramEdition'
  );
  req.destination = addr;
  req.deviceType = 1;
  req.port = portAddr;
  req.rcvIndex = scanBoardAddr;
  req.address = AddressMapping.Module_McuProgramEditionAddr;
  return req;
}
Session.prototype.ReadModule_McuProgramEdition = async function ReadModule_McuProgramEdition(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number
): Promise<number> {
  const req = createReadModule_McuProgramEdition(addr, portAddr, scanBoardAddr);
  return decodeUIntLE(await this.connection.send(req));
};
Session.prototype.tryReadModule_McuProgramEdition = async function tryReadModule_McuProgramEdition(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number
): Promise<Packet | null> {
  const req = createReadModule_McuProgramEdition(addr, portAddr, scanBoardAddr);
  return this.connection.trySend(req);
};
