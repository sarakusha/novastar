import { ErrorType, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    SetTwentyDataGroup(
      addr: number,
      portAddr: number,
      scanBoardAddr: number,
      bBroadcast: boolean,
      isEanbleTwentyDataGroup: boolean
    ): Promise<void>;
    trySetTwentyDataGroup(
      addr: number,
      portAddr: number,
      scanBoardAddr: number,
      isEanbleTwentyDataGroup: boolean
    ): Promise<ErrorType | null>;
  }
}
export default function createSetTwentyDataGroup<Broadcast extends boolean>(
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  bBroadcast: Broadcast,
  isEanbleTwentyDataGroup: boolean
): Request<Broadcast> {
  const req = new Request(isEanbleTwentyDataGroup ? [5] : [0], bBroadcast, 'SetTwentyDataGroup');
  req.destination = addr;
  req.deviceType = 1;
  req.port = portAddr;
  req.rcvIndex = scanBoardAddr;
  req.address = AddressMapping.TwentyDataGroupAddr;
  return req;
}
Session.prototype.SetTwentyDataGroup = async function SetTwentyDataGroup(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  bBroadcast: boolean,
  isEanbleTwentyDataGroup: boolean
): Promise<void> {
  const req = createSetTwentyDataGroup(
    addr,
    portAddr,
    scanBoardAddr,
    bBroadcast,
    isEanbleTwentyDataGroup
  );
  await this.connection.send(req);
};
Session.prototype.trySetTwentyDataGroup = async function trySetTwentyDataGroup(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  isEanbleTwentyDataGroup: boolean
): Promise<ErrorType | null> {
  const req = createSetTwentyDataGroup(
    addr,
    portAddr,
    scanBoardAddr,
    false,
    isEanbleTwentyDataGroup
  );
  return (await this.connection.trySend(req))?.ack ?? null;
};
