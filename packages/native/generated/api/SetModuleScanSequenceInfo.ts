import { ErrorType, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    SetModuleScanSequenceInfo(
      addr: number,
      portAddr: number,
      scanBoardAddr: number,
      bBroadcast: boolean,
      scanSequenceInfo: number[] | Buffer
    ): Promise<void>;
    trySetModuleScanSequenceInfo(
      addr: number,
      portAddr: number,
      scanBoardAddr: number,
      scanSequenceInfo: number[] | Buffer
    ): Promise<ErrorType | null>;
  }
}
export default function createSetModuleScanSequenceInfo<Broadcast extends boolean>(
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  bBroadcast: Broadcast,
  scanSequenceInfo: number[] | Buffer
): Request<Broadcast> {
  const req = new Request(scanSequenceInfo, bBroadcast, 'SetModuleScanSequenceInfo');
  req.destination = addr;
  req.deviceType = 1;
  req.port = portAddr;
  req.rcvIndex = scanBoardAddr;
  req.address = AddressMapping.Module_ScanSequenceInfoAddr;
  return req;
}
Session.prototype.SetModuleScanSequenceInfo = async function SetModuleScanSequenceInfo(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  bBroadcast: boolean,
  scanSequenceInfo: number[] | Buffer
): Promise<void> {
  const req = createSetModuleScanSequenceInfo(
    addr,
    portAddr,
    scanBoardAddr,
    bBroadcast,
    scanSequenceInfo
  );
  await this.connection.send(req);
};
Session.prototype.trySetModuleScanSequenceInfo = async function trySetModuleScanSequenceInfo(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  scanSequenceInfo: number[] | Buffer
): Promise<ErrorType | null> {
  const req = createSetModuleScanSequenceInfo(
    addr,
    portAddr,
    scanBoardAddr,
    false,
    scanSequenceInfo
  );
  return (await this.connection.trySend(req))?.ack ?? null;
};
