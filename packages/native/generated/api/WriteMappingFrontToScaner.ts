import { ErrorType, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    WriteMappingFrontToScaner(
      addr: number,
      portAddr: number,
      scanBoardAddr: number,
      bBroadcast: boolean,
      data: number[] | Buffer,
      dataLength: number
    ): Promise<void>;
    tryWriteMappingFrontToScaner(
      addr: number,
      portAddr: number,
      scanBoardAddr: number,
      data: number[] | Buffer,
      dataLength: number
    ): Promise<ErrorType | null>;
  }
}
export default function createWriteMappingFrontToScaner<Broadcast extends boolean>(
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  bBroadcast: Broadcast,
  data: number[] | Buffer,
  dataLength: number
): Request<Broadcast> {
  const req = new Request(data, bBroadcast, 'WriteMappingFrontToScaner');
  req.destination = addr;
  req.deviceType = 1;
  req.port = portAddr;
  req.rcvIndex = scanBoardAddr;
  req.address = AddressMapping.WriteScannerMappingFrontAddr;
  return req;
}
Session.prototype.WriteMappingFrontToScaner = async function WriteMappingFrontToScaner(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  bBroadcast: boolean,
  data: number[] | Buffer,
  dataLength: number
): Promise<void> {
  const req = createWriteMappingFrontToScaner(
    addr,
    portAddr,
    scanBoardAddr,
    bBroadcast,
    data,
    dataLength
  );
  await this.connection.send(req);
};
Session.prototype.tryWriteMappingFrontToScaner = async function tryWriteMappingFrontToScaner(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  data: number[] | Buffer,
  dataLength: number
): Promise<ErrorType | null> {
  const req = createWriteMappingFrontToScaner(
    addr,
    portAddr,
    scanBoardAddr,
    false,
    data,
    dataLength
  );
  return (await this.connection.trySend(req))?.ack ?? null;
};
