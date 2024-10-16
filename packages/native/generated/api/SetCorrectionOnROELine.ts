import { ErrorType, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    SetCorrectionOnROELine(
      addr: number,
      portAddr: number,
      scanBoardAddr: number,
      bBroadcast: boolean,
      correctionInfo: number[] | Buffer
    ): Promise<void>;
    trySetCorrectionOnROELine(
      addr: number,
      portAddr: number,
      scanBoardAddr: number,
      correctionInfo: number[] | Buffer
    ): Promise<ErrorType | null>;
  }
}
export default function createSetCorrectionOnROELine<Broadcast extends boolean>(
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  bBroadcast: Broadcast,
  correctionInfo: number[] | Buffer
): Request<Broadcast> {
  if (correctionInfo.length !== AddressMapping.CorrectionOnOccupancy)
    throw new TypeError(`Invalid buffer size: ${correctionInfo.length}`);
  const req = new Request(correctionInfo, bBroadcast, 'SetCorrectionOnROELine');
  req.destination = addr;
  req.deviceType = 1;
  req.port = portAddr;
  req.rcvIndex = scanBoardAddr;
  req.address = AddressMapping.CorrectionOnAddr;
  return req;
}
Session.prototype.SetCorrectionOnROELine = async function SetCorrectionOnROELine(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  bBroadcast: boolean,
  correctionInfo: number[] | Buffer
): Promise<void> {
  const req = createSetCorrectionOnROELine(
    addr,
    portAddr,
    scanBoardAddr,
    bBroadcast,
    correctionInfo
  );
  await this.connection.send(req);
};
Session.prototype.trySetCorrectionOnROELine = async function trySetCorrectionOnROELine(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  correctionInfo: number[] | Buffer
): Promise<ErrorType | null> {
  const req = createSetCorrectionOnROELine(addr, portAddr, scanBoardAddr, false, correctionInfo);
  return (await this.connection.trySend(req))?.ack ?? null;
};
