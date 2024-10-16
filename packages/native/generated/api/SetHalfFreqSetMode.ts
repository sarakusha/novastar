import { encodeUIntLE, ErrorType, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    SetHalfFreqSetMode(
      addr: number,
      portAddr: number,
      scanBoardAddr: number,
      bBroadcast: boolean,
      totalDataGroupNum: number
    ): Promise<void>;
    trySetHalfFreqSetMode(
      addr: number,
      portAddr: number,
      scanBoardAddr: number,
      totalDataGroupNum: number
    ): Promise<ErrorType | null>;
  }
}
export default function createSetHalfFreqSetMode<Broadcast extends boolean>(
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  bBroadcast: Broadcast,
  totalDataGroupNum: number
): Request<Broadcast> {
  const $data = encodeUIntLE(totalDataGroupNum, AddressMapping.PhysicalTotalDataGroupNumOccupancy);
  const req = new Request($data, bBroadcast, 'SetHalfFreqSetMode');
  req.destination = addr;
  req.deviceType = 1;
  req.port = portAddr;
  req.rcvIndex = scanBoardAddr;
  req.address = AddressMapping.HalfFreqSetModeAddr;
  return req;
}
Session.prototype.SetHalfFreqSetMode = async function SetHalfFreqSetMode(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  bBroadcast: boolean,
  totalDataGroupNum: number
): Promise<void> {
  const req = createSetHalfFreqSetMode(
    addr,
    portAddr,
    scanBoardAddr,
    bBroadcast,
    totalDataGroupNum
  );
  await this.connection.send(req);
};
Session.prototype.trySetHalfFreqSetMode = async function trySetHalfFreqSetMode(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  totalDataGroupNum: number
): Promise<ErrorType | null> {
  const req = createSetHalfFreqSetMode(addr, portAddr, scanBoardAddr, false, totalDataGroupNum);
  return (await this.connection.trySend(req))?.ack ?? null;
};
