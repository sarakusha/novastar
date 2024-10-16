import { ErrorType, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    SetBlankingTime5253Value(
      addr: number,
      portAddr: number,
      scanBoardAddr: number,
      bBroadcast: boolean,
      BlankingTime5253Value: number[] | Buffer
    ): Promise<void>;
    trySetBlankingTime5253Value(
      addr: number,
      portAddr: number,
      scanBoardAddr: number,
      BlankingTime5253Value: number[] | Buffer
    ): Promise<ErrorType | null>;
  }
}
export default function createSetBlankingTime5253Value<Broadcast extends boolean>(
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  bBroadcast: Broadcast,
  BlankingTime5253Value: number[] | Buffer
): Request<Broadcast> {
  if (BlankingTime5253Value.length !== AddressMapping.BlankingTime5253Occupancy)
    throw new TypeError(`Invalid buffer size: ${BlankingTime5253Value.length}`);
  const req = new Request(BlankingTime5253Value, bBroadcast, 'SetBlankingTime5253Value');
  req.destination = addr;
  req.deviceType = 1;
  req.port = portAddr;
  req.rcvIndex = scanBoardAddr;
  req.address = AddressMapping.BlankingTime5253Addr;
  return req;
}
Session.prototype.SetBlankingTime5253Value = async function SetBlankingTime5253Value(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  bBroadcast: boolean,
  BlankingTime5253Value: number[] | Buffer
): Promise<void> {
  const req = createSetBlankingTime5253Value(
    addr,
    portAddr,
    scanBoardAddr,
    bBroadcast,
    BlankingTime5253Value
  );
  await this.connection.send(req);
};
Session.prototype.trySetBlankingTime5253Value = async function trySetBlankingTime5253Value(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  BlankingTime5253Value: number[] | Buffer
): Promise<ErrorType | null> {
  const req = createSetBlankingTime5253Value(
    addr,
    portAddr,
    scanBoardAddr,
    false,
    BlankingTime5253Value
  );
  return (await this.connection.trySend(req))?.ack ?? null;
};
