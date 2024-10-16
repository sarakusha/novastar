import { ErrorType, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    WriteSeventhGroupRegistorGain(
      addr: number,
      portAddr: number,
      scanBoardAddr: number,
      bBroadcast: boolean,
      data: number[] | Buffer
    ): Promise<void>;
    tryWriteSeventhGroupRegistorGain(
      addr: number,
      portAddr: number,
      scanBoardAddr: number,
      data: number[] | Buffer
    ): Promise<ErrorType | null>;
  }
}
export default function createWriteSeventhGroupRegistorGain<Broadcast extends boolean>(
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  bBroadcast: Broadcast,
  data: number[] | Buffer
): Request<Broadcast> {
  if (data.length !== AddressMapping.SeventhGroupRegistorGainOccupancy)
    throw new TypeError(`Invalid buffer size: ${data.length}`);
  const req = new Request(data, bBroadcast, 'WriteSeventhGroupRegistorGain');
  req.destination = addr;
  req.deviceType = 1;
  req.port = portAddr;
  req.rcvIndex = scanBoardAddr;
  req.address = AddressMapping.SeventhGroupRegistorGainAddr;
  return req;
}
Session.prototype.WriteSeventhGroupRegistorGain = async function WriteSeventhGroupRegistorGain(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  bBroadcast: boolean,
  data: number[] | Buffer
): Promise<void> {
  const req = createWriteSeventhGroupRegistorGain(addr, portAddr, scanBoardAddr, bBroadcast, data);
  await this.connection.send(req);
};
Session.prototype.tryWriteSeventhGroupRegistorGain =
  async function tryWriteSeventhGroupRegistorGain(
    this: Session,
    addr: number,
    portAddr: number,
    scanBoardAddr: number,
    data: number[] | Buffer
  ): Promise<ErrorType | null> {
    const req = createWriteSeventhGroupRegistorGain(addr, portAddr, scanBoardAddr, false, data);
    return (await this.connection.trySend(req))?.ack ?? null;
  };
