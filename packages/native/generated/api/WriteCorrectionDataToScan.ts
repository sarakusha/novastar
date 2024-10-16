import { ErrorType, Request, Session } from '@novastar/codec';

declare module '@novastar/codec' {
  interface API {
    WriteCorrectionDataToScan(
      addr: number,
      portAddr: number,
      scanBoardAddr: number,
      bBroadcast: boolean,
      data: number[] | Buffer,
      length: number,
      registerAddr: number
    ): Promise<void>;
    tryWriteCorrectionDataToScan(
      addr: number,
      portAddr: number,
      scanBoardAddr: number,
      data: number[] | Buffer,
      length: number,
      registerAddr: number
    ): Promise<ErrorType | null>;
  }
}
export default function createWriteCorrectionDataToScan<Broadcast extends boolean>(
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  bBroadcast: Broadcast,
  data: number[] | Buffer,
  length: number,
  registerAddr: number
): Request<Broadcast> {
  if (data.length !== length) throw new TypeError(`Invalid buffer size: ${data.length}`);
  const req = new Request(data, bBroadcast, 'WriteCorrectionDataToScan');
  req.destination = addr;
  req.deviceType = 1;
  req.port = portAddr;
  req.rcvIndex = scanBoardAddr;
  req.address = registerAddr;
  return req;
}
Session.prototype.WriteCorrectionDataToScan = async function WriteCorrectionDataToScan(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  bBroadcast: boolean,
  data: number[] | Buffer,
  length: number,
  registerAddr: number
): Promise<void> {
  const req = createWriteCorrectionDataToScan(
    addr,
    portAddr,
    scanBoardAddr,
    bBroadcast,
    data,
    length,
    registerAddr
  );
  await this.connection.send(req);
};
Session.prototype.tryWriteCorrectionDataToScan = async function tryWriteCorrectionDataToScan(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  data: number[] | Buffer,
  length: number,
  registerAddr: number
): Promise<ErrorType | null> {
  const req = createWriteCorrectionDataToScan(
    addr,
    portAddr,
    scanBoardAddr,
    false,
    data,
    length,
    registerAddr
  );
  return (await this.connection.trySend(req))?.ack ?? null;
};
