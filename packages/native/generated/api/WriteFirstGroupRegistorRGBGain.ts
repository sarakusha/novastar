import { ErrorType, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    WriteFirstGroupRegistorRGBGain(
      addr: number,
      portAddr: number,
      scanBoardAddr: number,
      bBroadcast: boolean,
      data: number[] | Buffer
    ): Promise<void>;
    tryWriteFirstGroupRegistorRGBGain(
      addr: number,
      portAddr: number,
      scanBoardAddr: number,
      data: number[] | Buffer
    ): Promise<ErrorType | null>;
  }
}
export default function createWriteFirstGroupRegistorRGBGain<Broadcast extends boolean>(
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  bBroadcast: Broadcast,
  data: number[] | Buffer
): Request<Broadcast> {
  if (data.length !== AddressMapping.FirstGroupRegistorRGBGainOccupancy)
    throw new TypeError(`Invalid buffer size: ${data.length}`);
  const req = new Request(data, bBroadcast, 'WriteFirstGroupRegistorRGBGain');
  req.destination = addr;
  req.deviceType = 1;
  req.port = portAddr;
  req.rcvIndex = scanBoardAddr;
  req.address = AddressMapping.FirstGroupRegistorGainAddr;
  return req;
}
Session.prototype.WriteFirstGroupRegistorRGBGain = async function WriteFirstGroupRegistorRGBGain(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  bBroadcast: boolean,
  data: number[] | Buffer
): Promise<void> {
  const req = createWriteFirstGroupRegistorRGBGain(addr, portAddr, scanBoardAddr, bBroadcast, data);
  await this.connection.send(req);
};
Session.prototype.tryWriteFirstGroupRegistorRGBGain =
  async function tryWriteFirstGroupRegistorRGBGain(
    this: Session,
    addr: number,
    portAddr: number,
    scanBoardAddr: number,
    data: number[] | Buffer
  ): Promise<ErrorType | null> {
    const req = createWriteFirstGroupRegistorRGBGain(addr, portAddr, scanBoardAddr, false, data);
    return (await this.connection.trySend(req))?.ack ?? null;
  };
