import { ErrorType, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    SetExtendRedGammaTableData(
      addr: number,
      portAddr: number,
      scanBoardAddr: number,
      bBroadcast: boolean,
      data: number[] | Buffer,
      is22Bit: boolean
    ): Promise<void>;
    trySetExtendRedGammaTableData(
      addr: number,
      portAddr: number,
      scanBoardAddr: number,
      data: number[] | Buffer,
      is22Bit: boolean
    ): Promise<ErrorType | null>;
  }
}
export default function createSetExtendRedGammaTableData<Broadcast extends boolean>(
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  bBroadcast: Broadcast,
  data: number[] | Buffer,
  is22Bit: boolean
): Request<Broadcast> {
  const req = new Request(data, bBroadcast, 'SetExtendRedGammaTableData');
  req.destination = addr;
  req.deviceType = 1;
  req.port = portAddr;
  req.rcvIndex = scanBoardAddr;
  req.address = AddressMapping.ExtendRedGammaTableAddr;
  if (is22Bit) {
    req.address = AddressMapping.ExtendRedGammaTableAddr_22bit;
  }
  return req;
}
Session.prototype.SetExtendRedGammaTableData = async function SetExtendRedGammaTableData(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  bBroadcast: boolean,
  data: number[] | Buffer,
  is22Bit: boolean
): Promise<void> {
  const req = createSetExtendRedGammaTableData(
    addr,
    portAddr,
    scanBoardAddr,
    bBroadcast,
    data,
    is22Bit
  );
  await this.connection.send(req);
};
Session.prototype.trySetExtendRedGammaTableData = async function trySetExtendRedGammaTableData(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  data: number[] | Buffer,
  is22Bit: boolean
): Promise<ErrorType | null> {
  const req = createSetExtendRedGammaTableData(addr, portAddr, scanBoardAddr, false, data, is22Bit);
  return (await this.connection.trySend(req))?.ack ?? null;
};
