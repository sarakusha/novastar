import { encodeUIntLE, ErrorType, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    SetPhysicalTotalDataGroupNum(
      addr: number,
      portAddr: number,
      scanBoardAddr: number,
      bBroadcast: boolean,
      totalDataGroupNum: number
    ): Promise<void>;
    trySetPhysicalTotalDataGroupNum(
      addr: number,
      portAddr: number,
      scanBoardAddr: number,
      totalDataGroupNum: number
    ): Promise<ErrorType | null>;
  }
}
export default function createSetPhysicalTotalDataGroupNum<Broadcast extends boolean>(
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  bBroadcast: Broadcast,
  totalDataGroupNum: number
): Request<Broadcast> {
  const $data = encodeUIntLE(totalDataGroupNum, AddressMapping.PhysicalTotalDataGroupNumOccupancy);
  const req = new Request($data, bBroadcast, 'SetPhysicalTotalDataGroupNum');
  req.destination = addr;
  req.deviceType = 1;
  req.port = portAddr;
  req.rcvIndex = scanBoardAddr;
  req.address = AddressMapping.PhysicalTotalDataGroupNumAddr;
  return req;
}
Session.prototype.SetPhysicalTotalDataGroupNum = async function SetPhysicalTotalDataGroupNum(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  bBroadcast: boolean,
  totalDataGroupNum: number
): Promise<void> {
  const req = createSetPhysicalTotalDataGroupNum(
    addr,
    portAddr,
    scanBoardAddr,
    bBroadcast,
    totalDataGroupNum
  );
  await this.connection.send(req);
};
Session.prototype.trySetPhysicalTotalDataGroupNum = async function trySetPhysicalTotalDataGroupNum(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  totalDataGroupNum: number
): Promise<ErrorType | null> {
  const req = createSetPhysicalTotalDataGroupNum(
    addr,
    portAddr,
    scanBoardAddr,
    false,
    totalDataGroupNum
  );
  return (await this.connection.trySend(req))?.ack ?? null;
};
