import { encodeUIntLE, ErrorType, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    SetLogicalTotalDataGroupNum(
      addr: number,
      portAddr: number,
      scanBoardAddr: number,
      bBroadcast: boolean,
      logicalDataGroupNum: number
    ): Promise<void>;
    trySetLogicalTotalDataGroupNum(
      addr: number,
      portAddr: number,
      scanBoardAddr: number,
      logicalDataGroupNum: number
    ): Promise<ErrorType | null>;
  }
}
export default function createSetLogicalTotalDataGroupNum<Broadcast extends boolean>(
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  bBroadcast: Broadcast,
  logicalDataGroupNum: number
): Request<Broadcast> {
  const $data = encodeUIntLE(logicalDataGroupNum, AddressMapping.LogicalTotalDataGroupNumOccupancy);
  const req = new Request($data, bBroadcast, 'SetLogicalTotalDataGroupNum');
  req.destination = addr;
  req.deviceType = 1;
  req.port = portAddr;
  req.rcvIndex = scanBoardAddr;
  req.address = AddressMapping.LogicalTotalDataGroupNumAddr;
  return req;
}
Session.prototype.SetLogicalTotalDataGroupNum = async function SetLogicalTotalDataGroupNum(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  bBroadcast: boolean,
  logicalDataGroupNum: number
): Promise<void> {
  const req = createSetLogicalTotalDataGroupNum(
    addr,
    portAddr,
    scanBoardAddr,
    bBroadcast,
    logicalDataGroupNum
  );
  await this.connection.send(req);
};
Session.prototype.trySetLogicalTotalDataGroupNum = async function trySetLogicalTotalDataGroupNum(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  logicalDataGroupNum: number
): Promise<ErrorType | null> {
  const req = createSetLogicalTotalDataGroupNum(
    addr,
    portAddr,
    scanBoardAddr,
    false,
    logicalDataGroupNum
  );
  return (await this.connection.trySend(req))?.ack ?? null;
};
