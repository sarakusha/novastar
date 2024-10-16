import { encodeUIntLE, ErrorType, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    SetGenLinearScanBoardRunLineTable(
      addr: number,
      portAddr: number,
      scanBoardAddr: number,
      bBroadcast: boolean,
      genLinearTable: number
    ): Promise<void>;
    trySetGenLinearScanBoardRunLineTable(
      addr: number,
      portAddr: number,
      scanBoardAddr: number,
      genLinearTable: number
    ): Promise<ErrorType | null>;
  }
}
export default function createSetGenLinearScanBoardRunLineTable<Broadcast extends boolean>(
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  bBroadcast: Broadcast,
  genLinearTable: number
): Request<Broadcast> {
  const $data = encodeUIntLE(
    genLinearTable,
    AddressMapping.GenLinearScanBoardRunLineTableOccupancy
  );
  const req = new Request($data, bBroadcast, 'SetGenLinearScanBoardRunLineTable');
  req.destination = addr;
  req.deviceType = 1;
  req.port = portAddr;
  req.rcvIndex = scanBoardAddr;
  req.address = AddressMapping.GenLinearScanBoardRunLineTableAddr;
  return req;
}
Session.prototype.SetGenLinearScanBoardRunLineTable =
  async function SetGenLinearScanBoardRunLineTable(
    this: Session,
    addr: number,
    portAddr: number,
    scanBoardAddr: number,
    bBroadcast: boolean,
    genLinearTable: number
  ): Promise<void> {
    const req = createSetGenLinearScanBoardRunLineTable(
      addr,
      portAddr,
      scanBoardAddr,
      bBroadcast,
      genLinearTable
    );
    await this.connection.send(req);
  };
Session.prototype.trySetGenLinearScanBoardRunLineTable =
  async function trySetGenLinearScanBoardRunLineTable(
    this: Session,
    addr: number,
    portAddr: number,
    scanBoardAddr: number,
    genLinearTable: number
  ): Promise<ErrorType | null> {
    const req = createSetGenLinearScanBoardRunLineTable(
      addr,
      portAddr,
      scanBoardAddr,
      false,
      genLinearTable
    );
    return (await this.connection.trySend(req))?.ack ?? null;
  };
