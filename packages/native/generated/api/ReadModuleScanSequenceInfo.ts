import { Packet, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    ReadModuleScanSequenceInfo(
      addr: number,
      portAddr: number,
      scanBoardAddr: number
    ): Promise<Buffer>;
    tryReadModuleScanSequenceInfo(
      addr: number,
      portAddr: number,
      scanBoardAddr: number
    ): Promise<Packet | null>;
  }
}
export default function createReadModuleScanSequenceInfo(
  addr: number,
  portAddr: number,
  scanBoardAddr: number
): Request {
  const req = new Request(
    AddressMapping.Module_ScanSequenceInfoOccupancy,
    'ReadModuleScanSequenceInfo'
  );
  req.destination = addr;
  req.deviceType = 1;
  req.port = portAddr;
  req.rcvIndex = scanBoardAddr;
  req.address = AddressMapping.Module_ScanSequenceInfoAddr;
  return req;
}
Session.prototype.ReadModuleScanSequenceInfo = async function ReadModuleScanSequenceInfo(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number
): Promise<Buffer> {
  const req = createReadModuleScanSequenceInfo(addr, portAddr, scanBoardAddr);
  return (await this.connection.send(req)).data;
};
Session.prototype.tryReadModuleScanSequenceInfo = async function tryReadModuleScanSequenceInfo(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number
): Promise<Packet | null> {
  const req = createReadModuleScanSequenceInfo(addr, portAddr, scanBoardAddr);
  return this.connection.trySend(req);
};
