import { ErrorType, Request, Session } from '@novastar/codec';
import AddressMapping from '../AddressMapping';

declare module '@novastar/codec' {
  interface API {
    SetStartPositionOfDataGroup(
      addr: number,
      portAddr: number,
      scanBoardAddr: number,
      bBroadcast: boolean,
      startPositionOfDataGroup: number[] | Buffer
    ): Promise<void>;
    trySetStartPositionOfDataGroup(
      addr: number,
      portAddr: number,
      scanBoardAddr: number,
      startPositionOfDataGroup: number[] | Buffer
    ): Promise<ErrorType | null>;
  }
}
export default function createSetStartPositionOfDataGroup<Broadcast extends boolean>(
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  bBroadcast: Broadcast,
  startPositionOfDataGroup: number[] | Buffer
): Request<Broadcast> {
  if (
    startPositionOfDataGroup.length !==
    AddressMapping.StartPositionOfDataGroupOccupancy * AddressMapping.StartPositionOfDataGroupNum
  )
    throw new TypeError(`Invalid buffer size: ${startPositionOfDataGroup.length}`);
  const req = new Request(startPositionOfDataGroup, bBroadcast, 'SetStartPositionOfDataGroup');
  req.destination = addr;
  req.deviceType = 1;
  req.port = portAddr;
  req.rcvIndex = scanBoardAddr;
  req.address = AddressMapping.StartPositionOfDataGroupAddr;
  return req;
}
Session.prototype.SetStartPositionOfDataGroup = async function SetStartPositionOfDataGroup(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  bBroadcast: boolean,
  startPositionOfDataGroup: number[] | Buffer
): Promise<void> {
  const req = createSetStartPositionOfDataGroup(
    addr,
    portAddr,
    scanBoardAddr,
    bBroadcast,
    startPositionOfDataGroup
  );
  await this.connection.send(req);
};
Session.prototype.trySetStartPositionOfDataGroup = async function trySetStartPositionOfDataGroup(
  this: Session,
  addr: number,
  portAddr: number,
  scanBoardAddr: number,
  startPositionOfDataGroup: number[] | Buffer
): Promise<ErrorType | null> {
  const req = createSetStartPositionOfDataGroup(
    addr,
    portAddr,
    scanBoardAddr,
    false,
    startPositionOfDataGroup
  );
  return (await this.connection.trySend(req))?.ack ?? null;
};
