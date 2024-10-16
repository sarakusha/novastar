import { Packet, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    ReadModule_McuProgramRemarks(
      addr: number,
      portAddr: number,
      scanBoardAddr: number
    ): Promise<Buffer>;
    tryReadModule_McuProgramRemarks(
      addr: number,
      portAddr: number,
      scanBoardAddr: number
    ): Promise<Packet | null>;
  }
}
export default function createReadModule_McuProgramRemarks(
  addr: number,
  portAddr: number,
  scanBoardAddr: number
): Request {
  const req = new Request(
    AddressMapping.Module_McuProgramRemarksOccupancy,
    'ReadModule_McuProgramRemarks'
  );
  req.destination = addr;
  req.deviceType = 1;
  req.port = portAddr;
  req.rcvIndex = scanBoardAddr;
  req.address = AddressMapping.Module_McuProgramRemarksAddr;
  return req;
}
Session.prototype.ReadModule_McuProgramRemarks = async function ReadModule_McuProgramRemarks(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number
): Promise<Buffer> {
  const req = createReadModule_McuProgramRemarks(addr, portAddr, scanBoardAddr);
  return (await this.connection.send(req)).data;
};
Session.prototype.tryReadModule_McuProgramRemarks = async function tryReadModule_McuProgramRemarks(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number
): Promise<Packet | null> {
  const req = createReadModule_McuProgramRemarks(addr, portAddr, scanBoardAddr);
  return this.connection.trySend(req);
};
