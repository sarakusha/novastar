import { ErrorType, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    SetRedGammaTableData(
      addr: number,
      portAddr: number,
      scanBoardAddr: number,
      bBroadcast: boolean,
      data: number[] | Buffer,
      is22Bit: boolean
    ): Promise<void>;
    trySetRedGammaTableData(
      addr: number,
      portAddr: number,
      scanBoardAddr: number,
      data: number[] | Buffer,
      is22Bit: boolean
    ): Promise<ErrorType | null>;
  }
}
export default function createSetRedGammaTableData<Broadcast extends boolean>(
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  bBroadcast: Broadcast,
  data: number[] | Buffer,
  is22Bit: boolean
): Request<Broadcast> {
  const req = new Request(data, bBroadcast, 'SetRedGammaTableData');
  req.destination = addr;
  req.deviceType = 1;
  req.port = portAddr;
  req.rcvIndex = scanBoardAddr;
  req.address = AddressMapping.RedGammaTableAddr;
  if (is22Bit) {
    req.address = AddressMapping.RedGammaTableAddr_22bit;
  }
  return req;
}
Session.prototype.SetRedGammaTableData = async function SetRedGammaTableData(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  bBroadcast: boolean,
  data: number[] | Buffer,
  is22Bit: boolean
): Promise<void> {
  const req = createSetRedGammaTableData(addr, portAddr, scanBoardAddr, bBroadcast, data, is22Bit);
  await this.connection.send(req);
};
Session.prototype.trySetRedGammaTableData = async function trySetRedGammaTableData(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  data: number[] | Buffer,
  is22Bit: boolean
): Promise<ErrorType | null> {
  const req = createSetRedGammaTableData(addr, portAddr, scanBoardAddr, false, data, is22Bit);
  return (await this.connection.trySend(req))?.ack ?? null;
};
